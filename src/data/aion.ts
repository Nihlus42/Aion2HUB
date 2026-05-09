// Centralized data — easy to swap with Supabase queries later.
// Each entity matches a future table shape so the UI stays stable.

export type ClassRole = "Tank" | "DPS" | "Healer" | "Support";
export type ClassFaction = "Elyos" | "Asmodian" | "Both";

export interface GameClass {
  id: string;
  name: string;
  tagline: string;
  role: ClassRole;
  faction: ClassFaction;
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  signatureSkills: string[];
}

export const classes: GameClass[] = [
  { id: "gladiator", name: "Gladiator", tagline: "Master of polearms and brute force", role: "DPS", faction: "Both", difficulty: 2,
    description: "A frontline warrior wielding massive weapons, blending raw power with disciplined technique.",
    signatureSkills: ["Crippling Cut", "Aether's Hold", "Battlefield Roar"] },
  { id: "templar", name: "Templar", tagline: "Sword and shield protector", role: "Tank", faction: "Both", difficulty: 3,
    description: "An unbreakable wall of holy steel, dedicated to absorbing punishment for the party.",
    signatureSkills: ["Divine Shield", "Provoke", "Empyrean Wrath"] },
  { id: "assassin", name: "Assassin", tagline: "Shadow-bound dual blades", role: "DPS", faction: "Both", difficulty: 4,
    description: "Strike from the shadows, vanish before the corpse falls. High skill ceiling, devastating burst.",
    signatureSkills: ["Soul Slash", "Apply Poison", "Ambush"] },
  { id: "ranger", name: "Ranger", tagline: "Trapper and bow specialist", role: "DPS", faction: "Both", difficulty: 3,
    description: "Master archers who control the battlefield with traps, kiting, and precision fire.",
    signatureSkills: ["Soul Snare", "Stunning Shot", "Spike Trap"] },
  { id: "sorcerer", name: "Sorcerer", tagline: "Elemental annihilation", role: "DPS", faction: "Both", difficulty: 3,
    description: "Wielder of fire, frost and arcane storms — fragile but unmatched in magical destruction.",
    signatureSkills: ["Flame Cage", "Glacial Shard", "Robe of Cold"] },
  { id: "spiritmaster", name: "Spiritmaster", tagline: "Summoner of elemental spirits", role: "DPS", faction: "Both", difficulty: 4,
    description: "Bind elemental spirits to do your bidding. A master of damage-over-time and crowd control.",
    signatureSkills: ["Summon Spirit", "Erosion", "Soul-Bind"] },
  { id: "cleric", name: "Cleric", tagline: "Divine healer and protector", role: "Healer", faction: "Both", difficulty: 2,
    description: "The light of the party. Heals, buffs, and surprisingly capable of fighting on the front line.",
    signatureSkills: ["Healing Light", "Word of Life", "Divine Touch"] },
  { id: "chanter", name: "Chanter", tagline: "Mantras of war and salvation", role: "Support", faction: "Both", difficulty: 2,
    description: "Hybrid support that empowers allies with mantras while still landing solid hits with their staff.",
    signatureSkills: ["Word of Inspiration", "Blessing of Health", "Wind Cut"] },
];

export type GuideCategory = "beginner" | "leveling" | "pvp" | "pve";

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  readTime: number;
  author: string;
}

export const guides: Guide[] = [
  { id: "1", title: "Your First Hour in Atreia", excerpt: "Everything new Daevas should do in their first session — from controls to faction choice.", category: "beginner", readTime: 6, author: "Lumiel" },
  { id: "2", title: "Choosing Your Faction", excerpt: "Elyos vs Asmodian — gameplay differences, lore, and which fits your style.", category: "beginner", readTime: 4, author: "Lumiel" },
  { id: "3", title: "Optimal 1–55 Leveling Route", excerpt: "The fastest known leveling path, including campaign quests and grind spots.", category: "leveling", readTime: 12, author: "Kahrun" },
  { id: "4", title: "XP Boost Stacking Guide", excerpt: "Every active multiplier and how to time them for power-leveling weekends.", category: "leveling", readTime: 7, author: "Kahrun" },
  { id: "5", title: "Sieges 101: Forts & Artifacts", excerpt: "How sieges work, what artifacts do, and how to coordinate with your alliance.", category: "pvp", readTime: 9, author: "Veille" },
  { id: "6", title: "1v1 Class Matchup Tier List", excerpt: "Updated PvP matchup chart with notes on counterplay for every class.", category: "pvp", readTime: 11, author: "Veille" },
  { id: "7", title: "Endgame Dungeon Rotation", excerpt: "Weekly lockouts, loot priority, and group compositions for current tier raids.", category: "pve", readTime: 10, author: "Sariel" },
  { id: "8", title: "Crafting Mastery Path", excerpt: "Which profession to pick, where to power-level it, and which recipes pay off.", category: "pve", readTime: 8, author: "Sariel" },
];

export interface Skill {
  id: string;
  name: string;
  type: "Active" | "Passive" | "Stigma";
  cost: number;
  description: string;
}

export const skillsByClass: Record<string, Skill[]> = {
  gladiator: [
    { id: "g1", name: "Crippling Cut", type: "Active", cost: 50, description: "A heavy slash that reduces target's movement speed." },
    { id: "g2", name: "Aether's Hold", type: "Active", cost: 80, description: "Suspends target in mid-air, opening a combo window." },
    { id: "g3", name: "Battle Stance", type: "Passive", cost: 0, description: "Increases physical attack by 8%." },
    { id: "g4", name: "Severe Weakening", type: "Stigma", cost: 120, description: "Reduces target's damage dealt for 12s." },
    { id: "g5", name: "Lockdown", type: "Active", cost: 60, description: "Stuns target briefly on critical hit." },
    { id: "g6", name: "Tempest Spear", type: "Stigma", cost: 100, description: "AoE polearm strike that hits up to 5 enemies." },
  ],
  templar: [
    { id: "t1", name: "Divine Shield", type: "Active", cost: 70, description: "Immune to damage for 4 seconds." },
    { id: "t2", name: "Provoke", type: "Active", cost: 30, description: "Forces target to attack you." },
    { id: "t3", name: "Iron Skin", type: "Passive", cost: 0, description: "Permanent +12% physical defense." },
    { id: "t4", name: "Empyrean Wrath", type: "Stigma", cost: 150, description: "Powerful holy strike with knockdown." },
  ],
};

export interface Guild {
  id: string;
  name: string;
  faction: ClassFaction;
  focus: "PvP" | "PvE" | "Casual" | "Hardcore";
  members: number;
  language: string;
  region: string;
  recruiting: boolean;
  motto: string;
}

export const guilds: Guild[] = [
  { id: "1", name: "Crimson Ascendants", faction: "Elyos", focus: "PvP", members: 86, language: "EN", region: "NA-East", recruiting: true, motto: "From dawn we rise, by dusk we conquer." },
  { id: "2", name: "Veil of Beritra", faction: "Asmodian", focus: "Hardcore", members: 120, language: "EN", region: "EU", recruiting: true, motto: "World-first or nothing." },
  { id: "3", name: "Lumen Wardens", faction: "Elyos", focus: "PvE", members: 64, language: "EN", region: "NA-West", recruiting: true, motto: "Every dungeon. Every week." },
  { id: "4", name: "Ashen Court", faction: "Asmodian", focus: "Casual", members: 41, language: "EN", region: "EU", recruiting: true, motto: "Adults with jobs, still down to siege." },
  { id: "5", name: "Sanctum Reborn", faction: "Elyos", focus: "PvP", members: 92, language: "FR", region: "EU", recruiting: false, motto: "L'aube éternelle." },
  { id: "6", name: "Pandemonium Pact", faction: "Asmodian", focus: "PvE", members: 58, language: "EN", region: "NA-East", recruiting: true, motto: "Loot first, ask questions later." },
];
