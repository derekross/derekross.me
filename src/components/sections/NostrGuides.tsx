import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Zap, Radio, BrainCircuit, Orbit } from "lucide-react";
import { guides } from "@/data/guides";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

export function NostrGuides() {
  // Group guides by category
  const guideCategories = [
    {
      title: "AI & Technology",
      icon: BrainCircuit,
      guides: guides.filter(g => g.category === 'ai')
    },
    {
      title: "Nostr Basics",
      icon: BookOpen,
      guides: guides.filter(g => g.category === 'general')
    },
    {
      title: "Zaps & Lightning",
      icon: Zap,
      guides: guides.filter(g => g.category === 'zaps')
    },
    {
      title: "Relays & Infrastructure",
      icon: Radio,
      guides: guides.filter(g => g.category === 'relays')
    },
    {
      title: "Nostr Apps & Ecosystem",
      icon: Orbit,
      guides: guides.filter(g => g.category === 'apps')
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
    <section id="guides" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />

      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Learn & Build
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Guides &amp; <GradientText>Presentations</GradientText>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Talks on AI and emerging tech, hands-on walkthroughs of the Nostr
            ecosystem, and deep-dive how-to guides. From AI fundamentals to
            decentralized social media, these are the resources that make the
            technologies shaping our future click.
          </p>
        </Reveal>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {guideCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Reveal key={categoryIndex} delay={(categoryIndex % 2) * 80}>
                <Card className={`h-full ${glassCard}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center font-display text-xl font-bold tracking-tight">
                      <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.guides.map((guide, guideIndex) => (
                        <div
                          key={guideIndex}
                          className="border-l-2 border-primary/30 pl-4 transition-colors hover:border-primary"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <Link
                              to={`/guides/${guide.id}`}
                              className="text-sm font-semibold transition-colors hover:text-primary"
                            >
                              {guide.title}
                            </Link>
                            <Badge variant="secondary" className="ml-2 shrink-0 text-xs">
                              {guide.type}
                            </Badge>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {guide.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* External Resources */}
        <div className="mb-16">
          <Reveal className="mb-8 text-center">
            <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              Keep <GradientText>Exploring</GradientText>
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {externalResources.map((resource, index) => (
              <Reveal key={index} delay={index * 80}>
                <Card className={`h-full ${glassCard}`}>
                  <CardContent className="p-6">
                    <h4 className="mb-2 flex items-center font-display text-lg font-bold tracking-tight">
                      {resource.title}
                      <ExternalLink className="ml-2 h-4 w-4 text-muted-foreground" />
                    </h4>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {resource.description}
                    </p>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      Visit Site
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="text-center">
          <div className="mx-auto mb-6 w-fit rounded-full bg-gradient-brand p-[3px] shadow-xl shadow-primary/30">
            <img
              src="/nostrich_1.jpg"
              alt="Nostrich, the Nostr mascot"
              className="h-32 w-32 rounded-full object-cover ring-4 ring-background"
              loading="lazy"
            />
          </div>
          <p className="mb-6 text-lg text-muted-foreground">
            Ready to dive deeper into the Nostr ecosystem?
          </p>
          <Button
            size="lg"
            variant="gradient"
            onClick={() => window.open('https://njump.me/derekross@grownostr.org', '_blank')}
          >
            Follow Derek on Nostr <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
