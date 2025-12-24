// import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, ExternalLink, Calendar } from "lucide-react";
import { useNostrPhotos } from "@/hooks/useNostrPhotos";
import { DEREK_CONTACTS } from "@/lib/derek";

function PhotoSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
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
    <section id="photos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Photo Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A visual journey through Derek's speaking events, conferences, and Nostr community gatherings.
          </p>
        </div>

        {/* Nostr Photos Section - only show if we have photos */}
        {!isLoading && photos && photos.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Latest from Nostr</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {photos.slice(0, 12).map((photo) => (
                <Dialog key={photo.id}>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.alt || photo.caption || 'Derek Ross photo'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        {photo.caption && (
                          <p className="text-sm line-clamp-2 mb-2">
                            {photo.caption}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(photo.created_at)}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            <Camera className="h-3 w-3 mr-1" />
                            Nostr
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0">
                    <div className="relative">
                      <img
                        src={photo.url}
                        alt={photo.alt || photo.caption || 'Derek Ross photo'}
                        className="w-full h-auto max-h-[80vh] object-contain"
                      />
                      <div className="absolute top-4 right-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(`https://njump.me/${photo.event.id}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Nostr
                        </Button>
                      </div>
                    </div>
                    {photo.caption && (
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatDate(photo.created_at)}
                        </p>
                        <p className="leading-relaxed">{photo.caption}</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {photos.length > 12 && (
              <div className="text-center mb-8">
                <Button 
                  size="lg"
                  onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
                >
                  View More Photos on Nostr
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Loading state for Nostr photos */}
        {isLoading && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Loading Photos from Nostr...</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <PhotoSkeleton key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Static Gallery from existing images */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Conference Highlights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { src: '/derek_1.jpg', alt: 'Derek Ross Portrait', caption: 'Community Builder', position: 'object-top' },
              { src: '/derek-workshop.jpg', alt: 'Derek Speaking', caption: 'Speaking Engagement' },
              { src: '/derek_3.jpg', alt: 'Derek at Conference', caption: 'Conference Presentation' },
              { src: '/derek_5.jpg', alt: 'Derek Ross', caption: 'Nostr Advocacy', position: 'object-top' },
              { src: '/derek_2.jpg', alt: 'Derek in Media', caption: 'Media Interview' }
            ].map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${image.position || ''}`}
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium text-center">
                        {image.caption}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold mb-2">{image.caption}</h4>
                    <p className="text-muted-foreground">
                      Derek Ross at various conferences and events promoting Nostr and decentralized technologies.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}