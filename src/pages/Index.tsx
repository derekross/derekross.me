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
import { Support } from "@/components/sections/Support";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useJsonLd } from "@/hooks/useJsonLd";
import { DEREK_PERSON_LD, SITE_URL } from "@/lib/seo";

const Index = () => {
  useSeoMeta({
    title: 'Derek Ross — Keynote Speaker on AI, Bitcoin & Nostr',
    description: 'Keynote speaker, builder, and Developer Relations lead at Soapbox. Derek Ross helps people and companies make sense of AI, Bitcoin, and Nostr — and build on the open protocols rewiring the internet. Book Derek to speak.',
    ogImage: 'https://derekross.me/og/default.jpg',
    twitterImage: 'https://derekross.me/og/default.jpg',
  });

  useJsonLd({
    '@graph': [
      {
        ...DEREK_PERSON_LD,
        description: 'Keynote speaker, builder, and Developer Relations lead at Soapbox, helping people make sense of AI, Bitcoin, and Nostr.',
        knowsAbout: ['Nostr', 'Bitcoin', 'Lightning Network', 'Artificial Intelligence', 'Decentralized social media', 'Developer Relations'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Derek Ross',
        publisher: { '@id': DEREK_PERSON_LD['@id'] },
      },
    ],
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
        <Support />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
