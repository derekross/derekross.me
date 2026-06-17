import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Zap, ExternalLink, MessageCircle, MapPin, Clock } from "lucide-react";
import { DEREK_CONTACTS } from "@/lib/derek";
import { ZapButton } from "@/components/ZapButton";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

export function Contact() {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Nostr Address",
      value: `@${DEREK_CONTACTS.nostrAddress}`,
      description: "Send a direct message on Nostr",
      action: () => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank'),
      color: "bg-purple-500"
    },
    {
      icon: Mail,
      title: "Email Address",
      value: DEREK_CONTACTS.email,
      description: "Traditional email for business inquiries",
      action: () => window.location.href = `mailto:${DEREK_CONTACTS.email}`,
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Address",
      value: DEREK_CONTACTS.lightning,
      description: "Send Bitcoin tips via Lightning Network",
      action: null, // Will be handled by ZapButton
      color: "bg-yellow-500"
    }
  ];

  const inquiryTypes = [
    {
      title: "Speaking Engagements",
      description: "Conference presentations, keynotes, and panel discussions",
      topics: ["Nostr Education", "Decentralization", "Bitcoin & Lightning", "Censorship Resistance"]
    },
    {
      title: "Consulting Services",
      description: "Technical consulting for Nostr implementation and strategy",
      topics: ["Protocol Implementation", "Client Development", "Relay Setup", "Community Building"]
    },
    {
      title: "Media Appearances",
      description: "Podcast interviews, video content, and media discussions",
      topics: ["Nostr 101", "Future of Social Media", "Bitcoin Integration", "Technical Deep Dives"]
    },
    {
      title: "Community Events",
      description: "Meetups, workshops, and community building activities",
      topics: ["Nostr Booths", "Educational Workshops", "Community Meetups", "Developer Events"]
    }
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />
      <div className="container mx-auto px-4">
        {/* Hero Image */}
        <Reveal className="mb-12">
          <div className="mx-auto w-fit max-w-4xl rounded-3xl bg-gradient-brand p-[3px] shadow-2xl shadow-primary/30">
            <img
              src="/derek-workshop.jpg"
              alt="Derek Ross"
              className="h-64 w-full rounded-[calc(1.5rem-3px)] object-cover object-[center_calc(25%-40px)] md:h-96"
            />
          </div>
        </Reveal>

        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Let's <GradientText>Build the Future</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Speaking engagements, AI workshops, consulting, or media
            appearances — reach out and let's make something happen. Your
            interest is greatly appreciated. Pura vida.
          </p>
        </Reveal>

        {/* Contact Methods */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            const isLightning = method.title === "Lightning Address";

            return (
              <Reveal key={index} delay={index * 80}>
                <Card className={`h-full ${glassCard}`}>
                  <CardContent className="flex h-full flex-col p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-primary/25">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 font-display text-lg font-semibold">{method.title}</h3>
                    <p className="mb-2 font-mono text-sm text-primary break-all">{method.value}</p>
                    <p className="mb-4 flex-grow text-sm text-muted-foreground">{method.description}</p>

                    {isLightning ? (
                      <ZapButton
                        recipient={DEREK_CONTACTS.lightning}
                        size="sm"
                        className="w-full"
                      >
                        Send Zap
                      </ZapButton>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={method.action as () => void}
                      >
                        Contact <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Inquiry Types */}
        <div className="mb-20">
          <Reveal className="mb-10 text-center">
            <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              What Can Derek <GradientText>Help With?</GradientText>
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {inquiryTypes.map((inquiry, index) => (
              <Reveal key={index} delay={index * 60}>
                <Card className={`h-full ${glassCard}`}>
                  <CardContent className="p-6">
                    <h4 className="mb-3 font-display text-lg font-semibold">{inquiry.title}</h4>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {inquiry.description}
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Key Areas:</h5>
                      <div className="flex flex-wrap gap-2">
                        {inquiry.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Availability & Response */}
        <Reveal>
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-brand text-white shadow-2xl shadow-primary/30">
            <AuroraBackground />
            <CardContent className="relative p-8 md:p-10">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">Availability & Response</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Response Time</div>
                        <div className="text-sm text-white/80">Usually within 24-48 hours</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Travel</div>
                        <div className="text-sm text-white/80">Available for international events</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Preferred Contact</div>
                        <div className="text-sm text-white/80">Nostr DM or email for business</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="mb-6">
                    <div className="mb-2 text-4xl font-bold">🤙</div>
                    <div className="font-display text-lg font-semibold">Pura Vida</div>
                    <div className="text-white/80">Let's build the future together</div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      variant="glass"
                      className="w-full md:w-auto"
                      onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
                    >
                      Message on Nostr
                    </Button>
                    <Button
                      variant="glass"
                      size="lg"
                      className="w-full md:w-auto"
                      onClick={() => window.location.href = `mailto:${DEREK_CONTACTS.email}`}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>


      </div>
    </section>
  );
}
