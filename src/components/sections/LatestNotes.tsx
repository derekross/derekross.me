import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Calendar, MessageCircle } from "lucide-react";
import { useDerekNotes } from "@/hooks/useDerekNotes";
import { useAuthor } from "@/hooks/useAuthor";
import { NoteContent } from "@/components/NoteContent";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { DEREK_CONTACTS } from "@/lib/derek";
import type { NostrEvent } from '@nostrify/nostrify';

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

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
    <Card className={`h-full ${glassCard}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {metadata?.picture ? (
              <img
                src={metadata.picture}
                alt={metadata.name || 'Derek Ross'}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/30">
                <span className="font-semibold text-primary">DR</span>
              </div>
            )}
            <div>
              <div className="text-sm font-semibold">
                {metadata?.display_name || metadata?.name || 'Derek Ross'}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(event.created_at)}
              </div>
            </div>
          </div>
          <Badge className="border-transparent bg-gradient-brand text-xs text-white">
            Note
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 text-sm leading-relaxed">
          <div className="line-clamp-4">
            <NoteContent event={event} className="text-sm" />
          </div>
        </div>
        <Button
          variant="glass"
          size="sm"
          onClick={() => window.open(`https://njump.me/${event.id}`, '_blank')}
          className="w-full"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          View on Nostr
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function NoteSkeleton() {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <Skeleton className="h-8 w-full rounded-md" />
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
    <section id="latest-notes" className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Live feed
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Latest <GradientText>Notes</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Unfiltered thoughts, hot takes, and quick updates &mdash; straight
            from Derek's Nostr feed in real time.
          </p>
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <NoteSkeleton key={index} />
            ))}
          </div>
        ) : notes && notes.length > 0 ? (
          <>
            <Reveal>
              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {notes.slice(0, 6).map((note) => (
                  <NoteCard key={note.id} event={note} />
                ))}
              </div>
            </Reveal>
            <div className="text-center">
              <Button
                size="lg"
                variant="gradient"
                onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
              >
                Follow Derek on Nostr
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <Reveal>
            <Card className="border-dashed border-border/50 bg-card/60 backdrop-blur-xl">
              <CardContent className="px-8 py-12 text-center">
                <MessageCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-display text-lg font-bold">No Recent Notes</h3>
                <p className="mb-6 text-muted-foreground">
                  Derek's latest notes will appear here. Follow him on Nostr to stay in the loop.
                </p>
                <Button
                  variant="gradient"
                  onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
                >
                  Follow on Nostr
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        )}
      </div>
    </section>
  );
}
