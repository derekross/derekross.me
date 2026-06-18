import { useSeoMeta } from '@unhead/react';
import { About } from "@/components/sections/About";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  useSeoMeta({
    title: 'About Derek Ross - Developer Relations at Soapbox',
    description: 'Meet Derek Ross — "The Nostr Evangelist" and Developer Relations at Soapbox, turning AI, Bitcoin, and Nostr into ideas anyone can act on.',
    ogImage: 'https://derekross.me/og/about.png',
    twitterImage: 'https://derekross.me/og/about.png',
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