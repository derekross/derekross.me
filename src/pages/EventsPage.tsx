import { useSeoMeta } from '@unhead/react';
import { Events } from "@/components/sections/Events";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const EventsPage = () => {
  useSeoMeta({
    title: 'Events - Derek Ross Speaking & Appearances',
    description: 'Where to catch Derek Ross next — keynotes, panels, and workshops on AI, Bitcoin, and Nostr at conferences worldwide.',
    ogImage: 'https://derekross.me/og/events.jpg',
    twitterImage: 'https://derekross.me/og/events.jpg',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;