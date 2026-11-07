import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, MapPin, Star } from "lucide-react";
import { img } from "../data";
import { useScrollY } from "../hooks";
import { cn } from "../utils/cn";

const slides = [
  { src: img(34790496, 2200, 1300), caption: "Piscina infinita ao entardecer" },
  { src: img(20639392, 2200, 1300), caption: "Jardins tropicais e deck" },
  { src: img(24807133, 2200, 1300), caption: "Pôr do sol sobre o mar" },
];

export function Hero() {
  const [i, setI] = useState(0);
  const y = useScrollY();

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink grain">
      {/* slides */}
      <div className="absolute inset-0" style={{ transform: `translateY(${Math.min(y, 900) * 0.35}px)` }}>
        {slides.map((s, idx) => (
          <div
            key={s.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1800ms]",
              idx === i ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={s.src}
              alt={s.caption}
              className={cn("h-full w-full object-cover", idx === i && "animate-kenburns")}
              fetchPriority={idx === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      {/* content */}
      <div
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pb-24 pt-24 sm:px-8"
        style={{ opacity: Math.max(0, 1 - y / 700) }}
      >
        <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md">
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="tracking-[0.2em] uppercase">Resort &amp; Spa</span>
            <span className="hidden h-3 w-px bg-white/30 sm:block" />
            <span className="hidden items-center gap-1 sm:flex">
              <MapPin className="h-3.5 w-3.5" /> Ilhabela, São Paulo
            </span>
          </div>
        </div>

        <h1
          className="animate-slide-up mt-8 max-w-4xl font-display text-[3.2rem] font-medium leading-[0.95] text-white sm:text-7xl lg:text-[8rem]"
          style={{ animationDelay: "250ms" }}
        >
          Onde o mar
          <br />
          encontra o <em className="font-normal italic text-gold-light">descanso.</em>
        </h1>

        <p
          className="animate-slide-up mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          style={{ animationDelay: "400ms" }}
        >
          Um refúgio de 120 suítes entre a Mata Atlântica e o oceano. Spa, gastronomia autoral e um serviço que
          antecipa cada desejo seu.
        </p>

        <div className="animate-slide-up mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "550ms" }}>
          <a
            href="#reservar"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 font-semibold text-ink transition hover:bg-gold-light hover:shadow-xl hover:shadow-gold/30 active:scale-95"
          >
            Reservar minha estadia
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#experiencias"
            className="rounded-full border border-white/30 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-md transition hover:bg-white/15"
          >
            Explorar experiências
          </a>
        </div>
      </div>

      {/* slide indicators */}
      <div className="absolute bottom-28 right-5 z-10 hidden flex-col items-end gap-4 sm:right-8 md:flex lg:bottom-36">
        <span className="text-xs tracking-[0.2em] text-white/70 uppercase">{slides[i].caption}</span>
        <div className="flex gap-2">
          {slides.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Slide ${k + 1}`}
              className="group relative h-8 w-12 py-3.5"
            >
              <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                <span
                  key={i === k ? `a${i}` : `b${k}`}
                  className={cn("block h-full bg-gold", i === k ? "w-full" : "w-0")}
                  style={i === k ? { animation: "grow 7s linear" } : undefined}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <a
        href="#reservar"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/60 transition hover:text-white lg:block"
        aria-label="Rolar"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>

      <style>{`@keyframes grow { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
