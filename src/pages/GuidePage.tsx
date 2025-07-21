import { useParams, Navigate } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Zap, Radio, Cog, Clock, Calendar } from 'lucide-react';
import { getGuideById, getGuidesByCategory } from '@/data/guides';
import ReactMarkdown from 'react-markdown';

const categoryIcons = {
  general: BookOpen,
  zaps: Zap,
  relays: Radio,
  advanced: Cog,
};

const categoryColors = {
  general: 'bg-blue-500',
  zaps: 'bg-yellow-500',
  relays: 'bg-green-500',
  advanced: 'bg-purple-500',
};

const categoryNames = {
  general: 'General Guides',
  zaps: 'Zaps & Lightning',
  relays: 'Relays & Infrastructure',
  advanced: 'Advanced Topics',
};

export default function GuidePage() {
  const { guideId } = useParams<{ guideId: string }>();
  const guide = guideId ? getGuideById(guideId) : undefined;

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
            onClick={() => window.location.href = '/guides'}
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
                              onClick={() => window.location.href = `/guides/${relatedGuide.id}`}
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
                onClick={() => window.location.href = '/guides'}
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