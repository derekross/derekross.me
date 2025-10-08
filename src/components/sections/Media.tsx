import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Calendar, Mic } from "lucide-react";

export function Media() {
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
      show: "Imagine If",
      title: "Open Communities in the Age of Control - Matt Odell, Derek Ross, & Shawn Yeager",
      date: "September 20, 2025",
      url: "https://www.youtube.com/watch?v=kbMfJtEHHLQ",
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
        return <Play className="h-4 w-4" />;
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
    <section id="media" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Media & Podcasts</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse Derek's media library featuring him discussing nostr,
            Bitcoin, and related topics. These include interviews and
            discussions covering nostr education, adoption, building
            communities, and the protocol's impact on the future of social
            communication.
          </p>
        </div>

        <div className="mb-8">
          <img
            src="/derek-bitcoin-2025.jpg"
            alt="Derek Ross in Media"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover h-64 md:h-96"
          />
        </div>

        {/* Media by Year */}
        <div className="space-y-12">
          {years.map((year) => (
            <div key={year}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-primary" />
                {year}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groupedByYear[year].map((media, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Badge
                              variant="outline"
                              className={`mr-2 ${getTypeColor(media.type)}`}
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
                          <CardTitle className="text-lg leading-tight">
                            {media.title}
                          </CardTitle>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium">{media.show}</div>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {media.date}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(media.url, "_blank")}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch/Listen
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soapbox Sessions Podcast */}
        <Card className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <img
                  src="https://r2a.primal.net/uploads2/a/1d/c3/a1dc3a85d1b6762e05f671388319116c51866e441c66ea3391bc4f3e0f9e3d96.jpg"
                  alt="Soapbox Sessions Podcast"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Badge className="bg-purple-500 text-white mb-3">
                    <Mic className="h-3 w-3 mr-1" />
                    Derek's Podcast
                  </Badge>
                  <h3 className="text-3xl font-bold mb-3">Soapbox Sessions</h3>
                  <p className="text-muted-foreground text-lg">
                    Soapbox Sessions is your weekly dose of all things Nostr + AI.
                    It's our Soapbox about what's new, what's cool, and what's coming.
                    We want to make it easy to understand and keep up with everything
                    going on in the decentralized world of Nostr and AI as we work to
                    rebuild the Internet.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => window.open('https://fountain.fm/show/aq7IaS6bdQ6kF6NWDzzc', '_blank')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Listen on Fountain
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Topics */}
        <Card className="mt-12 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200 dark:border-green-800">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              Featured Discussion Topics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="flex items-center p-3 bg-background rounded-lg"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-sm font-medium">{topic}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                size="lg"
                onClick={() => window.location.href = '/contact'}
              >
                Invite Derek on Your Show
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
