import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mic,
  Users,
  Presentation,
  BookOpen,
  Code,
  Zap,
  Smartphone,
  Globe,
  GitBranch,
  Shield,
  TrendingUp,
  Server,
  ArrowRight,
  Sparkles,
  Palette,
  Megaphone,
} from "lucide-react";
import { useDerekApplications } from "@/hooks/useDerekApplications";
import { useDerekRepositories } from "@/hooks/useDerekRepositories";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

export function Services() {
  const navigate = useNavigate();
  const { data: applications, isLoading: appsLoading } = useDerekApplications();
  const { data: repositories, isLoading: reposLoading } =
    useDerekRepositories();

  const solutions = [
    {
      name: "Nostr Plebs",
      description:
        "A Nostr services provider offering Nostr Addresses, private relays, Lightning address forwarding, directory services, and expert support.",
      url: "https://nostrplebs.com",
      icon: Server,
      color: "bg-blue-500",
      features: [
        "Nostr Addresses",
        "Private Relays",
        "Lightning Forwarding",
        "Expert Support",
      ],
    },
    {
      name: "Nostr Elites",
      description:
        "A Web of Trust relay filtering out spam and unwanted content, ensuring a safer Nostr experience through a trusted network.",
      url: "https://nostrelites.org",
      icon: Shield,
      color: "bg-green-500",
      features: [
        "Web of Trust",
        "Spam Filtering",
        "Content Moderation",
        "Trusted Network",
      ],
    },
    {
      name: "Grow Nostr Initiative",
      description:
        "Dedicated to expanding the Nostr ecosystem through education, community initiatives, and protocol innovation.",
      url: "https://grownostr.org",
      icon: TrendingUp,
      color: "bg-purple-500",
      features: [
        "Ecosystem Growth",
        "Education",
        "Community Building",
        "Protocol Innovation",
      ],
    },
  ];

  const soapboxProducts = [
    {
      name: "Shakespeare",
      description:
        "Open-source AI website builder for the decentralized web — describe what you want, build it with AI, and deploy it on infrastructure you own.",
      url: "https://shakespeare.diy",
      icon: Sparkles,
      color: "bg-purple-500",
      features: [
        "AI App Builder",
        "No Vendor Lock-in",
        "Nostr-native",
        "Deploy Anywhere",
      ],
    },
    {
      name: "Ditto",
      description:
        "Soapbox's flagship Nostr social client — radically customizable, self-hostable, and built to make the internet fun again. Your content, your vibe, your rules.",
      url: "https://ditto.pub",
      icon: Palette,
      color: "bg-pink-500",
      features: [
        "Flagship Client",
        "Theme System",
        "Self-Hostable",
        "Cross-Protocol",
      ],
    },
    {
      name: "Agora",
      description:
        "A decentralized activist platform on Nostr and Bitcoin — built with and for human-rights activists to organize freely, communicate safely, and resist censorship.",
      url: "https://agora.place",
      icon: Megaphone,
      color: "bg-orange-500",
      features: [
        "Human Rights",
        "Censorship-Resistant",
        "Bitcoin Bounties",
        "Offline Mesh",
      ],
    },
  ];

  const services = [
    {
      icon: Presentation,
      title: "Speaking Engagements",
      description:
        "Derek speaks at international conferences on AI, vibe coding, decentralization, and nostr education, including Bitcoin conferences, chamber of commerce events, and technology workshops.",
      features: [
        "Conference Presentations",
        "Workshop Facilitation",
        "Panel Discussions",
        "Keynote Speeches",
      ],
      category: "Speaking",
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Nostr Booth Organization",
      description:
        "Derek organizes 'nostr booths' at various conferences, serving as key hubs for exploring and discussing the nostr protocol.",
      features: [
        "Conference Booth Setup",
        "Live Demonstrations",
        "Community Engagement",
        "Protocol Education",
      ],
      category: "Events",
      color: "bg-green-500",
    },
    {
      icon: BookOpen,
      title: "Nostr Education & Training",
      description:
        "Comprehensive education on AI tools, vibe coding, and the nostr protocol, helping users understand decentralized social communication and take control of their digital identity.",
      features: [
        "Protocol Fundamentals",
        "Client Setup Guidance",
        "Relay Management",
        "Security Best Practices",
      ],
      category: "Education",
      color: "bg-purple-500",
    },
    {
      icon: Code,
      title: "Nostr Development Consulting",
      description:
        "Technical consulting for AI-powered development with Shakespeare, nostr application development, protocol implementation, and ecosystem integration.",
      features: [
        "Protocol Implementation",
        "Client Development",
        "Relay Setup",
        "Integration Support",
      ],
      category: "Consulting",
      color: "bg-orange-500",
    },
    {
      icon: Mic,
      title: "Podcast & Media Appearances",
      description:
        "Derek regularly appears on podcasts and media shows to discuss nostr, Bitcoin, and decentralized technologies.",
      features: [
        "Podcast Interviews",
        "Video Content",
        "Technical Discussions",
        "Community Outreach",
      ],
      category: "Media",
      color: "bg-red-500",
    },
    {
      icon: Zap,
      title: "Community Building",
      description:
        "Building and nurturing nostr communities, helping users connect and grow the decentralized social ecosystem.",
      features: [
        "Community Management",
        "User Onboarding",
        "Event Organization",
        "Ecosystem Growth",
      ],
      category: "Community",
      color: "bg-yellow-500",
    },
  ];

  const ApplicationCard = ({
    app,
  }: {
    app: {
      id: string;
      name: string;
      displayName?: string;
      description?: string;
      picture?: string;
      supportedKinds: number[];
      web?: string;
      platforms: { ios?: string; android?: string };
    };
  }) => (
    <Card className={`h-full ${glassCard}`}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-start gap-4">
          {app.picture ? (
            <img
              src={app.picture}
              alt={app.name}
              className="h-12 w-12 rounded-xl object-cover ring-1 ring-border/60"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Smartphone className="h-6 w-6" />
            </div>
          )}
          <div className="flex-1">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h4 className="font-display text-lg font-bold">
                {app.displayName || app.name}
              </h4>
              <Badge variant="outline">App</Badge>
            </div>
            {app.description && (
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                {app.description}
              </p>
            )}
            {app.supportedKinds.length > 0 && (
              <div className="mb-3">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Supports:
                </p>
                <div className="flex flex-wrap gap-1">
                  {app.supportedKinds.slice(0, 5).map((kind: number) => (
                    <Badge key={kind} variant="secondary" className="text-xs">
                      Kind {kind}
                    </Badge>
                  ))}
                  {app.supportedKinds.length > 5 && (
                    <Badge variant="secondary" className="text-xs">
                      +{app.supportedKinds.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {app.web && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(app.web, "_blank")}
              className="flex-1"
            >
              <Globe className="mr-2 h-4 w-4" />
              Visit App
            </Button>
          )}
          {app.platforms.ios && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(app.platforms.ios, "_blank")}
            >
              iOS
            </Button>
          )}
          {app.platforms.android && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(app.platforms.android, "_blank")}
            >
              Android
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const RepositoryCard = ({
    repo,
  }: {
    repo: {
      id: string;
      name: string;
      description?: string;
      webUrls: string[];
      cloneUrls: string[];
      tags: string[];
    };
  }) => (
    <Card className={`h-full ${glassCard}`}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GitBranch className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold">{repo.name}</h4>
              <Badge variant="outline" className="mt-1">
                Repository
              </Badge>
            </div>
          </div>
        </div>

        {repo.description && (
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {repo.description}
          </p>
        )}

        {repo.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {repo.tags.slice(0, 4).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {repo.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{repo.tags.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {repo.webUrls[0] && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(repo.webUrls[0], "_blank")}
              className="flex-1"
            >
              <Globe className="mr-2 h-4 w-4" />
              Browse Code
            </Button>
          )}
          {repo.cloneUrls[0] && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(repo.cloneUrls[0]);
                // Could add toast notification here
              }}
            >
              Clone
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const SolutionCard = ({
    solution,
  }: {
    solution: {
      name: string;
      description: string;
      url: string;
      icon: React.ComponentType<{ className?: string }>;
      color: string;
      features: string[];
    };
  }) => {
    const IconComponent = solution.icon;
    return (
      <Card className={`h-full ${glassCard}`}>
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-primary/25">
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="mb-2 font-display text-lg font-bold">
                {solution.name}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {solution.description}
              </p>
              <div className="mb-4">
                <h5 className="mb-2 text-sm font-semibold">Key Features:</h5>
                <div className="grid grid-cols-2 gap-1">
                  {solution.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-xs text-muted-foreground"
                    >
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="glass"
            onClick={() => window.open(solution.url, "_blank")}
            className="mt-auto w-full"
          >
            <Globe className="mr-2 h-4 w-4" />
            Visit Solution
          </Button>
        </CardContent>
      </Card>
    );
  };

  const ProjectSkeleton = () => (
    <Card className={glassCard}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1">
            <div className="mb-2 flex items-start justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="services" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Services
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Work With a <GradientText>Nostr Insider</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            As Developer Relations at{" "}
            <a
              href="https://soapbox.pub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Soapbox
            </a>
            , Derek helps individuals, organizations, and developers understand,
            implement, and win with AI, the nostr protocol, and decentralized
            technologies.
          </p>
        </Reveal>

        {/* Services Grid */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Reveal key={index} delay={index * 60}>
                <Card className={`h-full ${glassCard}`}>
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary">{service.category}</Badge>
                    </div>
                    <CardTitle className="font-display text-lg">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Key Features:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Soapbox Products Section */}
        <div className="mb-20">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Built at <GradientText>Soapbox</GradientText>
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              As Developer Relations at Soapbox, Derek champions the freedom-tech
              products reshaping the decentralized web.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {soapboxProducts.map((solution, index) => (
              <Reveal key={solution.name} delay={index * 60}>
                <SolutionCard solution={solution} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Nostr Solutions Section */}
        <div className="mb-20">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Nostr <GradientText>Solutions</GradientText>
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Battle-tested services Derek has built to strengthen and expand
              the Nostr ecosystem.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Reveal key={index} delay={index * 60}>
                <SolutionCard solution={solution} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Nostr Applications Section */}
        <div className="mb-20">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Nostr <GradientText>Applications</GradientText>
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Applications built by Derek for the Nostr ecosystem.
            </p>
          </Reveal>

          {appsLoading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProjectSkeleton key={`app-skeleton-${index}`} />
              ))}
            </div>
          ) : applications && applications.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {applications.map((app, index) => (
                <Reveal key={app.id} delay={index * 60}>
                  <ApplicationCard app={app} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Card className="border-dashed bg-card/60 backdrop-blur-xl">
              <CardContent className="px-8 py-12 text-center">
                <Smartphone className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h4 className="mb-2 font-display text-lg font-semibold">
                  No Applications Found
                </h4>
                <p className="text-muted-foreground">
                  Derek's Nostr applications will appear here when published to
                  the network.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Nostr Repositories Section */}
        <div className="mb-20">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Nostr <GradientText>Repositories</GradientText>
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Open source repositories and contributions to the Nostr
              ecosystem.
            </p>
          </Reveal>

          {reposLoading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectSkeleton key={`repo-skeleton-${index}`} />
              ))}
            </div>
          ) : repositories && repositories.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {repositories.map((repo, index) => (
                <Reveal key={repo.id} delay={index * 60}>
                  <RepositoryCard repo={repo} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Card className="border-dashed bg-card/60 backdrop-blur-xl">
              <CardContent className="px-8 py-12 text-center">
                <GitBranch className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h4 className="mb-2 font-display text-lg font-semibold">
                  No Repositories Found
                </h4>
                <p className="text-muted-foreground">
                  Derek's Nostr repositories will appear here when announced on
                  the network.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact CTA */}
        <Reveal>
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-brand text-white shadow-2xl shadow-primary/30">
            <AuroraBackground />
            <CardContent className="relative p-10 text-center md:p-12">
              <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Ready to Work Together?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                Need a speaker who can fill a room, a guide to AI and nostr, or
                technical consulting on decentralized tech? Derek will help you
                navigate the future — and build it.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="glass"
                  onClick={() => navigate("/contact")}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Book me to speak
                </Button>
                <Button
                  size="lg"
                  variant="glass"
                  onClick={() => navigate("/events")}
                >
                  View Speaking Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
