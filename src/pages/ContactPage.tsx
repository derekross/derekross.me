import { useSeoMeta } from '@unhead/react';
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const ContactPage = () => {
  useSeoMeta({
    title: 'Contact Derek Ross - Get in Touch',
    description: 'Get in touch with Derek Ross — speaking, workshops, consulting, and media. Reach him on Nostr, email, or Lightning.',
    ogImage: 'https://derekross.me/og/contact.png',
    twitterImage: 'https://derekross.me/og/contact.png',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;