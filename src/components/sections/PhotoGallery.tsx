// import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Camera, ExternalLink, Calendar } from "lucide-react";
import { useNostrPhotos } from "@/hooks/useNostrPhotos";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";
import { DEREK_CONTACTS } from "@/lib/derek";

const glassCard =
  "overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

function PhotoSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl">
      <Skeleton className="aspect-square w-full rounded-none" />
      <CardContent className="p-4">
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  );
}

export function PhotoGallery() {
  const { data: photos, isLoading } = useNostrPhotos();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="photos" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            On the road
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Photo <GradientText>Gallery</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A visual journey through Derek's keynotes, conferences, and Nostr
            community gatherings around the world.
          </p>
        </Reveal>

        {/* Nostr Photos Section - only show if we have photos */}
        {!isLoading && photos && photos.length > 0 && (
          <div className="mb-20">
            <h3 className="mb-8 text-center font-display text-2xl font-bold">
              Latest from <GradientText>Nostr</GradientText>
            </h3>
            <Reveal>
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {photos.slice(0, 12).map((photo) => (
                  <Dialog key={photo.id}>
                    <DialogTrigger asChild>
                      <Card className={`group cursor-pointer ring-1 ring-border/40 ${glassCard}`}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={photo.url}
                            alt={photo.alt || photo.caption || 'Derek Ross photo'}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <CardContent className="p-4">
                          {photo.caption && (
                            <p className="mb-2 line-clamp-2 text-sm">
                              {photo.caption}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              {formatDate(photo.created_at)}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              <Camera className="mr-1 h-3 w-3" />
                              Nostr
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-4xl p-0">
                      <DialogTitle className="sr-only">{photo.alt || photo.caption || 'Photo'}</DialogTitle>
                      <DialogDescription className="sr-only">Photo from Nostr posted on {formatDate(photo.created_at)}</DialogDescription>
                      <div className="relative">
                        <img
                          src={photo.url}
                          alt={photo.alt || photo.caption || 'Derek Ross photo'}
                          className="h-auto max-h-[80vh] w-full object-contain"
                        />
                        <div className="absolute right-4 top-4">
                          <Button
                            variant="gradient"
                            size="sm"
                            onClick={() => window.open(`https://njump.me/${photo.event.id}`, '_blank', 'noopener,noreferrer')}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on Nostr
                          </Button>
                        </div>
                      </div>
                      {photo.caption && (
                        <div className="p-6">
                          <p className="mb-2 text-sm text-muted-foreground">
                            {formatDate(photo.created_at)}
                          </p>
                          <p className="leading-relaxed">{photo.caption}</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </Reveal>

            {photos.length > 12 && (
              <div className="mb-8 text-center">
                <Button
                  size="lg"
                  variant="gradient"
                  onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
                >
                  See more photos on Nostr
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Loading state for Nostr photos */}
        {isLoading && (
          <div className="mb-20">
            <h3 className="mb-8 text-center font-display text-2xl font-bold">
              Loading photos from <GradientText>Nostr</GradientText>&hellip;
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <PhotoSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Static Gallery from existing images */}
        <div>
          <h3 className="mb-8 text-center font-display text-2xl font-bold">
            Conference <GradientText>Highlights</GradientText>
          </h3>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                { src: '/derek_1.jpg', alt: 'Derek Ross Portrait', caption: 'Community Builder', position: 'object-top' },
                { src: '/derek-workshop.jpg', alt: 'Derek Speaking', caption: 'Speaking Engagement' },
                { src: '/derek_3.jpg', alt: 'Derek at Conference', caption: 'Conference Presentation' },
                { src: '/derek_5.jpg', alt: 'Derek Ross', caption: 'Nostr Advocacy', position: 'object-top' },
                { src: '/derek_2.jpg', alt: 'Derek in Media', caption: 'Media Interview' },
                { src: '/bitcoin2026-1.jpg', alt: 'Derek Ross at The Bitcoin Conference 2026', caption: 'Bitcoin 2026' },
                { src: '/bitcoin2026-2.jpg', alt: 'Derek Ross at The Bitcoin Conference 2026', caption: 'Bitcoin 2026' },
                { src: '/bitcoin2026-3.jpg', alt: 'Derek Ross at The Bitcoin Conference 2026', caption: 'Bitcoin 2026' },
                { src: '/bitcoin2026-4.jpg', alt: 'Derek Ross at The Bitcoin Conference 2026', caption: 'Bitcoin 2026' },
                { src: '/bitcoin2026-5.jpg', alt: 'Derek Ross at The Bitcoin Conference 2026', caption: 'Bitcoin 2026' },
                { src: '/bitcoin2026-6.jpg', alt: 'Derek Ross at The Bitcoin Conference 2026', caption: 'Bitcoin 2026' },
                { src: '/bitcoin2026-7.jpg', alt: 'Derek Ross at The Bitcoin Conference 2026', caption: 'Bitcoin 2026' }
              ].map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className={`group cursor-pointer ring-1 ring-border/40 ${glassCard}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${image.position || ''}`}
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-3">
                        <p className="text-center text-sm font-medium">
                          {image.caption}
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-4xl p-0">
                    <DialogTitle className="sr-only">{image.caption}</DialogTitle>
                    <DialogDescription className="sr-only">{image.alt}</DialogDescription>
                    <div className="relative">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-auto max-h-[80vh] w-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="mb-2 font-display font-semibold">{image.caption}</h4>
                      <p className="text-muted-foreground">
                        Derek Ross at various conferences and events promoting Nostr and decentralized technologies.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
