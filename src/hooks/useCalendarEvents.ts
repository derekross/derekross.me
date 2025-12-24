import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { DEREK_PUBKEY_HEX } from '@/lib/derek';

// NostrEvent type is used for the validate and parse functions below

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type: string;
  url?: string;
  isCreator: boolean;
  rsvpStatus?: 'accepted' | 'declined' | 'tentative';
  isPast: boolean;
}

function validateCalendarEvent(event: NostrEvent): boolean {
  // Check if it's a calendar event kind (NIP-52)
  if (![31922, 31923].includes(event.kind)) return false;

  // Check for required tags according to NIP-52
  const d = event.tags.find(([name]) => name === 'd')?.[1];
  const title = event.tags.find(([name]) => name === 'title')?.[1];
  const start = event.tags.find(([name]) => name === 'start')?.[1];

  // All calendar events require 'd', 'title', and 'start' tags
  if (!d || !title || !start) return false;

  // Additional validation for date-based events (kind 31922)
  if (event.kind === 31922) {
    // start tag should be in YYYY-MM-DD format for date-based events
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start)) return false;
  }

  // Additional validation for time-based events (kind 31923)
  if (event.kind === 31923) {
    // start tag should be a unix timestamp for time-based events
    const timestamp = parseInt(start);
    if (isNaN(timestamp) || timestamp <= 0) return false;
  }

  return true;
}

function parseCalendarEvent(event: NostrEvent, rsvpStatus?: 'accepted' | 'declined' | 'tentative'): CalendarEvent {
  const title = event.tags.find(([name]) => name === 'title')?.[1] || 'Untitled Event';
  const description = event.tags.find(([name]) => name === 'description')?.[1] || event.content;
  const location = event.tags.find(([name]) => name === 'location')?.[1];
  const start = event.tags.find(([name]) => name === 'start')?.[1] || '';
  const end = event.tags.find(([name]) => name === 'end')?.[1];
  const url = event.tags.find(([name]) => name === 'r')?.[1]; // reference URL

  let date = '';
  let startTime = '';
  let endTime = '';
  let eventDate: Date | null = null;

  if (event.kind === 31922) {
    // Date-based event
    date = start;
    startTime = event.tags.find(([name]) => name === 'start_time')?.[1] || '';
    endTime = event.tags.find(([name]) => name === 'end_time')?.[1] || '';
    eventDate = new Date(start);
  } else if (event.kind === 31923) {
    // Time-based event
    const startTimestamp = parseInt(start);
    const endTimestamp = end ? parseInt(end) : null;
    
    if (!isNaN(startTimestamp)) {
      const startDate = new Date(startTimestamp * 1000);
      date = startDate.toLocaleDateString();
      startTime = startDate.toLocaleTimeString();
      eventDate = startDate;
      
      if (endTimestamp && !isNaN(endTimestamp)) {
        const endDate = new Date(endTimestamp * 1000);
        endTime = endDate.toLocaleTimeString();
      }
    }
  }

  // Determine event type from tags or content
  const typeTag = event.tags.find(([name]) => name === 't')?.[1];
  let type = 'Event';
  
  if (typeTag) {
    if (typeTag.toLowerCase().includes('conference')) type = 'Conference';
    else if (typeTag.toLowerCase().includes('meetup')) type = 'Meetup';
    else if (typeTag.toLowerCase().includes('workshop')) type = 'Workshop';
    else if (typeTag.toLowerCase().includes('speaking')) type = 'Speaking';
    else type = typeTag;
  }

  const now = new Date();
  const isPast = eventDate ? eventDate < now : false;
  const isCreator = event.pubkey === DEREK_PUBKEY_HEX;

  return {
    id: event.id,
    title,
    description,
    location,
    date,
    startTime,
    endTime,
    type,
    url,
    isCreator,
    rsvpStatus,
    isPast
  };
}

export function useCalendarEvents() {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['calendar-events', DEREK_PUBKEY_HEX],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);

      try {
        // Query for Derek's calendar events (date-based and time-based)
        const events = await nostr.query([
          {
            kinds: [31922, 31923],
            authors: [DEREK_PUBKEY_HEX],
            limit: 50
          }
        ], { signal });

        // Validate and parse events
        const validEvents = events.filter(validateCalendarEvent);
        const calendarEvents = validEvents.map(event => parseCalendarEvent(event));

        // Sort by date (future events first, then past events)
        calendarEvents.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          // If one is past and one is future, future comes first
          if (a.isPast !== b.isPast) {
            return a.isPast ? 1 : -1;
          }

          // If both are future, sort by date ascending (soonest first)
          if (!a.isPast && !b.isPast) {
            return dateA.getTime() - dateB.getTime();
          }

          // If both are past, sort by date descending (most recent first)
          return dateB.getTime() - dateA.getTime();
        });

        return calendarEvents;
      } catch (error) {
        console.warn('Failed to fetch calendar events:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}