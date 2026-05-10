import type { GearSlotId } from "./slotDefinitions";

export type GearBuildState = {
  classSlug: string;
  currentBuild: Partial<Record<GearSlotId, string>>;
  targetBuild: Partial<Record<GearSlotId, string>>;
};

export const STORAGE_KEY = "aion2hub_gear_planner_build";

export const loadGearBuild = (): GearBuildState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GearBuildState;
    if (!parsed || typeof parsed.classSlug !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
};

export const saveGearBuild = (state: GearBuildState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
