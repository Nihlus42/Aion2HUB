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
    id: "aion2-economic-model-approach-2026-07-08",
    title: "AION 2 détaille son modèle économique : free-to-play, abonnement, pass et marché en jeu",
    excerpt:
      "NCSoft publie une annonce officielle dédiée au modèle économique d’AION 2. Le studio confirme une structure free-to-play avec monnaies en jeu, abonnement mensuel, boutique, pass de combat et packs de fondateur.",
    summary:
      "Dans une annonce officielle publiée le 8 juillet 2026, l’équipe AION 2 présente les grandes lignes du modèle économique du jeu. Le cadre affiché est clair : AION 2 sera proposé en free-to-play, avec deux monnaies mises en avant — le Kina et le Quna — ainsi qu’un marché en jeu et un système d’échange entre ces deux devises.\n\nLe visuel officiel mentionne aussi plusieurs briques de monétisation : un abonnement à 15 $ par mois, une boutique en jeu avec objets cosmétiques et consommables, un pass de combat décliné en version standard et voie Premium, ainsi que des packs de fondateur. Côté cosmétiques, NC cite notamment le teint, l’allure, l’apparence d’arme et les montures.\n\nÀ ce stade, l’annonce pose surtout l’architecture générale du modèle économique. En revanche, elle ne détaille pas encore dans le même niveau de précision les limites exactes, l’équilibrage, ni la manière dont chaque système influencera la progression ou l’économie long terme. Bref : la structure est officielle, les implications fines restent à surveiller de près — parce que oui, le diable adore se planquer dans les petites lignes.",
    watchlist: [
      "Détails précis sur le rôle du Quna et son acquisition",
      "Fonctionnement exact du marché et de l’échange Kina ↔ Quna",
      "Contenu concret de l’abonnement mensuel",
      "Récompenses du pass standard et de la voie Premium",
      "Composition et prix des packs de fondateur"
    ],
    tags: ["Global", "Confirmé", "Modèle économique", "Free-to-play"],
    category: "News",
    region: "Global",
    publishDate: "2026-07-08",
    coverImage: "https://fizz-download.playnccdn.com/download/v2/buckets/marketing-platform/files/19daa0916cf-44ee37e4-32f3-43fd-96f5-209f0afce2ad",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-07-08",
    sourceUrl: "https://aion2.plaync.com/fr-fr/board/notice/view?articleId=6a4d80fc84389f5bef890cfb",
  },
  {
    id: "aion2-september-2026-release-window-2026-06-05",
    title: "AION 2 annonce sa date de sortie : lancement prévu le 30 septembre 2026",
    excerpt:
      "La page Steam officielle d’AION 2 affiche désormais une date de sortie fixée au 30 septembre 2026. Le Summer Game Fest n’a donc pas servi qu’à teaser : on a enfin une échéance de lancement concrète.",
    summary:
      "La page Steam officielle d’AION 2 indique désormais une date de parution fixée au 30 septembre 2026. C’est la mise à jour concrète la plus importante issue de la communication autour du Summer Game Fest : on passe d’un simple trailer attendu à une vraie date de lancement publique.\n\nLa fiche confirme aussi plusieurs points déjà mis en avant par NC : AION 2 est présenté comme un MMORPG pensé pour le PC, développé sous Unreal Engine 5, avec un monde annoncé comme 36 fois plus vaste que celui du premier AION et un conflit de factions au cœur de l’expérience.\n\nÀ ce stade, la communication officielle affiche bien le 30 septembre 2026 comme date de sortie. Comme toujours, on surveillera quand même les canaux officiels au cas où NC ajusterait encore le calendrier.",
    watchlist: [
      "Date de sortie exacte",
      "Ouverture des préinscriptions ou bonus de lancement",
      "Détails sur les serveurs globaux",
      "Nouvelles infos sur les classes, le PvP et le contenu endgame",
      "Précisions sur le modèle économique"
    ],
    tags: ["Global", "Confirmé", "Steam", "Sortie"],
    category: "News",
    region: "Global",
    publishDate: "2026-06-05",
    coverImage: "/images/updates/summer-game-fest-2026.jpg",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-06-06",
    sourceUrl: "https://store.steampowered.com/app/3393110/AION_2/",
    sourceUrls: [
      {
        label: "Page Steam officielle",
        url: "https://store.steampowered.com/app/3393110/AION_2/",
      },
      {
        label: "Événement Summer Game Fest",
        url: "https://www.summergamefest.com/events/summer-game-fest",
      }
    ],
  },
  {
    id: "summer-game-fest-2026-trailer-2026-06-05",
    title: "AION 2 sera présent au Summer Game Fest avec un nouveau trailer",
    excerpt:
      "AION 2 sera présenté pendant le Summer Game Fest 2026 avec un nouveau trailer. L’événement pourrait apporter de nouvelles informations sur la version globale du MMORPG.",
    summary:
      "NCSoft confirme la présence d’AION 2 au Summer Game Fest 2026.\n\nUn nouveau trailer est attendu le 5 juin, avec davantage d’informations sur le MMORPG nouvelle génération. Cette apparition devrait permettre d’en apprendre plus sur la version globale du jeu, son univers, ses systèmes et les prochaines étapes de communication.\n\nPour le moment, il faut rester prudent : aucune date de sortie globale précise ne doit être considérée comme confirmée tant qu’elle n’a pas été annoncée officiellement par NCSoft ou les canaux officiels AION 2.\n\nLe Summer Game Fest 2026 aura lieu le 5 juin à 2 PM PT / 5 PM ET, soit 23 h en France et en Slovaquie.\n\nAion2HUB suivra les annonces et mettra à jour les informations disponibles après la diffusion du trailer.",
    watchlist: [
      "Nouveau trailer",
      "Informations sur la version globale",
      "Éventuelle fenêtre de sortie",
      "Plateformes confirmées",
      "Détails sur les classes, le contenu ou le modèle économique",
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
      "NC annonce officiellement l’arrivée d’AION 2 sur Steam. La page est en ligne et les joueurs peuvent déjà ajouter le jeu à leur liste de souhaits.",
    summary:
      "Selon l’annonce officielle publiée sur Steam, AION 2 dispose désormais d’une page dédiée sur la plateforme. Les joueurs peuvent suivre le projet directement sur Steam et ajouter le jeu à leur wishlist pour être informés des prochaines étapes officielles.",
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
    title: "AION 2 détaille son échelle : un monde x36 et un vrai système de combat aérien",
    excerpt:
      "La page Steam officielle confirme une orientation forte : un monde 36 fois plus vaste que l’AION original, construit sous Unreal Engine 5, avec un combat aérien au cœur du gameplay.",
    summary:
      "D’après la page officielle AION 2 sur Steam, le jeu est développé avec Unreal Engine 5 et prend place dans un monde annoncé comme 36 fois plus grand que celui du premier AION. Le combat aérien n’est pas présenté comme une mécanique secondaire : il est décrit comme un pilier de conception du monde et des affrontements, avec des zones, des batailles et des conflits structurés autour de la verticalité.",
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

