export * from "./types";

import lightJson from "@/data/aion2/items/aion2hub_clean_json/aion2hub_items_fr_light.json";
import byIdJson from "@/data/aion2/items/aion2hub_clean_json/aion2hub_items_fr_by_id.json";
import metaJson from "@/data/aion2/items/aion2hub_clean_json/aion2hub_items_fr_meta.json";
import type { DisplayItem, ItemFull, ItemLight, ItemsMeta } from "./types";

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

const cleanText = (value: string) => fixMojibake(value).replace(/\s+/g, " ").trim();

export const isValidText = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const cleaned = cleanText(value);
  if (!cleaned) return false;
  if (cleaned.length < 3) return false;
  return !/^(unknown|inconnu|null|n\/a|none|undefined)[.!?]?$/i.test(cleaned);
};

export const normalizeUnknown = (value: unknown, fallback = "Inconnu") => {
  if (!isValidText(value)) return fallback;
  return cleanText(value);
};

const lightRaw = lightJson as ItemLight[];
const byIdRaw = byIdJson as Record<string, ItemFull>;
const metaRaw = metaJson as ItemsMeta;

export const itemsLight: ItemLight[] = Array.isArray(lightRaw) ? lightRaw : [];
export const itemsById: Record<string, ItemFull> = byIdRaw ?? {};
export const itemsMeta: ItemsMeta = metaRaw ?? {};

export const items = itemsLight;

const toDisplayItem = (item: ItemLight | ItemFull): DisplayItem => {
  const nameFr = isValidText(item.nameFr) ? cleanText(item.nameFr) : null;
  const nameEn = isValidText(item.nameEn) ? cleanText(item.nameEn) : null;

  const descriptionCandidate = (item as ItemFull).descriptionFr;
  const descriptionFr = isValidText(descriptionCandidate) ? cleanText(descriptionCandidate) : null;

  const optionsFr = (item.optionsFr ?? item.topOptionsFr ?? [])
    .filter((it): it is string => isValidText(it))
    .map((it) => cleanText(it));

  const sourceFr = (item.sourceFr ?? (item as ItemFull).sources?.map((s) => s.fr ?? "") ?? [])
    .filter((it): it is string => isValidText(it))
    .map((it) => cleanText(it));

  const searchParts = [
    item.searchText ?? "",
    nameFr ?? "",
    nameEn ?? "",
    item.categoryFr ?? "",
    item.categoryEn ?? "",
    item.gradeFr ?? "",
    ...optionsFr,
  ];

  return {
    id: item.id,
    name: nameFr ?? nameEn ?? "Inconnu",
    nameEn: nameEn && nameEn !== nameFr ? nameEn : null,
    image: isValidText(item.image) ? item.image : null,
    mainCategory: isValidText(item.mainCategory) ? item.mainCategory : null,
    mainCategoryFr: isValidText(item.mainCategoryFr) ? cleanText(item.mainCategoryFr) : null,
    categoryEn: isValidText(item.categoryEn) ? cleanText(item.categoryEn) : null,
    categoryFr: isValidText(item.categoryFr) ? cleanText(item.categoryFr) : null,
    gradeEn: isValidText(item.gradeNameEn) ? cleanText(item.gradeNameEn) : null,
    gradeFr: isValidText(item.gradeFr) ? cleanText(item.gradeFr) : null,
    tradable: typeof item.tradable === "boolean" ? item.tradable : null,
    sourceFr,
    optionsFr,
    descriptionFr,
    searchText: cleanText(searchParts.join(" ").toLowerCase()),
  };
};

export const cleanItemForDisplay = (item: ItemLight | ItemFull): DisplayItem => toDisplayItem(item);

export const getItemById = (id: string): ItemFull | undefined => itemsById[id];

export const getItemDetailDisplayById = (id: string): DisplayItem | null => {
  const item = getItemById(id);
  if (!item) return null;
  return cleanItemForDisplay(item);
};

const normalizeFilterPairs = (pairs: Array<[string, string]> | undefined) =>
  (pairs ?? []).map(([value, label]) => [value, normalizeUnknown(label)] as const);

export const itemFilterOptions = {
  mainCategories: normalizeFilterPairs(itemsMeta.filters?.mainCategories),
  categories: normalizeFilterPairs(itemsMeta.filters?.categories),
  grades: normalizeFilterPairs(itemsMeta.filters?.grades),
  sources: normalizeFilterPairs(itemsMeta.filters?.sources),
};

export const getItemDisplayName = (item: ItemLight | ItemFull) => cleanItemForDisplay(item).name;
export const getItemDisplayDescription = (item: ItemLight | ItemFull) => cleanItemForDisplay(item).descriptionFr ?? "Description indisponible.";
export const getItemCategoryLabel = (item: ItemLight | ItemFull) => cleanItemForDisplay(item).categoryFr ?? "Inconnu";
export const getItemSubCategoryLabel = (item: ItemLight | ItemFull) => cleanItemForDisplay(item).categoryFr ?? "Inconnu";
export const getItemRarityLabel = (item: ItemLight | ItemFull) => cleanItemForDisplay(item).gradeFr ?? "Inconnu";
export const getItemQualityLabel = (_item: ItemLight | ItemFull) => "Inconnu";
export const getItemCooldownLabel = (_item: ItemLight | ItemFull) => "Inconnu";
export const getItemSourceStatusLabel = (_item: ItemLight | ItemFull) => "Base communautaire";
