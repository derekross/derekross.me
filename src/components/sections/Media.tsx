import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Calendar, Mic, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

export function Media() {
  const navigate = useNavigate();
  const mediaAppearances = [
    {
      show: "Have Fun Stacking Sats",
      title: "HFSS Episode 5: Derek Ross Nostr Adoption",
      date: "January 13, 2023",
      url: "https://www.youtube.com/watch?v=s_n8E6kMkX4",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Nostrovia - The Nostr Podcast",
      title: "Derek Ross: Nostr Plebs",
      date: "January 22, 2023",
      url: "https://fountain.fm/episode/AhKabAawTTPpz3BKT5nc",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "Max DeMarco Documentary",
      title: "Social Media is Broken. Can We Fix It?",
      date: "March 20, 2023",
      url: "https://www.youtube.com/watch?v=aA-jiiepOrE",
      type: "YouTube",
      platform: "Documentary",
    },
    {
      show: "The Jack Starling Podcast",
      title: "#13 Derek Ross - Nostr 101",
      date: "April 4, 2023",
      url: "https://www.youtube.com/watch?v=p4yi0qvhxL4",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Plebchain Radio",
      title: "Derek Ross discusses Nest, Bitcoin and Nostr",
      date: "June 5, 2023",
      url: "https://fountain.fm/episode/aDAFZeuYgAnqbPJRaUQh",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "Green Candle",
      title: "Derek Ross on the future of Nostr",
      date: "June 27, 2023",
      url: "https://www.youtube.com/watch?v=InfbvqzJYU8",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Plebchain Radio",
      title: "Derek Ross - Building Community with Nostr and Project Updates",
      date: "September 9, 2023",
      url: "https://fountain.fm/episode/NDvjpKBCspOndDtvZKGd",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "Plebchain Radio",
      title: "Holiday Special - Year-End Review with Vanessa, Marce & Derek Ross",
      date: "December 23, 2023",
      url: "https://fountain.fm/episode/MLJhfRIbsjgAQe3HqkEa",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "Nostr Report",
      title: "#MarceFiles #BH2023 with Derek Ross",
      date: "October 2, 2023",
      url: "https://www.youtube.com/watch?v=_Dk3NUSlmh8",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Crox Road",
      title: "Nostr: The secret weapon of Bitcoin influencers",
      date: "October 12, 2023",
      url: "https://www.youtube.com/watch?v=5MCehlYXGO0",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Thank God for Nostr",
      title: "Derek Ross",
      date: "February 20, 2024",
      url: "https://fountain.fm/episode/M4VmCJJkr1OQXEZfF8ez",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "Ben Wehrman Podcast",
      title: "Derek Ross - Nostr 101 (BWP15)",
      date: "March 4, 2024",
      url: "https://www.youtube.com/watch?v=_jrkUXDReqI",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Plebchain Radio",
      title: "Kieran & Derek Ross - What the Heck is Nostr Nests?",
      date: "March 16, 2024",
      url: "https://fountain.fm/episode/4oVejgn5JSWfEODpq0QY",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "BTC Prague",
      title: "Nostr: All Your Silos Are Broken",
      date: "June 21, 2024",
      url: "https://www.youtube.com/watch?v=SSFVR5ZXOuA",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "BTC Prague",
      title: "Nostr for Censorship Resistance",
      date: "June 27, 2024",
      url: "https://www.youtube.com/watch?v=J_k3fQThy3s",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "Playable Characters Show",
      title:
        "Derek Ross: NOSTR + BITCOIN allows humans to reclaim FREE SPEECH & TRANSACT FREELY",
      date: "July 31, 2024",
      url: "https://www.youtube.com/watch?v=VLK2zsfC510",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Nostriga",
      title: "Nostr for Beginners w/ Derek Ross",
      date: "August 22, 2024",
      url: "https://www.youtube.com/watch?v=NVm_jGdwTjQ",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "Bitcoin Made Simple",
      title: "BMS 157: NOSTR Interview with Derek Ross",
      date: "August 31, 2024",
      url: "https://www.youtube.com/watch?v=Qw00zFa-Boo",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Bitcoin Infinity Show",
      title: "Nostr Deep Dive with Derek Ross - Bitcoin Infinity Show 126",
      date: "September 18, 2024",
      url: "https://www.youtube.com/watch?v=aFvog4Vg1zk",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Plebchain Radio",
      title: "PlebConf Comes to Nostr Valley with Derek Ross & Seth",
      date: "September 28, 2024",
      url: "https://fountain.fm/episode/LusXezoIZGFKLaDg7jbI",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "Bitcoin Builders Conference",
      title: "Nostr for Builders",
      date: "October 3, 2024",
      url: "https://www.youtube.com/watch?v=heEZSr8QLew",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "Your Bitcoin Story",
      title: "Building a Decentralized Future On Nostr",
      date: "October 10, 2024",
      url: "https://www.youtube.com/watch?v=qN65bgJOah8",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Plebchain Radio",
      title: "Cirque Du NosVegas with Tanja, Derek Ross & Open Mike",
      date: "May 3, 2025",
      url: "https://fountain.fm/episode/K3lBNLnPuyqZEEEjPT8K",
      type: "Fountain",
      platform: "Podcast",
    },
    {
      show: "Bitcoin Conference 2025",
      title: "Decentralizing Social Media: Bitcoin, Nostr & Freedom Tech | Martti Malmi & Derek Ross",
      date: "May 28, 2025",
      url: "https://www.youtube.com/watch?v=WYIbTxlVS0Q",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "Bitcoin Magazine",
      title: "Are You Even A Bitcoiner If You're Not On Nostr?",
      date: "August 19, 2025",
      url: "https://bitcoinmagazine.com/conference/a-bitcoiner-must-be-on-nostr",
      type: "Bitcoin Magazine",
      platform: "Article",
    },
    {
      show: "Imagine If",
      title: "Open Communities in the Age of Control - Matt Odell, Derek Ross, & Shawn Yeager",
      date: "September 20, 2025",
      url: "https://www.youtube.com/watch?v=kbMfJtEHHLQ",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Nostr Valley 2.0",
      title: "Shakespeare: AI-Powered App Creation on Nostr",
      date: "October 20, 2025",
      url: "https://www.youtube.com/watch?v=W7ZtV7kxkx4",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "All In Bitcoin With CK",
      title: "021 The Internet Just Split In Two: Which Side Are You On?",
      date: "November 26, 2025",
      url: "https://www.youtube.com/watch?v=9rGjQfU7rNU",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Bitcoin 2026",
      title: "Vibe Coding on Bitcoin",
      date: "April 27, 2026",
      url: "https://www.youtube.com/watch?v=zf-XIy7dyyY",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "Bitcoin 2026",
      title: "Protocol vs Platform: Nostr's Utility Beyond Social Media",
      date: "April 27, 2026",
      url: "https://www.youtube.com/watch?v=wrlE0DMoTSc",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "Bitcoin 2026",
      title: "AI + Bitcoin + Nostr = Freedom Tech Stack",
      date: "April 27, 2026",
      url: "https://www.youtube.com/watch?v=YS5dCrLWRgM",
      type: "YouTube",
      platform: "Conference Talk",
    },
    {
      show: "THE Bitcoin Podcast with Walker",
      title: "This AI Agent Experiment Is About to Change Bitcoin Forever",
      date: "March 3, 2026",
      url: "https://www.youtube.com/watch?v=MAiLPJhzW3c",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Forbes",
      title: "UK's Under-16 Social Media Ban Risks Digital ID Expansion",
      date: "June 17, 2026",
      url: "https://www.forbes.com/sites/digital-assets/2026/06/17/uks-under-16-social-media-ban-risks-digital-id-expansion/",
      type: "Forbes",
      platform: "Article",
    },
    {
      show: "All In Bitcoin With CK",
      title: "029 They Can't Ban This!",
      date: "April 1, 2026",
      url: "https://www.youtube.com/watch?v=CuqakIBDCVM",
      type: "YouTube",
      platform: "Video",
    },
    {
      show: "Stackchain Magazine",
      title: "Why Bitcoiners Should Revisit Decentralized Communication",
      date: "January 25, 2026",
      url: "https://www.stackchainmagazine.net/why-bitcoiners-should-revisit-decentralized-communication-by-derek-ross/",
      type: "Stackchain Magazine",
      platform: "Article",
    },
    {
      show: "Fractal Bitcoin",
      title: "What Is Nostr (The New Internet) and Should You Care?",
      date: "January 11, 2025",
      url: "https://www.youtube.com/watch?v=2cZtEVikH98",
      type: "YouTube",
      platform: "Video",
    },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "podcast":
        return <Mic className="h-4 w-4" />;
      case "video":
      case "conference talk":
      case "documentary":
        return <Play className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "podcast":
        return "bg-green-500";
      case "video":
        return "bg-red-500";
      case "conference talk":
        return "bg-blue-500";
      case "article":
        return "bg-orange-500";
      case "documentary":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return "border-red-200 text-red-700 bg-red-50 dark:border-red-800 dark:text-red-300 dark:bg-red-950";
      case "fountain":
        return "border-green-200 text-green-700 bg-green-50 dark:border-green-800 dark:text-green-300 dark:bg-green-950";
      case "bitcoin magazine":
        return "border-orange-200 text-orange-700 bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:bg-orange-950";
      default:
        return "border-gray-200 text-gray-700 bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:bg-gray-950";
    }
  };

  // Group by year for better organization
  const groupedByYear = mediaAppearances.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<number, typeof mediaAppearances>);

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id="media" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            In the Media
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Podcasts, Talks & <GradientText>Press</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A growing library of interviews, keynotes, and deep dives where Derek
            unpacks AI, vibe coding, Nostr, Bitcoin, and the rebuild of the open
            internet — one conversation at a time.
          </p>
        </Reveal>

        <Reveal delay={80} className="mb-16">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-brand p-[2px] shadow-xl shadow-primary/20">
            <img
              src="/derek-bitcoin-2025.jpg"
              alt="Derek Ross in Media"
              className="h-64 w-full rounded-2xl object-cover object-[center_calc(25%+15px)] md:h-96"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Media by Year */}
        <div className="space-y-14">
          {years.map((year, yearIndex) => (
            <div key={year}>
              <Reveal>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="flex items-center font-display text-2xl font-extrabold tracking-tight">
                    <Calendar className="mr-2 h-6 w-6 text-primary" />
                    <GradientText>{year}</GradientText>
                  </h3>
                  <div className="h-px flex-1 bg-gradient-brand opacity-40" />
                </div>
              </Reveal>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {groupedByYear[year].map((media, index) => (
                  <Reveal key={index} delay={(yearIndex === 0 ? index : 0) * 50}>
                    <Card className={`h-full ${glassCard}`}>
                      <CardHeader className="pb-3">
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge
                                variant="outline"
                                className={getTypeColor(media.type)}
                              >
                                {media.type}
                              </Badge>
                              <Badge
                                className={`${getPlatformColor(
                                  media.platform
                                )} text-white`}
                              >
                                {getPlatformIcon(media.platform)}
                                <span className="ml-1">{media.platform}</span>
                              </Badge>
                            </div>
                            <CardTitle className="font-display text-lg font-bold leading-tight">
                              {media.title}
                            </CardTitle>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="font-medium text-foreground/80">
                            {media.show}
                          </div>
                          <div className="mt-1 flex items-center">
                            <Calendar className="mr-1 h-3 w-3 text-primary" />
                            {media.date}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          variant="glass"
                          className="w-full"
                          onClick={() => window.open(media.url, "_blank")}
                        >
                          {getPlatformIcon(media.platform)}
                          <span className="ml-2">
                            {media.platform.toLowerCase() === "article"
                              ? "Read Article"
                              : media.platform.toLowerCase() === "documentary"
                              ? "Watch Documentary"
                              : "Watch/Listen"}
                          </span>
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soapbox Sessions Podcast */}
        <Reveal delay={80}>
          <Card className={`mt-16 overflow-hidden ${glassCard}`}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="overflow-hidden rounded-2xl border border-border/50 bg-gradient-brand p-[2px] shadow-xl shadow-primary/20">
                    <img
                      src="https://r2a.primal.net/uploads2/a/1d/c3/a1dc3a85d1b6762e05f671388319116c51866e441c66ea3391bc4f3e0f9e3d96.jpg"
                      alt="Soapbox Sessions Podcast"
                      className="w-full rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="space-y-4 md:col-span-2">
                  <div>
                    <Badge className="mb-3 bg-gradient-brand text-white">
                      <Mic className="mr-1 h-3 w-3" />
                      Derek's Podcast
                    </Badge>
                    <h3 className="mb-3 font-display text-3xl font-extrabold tracking-tight">
                      Soapbox <GradientText>Sessions</GradientText>
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      Your weekly dose of all things Nostr + AI. It's our Soapbox
                      about what's new, what's cool, and what's coming. We make it
                      easy to understand and keep up with everything happening in
                      the decentralized world of Nostr and AI as we rebuild the
                      Internet.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    variant="gradient"
                    onClick={() =>
                      window.open(
                        "https://fountain.fm/show/aq7IaS6bdQ6kF6NWDzzc",
                        "_blank"
                      )
                    }
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Listen on Fountain
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Featured Topics */}
        <Reveal delay={80}>
          <Card className={`mt-12 overflow-hidden ${glassCard}`}>
            <CardContent className="p-8">
              <h3 className="mb-2 text-center font-display text-2xl font-extrabold tracking-tight">
                Featured Discussion <GradientText>Topics</GradientText>
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
                The conversations Derek loves having on air — ready-made angles
                for your next episode.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Nostr Protocol Fundamentals",
                  "Bitcoin & Lightning Integration",
                  "Decentralized Social Media",
                  "Censorship Resistance",
                  "Digital Identity & Privacy",
                  "Community Building",
                  "Zaps & Micropayments",
                  "Choose Your Own Algorithm",
                  "Future of Social Communication",
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="glass flex items-center rounded-full px-4 py-3 transition-colors hover:border-primary/40"
                  >
                    <span className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-brand" />
                    <span className="text-sm font-medium">{topic}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Button
                  size="xl"
                  variant="gradient"
                  onClick={() => navigate("/contact")}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Invite Derek on Your Show
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
