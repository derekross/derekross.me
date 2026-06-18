import { useSeoMeta } from '@unhead/react';
import { NostrGuides } from "@/components/sections/NostrGuides";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const GuidesPage = () => {
  useSeoMeta({
    title: 'Guides & Presentations - AI, Nostr & Technology',
    description: 'Guides and slide decks from Derek Ross on Nostr, zaps, relays, AI, and building on the decentralized web.',
    ogImage: 'https://derekross.me/og/guides.png',
    twitterImage: 'https://derekross.me/og/guides.png',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <NostrGuides />
      </main>
      <Footer />
    </div>
  );
};

export default GuidesPage;