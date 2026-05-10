import talentbuildsAllJson from "./talentbuilds/aion2hub_skills_fr_all.json";
import talentbuildsByIdJson from "./talentbuilds/aion2hub_skills_fr_by_id.json";
import talentbuildsByClassJson from "./talentbuilds/aion2hub_skills_fr_by_class.json";
import talentbuildsMetaJson from "./talentbuilds/aion2hub_skills_fr_meta.json";

export const talentbuildsSkillsAll = talentbuildsAllJson as {
  records?: unknown[];
  [key: string]: unknown;
};
export const talentbuildsSkillsById = talentbuildsByIdJson as Record<string, unknown>;
export const talentbuildsSkillsByClass = talentbuildsByClassJson as Record<string, unknown[]>;
export const talentbuildsSkillsMeta = talentbuildsMetaJson as Record<string, unknown>;
