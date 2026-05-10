import boardsJson from "@/data/aion2/daevanion/boards.json";
import skillsJson from "@/data/aion2/daevanion/tb_daevanion_skills.json";
import type { DaevanionBoard, DaevanionNode, DaevanionNodeEffect, DaevanionSkill } from "@/data/aion2/daevanion/types";
import { assassinSkillNameFr, translateText } from "@/data/aion2/daevanion/translations/fr";

type SkillsByClass = Record<string, DaevanionSkill[]>;

const classMap: Record<string, string> = {
  Assassin: "Assassin",
  Chanter: "Aede",
  Cleric: "Clerc",
  Elementalist: "Spiritualiste",
  Gladiator: "Gladiateur",
  Ranger: "Rodeur",
  Sorcerer: "Sorcier",
  Templar: "Templier",
};

const boardData = boardsJson as DaevanionBoard[];
const skillsData = skillsJson as SkillsByClass;

export const daevanionClasses = Object.keys(classMap).map((en) => ({ en, fr: classMap[en] }));

export const translateClassName = (className: string) => classMap[className] ?? className;
export const translateNodeType = (nodeType: string) => translateText(nodeType);
export const translateNodeGrade = (grade: string) => translateText(grade);

export const translateDaevanionEffect = (effect: DaevanionNodeEffect | undefined) => {
  if (!effect || Object.keys(effect).length === 0) return "Aucun effet";
  if (effect.kind === "Stat") {
    return `${translateText(effect.stat ?? "Statistique")} +${effect.amount ?? 0}`;
  }
  if (effect.kind === "SkillLevel") {
    const skillName = effect.skill_name ?? "Competence";
    const skillNameFr = assassinSkillNameFr[skillName] ?? translateText(skillName);
    const level = effect.levels ?? 1;
    return `${skillNameFr} +${level} niveau`;
  }
  return translateText(JSON.stringify(effect));
};

export const translateDaevanionNode = (node: DaevanionNode) => {
  const title = node.title ? translateText(node.title) : "";
  return {
    ...node,
    titleFr: title || translateNodeType(node.type),
    typeFr: translateNodeType(node.type),
    gradeFr: translateNodeGrade(node.grade),
    effectFr: translateDaevanionEffect(node.effect),
  };
};

export const translateDaevanionBoard = (board: DaevanionBoard) => ({
  ...board,
  classFr: translateClassName(board.class),
  titleFr: board.title || `Plateau ${board.order}`,
  buffFr:
    typeof board.buff === "string"
      ? translateText(board.buff || "")
      : translateText(board.buff?.description || board.buff?.title || ""),
  costPointTypeFr: translateText(board.cost_point_type || "Cristal"),
  nodes: board.nodes.map(translateDaevanionNode),
});

export const translateDaevanionSkill = (skill: DaevanionSkill, index = 0) => {
  const translatedName = assassinSkillNameFr[skill.name] ?? translateText(skill.name);
  const looksUntranslated = translatedName.trim().toLowerCase() === skill.name.trim().toLowerCase();
  const nameFr = looksUntranslated ? `Competence ${index + 1}` : translatedName;
  return {
    ...skill,
    nameEn: skill.name,
    nameFr,
    typeFr: translateText(skill.type),
    descFr: translateText(skill.desc),
    specialtyFr: translateText(skill.specialty || ""),
    tagsFr: (skill.tags ?? []).map((t) => translateText(t)),
  };
};

export const daevanionBoards = boardData.map(translateDaevanionBoard);
export const daevanionSkillsByClass = Object.fromEntries(
  Object.entries(skillsData).map(([klass, skills]) => [
    klass,
    (skills ?? []).map((skill, index) => translateDaevanionSkill(skill, index)),
  ]),
) as Record<string, Array<ReturnType<typeof translateDaevanionSkill>>>;

