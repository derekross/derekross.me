import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

export function About() {
  const navigate = useNavigate();

  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            About
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            The <GradientText>Nostr Evangelist</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Developer Relations at{" "}
            <a
              href="https://soapbox.pub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Soapbox
            </a>{" "}
            with 20+ years in tech — turning AI, decentralization, and open
            protocols into ideas anyone can act on.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          {/* Background Card */}
          <Reveal>
            <Card className={`h-full ${glassCard}`}>
              <CardContent className="p-8">
                <div className="mb-6 flex items-center">
                  <img
                    src="/derek-bitcoin-2025.jpg"
                    alt="Derek Ross"
                    className="mr-4 h-20 w-20 rounded-full object-cover ring-2 ring-primary/30"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-bold">Background</h3>
                    <p className="text-muted-foreground">Developer Relations at Soapbox</p>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Derek works in Developer Relations at{" "}
                  <a href="https://soapbox.pub" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soapbox</a>
                  , where he evangelizes{" "}
                  <a href="https://shakespeare.diy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shakespeare</a>
                  {" "}&mdash; an AI-powered app builder that lets anyone create web applications through natural conversation, deployed on decentralized infrastructure powered by the Nostr protocol. He also champions Soapbox&apos;s flagship Nostr social client Ditto and the human-rights activist platform Agora.
                </p>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  With 20+ years of experience in technology, Derek has excelled as a systems administrator, mobile tech journalist, and consultant. He speaks at international Bitcoin and nostr conferences including Nostrica, Nostriga, the Baltic Honeybadger, BTC Prague, and The Bitcoin Conference, covering topics like AI, vibe coding, decentralization, and censorship resistance.
                </p>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  He is also a founder of{" "}
                  <a href="https://nostrplebs.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Nostr Plebs
                  </a>
                  , a nostr services provider, and is actively involved in the development of{" "}
                  <a href="https://nostrnests.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Nostr Nests
                  </a>
                  , a nostr powered audio space.
                </p>
                <Button variant="outline" onClick={() => navigate('/background')}>
                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Reveal>

          {/* Speaking Events Card */}
          <Reveal delay={120}>
            <Card className={`h-full ${glassCard}`}>
              <CardContent className="p-8">
                <div className="mb-6 flex items-center">
                  <img
                    src="/derek-workshop.jpg"
                    alt="Derek Ross Speaking"
                    className="mr-4 h-20 w-20 rounded-full object-cover ring-2 ring-primary/30"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-bold">Speaking Events</h3>
                    <p className="text-muted-foreground">International Conferences</p>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Derek has spoken at numerous international Bitcoin and nostr conferences, sharing his expertise on topics like
                  AI, vibe coding, decentralization, censorship resistance, and reclaiming our attention. He explores how nostr allows users to
                  control their portable digital identities and leads workshops on building with Shakespeare and AI tools.
                </p>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Derek connects with a wide range of audiences, from chamber of commerce members learning about AI to Bitcoin enthusiasts exploring the Lightning Network. He supports developers by advocating for creative freedom and empowers users by helping them take charge of their social graphs.
                </p>
                <Button variant="outline" onClick={() => navigate('/events')}>
                  View Events <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Nostr Mission Card */}
        <Reveal delay={80}>
          <Card className={`mt-8 overflow-hidden ${glassCard}`}>
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <img
                  src="/derek_5.jpg"
                  alt="Derek Ross - Nostr Advocate"
                  className="h-32 w-32 rounded-full object-cover object-top ring-2 ring-primary/30"
                  loading="lazy"
                />
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-display mb-4 text-2xl font-bold">
                    Nostr Fixes <GradientText>Social Media</GradientText>
                  </h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Derek is passionate about using technology to drive global progress. At{" "}
                    <a href="https://soapbox.pub" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soapbox</a>
                    , he works to make decentralized technology accessible to everyone through tools like{" "}
                    <a href="https://shakespeare.diy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shakespeare</a>
                    . He strongly believes that the nostr protocol can revolutionize social communication by making it more open, transparent, and resistant to censorship.
                  </p>
                  <Button variant="outline" onClick={() => navigate('/whynostr')}>
                    Learn About Nostr <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
