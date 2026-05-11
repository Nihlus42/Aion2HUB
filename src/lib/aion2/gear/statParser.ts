import prodItemsJson from "@/data/items/json/aion2hub_items_production_all.json";
import type { ItemFull, ItemLight } from "@/data";

export type ParsedStats = Record<string, number>;
export type StatGroup = "Ressources" | "Offensif" | "Defensif" | "PvE / PvP" | "Autres";

type GearItem = ItemLight | ItemFull;
type StatKey =
  | "hp"
  | "mp"
  | "attack"
  | "accuracy"
  | "criticalHit"
  | "criticalDamage"
  | "defense"
  | "evasion"
  | "block"
  | "parry"
  | "criticalResist"
  | "pveDamageBoost"
  | "pveDamageTolerance"
  | "pvpDamageBoost"
  | "pvpDamageTolerance"
  | "attackSpeed"
  | "skillSpeed";

type StatInfo = { label: string; group: StatGroup; isPercent?: boolean };
const STAT_INFO: Record<StatKey, StatInfo> = {
  hp: { label: "PV", group: "Ressources" },
  mp: { label: "PM", group: "Ressources" },
  attack: { label: "Attaque", group: "Offensif" },
  accuracy: { label: "Precision", group: "Offensif" },
  criticalHit: { label: "Critique", group: "Offensif" },
  criticalDamage: { label: "Degats critiques", group: "Offensif" },
  defense: { label: "Defense", group: "Defensif" },
  evasion: { label: "Esquive", group: "Defensif" },
  block: { label: "Blocage", group: "Defensif" },
  parry: { label: "Parade", group: "Defensif" },
  criticalResist: { label: "Resistance critique", group: "Defensif" },
  pveDamageBoost: { label: "Bonus degats PvE", group: "PvE / PvP", isPercent: true },
  pveDamageTolerance: { label: "Resistance degats PvE", group: "PvE / PvP", isPercent: true },
  pvpDamageBoost: { label: "Bonus degats PvP", group: "PvE / PvP", isPercent: true },
  pvpDamageTolerance: { label: "Resistance degats PvP", group: "PvE / PvP", isPercent: true },
  attackSpeed: { label: "Vitesse d attaque", group: "Offensif", isPercent: true },
  skillSpeed: { label: "Vitesse de competence", group: "Offensif", isPercent: true },
};

type ProdItemStat = { stat?: string; statFr?: string; value?: number; enchantLevel?: number };
type ProdItem = { id: string; itemStats?: ProdItemStat[]; equipmentInfo?: Record<string, unknown> };
const prodRecords = ((prodItemsJson as { records?: ProdItem[] }).records ?? []) as ProdItem[];
const prodById = new Map(prodRecords.map((it) => [it.id, it]));

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/degets/g, "degats")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const toNumber = (raw: string): number | null => {
  const sanitized = raw.replace(",", ".").replace(/[^\d.+-]/g, "");
  const value = Number.parseFloat(sanitized);
  return Number.isFinite(value) ? value : null;
};

const parseSingleLine = (line: string): [StatKey, number] | null => {
  const normalized = normalizeText(line);
  const numberMatch = normalized.match(/([+-]?\d+(?:[.,]\d+)?)/);
  if (!numberMatch) return null;
  const value = toNumber(numberMatch[1]);
  if (value === null) return null;

  if (/(^| )pv( |$)/.test(normalized)) return ["hp", value];
  if (/(^| )pm( |$)/.test(normalized)) return ["mp", value];
  if (normalized.includes("resistance") && normalized.includes("critique")) return ["criticalResist", value];
  if (normalized.includes("degats critiques") || normalized.includes("damage critique")) return ["criticalDamage", value];
  if (normalized.includes("critique")) return ["criticalHit", value];
  if (normalized.includes("precision")) return ["accuracy", value];
  if (normalized.includes("defense")) return ["defense", value];
  if (normalized.includes("esquive")) return ["evasion", value];
  if (normalized.includes("blocage")) return ["block", value];
  if (normalized.includes("parade")) return ["parry", value];
  if (normalized.includes("vitesse d attaque")) return ["attackSpeed", value];
  if (normalized.includes("vitesse de competence")) return ["skillSpeed", value];
  if (normalized.includes("pve")) {
    if (normalized.includes("resistance") && normalized.includes("degats")) return ["pveDamageTolerance", value];
    if (normalized.includes("bonus") && normalized.includes("degats")) return ["pveDamageBoost", value];
  }
  if (normalized.includes("pvp")) {
    if (normalized.includes("resistance") && normalized.includes("degats")) return ["pvpDamageTolerance", value];
    if (normalized.includes("bonus") && normalized.includes("degats")) return ["pvpDamageBoost", value];
  }
  if (normalized.includes("attaque")) return ["attack", value];

  return null;
};

export const parseStatLine = (line: string): ParsedStats => {
  const parsed = parseSingleLine(line);
  if (!parsed) return {};
  const [key, value] = parsed;
  return { [key]: value };
};

const getStringLines = (item: GearItem): string[] => {
  const fromArrays = [item.optionsFr, (item as any).topOptionsFr, (item as any).options]
    .flatMap((value: unknown) => (Array.isArray(value) ? value : []))
    .map((entry: any) => {
      if (typeof entry === "string") return entry;
      if (entry && typeof entry === "object") {
        if (typeof entry.textFr === "string") return entry.textFr;
        if (typeof entry.labelFr === "string" && entry.value !== undefined) return `${entry.labelFr} ${String(entry.value)}`;
      }
      return "";
    })
    .filter((v) => typeof v === "string" && v.trim().length > 0);
  return fromArrays;
};

const toStatKeyFromRaw = (raw: string): StatKey | null => {
  const key = normalizeText(raw).replace(/[^a-z0-9]/g, "");
  if (["hp", "maxhp"].includes(key)) return "hp";
  if (["mp", "maxmp"].includes(key)) return "mp";
  if (["attack", "physicalattack", "magicalattack", "weapondamage", "weaponmindamage", "weaponmaxdamage"].includes(key)) return "attack";
  if (key === "accuracy") return "accuracy";
  if (key === "criticalhit") return "criticalHit";
  if (key === "criticaldamageboost") return "criticalDamage";
  if (key === "defense") return "defense";
  if (key === "evasion") return "evasion";
  if (key === "block") return "block";
  if (key === "parry") return "parry";
  if (key === "criticalresist") return "criticalResist";
  if (key === "pvedamageboost") return "pveDamageBoost";
  if (key === "pvedamagetolerance") return "pveDamageTolerance";
  if (key === "pvpdamageboost") return "pvpDamageBoost";
  if (key === "pvpdamagetolerance") return "pvpDamageTolerance";
  if (key === "attackspeed") return "attackSpeed";
  if (key === "skillspeed") return "skillSpeed";
  return null;
};

const add = (stats: ParsedStats, key: string, value: number) => {
  if (!Number.isFinite(value) || value === 0) return;
  stats[key] = (stats[key] ?? 0) + value;
};

const extractFromItemStats = (statsSource: unknown, enchantLevel: number): ParsedStats => {
  if (!Array.isArray(statsSource)) return {};
  const byKey = new Map<StatKey, Array<{ level: number; value: number }>>();
  for (const row of statsSource as Array<any>) {
    const statName = typeof row?.stat === "string" ? row.stat : typeof row?.key === "string" ? row.key : "";
    const mapped = toStatKeyFromRaw(statName);
    const value = Number(row?.value ?? 0);
    if (!mapped || !Number.isFinite(value) || value === 0) continue;
    const level = Number.isFinite(row?.enchantLevel) ? Number(row.enchantLevel) : 0;
    if (!byKey.has(mapped)) byKey.set(mapped, []);
    byKey.get(mapped)!.push({ level, value });
  }

  const out: ParsedStats = {};
  for (const [key, values] of byKey.entries()) {
    values.sort((a, b) => a.level - b.level);
    let pick = values.find((v) => v.level === 0) ?? values[0];
    for (const value of values) {
      if (value.level <= enchantLevel) pick = value;
    }
    add(out, key, pick.value);
  }
  return out;
};

export const extractBaseStatsFromItem = (item: GearItem): ParsedStats => {
  const out: ParsedStats = {};

  for (const line of getStringLines(item)) {
    const parsed = parseSingleLine(line);
    if (!parsed) continue;
    const [key, value] = parsed;
    add(out, key, value);
  }

  const bases = [
    (item as any).stats,
    (item as any).itemStats,
    (item as any).equipmentInfo,
    (item as any).raw?.itemStats,
    (item as any).raw?.equipmentInfo,
  ];

  for (const source of bases) {
    const parsed = extractFromItemStats(source, 0);
    for (const [key, value] of Object.entries(parsed)) add(out, key, value);
  }

  return out;
};

export const getAvailableEnchantLevels = (item: GearItem): number[] => {
  const levels = new Set<number>([0]);
  const candidates = [
    (item as any).itemStats,
    (item as any).raw?.itemStats,
    (item as any).statsByEnchant,
    (item as any).enchantStats,
    (item as any).enchantLevels,
    prodById.get(item.id)?.itemStats,
  ];

  for (const source of candidates) {
    if (Array.isArray(source)) {
      for (const entry of source as Array<any>) {
        const level = Number(entry?.enchantLevel ?? entry?.level ?? entry);
        if (Number.isFinite(level) && level >= 0) levels.add(Math.trunc(level));
      }
    } else if (source && typeof source === "object") {
      for (const key of Object.keys(source as Record<string, unknown>)) {
        const level = Number(key.replace(/[^\d-]/g, ""));
        if (Number.isFinite(level) && level >= 0) levels.add(Math.trunc(level));
      }
    }
  }

  return Array.from(levels).sort((a, b) => a - b);
};

export const getMaxEnchantLevel = (item: GearItem): number => {
  const levels = getAvailableEnchantLevels(item);
  return levels[levels.length - 1] ?? 0;
};

const mergeStats = (left: ParsedStats, right: ParsedStats): ParsedStats => {
  const out: ParsedStats = { ...left };
  for (const [key, value] of Object.entries(right)) add(out, key, value);
  return out;
};

export const getItemStatsForEnchant = (item: GearItem, enchantLevel: number): ParsedStats => {
  const normalizedLevel = Math.max(0, Math.trunc(enchantLevel || 0));
  const base = extractBaseStatsFromItem(item);
  if (normalizedLevel === 0) return base;

  const itemStatsSources = [
    (item as any).itemStats,
    (item as any).raw?.itemStats,
    prodById.get(item.id)?.itemStats,
  ];

  let pickedEnchant: ParsedStats = {};
  for (const source of itemStatsSources) {
    const parsed = extractFromItemStats(source, normalizedLevel);
    if (Object.keys(parsed).length > 0) {
      pickedEnchant = parsed;
      break;
    }
  }

  return mergeStats(base, pickedEnchant);
};

export const sumStats = (items: Array<{ item: GearItem; enchantLevel: number }>): ParsedStats => {
  const total: ParsedStats = {};
  for (const entry of items) {
    const parsed = getItemStatsForEnchant(entry.item, entry.enchantLevel);
    for (const [key, value] of Object.entries(parsed)) add(total, key, value);
  }
  return total;
};

const getStatInfo = (key: string): StatInfo | undefined => STAT_INFO[key as StatKey];

export const groupStats = (stats: ParsedStats) => {
  const grouped: Record<StatGroup, Array<[string, number]>> = {
    Ressources: [],
    Offensif: [],
    Defensif: [],
    "PvE / PvP": [],
    Autres: [],
  };

  for (const [key, value] of Object.entries(stats)) {
    if (!Number.isFinite(value) || value === 0) continue;
    const info = getStatInfo(key);
    const label = info?.label ?? key;
    const group = info?.group ?? "Autres";
    grouped[group].push([label, value]);
  }
  return grouped;
};
