import { useSeoMeta } from '@unhead/react';
import { Events } from "@/components/sections/Events";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const EventsPage = () => {
  useSeoMeta({
    title: 'Events - Derek Ross Speaking & Appearances',
    description: 'Upcoming and past events featuring Derek Ross. Find speaking engagements, conferences, and community events focused on Nostr and decentralized technology.',
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