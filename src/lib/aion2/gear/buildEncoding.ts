import type { GearBuildState } from "./buildStorage";

export const exportBuildJson = (state: GearBuildState) =>
  JSON.stringify(
    {
      version: 1,
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
    return {
      classSlug: parsed.classSlug,
      currentBuild: parsed.currentBuild ?? {},
      targetBuild: parsed.targetBuild ?? {},
    };
  } catch {
    return null;
  }
};
