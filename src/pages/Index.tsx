import { useSeoMeta } from '@unhead/react';
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyNostr } from "@/components/sections/WhyNostr";
import { LatestNotes } from "@/components/sections/LatestNotes";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { NostrGuides } from "@/components/sections/NostrGuides";
import { Services } from "@/components/sections/Services";
import { Events } from "@/components/sections/Events";
import { Media } from "@/components/sections/Media";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  useSeoMeta({
    title: 'Derek Ross - Developer Relations at Soapbox | Nostr & AI Advocate',
    description: 'Derek Ross is Developer Relations at Soapbox, building the future of decentralized social media with Shakespeare and Nostr. Passionate about AI, vibe coding, and empowering communities through open protocols.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <WhyNostr />
        <LatestNotes />
        <LatestArticles />
        <PhotoGallery />
        <NostrGuides />
        <Services />
        <Events />
        <Media />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
