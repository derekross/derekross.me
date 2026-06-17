import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Lock, Cog, Monitor, Link, Gem, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

export function WhyNostr() {
  const navigate = useNavigate();
  const features = [
    {
      icon: Code,
      title: "Nostr is Open",
      description: "Nostr is an open social protocol that lets people create, connect, and interact globally without the noise of ads or algorithms. It fosters a space where genuine human interactions are the focus, free from the distractions common in traditional social platforms."
    },
    {
      icon: Lock,
      title: "Nostr is Censorship Resistant",
      description: "Nostr runs on a decentralized system that doesn't rely on a few trusted servers for data transmission and storage. This setup eliminates the need for centralized authorities that could impose bans or censorship, ensuring a communication network that remains strong, open, and resilient."
    },
    {
      icon: Cog,
      title: "Nostr is Decentralized",
      description: "You can run your own nostr client or relay, giving you direct control over parts of the nostr protocol's infrastructure. Nostr is built by the users, for the users."
    },
    {
      icon: Monitor,
      title: "Nostr Utilizes Clients",
      description: "Clients serve as the cornerstone of the nostr protocol, endowing users with the capacity to tailor their social experiences to their own personal preferences and specifications."
    },
    {
      icon: Link,
      title: "Users in Control",
      description: "Users have the ability choose which relays to utilize, putting users in charge of their social graph and identity for the very first time. Nostr provides users with a portable digital social identity that they own and that they can take with them from application to application."
    },
    {
      icon: Gem,
      title: "Nostr's \"Other Stuff\" is Exciting",
      description: "In our current societal landscape, the demand for social interaction has never been more paramount. Therefore, the most popular use cases for nostr are twitter like alternatives. However, it is worth noting that the most exciting use cases for nostr extend beyond legacy social media client alternatives."
    }
  ];

  return (
    <section id="why-nostr" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />

      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            The Protocol
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Why <GradientText>Nostr</GradientText> Wins
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Nostr stands for Notes and Other Stuff Transmitted by Relays. Like HTTP or
            email, it's a protocol &mdash; an open standard anyone can build on and
            everyone is free to join. Radically simple by design, it hands developers
            the power to ship decentralized, censorship-resistant tools for people
            everywhere.
          </p>
        </Reveal>

        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Reveal key={index} delay={(index % 3) * 80}>
                <Card className={`h-full ${glassCard}`}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-lg font-bold tracking-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={160} className="text-center">
          <Button
            size="lg"
            variant="gradient"
            onClick={() => navigate('/guides')}
          >
            Explore Nostr Guides
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
