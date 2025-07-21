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
} from "lucide-react";
import { useDerekApplications } from "@/hooks/useDerekApplications";
import { useDerekRepositories } from "@/hooks/useDerekRepositories";

export function Services() {
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

  const services = [
    {
      icon: Presentation,
      title: "Speaking Engagements",
      description:
        "Derek speaks at international Bitcoin and nostr conferences, sharing expertise on decentralization, censorship resistance, and nostr education.",
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
        "Comprehensive education on nostr protocol, helping users understand decentralized social communication and take control of their digital identity.",
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
        "Technical consulting for nostr application development, protocol implementation, and ecosystem integration.",
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {app.picture ? (
            <img
              src={app.picture}
              alt={app.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-lg">
                {app.displayName || app.name}
              </h4>
              <Badge variant="outline">App</Badge>
            </div>
            {app.description && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {app.description}
              </p>
            )}
            {app.supportedKinds.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
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
              <Globe className="h-4 w-4 mr-2" />
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <GitBranch className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-lg">{repo.name}</h4>
              <Badge variant="outline" className="mt-1">
                Repository
              </Badge>
            </div>
          </div>
        </div>

        {repo.description && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
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
              <Globe className="h-4 w-4 mr-2" />
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
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-lg ${solution.color}`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-2">{solution.name}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {solution.description}
              </p>
              <div className="mb-4">
                <h5 className="font-semibold text-sm mb-2">Key Features:</h5>
                <div className="grid grid-cols-2 gap-1">
                  {solution.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-xs text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => window.open(solution.url, "_blank")}
            className="w-full"
          >
            <Globe className="h-4 w-4 mr-2" />
            Visit Solution
          </Button>
        </CardContent>
      </Card>
    );
  };

  const ProjectSkeleton = () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
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
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Services & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Derek offers a range of services to help individuals, organizations,
            and developers understand, implement, and benefit from the nostr
            protocol and decentralized technologies.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${service.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Nostr Solutions Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Nostr Solutions</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions and services Derek has built to strengthen
              and expand the Nostr ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard key={index} solution={solution} />
            ))}
          </div>
        </div>

        {/* Nostr Applications Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Nostr Applications</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Applications built by Derek for the Nostr ecosystem
            </p>
          </div>

          {appsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProjectSkeleton key={`app-skeleton-${index}`} />
              ))}
            </div>
          ) : applications && applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {applications.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 px-8 text-center">
                <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">
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
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Nostr Repositories</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Open source repositories and contributions to the Nostr ecosystem
            </p>
          </div>

          {reposLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectSkeleton key={`repo-skeleton-${index}`} />
              ))}
            </div>
          ) : repositories && repositories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repositories.map((repo) => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 px-8 text-center">
                <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">
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
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 dark:border-purple-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you need a speaker for your conference, want to learn
              about nostr, or need technical consulting, Derek is here to help
              you navigate the decentralized future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/events'}
              >
                View Speaking Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
