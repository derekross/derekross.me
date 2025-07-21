import { useSeoMeta } from '@unhead/react';
import { WhyNostr } from "@/components/sections/WhyNostr";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const WhyNostrPage = () => {
  useSeoMeta({
    title: 'Why Nostr? - Decentralized Social Communication',
    description: 'Discover why Nostr is the future of social media. Learn about decentralization, censorship resistance, and user ownership in social communication.',
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