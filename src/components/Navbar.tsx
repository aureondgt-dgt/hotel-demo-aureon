import { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { useScrollY } from "../hooks";
import { cn } from "../utils/cn";

const links = [
  { href: "#sobre", label: "O Resort" },
  { href: "#quartos", label: "Acomodações" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#galeria", label: "Galeria" },
  { href: "#ofertas", label: "Ofertas" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const scrolled = y > 60;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(h > 0 ? (y / h) * 100 : 0);
    const ids = links.map((l) => l.href.slice(1));
    let current = "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 160) current = id;
    }
    setActive(current);
  }, [y]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[70] h-[3px] bg-transparent">
        <div className="h-full bg-gradient-to-r from-gold to-coral transition-[width] duration-100" style={{ width: `${progress}%` }} />
      </div>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || open ? "bg-sand/90 backdrop-blur-xl shadow-[0_1px_0_rgba(12,26,31,0.08)] py-3" : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border transition-colors",
                scrolled || open ? "border-ink/20 text-lagoon" : "border-white/40 text-white"
              )}
            >
              <Sparkles className="h-4 w-4 transition-transform duration-700 group-hover:rotate-180" />
            </span>
            <span className="leading-none">
              <span
                className={cn(
                  "block font-display text-2xl font-semibold tracking-wide transition-colors",
                  scrolled || open ? "text-ink" : "text-white"
                )}
              >
                Aurora Bay
              </span>
              <span
                className={cn(
                  "block text-[9px] uppercase tracking-[0.35em] mt-1 transition-colors",
                  scrolled || open ? "text-lagoon" : "text-white/70"
                )}
              >
                Resort &amp; Spa
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300",
                  active === l.href.slice(1) ? "after:w-full" : "after:w-0 hover:after:w-full",
                  scrolled ? "text-ink/80 hover:text-ink" : "text-white/85 hover:text-white"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+551238960000"
              className={cn(
                "hidden xl:flex items-center gap-2 text-sm font-medium transition-colors",
                scrolled ? "text-ink/80" : "text-white/85"
              )}
            >
              <Phone className="h-4 w-4" /> (12) 3896-0000
            </a>
            <a
              href="#reservar"
              className="hidden sm:inline-flex rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30 active:scale-95"
            >
              Reservar
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border lg:hidden transition-colors",
                scrolled || open ? "border-ink/20 text-ink" : "border-white/40 text-white"
              )}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500",
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col px-5 pb-6 pt-4 sm:px-8">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
                className={cn(
                  "border-b border-ink/10 py-4 font-display text-2xl text-ink transition-all",
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#reservar"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-ink py-3.5 text-center font-semibold text-white"
            >
              Reservar agora
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
