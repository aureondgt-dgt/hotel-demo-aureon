import type { ReactNode } from "react";
import { useInView } from "../hooks";
import { cn } from "../utils/cn";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function Reveal({ children, delay = 0, className, direction = "up" }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  const hidden = {
    up: "translate-y-10",
    left: "-translate-x-10",
    right: "translate-x-10",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform",
        inView ? "opacity-100 translate-x-0 translate-y-0" : cn("opacity-0", hidden),
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3 mb-5", center && "justify-center")}>
        <span className="h-px w-10 bg-gold" />
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
        <span className={cn("h-px w-10 bg-gold", !center && "hidden")} />
      </div>
      <h2
        className={cn(
          "font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-balance",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-5 text-base sm:text-lg leading-relaxed", light ? "text-white/70" : "text-ink/65")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
