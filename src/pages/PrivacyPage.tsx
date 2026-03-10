import { useSeoMeta } from '@unhead/react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const EFFECTIVE_DATE = "March 10, 2026";

const PrivacyPage = () => {
  useSeoMeta({
    title: 'Privacy Policy — Derek Ross',
    description: 'Privacy Policy for all applications and tools created by Derek Ross, including Nostr Plebs, Nostr Nests, and other Nostr-based projects.',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">
              Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last updated: {EFFECTIVE_DATE}
            </p>
          </div>

          {/* Intro callout */}
          <div className="bg-muted rounded-xl p-5 mb-10 text-sm text-muted-foreground border border-border">
            <strong className="text-foreground">The short version:</strong> I build open-source tools on top of
            Nostr, Bitcoin, and Lightning. I collect only what's necessary to make things work, I don't sell your
            data, and most of these apps are designed so <em>you</em> control your own keys and data by default.
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">

            <p className="text-muted-foreground">
              This Privacy Policy applies to all applications, tools, bots, and services created and maintained
              by Derek Ross ("I," "me," or "my"), including but not limited to: Nostr Plebs, Nostr Nests, YakBak,
              Zappix, Plektos, ZapTrax, Zaplytics, diVine, Bluestrbot, and other projects hosted at derekross.me.
              By using any of these applications, you agree to the practices described in this policy.
            </p>

            <Section title="1. Information I Collect">
              <p className="text-muted-foreground mb-3">Depending on the application, I may collect or process the following:</p>
              <ul className="space-y-2 text-muted-foreground">
                <Li><strong className="text-foreground">Nostr public keys (npub / hex)</strong> — used to identify accounts and interact with the Nostr protocol. Public keys are, by design, public.</Li>
                <Li><strong className="text-foreground">Nostr events</strong> — notes, reactions, and other signed events you publish to public relays. These are public by design.</Li>
                <Li><strong className="text-foreground">Lightning Network identifiers</strong> — Lightning addresses or invoice data used to facilitate Bitcoin payments or zaps.</Li>
                <Li><strong className="text-foreground">OAuth tokens</strong> — short-lived access tokens issued by third-party platforms (e.g., TikTok, X, LinkedIn) when you authorize a cross-posting or integration feature. Tokens are stored locally on your device or server and are never transmitted to my servers.</Li>
                <Li><strong className="text-foreground">Usage data</strong> — basic analytics such as page views or feature usage may be collected in aggregate and anonymized form to improve the service.</Li>
              </ul>
              <p className="text-muted-foreground mt-3">I do <strong className="text-foreground">not</strong> collect passwords, private keys (nsec), or sensitive financial information.</p>
            </Section>

            <Section title="2. How I Use Your Information">
              <ul className="space-y-2 text-muted-foreground">
                <Li>To provide and operate the features of each application</Li>
                <Li>To facilitate Nostr protocol interactions (publishing events, fetching feeds, sending zaps)</Li>
                <Li>To enable authorized cross-posting to third-party platforms at your request</Li>
                <Li>To improve application performance and fix bugs</Li>
                <Li>To communicate with you if you contact me directly</Li>
              </ul>
              <p className="text-muted-foreground mt-3">I do <strong className="text-foreground">not</strong> use your information for advertising, profiling, or sale to third parties.</p>
            </Section>

            <Section title="3. Third-Party Services">
              <p className="text-muted-foreground mb-3">My applications may interact with third-party services as part of their core functionality:</p>
              <ul className="space-y-2 text-muted-foreground">
                <Li><strong className="text-foreground">Nostr relays</strong> — public relays receive and distribute your signed Nostr events per the Nostr protocol specification.</Li>
                <Li><strong className="text-foreground">Lightning Network nodes</strong> — payment routing occurs over the Lightning Network; individual node operators may log payment metadata per their own policies.</Li>
                <Li><strong className="text-foreground">TikTok</strong> — when you connect a TikTok account, the TikTok Content Posting API is used to upload videos on your behalf. TikTok's own Privacy Policy applies to data processed on their platform.</Li>
                <Li><strong className="text-foreground">X (Twitter)</strong> — when you connect an X account for cross-posting, X's Privacy Policy applies.</Li>
                <Li><strong className="text-foreground">LinkedIn</strong> — when you connect a LinkedIn account for cross-posting, LinkedIn's Privacy Policy applies.</Li>
              </ul>
              <p className="text-muted-foreground mt-3">I am not responsible for the privacy practices of these third-party services.</p>
            </Section>

            <Section title="4. Data Storage and Security">
              <p className="text-muted-foreground">
                Most of my applications are self-hosted or client-side tools. In those cases, your data (including
                OAuth tokens and configuration) is stored on your own device or server — not on any server I control.
              </p>
              <p className="text-muted-foreground mt-3">
                Where I do operate server infrastructure (e.g., Nostr Plebs, Nostr Nests), I take reasonable
                technical measures to protect stored data. However, no system is perfectly secure, and I cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section title="5. Data Retention">
              <p className="text-muted-foreground">
                For self-hosted tools, data retention is entirely in your control. For any server-side services
                I operate, I retain data only as long as necessary to provide the service. You may request deletion
                of your data by contacting me directly.
              </p>
            </Section>

            <Section title="6. Your Rights">
              <ul className="space-y-2 text-muted-foreground">
                <Li><strong className="text-foreground">Access</strong> — you may request a copy of personal data I hold about you.</Li>
                <Li><strong className="text-foreground">Correction</strong> — you may request correction of inaccurate data.</Li>
                <Li><strong className="text-foreground">Deletion</strong> — you may request deletion of your data from any server-side service I operate.</Li>
                <Li><strong className="text-foreground">Portability</strong> — Nostr is inherently portable; your keys and data are yours.</Li>
              </ul>
              <p className="text-muted-foreground mt-3">
                To exercise any of these rights, contact me at{" "}
                <a href="mailto:derek@derekross.me" className="text-primary hover:underline">derek@derekross.me</a>.
              </p>
            </Section>

            <Section title="7. Children's Privacy">
              <p className="text-muted-foreground">
                My applications are not directed at children under the age of 13. I do not knowingly collect
                personal information from children. If you believe a child has provided me with personal
                information, please contact me and I will promptly delete it.
              </p>
            </Section>

            <Section title="8. Changes to This Policy">
              <p className="text-muted-foreground">
                I may update this Privacy Policy from time to time. When I do, I will update the "Last updated"
                date at the top of this page. Continued use of any application after changes constitutes
                acceptance of the updated policy.
              </p>
            </Section>

            <Section title="9. Contact">
              <p className="text-muted-foreground mb-3">Questions about this Privacy Policy? Reach me at:</p>
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

export default PrivacyPage;
