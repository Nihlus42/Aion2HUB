import type { DisplayItem } from "@/data";

export type ParsedStats = Record<string, number>;

const statRules: Array<{ key: string; regex: RegExp }> = [
  { key: "Attaque", regex: /attaque\s+(\d+)\s*[~-]\s*(\d+)/i },
  { key: "Attaque", regex: /attaque\s+([+-]?\d+)/i },
  { key: "Defense", regex: /defense\s+([+-]?\d+)/i },
  { key: "PV max", regex: /pv(?:\smax)?\s+([+-]?\d+)/i },
  { key: "PM max", regex: /pm(?:\smax)?\s+([+-]?\d+)/i },
  { key: "Precision", regex: /precision\s+([+-]?\d+)/i },
  { key: "Coup critique", regex: /coup critique\s+([+-]?\d+)/i },
  { key: "Resistance critique", regex: /resistance.*critique\s+([+-]?\d+)/i },
  { key: "Bonus degats critiques", regex: /degats critiques?\s+([+-]?\d+)%?/i },
  { key: "Vitesse d attaque", regex: /vitesse d attaque\s+([+-]?\d+)%?/i },
  { key: "Vitesse de competence", regex: /vitesse de competence\s+([+-]?\d+)%?/i },
  { key: "Esquive", regex: /esquive\s+([+-]?\d+)/i },
  { key: "Blocage", regex: /blocage\s+([+-]?\d+)/i },
  { key: "Bonus PvE", regex: /bonus de degats pve\s+([+-]?\d+)%?/i },
  { key: "Resistance PvE", regex: /resistance aux degats pve\s+([+-]?\d+)%?/i },
  { key: "Bonus PvP", regex: /bonus de degats pvp\s+([+-]?\d+)%?/i },
  { key: "Resistance PvP", regex: /resistance aux degats pvp\s+([+-]?\d+)%?/i },
];

const add = (stats: ParsedStats, key: string, value: number) => {
  stats[key] = (stats[key] ?? 0) + value;
};

export const parseItemStats = (item: DisplayItem): ParsedStats => {
  const stats: ParsedStats = {};
  for (const opt of item.optionsFr) {
    const text = opt.toLowerCase();
    for (const rule of statRules) {
      const m = text.match(rule.regex);
      if (!m) continue;
      if (rule.key === "Attaque" && m[2]) {
        const min = Number(m[1]);
        const max = Number(m[2]);
        if (Number.isFinite(min) && Number.isFinite(max)) add(stats, rule.key, Math.round((min + max) / 2));
      } else {
        const val = Number(m[1]);
        if (Number.isFinite(val)) add(stats, rule.key, val);
      }
      break;
    }
  }
  return stats;
};

export const sumStats = (items: DisplayItem[]) => {
  const total: ParsedStats = {};
  for (const item of items) {
    const parsed = parseItemStats(item);
    for (const [k, v] of Object.entries(parsed)) add(total, k, v);
  }
  return total;
};
