import { nip19 } from 'nostr-tools';
import { useAuthor } from '@/hooks/useAuthor';
import { genUserName } from '@/lib/genUserName';
import { cn } from '@/lib/utils';

/** Shared component to display Nostr user mentions as external links to njump.me. */
export function NostrMention({ pubkey }: { pubkey: string }) {
  const author = useAuthor(pubkey);
  const npub = nip19.npubEncode(pubkey);
  const hasRealName = !!author.data?.metadata?.name;
  const displayName = author.data?.metadata?.name ?? genUserName(pubkey);

  return (
    <a
      href={`https://njump.me/${npub}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-medium hover:underline",
        hasRealName
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      @{displayName}
    </a>
  );
}
