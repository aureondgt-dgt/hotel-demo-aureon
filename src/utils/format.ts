export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const toISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const addDays = (d: Date, n: number) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
};

export const parseISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

export const nightsBetween = (a: string, b: string) => {
  if (!a || !b) return 0;
  const diff = Math.round((parseISO(b).getTime() - parseISO(a).getTime()) / 86400000);
  return Math.max(0, diff);
};

export const formatDateShort = (iso: string) =>
  parseISO(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");

export const formatDateLong = (iso: string) =>
  parseISO(iso).toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "long", year: "numeric" });
