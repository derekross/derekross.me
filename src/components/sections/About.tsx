import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Derek</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A tech industry veteran with 20 years of experience, passionate about decentralization and empowering users through open protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Background Card */}
          <Card className="h-full">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <img
                  src="/derek-bitcoin-2025.jpg"
                  alt="Derek Ross"
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold">Background</h3>
                  <p className="text-muted-foreground">Tech Industry Veteran</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Derek is a tech industry veteran with 20 years of experience, having excelled as a systems administrator,
                mobile tech journalist, and consultant. His impact extends to major events like Nostrica, Nostriga,
                the Baltic Honeybadger Bitcoin conference, and BTC Prague, where he speaks about nostr, a decentralized
                and censorship-resistant social communication protocol.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Derek's talks revolve around nostr education, growing nostr adoption, and empowering users to choose their own algorithms.
                Derek has also organized "nostr booths" at various conferences, which serve as key hubs for exploring and discussing
                the nostr protocol.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                He is also a founder of{" "}
                <a href="https://nostrplebs.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Nostr Plebs
                </a>
                , a nostr services provider and is actively involved in the development of{" "}
                <a href="https://nostrnests.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Nostr Nests
                </a>
                , a nostr powered audio space.
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/background'}>
                Learn More <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Speaking Events Card */}
          <Card className="h-full">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <img
                  src="/derek-workshop.jpg"
                  alt="Derek Ross Speaking"
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold">Speaking Events</h3>
                  <p className="text-muted-foreground">International Conferences</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Derek has spoken at numerous international Bitcoin and nostr conferences, sharing his expertise on topics like
                decentralization, censorship resistance, and reclaiming our attention. He explores how nostr allows users to
                control their portable digital identities and provides general education on the protocol.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Derek connects with a wide range of audiences, from Bitcoin enthusiasts who see nostr as the ideal app for the
                Lightning Network to those interested in innovative ideas like Zaps and Zapvertising. He also supports developers
                by advocating for creative freedom and empowers users by helping them take charge of their social graphs.
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/events'}>
                View Events <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Nostr Mission Card */}
        <Card className="mt-12">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <img
                src="/derek_5.jpg"
                alt="Derek Ross - Nostr Advocate"
                className="w-32 h-32 rounded-full object-cover object-top"
              />
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-4">Nostr Fixes Social Media</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Derek is passionate about using technology to drive global progress. He strongly believes that the nostr protocol
                  could revolutionize social communication by making it more open, transparent, and resistant to censorship.
                  Derek is dedicated to educating people about the many benefits of nostr and is excited to see its widespread
                  adoption as a means of improving the world.
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/whynostr'}>
                  Learn About Nostr <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}