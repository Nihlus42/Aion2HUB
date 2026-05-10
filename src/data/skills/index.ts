export * from "./types";
export * from "@/data/aion2/skills/types";
export * from "@/data/aion2/skills/index";
export * from "@/data/aion2/skills/skillAdapter";

import allSkillsDataset from "./json/aion2hub_skills_all_prod_fr_fixed.json";
import type { Skill } from "./types";

type SkillsDataset = {
  dataset: string;
  source: {
    sourceName: string;
    sourceUrl: string;
    sourceStatus: string;
  };
  records: Skill[];
};

const dataset = allSkillsDataset as SkillsDataset;

export const skills: Skill[] = Array.isArray(dataset.records) ? dataset.records : [];

export const normalizeSkillClassSlug = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "spiritmaster-elementalist" || normalized === "elementalist") return "spiritmaster";
  if (normalized === "unknown") return "unknown";
  return normalized;
};

export const getLegacySkillsByClass = (classSlug: string) =>
  skills.filter((skill) => normalizeSkillClassSlug(skill.classSlug) === normalizeSkillClassSlug(classSlug));

export const getLegacySkillBySlug = (slug: string) => skills.find((skill) => skill.slug === slug);

export const cleanSkillText = (value: string) => value.replace(/\{se_dmg:[^}]+\}/g, "").replace(/\s+/g, " ").trim();

const fixMojibake = (value: string) => {
  if (!/[Ãâ€\uFFFD]/.test(value)) return value;
  try {
    const bytes = Uint8Array.from(Array.from(value).map((ch) => ch.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder("utf-8").decode(bytes);
    return decoded.replace(/\uFFFD/g, "e");
  } catch {
    return value.replace(/\uFFFD/g, "e");
  }
};

export const toFrenchUiText = (value: string) => cleanSkillText(fixMojibake(value));

export const getSkillDisplayName = (skill: Skill, locale: "fr" | "en" = "fr") =>
  locale === "fr" ? toFrenchUiText(skill.nameFr || skill.name) : skill.name;

export const getSkillDisplayDescription = (skill: Skill, locale: "fr" | "en" = "fr") =>
  locale === "fr" ? toFrenchUiText(skill.descriptionFr || skill.description) : skill.description;

export const getSkillDisplayPveUse = (skill: Skill, locale: "fr" | "en" = "fr") =>
  locale === "fr" ? toFrenchUiText(skill.pveUseFr || skill.pveUse) : skill.pveUse;

export const getSkillDisplayPvpUse = (skill: Skill, locale: "fr" | "en" = "fr") =>
  locale === "fr" ? toFrenchUiText(skill.pvpUseFr || skill.pvpUse) : skill.pvpUse;

export const getSkillDisplayCooldown = (skill: Skill, locale: "fr" | "en" = "fr") =>
  locale === "fr" ? toFrenchUiText(skill.estimatedCooldown) : skill.estimatedCooldown;

export const getSkillCategoryLabel = (skill: Skill) => toFrenchUiText(skill.categoryFr || skill.category || "Inconnu");
export const getSkillTargetTypeLabel = (skill: Skill) => toFrenchUiText(skill.targetTypeFr || skill.targetType || "Inconnu");
export const getSkillDamageTypeLabel = (skill: Skill) => toFrenchUiText(skill.damageTypeFr || skill.damageType || "Inconnu");
export const getSkillRangeLabel = (skill: Skill) => toFrenchUiText(skill.rangeFr || skill.range || "Inconnu");

export const toLiteralFrench = (value: string) => value;
export const toLiteralFrenchStrict = (value: string) => value;
