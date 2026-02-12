import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function About() {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Derek</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Developer Relations at{" "}
            <a href="https://soapbox.pub" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soapbox</a>
            , with 20+ years in tech. Passionate about AI, decentralization, and empowering users through open protocols.
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
                  loading="lazy"
                />
                <div>
                  <h3 className="text-2xl font-bold">Background</h3>
                  <p className="text-muted-foreground">Developer Relations at Soapbox</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Derek works in Developer Relations at{" "}
                <a href="https://soapbox.pub" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soapbox</a>
                , where he evangelizes{" "}
                <a href="https://shakespeare.diy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shakespeare</a>
                {" "}&mdash; an AI-powered app builder that lets anyone create web applications through natural conversation, deployed on decentralized infrastructure powered by the Nostr protocol.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With 20+ years of experience in technology, Derek has excelled as a systems administrator, mobile tech journalist, and consultant. He speaks at international Bitcoin and nostr conferences including Nostrica, Nostriga, the Baltic Honeybadger, BTC Prague, and The Bitcoin Conference, covering topics like AI, vibe coding, decentralization, and censorship resistance.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
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

          {/* Speaking Events Card */}
          <Card className="h-full">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <img
                  src="/derek-workshop.jpg"
                  alt="Derek Ross Speaking"
                  className="w-20 h-20 rounded-full object-cover mr-4"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-2xl font-bold">Speaking Events</h3>
                  <p className="text-muted-foreground">International Conferences</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Derek has spoken at numerous international Bitcoin and nostr conferences, sharing his expertise on topics like
                AI, vibe coding, decentralization, censorship resistance, and reclaiming our attention. He explores how nostr allows users to
                control their portable digital identities and leads workshops on building with Shakespeare and AI tools.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Derek connects with a wide range of audiences, from chamber of commerce members learning about AI to Bitcoin enthusiasts exploring the Lightning Network. He supports developers by advocating for creative freedom and empowers users by helping them take charge of their social graphs.
              </p>
              <Button variant="outline" onClick={() => navigate('/events')}>
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
                loading="lazy"
              />
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-4">Nostr Fixes Social Media</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
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
      </div>
    </section>
  );
}