export type TalentbuildsSkill = {
  id: string | number;
  slug?: string;
  classSlug?: string;
  classFr?: string;
  classEn?: string;
  nameFr?: string;
  nameEn?: string;
  typeFr?: string;
  typeEn?: string;
  descriptionFr?: string;
  specialtyFr?: string | string[];
  tagsFr?: string | string[] | Record<string, never> | null;
  imageUrl?: string;
  image?: string;
  unlocked?: number;
  boardReferences?: Array<{
    boardId: number;
    boardTitle: string;
    boardTitleFr?: string;
    nodeId: string;
    requiredLevel: number;
    costPoints: number;
  }>;
  totalPotentialLevelsFromBoards?: number;
};

export type NormalizedSkill = {
  id: string;
  slug: string;
  nameFr: string;
  nameEn?: string;
  classFr: string;
  classEn?: string;
  classSlug: string;
  typeFr: string;
  typeEn?: string;
  descriptionFr?: string;
  specialtyFr?: string[];
  tagsFr?: string[];
  imageUrl?: string;
  image?: string;
  unlocked?: number;
  boardReferences?: Array<{
    boardId: number;
    boardTitle: string;
    boardTitleFr: string;
    nodeId: string;
    requiredLevel: number;
    costPoints: number;
  }>;
  source: "questlog" | "talentbuilds";
};
