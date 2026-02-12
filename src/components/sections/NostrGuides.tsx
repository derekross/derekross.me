import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Zap, Radio, BrainCircuit } from "lucide-react";
import { guides } from "@/data/guides";

export function NostrGuides() {
  // Group guides by category
  const guideCategories = [
    {
      title: "AI & Technology",
      icon: BrainCircuit,
      color: "bg-purple-500",
      guides: guides.filter(g => g.category === 'ai')
    },
    {
      title: "Nostr Basics",
      icon: BookOpen,
      color: "bg-blue-500",
      guides: guides.filter(g => g.category === 'general')
    },
    {
      title: "Zaps & Lightning",
      icon: Zap,
      color: "bg-yellow-500",
      guides: guides.filter(g => g.category === 'zaps')
    },
    {
      title: "Relays & Infrastructure",
      icon: Radio,
      color: "bg-green-500",
      guides: guides.filter(g => g.category === 'relays')
    },
  ].filter(category => category.guides.length > 0); // Only show categories that have guides

  const externalResources = [
    {
      title: "NostrApps.com",
      description: "A directory of applications and services built on the nostr protocol, aimed at helping users find the best tools to suit their needs.",
      url: "https://nostrapps.com"
    },
    {
      title: "Grow Nostr",
      description: "A comprehensive resource site with getting started guides, strategies, resources, and events to grow nostr adoption and help expand the ecosystem.",
      url: "https://grownostr.org"
    }
  ];

  return (
    <section id="guides" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Guides & Presentations</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Explore presentations on AI and technology, navigate the Nostr ecosystem, and find extensive how-to guides.
            From AI fundamentals to decentralized social media, these resources will help you understand the technologies shaping our future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {guideCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${category.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.guides.map((guide, guideIndex) => (
                      <div key={guideIndex} className="border-l-2 border-muted pl-4">
                        <div className="flex items-start justify-between mb-2">
                          <Link
                            to={`/guides/${guide.id}`}
                            className="font-semibold text-sm hover:text-primary transition-colors"
                          >
                            {guide.title}
                          </Link>
                          <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                            {guide.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {guide.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* External Resources */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2 flex items-center">
                    {resource.title}
                    <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground" />
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    Visit Site
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <img
            src="/nostrich_1.jpg"
            alt="Nostrich - Nostr Mascot"
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
          />
          <p className="text-muted-foreground mb-6">
            Ready to dive deeper into the nostr ecosystem?
          </p>
          <Button
            size="lg"
            onClick={() => window.open('https://njump.me/derekross@nostrplebs.com', '_blank')}
          >
            Follow Derek on Nostr <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}