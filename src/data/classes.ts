export type SourceStatus = "confirmed" | "expected" | "placeholder";

export type ClassRole = "Tank" | "DPS" | "Healer" | "Support";
export type ClassFaction = "Elyos" | "Asmodian" | "Both";

export interface GameClass {
  id: string;
  name: string;
  slug: string;
  role: ClassRole;
  faction: ClassFaction;
  difficulty: 1 | 2 | 3 | 4 | 5;
  combatStyle: string;
  pveRating: 1 | 2 | 3 | 4 | 5;
  pvpRating: 1 | 2 | 3 | 4 | 5;
  description: string;
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  sourceStatus: SourceStatus;
  lastUpdated: string;
}

export const classes: GameClass[] = [
  {
    id: "gladiator",
    name: "Gladiateur",
    slug: "gladiator",
    role: "DPS",
    faction: "Both",
    difficulty: 2,
    combatStyle: "Briseur de première ligne avec forte pression d’arme et contrôle mêlée soutenu.",
    pveRating: 4,
    pvpRating: 3,
    description: "DPS mêlée robuste construit autour d’une pression constante et d’une domination au corps à corps.",
    strengths: ["Dégâts mêlée soutenus élevés", "Bonne robustesse en première ligne", "Rotation simple et fiable"],
    weaknesses: ["Options à distance limitées", "Peut être kite par des cibles mobiles", "Dépend du maintien de position"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "templar",
    name: "Templier",
    slug: "templar",
    role: "Tank",
    faction: "Both",
    difficulty: 3,
    combatStyle: "Ancre défensive axée sur la mitigation, le contrôle d’aggro et la protection d’équipe.",
    pveRating: 5,
    pvpRating: 3,
    description: "Protecteur au bouclier qui contrôle les menaces et garde ses alliés en vie sous pression.",
    strengths: ["Excellente survie", "Forte utilité défensive", "Contrôle de menace fiable en groupe"],
    weaknesses: ["Dégâts personnels plus faibles", "Peut sembler lent en solo", "Demande une bonne discipline des recharges"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "assassin",
    name: "Assassin",
    slug: "assassin",
    role: "DPS",
    faction: "Both",
    difficulty: 4,
    combatStyle: "Spécialiste du burst furtif utilisant mobilité et timing pour éliminer les cibles prioritaires.",
    pveRating: 3,
    pvpRating: 5,
    description: "Classe mêlée exigeante qui excelle en embuscades, fenêtres de burst et picks.",
    strengths: ["Très haut potentiel de burst", "Très bon accès aux cibles", "Excellente pression en duel"],
    weaknesses: ["Les erreurs se paient cher", "Assez fragile quand exposé", "Exige un excellent timing"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "ranger",
    name: "Ranger",
    slug: "ranger",
    role: "DPS",
    faction: "Both",
    difficulty: 3,
    combatStyle: "Escarmoucheur à distance avec pièges, outils de kite et pression de précision.",
    pveRating: 4,
    pvpRating: 4,
    description: "Attaquant à distance mobile qui contrôle l’espace et punit les ennemis de loin.",
    strengths: ["Pression à distance constante", "Excellentes options de kite et contrôle", "Bonne flexibilité selon les combats"],
    weaknesses: ["Peut souffrir lorsqu’il est acculé", "Gameplay très dépendant du placement", "Les dégâts chutent si l’uptime baisse"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "sorcerer",
    name: "Sorcier",
    slug: "sorcerer",
    role: "DPS",
    faction: "Both",
    difficulty: 3,
    combatStyle: "Lanceur de sorts arcanes axé sur les combos burst, la pression de zone et le contrôle élémentaire.",
    pveRating: 4,
    pvpRating: 4,
    description: "Puissant mage à distance avec dégâts explosifs et fort potentiel de contrôle.",
    strengths: ["Fort burst magique", "Excellente menace à distance", "Bonnes fenêtres de contrôle"],
    weaknesses: ["Faible marge défensive", "Peut être puni par les interruptions", "Nécessite distance et préparation"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "spiritmaster",
    name: "Spiritualiste / Élémentaliste",
    slug: "spiritmaster-elementalist",
    role: "DPS",
    faction: "Both",
    difficulty: 4,
    combatStyle: "Contrôleur à dégâts sur la durée avec invocations et outils de disruption.",
    pveRating: 4,
    pvpRating: 5,
    description: "Lanceur tactique qui use l’ennemi via DoT, contrôle et synergie d’invocations.",
    strengths: ["Forte pression soutenue", "Très bon potentiel de disruption", "Efficace dans les combats longs"],
    weaknesses: ["Temps de préparation plus long", "Gestion ressource/tempo complexe", "Burst instantané plus faible qu’un assassin"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "cleric",
    name: "Clerc",
    slug: "cleric",
    role: "Healer",
    faction: "Both",
    difficulty: 2,
    combatStyle: "Soigneur principal avec outils de protection et soin soutenu stable.",
    pveRating: 5,
    pvpRating: 4,
    description: "Pilier de support qui maintient les alliés en vie tout en apportant de la stabilité défensive.",
    strengths: ["Sustain de premier plan", "Récupération d’urgence fiable", "Utilité d’équipe précieuse"],
    weaknesses: ["Souvent focus par l’ennemi", "Pression offensive plus faible", "Peut être limité par ses ressources sur combats longs"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "chanter",
    name: "Chanter",
    slug: "chanter",
    role: "Support",
    faction: "Both",
    difficulty: 2,
    combatStyle: "Support hybride avec buffs, utilité et contribution mêlée opportuniste.",
    pveRating: 4,
    pvpRating: 4,
    description: "Classe support polyvalente qui amplifie l’équipe tout en gardant une présence personnelle.",
    strengths: ["Buffs de groupe solides", "Profil hybride utile", "Bonne régularité sur tout le contenu"],
    weaknesses: ["Moins spécialisé qu’un pur healer/tank", "Impact dépendant de la coordination", "Peut sembler dépendant de l’équipement"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
];
