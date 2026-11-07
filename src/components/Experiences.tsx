import { useState } from "react";
import { ArrowRight, Clock, Flower2, Sailboat, Utensils } from "lucide-react";
import { experiences, img } from "../data";
import { cn } from "../utils/cn";
import { Reveal, SectionTitle } from "./Reveal";
import { useToast } from "./Toast";

const icons = { spa: Flower2, gastro: Utensils, mar: Sailboat };

export function Experiences() {
  const [active, setActive] = useState(0);
  const notify = useToast();
  const exp = experiences[active];

  return (
    <section id="experiencias" className="relative overflow-hidden bg-ink py-24 text-white grain sm:py-32">
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-lagoon/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          light
          eyebrow="Experiências"
          title={
            <>
              Momentos que <em className="italic text-gold-light">transformam</em> uma viagem
            </>
          }
          subtitle="Bem-estar, sabor e aventura em harmonia com o ritmo da ilha."
        />

        {/* tabs */}
        <Reveal className="mt-14 flex justify-center">
          <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur">
            {experiences.map((e, i) => {
              const Icon = icons[e.id];
              return (
                <button
                  key={e.id}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 sm:px-7",
                    active === i ? "bg-gold text-ink shadow-lg" : "text-white/70 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" /> {e.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div key={exp.id} className="mt-14 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="animate-pop relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem]">
              <img src={img(exp.photo, 1200, 960)} alt={exp.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
                <Clock className="h-4 w-4 text-gold-light" /> {exp.hours}
              </div>
            </div>
            <div className="absolute -bottom-8 -right-3 hidden h-44 w-44 animate-float overflow-hidden rounded-3xl border-4 border-ink shadow-2xl sm:block lg:-right-8 lg:h-52 lg:w-52">
              <img src={img(exp.photo2, 500, 500)} alt="" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="animate-slide-up">
            <p className="text-sm uppercase tracking-[0.25em] text-gold">{exp.subtitle}</p>
            <h3 className="mt-3 font-display text-5xl font-medium sm:text-6xl">{exp.title}</h3>
            <p className="mt-6 text-lg leading-relaxed text-white/70">{exp.description}</p>

            <ul className="mt-8 space-y-3">
              {exp.highlights.map((h, i) => (
                <li
                  key={h}
                  className="animate-slide-up flex items-center gap-4 border-b border-white/10 pb-3 text-white/85"
                  style={{ animationDelay: `${150 + i * 70}ms` }}
                >
                  <span className="font-display text-xl italic text-gold">0{i + 1}</span>
                  {h}
                </li>
              ))}
            </ul>

            <button
              onClick={() => notify(`Pedido de reserva para ${exp.title} enviado! Nossa equipe entrará em contato.`)}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-ink transition hover:bg-gold"
            >
              Reservar experiência
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
