import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, ExternalLink, Clock, Mic } from "lucide-react";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useNavigate } from "react-router-dom";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";

const glassCard =
  "border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10";

export function Events() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const { data: nostrEvents, isLoading } = useCalendarEvents();

  // Static events from Derek's existing website
  const pastEvents = [
    {
      name: "Nostrica 2023",
      location: "Bitcoin Jungle, Uvita, Costa Rica",
      date: "March 19-21, 2023",
      url: "https://nostr.world/",
      type: "Conference",
    },
    {
      name: "Bitcoin Builders Conference 2023",
      location: "Miami Beach, Florida",
      date: "May 17, 2023",
      url: "https://www.bitcoinbuildersconf.com/",
      type: "Conference",
    },
    {
      name: "Canadian Bitcoin Conference",
      location: "Toronto, Canada",
      date: "June 17-18, 2023",
      url: "https://canadianbitcoinconf.com/",
      type: "Conference",
    },
    {
      name: "Baltic Honeybadger 2023",
      location: "Riga, Latvia",
      date: "September 2-3, 2023",
      url: "https://baltichoneybadger.com/",
      type: "Conference",
    },
    {
      name: "Nostrville",
      location: "Nashville, Tennessee, USA",
      date: "November 9-10, 2023",
      url: "https://www.meetup.com/bitcoinpark/events/292518506/",
      type: "Meetup",
    },
    {
      name: "Bitcoin Freedom Festival",
      location: "Bitcoin Jungle, Uvita, Costa Rica",
      date: "January 18-20, 2024",
      url: "https://www.bitcoinfreedomfestival.com/",
      type: "Festival",
    },
    {
      name: "Bitcoin Atlantis",
      location: "Madeira Island, Portugal",
      date: "March 1-3, 2024",
      url: "https://bitcoinatlantis.com/",
      type: "Conference",
    },
    {
      name: "BTC Prague",
      location: "Prague, Czech Republic",
      date: "June 13-15, 2024",
      url: "https://btcprague.com/",
      type: "Conference",
    },
    {
      name: "Nostriga",
      location: "Riga, Latvia",
      date: "August 22-23, 2024",
      url: "https://nostr.world/",
      type: "Conference",
    },
    {
      name: "Baltic Honeybadger 2024",
      location: "Riga, Latvia",
      date: "August 24-25, 2024",
      url: "https://baltichoneybadger.com/",
      type: "Conference",
    },
    {
      name: "Nostr Valley",
      location: "State College, Pennsylvania, USA",
      date: "October 12, 2024",
      url: "https://nostrvallye.com/",
      type: "Conference",
    },
    {
      name: "The BTCHEL Conference 2025",
      location: "Helsinki, Finland",
      date: "August 15-16, 2025",
      url: "https://btchel.com/",
      type: "Conference",
    },
    {
      name: "Nostrville 3.0",
      location: "Bitcoin Park, Nashville, TN",
      date: "October 25, 2025",
      url: "https://bitcoinpark.com/",
      type: "Meetup",
    },
    {
      name: "Nostrshire (Bitfest 2025)",
      location: "Pendulum Hotel, UK",
      date: "November 21, 2025",
      url: "https://bitfest.uk/",
      type: "Conference",
    },
  ];

  const upcomingEvents: typeof pastEvents = [];

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "conference":
        return "bg-blue-500";
      case "meetup":
        return "bg-green-500";
      case "festival":
        return "bg-purple-500";
      case "workshop":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const EventCard = ({
    event,
    isNostrEvent = false,
  }: {
    event: {
      name?: string;
      title?: string;
      location?: string;
      date: string;
      url?: string;
      type: string;
      description?: string;
      isCreator?: boolean;
      rsvpStatus?: string;
      isPast?: boolean;
    };
    isNostrEvent?: boolean;
  }) => (
    <Card className={`h-full ${glassCard}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="mb-2 flex items-center font-display text-lg font-bold">
              {event.name || event.title}
              {event.url && (
                <ExternalLink
                  className="ml-2 h-4 w-4 flex-shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => window.open(event.url, "_blank")}
                />
              )}
            </CardTitle>
            {event.location && (
              <div className="mb-1 flex min-w-0 items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4 text-primary" />
              {event.date}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={`${getEventTypeColor(event.type)} text-white`}>
              {event.type}
            </Badge>
            {isNostrEvent && event.isCreator && (
              <Badge variant="outline" className="text-xs">
                Creator
              </Badge>
            )}
            {isNostrEvent && event.rsvpStatus && !event.isCreator && (
              <Badge variant="secondary" className="text-xs">
                {event.rsvpStatus === "accepted"
                  ? "Attending"
                  : event.rsvpStatus}
              </Badge>
            )}
            {isNostrEvent && event.isPast && (
              <Badge variant="outline" className="text-xs opacity-60">
                Past Event
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      {isNostrEvent && event.description && (
        <CardContent className="pt-0">
          <p className="line-clamp-6 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </CardContent>
      )}
    </Card>
  );

  return (
    <section id="events" className="relative overflow-hidden py-24">
      <AuroraBackground subtle />
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            On Stage
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Speaking <GradientText>Engagements</GradientText>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From Bitcoin and Nostr conferences to chamber-of-commerce workshops,
            Derek takes the stage worldwide to demystify AI, vibe coding,
            decentralization, and censorship resistance.
          </p>
        </Reveal>

        <Reveal delay={80} className="mb-12">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-brand p-[2px] shadow-xl shadow-primary/20">
            <img
              src="/derek_3.jpg"
              alt="Derek Ross Speaking at Conference"
              className="h-64 w-full rounded-2xl object-cover md:h-96"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2 border border-border/50 bg-card/60 backdrop-blur-xl">
            <TabsTrigger value="upcoming" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <Reveal className="mb-8 text-center">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                Upcoming Events
              </h3>
              {isLoading && (
                <p className="mt-2 text-muted-foreground">
                  Loading Nostr calendar events...
                </p>
              )}
            </Reveal>

            {/* Nostr Calendar Events - Future */}
            {nostrEvents && nostrEvents.filter((e) => !e.isPast).length > 0 && (
              <div className="mb-8">
                <div className="mb-5 flex items-center gap-3">
                  <h4 className="font-display text-lg font-bold">
                    Calendar Events
                  </h4>
                  <div className="h-px flex-1 bg-gradient-brand opacity-40" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {nostrEvents
                    .filter((e) => !e.isPast)
                    .map((event, index) => (
                      <Reveal key={`future-${event.id}-${index}`} delay={index * 60}>
                        <EventCard event={event} isNostrEvent={true} />
                      </Reveal>
                    ))}
                </div>
              </div>
            )}

            {/* Static Upcoming Events */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {upcomingEvents.map((event, index) => (
                <Reveal key={`static-upcoming-${index}`} delay={index * 60}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>

            {upcomingEvents.length === 0 &&
              (!nostrEvents ||
                nostrEvents.filter((e) => !e.isPast).length === 0) && (
                <Reveal>
                  <Card className={`border-dashed ${glassCard}`}>
                    <CardContent className="px-8 py-12 text-center">
                      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <Calendar className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="mb-2 font-display text-lg font-bold">
                        Nothing on the calendar — yet
                      </h3>
                      <p className="mb-6 text-muted-foreground">
                        The next stage is open. Bring Derek to your conference,
                        meetup, or workshop.
                      </p>
                      <Button
                        size="lg"
                        variant="gradient"
                        onClick={() => navigate("/contact")}
                      >
                        <Mic className="mr-2 h-5 w-5" />
                        Invite Derek to Speak
                      </Button>
                    </CardContent>
                  </Card>
                </Reveal>
              )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <Reveal className="mb-8 text-center">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">
                Past Speaking Events
              </h3>
              <p className="mt-2 text-muted-foreground">
                A track record of conference keynotes, panels, and community
                stages across the globe.
              </p>
            </Reveal>

            {/* Nostr Calendar Events - Past */}
            {nostrEvents && nostrEvents.filter((e) => e.isPast).length > 0 && (
              <div className="mb-8">
                <div className="mb-5 flex items-center gap-3">
                  <h4 className="font-display text-lg font-bold">
                    Past Calendar Events
                  </h4>
                  <div className="h-px flex-1 bg-gradient-brand opacity-40" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {nostrEvents
                    .filter((e) => e.isPast)
                    .map((event, index) => (
                      <Reveal key={`past-${event.id}-${index}`} delay={index * 40}>
                        <EventCard event={event} isNostrEvent={true} />
                      </Reveal>
                    ))}
                </div>
              </div>
            )}

            {/* Static Past Events */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event, index) => (
                <Reveal key={`static-past-${index}`} delay={index * 40}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Speaking Topics */}
        <Reveal delay={80}>
          <Card className={`mt-12 overflow-hidden ${glassCard}`}>
            <CardContent className="p-8">
              <h3 className="mb-2 text-center font-display text-2xl font-extrabold tracking-tight">
                Speaking <GradientText>Topics</GradientText>
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
                A toolkit of talks tuned for any room — pick a theme or let Derek
                tailor one to your audience.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Nostr Protocol Education",
                  "Decentralization & Censorship Resistance",
                  "Choose Your Own Algorithm",
                  "Bitcoin & Lightning Integration",
                  "Digital Identity & Privacy",
                  "Community Building on Nostr",
                  "Zaps & Micropayments",
                  "Relay Infrastructure",
                  "Client Development",
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
                  Book Derek for Your Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
