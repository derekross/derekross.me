import { Bitcoin, ShieldCheck, Heart } from "lucide-react";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";

const supportPoints = [
  {
    icon: Bitcoin,
    title: "On-chain, custodian-free",
    description: "Donations go donor to recipient on Bitcoin. No platform holding the funds, no fees taken out.",
  },
  {
    icon: ShieldCheck,
    title: "Uncensorable by design",
    description: "The campaign lives on Nostr and pays on-chain. No intermediary can switch it off.",
  },
  {
    icon: Heart,
    title: "Community funded",
    description: "Talks, workshops, and open-source freedom tech are paid for by people who want them to exist.",
  },
];

export function Support() {
  return (
    <section id="support" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="text-center lg:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Support My Work
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Fund the <GradientText>Future of Social Communication</GradientText>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              The work is community funded. The widget beside this is a live
              Agora campaign embed: scan, pay, and the sats go straight to the
              mission.
            </p>

            <div className="mt-8 space-y-5">
              {supportPoints.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-lg shadow-primary/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-display font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://agora.spot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Explore campaigns on agora.spot →
            </a>
          </Reveal>

          <Reveal delay={120} className="mx-auto w-full max-w-[426px]">
            <div className="rounded-3xl bg-gradient-brand p-[3px] shadow-2xl shadow-primary/30">
              <iframe
                src="https://agora.spot/embed/campaign/naddr1qvzqqqyygupzq0mhp4ja8fmy48zuk5p6uy37vtk8tx9dqdwcxm32sy8nsaa8gkeyqq5xyatfd3jxjmn8946xsefdve6hgatjv5khxmmrd9skcttrdakk6atwd93kzarfdahq3ve0mu?variant=full&theme=auto"
                width="420"
                height="900"
                style={{ border: 0, width: "100%", maxWidth: 420 }}
                loading="lazy"
                allow="clipboard-write"
                referrerPolicy="no-referrer-when-downgrade"
                title="Agora fundraiser: Building the future of social communication"
                className="rounded-[calc(1.5rem-3px)]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
