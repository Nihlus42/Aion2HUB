import prodItemsJson from "@/data/items/json/aion2hub_items_production_all.json";
import type { DisplayItem } from "@/data";

export type ParsedStats = Record<string, number>;
export type StatGroup = "Offensif" | "Defensif" | "Ressources" | "PvE / PvP" | "Autres";

const statLabelMap: Record<string, { label: string; group: StatGroup }> = {
  weapondamage: { label: "Degats arme", group: "Offensif" },
  weaponmindamage: { label: "Degats min. arme", group: "Offensif" },
  weaponmaxdamage: { label: "Degats max. arme", group: "Offensif" },
  physicalattack: { label: "Attaque physique", group: "Offensif" },
  magicalattack: { label: "Attaque magique", group: "Offensif" },
  attack: { label: "Attaque", group: "Offensif" },
  accuracy: { label: "Precision", group: "Offensif" },
  criticalhit: { label: "Critique", group: "Offensif" },
  criticaldamageboost: { label: "Bonus degats critiques", group: "Offensif" },
  defense: { label: "Defense", group: "Defensif" },
  criticalresist: { label: "Resistance critique", group: "Defensif" },
  evasion: { label: "Esquive", group: "Defensif" },
  block: { label: "Blocage", group: "Defensif" },
  parry: { label: "Parade", group: "Defensif" },
  attackspeed: { label: "Vitesse d attaque", group: "Offensif" },
  skillspeed: { label: "Vitesse de competence", group: "Offensif" },
  maxhp: { label: "PV max", group: "Ressources" },
  maxmp: { label: "PM max", group: "Ressources" },
  hp: { label: "PV", group: "Ressources" },
  mp: { label: "PM", group: "Ressources" },
  pvedamageboost: { label: "Bonus degats PvE", group: "PvE / PvP" },
  pvedamagetolerance: { label: "Resistance degats PvE", group: "PvE / PvP" },
  pvpdamageboost: { label: "Bonus degats PvP", group: "PvE / PvP" },
  pvpdamagetolerance: { label: "Resistance degats PvP", group: "PvE / PvP" },
};

type ProdItemStat = { stat?: string; statFr?: string; value?: number; enchantLevel?: number };
type ProdItem = { id: string; itemStats?: ProdItemStat[] };
const prodRecords = ((prodItemsJson as { records?: ProdItem[] }).records ?? []) as ProdItem[];
const prodById = new Map(prodRecords.map((it) => [it.id, it]));

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const add = (stats: ParsedStats, key: string, value: number) => {
  stats[key] = (stats[key] ?? 0) + value;
};
const safeStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .filter((v) => v !== null && v !== undefined)
      .map((v) => String(v).trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  if (value && typeof value === "object") {
    return Object.values(value)
      .filter((v) => v !== null && v !== undefined)
      .map((v) => String(v).trim())
      .filter(Boolean);
  }
  return [];
};

const extractBaseOptionStats = (item: DisplayItem): ParsedStats => {
  const stats: ParsedStats = {};
  const rules: Array<{ key: string; regex: RegExp }> = [
    { key: "Attaque", regex: /attaque\s+(\d+)\s*[~-]\s*(\d+)/i },
    { key: "Attaque", regex: /attaque\s+([+-]?\d+)/i },
    { key: "Defense", regex: /defense\s+([+-]?\d+)/i },
    { key: "PV max", regex: /pv(?:\smax)?\s+([+-]?\d+)/i },
    { key: "PM max", regex: /pm(?:\smax)?\s+([+-]?\d+)/i },
    { key: "Precision", regex: /precision\s+([+-]?\d+)/i },
    { key: "Critique", regex: /coup critique\s+([+-]?\d+)/i },
    { key: "Resistance critique", regex: /resistance.*critique\s+([+-]?\d+)/i },
    { key: "Bonus degats critiques", regex: /degats critiques?\s+([+-]?\d+)%?/i },
    { key: "Vitesse d attaque", regex: /vitesse d attaque\s+([+-]?\d+)%?/i },
    { key: "Vitesse de competence", regex: /vitesse de competence\s+([+-]?\d+)%?/i },
    { key: "Esquive", regex: /esquive\s+([+-]?\d+)/i },
    { key: "Blocage", regex: /blocage\s+([+-]?\d+)/i },
    { key: "Bonus degats PvE", regex: /bonus de degats pve\s+([+-]?\d+)%?/i },
    { key: "Resistance degats PvE", regex: /resistance aux degats pve\s+([+-]?\d+)%?/i },
    { key: "Bonus degats PvP", regex: /bonus de degats pvp\s+([+-]?\d+)%?/i },
    { key: "Resistance degats PvP", regex: /resistance aux degats pvp\s+([+-]?\d+)%?/i },
  ];

  const options = safeStringArray((item as { optionsFr?: unknown }).optionsFr);
  for (const opt of options) {
    const text = opt.toLowerCase();
    for (const rule of rules) {
      const m = text.match(rule.regex);
      if (!m) continue;
      if (rule.key === "Attaque" && m[2]) {
        const min = Number(m[1]);
        const max = Number(m[2]);
        if (Number.isFinite(min) && Number.isFinite(max)) add(stats, rule.key, Math.round((min + max) / 2));
      } else {
        const v = Number(m[1]);
        if (Number.isFinite(v)) add(stats, rule.key, v);
      }
      break;
    }
  }
  return stats;
};

export const getItemMaxEnchantLevel = (itemId: string): number => {
  const prod = prodById.get(itemId);
  if (!prod?.itemStats?.length) return 0;
  let max = 0;
  for (const s of prod.itemStats) {
    const level = typeof s.enchantLevel === "number" ? s.enchantLevel : 0;
    if (level > max) max = level;
  }
  return max;
};

export const getItemStatsForEnchant = (item: DisplayItem, enchantLevel: number): ParsedStats => {
  const prod = prodById.get(item.id);
  if (!prod?.itemStats?.length) return extractBaseOptionStats(item);

  const level = Math.max(0, Math.trunc(enchantLevel || 0));
  const stats: ParsedStats = {};
  const grouped = new Map<string, ProdItemStat[]>();
  for (const s of prod.itemStats) {
    const key = normalizeKey(s.stat || "");
    if (!key) continue;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(s);
  }

  for (const [key, entries] of grouped) {
    const sorted = [...entries].sort((a, b) => (a.enchantLevel ?? 0) - (b.enchantLevel ?? 0));
    let pick: ProdItemStat | null = null;
    for (const e of sorted) {
      const eLevel = e.enchantLevel ?? 0;
      if (eLevel <= level) pick = e;
    }
    if (!pick) pick = sorted[0] ?? null;
    if (!pick) continue;
    const value = Number(pick.value ?? 0);
    if (!Number.isFinite(value) || value === 0) continue;
    const mapped = statLabelMap[key];
    const label = mapped?.label ?? (pick.statFr && pick.statFr !== "Inconnu" ? pick.statFr : "");
    if (!label) continue;
    add(stats, label, value);
  }

  if (Object.keys(stats).length === 0) {
    return extractBaseOptionStats(item);
  }
  return stats;
};

export const sumStats = (items: Array<{ item: DisplayItem; enchantLevel: number }>) => {
  const total: ParsedStats = {};
  for (const entry of items) {
    const parsed = getItemStatsForEnchant(entry.item, entry.enchantLevel);
    for (const [k, v] of Object.entries(parsed)) add(total, k, v);
  }
  return total;
};

export const groupStats = (stats: ParsedStats) => {
  const grouped: Record<StatGroup, Array<[string, number]>> = {
    Offensif: [],
    Defensif: [],
    Ressources: [],
    "PvE / PvP": [],
    Autres: [],
  };
  for (const [label, value] of Object.entries(stats)) {
    if (!Number.isFinite(value) || value === 0) continue;
    const key = normalizeKey(label);
    const mapped = statLabelMap[key as keyof typeof statLabelMap];
    const group = mapped?.group ?? (label.includes("PvE") || label.includes("PvP") ? "PvE / PvP" : "Autres");
    grouped[group].push([label, value]);
  }
  return grouped;
};
