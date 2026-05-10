// Auto-generated from skills.cleaned.fr.ts
export type SkillSourceStatus = "official" | "community" | "unofficial" | "estimated" | "community-database";

export type SkillCategory =
  | "Basic Attack"
  | "Combo"
  | "AoE"
  | "Burst"
  | "Mobility"
  | "Crowd Control"
  | "Defensive"
  | "Utility"
  | "Unknown"
  | string;

export type Skill = {
  id: string;
  name: string;
  nameFr: string;
  slug: string;
  classSlug: string;
  classNameFr: string;
  rarity: string;
  rarityFr: string;
  description: string;
  descriptionFr: string;
  category: SkillCategory;
  categoryFr: string;
  damageType: "Physical" | "Magical" | "Hybrid" | "Unknown" | string;
  damageTypeFr: string;
  range: "Melee" | "Ranged" | "Mid-range" | "Unknown" | string;
  rangeFr: string;
  targetType: "Single Target" | "AoE" | "Cone" | "Line" | "Self" | "Unknown" | string;
  targetTypeFr: string;
  pveUse: string;
  pveUseFr: string;
  pvpUse: string;
  pvpUseFr: string;
  strengths: string[];
  weaknesses: string[];
  estimatedCooldown: string;
  sourceUrl: string;
  sourceName: "Questlog.gg";
  sourceStatus: SkillSourceStatus;
  sourceStatusFr: string;
  sourceType: "gameplay-analysis" | "community-wiki" | "official-source" | "datamining";
  confidence: "low" | "medium" | "high";
  lastUpdated: string;
};
