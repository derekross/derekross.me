import { Button } from "@/components/ui/button";
import { ArrowDown, Mic, Zap } from "lucide-react";
import { DEREK_CONTACTS } from "@/lib/derek";
import { GradientText } from "@/components/GradientText";
import { AuroraBackground } from "@/components/AuroraBackground";
import { useNavigate } from "react-router-dom";

const STAGES = [
  "Nostrica",
  "Nostriga",
  "Baltic Honeybadger",
  "BTC Prague",
  "The Bitcoin Conference",
];

const STATS = [
  { value: "20+", label: "Years in tech" },
  { value: "Global", label: "Keynote speaker" },
  { value: "∞", label: "Nostr passion" },
];

export function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <AuroraBackground />
      {/* Soft vignette so text stays legible over the glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Developer Relations @{" "}
            <a
              href="https://soapbox.pub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              Soapbox
            </a>
          </div>

          {/* Portrait with gradient ring */}
          <div className="mx-auto mb-8 w-fit rounded-full bg-gradient-brand p-[3px] shadow-xl shadow-primary/30">
            <img
              src="/derek-bitcoin-2025.jpg"
              alt="Derek Ross"
              className="h-28 w-28 rounded-full object-cover object-[center_25%] ring-4 ring-background md:h-32 md:w-32"
              loading="eager"
            />
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            <GradientText animate>Derek Ross</GradientText>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Keynote speaker, builder, and the decentralized web's loudest
            evangelist. I help people and companies make sense of{" "}
            <span className="font-semibold text-foreground">AI</span>,{" "}
            <span className="font-semibold text-foreground">Bitcoin</span>, and{" "}
            <span className="font-semibold text-foreground">Nostr</span> — and
            build on the open protocols rewiring the internet.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="xl" variant="gradient" onClick={() => navigate("/contact")}>
              <Mic className="mr-2 h-5 w-5" />
              Book me to speak
            </Button>
            <Button
              size="xl"
              variant="glass"
              onClick={() => window.open(`https://njump.me/${DEREK_CONTACTS.nostrAddress}`, "_blank")}
            >
              <Zap className="mr-2 h-5 w-5" />
              Follow on Nostr
            </Button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl glass px-4 py-5">
                <div className="font-display text-2xl font-bold md:text-3xl">
                  <GradientText>{stat.value}</GradientText>
                </div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Spoken-at strip */}
        <div className="mx-auto mt-16 max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted on stages worldwide
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {STAGES.map((stage) => (
              <span
                key={stage}
                className="font-display text-sm font-semibold text-muted-foreground/80 transition-colors hover:text-foreground md:text-base"
              >
                {stage}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => navigate("/about")}
        aria-label="Learn more about Derek"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground/70 transition-colors hover:text-foreground"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
}
