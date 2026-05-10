import { useEffect, useMemo, useState } from "react";
import { cleanItemForDisplay, getItemById, itemsById, itemsLight, type ItemLight } from "@/data";
import { classOptions, gearSlots, type GearSlotId } from "@/lib/aion2/gear/slotDefinitions";
import { sumStats } from "@/lib/aion2/gear/statParser";
import { loadGearBuild, saveGearBuild, type GearBuildState } from "@/lib/aion2/gear/buildStorage";
import { exportBuildJson, importBuildJson } from "@/lib/aion2/gear/buildEncoding";
import { GearSlot } from "./GearSlot";
import { ItemPickerModal } from "./ItemPickerModal";
import { GearStatsPanel } from "./GearStatsPanel";
import { GearComparisonPanel } from "./GearComparisonPanel";

const emptyBuild = (): Partial<Record<GearSlotId, string>> => ({});

export function GearPlanner() {
  const [classSlug, setClassSlug] = useState<string>(classOptions[0].slug);
  const [currentBuild, setCurrentBuild] = useState<Partial<Record<GearSlotId, string>>>(emptyBuild());
  const [targetBuild, setTargetBuild] = useState<Partial<Record<GearSlotId, string>>>(emptyBuild());
  const [editing, setEditing] = useState<{ mode: "current" | "target"; slotId: GearSlotId } | null>(null);
  const [importValue, setImportValue] = useState("");

  useEffect(() => {
    const saved = loadGearBuild();
    if (!saved) return;
    setClassSlug(saved.classSlug);
    setCurrentBuild(saved.currentBuild ?? {});
    setTargetBuild(saved.targetBuild ?? {});
  }, []);

  useEffect(() => {
    const state: GearBuildState = { classSlug, currentBuild, targetBuild };
    saveGearBuild(state);
  }, [classSlug, currentBuild, targetBuild]);

  const byLightId = useMemo(() => {
    const m = new Map<string, ItemLight>();
    for (const it of itemsLight) m.set(it.id, it);
    return m;
  }, []);

  const currentItems = useMemo(
    () =>
      gearSlots
        .map((slot) => currentBuild[slot.id])
        .filter((id): id is string => Boolean(id))
        .map((id) => cleanItemForDisplay(byLightId.get(id) ?? (itemsById[id] as any)))
        .filter(Boolean),
    [currentBuild, byLightId],
  );

  const targetItems = useMemo(
    () =>
      gearSlots
        .map((slot) => targetBuild[slot.id])
        .filter((id): id is string => Boolean(id))
        .map((id) => cleanItemForDisplay(byLightId.get(id) ?? (itemsById[id] as any)))
        .filter(Boolean),
    [targetBuild, byLightId],
  );

  const currentStats = useMemo(() => sumStats(currentItems), [currentItems]);
  const targetStats = useMemo(() => sumStats(targetItems), [targetItems]);

  const onPickItem = (itemId: string) => {
    if (!editing) return;
    if (editing.mode === "current") setCurrentBuild((prev) => ({ ...prev, [editing.slotId]: itemId }));
    else setTargetBuild((prev) => ({ ...prev, [editing.slotId]: itemId }));
    setEditing(null);
  };

  const onRemoveItem = (mode: "current" | "target", slotId: GearSlotId) => {
    if (mode === "current") setCurrentBuild((prev) => ({ ...prev, [slotId]: undefined }));
    else setTargetBuild((prev) => ({ ...prev, [slotId]: undefined }));
  };

  const onReset = () => {
    setCurrentBuild(emptyBuild());
    setTargetBuild(emptyBuild());
  };

  const onExport = () => {
    setImportValue(exportBuildJson({ classSlug, currentBuild, targetBuild }));
  };

  const onImport = () => {
    const parsed = importBuildJson(importValue);
    if (!parsed) return;
    setClassSlug(parsed.classSlug);
    setCurrentBuild(parsed.currentBuild);
    setTargetBuild(parsed.targetBuild);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl mb-2">Planificateur d equipement</h1>
        <p className="text-sm text-muted-foreground">Prepare ton build, compare tes equipements et visualise tes statistiques.</p>
      </header>

      <section className="rune-border rounded-xl p-4 mb-6">
        <label className="text-sm">
          <span className="block text-xs text-muted-foreground mb-1">Classe</span>
          <select value={classSlug} onChange={(e) => setClassSlug(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2">
            {classOptions.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </label>
      </section>

      <div className="grid xl:grid-cols-[1fr_1fr_340px] gap-5">
        <section className="space-y-3">
          <h2 className="font-display text-2xl">Build actuel</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {gearSlots.map((slot) => (
              <GearSlot
                key={`current-${slot.id}`}
                label={slot.label}
                item={currentBuild[slot.id] ? (byLightId.get(currentBuild[slot.id]!) ?? (getItemById(currentBuild[slot.id]!) as any)) : null}
                onChange={() => setEditing({ mode: "current", slotId: slot.id })}
                onRemove={() => onRemoveItem("current", slot.id)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-2xl">Build cible</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {gearSlots.map((slot) => (
              <GearSlot
                key={`target-${slot.id}`}
                label={slot.label}
                item={targetBuild[slot.id] ? (byLightId.get(targetBuild[slot.id]!) ?? (getItemById(targetBuild[slot.id]!) as any)) : null}
                onChange={() => setEditing({ mode: "target", slotId: slot.id })}
                onRemove={() => onRemoveItem("target", slot.id)}
              />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <GearStatsPanel title="Statistiques totales (actuel)" stats={currentStats} />
          <GearStatsPanel title="Statistiques totales (cible)" stats={targetStats} />
          <GearComparisonPanel current={currentStats} target={targetStats} />
        </aside>
      </div>

      <section className="rune-border rounded-xl p-4 mt-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <button onClick={onExport} className="px-3 py-2 rounded-md border border-gold/40 text-gold text-sm hover:bg-gold/10">Exporter le build</button>
          <button onClick={onImport} className="px-3 py-2 rounded-md border border-border text-sm hover:bg-accent/20">Importer un build</button>
          <button onClick={onReset} className="px-3 py-2 rounded-md border border-border text-sm hover:bg-accent/20">Reinitialiser</button>
        </div>
        <textarea value={importValue} onChange={(e) => setImportValue(e.target.value)} placeholder="JSON exporte/importe..." className="w-full min-h-28 bg-background/60 border border-border rounded-md px-3 py-2 text-xs" />
      </section>

      <ItemPickerModal open={Boolean(editing)} slotId={editing?.slotId ?? null} onClose={() => setEditing(null)} onPick={onPickItem} />
    </div>
  );
}
