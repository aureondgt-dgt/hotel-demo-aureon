import { useMemo, useState } from "react";
import { ArrowUpRight, BedDouble, Eye, Heart, Maximize2, Moon, SearchX, Star, Users } from "lucide-react";
import { categories, img, rooms, type Room, type RoomCategory } from "../data";
import type { Search } from "../types";
import { brl, formatDateShort, nightsBetween } from "../utils/format";
import { cn } from "../utils/cn";
import { Reveal, SectionTitle } from "./Reveal";

interface Props {
  search: Search;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onBook: (room: Room) => void;
}

type Sort = "recommended" | "low" | "high";

export function Rooms({ search, favorites, toggleFavorite, onBook }: Props) {
  const [cat, setCat] = useState<"all" | RoomCategory>("all");
  const [sort, setSort] = useState<Sort>("recommended");
  const [onlyFav, setOnlyFav] = useState(false);

  const nights = nightsBetween(search.checkIn, search.checkOut) || 1;
  const guests = search.adults + search.children;

  const list = useMemo(() => {
    let r = rooms.filter((x) => (cat === "all" || x.category === cat) && x.maxGuests >= guests);
    if (onlyFav) r = r.filter((x) => favorites.includes(x.id));
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [cat, sort, guests, onlyFav, favorites]);

  return (
    <section id="quartos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionTitle
        eyebrow="Acomodações"
        title={
          <>
            Seu espaço, <em className="italic text-lagoon">do seu jeito</em>
          </>
        }
        subtitle="De deluxe aconchegantes a villas com piscina privativa, cada acomodação foi desenhada para ser um destino em si mesma."
      />

      {/* filters */}
      <Reveal className="mt-14 flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "rounded-full border px-6 py-2.5 text-sm font-medium transition-all",
                cat === c.id
                  ? "border-ink bg-ink text-white shadow-lg"
                  : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setOnlyFav((v) => !v)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition",
              onlyFav ? "border-coral bg-coral/10 text-coral" : "border-ink/15 text-ink/70 hover:border-ink/40"
            )}
          >
            <Heart className={cn("h-4 w-4", onlyFav && "fill-current")} />
            Favoritos {favorites.length > 0 && `(${favorites.length})`}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="cursor-pointer rounded-full border border-ink/15 bg-transparent px-5 py-2.5 text-sm font-medium text-ink/80 outline-none transition hover:border-ink/40"
            aria-label="Ordenar"
          >
            <option value="recommended">Recomendados</option>
            <option value="low">Menor preço</option>
            <option value="high">Maior preço</option>
          </select>
        </div>
      </Reveal>

      {search.active && (
        <div className="animate-slide-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl bg-lagoon/10 px-6 py-4 text-sm text-lagoon">
          <span className="font-semibold">
            {list.length} {list.length === 1 ? "acomodação disponível" : "acomodações disponíveis"}
          </span>
          <span>
            {formatDateShort(search.checkIn)} → {formatDateShort(search.checkOut)} · {nights}{" "}
            {nights === 1 ? "noite" : "noites"} · {guests} {guests === 1 ? "hóspede" : "hóspedes"}
          </span>
        </div>
      )}

      {list.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-ink/20 py-20 text-center">
          <SearchX className="h-10 w-10 text-ink/30" />
          <p className="font-display text-3xl">Nenhuma acomodação encontrada</p>
          <p className="max-w-md text-ink/60">
            Tente ajustar os filtros ou o número de hóspedes. Nossa equipe também pode montar uma solução sob medida.
          </p>
          <button
            onClick={() => {
              setCat("all");
              setOnlyFav(false);
            }}
            className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-lagoon"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {list.map((room, i) => {
            const fav = favorites.includes(room.id);
            return (
              <Reveal key={room.id} delay={(i % 3) * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(12,26,31,0.3)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={img(room.photo, 900, 675)}
                      alt={room.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    {room.tag && (
                      <span className="absolute left-4 top-4 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-ink">
                        {room.tag}
                      </span>
                    )}
                    <button
                      onClick={() => toggleFavorite(room.id)}
                      aria-label="Favoritar"
                      className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110 active:scale-90"
                    >
                      <Heart className={cn("h-5 w-5 transition", fav ? "fill-coral text-coral" : "text-ink")} />
                    </button>
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      {room.rating.toFixed(1)}
                      <span className="text-white/70">({room.reviews})</span>
                    </div>
                    {room.left <= 2 && (
                      <span className="absolute bottom-4 right-4 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white">
                        {room.left === 1 ? "Última unidade!" : `Restam ${room.left}`}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-3xl font-semibold">{room.name}</h3>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/60">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="h-4 w-4 text-lagoon" /> {room.size} m²
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-lagoon" /> até {room.maxGuests}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="h-4 w-4 text-lagoon" /> {room.bed}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4 text-lagoon" /> {room.view}
                      </span>
                    </div>
                    <p className="mb-6 mt-4 line-clamp-2 text-sm leading-relaxed text-ink/60">{room.description}</p>

                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-ink/10 pt-6">
                      <div>
                        <p className="text-xs text-ink/50">a partir de</p>
                        <p className="font-display text-3xl font-semibold text-ink">
                          {brl(room.price)}
                          <span className="font-sans text-xs font-normal text-ink/50"> /noite</span>
                        </p>
                        {search.active && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-lagoon">
                            <Moon className="h-3 w-3" /> {nights} {nights === 1 ? "noite" : "noites"}:{" "}
                            {brl(room.price * nights)}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onBook(room)}
                        className="group/btn flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-lagoon active:scale-95"
                      >
                        Reservar
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
}
