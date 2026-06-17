import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  /** Element to render as (e.g. "span", "h1"). Defaults to "span". */
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** When true, the gradient slowly pans for a living, energetic feel. */
  animate?: boolean;
}

/**
 * Renders text filled with the brand violet -> fuchsia -> indigo gradient.
 * Use to accent key words in headlines.
 */
export function GradientText({ as: Tag = "span", className, children, animate }: GradientTextProps) {
  return (
    <Tag className={cn("text-gradient", animate && "animate-gradient motion-reduce:animate-none", className)}>
      {children}
    </Tag>
  );
}
