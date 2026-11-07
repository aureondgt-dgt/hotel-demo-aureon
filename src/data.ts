export const img = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export type RoomCategory = "deluxe" | "suite" | "familia" | "villa";

export interface Room {
  id: string;
  name: string;
  category: RoomCategory;
  price: number;
  size: number;
  maxGuests: number;
  bed: string;
  view: string;
  photo: number;
  rating: number;
  reviews: number;
  tag?: string;
  left: number;
  description: string;
  amenities: string[];
}

export const categories: { id: "all" | RoomCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "deluxe", label: "Deluxe" },
  { id: "suite", label: "Suítes" },
  { id: "familia", label: "Família" },
  { id: "villa", label: "Villas" },
];

export const rooms: Room[] = [
  {
    id: "horizonte",
    name: "Suíte Horizonte",
    category: "suite",
    price: 1290,
    size: 42,
    maxGuests: 2,
    bed: "Cama King",
    view: "Vista para o mar",
    photo: 2725675,
    rating: 4.9,
    reviews: 412,
    tag: "Mais reservada",
    left: 3,
    description:
      "Acordar com o mar de Ilhabela emoldurado pela varanda privativa. Roupa de cama em algodão egípcio, banheira de imersão e uma curadoria de aromas locais tornam cada noite memorável.",
    amenities: ["Varanda com vista mar", "Banheira de imersão", "Smart TV 55\"", "Minibar premium", "Ar-condicionado", "Wi-Fi 1 Gbps"],
  },
  {
    id: "jardim",
    name: "Deluxe Jardim",
    category: "deluxe",
    price: 790,
    size: 32,
    maxGuests: 2,
    bed: "Cama Queen",
    view: "Jardim tropical",
    photo: 40624417,
    rating: 4.7,
    reviews: 289,
    left: 5,
    description:
      "Um refúgio aconchegante cercado por Mata Atlântica. Luz suave, madeira natural e o canto dos pássaros ao amanhecer — o equilíbrio perfeito entre conforto e natureza.",
    amenities: ["Terraço no jardim", "Chuveiro tropical", "Smart TV 43\"", "Cafeteira Nespresso", "Ar-condicionado", "Wi-Fi 1 Gbps"],
  },
  {
    id: "coral",
    name: "Suíte Família Coral",
    category: "familia",
    price: 1690,
    size: 68,
    maxGuests: 5,
    bed: "King + 2 Solteiros",
    view: "Vista piscina",
    photo: 34645081,
    rating: 4.8,
    reviews: 198,
    tag: "Ideal para famílias",
    left: 2,
    description:
      "Dois ambientes integrados, sala de estar ampla e kids corner com jogos e livros. Acesso direto ao deck da piscina e Clube Kids com monitores incluso na diária.",
    amenities: ["2 ambientes", "Kids corner", "Acesso à piscina", "Cozinha compacta", "Smart TV 55\"", "Berço sob demanda"],
  },
  {
    id: "villa",
    name: "Villa Piscina Privativa",
    category: "villa",
    price: 2890,
    size: 110,
    maxGuests: 4,
    bed: "2 camas King",
    view: "Mar e piscina privativa",
    photo: 2506990,
    rating: 5.0,
    reviews: 126,
    tag: "Exclusivo",
    left: 1,
    description:
      "Privacidade absoluta com piscina de borda infinita, deck com espreguiçadeiras, mordomo 24h e café da manhã servido onde você preferir. A experiência máxima do Aurora Bay.",
    amenities: ["Piscina privativa", "Mordomo 24h", "Cozinha gourmet", "Sauna a vapor", "Adega climatizada", "Transfer incluso"],
  },
  {
    id: "mare",
    name: "Studio Maré",
    category: "deluxe",
    price: 920,
    size: 36,
    maxGuests: 3,
    bed: "Queen + sofá-cama",
    view: "Vista parcial mar",
    photo: 8082217,
    rating: 4.6,
    reviews: 174,
    left: 4,
    description:
      "Design contemporâneo e funcional para quem gosta de espaço. Mesa de trabalho, sofá-cama e iluminação inteligente controlada por tablet.",
    amenities: ["Home office", "Sofá-cama", "Iluminação inteligente", "Smart TV 50\"", "Cafeteira Nespresso", "Wi-Fi 1 Gbps"],
  },
  {
    id: "cobertura",
    name: "Cobertura Aurora",
    category: "suite",
    price: 3990,
    size: 160,
    maxGuests: 4,
    bed: "King + sala íntima",
    view: "Panorâmica 270°",
    photo: 6466496,
    rating: 4.9,
    reviews: 87,
    tag: "Assinatura",
    left: 1,
    description:
      "No último andar, uma suíte de 160 m² com terraço panorâmico, jacuzzi aquecida e bar privativo. O pôr do sol mais espetacular da ilha é só seu.",
    amenities: ["Terraço panorâmico", "Jacuzzi aquecida", "Bar privativo", "Sala íntima", "Mordomo 24h", "Check-out até 16h"],
  },
];

export const extras = [
  { id: "breakfast", label: "Café da manhã gourmet", price: 89, unit: "por hóspede/noite", mode: "guestNight" as const },
  { id: "transfer", label: "Transfer privativo ida e volta", price: 180, unit: "por estadia", mode: "flat" as const },
  { id: "spa", label: "Day spa para dois", price: 350, unit: "por estadia", mode: "flat" as const },
  { id: "late", label: "Late check-out (até 16h)", price: 150, unit: "por estadia", mode: "flat" as const },
];

export type ExperienceId = "spa" | "gastro" | "mar";

export const experiences: {
  id: ExperienceId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  photo: number;
  photo2: number;
  highlights: string[];
  hours: string;
}[] = [
  {
    id: "spa",
    label: "Spa Aurora",
    title: "Spa Aurora",
    subtitle: "2.000 m² de renovação",
    description:
      "Inspirado nos rituais dos povos da floresta e do mar, o Spa Aurora combina massagens terapêuticas, banhos de ervas, sauna e hidroterapia com vista para a Mata Atlântica.",
    photo: 31234758,
    photo2: 31234756,
    highlights: ["Massagem com pedras vulcânicas", "Circuito de hidroterapia", "Banho de ervas amazônicas", "Sauna seca e a vapor", "Yoga ao nascer do sol"],
    hours: "Diariamente · 9h às 21h",
  },
  {
    id: "gastro",
    label: "Gastronomia",
    title: "Restaurante Maré",
    subtitle: "Cozinha autoral caiçara",
    description:
      "O chef Rafael Montenegro transforma peixes frescos, frutos do mar e ingredientes da ilha em menus degustação que contam a história do litoral paulista, harmonizados com rótulos selecionados.",
    photo: 7627408,
    photo2: 28705621,
    highlights: ["Menu degustação de 7 tempos", "Adega com 300 rótulos", "Jantares na praia à luz de velas", "Aulas de culinária caiçara", "Bar de coquetéis autorais"],
    hours: "Jantar · 19h às 23h",
  },
  {
    id: "mar",
    label: "Piscina & Mar",
    title: "Piscina Infinita",
    subtitle: "Onde o céu encontra o oceano",
    description:
      "Uma piscina de borda infinita de 60 metros, cabanas privativas, bar molhado e serviço de praia. Passeios de veleiro, mergulho e stand-up paddle para quem busca aventura.",
    photo: 34790496,
    photo2: 24807133,
    highlights: ["Piscina infinita aquecida", "Cabanas com serviço de bar", "Passeio de veleiro ao pôr do sol", "Mergulho com cilindro", "Clube Kids com monitores"],
    hours: "Diariamente · 7h às 20h",
  },
];

export type GalleryCat = "Todos" | "Resort" | "Quartos" | "Spa" | "Gastronomia";

export const galleryCats: GalleryCat[] = ["Todos", "Resort", "Quartos", "Spa", "Gastronomia"];

export const gallery: { id: number; cat: Exclude<GalleryCat, "Todos">; h: number; alt: string }[] = [
  { id: 34790496, cat: "Resort", h: 700, alt: "Piscina infinita ao pôr do sol" },
  { id: 2725675, cat: "Quartos", h: 1000, alt: "Suíte Horizonte" },
  { id: 31234758, cat: "Spa", h: 1100, alt: "Massagem no Spa Aurora" },
  { id: 7627408, cat: "Gastronomia", h: 650, alt: "Pratos do Restaurante Maré" },
  { id: 20639392, cat: "Resort", h: 900, alt: "Palmeiras e piscina ao entardecer" },
  { id: 40624417, cat: "Quartos", h: 700, alt: "Deluxe Jardim" },
  { id: 28705621, cat: "Gastronomia", h: 1000, alt: "Prato autoral do chef" },
  { id: 24807133, cat: "Resort", h: 750, alt: "Deck da piscina" },
  { id: 31234756, cat: "Spa", h: 700, alt: "Sala de tratamentos" },
  { id: 2506990, cat: "Quartos", h: 950, alt: "Villa com piscina privativa" },
  { id: 2854553, cat: "Resort", h: 1000, alt: "Varanda com vista para as montanhas" },
  { id: 23644633, cat: "Gastronomia", h: 800, alt: "Entrada servida no Maré" },
  { id: 7235062, cat: "Spa", h: 1000, alt: "Relaxamento com vista" },
  { id: 34645081, cat: "Quartos", h: 700, alt: "Suíte Família Coral" },
];

export const offers = [
  {
    id: "romance",
    title: "Lua de Mel Aurora",
    desc: "4 noites em Suíte Horizonte, jantar degustação, massagem para casal e champanhe de boas-vindas.",
    discount: 25,
    code: "AMOR25",
    photo: 2725675,
    icon: "heart" as const,
  },
  {
    id: "longstay",
    title: "Estadia Prolongada",
    desc: "Fique 7 noites e pague 5. Inclui café da manhã e transfer de chegada.",
    discount: 30,
    code: "LONGA30",
    photo: 34645081,
    icon: "sun" as const,
  },
  {
    id: "wellness",
    title: "Retiro Wellness",
    desc: "3 noites com yoga diária, circuito de hidroterapia e menu detox no Restaurante Maré.",
    discount: 20,
    code: "ZEN20",
    photo: 31234756,
    icon: "leaf" as const,
  },
];

export const testimonials = [
  {
    name: "Mariana Albuquerque",
    from: "São Paulo, SP",
    text: "O melhor fim de semana do ano. A suíte com vista para o mar, o spa e o jantar no Maré foram impecáveis. Cada detalhe é pensado para você se sentir em casa — só que muito melhor.",
    stay: "Suíte Horizonte",
  },
  {
    name: "Carlos & Beatriz Nogueira",
    from: "Belo Horizonte, MG",
    text: "Fizemos nossa lua de mel aqui e foi mágico. O mordomo da villa preparou um jantar na praia que jamais esqueceremos. Já estamos planejando voltar no aniversário de casamento.",
    stay: "Villa Piscina Privativa",
  },
  {
    name: "Família Tavares",
    from: "Curitiba, PR",
    text: "Viajar com duas crianças pequenas costuma ser cansativo, mas o Clube Kids salvou nossas férias. Os monitores são incríveis e nós ainda conseguimos relaxar no spa!",
    stay: "Suíte Família Coral",
  },
  {
    name: "Rodrigo Vasconcelos",
    from: "Rio de Janeiro, RJ",
    text: "Viajo muito a trabalho e posso dizer: atendimento de primeiríssimo nível. Wi-Fi rápido, café da manhã espetacular e uma equipe que antecipa suas necessidades.",
    stay: "Studio Maré",
  },
];

export const faqs = [
  { q: "Qual o horário de check-in e check-out?", a: "O check-in começa às 14h e o check-out vai até às 12h. Com o Late Check-out você fica até as 16h, sujeito à disponibilidade. Na Cobertura Aurora o late check-out já está incluso." },
  { q: "O hotel aceita animais de estimação?", a: "Sim! Somos pet friendly para cães e gatos de até 15 kg. Oferecemos caminha, comedouro e um menu especial para o seu amigo. Taxa única de R$ 120 por estadia." },
  { q: "Como chego ao hotel?", a: "Estamos a 25 minutos da balsa de São Sebastião. Oferecemos transfer privativo do aeroporto de Guarulhos, Congonhas e do terminal da balsa. É só solicitar na reserva." },
  { q: "Qual a política de cancelamento?", a: "Cancelamento gratuito até 7 dias antes da chegada. Entre 7 e 2 dias, cobramos a primeira diária. Em tarifas promocionais, consulte as condições específicas." },
  { q: "O café da manhã está incluso?", a: "O café da manhã gourmet é opcional (R$ 89 por pessoa/noite) e pode ser adicionado durante a reserva. Nas ofertas Lua de Mel, Estadia Prolongada e Villas já está incluso." },
];

export const stats = [
  { value: 5, suffix: "★", label: "Classificação luxo" },
  { value: 120, suffix: "", label: "Suítes e villas" },
  { value: 12, suffix: " mil+", label: "Hóspedes felizes por ano" },
  { value: 18, suffix: "", label: "Anos de hospitalidade" },
];
