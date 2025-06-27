import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Calendar, BookOpen, Clock } from "lucide-react";
import { useDerekArticles } from "@/hooks/useDerekArticles";
import { useAuthor } from "@/hooks/useAuthor";
import { NoteContent } from "@/components/NoteContent";
import { DEREK_CONTACTS } from "@/lib/derek";
import { nip19 } from 'nostr-tools';
import { useNavigate } from 'react-router-dom';
import type { NostrEvent } from '@nostrify/nostrify';

function ArticleCard({ event }: { event: NostrEvent }) {
  const author = useAuthor(event.pubkey);
  const metadata = author.data?.metadata;
  const navigate = useNavigate();



  const title = event.tags.find(([name]) => name === 'title')?.[1] || 'Untitled Article';
  const summary = event.tags.find(([name]) => name === 'summary')?.[1];
  const publishedAt = event.tags.find(([name]) => name === 'published_at')?.[1];
  const displayDate = publishedAt ? new Date(parseInt(publishedAt) * 1000) : new Date(event.created_at * 1000);

  // Estimate reading time (average 200 words per minute)
  const wordCount = event.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  // Create naddr for addressable events (kind 30023)
  const handleReadArticle = () => {
    const dTag = event.tags.find(([name]) => name === 'd')?.[1];
    if (dTag && event.kind === 30023) {
      // Create naddr for addressable event
      const naddr = nip19.naddrEncode({
        identifier: dTag,
        pubkey: event.pubkey,
        kind: event.kind,
      });
      navigate(`/article/${naddr}`);
    } else {
      // Fallback to nevent for regular events
      const nevent = nip19.neventEncode({
        id: event.id,
        author: event.pubkey,
      });
      navigate(`/article/${nevent}`);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
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
        <h3 className="font-bold text-lg leading-tight mb-2">{title}</h3>
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
        <div className="text-sm leading-relaxed mb-4">
          <div className="line-clamp-3">
            <NoteContent event={event} className="text-sm" />
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleReadArticle}
          className="w-full"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Read Article
        </Button>
      </CardContent>
    </Card>
  );
}

function ArticleSkeleton() {
  return (
    <Card className="h-full">
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
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}

export function LatestArticles() {
  const { data: articles, isLoading, error } = useDerekArticles();

  if (error) {
    return null; // Don't show the section if there's an error
  }

  return (
    <section id="latest-articles" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth articles and long-form content from Derek about Nostr protocol, decentralization, and the future of digital communication.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {articles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} event={article} />
              ))}
            </div>
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
              >
                Read More Articles
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 px-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recent Articles</h3>
              <p className="text-muted-foreground mb-6">
                Derek's latest articles will appear here. Follow him on Nostr to stay updated.
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
              >
                Follow on Nostr
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}