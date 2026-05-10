import type { GearBuildState } from "./buildStorage";

export const exportBuildJson = (state: GearBuildState) =>
  JSON.stringify(
    {
      version: 2,
      classSlug: state.classSlug,
      currentBuild: state.currentBuild,
      targetBuild: state.targetBuild,
    },
    null,
    2,
  );

export const importBuildJson = (value: string): GearBuildState | null => {
  try {
    const parsed = JSON.parse(value) as any;
    if (!parsed || typeof parsed.classSlug !== "string") return null;

    const normalizeSlots = (slots: any) => {
      const out: Record<string, { itemId: string; enchantLevel: number }> = {};
      if (!slots || typeof slots !== "object") return out;
      for (const [slotId, slotValue] of Object.entries(slots)) {
        if (typeof slotValue === "string") {
          out[slotId] = { itemId: slotValue, enchantLevel: 0 };
          continue;
        }
        if (slotValue && typeof slotValue === "object" && typeof (slotValue as any).itemId === "string") {
          const lvlRaw = (slotValue as any).enchantLevel;
          const lvl = typeof lvlRaw === "number" && Number.isFinite(lvlRaw) ? Math.max(0, Math.trunc(lvlRaw)) : 0;
          out[slotId] = { itemId: (slotValue as any).itemId, enchantLevel: lvl };
        }
      }
      return out;
    };

    return {
      classSlug: parsed.classSlug,
      activeMode: "current",
      currentBuild: normalizeSlots(parsed.currentBuild),
      targetBuild: normalizeSlots(parsed.targetBuild),
    };
  } catch {
    return null;
  }
};
