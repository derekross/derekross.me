import { useSeoMeta } from '@unhead/react';
import { WhyNostr } from "@/components/sections/WhyNostr";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const WhyNostrPage = () => {
  useSeoMeta({
    title: 'Why Nostr? - Decentralized Social Communication',
    description: 'Why Nostr? Derek Ross on the open protocol giving people back control of their identity, content, and social graph.',
    ogImage: 'https://derekross.me/og/whynostr.png',
    twitterImage: 'https://derekross.me/og/whynostr.png',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <WhyNostr />
      </main>
      <Footer />
    </div>
  );
};

export default WhyNostrPage;