import { useEffect, useRef, useCallback } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Loader2 } from "lucide-react";
import { useDerekArticlesInfinite } from "@/hooks/useDerekArticlesInfinite";
import { ArticleCard, ArticleSkeleton } from "@/components/ArticleCard";
import { deduplicateEvents } from '@/lib/dedup';

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

  // Flatten all pages, deduplicate across pages (updated articles may appear in multiple pages),
  // and re-sort by published_at
  const allArticles = data?.pages.flatMap((page) => page.articles) ?? [];
  const articles = deduplicateEvents(allArticles).sort((a, b) => {
    const aPublished = a.tags.find(([name]) => name === 'published_at')?.[1];
    const bPublished = b.tags.find(([name]) => name === 'published_at')?.[1];
    const aTime = aPublished ? parseInt(aPublished) : a.created_at;
    const bTime = bPublished ? parseInt(bPublished) : b.created_at;
    return bTime - aTime;
  });

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
