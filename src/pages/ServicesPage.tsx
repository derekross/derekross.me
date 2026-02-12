import { useSeoMeta } from '@unhead/react';
import { Services } from "@/components/sections/Services";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const ServicesPage = () => {
  useSeoMeta({
    title: 'Services - Derek Ross | Soapbox Developer Relations',
    description: 'Professional services offered by Derek Ross including AI workshops, Nostr consulting, Shakespeare demos, speaking engagements, and technology advocacy.',
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