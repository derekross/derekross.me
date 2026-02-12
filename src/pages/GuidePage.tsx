import { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Zap, Radio, BrainCircuit, Clock, Calendar, Download } from 'lucide-react';
import { getGuideById, getGuidesByCategory } from '@/data/guides';
import ReactMarkdown from 'react-markdown';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

const categoryIcons = {
  ai: BrainCircuit,
  general: BookOpen,
  zaps: Zap,
  relays: Radio,
};

const categoryColors = {
  ai: 'bg-purple-500',
  general: 'bg-blue-500',
  zaps: 'bg-yellow-500',
  relays: 'bg-green-500',
};

const categoryNames = {
  ai: 'AI & Technology',
  general: 'Nostr Basics',
  zaps: 'Zaps & Lightning',
  relays: 'Relays & Infrastructure',
};

export default function GuidePage() {
  const navigate = useNavigate();
  const { guideId } = useParams<{ guideId: string }>();
  const guide = guideId ? getGuideById(guideId) : undefined;
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  // Update slide count and current slide when carousel changes
  useEffect(() => {
    if (!carouselApi) return;

    setSlideCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    };

    carouselApi.on('select', onSelect);

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  useSeoMeta({
    title: guide ? `${guide.title} - Derek Ross` : 'Guide Not Found - Derek Ross',
    description: guide?.description || 'Nostr guide not found.',
  });

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const relatedGuides = getGuidesByCategory(guide.category).filter(g => g.id !== guide.id);
  const IconComponent = categoryIcons[guide.category];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/guides')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guides
          </Button>

          {/* Guide header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg ${categoryColors[guide.category]}`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">
                  {guide.type}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {categoryNames[guide.category]}
                </p>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">{guide.title}</h1>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {guide.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground border-b pb-6">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {Math.max(1, Math.round(guide.content.split(' ').length / 200))} min read
              </div>
              {guide.lastUpdated && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Updated {guide.lastUpdated}
                </div>
              )}
            </div>
          </header>

          {/* Slideshow section for presentations */}
          {guide.slides && (
            <section className="mb-12">
              {/* Download button */}
              <div className="flex justify-end mb-4">
                <Button asChild>
                  <a href={guide.slides.downloadUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </div>

              {/* Carousel */}
              <div className="relative px-12">
                <Carousel
                  setApi={setCarouselApi}
                  className="w-full"
                  opts={{
                    align: 'start',
                    loop: true,
                    skipSnaps: false,
                    duration: 20,
                  }}
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {guide.slides.images.map((image, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4">
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <img
                              src={image}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-auto object-contain"
                              loading={index === 0 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              </div>

              {/* Slide counter */}
              <div className="text-center mt-4 text-sm text-muted-foreground">
                Slide {currentSlide} of {slideCount || guide.slides.images.length}
              </div>

              {/* Thumbnail grid */}
              <div className="mt-6 grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
                {guide.slides.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`aspect-[16/9] overflow-hidden rounded border-2 transition-all ${
                      currentSlide === index + 1
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-muted-foreground/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Guide content */}
          <article className="prose prose-lg max-w-none mb-12 leading-relaxed">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-foreground leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-1 text-foreground">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="ml-4">{children}</li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
              }}
            >
              {guide.content}
            </ReactMarkdown>
          </article>

          {/* Related guides */}
          {relatedGuides.length > 0 && (
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedGuides.map((relatedGuide) => {
                  const RelatedIcon = categoryIcons[relatedGuide.category];
                  return (
                    <Card key={relatedGuide.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${categoryColors[relatedGuide.category]}`}>
                            <RelatedIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <Badge variant="secondary" className="text-xs mb-2">
                              {relatedGuide.type}
                            </Badge>
                            <h3 className="font-semibold text-lg mb-2">{relatedGuide.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                              {relatedGuide.description}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/guides/${relatedGuide.id}`)}
                            >
                              Read Guide
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* Call to action */}
          <section className="border-t pt-8 mt-8 text-center">
            <img
              src="/nostrich_1.jpg"
              alt="Nostrich - Nostr Mascot"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Found this guide helpful?</h3>
            <p className="text-muted-foreground mb-6">
              Support Derek's work by following him on Nostr and sharing these guides with others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open('https://njump.me/derekross@nostrplebs.com', '_blank')}
              >
                Follow Derek on Nostr
              </Button>
              <Button
                variant="outline"
            onClick={() => navigate('/guides')}
              >
                Browse All Guides
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}