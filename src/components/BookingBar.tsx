import { useCallback, useState } from "react";
import { Calendar, ChevronDown, Minus, Moon, Plus, Search as SearchIcon, Users } from "lucide-react";
import type { Search } from "../types";
import { addDays, nightsBetween, parseISO, toISO } from "../utils/format";
import { useOutsideClick } from "../hooks";
import { useToast } from "./Toast";
import { cn } from "../utils/cn";

interface Props {
  search: Search;
  setSearch: (s: Search) => void;
  onSubmit: () => void;
}

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-ink/50">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition hover:border-lagoon hover:text-lagoon disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-inherit"
          aria-label={`Diminuir ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-5 text-center font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition hover:border-lagoon hover:text-lagoon disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-inherit"
          aria-label={`Aumentar ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function BookingBar({ search, setSearch, onSubmit }: Props) {
  const [guestsOpen, setGuestsOpen] = useState(false);
  const notify = useToast();
  const close = useCallback(() => setGuestsOpen(false), []);
  const popRef = useOutsideClick<HTMLDivElement>(close, guestsOpen);

  const today = toISO(new Date());
  const nights = nightsBetween(search.checkIn, search.checkOut);
  const total = search.adults + search.children;

  const setCheckIn = (v: string) => {
    if (!v) return;
    let out = search.checkOut;
    if (!out || nightsBetween(v, out) < 1) out = toISO(addDays(parseISO(v), 2));
    setSearch({ ...search, checkIn: v, checkOut: out });
  };

  const setCheckOut = (v: string) => {
    if (!v) return;
    if (nightsBetween(search.checkIn, v) < 1) {
      notify("A saída deve ser depois da data de chegada.", "info");
      return;
    }
    setSearch({ ...search, checkOut: v });
  };

  return (
    <section id="reservar" className="relative z-30 mx-auto -mt-20 max-w-6xl px-4 sm:-mt-24 sm:px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (nights < 1) {
            notify("Escolha datas válidas para a sua estadia.", "info");
            return;
          }
          onSubmit();
        }}
        className="grid gap-px overflow-visible rounded-[2rem] bg-ink/10 p-px shadow-[0_30px_80px_-20px_rgba(12,26,31,0.45)] md:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <label className="group flex cursor-pointer flex-col gap-1 rounded-t-[2rem] bg-white px-7 py-5 transition hover:bg-sand/60 md:rounded-l-[2rem] md:rounded-tr-none">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon">
            <Calendar className="h-3.5 w-3.5" /> Chegada
          </span>
          <input
            type="date"
            min={today}
            value={search.checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent font-display text-2xl font-semibold text-ink outline-none"
            required
          />
        </label>

        <label className="group relative flex cursor-pointer flex-col gap-1 bg-white px-7 py-5 transition hover:bg-sand/60">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon">
            <Calendar className="h-3.5 w-3.5" /> Saída
          </span>
          <input
            type="date"
            min={toISO(addDays(parseISO(search.checkIn || today), 1))}
            value={search.checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent font-display text-2xl font-semibold text-ink outline-none"
            required
          />
          {nights > 0 && (
            <span className="pointer-events-none absolute right-5 top-5 hidden items-center gap-1 rounded-full bg-lagoon/10 px-3 py-1 text-xs font-semibold text-lagoon lg:flex">
              <Moon className="h-3 w-3" /> {nights} {nights === 1 ? "noite" : "noites"}
            </span>
          )}
        </label>

        <div ref={popRef} className="relative bg-white">
          <button
            type="button"
            onClick={() => setGuestsOpen((o) => !o)}
            className="flex h-full w-full flex-col gap-1 px-7 py-5 text-left transition hover:bg-sand/60"
            aria-expanded={guestsOpen}
          >
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-lagoon">
              <Users className="h-3.5 w-3.5" /> Hóspedes
            </span>
            <span className="flex items-center justify-between font-display text-2xl font-semibold text-ink">
              {total} {total === 1 ? "hóspede" : "hóspedes"}
              <ChevronDown className={cn("h-5 w-5 text-ink/40 transition-transform", guestsOpen && "rotate-180")} />
            </span>
          </button>

          {guestsOpen && (
            <div className="animate-pop absolute left-0 right-0 top-full z-40 mt-3 min-w-[300px] rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-ink/5 md:left-auto md:right-0 md:w-80">
              <Stepper
                label="Adultos"
                hint="13 anos ou mais"
                value={search.adults}
                min={1}
                max={6}
                onChange={(n) => setSearch({ ...search, adults: n })}
              />
              <div className="h-px bg-ink/10" />
              <Stepper
                label="Crianças"
                hint="0 a 12 anos"
                value={search.children}
                min={0}
                max={4}
                onChange={(n) => setSearch({ ...search, children: n })}
              />
              <button
                type="button"
                onClick={() => setGuestsOpen(false)}
                className="mt-4 w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition hover:bg-lagoon"
              >
                Confirmar
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="group flex items-center justify-center gap-3 rounded-b-[2rem] bg-lagoon px-10 py-6 font-semibold text-white transition hover:bg-ink md:rounded-bl-none md:rounded-r-[2rem]"
        >
          <SearchIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
          Ver disponibilidade
        </button>
      </form>
    </section>
  );
}
