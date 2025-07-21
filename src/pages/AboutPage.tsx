import { useSeoMeta } from '@unhead/react';
import { About } from "@/components/sections/About";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  useSeoMeta({
    title: 'About Derek Ross - Nostr Evangelist & Technology Advocate',
    description: 'Learn about Derek Ross, a technical evangelist for Nostr and passionate advocate for decentralized social communication protocols.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;