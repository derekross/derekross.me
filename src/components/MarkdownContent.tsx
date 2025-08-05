import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { type NostrEvent } from '@nostrify/nostrify';
import { Link } from 'react-router-dom';
import { nip19 } from 'nostr-tools';
import { useAuthor } from '@/hooks/useAuthor';
import { genUserName } from '@/lib/genUserName';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  event: NostrEvent;
  className?: string;
}

/** Renders markdown content for articles with support for Nostr mentions and hashtags. */
export function MarkdownContent({
  event, 
  className, 
}: MarkdownContentProps) {
  // Process the content to handle Nostr-specific elements before markdown parsing
  const processedContent = useMemo(() => {
    let text = event.content;
    
    // First, protect existing code blocks from processing
    const codeBlocks: string[] = [];
    text = text.replace(/```[\s\S]*?```/g, (match) => {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match);
      return placeholder;
    });
    
    // Process Nostr references and hashtags
    text = text.replace(/nostr:(npub1|note1|nprofile1|nevent1|naddr1)([023456789acdefghjklmnpqrstuvwxyz]+)/g, (match, prefix, data) => {
      try {
        const nostrId = `${prefix}${data}`;
        const decoded = nip19.decode(nostrId);
        
        if (decoded.type === 'npub') {
          return `[${match}](/${nostrId})`;
        } else {
          return `[${match}](/${nostrId})`;
        }
      } catch {
        return match;
      }
    });
    
    // Process hashtags
    text = text.replace(/(^|\s)(#\w+)/g, '$1[$2](/t/$2)');
    
    // Restore code blocks
    codeBlocks.forEach((block, index) => {
      text = text.replace(`__CODE_BLOCK_${index}__`, block);
    });
    
    return text;
  }, [event.content]);

  return (
    <div className={cn("prose prose-lg max-w-none dark:prose-invert", className)}>
      <ReactMarkdown
        components={{
          // Headers with proper spacing
          h1: ({ children, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-6 first:mt-0" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4 first:mt-0" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-2xl font-bold mt-6 mb-3 first:mt-0" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-xl font-bold mt-6 mb-3 first:mt-0" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="text-lg font-bold mt-4 mb-2 first:mt-0" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="text-base font-bold mt-4 mb-2 first:mt-0" {...props}>
              {children}
            </h6>
          ),
          // Paragraphs with proper spacing
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          // Unordered lists with proper spacing and styling
          ul: ({ children, ...props }) => (
            <ul className="mb-4 ml-6 space-y-2 list-disc" {...props}>
              {children}
            </ul>
          ),
          // Ordered lists with proper spacing and styling
          ol: ({ children, ...props }) => (
            <ol className="mb-4 ml-6 space-y-2 list-decimal" {...props}>
              {children}
            </ol>
          ),
          // List items with proper spacing
          li: ({ children, ...props }) => (
            <li className="leading-relaxed" {...props}>
              {children}
            </li>
          ),
          // Blockquotes with proper styling
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-muted-foreground/30 pl-4 my-6 italic text-muted-foreground" {...props}>
              {children}
            </blockquote>
          ),
          // Horizontal rules with spacing
          hr: ({ ...props }) => (
            <hr className="my-8 border-muted-foreground/30" {...props} />
          ),
          // Custom link component to handle Nostr references
          a: ({ href, children, ...props }) => {
            if (href?.startsWith('/')) {
              // Internal links (Nostr references, hashtags)
              if (href.startsWith('/npub1') || href.startsWith('/note1') || 
                  href.startsWith('/nprofile1') || href.startsWith('/nevent1') || 
                  href.startsWith('/naddr1')) {
                const nip19Id = href.slice(1);
                try {
                  const decoded = nip19.decode(nip19Id);
                  if (decoded.type === 'npub') {
                    return <NostrMention pubkey={decoded.data} />;
                  }
                } catch {
                  // Fall through to regular Link
                }
              }
              
              return (
                <Link 
                  to={href} 
                  className="text-blue-500 hover:underline"
                  {...props}
                >
                  {children}
                </Link>
              );
            }
            
            // External links
            return (
              <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                {...props}
              >
                {children}
              </a>
            );
          },
          // Ensure code blocks have proper styling
          pre: ({ children, ...props }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto" {...props}>
              {children}
            </pre>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className?.includes('language-');
            
            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

// Helper component to display user mentions
function NostrMention({ pubkey }: { pubkey: string }) {
  const author = useAuthor(pubkey);
  const npub = nip19.npubEncode(pubkey);
  const hasRealName = !!author.data?.metadata?.name;
  const displayName = author.data?.metadata?.name ?? genUserName(pubkey);

  return (
    <Link 
      to={`/${npub}`}
      className={cn(
        "font-medium hover:underline no-underline",
        hasRealName 
          ? "text-blue-500" 
          : "text-gray-500 hover:text-gray-700"
      )}
    >
      @{displayName}
    </Link>
  );
}