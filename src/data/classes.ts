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
    combatStyle: "Briseur de premiere ligne avec forte pression d arme et controle melee soutenu.",
    pveRating: 4,
    pvpRating: 3,
    description: "DPS melee robuste construit autour d une pression constante et d une domination au corps a corps.",
    strengths: ["Degats melee soutenus eleves", "Bonne robustesse en premiere ligne", "Rotation simple et fiable"],
    weaknesses: ["Options a distance limitees", "Peut etre kite par des cibles mobiles", "Depend du maintien de position"],
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
    combatStyle: "Ancre defensive axee sur la mitigation, le controle d aggro et la protection d equipe.",
    pveRating: 5,
    pvpRating: 3,
    description: "Protecteur au bouclier qui controle les menaces et garde ses allies en vie sous pression.",
    strengths: ["Excellente survie", "Forte utilite defensive", "Controle de menace fiable en groupe"],
    weaknesses: ["Degats personnels plus faibles", "Peut sembler lent en solo", "Demande une bonne discipline des recharges"],
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
    combatStyle: "Specialiste du burst furtif utilisant mobilite et timing pour eliminer les cibles prioritaires.",
    pveRating: 3,
    pvpRating: 5,
    description: "Classe melee exigeante qui excelle en embuscades, fenetres de burst et picks.",
    strengths: ["Tres haut potentiel de burst", "Tres bon acces aux cibles", "Excellente pression en duel"],
    weaknesses: ["Les erreurs se paient cher", "Assez fragile quand expose", "Exige un excellent timing"],
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
    combatStyle: "Escarmoucheur distance avec pieges, outils de kite et pression de precision.",
    pveRating: 4,
    pvpRating: 4,
    description: "Attaquant a distance mobile qui controle l espace et punit les ennemis de loin.",
    strengths: ["Pression distance constante", "Excellentes options de kite et controle", "Bonne flexibilite selon les combats"],
    weaknesses: ["Peut souffrir lorsqu il est accule", "Gameplay tres dependant du placement", "Les degats chutent si l uptime baisse"],
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
    combatStyle: "Lanceur de sorts arcanes axe sur les combos burst, la pression de zone et le controle elementaire.",
    pveRating: 4,
    pvpRating: 4,
    description: "Puissant mage distance avec degats explosifs et fort potentiel de controle.",
    strengths: ["Fort burst magique", "Excellente menace a distance", "Bonnes fenetres de controle"],
    weaknesses: ["Faible marge defensive", "Peut etre puni par les interruptions", "Necessite distance et preparation"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "spiritmaster",
    name: "Spiritualiste / Elementaliste",
    slug: "spiritmaster-elementalist",
    role: "DPS",
    faction: "Both",
    difficulty: 4,
    combatStyle: "Controleur a degats sur la duree avec invocations et outils de disruption.",
    pveRating: 4,
    pvpRating: 5,
    description: "Lanceur tactique qui use l ennemi via DoT, controle et synergie d invocations.",
    strengths: ["Forte pression soutenue", "Tres bon potentiel de disruption", "Efficace dans les combats longs"],
    weaknesses: ["Temps de preparation plus long", "Gestion ressource/tempo complexe", "Burst instantane plus faible qu un assassin"],
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
    description: "Pilier de support qui maintient les allies en vie tout en apportant de la stabilite defensive.",
    strengths: ["Sustain de premier plan", "Recuperation d urgence fiable", "Utilite d equipe precieuse"],
    weaknesses: ["Souvent focus par l ennemi", "Pression offensive plus faible", "Peut etre limite par ses ressources sur combats longs"],
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
    combatStyle: "Support hybride avec buffs, utilite et contribution melee opportuniste.",
    pveRating: 4,
    pvpRating: 4,
    description: "Classe support polyvalente qui amplifie l equipe tout en gardant une presence personnelle.",
    strengths: ["Buffs de groupe solides", "Profil hybride utile", "Bonne regularite sur tout le contenu"],
    weaknesses: ["Moins specialise qu un pur healer/tank", "Impact dependant de la coordination", "Peut sembler dependant de l equipement"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
];
