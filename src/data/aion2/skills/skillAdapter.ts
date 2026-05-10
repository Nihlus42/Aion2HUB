import questlogAllJson from "@/data/skills/json/aion2hub_skills_all_prod_fr_fixed.json";
import { talentbuildsSkillsAll, talentbuildsSkillsByClass, talentbuildsSkillsById } from "./index";
import type { NormalizedSkill, TalentbuildsSkill } from "./types";

type QuestlogSkill = {
  id: string;
  slug?: string;
  classSlug?: string;
  classNameFr?: string;
  name?: string;
  nameEn?: string;
  nameFr?: string;
  categoryFr?: string;
  descriptionFr?: string;
  description?: string;
  estimatedCooldown?: string;
  sourceUrl?: string;
};

const classFrMap: Record<string, string> = {
  assassin: "Assassin",
  chanter: "Aede",
  cleric: "Clerc",
  gladiator: "Gladiateur",
  ranger: "Rodeur",
  sorcerer: "Sorcier",
  elementalist: "Spiritualiste",
  spiritmaster: "Spiritualiste",
  templar: "Templier",
  tutorial: "Tutoriel",
  unknown: "Inconnu",
};

const classSlugAliases: Record<string, string> = {
  "spiritmaster-elementalist": "spiritmaster",
  elementalist: "spiritmaster",
};

const clean = (value: unknown) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
const normalizeName = (value: unknown) => clean(value).toLowerCase();

const notUnknown = (value: string) => {
  const v = value.toLowerCase();
  return v !== "" && v !== "unknown" && v !== "inconnu" && v !== "null" && v !== "undefined";
};

export const normalizeClassSlug = (value: unknown) => {
  const raw = clean(value).toLowerCase();
  if (!raw) return "unknown";
  return classSlugAliases[raw] ?? raw;
};

export const normalizeClassName = (value: unknown, classSlug?: string) => {
  const slug = normalizeClassSlug(classSlug || value);
  return classFrMap[slug] ?? (clean(value) || "Inconnu");
};

export const normalizeSkillType = (value: unknown) => {
  const raw = clean(value).toLowerCase();
  if (!notUnknown(raw)) return "";
  if (raw === "active" || raw === "actif") return "Actif";
  if (raw === "passive" || raw === "passif") return "Passif";
  return clean(value);
};

export const normalizeTags = (tags: unknown): string[] => {
  if (!tags) return [];
  if (typeof tags === "string") {
    const text = clean(tags);
    return notUnknown(text) ? [text] : [];
  }
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => clean(tag))
      .filter((tag) => notUnknown(tag))
      .map((tag) => (tag.toLowerCase() === "nontarget" ? "Sans cible" : tag));
  }
  return [];
};

export const normalizeSpecialty = (specialty: unknown): string[] => {
  if (!specialty) return [];
  if (Array.isArray(specialty)) {
    return specialty.map((line) => clean(line)).filter((line) => notUnknown(line));
  }
  if (typeof specialty === "string") {
    return specialty
      .split(/\r?\n/)
      .map((line) => clean(line))
      .filter((line) => notUnknown(line));
  }
  return [];
};

export const normalizeSkill = (skill: TalentbuildsSkill | QuestlogSkill, source: "questlog" | "talentbuilds"): NormalizedSkill => {
  const id = clean((skill as any).id) || clean((skill as any).slug) || `${source}-${Math.random().toString(36).slice(2, 10)}`;
  const classSlug = normalizeClassSlug((skill as any).classSlug);
  const descriptionFr = clean((skill as any).descriptionFr);
  const sourceBoardRefs = Array.isArray((skill as any).boardReferences) ? (skill as any).boardReferences : [];
  const boardReferences = sourceBoardRefs.map((item: any) => ({
    boardId: Number(item.boardId ?? 0),
    boardTitle: clean(item.boardTitle),
    boardTitleFr: clean(item.boardTitleFr) || clean(item.boardTitle),
    nodeId: clean(item.nodeId),
    requiredLevel: Number(item.requiredLevel ?? 0),
    costPoints: Number(item.costPoints ?? 0),
  }));

  return {
    id,
    slug: clean((skill as any).slug) || id.toLowerCase(),
    nameFr: clean((skill as any).nameFr) || "Competence inconnue",
    nameEn: clean((skill as any).nameEn) || undefined,
    classFr: normalizeClassName((skill as any).classFr || (skill as any).classEn || classSlug, classSlug),
    classEn: clean((skill as any).classEn) || undefined,
    classSlug,
    typeFr: normalizeSkillType((skill as any).typeFr || (skill as any).typeEn) || "Inconnu",
    typeEn: clean((skill as any).typeEn) || undefined,
    descriptionFr: notUnknown(descriptionFr) ? descriptionFr : undefined,
    specialtyFr: normalizeSpecialty((skill as any).specialtyFr),
    tagsFr: normalizeTags((skill as any).tagsFr),
    imageUrl: clean((skill as any).imageUrl) || undefined,
    image: clean((skill as any).image) || undefined,
    unlocked: typeof (skill as any).unlocked === "number" ? (skill as any).unlocked : undefined,
    boardReferences,
    source,
  };
};

const talentRecords = (Array.isArray(talentbuildsSkillsAll.records) ? talentbuildsSkillsAll.records : []) as TalentbuildsSkill[];
const questRecords = ((questlogAllJson as any).records ?? []) as QuestlogSkill[];
const questNormalized = questRecords.map((skill) => normalizeSkill(skill, "questlog"));

const questByNameEn = new Map<string, QuestlogSkill[]>();
for (const rec of questRecords) {
  const key = normalizeName(rec.nameEn || rec.name);
  if (!key) continue;
  if (!questByNameEn.has(key)) questByNameEn.set(key, []);
  questByNameEn.get(key)!.push(rec);
}

const hasPlaceholder = (value: string) => /\bX\b|\{se_[^}]+\}/i.test(value);

const pickQuestPreviewDescription = (nameEn?: string) => {
  const key = normalizeName(nameEn);
  if (!key) return null;
  const candidates = questByNameEn.get(key) ?? [];
  if (candidates.length === 0) return null;
  let best = "";
  let bestScore = -1;
  for (const candidate of candidates) {
    const text = clean(candidate.descriptionFr || candidate.description);
    if (!notUnknown(text)) continue;
    const score = (text.match(/\d/g) || []).length;
    if (score > bestScore) {
      bestScore = score;
      best = text;
    }
  }
  return best || null;
};

const talentNormalized = talentRecords.map((skill) => {
  const normalized = normalizeSkill(skill, "talentbuilds");
  const currentDescription = clean(normalized.descriptionFr);
  if (!notUnknown(currentDescription) || hasPlaceholder(currentDescription)) {
    const previewDescription = pickQuestPreviewDescription(skill.nameEn);
    if (previewDescription) {
      return { ...normalized, descriptionFr: previewDescription };
    }
  }
  return normalized;
});
const talentByIdMap = Object.fromEntries(
  Object.entries(talentbuildsSkillsById).map(([id, skill]) => {
    const raw = skill as TalentbuildsSkill;
    const normalized = normalizeSkill(raw, "talentbuilds");
    const currentDescription = clean(normalized.descriptionFr);
    if (!notUnknown(currentDescription) || hasPlaceholder(currentDescription)) {
      const previewDescription = pickQuestPreviewDescription(raw.nameEn);
      if (previewDescription) {
        return [id, { ...normalized, descriptionFr: previewDescription }];
      }
    }
    return [id, normalized];
  }),
) as Record<string, NormalizedSkill>;

const mergedMap = new Map<string, NormalizedSkill>();
for (const skill of talentNormalized) mergedMap.set(skill.id, skill);
for (const skill of questNormalized) {
  if (!mergedMap.has(skill.id)) mergedMap.set(skill.id, skill);
}

export const normalizedSkills: NormalizedSkill[] = Array.from(mergedMap.values());

export const getNormalizedSkills = () => normalizedSkills;

export const getSkillById = (id: string) => talentByIdMap[id] ?? mergedMap.get(id) ?? null;

export const getSkillsByClass = (classSlug: string) => {
  const normalizedSlug = normalizeClassSlug(classSlug);
  const fromTalentRaw = talentbuildsSkillsByClass[normalizedSlug];
  if (Array.isArray(fromTalentRaw) && fromTalentRaw.length > 0) {
    return fromTalentRaw.map((skill) => normalizeSkill(skill as TalentbuildsSkill, "talentbuilds"));
  }
  return normalizedSkills.filter((skill) => normalizeClassSlug(skill.classSlug) === normalizedSlug);
};

export const getSkillForDaevanionNode = (node: { effect?: { skill_id?: number | string } }) => {
  const skillId = node?.effect?.skill_id;
  if (skillId === undefined || skillId === null) return null;
  return getSkillById(String(skillId));
};
