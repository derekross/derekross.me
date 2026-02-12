import { useSeoMeta } from '@unhead/react';
import { NostrGuides } from "@/components/sections/NostrGuides";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const GuidesPage = () => {
  useSeoMeta({
    title: 'Guides & Presentations - AI, Nostr & Technology',
    description: 'Explore presentations on AI and technology, navigate the Nostr ecosystem, and find extensive how-to guides. From AI fundamentals to decentralized social media.',
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