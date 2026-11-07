import { useEffect, useState } from "react";
import { Copy, Gift, Heart, Leaf, Sun } from "lucide-react";
import { img, offers } from "../data";
import { Reveal, SectionTitle } from "./Reveal";
import { useToast } from "./Toast";

const icons = { heart: Heart, sun: Sun, leaf: Leaf };

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export function Offers() {
  const notify = useToast();
  const [target] = useState(() => Date.now() + (2 * 24 + 11) * 3600 * 1000 + 37 * 60 * 1000);
  const t = useCountdown(target);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* clipboard may be unavailable */
    }
    notify(`Cupom ${code} copiado! Use ao confirmar sua reserva.`);
  };

  return (
    <section id="ofertas" className="relative overflow-hidden bg-gradient-to-br from-lagoon via-lagoon to-ink py-24 text-white grain sm:py-32">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          light
          eyebrow="Ofertas especiais"
          title={
            <>
              Pacotes feitos para <em className="italic text-gold-light">celebrar</em>
            </>
          }
          subtitle="Condições exclusivas para reservas diretas no site. Cupons válidos por tempo limitado."
        />

        <Reveal className="mt-12 flex flex-col items-center gap-4">
          <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70">
            <Gift className="h-4 w-4 text-gold" /> As ofertas terminam em
          </p>
          <div className="flex gap-3 sm:gap-5">
            {[
              { v: t.d, l: "dias" },
              { v: t.h, l: "horas" },
              { v: t.m, l: "min" },
              { v: t.s, l: "seg" },
            ].map((x) => (
              <div key={x.l} className="w-[4.5rem] rounded-2xl border border-white/15 bg-white/10 py-3 text-center backdrop-blur sm:w-24 sm:py-4">
                <p className="font-display text-4xl font-semibold tabular-nums sm:text-5xl">{String(x.v).padStart(2, "0")}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/60">{x.l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {offers.map((o, i) => {
            const Icon = icons[o.icon];
            return (
              <Reveal key={o.id} delay={i * 120}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white text-ink transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={img(o.photo, 800, 500)}
                      alt={o.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-lagoon">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="absolute right-5 top-5 rounded-2xl bg-gold px-4 py-2 text-center text-ink shadow-lg">
                      <p className="font-display text-3xl font-bold leading-none">-{o.discount}%</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-3xl font-semibold">{o.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{o.desc}</p>
                    <button
                      onClick={() => copy(o.code)}
                      className="mt-6 flex items-center justify-between rounded-2xl border-2 border-dashed border-lagoon/40 bg-lagoon/5 px-5 py-3.5 transition hover:border-lagoon hover:bg-lagoon/10"
                    >
                      <span className="font-mono text-lg font-semibold tracking-widest text-lagoon">{o.code}</span>
                      <span className="flex items-center gap-2 text-xs font-medium text-lagoon">
                        <Copy className="h-4 w-4" /> Copiar cupom
                      </span>
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
