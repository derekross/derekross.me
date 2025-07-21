import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Lock, Cog, Monitor, Link, Gem } from "lucide-react";

export function WhyNostr() {
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
    <section id="why-nostr" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Nostr?</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Nostr stands for Notes and Other Stuff Transmitted by Relays. Like HTTP or Email, nostr is a protocol;
            an open standard in which anyone can build and everyone is free to participate. Nostr is designed with
            simplicity, empowering developers to build decentralized and censorship resistant tools for users across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => window.location.href = '/guides'}
          >
            Explore Nostr Guides
          </Button>
        </div>
      </div>
    </section>
  );
}