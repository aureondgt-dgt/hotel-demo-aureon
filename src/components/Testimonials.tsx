import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../data";
import { cn } from "../utils/cn";
import { SectionTitle } from "./Reveal";

const gradients = [
  "from-lagoon to-lagoon-light",
  "from-gold to-coral",
  "from-coral to-gold",
  "from-ink-soft to-lagoon",
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  const t = testimonials[i];

  return (
    <section className="relative overflow-hidden bg-sand-dark/60 py-24 sm:py-32">
      <Quote className="absolute left-[8%] top-16 h-40 w-40 text-gold/15" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Depoimentos"
          title={
            <>
              Quem viveu, <em className="italic text-lagoon">recomenda</em>
            </>
          }
        />

        <div
          className="mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div key={i} className="animate-slide-up rounded-[2.5rem] bg-white p-8 text-center shadow-xl shadow-ink/5 sm:p-14">
            <div className="mb-6 flex justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="font-display text-2xl italic leading-relaxed text-ink sm:text-4xl sm:leading-snug">
              “{t.text}”
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <span
                className={cn(
                  "grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br font-display text-xl font-semibold text-white",
                  gradients[i % gradients.length]
                )}
              >
                {t.name.charAt(0)}
              </span>
              <div className="text-left">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-ink/50">
                  {t.from} · {t.stay}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => setI((i - 1 + n) % n)}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition hover:border-ink hover:bg-ink hover:text-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Depoimento ${k + 1}`}
                  className={cn("h-2 rounded-full transition-all duration-500", k === i ? "w-10 bg-lagoon" : "w-2 bg-ink/20 hover:bg-ink/40")}
                />
              ))}
            </div>
            <button
              onClick={() => setI((i + 1) % n)}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition hover:border-ink hover:bg-ink hover:text-white"
              aria-label="Próximo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
