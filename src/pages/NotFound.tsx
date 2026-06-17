import { useSeoMeta } from "@unhead/react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { GradientText } from "@/components/GradientText";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";

const NotFound = () => {
  const location = useLocation();

  useSeoMeta({
    title: "404 - Page Not Found",
    description: "The page you are looking for could not be found. Return to the home page to continue browsing.",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <AuroraBackground />
      {/* Soft vignette so text stays legible over the glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <Reveal className="relative z-10 text-center">
        <h1 className="font-display text-7xl font-extrabold leading-none tracking-tight md:text-9xl">
          <GradientText animate>404</GradientText>
        </h1>
        <p className="mt-6 font-display text-2xl font-bold md:text-3xl">
          This page wandered off-protocol
        </p>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist &mdash; but the open web is full of better
          places to be. Let's get you home.
        </p>
        <div className="mt-10 flex justify-center">
          <Button size="xl" variant="gradient" asChild>
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back home
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
};

export default NotFound;
