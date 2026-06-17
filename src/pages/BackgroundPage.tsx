import { useSeoMeta } from '@unhead/react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Users, Smartphone, Briefcase, Heart, Presentation, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GradientText } from '@/components/GradientText';
import { Reveal } from '@/components/Reveal';
import { AuroraBackground } from '@/components/AuroraBackground';

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

const iconTile =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary";

const iconTileBrand =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-primary/25";

const BackgroundPage = () => {
  const navigate = useNavigate();

  useSeoMeta({
    title: 'Background - Derek Ross',
    description: 'Learn about Derek Ross\'s background in technology, his role in Developer Relations at Soapbox, and his journey from community building to becoming a leading advocate for Nostr and AI.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="relative overflow-hidden">
        <AuroraBackground subtle />

        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {/* Header */}
            <Reveal>
              <header className="mb-12 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                  The Story
                </p>
                <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                  Derek's <GradientText>Background</GradientText>
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Two decades in technology, a track record of building communities at scale, and an
                  obsession with the open protocols rewiring how we connect.
                </p>
              </header>
            </Reveal>

            {/* Hero Image */}
            <Reveal delay={80}>
              <div className="mb-12">
                <div className="mx-auto w-fit rounded-3xl bg-gradient-brand p-[3px] shadow-xl shadow-primary/30">
                  <img
                    src="/derek-bitcoin-2025.jpg"
                    alt="Derek Ross"
                    className="h-64 w-full rounded-[calc(1.5rem-3px)] object-cover object-[center_calc(25%+15px)] ring-4 ring-background md:h-96"
                  />
                </div>
              </div>
            </Reveal>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Current Role - Soapbox */}
              <Reveal>
                <Card className={glassCard}>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className={iconTileBrand}>
                        <Rocket className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-display mb-2 text-2xl font-bold">Developer Relations at Soapbox</h2>
                        <p className="text-muted-foreground">Building the future of decentralized social media</p>
                      </div>
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                      Derek works in Developer Relations at{" "}
                      <a href="https://soapbox.pub" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Soapbox</a>
                      , a technology company building free and open-source software for decentralized social media. There he evangelizes the Nostr protocol and its ecosystem of tools, with a focus on{" "}
                      <a href="https://shakespeare.diy" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Shakespeare</a>
                      {" "}&mdash; an AI-powered app builder that lets anyone create and deploy web applications through natural conversation, entirely on decentralized infrastructure. He also champions{" "}
                      <a href="https://ditto.pub" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Ditto</a>
                      , Soapbox's flagship Nostr social client, and{" "}
                      <a href="https://agora.place" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">Agora</a>
                      , a decentralized platform helping human-rights activists organize safely and resist censorship.
                    </p>
                    <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                      Known as "The Nostr Evangelist" and jokingly called "The Nostr CEO," no one champions the open Nostr protocol harder than Derek. He builds the ecosystem through education, evangelism, and shipping genuinely useful applications &mdash; pairing deep technical expertise with a rare talent for community building and developer advocacy.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Derek is the mind behind vibe coding, NostrNests, YakBak, Zappix, Plektos, ZapTrax, and Zaplytics &mdash; and speaks fluently on everything from Nostr 101 to AI and vibe coding to how Shakespeare and Ditto are making the decentralized web easier &mdash; and more fun &mdash; than ever.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Community Building */}
              <Reveal delay={80}>
                <Card className={glassCard}>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className={iconTile}>
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-display mb-2 text-2xl font-bold">Community Building Pioneer</h2>
                        <p className="text-muted-foreground">Leading the way in decentralized digital communities</p>
                      </div>
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                      Derek Ross is a trailblazer in online community building, leading the way in the decentralized digital age.
                      Driven by a passion for creating meaningful virtual connections, he is a known figure in using Nostr to
                      bring people together worldwide and grow Nostr adoption.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      His command of online community dynamics and his commitment to fostering spaces where voices are heard
                      and relationships thrive make him a crucial player in today's digital world. In a time when authentic
                      connection matters more than ever, Derek is a leading force guiding us toward a more connected and decentralized future.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Technology Experience */}
              <Reveal delay={80}>
                <Card className={glassCard}>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className={iconTile}>
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-display mb-2 text-2xl font-bold">Two Decades in Technology</h2>
                        <p className="text-muted-foreground">Extensive experience across IT systems and infrastructure</p>
                      </div>
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                      With over 20 years in Information Technology, Derek has seen and shaped the evolution of online communities.
                      His career spans systems administration, network engineering, and a range of IT roles, including a decade managing
                      ERP student information systems in educational technology infrastructure.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      That deep technical background, paired with his passion for community building, led him to Developer
                      Relations at{" "}
                      <a href="https://soapbox.pub" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Soapbox</a>
                      , where he combines hands-on engineering with education and advocacy to advance the Nostr ecosystem and AI-powered development tools.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Google+ and Android Community */}
              <Reveal delay={80}>
                <Card className={glassCard}>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className={iconTile}>
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-display mb-2 text-2xl font-bold">Android Community Leadership</h2>
                        <p className="text-muted-foreground">Building massive communities and transitioning to journalism</p>
                      </div>
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                      Derek first made his mark on Google+ by building a thriving Android user community with over 4 million
                      members and 2 million followers on his personal profile. The experience taught him the power of authentic
                      engagement and the importance of fostering genuine connections.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      He then moved into online journalism, covering smartphone news and writing in-depth reviews for
                      Phandroid, one of the oldest Android news sites &mdash; a role that fused his technical expertise
                      with his talent for communication and community building.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Speaking and Expertise */}
              <Reveal delay={80}>
                <Card className={glassCard}>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className={iconTileBrand}>
                        <Presentation className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-display mb-2 text-2xl font-bold">Speaking and Expertise</h2>
                        <p className="text-muted-foreground">Engaging diverse audiences worldwide</p>
                      </div>
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                      As a sought-after speaker, Derek shares his expertise with wildly different audiences &mdash; from entrepreneurs
                      and small business owners to established corporations and everyday individuals looking to find their home on the internet.
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      His talks dig into the art of creating vibrant online ecosystems, emphasizing the pivotal role of
                      authenticity and engagement in building digital communities that last.
                    </p>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Personal Life */}
              <Reveal delay={80}>
                <Card className={glassCard}>
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start gap-4">
                      <div className={iconTile}>
                        <Heart className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="font-display mb-2 text-2xl font-bold">Family Man</h2>
                        <p className="text-muted-foreground">Balancing technology passion with family life</p>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Beyond community building and technology, Derek is a family man &mdash; married with two children. ❤️
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            </div>

            {/* Call to Action */}
            <Reveal delay={80}>
              <div className="mt-12 border-t border-border/50 pt-8 text-center">
                <h3 className="font-display text-2xl font-bold">
                  Connect with <GradientText>Derek</GradientText>
                </h3>
                <p className="mx-auto mt-3 mb-6 max-w-xl text-muted-foreground">
                  Learn more about Derek's work and join the conversation about decentralized communication.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    variant="gradient"
                    onClick={() => navigate('/contact')}
                  >
                    Get in Touch
                  </Button>
                  <Button
                    variant="glass"
                    size="lg"
                    onClick={() => navigate('/services')}
                  >
                    View Services
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BackgroundPage;
