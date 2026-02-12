import { useSeoMeta } from '@unhead/react';
import { About } from "@/components/sections/About";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  useSeoMeta({
    title: 'About Derek Ross - Developer Relations at Soapbox',
    description: 'Learn about Derek Ross, Developer Relations at Soapbox. Building the future of decentralized social media with Shakespeare, Nostr, and AI-powered tools.',
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