import { useEffect, useRef, useCallback } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, BookOpen, Clock, Loader2 } from "lucide-react";
import { useDerekArticlesInfinite } from "@/hooks/useDerekArticlesInfinite";
import { useAuthor } from "@/hooks/useAuthor";
import { MarkdownPreview } from "@/components/MarkdownPreview";
import { NoteContent } from "@/components/NoteContent";
import { nip19 } from 'nostr-tools';
import { useNavigate } from 'react-router-dom';
import type { NostrEvent } from '@nostrify/nostrify';

function ArticleCard({ event }: { event: NostrEvent }) {
  const author = useAuthor(event.pubkey);
  const metadata = author.data?.metadata;
  const navigate = useNavigate();

  const title = event.tags.find(([name]) => name === 'title')?.[1] || 'Untitled Article';
  const summary = event.tags.find(([name]) => name === 'summary')?.[1];
  const heroImage = event.tags.find(([name]) => name === 'image')?.[1];
  const publishedAt = event.tags.find(([name]) => name === 'published_at')?.[1];
  const displayDate = publishedAt ? new Date(parseInt(publishedAt) * 1000) : new Date(event.created_at * 1000);

  // Estimate reading time (average 200 words per minute)
  const wordCount = event.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const handleReadArticle = () => {
    const dTag = event.tags.find(([name]) => name === 'd')?.[1];
    if (dTag && event.kind === 30023) {
      const naddr = nip19.naddrEncode({
        identifier: dTag,
        pubkey: event.pubkey,
        kind: event.kind,
      });
      navigate(`/article/${naddr}`);
    } else {
      const nevent = nip19.neventEncode({
        id: event.id,
        author: event.pubkey,
      });
      navigate(`/article/${nevent}`);
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow h-full cursor-pointer group"
      onClick={handleReadArticle}
    >
      {heroImage && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.parentElement!.style.display = 'none';
            }}
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {metadata?.picture ? (
              <img
                src={metadata.picture}
                alt={metadata.name || 'Derek Ross'}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">DR</span>
              </div>
            )}
            <div>
              <div className="font-semibold text-sm">
                {metadata?.display_name || metadata?.name || 'Derek Ross'}
              </div>
              <div className="flex items-center text-muted-foreground text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {displayDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
          <Badge className="bg-purple-500 text-white text-xs">
            Article
          </Badge>
        </div>
        <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{title}</h3>
        {summary && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            {summary}
          </p>
        )}
        <div className="flex items-center text-muted-foreground text-xs">
          <Clock className="h-3 w-3 mr-1" />
          {readingTime} min read
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm leading-relaxed">
          <div className="line-clamp-3">
            {event.kind === 30023 ? (
              <MarkdownPreview event={event} className="text-sm" maxLength={300} />
            ) : (
              <NoteContent event={event} className="text-sm" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ArticleSkeleton() {
  return (
    <Card className="h-full">
      <Skeleton className="aspect-video w-full rounded-t-lg rounded-b-none" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-4/5 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-3 w-20" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </CardContent>
    </Card>
  );
}

const BlogPage = () => {
  useSeoMeta({
    title: 'Blog - Derek Ross',
    description: 'In-depth articles and long-form content from Derek Ross about Nostr protocol, decentralization, Bitcoin, and the future of digital communication.',
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDerekArticlesInfinite();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  // Flatten all pages into a single array of articles
  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Blog</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                In-depth articles and long-form content about Nostr protocol, decentralization, and the future of digital communication.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ArticleSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <Card className="border-dashed">
                <CardContent className="py-12 px-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Unable to Load Articles</h3>
                  <p className="text-muted-foreground">
                    There was an error loading articles. Please try again later.
                  </p>
                </CardContent>
              </Card>
            ) : articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} event={article} />
                  ))}
                </div>

                {/* Load more trigger */}
                <div ref={loadMoreRef} className="mt-12 flex justify-center">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Loading more articles...</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 px-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Articles Yet</h3>
                  <p className="text-muted-foreground">
                    Derek's articles will appear here. Check back soon!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
