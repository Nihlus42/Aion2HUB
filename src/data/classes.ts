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
    name: "Gladiator",
    slug: "gladiator",
    role: "DPS",
    faction: "Both",
    difficulty: 2,
    combatStyle: "Frontline bruiser with heavy weapon pressure and sustained melee control.",
    pveRating: 4,
    pvpRating: 3,
    description: "A durable melee damage dealer built around relentless pressure and close-range dominance.",
    strengths: ["High sustained melee damage", "Good frontline durability", "Simple and reliable rotation"],
    weaknesses: ["Limited ranged options", "Can be kited by mobile targets", "Depends on positioning uptime"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "templar",
    name: "Templar",
    slug: "templar",
    role: "Tank",
    faction: "Both",
    difficulty: 3,
    combatStyle: "Defensive anchor focused on mitigation, aggro control, and team protection.",
    pveRating: 5,
    pvpRating: 3,
    description: "A shield-bearing protector that controls threats and keeps allies alive under pressure.",
    strengths: ["Excellent survivability", "Strong defensive utility", "Reliable threat control in groups"],
    weaknesses: ["Lower personal damage", "Can feel slow in solo content", "Needs cooldown discipline"],
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
    combatStyle: "Stealth burst specialist using mobility and timing to eliminate priority targets.",
    pveRating: 3,
    pvpRating: 5,
    description: "A high-execution melee class that excels at ambushes, burst windows, and pick potential.",
    strengths: ["Very high burst potential", "Strong target access", "Excellent duel pressure"],
    weaknesses: ["Punished for mistakes", "Relatively fragile when exposed", "Requires strong timing"],
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
    combatStyle: "Ranged skirmisher with traps, kiting tools, and precision pressure.",
    pveRating: 4,
    pvpRating: 4,
    description: "A mobile ranged attacker that controls space and punishes enemies from distance.",
    strengths: ["Consistent ranged pressure", "Strong kiting and control options", "Good encounter flexibility"],
    weaknesses: ["Can struggle when cornered", "Positioning-heavy gameplay", "Damage drops if uptime is lost"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    slug: "sorcerer",
    role: "DPS",
    faction: "Both",
    difficulty: 3,
    combatStyle: "Arcane caster focused on burst combos, zone pressure, and elemental control.",
    pveRating: 4,
    pvpRating: 4,
    description: "A powerful ranged spellcaster with explosive damage and strong control potential.",
    strengths: ["High magical burst", "Excellent ranged threat", "Strong control windows"],
    weaknesses: ["Low defensive margin", "Can be punished by interruptions", "Needs spacing and setup"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "spiritmaster",
    name: "Spiritmaster / Elementalist",
    slug: "spiritmaster-elementalist",
    role: "DPS",
    faction: "Both",
    difficulty: 4,
    combatStyle: "Damage-over-time controller with summon support and disruption tools.",
    pveRating: 4,
    pvpRating: 5,
    description: "A tactical caster that wears enemies down through dots, control, and summon synergy.",
    strengths: ["Strong sustained pressure", "Great disruption potential", "Effective in extended fights"],
    weaknesses: ["Longer setup time", "Complex resource/tempo management", "Lower immediate burst than assassins"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
  {
    id: "cleric",
    name: "Cleric",
    slug: "cleric",
    role: "Healer",
    faction: "Both",
    difficulty: 2,
    combatStyle: "Primary healer with protective tools and stable sustain throughput.",
    pveRating: 5,
    pvpRating: 4,
    description: "A core support pillar that keeps allies alive while providing defensive stability.",
    strengths: ["Top-tier sustain", "Reliable emergency recovery", "Valuable team utility"],
    weaknesses: ["Often focus-targeted", "Lower offensive pressure", "Can be resource-sensitive in long fights"],
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
    combatStyle: "Hybrid support with buffs, utility, and opportunistic melee contribution.",
    pveRating: 4,
    pvpRating: 4,
    description: "A versatile support class that amplifies team output while retaining personal presence.",
    strengths: ["Strong group buffs", "Useful hybrid profile", "Good consistency across content"],
    weaknesses: ["Less specialized than pure healer/tank", "Impact depends on team coordination", "Can feel gear-reliant"],
    skills: [],
    sourceStatus: "placeholder",
    lastUpdated: "2026-05-10",
  },
];
