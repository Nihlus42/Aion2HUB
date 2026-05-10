export type ItemLight = {
  id: string;
  slug: string;
  nameEn?: string | null;
  nameFr?: string | null;
  image?: string | null;
  mainCategory?: string | null;
  mainCategoryFr?: string | null;
  categoryEn?: string | null;
  categoryFr?: string | null;
  gradeNameEn?: string | null;
  gradeFr?: string | null;
  tradable?: boolean;
  sourceFr?: string[] | null;
  topOptionsFr?: string[] | null;
  optionsFr?: string[] | null;
  searchText?: string | null;
};

export type ItemOption = {
  key?: string;
  labelEn?: string | null;
  labelFr?: string | null;
  value?: unknown;
  isPercent?: boolean;
  textEn?: string | null;
  textFr?: string | null;
};

export type ItemFull = ItemLight & {
  nameFrStatus?: string | null;
  gradeRaw?: string | null;
  inDatabase?: boolean;
  options?: ItemOption[] | null;
  descriptionEn?: string | null;
  descriptionFr?: string | null;
  descriptionStatus?: string | null;
  sources?: Array<{ en?: string; fr?: string }> | null;
};

export type ItemsMeta = {
  total?: number;
  filters?: {
    mainCategories?: Array<[string, string]>;
    categories?: Array<[string, string]>;
    grades?: Array<[string, string]>;
    sources?: Array<[string, string]>;
  };
};

export type DisplayItem = {
  id: string;
  name: string;
  nameEn: string | null;
  image: string | null;
  mainCategory: string | null;
  mainCategoryFr: string | null;
  categoryEn: string | null;
  categoryFr: string | null;
  gradeEn: string | null;
  gradeFr: string | null;
  tradable: boolean | null;
  sourceFr: string[];
  optionsFr: string[];
  descriptionFr: string | null;
  searchText: string;
};
