import type { SourceStatus } from "./classes";

export type UpdateCategory = "Patch Notes" | "News" | "Events" | "Maintenance";
export type UpdateRegion = "KR" | "Global" | "EU";

export interface UpdateEntry {
  id: string;
  title: string;
  excerpt: string;
  summary: string;
  watchlist?: string[];
  tags?: string[];
  category: UpdateCategory;
  region: UpdateRegion;
  publishDate: string;
  coverImage: string;
  isOfficialSource: boolean;
  sourceStatus: SourceStatus;
  lastUpdated: string;
  sourceUrl?: string;
  sourceUrls?: Array<{ label: string; url: string }>;
}

export const updates: UpdateEntry[] = [
  {
    id: "summer-game-fest-2026-trailer-2026-06-05",
    title: "AION 2 sera present au Summer Game Fest avec un nouveau trailer",
    excerpt:
      "AION 2 sera presente pendant le Summer Game Fest 2026 avec un nouveau trailer. L evenement pourrait apporter de nouvelles informations sur la version globale du MMORPG.",
    summary:
      "NCSoft confirme la presence d AION 2 au Summer Game Fest 2026.\n\nUn nouveau trailer est attendu le 5 juin, avec davantage d informations sur le MMORPG nouvelle generation. Cette apparition devrait permettre d en apprendre plus sur la version globale du jeu, son univers, ses systemes et les prochaines etapes de communication.\n\nPour le moment, il faut rester prudent : aucune date de sortie globale precise ne doit etre consideree comme confirmee tant qu elle n est pas annoncee officiellement par NCSoft ou les canaux officiels AION 2.\n\nLe Summer Game Fest 2026 aura lieu le 5 juin a 2 PM PT / 5 PM ET, soit 23h en France et en Slovaquie.\n\nAion2HUB suivra les annonces et mettra a jour les informations disponibles apres la diffusion du trailer.",
    watchlist: [
      "Nouveau trailer",
      "Informations sur la version globale",
      "Eventuelle fenetre de sortie",
      "Plateformes confirmees",
      "Details sur les classes, le contenu ou le modele economique",
    ],
    tags: ["Global", "Confirme", "Trailer"],
    category: "Events",
    region: "Global",
    publishDate: "2026-06-05",
    coverImage: "/images/updates/summer-game-fest-2026.jpg",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-05-11",
    sourceUrl: "https://www.summergamefest.com/events/summer-game-fest",
    sourceUrls: [
      {
        label: "Summer Game Fest officiel",
        url: "https://www.summergamefest.com/events/summer-game-fest",
      },
      {
        label: "AION 2 officiel",
        url: "https://x.com/AION2Official/status/2052550581206827421",
      },
    ],
  },
  {
    id: "steam-aion2-announcement-2026-05-09",
    title: "AION 2 arrive sur Steam : annonce officielle et ouverture de la wishlist",
    excerpt:
      "NC annonce officiellement l arrive d AION 2 sur Steam. La page est en ligne et les joueurs peuvent deja ajouter le jeu a leur liste de souhaits.",
    summary:
      "Selon l annonce officielle publiee sur Steam, AION 2 dispose desormais d une page dediee sur la plateforme. Les joueurs peuvent suivre le projet directement sur Steam et ajouter le jeu a leur wishlist pour etre informes des prochaines etapes officielles.",
    category: "News",
    region: "Global",
    publishDate: "2026-04-21",
    coverImage: "/images/updates/steam-aion2.png",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-05-10",
    sourceUrl: "https://store.steampowered.com/news/app/3393110/view/510736286715216750",
  },
  {
    id: "steam-aion2-world-scale-aerial-combat-2026-05-10",
    title: "AION 2 detaille son echelle: un monde x36 et un vrai systeme de combat aerien",
    excerpt:
      "La page Steam officielle confirme une orientation forte: un monde 36 fois plus vaste que l AION original, construit sous Unreal Engine 5, avec un combat aerien au coeur du gameplay.",
    summary:
      "D apres la page officielle AION 2 sur Steam, le jeu est developpe avec Unreal Engine 5 et prend place dans un monde annonce comme 36 fois plus grand que celui du premier AION. Le combat aerien n est pas presente comme une mecanique secondaire: il est decrit comme un pilier de conception du monde et des affrontements, avec des zones, des batailles et des conflits structures autour de la verticalite.",
    category: "News",
    region: "Global",
    publishDate: "2026-05-10",
    coverImage: "/images/updates/aion2-map-scale.png",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-05-10",
    sourceUrl: "https://store.steampowered.com/app/3393110/AION_2/",
  },
];

