import { useSeoMeta } from '@unhead/react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Media } from "@/components/sections/Media";

const MediaPage = () => {
  useSeoMeta({
    title: 'Media & Podcasts - Derek Ross',
    description: 'Derek Ross media appearances, podcast interviews, and video content discussing AI, Nostr, Bitcoin, vibe coding, and decentralized technologies.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Media />
      </main>
      <Footer />
    </div>
  );
};

export default MediaPage;