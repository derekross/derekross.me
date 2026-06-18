import { useSeoMeta } from '@unhead/react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Media } from "@/components/sections/Media";

const MediaPage = () => {
  useSeoMeta({
    title: 'Media & Podcasts - Derek Ross',
    description: 'Derek Ross on podcasts, stages, and in print — on AI, Bitcoin, Nostr, and the future of social media.',
    ogImage: 'https://derekross.me/og/media.jpg',
    twitterImage: 'https://derekross.me/og/media.jpg',
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