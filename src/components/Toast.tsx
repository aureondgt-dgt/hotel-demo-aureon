import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, Info } from "lucide-react";

interface ToastItem {
  id: number;
  message: string;
  kind: "success" | "info";
}

const ToastCtx = createContext<(message: string, kind?: "success" | "info") => void>(() => {});

export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const notify = useCallback((message: string, kind: "success" | "info" = "success") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev.slice(-2), { id, message, kind }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3800);
  }, []);

  return (
    <ToastCtx.Provider value={notify}>
      {children}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none" aria-live="polite">
        {items.map((t) => (
          <div
            key={t.id}
            className="animate-slide-up pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink/95 backdrop-blur px-5 py-4 text-sm text-white shadow-2xl ring-1 ring-white/10 max-w-sm"
          >
            {t.kind === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
            ) : (
              <Info className="h-5 w-5 shrink-0 text-gold" />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
