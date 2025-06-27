import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Calendar, MessageCircle } from "lucide-react";
import { useDerekNotes } from "@/hooks/useDerekNotes";
import { useAuthor } from "@/hooks/useAuthor";
import { NoteContent } from "@/components/NoteContent";
import { DEREK_CONTACTS } from "@/lib/derek";
import type { NostrEvent } from '@nostrify/nostrify';

function NoteCard({ event }: { event: NostrEvent }) {
  const author = useAuthor(event.pubkey);
  const metadata = author.data?.metadata;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
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
                {formatDate(event.created_at)}
              </div>
            </div>
          </div>
          <Badge className="bg-blue-500 text-white text-xs">
            Note
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm leading-relaxed mb-4">
          <div className="line-clamp-4">
            <NoteContent event={event} className="text-sm" />
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(`https://njump.me/${event.id}`, '_blank')}
          className="w-full"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          View on Nostr
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

function NoteSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-12" />
        </div>
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

export function LatestNotes() {
  const { data: notes, isLoading, error } = useDerekNotes();

  if (error) {
    return null; // Don't show the section if there's an error
  }

  return (
    <section id="latest-notes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Notes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Derek's latest thoughts and quick updates from his Nostr feed.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <NoteSkeleton key={index} />
            ))}
          </div>
        ) : notes && notes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {notes.slice(0, 6).map((note) => (
                <NoteCard key={note.id} event={note} />
              ))}
            </div>
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
              >
                Follow Derek on Nostr
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 px-8 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recent Notes</h3>
              <p className="text-muted-foreground mb-6">
                Derek's latest notes will appear here. Follow him on Nostr to stay updated.
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