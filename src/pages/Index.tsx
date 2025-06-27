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
    title: 'Derek Ross - Nostr Evangelist & Technology Advocate',
    description: 'Derek Ross is a technical evangelist for Nostr, a decentralized and censorship-resistant social communication protocol. Passionate about connecting people through open and innovative technology.',
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
