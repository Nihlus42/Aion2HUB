import type { GearSlotId } from "./slotDefinitions";

export type EquippedItem = {
  itemId: string;
  enchantLevel: number;
};

export type GearBuildSlots = Partial<Record<GearSlotId, EquippedItem>>;

export type GearBuildState = {
  classSlug: string;
  activeMode?: "current" | "target" | "comparison";
  currentBuild: GearBuildSlots;
  targetBuild: GearBuildSlots;
};

export const STORAGE_KEY = "aion2hub_gear_planner_build";

const migrateSlots = (input: unknown): GearBuildSlots => {
  const out: GearBuildSlots = {};
  if (!input || typeof input !== "object") return out;
  for (const [slotId, value] of Object.entries(input as Record<string, unknown>)) {
    if (!value) continue;
    if (typeof value === "string") {
      out[slotId as GearSlotId] = { itemId: value, enchantLevel: 0 };
      continue;
    }
    if (typeof value === "object") {
      const v = value as Record<string, unknown>;
      if (typeof v.itemId === "string") {
        const level = typeof v.enchantLevel === "number" && Number.isFinite(v.enchantLevel) ? Math.max(0, Math.trunc(v.enchantLevel)) : 0;
        out[slotId as GearSlotId] = { itemId: v.itemId, enchantLevel: level };
      }
    }
  }
  return out;
};

export const loadGearBuild = (): GearBuildState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as any;
    if (!parsed || typeof parsed.classSlug !== "string") return null;
    return {
      classSlug: parsed.classSlug,
      activeMode: parsed.activeMode === "target" || parsed.activeMode === "comparison" ? parsed.activeMode : "current",
      currentBuild: migrateSlots(parsed.currentBuild),
      targetBuild: migrateSlots(parsed.targetBuild),
    };
  } catch {
    return null;
  }
};

export const saveGearBuild = (state: GearBuildState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
