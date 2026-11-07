import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "../utils/cn";

interface Msg {
  from: "bot" | "user";
  text: string;
}

const quick = ["Horário de check-in", "Café da manhã", "Aceitam pets?", "Como chegar", "Spa e massagens"];

const answers: { keys: string[]; text: string }[] = [
  { keys: ["check", "horário", "horario", "entrada", "saída", "saida"], text: "O check-in é a partir das 14h e o check-out até às 12h. Você pode adicionar o Late Check-out (até 16h) na hora da reserva. 🕑" },
  { keys: ["café", "cafe", "manhã", "manha", "breakfast"], text: "Nosso café da manhã gourmet é servido das 7h às 11h, com estação de ovos, pães artesanais e frutas tropicais. Custa R$ 89 por pessoa/noite e pode ser incluído na reserva. 🥐" },
  { keys: ["pet", "cachorro", "gato", "animal"], text: "Sim, somos pet friendly! Aceitamos cães e gatos até 15 kg, com caminha e comedouro por nossa conta. Taxa única de R$ 120. 🐾" },
  { keys: ["chegar", "localização", "localizacao", "endereço", "endereco", "onde", "transfer", "balsa"], text: "Estamos em Ilhabela, a 25 min da balsa de São Sebastião. Oferecemos transfer privativo de Guarulhos, Congonhas e do terminal da balsa — basta selecionar na reserva. 🚐" },
  { keys: ["spa", "massagem", "relax"], text: "O Spa Aurora tem 2.000 m² com hidroterapia, sauna, banhos de ervas e massagens a partir de R$ 280. Funciona das 9h às 21h. Recomendamos reservar com antecedência! 🌿" },
  { keys: ["preço", "preco", "valor", "diária", "diaria", "quanto"], text: "Nossas diárias começam em R$ 790 (Deluxe Jardim) e vão até R$ 3.990 (Cobertura Aurora). Use a barra de reservas para ver o valor total para suas datas. 💎" },
  { keys: ["criança", "crianca", "kids", "filho"], text: "O Clube Kids funciona diariamente das 9h às 18h para crianças de 4 a 12 anos, com monitores treinados — incluso na diária da Suíte Família Coral! 🎈" },
  { keys: ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite"], text: "Olá! Que prazer ter você aqui. Como posso ajudar a tornar sua estadia perfeita? ✨" },
  { keys: ["recepção", "recepcao", "humano", "atendente", "telefone", "falar"], text: "Claro! Nossa recepção atende 24h pelo telefone +55 (12) 3896-0000 ou WhatsApp. Ficaremos felizes em ajudar. 📞" },
];

function reply(input: string) {
  const t = input.toLowerCase();
  const hit = answers.find((a) => a.keys.some((k) => t.includes(k)));
  return (
    hit?.text ??
    "Boa pergunta! Para esse assunto, nossa equipe de reservas pode ajudar melhor: +55 (12) 3896-0000. Posso ajudar com horários, café da manhã, pets, spa ou como chegar. 😊"
  );
}

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Olá! Sou a Aurora, sua concierge virtual. Posso ajudar com horários, spa, restaurante e muito mais. 🌅" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const v = text.trim();
    if (!v || typing) return;
    setMsgs((m) => [...m, { from: "user", text: v }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: reply(v) }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
      {open && (
        <div className="animate-pop flex h-[min(560px,75svh)] w-[calc(100vw-2.5rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-10px_rgba(12,26,31,0.5)] ring-1 ring-ink/10">
          <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-coral text-ink">
              <Sparkles className="h-5 w-5" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ink bg-emerald-400" />
            </span>
            <div className="flex-1">
              <p className="font-display text-xl font-semibold leading-tight">Aurora · Concierge</p>
              <p className="text-xs text-white/60">Online agora</p>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/10" aria-label="Fechar chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-sand px-4 py-5">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex animate-slide-up", m.from === "user" && "justify-end")}>
                <p
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.from === "bot" ? "rounded-bl-md bg-white text-ink shadow-sm" : "rounded-br-md bg-lagoon text-white"
                  )}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <div className="flex">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-ink/40" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-ink/10 bg-sand px-4 py-3">
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="shrink-0 rounded-full border border-lagoon/30 bg-white px-3.5 py-1.5 text-xs font-medium text-lagoon transition hover:bg-lagoon hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-ink/10 bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta…"
              className="min-w-0 flex-1 rounded-full bg-sand px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-lagoon/30"
            />
            <button
              type="submit"
              className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink transition hover:bg-gold-light active:scale-90 disabled:opacity-50"
              disabled={!input.trim() || typing}
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="group relative grid h-16 w-16 place-items-center rounded-full bg-ink text-white shadow-2xl ring-4 ring-gold/30 transition hover:scale-105 active:scale-95"
        aria-label="Abrir concierge virtual"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </button>
    </div>
  );
}
