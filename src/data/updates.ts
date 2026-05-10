import type { SourceStatus } from "./classes";

export type UpdateCategory = "Patch Notes" | "News" | "Events" | "Maintenance";
export type UpdateRegion = "KR" | "Global" | "EU";

export interface UpdateEntry {
  id: string;
  title: string;
  excerpt: string;
  summary: string;
  category: UpdateCategory;
  region: UpdateRegion;
  publishDate: string;
  coverImage: string;
  isOfficialSource: boolean;
  sourceStatus: SourceStatus;
  lastUpdated: string;
  sourceUrl?: string;
}

export const updates: UpdateEntry[] = [
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

