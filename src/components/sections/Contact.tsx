import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Zap, ExternalLink, MessageCircle, MapPin, Clock } from "lucide-react";
import { DEREK_CONTACTS } from "@/lib/derek";
import { ZapButton } from "@/components/ZapButton";

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
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Hero Image */}
        <div className="mb-12">
          <img
            src="/derek-workshop.jpg"
            alt="Derek Ross"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover object-[center_calc(25%-40px)] h-64 md:h-96"
          />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For inquiries regarding speaking engagements, AI workshops, consulting services, or media appearances,
            please do not hesitate to contact Derek Ross. Your interest is greatly appreciated. Pura vida.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            const isLightning = method.title === "Lightning Address";

            return (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                  <p className="text-primary font-mono text-sm mb-2">{method.value}</p>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{method.description}</p>

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
            );
          })}
        </div>

        {/* Inquiry Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Can Derek Help With?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inquiryTypes.map((inquiry, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3">{inquiry.title}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {inquiry.description}
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Key Areas:</h5>
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
            ))}
          </div>
        </div>

        {/* Availability & Response */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 dark:border-purple-800">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Availability & Response</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div className="text-muted-foreground text-sm">Usually within 24-48 hours</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Travel</div>
                      <div className="text-muted-foreground text-sm">Available for international events</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium">Preferred Contact</div>
                      <div className="text-muted-foreground text-sm">Nostr DM or email for business</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">🤙</div>
                  <div className="text-lg font-semibold">Pura Vida</div>
                  <div className="text-muted-foreground">Let's build the future together</div>
                </div>
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, '_blank')}
                  >
                    Message on Nostr
                  </Button>
                  <Button
                    variant="outline"
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


      </div>
    </section>
  );
}