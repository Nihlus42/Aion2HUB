export * from "./types";

import itemsDataset from "./json/aion2hub_items_production_all.json";
import type { DisplayItem, Item, ItemStat } from "./types";

type ItemsDataset = {
  dataset: string;
  records: Item[];
};

const dataset = itemsDataset as ItemsDataset;

export const items: Item[] = Array.isArray(dataset.records) ? dataset.records : [];

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

const cleanText = (value: string) => value.replace(/\s+/g, " ").trim();

export const isValidText = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const cleaned = cleanText(fixMojibake(value));
  if (!cleaned) return false;
  return !/^(unknown|inconnu|null|n\/a|none|undefined)[.!?]?$/i.test(cleaned);
};

export const normalizeUnknown = (value: unknown, fallback = "Inconnu") => {
  if (!isValidText(value)) return fallback;
  return cleanText(fixMojibake(value));
};

const formatNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value.toLocaleString("fr-FR");
  if (typeof value === "string" && value.trim() !== "") return value;
  return null;
};

const normalizeStatLabel = (stat: ItemStat) => {
  if (isValidText(stat.statFr)) return cleanText(fixMojibake(stat.statFr));
  if (isValidText(stat.stat)) return cleanText(fixMojibake(stat.stat));
  return null;
};

const buildStatsByEnchant = (stats: ItemStat[] | null | undefined) => {
  if (!Array.isArray(stats) || stats.length === 0) return [];
  const groups = new Map<number, string[]>();

  for (const stat of stats) {
    const lvl = typeof stat.enchantLevel === "number" && Number.isFinite(stat.enchantLevel) ? stat.enchantLevel : 0;
    const label = normalizeStatLabel(stat);
    const value = formatNumber(stat.value);
    if (!label || value === null) continue;
    const line = `${label} +${value}`;
    const bucket = groups.get(lvl) ?? [];
    bucket.push(line);
    groups.set(lvl, bucket);
  }

  return Array.from(groups.entries())
    .sort((a, b) => a[0] - b[0])
    .slice(0, 6)
    .map(([enchantLevel, lines]) => ({ enchantLevel, lines: lines.slice(0, 6) }));
};

const getCraftData = (item: Item) => {
  const isCraftable = item.crafting?.isCraftable === true || item.isCraftable === true;
  const rawIngredients = item.crafting?.ingredients ?? item.craftIngredients ?? [];
  const ingredients = Array.isArray(rawIngredients)
    ? rawIngredients
        .map((it) => ({
          name: normalizeUnknown(it?.nameFr || it?.name, ""),
          quantity: typeof it?.quantity === "number" && Number.isFinite(it.quantity) ? it.quantity : null,
        }))
        .filter((it) => it.name !== "")
        .slice(0, 6)
    : [];

  const normalOutputRaw = item.crafting?.normalOutput ?? item.normalOutput;
  const comboOutputRaw = item.crafting?.comboOutput ?? item.comboOutput;

  return {
    isCraftable,
    ingredients,
    normalOutput: formatNumber(normalOutputRaw),
    comboOutput: formatNumber(comboOutputRaw),
  };
};

export const cleanItemForDisplay = (item: Item): DisplayItem => {
  const descriptionRaw = item.descriptionFr || item.description;
  const description = isValidText(descriptionRaw) ? cleanText(fixMojibake(descriptionRaw)) : null;

  const cooldownRaw = item.cooldownFr || item.cooldown;
  const cooldown = isValidText(cooldownRaw) ? cleanText(fixMojibake(cooldownRaw)) : null;

  const equipment = item.equipmentInfo ?? {};

  return {
    id: item.id,
    icon: item.icon ?? "",
    name: normalizeUnknown(item.nameFr || item.name, "Inconnu"),
    category: normalizeUnknown(item.categoryFr || item.category),
    subCategory: normalizeUnknown(item.subCategory || item.subCategoryFr),
    rarity: normalizeUnknown(item.rarityFr || item.rarity),
    quality: normalizeUnknown(item.qualityFr || item.quality),
    description,
    cooldown,
    minLevel: typeof item.minLevelRequirement === "number" ? item.minLevelRequirement : null,
    race: isValidText(item.raceId) ? normalizeUnknown(item.raceId) : null,
    sellPrice: item.isSellable && typeof item.sellPrice === "number" ? item.sellPrice : null,
    tier: isValidText(item.itemTier) ? normalizeUnknown(item.itemTier) : null,
    equipment: {
      weaponType: isValidText(equipment.weaponType) ? normalizeUnknown(equipment.weaponType) : null,
      armorType: isValidText(equipment.armorType) ? normalizeUnknown(equipment.armorType) : null,
      slot: isValidText(equipment.slot) ? normalizeUnknown(equipment.slot) : null,
      range: equipment.range !== null && equipment.range !== undefined ? String(equipment.range) : null,
      attackSpeed: equipment.attackSpeed !== null && equipment.attackSpeed !== undefined ? String(equipment.attackSpeed) : null,
    },
    statsByEnchant: buildStatsByEnchant(item.itemStats),
    crafting: getCraftData(item),
    sourceName: isValidText(item.sourceName) ? normalizeUnknown(item.sourceName) : null,
    sourceStatus: isValidText(item.sourceStatusFr || item.sourceStatus) ? normalizeUnknown(item.sourceStatusFr || item.sourceStatus) : null,
    lastUpdated: isValidText(item.lastUpdated) ? normalizeUnknown(item.lastUpdated) : null,
  };
};

export const getItemDisplayName = (item: Item) => cleanItemForDisplay(item).name;
export const getItemDisplayDescription = (item: Item) => cleanItemForDisplay(item).description ?? "Description indisponible.";
export const getItemCategoryLabel = (item: Item) => cleanItemForDisplay(item).category;
export const getItemSubCategoryLabel = (item: Item) =>
  normalizeUnknown(item.subCategory || item.subCategoryFr);
export const getItemRarityLabel = (item: Item) => cleanItemForDisplay(item).rarity;
export const getItemQualityLabel = (item: Item) => cleanItemForDisplay(item).quality;
export const getItemCooldownLabel = (item: Item) => cleanItemForDisplay(item).cooldown ?? "Inconnu";
export const getItemSourceStatusLabel = (item: Item) => cleanItemForDisplay(item).sourceStatus ?? "Inconnu";

export const getItemById = (id: string) => items.find((item) => item.id === id);
