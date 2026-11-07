import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Calendar,
  Minus,
  Moon,
  Plus,
  Printer,
  Star,
  Users,
  X,
} from "lucide-react";
import { extras, img, type Room } from "../data";
import type { Search } from "../types";
import { addDays, brl, formatDateLong, nightsBetween, parseISO, toISO } from "../utils/format";
import { useLockBody } from "../hooks";
import { cn } from "../utils/cn";
import { useToast } from "./Toast";

interface Props {
  room: Room;
  search: Search;
  setSearch: (s: Search) => void;
  onClose: () => void;
}

const steps = ["Estadia", "Seus dados", "Confirmação"];

export function BookingModal({ room, search, setSearch, onClose }: Props) {
  useLockBody(true);
  const notify = useToast();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(["breakfast"]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [tried, setTried] = useState(false);
  const [code] = useState(() => "AUR-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const today = toISO(new Date());
  const nights = nightsBetween(search.checkIn, search.checkOut);
  const guests = search.adults + search.children;

  const breakdown = useMemo(() => {
    const base = room.price * nights;
    const items = extras
      .filter((e) => selected.includes(e.id))
      .map((e) => ({
        ...e,
        total: e.mode === "guestNight" ? e.price * guests * nights : e.price,
      }));
    const extrasTotal = items.reduce((s, i) => s + i.total, 0);
    return { base, items, extrasTotal, total: base + extrasTotal };
  }, [room, nights, guests, selected]);

  const errors = {
    name: form.name.trim().length < 3 ? "Informe seu nome completo" : "",
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? "E-mail inválido" : "",
    phone: form.phone.replace(/\D/g, "").length < 10 ? "Telefone inválido" : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const setCheckIn = (v: string) => {
    if (!v) return;
    let out = search.checkOut;
    if (nightsBetween(v, out) < 1) out = toISO(addDays(parseISO(v), 1));
    setSearch({ ...search, checkIn: v, checkOut: out });
  };
  const setCheckOut = (v: string) => {
    if (!v || nightsBetween(search.checkIn, v) < 1) return;
    setSearch({ ...search, checkOut: v });
  };

  const maxAdults = room.maxGuests - search.children;
  const maxChildren = room.maxGuests - search.adults;
  const overCapacity = guests > room.maxGuests;

  const next = () => {
    if (step === 0) {
      if (nights < 1) return notify("Escolha datas válidas.", "info");
      if (overCapacity) return notify(`Esta acomodação comporta até ${room.maxGuests} hóspedes.`, "info");
      setStep(1);
    } else if (step === 1) {
      setTried(true);
      if (hasErrors) return;
      setStep(2);
      notify("Reserva confirmada! Enviamos os detalhes por e-mail.");
    }
  };

  const field = (k: "name" | "email" | "phone") =>
    cn(
      "w-full rounded-2xl border bg-white px-5 py-4 text-ink outline-none transition focus:border-lagoon focus:ring-4 focus:ring-lagoon/10",
      tried && errors[k] ? "border-coral" : "border-ink/15"
    );

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div className="animate-fade absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />

      <div className="animate-slide-up relative flex max-h-[96svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-sand shadow-2xl sm:rounded-[2rem] lg:flex-row">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink shadow transition hover:rotate-90 hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* left: summary */}
        <aside className="relative shrink-0 bg-ink text-white lg:w-[340px]">
          <div className="relative h-40 lg:h-56">
            <img src={img(room.photo, 800, 500)} alt={room.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          </div>
          <div className="relative -mt-12 space-y-4 px-6 pb-6 lg:pb-8">
            <div>
              <div className="mb-1 flex items-center gap-1 text-xs text-gold">
                <Star className="h-3.5 w-3.5 fill-current" /> {room.rating.toFixed(1)} · {room.reviews} avaliações
              </div>
              <h3 className="font-display text-3xl font-semibold">{room.name}</h3>
              <p className="text-sm text-white/60">
                {room.size} m² · {room.bed} · {room.view}
              </p>
            </div>

            <div className="hidden space-y-2 border-t border-white/10 pt-4 text-sm lg:block">
              <div className="flex justify-between text-white/70">
                <span>
                  {brl(room.price)} × {nights} {nights === 1 ? "noite" : "noites"}
                </span>
                <span>{brl(breakdown.base)}</span>
              </div>
              {breakdown.items.map((i) => (
                <div key={i.id} className="flex justify-between text-white/70">
                  <span className="pr-3">{i.label}</span>
                  <span className="shrink-0">{brl(i.total)}</span>
                </div>
              ))}
              <div className="flex items-baseline justify-between border-t border-white/10 pt-4">
                <span className="text-white/70">Total</span>
                <span className="font-display text-4xl font-semibold text-gold-light">{brl(breakdown.total)}</span>
              </div>
              <p className="text-xs text-white/40">Impostos e taxas inclusos</p>
            </div>

            <div className="flex items-baseline justify-between border-t border-white/10 pt-3 lg:hidden">
              <span className="text-sm text-white/70">Total</span>
              <span className="font-display text-3xl font-semibold text-gold-light">{brl(breakdown.total)}</span>
            </div>
          </div>
        </aside>

        {/* right: steps */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* stepper */}
          <div className="flex items-center gap-2 border-b border-ink/10 px-6 py-5 pr-16 sm:px-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full text-xs font-semibold transition-all",
                    i < step ? "bg-lagoon text-white" : i === step ? "bg-gold text-ink" : "bg-ink/10 text-ink/40"
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={cn("hidden text-sm font-medium sm:block", i === step ? "text-ink" : "text-ink/40")}>
                  {s}
                </span>
                {i < steps.length - 1 && <span className="mx-1 h-px w-5 bg-ink/20 sm:w-8" />}
              </div>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10">
            {step === 0 && (
              <div className="animate-fade space-y-8">
                <div>
                  <h4 className="font-display text-3xl font-semibold">Detalhes da estadia</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{room.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.amenities.map((a) => (
                      <span key={a} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-ink/70 ring-1 ring-ink/5">
                        <Check className="h-3 w-3 text-lagoon" /> {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="rounded-2xl bg-white p-4 ring-1 ring-ink/5">
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-lagoon">
                      <Calendar className="h-3.5 w-3.5" /> Chegada
                    </span>
                    <input
                      type="date"
                      min={today}
                      value={search.checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-1 w-full bg-transparent font-display text-xl font-semibold outline-none"
                    />
                  </label>
                  <label className="rounded-2xl bg-white p-4 ring-1 ring-ink/5">
                    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-lagoon">
                      <Calendar className="h-3.5 w-3.5" /> Saída
                    </span>
                    <input
                      type="date"
                      min={toISO(addDays(parseISO(search.checkIn || today), 1))}
                      value={search.checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1 w-full bg-transparent font-display text-xl font-semibold outline-none"
                    />
                  </label>
                  {[
                    { label: "Adultos", key: "adults" as const, min: 1, max: Math.max(1, maxAdults) },
                    { label: "Crianças", key: "children" as const, min: 0, max: Math.max(0, maxChildren) },
                  ].map((g) => (
                    <div key={g.key} className="flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-ink/5">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Users className="h-4 w-4 text-lagoon" /> {g.label}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSearch({ ...search, [g.key]: Math.max(g.min, search[g.key] - 1) })}
                          disabled={search[g.key] <= g.min}
                          className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 transition hover:border-lagoon disabled:opacity-30"
                          aria-label={`Diminuir ${g.label}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center font-semibold tabular-nums">{search[g.key]}</span>
                        <button
                          onClick={() => setSearch({ ...search, [g.key]: Math.min(g.max, search[g.key] + 1) })}
                          disabled={search[g.key] >= g.max}
                          className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 transition hover:border-lagoon disabled:opacity-30"
                          aria-label={`Aumentar ${g.label}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {nights > 0 && (
                  <p className="flex items-center gap-2 text-sm font-medium text-lagoon">
                    <Moon className="h-4 w-4" /> {nights} {nights === 1 ? "noite" : "noites"} · {guests}{" "}
                    {guests === 1 ? "hóspede" : "hóspedes"} (máx. {room.maxGuests})
                  </p>
                )}

                <div>
                  <h5 className="mb-3 text-sm font-semibold uppercase tracking-widest text-ink/50">
                    Turbine sua experiência
                  </h5>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {extras.map((e) => {
                      const on = selected.includes(e.id);
                      return (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => toggle(e.id)}
                          className={cn(
                            "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                            on ? "border-lagoon bg-lagoon/5 shadow-sm" : "border-ink/10 bg-white hover:border-ink/30"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition",
                              on ? "border-lagoon bg-lagoon text-white" : "border-ink/25"
                            )}
                          >
                            {on && <Check className="h-3.5 w-3.5" />}
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-medium">{e.label}</span>
                            <span className="block text-xs text-ink/50">
                              {brl(e.price)} {e.unit}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="animate-fade space-y-5">
                <div>
                  <h4 className="font-display text-3xl font-semibold">Quem vai se hospedar?</h4>
                  <p className="mt-2 text-sm text-ink/60">Precisamos apenas de alguns dados para garantir sua reserva.</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Nome completo</label>
                  <input
                    className={field("name")}
                    placeholder="Maria da Silva"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {tried && errors.name && <p className="mt-1.5 text-xs text-coral">{errors.name}</p>}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">E-mail</label>
                    <input
                      type="email"
                      className={field("email")}
                      placeholder="voce@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {tried && errors.email && <p className="mt-1.5 text-xs text-coral">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      className={field("phone")}
                      placeholder="(11) 90000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {tried && errors.phone && <p className="mt-1.5 text-xs text-coral">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Pedidos especiais <span className="font-normal text-ink/40">(opcional)</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-ink/15 bg-white px-5 py-4 outline-none transition focus:border-lagoon focus:ring-4 focus:ring-lagoon/10"
                    placeholder="Aniversário, lua de mel, alergias, andar alto…"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
                <p className="rounded-2xl bg-white p-4 text-xs leading-relaxed text-ink/60 ring-1 ring-ink/5">
                  🔒 Nenhuma cobrança será feita agora. O pagamento é realizado no check-in. Cancelamento gratuito até 7
                  dias antes da chegada.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="animate-pop space-y-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lagoon text-white shadow-xl shadow-lagoon/30">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h4 className="font-display text-4xl font-semibold sm:text-5xl">
                    Tudo certo, {form.name.trim().split(" ")[0]}!
                  </h4>
                  <p className="mx-auto mt-3 max-w-md text-ink/60">
                    Sua reserva no Aurora Bay está confirmada. Enviamos todos os detalhes para{" "}
                    <strong className="text-ink">{form.email}</strong>.
                  </p>
                </div>

                <div className="mx-auto max-w-md rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-ink/5">
                  <div className="flex items-center justify-between border-b border-dashed border-ink/20 pb-4">
                    <span className="text-xs uppercase tracking-widest text-ink/50">Código da reserva</span>
                    <span className="font-mono text-lg font-semibold text-lagoon">{code}</span>
                  </div>
                  <dl className="space-y-3 pt-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/50">Acomodação</dt>
                      <dd className="font-medium">{room.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/50">Chegada</dt>
                      <dd className="text-right font-medium capitalize">{formatDateLong(search.checkIn)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/50">Saída</dt>
                      <dd className="text-right font-medium capitalize">{formatDateLong(search.checkOut)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink/50">Hóspedes</dt>
                      <dd className="font-medium">
                        {search.adults} adulto(s){search.children > 0 && ` + ${search.children} criança(s)`}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-ink/10 pt-3 text-base">
                      <dt className="font-semibold">Total</dt>
                      <dd className="font-display text-2xl font-semibold text-lagoon">{brl(breakdown.total)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium transition hover:border-ink"
                  >
                    <Printer className="h-4 w-4" /> Imprimir
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-white transition hover:bg-lagoon"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            )}
          </div>

          {step < 2 && (
            <div className="flex items-center justify-between gap-4 border-t border-ink/10 bg-white/60 px-6 py-5 sm:px-10">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-sm font-medium text-ink/60 transition hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
              ) : (
                <span className="hidden text-xs text-ink/50 sm:block">Cancelamento grátis até 7 dias antes</span>
              )}
              <button
                onClick={next}
                className="group ml-auto flex items-center gap-3 rounded-full bg-lagoon px-8 py-4 font-semibold text-white shadow-lg shadow-lagoon/30 transition hover:bg-ink active:scale-95"
              >
                {step === 0 ? "Continuar" : "Confirmar reserva"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
