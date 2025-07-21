import { useSeoMeta } from '@unhead/react';
import { NostrGuides } from "@/components/sections/NostrGuides";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const GuidesPage = () => {
  useSeoMeta({
    title: 'Nostr Guides - Learn About Decentralized Social Media',
    description: 'Comprehensive guides to help you understand and use Nostr. Learn about zaps, relays, addresses, and more in our detailed tutorials.',
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