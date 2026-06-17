import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  /** Lower the blob opacity for subtler section backdrops. */
  subtle?: boolean;
}

/**
 * Decorative blurred gradient "glow blobs" in the brand palette. Absolutely
 * positioned and pointer-events-none, so it sits behind content. Place inside a
 * `relative` container.
 */
export function AuroraBackground({ className, subtle }: AuroraBackgroundProps) {
  const op = subtle ? "opacity-40" : "opacity-70";
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full blur-3xl animate-aurora motion-reduce:animate-none",
          op,
        )}
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
      />
      <div
        className={cn(
          "absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full blur-3xl animate-aurora motion-reduce:animate-none [animation-delay:-6s]",
          op,
        )}
        style={{ background: "radial-gradient(circle, var(--brand-2), transparent 70%)" }}
      />
      <div
        className={cn(
          "absolute -bottom-32 left-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl animate-aurora motion-reduce:animate-none [animation-delay:-12s]",
          op,
        )}
        style={{ background: "radial-gradient(circle, var(--brand-3), transparent 70%)" }}
      />
    </div>
  );
}
