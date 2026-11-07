import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Plus, Send } from "lucide-react";
import { faqs } from "../data";
import { cn } from "../utils/cn";
import { Reveal, SectionTitle } from "./Reveal";
import { useToast } from "./Toast";

export function Contact() {
  const [open, setOpen] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const notify = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    notify(`Obrigado, ${form.name.split(" ")[0]}! Responderemos em até 2 horas.`);
    setForm({ name: "", email: "", message: "" });
  };

  const info = [
    { icon: MapPin, label: "Endereço", value: "Av. Costa Azul, 1200 · Ilhabela, SP" },
    { icon: Phone, label: "Reservas", value: "+55 (12) 3896-0000" },
    { icon: Mail, label: "E-mail", value: "reservas@aurorabay.com.br" },
    { icon: Clock, label: "Recepção", value: "24 horas, todos os dias" },
  ];

  return (
    <section id="contato" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionTitle
            center={false}
            eyebrow="Dúvidas frequentes"
            title={
              <>
                Tudo o que você <em className="italic text-lagoon">precisa saber</em>
              </>
            }
          />
          <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <div>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className={cn("font-display text-2xl font-medium transition-colors", isOpen && "text-lagoon")}>
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                          isOpen ? "rotate-45 border-lagoon bg-lagoon text-white" : "border-ink/20"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-500",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 leading-relaxed text-ink/65">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal direction="right">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-8 text-white grain sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lagoon/50 blur-[80px]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Fale conosco</p>
              <h3 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Vamos planejar sua estadia?</h3>

              <form onSubmit={submit} className="mt-8 space-y-4">
                <input
                  required
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-gold focus:bg-white/10"
                />
                <input
                  required
                  type="email"
                  placeholder="Seu e-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-gold focus:bg-white/10"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Conte-nos o que você está imaginando…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-gold focus:bg-white/10"
                />
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 font-semibold text-ink transition hover:bg-gold-light active:scale-[0.98]"
                >
                  Enviar mensagem
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>

              <div className="mt-10 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-2">
                {info.map((x) => (
                  <div key={x.label} className="flex gap-3">
                    <x.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50">{x.label}</p>
                      <p className="mt-0.5 text-sm text-white/90">{x.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
