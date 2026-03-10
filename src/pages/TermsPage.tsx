import { useSeoMeta } from '@unhead/react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const EFFECTIVE_DATE = "March 10, 2026";

const TermsPage = () => {
  useSeoMeta({
    title: 'Terms of Service — Derek Ross',
    description: 'Terms of Service for all applications and tools created by Derek Ross, including Nostr Plebs, Nostr Nests, and other Nostr-based projects.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">Terms of Service</h1>
            <p className="text-muted-foreground text-sm">
              Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last updated: {EFFECTIVE_DATE}
            </p>
          </div>

          {/* Intro callout */}
          <div className="bg-muted rounded-xl p-5 mb-10 text-sm text-muted-foreground border border-border">
            <strong className="text-foreground">The short version:</strong> Use these tools responsibly,
            respect the Nostr protocol and the communities built around it, and understand that most of this
            software is provided as-is. Bitcoin and Lightning are real money — use them accordingly.
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">

            <p className="text-muted-foreground">
              These Terms of Service ("Terms") govern your access to and use of all applications, tools, bots,
              and services created and maintained by Derek Ross ("I," "me," or "my"), including but not limited
              to: Nostr Plebs, Nostr Nests, YakBak, Zappix, Plektos, ZapTrax, Zaplytics, diVine, Bluestrbot,
              and other projects hosted at derekross.me. By accessing or using any of these applications, you
              agree to be bound by these Terms. If you do not agree, please do not use the services.
            </p>

            <Section title="1. Eligibility">
              <p className="text-muted-foreground">
                You must be at least 13 years of age to use these services. By using them, you represent that
                you meet this requirement and that you have the legal capacity to enter into these Terms.
              </p>
            </Section>

            <Section title="2. Description of Services">
              <p className="text-muted-foreground">
                My applications are open-source tools built on top of the Nostr protocol, Bitcoin, and the
                Lightning Network. They are designed to empower users with decentralized communication, Bitcoin
                payments, content creation, and social media automation. Features vary by application and may
                change over time.
              </p>
            </Section>

            <Section title="3. Your Responsibilities">
              <p className="text-muted-foreground mb-3">By using these services, you agree to:</p>
              <ul className="space-y-2 text-muted-foreground">
                <Li>Use the services only for lawful purposes and in compliance with all applicable laws and regulations</Li>
                <Li>Not use the services to harass, spam, or harm other users or the broader Nostr community</Li>
                <Li>Not attempt to reverse-engineer, exploit, or abuse the services in ways that degrade performance for other users</Li>
                <Li>Safeguard your own private keys (nsec) — I have no ability to recover lost keys and am not responsible for lost funds resulting from key mismanagement</Li>
                <Li>Comply with the terms of any third-party platforms you connect (e.g., TikTok, X, LinkedIn) through integration features</Li>
                <Li>Not use automated cross-posting or bot features in ways that violate the terms of service of connected platforms</Li>
              </ul>
            </Section>

            <Section title="4. Bitcoin and Lightning Network">
              <div className="bg-muted border border-border rounded-lg p-4 mb-4 text-sm text-muted-foreground">
                ⚠️ Bitcoin and Lightning Network transactions are irreversible. Once a payment is sent, it cannot
                be recalled. Use these features carefully and only send amounts you are prepared to lose in the
                event of a technical failure.
              </div>
              <p className="text-muted-foreground">
                I am not a financial institution, money transmitter, or payment processor. My applications
                facilitate interactions with open, decentralized protocols. I have no custody or control over
                your Bitcoin or Lightning funds.
              </p>
            </Section>

            <Section title="5. Nostr Protocol">
              <p className="text-muted-foreground">
                Nostr is a decentralized, censorship-resistant protocol. Events you publish through my
                applications are broadcast to public relays and may be stored, republished, or indexed by
                third parties beyond my control. I cannot delete or modify events once they are published
                to the network.
              </p>
              <p className="text-muted-foreground mt-3">
                Your Nostr private key (nsec) is your identity. Never share it with anyone, including me.
                My applications do not require or request your private key.
              </p>
            </Section>

            <Section title="6. Third-Party Integrations">
              <p className="text-muted-foreground">
                Some features involve connecting third-party accounts (TikTok, X, LinkedIn, etc.). You are
                responsible for ensuring your use of these integrations complies with those platforms' terms
                of service. I am not responsible for account suspensions, content removals, or other actions
                taken by third-party platforms.
              </p>
            </Section>

            <Section title="7. Intellectual Property">
              <p className="text-muted-foreground">
                My applications are generally released as open-source software. Refer to the license file in
                each project's repository for specific terms. The name "Derek Ross," associated branding, and
                content on derekross.me are my property and may not be used without permission.
              </p>
            </Section>

            <Section title="8. Disclaimer of Warranties">
              <p className="text-muted-foreground mb-3">
                These services are provided <strong className="text-foreground">"as is"</strong> and{" "}
                <strong className="text-foreground">"as available"</strong> without warranty of any kind,
                express or implied. I make no guarantees that:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <Li>The services will be uninterrupted, error-free, or secure</Li>
                <Li>Any content posted to Nostr relays will be stored or remain available</Li>
                <Li>Cross-posting integrations will function continuously as third-party APIs change</Li>
                <Li>Lightning payments will route successfully under all network conditions</Li>
              </ul>
            </Section>

            <Section title="9. Limitation of Liability">
              <p className="text-muted-foreground">
                To the maximum extent permitted by applicable law, I shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages — including loss of funds, data, or
                profits — arising from your use of or inability to use these services, even if I have been
                advised of the possibility of such damages.
              </p>
              <p className="text-muted-foreground mt-3">
                My total liability to you for any claim arising under these Terms shall not exceed the amount
                you paid me (if any) in the 12 months preceding the claim.
              </p>
            </Section>

            <Section title="10. Modifications to Services and Terms">
              <p className="text-muted-foreground">
                I reserve the right to modify, suspend, or discontinue any service at any time without notice.
                I may also update these Terms at any time. Continued use of the services after changes take
                effect constitutes your acceptance of the revised Terms.
              </p>
            </Section>

            <Section title="11. Governing Law">
              <p className="text-muted-foreground">
                These Terms are governed by the laws of the Commonwealth of Pennsylvania, United States,
                without regard to its conflict of law principles.
              </p>
            </Section>

            <Section title="12. Contact">
              <p className="text-muted-foreground mb-3">Questions about these Terms? Reach me at:</p>
              <ul className="space-y-2 text-muted-foreground">
                <Li>Email: <a href="mailto:derek@derekross.me" className="text-primary hover:underline">derek@derekross.me</a></Li>
                <Li>Nostr: <a href="https://njump.me/npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424</a></Li>
                <Li>Website: <a href="https://derekross.me" className="text-primary hover:underline">derekross.me</a></Li>
              </ul>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="text-primary mt-1 shrink-0">›</span>
      <span>{children}</span>
    </li>
  );
}

export default TermsPage;
