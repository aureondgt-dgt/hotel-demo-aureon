import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { gallery, galleryCats, img, type GalleryCat } from "../data";
import { useLockBody } from "../hooks";
import { cn } from "../utils/cn";
import { Reveal, SectionTitle } from "./Reveal";

export function Gallery() {
  const [cat, setCat] = useState<GalleryCat>("Todos");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (cat === "Todos" ? gallery : gallery.filter((g) => g.cat === cat)), [cat]);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((o) => (o === null ? o : (o - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setOpen((o) => (o === null ? o : (o + 1) % items.length)), [items.length]);

  useLockBody(open !== null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  const current = open !== null ? items[open] : null;

  return (
    <section id="galeria" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionTitle
        eyebrow="Galeria"
        title={
          <>
            Um olhar por <em className="italic text-lagoon">dentro</em>
          </>
        }
        subtitle="Clique em qualquer imagem para explorar em tela cheia."
      />

      <Reveal className="mt-12 flex flex-wrap justify-center gap-2">
        {galleryCats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-6 py-2.5 text-sm font-medium transition-all",
              cat === c ? "border-lagoon bg-lagoon text-white shadow-lg" : "border-ink/15 text-ink/70 hover:border-ink/40"
            )}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <div key={cat} className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setOpen(i)}
            className="animate-pop group relative mb-5 block w-full overflow-hidden rounded-3xl"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <img
              src={img(g.id, 800, g.h)}
              alt={g.alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              style={{ aspectRatio: `800 / ${g.h}` }}
            />
            <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="text-left text-white">
                <p className="text-xs uppercase tracking-widest text-gold-light">{g.cat}</p>
                <p className="font-display text-xl">{g.alt}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                <Expand className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div className="animate-fade fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 backdrop-blur-md" role="dialog" aria-modal="true">
          <button onClick={close} className="absolute inset-0 cursor-zoom-out" aria-label="Fechar" />
          <button
            onClick={close}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={prev}
            className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-8"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-8"
            aria-label="Próxima"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure key={current.id} className="animate-pop pointer-events-none relative z-0 max-h-[88svh] max-w-[90vw]">
            <img
              src={img(current.id, 1800, 1200)}
              alt={current.alt}
              className="max-h-[80svh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 flex items-center justify-between text-white">
              <span className="font-display text-2xl">{current.alt}</span>
              <span className="text-sm text-white/60">
                {(open ?? 0) + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
