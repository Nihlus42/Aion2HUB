export type DaevanionNodeType = "None" | "Start" | "Stat" | "SkillLevel";
export type DaevanionGrade = "None" | "Common" | "Rare" | "Unique" | "Legend" | "Epic" | "Heroic";

export type DaevanionNodeEffect = {
  kind?: string;
  stat?: string;
  amount?: number;
  skill_id?: number;
  skill_name?: string;
  skill_description?: string;
  levels?: number;
};

export type DaevanionNode = {
  id: number;
  row: number;
  col: number;
  grade: DaevanionGrade | string;
  type: DaevanionNodeType | string;
  title: string;
  image: string;
  image_path: string;
  auto_learn: boolean;
  required_level: number;
  cost_points: number;
  refund_gold: number;
  condition_type: string;
  condition_value: string;
  effect: DaevanionNodeEffect;
};

export type DaevanionBoard = {
  id: number;
  class: string;
  order: number;
  required_level: number;
  title: string;
  icon: string;
  icon_path: string;
  cost_point_type: string;
  buff:
    | string
    | {
        icon?: string;
        icon_path?: string;
        title?: string;
        description?: string;
      };
  nodes: DaevanionNode[];
};

export type DaevanionSkill = {
  name: string;
  type: string;
  desc: string;
  specialty: string;
  tags: string[];
  image: string;
  unlocked: number;
};
