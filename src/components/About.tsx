import { Award, Leaf, PawPrint, Waves, Wifi, Utensils } from "lucide-react";
import { img, stats } from "../data";
import { useCountUp, useInView } from "../hooks";
import { Reveal, SectionTitle } from "./Reveal";

const marqueeItems = [
  "Melhor Resort de Praia do Brasil 2025",
  "Selo Sustentável Verde Azul",
  "Pet Friendly",
  "Wi-Fi 1 Gbps",
  "Spa 2.000 m²",
  "Chef premiado",
  "Praia privativa",
  "Clube Kids",
];

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div className="text-center">
      <p className="font-display text-6xl font-medium text-gold-light sm:text-7xl">
        {Math.round(n)}
        <span className="text-4xl sm:text-5xl">{suffix}</span>
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">{label}</p>
    </div>
  );
}

export function About() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);

  const features = [
    { icon: Waves, title: "Praia privativa", text: "200 m de areia branca só para hóspedes." },
    { icon: Utensils, title: "Alta gastronomia", text: "3 restaurantes e bar de coquetéis." },
    { icon: Leaf, title: "Sustentável", text: "Energia solar e zero plástico descartável." },
    { icon: PawPrint, title: "Pet friendly", text: "Seu melhor amigo também é bem-vindo." },
    { icon: Wifi, title: "Conectado", text: "Wi-Fi de 1 Gbps em todas as áreas." },
    { icon: Award, title: "Premiado", text: "Eleito o melhor resort 3 anos seguidos." },
  ];

  return (
    <>
      {/* marquee */}
      <div className="mt-24 overflow-hidden border-y border-ink/10 bg-sand py-5 sm:mt-28">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl italic text-ink/70">
              {t}
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section id="sobre" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal direction="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-3xl">
              <img
                src={img(24807133, 1000, 1250)}
                alt="Piscina do resort ao pôr do sol"
                className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-10 -right-4 hidden h-56 w-48 overflow-hidden rounded-3xl border-[6px] border-sand shadow-2xl sm:block lg:-right-12">
              <img src={img(31234758, 500, 600)} alt="Spa" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -left-4 top-16 animate-float rounded-2xl bg-white px-5 py-4 shadow-xl sm:-left-8">
              <p className="font-display text-4xl font-semibold text-lagoon">4.9</p>
              <p className="text-xs text-ink/60">+12.400 avaliações</p>
            </div>
          </Reveal>

          <div>
            <SectionTitle
              center={false}
              eyebrow="O Resort"
              title={
                <>
                  Um santuário de <em className="italic text-lagoon">luxo discreto</em> à beira-mar
                </>
              }
              subtitle="Há 18 anos, o Aurora Bay recebe viajantes que buscam o extraordinário nos pequenos gestos. Arquitetura biofílica, serviço personalizado e uma natureza exuberante criam o cenário para momentos que ficam na memória."
            />

            <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="group flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lagoon/10 text-lagoon transition-all duration-300 group-hover:rotate-6 group-hover:bg-lagoon group-hover:text-white">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="relative overflow-hidden bg-ink py-20 grain">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-lagoon/40 blur-[100px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-[100px]" />
        <div ref={ref} className="relative mx-auto grid max-w-6xl grid-cols-2 gap-12 px-5 sm:px-8 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} start={inView} />
          ))}
        </div>
      </section>
    </>
  );
}
