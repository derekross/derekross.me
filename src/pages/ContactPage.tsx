import { useSeoMeta } from '@unhead/react';
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const ContactPage = () => {
  useSeoMeta({
    title: 'Contact Derek Ross - Get in Touch',
    description: 'Contact Derek Ross for speaking engagements, consulting opportunities, or questions about Nostr and decentralized technology.',
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