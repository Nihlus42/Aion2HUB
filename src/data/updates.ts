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
    id: "aion2-launch-scale-test-2026-08-26",
    title: "AION 2 annonce son stress test global du 17 au 18 septembre",
    excerpt:
      "NCSoft ouvre un Launch Scale Test public sur Steam et PURPLE avant l’Early Access. Pré-téléchargement le 16 septembre, deux sessions de 6 heures, progression conservée entre les deux jours puis effacée à la fin du test.",
    summary:
      "Cette fois, on a enfin du concret pour la phase de chauffe avant l’ouverture de l’Early Access. NCSoft a confirmé un Launch Scale Test public sur AION 2 du 17 au 18 septembre 2026, avec accès via Steam et PURPLE. Pas de clé, pas d’invitation, pas de loterie obscure pour faire semblant de filtrer : tout le monde peut se connecter pendant la fenêtre prévue.\n\nLe calendrier officiel est découpé en trois temps. Le pré-téléchargement sera disponible du 16 septembre à 15 h CEST au 17 septembre à 15 h CEST. La première session du test aura lieu le 17 septembre de 15 h à 21 h CEST, puis la seconde le 18 septembre de 21 h CEST au 19 septembre à 3 h CEST. Au total, cela fait 12 heures de test avec une progression conservée entre le jour 1 et le jour 2. En revanche, NCSoft précise clairement que tout sera supprimé à la fin du test et que rien ne sera transféré vers l’Early Access ou le lancement.\n\nLe cadre du test est aussi très verrouillé, et c’est logique. Aucun achat ne sera disponible, le shop et les paiements seront coupés, le marketplace, l’échange Quna et le trade entre joueurs seront désactivés, les objets des packs fondateur ne seront pas actifs, le dressing sera bloqué et le niveau maximal sera limité à 37. En clair, ce stress test sert surtout à mesurer la charge, la stabilité et les flux d’accès, pas à laisser les joueurs vider la moitié du contenu avant l’heure.\n\nDernier détail utile pour éviter les pleurs le 30 septembre : NCSoft indique que les joueurs Steam devront désinstaller l’application Playtest puis télécharger la vraie version d’AION 2 pour l’Advanced Access, alors que les joueurs PURPLE n’auront pas d’étape supplémentaire à gérer.",
    watchlist: [
      "Qualité des serveurs pendant les deux fenêtres de test",
      "Stabilité du client Steam et PURPLE au lancement",
      "Précisions sur les horaires d’ouverture de l’Advanced Access",
      "Éventuelles restrictions supplémentaires non listées dans l’annonce",
      "Communication officielle après le test sur les performances et correctifs",
    ],
    tags: ["Global", "Confirmé", "Stress Test", "Steam", "PURPLE"],
    category: "Events",
    region: "Global",
    publishDate: "2026-08-26",
    coverImage:
      "https://fizz-download.playnccdn.com/download/v2/buckets/marketing-platform/files/19daa0916cf-44ee37e4-32f3-43fd-96f5-209f0afce2ad",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-08-26",
    sourceUrl:
      "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a8ded386b722c561dc6a1a0",
    sourceUrls: [
      {
        label: "Annonce officielle NCSoft",
        url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a8ded386b722c561dc6a1a0",
      },
      {
        label: "Page Steam du playtest",
        url: "https://store.steampowered.com/app/4972320",
      },
    ],
  },
  {
    id: "aion2-special-quai-membership-2026-08-19",
    title: "AION 2 détaille son abonnement Special Quai Membership à 15 $ par mois",
    excerpt:
      "NCSoft présente officiellement le Special Quai Membership, un abonnement mensuel à 15 $ qui débloque notamment le marché, l’échange Kina ↔ Quna, le trade personnel et plusieurs conforts de progression sur serveur.",
    summary:
      "NCSoft a publié les détails complets du Special Quai Membership, un abonnement mensuel vendu 15 $ et activable à partir du 5 octobre 2026. Dit autrement : le modèle économique d’AION 2 continue de se préciser, et cette fois on sort des grandes lignes un peu floues pour entrer dans les bonus concrets.\n\nSur le papier, l’abonnement accorde 30 jours d’avantages sur le serveur concerné. Parmi les éléments confirmés, on retrouve l’accès au Remote Storage, au personal trading, au marché, à l’échange Kina ↔ Quna, à la boutique Wind Breeze Merchants, ainsi qu’une augmentation de la capacité maximale d’Odyle Energy et une sélection supplémentaire de cubes d’énergie dans certaines activités comme Expedition, Transcendence et Sanctuary. Le point qui va faire parler, sans trop de suspense, c’est évidemment l’ouverture de fonctions économiques majeures derrière cet abonnement.\n\nNCSoft précise aussi plusieurs limites pratiques. Le membership peut être acheté quand il reste moins de 60 jours de bénéfices, jusqu’à trois achats par mois et par serveur. Les effets s’appliquent à tous les personnages du serveur concerné, mais pas aux autres serveurs. Le trade personnel reste en plus limité à cinq échanges par jour, et l’autre joueur doit lui aussi disposer d’un Special Quai Membership actif.\n\nCe que l’annonce change surtout, c’est le niveau de clarté autour de l’économie globale. On sait maintenant que le marché, l’échange Quna et une partie du confort de progression seront liés à une formule mensuelle distincte. Reste à voir comment la communauté recevra ce verrouillage au moment où le jeu approchera de son ouverture réelle, parce que ce genre de détail ne passe jamais exactement dans le calme et la tendresse.",
    watchlist: [
      "Montant exact du bonus de capacité d’Odyle Energy",
      "Réaction de la communauté au verrouillage du marché et de l’échange",
      "Équilibre entre abonnement, boutique et progression normale",
      "Éventuelles variantes régionales de prix hors USD",
      "Précisions futures sur les marchands Wind Breeze et Tsenka",
    ],
    tags: ["Global", "Confirmé", "Abonnement", "Économie", "Quna"],
    category: "News",
    region: "Global",
    publishDate: "2026-08-19",
    coverImage:
      "https://fizz-download.playnccdn.com/download/v2/buckets/marketing-platform/files/19daa0916cf-44ee37e4-32f3-43fd-96f5-209f0afce2ad",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-08-19",
    sourceUrl:
      "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a850010fa34c1011d6273b2",
    sourceUrls: [
      {
        label: "Annonce officielle NCSoft",
        url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a850010fa34c1011d6273b2",
      },
    ],
  },
  {
    id: "aion2-early-access-date-2026-07-22",
    title: "AION 2 fixe son Early Access au 30 septembre 2026",
    excerpt:
      "NCSoft détaille l’Early Access d’AION 2 et ses packs fondateur. La date du 30 septembre 2026 est désormais accompagnée de trois offres, de 24,99 $ à 99,99 $, avec accès anticipé, cosmétiques et bonus selon le palier.",
    summary:
      "NCSoft a publié une annonce officielle dédiée aux nouveaux produits d’AION 2, avec un point important pour les joueurs globaux : l’ouverture de l’Early Access reste calée au 30 septembre 2026 et s’accompagne maintenant de packs fondateur détaillés noir sur blanc. On n’est donc plus seulement sur une date affichée sur Steam, mais sur une communication commerciale complète qui donne plus de poids au calendrier annoncé.\n\nTrois packs sont proposés sur Steam et sur PURPLE. Le Standard Founder's Pack est affiché à 24,99 $ et comprend 5 jours d’Early Access, un Daeva's Campaign Supply Chest et le titre Vanguard of Atreia. Le Deluxe Founder's Pack monte à 49,99 $ et ajoute, en plus de la base, le skin set Ascended Daeva et le coffre d’apparence d’arme Eternal Sun. Enfin, l’Ultimate Founder's Pack est affiché à 99,99 $ avec tout le contenu précédent, plus un Daeva's Styling Chest, le skin set Moonlit Aria, le pet Black Dragon et les Blazing Sun Wings.\n\nL’annonce précise aussi plusieurs points pratiques utiles. Les prix sont listés en USD, avec variation possible dans les autres devises selon le taux de change. Les ventes ont commencé le 22 juillet 2026 à 6 h PDT et dureront jusqu’à la fin de la période d’Early Access. Autre point à ne pas louper : un seul pack fondateur peut être acheté par compte, en choisissant un seul des trois paliers, et le jeu doit être lancé sur la plateforme d’achat. En clair, un achat Steam reste lié à Steam, un achat PURPLE reste lié à PURPLE, même si tous les joueurs partagent les mêmes serveurs.\n\nÀ ce stade, il faut garder une formulation propre : le 30 septembre 2026 correspond bien à l’ouverture de l’Early Access, pas forcément au lancement final complet. Mais avec une date affichée, des packs listés et des prix publics, le dossier devient nettement plus concret qu’avant.",
    watchlist: [
      "Heure exacte d’ouverture de l’Early Access",
      "Détails complets du Daeva's Campaign Supply Chest",
      "Éventuels bonus supplémentaires selon la plateforme",
      "Infos sur les serveurs globaux et leur disponibilité",
      "Clarification entre Early Access et lancement complet",
    ],
    tags: ["Global", "Confirmé", "Steam", "Early Access"],
    category: "News",
    region: "Global",
    publishDate: "2026-07-22",
    coverImage:
      "https://fizz-download.playnccdn.com/lg/file/aion/download/19f88062596-032f89c9-42d5-4e2c-8292-e0244f29013e",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-07-22",
    sourceUrl:
      "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f",
    sourceUrls: [
      {
        label: "Annonce officielle NCSoft",
        url: "https://aion2.plaync.com/en-us/board/notice/view?articleId=6a5fef1a2c2d9c52e6c79e6f",
      },
      {
        label: "Page Steam officielle",
        url: "https://store.steampowered.com/app/3393110/AION_2/",
      },
    ],
  },
  {
    id: "aion2-economic-model-approach-2026-07-08",
    title:
      "AION 2 détaille son modèle économique : free-to-play, abonnement, pass et marché en jeu",
    excerpt:
      "NCSoft publie une annonce officielle dédiée au modèle économique d’AION 2. Le studio confirme une structure free-to-play avec monnaies en jeu, abonnement mensuel, boutique, pass de combat et packs de fondateur.",
    summary:
      "Dans une annonce officielle publiée le 8 juillet 2026, l’équipe AION 2 présente les grandes lignes du modèle économique du jeu. Le cadre affiché est clair : AION 2 sera proposé en free-to-play, avec deux monnaies mises en avant — le Kina et le Quna — ainsi qu’un marché en jeu et un système d’échange entre ces deux devises.\n\nLe visuel officiel mentionne aussi plusieurs briques de monétisation : un abonnement à 15 $ par mois, une boutique en jeu avec objets cosmétiques et consommables, un pass de combat décliné en version standard et voie Premium, ainsi que des packs de fondateur. Côté cosmétiques, NC cite notamment le teint, l’allure, l’apparence d’arme et les montures.\n\nÀ ce stade, l’annonce pose surtout l’architecture générale du modèle économique. En revanche, elle ne détaille pas encore dans le même niveau de précision les limites exactes, l’équilibrage, ni la manière dont chaque système influencera la progression ou l’économie long terme. Bref : la structure est officielle, les implications fines restent à surveiller de près — parce que oui, le diable adore se planquer dans les petites lignes.",
    watchlist: [
      "Détails précis sur le rôle du Quna et son acquisition",
      "Fonctionnement exact du marché et de l’échange Kina ↔ Quna",
      "Contenu concret de l’abonnement mensuel",
      "Récompenses du pass standard et de la voie Premium",
      "Composition et prix des packs de fondateur",
    ],
    tags: ["Global", "Confirmé", "Modèle économique", "Free-to-play"],
    category: "News",
    region: "Global",
    publishDate: "2026-07-08",
    coverImage:
      "https://fizz-download.playnccdn.com/download/v2/buckets/marketing-platform/files/19daa0916cf-44ee37e4-32f3-43fd-96f5-209f0afce2ad",
    isOfficialSource: true,
    sourceStatus: "confirmed",
    lastUpdated: "2026-07-08",
    sourceUrl:
      "https://aion2.plaync.com/fr-fr/board/notice/view?articleId=6a4d80fc84389f5bef890cfb",
  },
  {
    id: "aion2-september-2026-release-window-2026-06-05",
    title: "AION 2 annonce sa fenêtre de sortie : lancement prévu en septembre 2026",
    excerpt:
      "La page Steam officielle d’AION 2 affiche désormais une fenêtre de sortie en septembre 2026. Le Summer Game Fest n’a donc pas servi qu’à teaser : on a enfin une période de lancement concrète.",
    summary:
      "La page Steam officielle d’AION 2 indique désormais une date de parution fixée à septembre 2026. C’est la mise à jour concrète la plus importante issue de la communication autour du Summer Game Fest : on passe d’un simple trailer attendu à une vraie fenêtre de lancement publique.\n\nLa fiche confirme aussi plusieurs points déjà mis en avant par NC : AION 2 est présenté comme un MMORPG pensé pour le PC, développé sous Unreal Engine 5, avec un monde annoncé comme 36 fois plus vaste que celui du premier AION et un conflit de factions au cœur de l’expérience.\n\nÀ ce stade, il faut rester carré : septembre 2026 correspond à une fenêtre de sortie, pas à un jour exact confirmé. Tant qu’une date précise n’apparaît pas sur les canaux officiels, inutile d’inventer un calendrier magique.",
    watchlist: [
      "Date de sortie exacte",
      "Ouverture des préinscriptions ou bonus de lancement",
      "Détails sur les serveurs globaux",
      "Nouvelles infos sur les classes, le PvP et le contenu endgame",
      "Précisions sur le modèle économique",
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
      },
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
