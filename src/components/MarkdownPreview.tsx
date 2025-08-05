import { useMemo } from 'react';
import { type NostrEvent } from '@nostrify/nostrify';
import { cn } from '@/lib/utils';

interface MarkdownPreviewProps {
  event: NostrEvent;
  className?: string;
  maxLength?: number;
}

/** 
 * Renders a plain text preview of markdown content, stripping formatting 
 * for clean display in cards and previews.
 */
export function MarkdownPreview({
  event, 
  className,
  maxLength = 200
}: MarkdownPreviewProps) {
  const previewText = useMemo(() => {
    let text = event.content;
    
    // Remove markdown formatting
    text = text
      // Remove headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      // Remove code blocks and inline code
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // Remove blockquotes
      .replace(/^>\s+/gm, '')
      // Remove list markers
      .replace(/^[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      // Remove horizontal rules
      .replace(/^---+$/gm, '')
      // Clean up extra whitespace
      .replace(/\n\s*\n/g, '\n')
      .replace(/^\s+|\s+$/g, '')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ');
    
    // Truncate if needed
    if (text.length > maxLength) {
      text = text.substring(0, maxLength).trim() + '...';
    }
    
    return text;
  }, [event.content, maxLength]);

  return (
    <div className={cn("text-muted-foreground", className)}>
      {previewText}
    </div>
  );
}