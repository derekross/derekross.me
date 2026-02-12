import { useMemo } from 'react';
import type { NostrEvent } from '@nostrify/nostrify';
import { filterDeletedEvents } from '@/lib/dedup';
import { useDerekDeletions } from './useDerekDeletions';

/**
 * Reactively filters out deleted events from a list of events.
 * When deletion events load (or update), the filtered list automatically updates
 * without re-fetching the original events.
 */
export function useFilterDeleted(events: NostrEvent[] | undefined): NostrEvent[] {
  const { data: deletions } = useDerekDeletions();

  return useMemo(() => {
    if (!events) return [];
    return filterDeletedEvents(events, deletions ?? []);
  }, [events, deletions]);
}
