import { useParams, Navigate } from 'react-router-dom';
import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { useAuthor } from '@/hooks/useAuthor';
import { NoteContent } from '@/components/NoteContent';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import type { NostrEvent } from '@nostrify/nostrify';

function ArticlePageContent({ event }: { event: NostrEvent }) {
  const author = useAuthor(event.pubkey);
  const metadata = author.data?.metadata;

  const title = event.tags.find(([name]) => name === 'title')?.[1] || 'Untitled Article';
  const summary = event.tags.find(([name]) => name === 'summary')?.[1];
  const publishedAt = event.tags.find(([name]) => name === 'published_at')?.[1];
  const displayDate = publishedAt ? new Date(parseInt(publishedAt) * 1000) : new Date(event.created_at * 1000);

  // Estimate reading time (average 200 words per minute)
  const wordCount = event.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <article>
            {/* Article header */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-purple-500 text-white">
                  Article
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://njump.me/${event.id}`, '_blank')}
                >
                  View on Nostr
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>
              
              {summary && (
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {summary}
                </p>
              )}

              {/* Author and metadata */}
              <div className="flex items-center justify-between border-b pb-6">
                <div className="flex items-center space-x-4">
                  {metadata?.picture ? (
                    <img 
                      src={metadata.picture} 
                      alt={metadata.name || 'Derek Ross'} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">DR</span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">
                      {metadata?.display_name || metadata?.name || 'Derek Ross'}
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(displayDate)}
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      {readingTime} min read
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Article content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-base leading-relaxed">
                <NoteContent event={event} className="text-base" />
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ArticlePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-20 mb-6" />
          
          <article>
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-32" />
              </div>
              
              <Skeleton className="h-12 w-4/5 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-6" />
              
              <div className="flex items-center justify-between border-b pb-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </div>
            </header>
            
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ArticlePage() {
  const { nip19: nip19Param } = useParams<{ nip19: string }>();
  const { nostr } = useNostr();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['article', nip19Param],
    queryFn: async (c) => {
      if (!nip19Param) throw new Error('No article identifier provided');

      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(5000)]);
      
      try {
        const decoded = nip19.decode(nip19Param);
        
        if (decoded.type === 'naddr') {
          const naddr = decoded.data;
          
          // Query for the specific addressable event
          const events = await nostr.query([{
            kinds: [naddr.kind],
            authors: [naddr.pubkey],
            '#d': [naddr.identifier],
            limit: 1
          }], { signal });
          
          return events[0] || null;
        } else if (decoded.type === 'nevent') {
          const nevent = decoded.data;
          
          // Query for the specific event
          const events = await nostr.query([{
            ids: [nevent.id],
            limit: 1
          }], { signal });
          
          return events[0] || null;
        } else if (decoded.type === 'note') {
          const noteId = decoded.data;
          
          // Query for the specific note
          const events = await nostr.query([{
            ids: [noteId],
            limit: 1
          }], { signal });
          
          return events[0] || null;
        } else {
          throw new Error('Unsupported Nostr identifier type');
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
        throw error;
      }
    },
    enabled: !!nip19Param,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  if (!nip19Param) {
    return <Navigate to="/404" replace />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for could not be found or loaded.
            </p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return <ArticlePageSkeleton />;
  }

  if (!event) {
    return <Navigate to="/404" replace />;
  }

  return <ArticlePageContent event={event} />;
}