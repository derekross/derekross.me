import { useMemo } from 'react';
import { type NostrEvent } from '@nostrify/nostrify';
import { nip19 } from 'nostr-tools';
import { NostrMention } from '@/components/NostrMention';
import { cn } from '@/lib/utils';

interface NoteContentProps {
  event: NostrEvent;
  className?: string;
}

/** Parses content of text note events so that URLs, Nostr references, and hashtags are linkified. */
export function NoteContent({
  event,
  className,
}: NoteContentProps) {
  const content = useMemo(() => {
    const text = event.content;

    // Regex to find URLs, Nostr references, and hashtags
    const regex = /(https?:\/\/[^\s]+)|nostr:(npub1|note1|nprofile1|nevent1)([023456789acdefghjklmnpqrstuvwxyz]+)|(#\w+)/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let keyCounter = 0;

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, url, nostrPrefix, nostrData, hashtag] = match;
      const index = match.index;

      // Add text before this match
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index));
      }

      if (url) {
        parts.push(
          <a
            key={`url-${keyCounter++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {url}
          </a>
        );
      } else if (nostrPrefix && nostrData) {
        try {
          const nostrId = `${nostrPrefix}${nostrData}`;
          const decoded = nip19.decode(nostrId);

          if (decoded.type === 'npub') {
            parts.push(
              <NostrMention key={`mention-${keyCounter++}`} pubkey={decoded.data} />
            );
          } else {
            // Link to njump.me for note/nevent/nprofile references
            parts.push(
              <a
                key={`nostr-${keyCounter++}`}
                href={`https://njump.me/${nostrId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {fullMatch}
              </a>
            );
          }
        } catch {
          parts.push(fullMatch);
        }
      } else if (hashtag) {
        const tag = hashtag.slice(1);
        parts.push(
          <a
            key={`hashtag-${keyCounter++}`}
            href={`https://njump.me/t/${tag}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {hashtag}
          </a>
        );
      }

      lastIndex = index + fullMatch.length;
    }

    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    if (parts.length === 0) {
      parts.push(text);
    }

    return parts;
  }, [event]);

  return (
    <div className={cn("whitespace-pre-wrap break-words", className)}>
      {content.length > 0 ? content : event.content}
    </div>
  );
}
