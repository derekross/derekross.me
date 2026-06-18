import { useSeoMeta } from '@unhead/react';
import { Services } from "@/components/sections/Services";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const ServicesPage = () => {
  useSeoMeta({
    title: 'Services - Derek Ross | Soapbox Developer Relations',
    description: 'Book Derek Ross to speak, run an AI/Nostr workshop, or consult on decentralized tech — plus the products he builds at Soapbox.',
    ogImage: 'https://derekross.me/og/services.jpg',
    twitterImage: 'https://derekross.me/og/services.jpg',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;