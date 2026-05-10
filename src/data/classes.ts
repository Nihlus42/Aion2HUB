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
  {
    id: "gladiator",
    name: "Gladiator",
    tagline: "Master of polearms and brute force",
    role: "DPS",
    faction: "Both",
    difficulty: 2,
    description:
      "A frontline warrior wielding massive weapons, blending raw power with disciplined technique.",
    signatureSkills: ["Crippling Cut", "Aether's Hold", "Battlefield Roar"],
  },
  {
    id: "templar",
    name: "Templar",
    tagline: "Sword and shield protector",
    role: "Tank",
    faction: "Both",
    difficulty: 3,
    description:
      "An unbreakable wall of holy steel, dedicated to absorbing punishment for the party.",
    signatureSkills: ["Divine Shield", "Provoke", "Empyrean Wrath"],
  },
  {
    id: "assassin",
    name: "Assassin",
    tagline: "Shadow-bound dual blades",
    role: "DPS",
    faction: "Both",
    difficulty: 4,
    description:
      "Strike from the shadows, vanish before the corpse falls. High skill ceiling, devastating burst.",
    signatureSkills: ["Soul Slash", "Apply Poison", "Ambush"],
  },
  {
    id: "ranger",
    name: "Ranger",
    tagline: "Trapper and bow specialist",
    role: "DPS",
    faction: "Both",
    difficulty: 3,
    description:
      "Master archers who control the battlefield with traps, kiting, and precision fire.",
    signatureSkills: ["Soul Snare", "Stunning Shot", "Spike Trap"],
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    tagline: "Elemental annihilation",
    role: "DPS",
    faction: "Both",
    difficulty: 3,
    description:
      "Wielder of fire, frost and arcane storms - fragile but unmatched in magical destruction.",
    signatureSkills: ["Flame Cage", "Glacial Shard", "Robe of Cold"],
  },
  {
    id: "spiritmaster",
    name: "Spiritmaster",
    tagline: "Summoner of elemental spirits",
    role: "DPS",
    faction: "Both",
    difficulty: 4,
    description:
      "Bind elemental spirits to do your bidding. A master of damage-over-time and crowd control.",
    signatureSkills: ["Summon Spirit", "Erosion", "Soul-Bind"],
  },
  {
    id: "cleric",
    name: "Cleric",
    tagline: "Divine healer and protector",
    role: "Healer",
    faction: "Both",
    difficulty: 2,
    description:
      "The light of the party. Heals, buffs, and surprisingly capable of fighting on the front line.",
    signatureSkills: ["Healing Light", "Word of Life", "Divine Touch"],
  },
  {
    id: "chanter",
    name: "Chanter",
    tagline: "Mantras of war and salvation",
    role: "Support",
    faction: "Both",
    difficulty: 2,
    description:
      "Hybrid support that empowers allies with mantras while still landing solid hits with their staff.",
    signatureSkills: ["Word of Inspiration", "Blessing of Health", "Wind Cut"],
  },
];

