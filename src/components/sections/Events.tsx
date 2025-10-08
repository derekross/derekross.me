import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, ExternalLink, Clock } from "lucide-react";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";

export function Events() {
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-2 flex items-center">
              {event.name || event.title}
              {event.url && (
                <ExternalLink
                  className="ml-2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => window.open(event.url, "_blank")}
                />
              )}
            </CardTitle>
            {event.location && (
              <div className="flex items-center text-muted-foreground text-sm mb-1 min-w-0">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
            <div className="flex items-center text-muted-foreground text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {event.date}
            </div>
          </div>
          <div className="flex flex-col gap-2">
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
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-6">
            {event.description}
          </p>
        </CardContent>
      )}
    </Card>
  );

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Speaking Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Derek has spoken at numerous international Bitcoin and nostr
            conferences, sharing his expertise on decentralization, censorship
            resistance, and empowering users to choose their own algorithms.
          </p>
        </div>

        <div className="mb-8">
          <img
            src="/derek_3.jpg"
            alt="Derek Ross Speaking at Conference"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover h-64 md:h-96"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="upcoming" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
              {isLoading && (
                <p className="text-muted-foreground">
                  Loading Nostr calendar events...
                </p>
              )}
            </div>

            {/* Nostr Calendar Events - Future */}
            {nostrEvents && nostrEvents.filter((e) => !e.isPast).length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  Calendar Events
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nostrEvents
                    .filter((e) => !e.isPast)
                    .map((event, index) => (
                      <EventCard
                        key={`future-${event.id}-${index}`}
                        event={event}
                        isNostrEvent={true}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Static Upcoming Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard key={`static-upcoming-${index}`} event={event} />
              ))}
            </div>

            {upcomingEvents.length === 0 &&
              (!nostrEvents ||
                nostrEvents.filter((e) => !e.isPast).length === 0) && (
                <Card className="border-dashed">
                  <CardContent className="py-12 px-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No Upcoming Events
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Check back soon for new speaking engagements and
                      conference appearances.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Invite Derek to Speak
                    </Button>
                  </CardContent>
                </Card>
              )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Past Speaking Events</h3>
              <p className="text-muted-foreground">
                A history of Derek's conference presentations and community
                engagements.
              </p>
            </div>

            {/* Nostr Calendar Events - Past */}
            {nostrEvents && nostrEvents.filter((e) => e.isPast).length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  Past Calendar Events
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nostrEvents
                    .filter((e) => e.isPast)
                    .map((event, index) => (
                      <EventCard
                        key={`past-${event.id}-${index}`}
                        event={event}
                        isNostrEvent={true}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Static Past Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <EventCard key={`static-past-${index}`} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Speaking Topics */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              Speaking Topics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                Book Derek for Your Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
