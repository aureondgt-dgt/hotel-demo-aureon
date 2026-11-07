import { useCallback, useEffect, useState } from "react";
import { About } from "./components/About";
import { BookingBar } from "./components/BookingBar";
import { BookingModal } from "./components/BookingModal";
import { Concierge } from "./components/Concierge";
import { Contact } from "./components/Contact";
import { Experiences } from "./components/Experiences";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Offers } from "./components/Offers";
import { Rooms } from "./components/Rooms";
import { Testimonials } from "./components/Testimonials";
import { ToastProvider, useToast } from "./components/Toast";
import type { Room } from "./data";
import type { Search } from "./types";
import { addDays, nightsBetween, toISO } from "./utils/format";

function Site() {
  const notify = useToast();
  const [search, setSearch] = useState<Search>(() => {
    const t = new Date();
    return {
      checkIn: toISO(addDays(t, 7)),
      checkOut: toISO(addDays(t, 10)),
      adults: 2,
      children: 0,
      active: false,
    };
  });
  const [booking, setBooking] = useState<Room | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("aurora-favs") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("aurora-favs", JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  const toggleFavorite = useCallback(
    (id: string) => {
      const has = favorites.includes(id);
      notify(has ? "Removido dos favoritos" : "Adicionado aos favoritos ♥", "info");
      setFavorites(has ? favorites.filter((x) => x !== id) : [...favorites, id]);
    },
    [notify, favorites]
  );

  const handleSearch = () => {
    setSearch((s) => ({ ...s, active: true }));
    const nights = nightsBetween(search.checkIn, search.checkOut);
    notify(`Disponibilidade para ${nights} ${nights === 1 ? "noite" : "noites"} atualizada!`);
    setTimeout(() => document.getElementById("quartos")?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <BookingBar search={search} setSearch={setSearch} onSubmit={handleSearch} />
      <About />
      <Rooms search={search} favorites={favorites} toggleFavorite={toggleFavorite} onBook={setBooking} />
      <Experiences />
      <Gallery />
      <Offers />
      <Testimonials />
      <Contact />
      <Footer />
      <Concierge />

      {booking && (
        <BookingModal
          room={booking}
          search={search}
          setSearch={(s) => setSearch({ ...s, active: true })}
          onClose={() => setBooking(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Site />
    </ToastProvider>
  );
}
