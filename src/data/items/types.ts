export type ItemStat = {
  stat: string;
  statFr?: string | null;
  value: number | string;
  enchantLevel?: number | null;
};

export type CraftIngredient = {
  id?: string;
  name?: string;
  nameFr?: string;
  quantity?: number;
};

export type ItemCrafting = {
  isCraftable?: boolean;
  ingredients?: CraftIngredient[];
  normalOutput?: number | string | null;
  comboOutput?: number | string | null;
};

export type ItemEquipmentInfo = {
  weaponType?: string | null;
  armorType?: string | null;
  slot?: string | null;
  range?: number | string | null;
  attackSpeed?: number | string | null;
};

export type Item = {
  id: string;
  name: string;
  nameFr?: string;
  slug: string;
  category: string;
  categoryFr?: string;
  subCategory?: string;
  subCategoryFr?: string;
  rarity?: string;
  rarityFr?: string;
  quality?: string;
  qualityFr?: string;
  description?: string;
  descriptionFr?: string;
  cooldown?: string;
  cooldownFr?: string;
  icon?: string;
  sourceUrl?: string;
  sourceName?: string;
  sourceStatus?: string;
  sourceStatusFr?: string;
  lastUpdated?: string;

  minLevelRequirement?: number | null;
  maxLevelRequirement?: number | null;
  raceId?: string | null;
  itemTier?: string | null;
  isSellable?: boolean;
  sellPrice?: number | null;

  equipmentInfo?: ItemEquipmentInfo | null;
  itemStats?: ItemStat[] | null;
  crafting?: ItemCrafting | null;

  isCraftable?: boolean;
  craftIngredients?: CraftIngredient[];
  normalOutput?: number | string | null;
  comboOutput?: number | string | null;
};

export type DisplayStatGroup = {
  enchantLevel: number;
  lines: string[];
};

export type DisplayItem = {
  id: string;
  icon: string;
  name: string;
  category: string;
  subCategory: string;
  rarity: string;
  quality: string;
  description: string | null;
  cooldown: string | null;
  minLevel: number | null;
  race: string | null;
  sellPrice: number | null;
  tier: string | null;
  equipment: {
    weaponType: string | null;
    armorType: string | null;
    slot: string | null;
    range: string | null;
    attackSpeed: string | null;
  };
  statsByEnchant: DisplayStatGroup[];
  crafting: {
    isCraftable: boolean;
    ingredients: Array<{ name: string; quantity: number | null }>;
    normalOutput: string | null;
    comboOutput: string | null;
  };
  sourceName: string | null;
  sourceStatus: string | null;
  lastUpdated: string | null;
};
