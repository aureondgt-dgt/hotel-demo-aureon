import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { useToast } from "./Toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const notify = useToast();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-gold">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="leading-none">
                <p className="font-display text-3xl font-semibold">Aurora Bay</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.35em] text-white/60">Resort &amp; Spa</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              Hospitalidade autêntica entre a Mata Atlântica e o mar. Um lugar para voltar, de novo e de novo.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold">Explorar</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {[
                ["#quartos", "Acomodações"],
                ["#experiencias", "Experiências"],
                ["#galeria", "Galeria"],
                ["#ofertas", "Ofertas"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a href={h} className="transition hover:text-gold-light">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold">Siga-nos</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {["Instagram", "Facebook", "YouTube", "TripAdvisor"].map((s) => (
                <li key={s}>
                  <button onClick={() => notify(`Em breve: ${s} do Aurora Bay`, "info")} className="transition hover:text-gold-light">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold">Newsletter</h4>
            <p className="mt-5 text-sm text-white/60">Receba ofertas exclusivas e inspirações de viagem.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                notify("Inscrição confirmada! Bem-vindo ao clube Aurora.");
                setEmail("");
              }}
              className="mt-4 flex overflow-hidden rounded-full border border-white/20 p-1 focus-within:border-gold"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/40"
              />
              <button className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-light">
                Assinar
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Aurora Bay Resort &amp; Spa. Site fictício criado para demonstração.</p>
          <a href="#top" className="flex items-center gap-2 transition hover:text-white">
            Voltar ao topo <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none text-center font-display text-[22vw] font-semibold leading-[0.7] text-white/[0.04]"
      >
        AURORA
      </p>
    </footer>
  );
}
