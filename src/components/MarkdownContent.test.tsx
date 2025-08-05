import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestApp } from '@/test/TestApp';
import { MarkdownContent } from './MarkdownContent';
import type { NostrEvent } from '@nostrify/nostrify';

// Mock event with markdown content
const mockArticleEvent: NostrEvent = {
  id: 'test-id',
  pubkey: 'test-pubkey',
  created_at: Date.now() / 1000,
  kind: 30023,
  tags: [],
  content: `# This is a Header

This is a paragraph with some text.

## Another Header

Here's a bulleted list:
- First item
- Second item  
- Third item

And an ordered list:
1. First numbered item
2. Second numbered item
3. Third numbered item

Some **bold text** and *italic text*.

> This is a blockquote

\`inline code\` and a code block:

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\``,
  sig: 'test-sig'
};

describe('MarkdownContent', () => {
  it('renders markdown headers correctly', () => {
    render(
      <TestApp>
        <MarkdownContent event={mockArticleEvent} />
      </TestApp>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('This is a Header');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Another Header');
  });

  it('renders bulleted lists correctly', () => {
    render(
      <TestApp>
        <MarkdownContent event={mockArticleEvent} />
      </TestApp>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(6); // 3 bullet + 3 numbered items
    expect(listItems[0]).toHaveTextContent('First item');
    expect(listItems[1]).toHaveTextContent('Second item');
    expect(listItems[2]).toHaveTextContent('Third item');
  });

  it('renders ordered lists correctly', () => {
    render(
      <TestApp>
        <MarkdownContent event={mockArticleEvent} />
      </TestApp>
    );

    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2); // 1 unordered + 1 ordered list
  });

  it('renders formatted text correctly', () => {
    render(
      <TestApp>
        <MarkdownContent event={mockArticleEvent} />
      </TestApp>
    );

    expect(screen.getByText('bold text')).toBeInTheDocument();
    expect(screen.getByText('italic text')).toBeInTheDocument();
    expect(screen.getByText('inline code')).toBeInTheDocument();
  });

  it('renders blockquotes correctly', () => {
    render(
      <TestApp>
        <MarkdownContent event={mockArticleEvent} />
      </TestApp>
    );

    expect(screen.getByText('This is a blockquote')).toBeInTheDocument();
  });
});