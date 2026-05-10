import { useEffect, useMemo, useState } from "react";
import { getItemById, itemsById, itemsLight, type ItemLight } from "@/data";
import { classOptions, gearSlots, type GearSlotId } from "@/lib/aion2/gear/slotDefinitions";
import { sumStats } from "@/lib/aion2/gear/statParser";
import { loadGearBuild, saveGearBuild, type EquippedItem, type GearBuildSlots, type GearBuildState } from "@/lib/aion2/gear/buildStorage";
import { exportBuildJson, importBuildJson } from "@/lib/aion2/gear/buildEncoding";
import { ItemPickerModal } from "./ItemPickerModal";
import { GearPaperDoll } from "./GearPaperDoll";
import { GearModeToggle } from "./GearModeToggle";
import { GearSidebar } from "./GearSidebar";

const emptyBuild = (): GearBuildSlots => ({});

type Mode = "current" | "target" | "comparison";

const slotLabelById = new Map(gearSlots.map((s) => [s.id, s.label]));

const resolveItem = (itemId?: string): ItemLight | null => {
  if (!itemId) return null;
  return (itemsLight.find((it) => it.id === itemId) ?? (getItemById(itemId) as any) ?? (itemsById[itemId] as any) ?? null) as ItemLight | null;
};

export function GearPlanner() {
  const [classSlug, setClassSlug] = useState<string>(classOptions[0].slug);
  const [activeMode, setActiveMode] = useState<Mode>("current");
  const [currentBuild, setCurrentBuild] = useState<GearBuildSlots>(emptyBuild());
  const [targetBuild, setTargetBuild] = useState<GearBuildSlots>(emptyBuild());
  const [editing, setEditing] = useState<{ mode: "current" | "target"; slotId: GearSlotId } | null>(null);
  const [focusedSlot, setFocusedSlot] = useState<{ mode: "current" | "target"; slotId: GearSlotId } | null>(null);
  const [importValue, setImportValue] = useState("");

  useEffect(() => {
    const saved = loadGearBuild();
    if (!saved) return;
    setClassSlug(saved.classSlug);
    setCurrentBuild(saved.currentBuild ?? {});
    setTargetBuild(saved.targetBuild ?? {});
    if (saved.activeMode === "current" || saved.activeMode === "target" || saved.activeMode === "comparison") {
      setActiveMode(saved.activeMode);
    }
  }, []);

  useEffect(() => {
    const state: GearBuildState = { classSlug, activeMode, currentBuild, targetBuild };
    saveGearBuild(state);
  }, [classSlug, activeMode, currentBuild, targetBuild]);

  const currentItems = useMemo(
    () =>
      gearSlots
        .map((slot) => currentBuild[slot.id])
        .filter((entry): entry is EquippedItem => Boolean(entry?.itemId))
        .map((entry) => ({ item: resolveItem(entry.itemId) }))
        .filter((x): x is { item: ItemLight } => Boolean(x.item))
        .map(({ item }) => ({ item: { ...item }, enchantLevel: gearSlots.map((s) => currentBuild[s.id]).find((e) => e?.itemId === item.id)?.enchantLevel ?? 0 }))
    ,
    [currentBuild],
  );

  const targetItems = useMemo(
    () =>
      gearSlots
        .map((slot) => targetBuild[slot.id])
        .filter((entry): entry is EquippedItem => Boolean(entry?.itemId))
        .map((entry) => ({ item: resolveItem(entry.itemId) }))
        .filter((x): x is { item: ItemLight } => Boolean(x.item))
        .map(({ item }) => ({ item: { ...item }, enchantLevel: gearSlots.map((s) => targetBuild[s.id]).find((e) => e?.itemId === item.id)?.enchantLevel ?? 0 }))
    ,
    [targetBuild],
  );

  const currentStats = useMemo(
    () =>
      sumStats(
        gearSlots
          .map((slot) => ({ slot, entry: currentBuild[slot.id] }))
          .filter(({ entry }) => Boolean(entry?.itemId))
          .map(({ entry }) => ({ item: resolveItem(entry!.itemId) }))
          .filter((x): x is { item: ItemLight } => Boolean(x.item))
          .map(({ item }) => {
            const slotEntry = Object.values(currentBuild).find((e) => e?.itemId === item.id);
            return { item: item as any, enchantLevel: slotEntry?.enchantLevel ?? 0 };
          }),
      ),
    [currentBuild],
  );

  const targetStats = useMemo(
    () =>
      sumStats(
        gearSlots
          .map((slot) => ({ slot, entry: targetBuild[slot.id] }))
          .filter(({ entry }) => Boolean(entry?.itemId))
          .map(({ entry }) => ({ item: resolveItem(entry!.itemId) }))
          .filter((x): x is { item: ItemLight } => Boolean(x.item))
          .map(({ item }) => {
            const slotEntry = Object.values(targetBuild).find((e) => e?.itemId === item.id);
            return { item: item as any, enchantLevel: slotEntry?.enchantLevel ?? 0 };
          }),
      ),
    [targetBuild],
  );

  const buildToDisplay = activeMode === "target" ? targetBuild : currentBuild;
  const editingMode: "current" | "target" = activeMode === "target" ? "target" : "current";

  const onPickItem = (itemId: string) => {
    if (!editing) return;
    const update = (prev: GearBuildSlots) => ({ ...prev, [editing.slotId]: { itemId, enchantLevel: prev[editing.slotId]?.enchantLevel ?? 0 } });
    if (editing.mode === "current") setCurrentBuild(update);
    else setTargetBuild(update);
    setFocusedSlot({ mode: editing.mode, slotId: editing.slotId });
    setEditing(null);
  };

  const onRemoveItem = (mode: "current" | "target", slotId: GearSlotId) => {
    if (mode === "current") setCurrentBuild((prev) => ({ ...prev, [slotId]: undefined }));
    else setTargetBuild((prev) => ({ ...prev, [slotId]: undefined }));
  };

  const onReset = () => {
    setCurrentBuild(emptyBuild());
    setTargetBuild(emptyBuild());
    setFocusedSlot(null);
  };

  const onExport = () => {
    setImportValue(exportBuildJson({ classSlug, activeMode, currentBuild, targetBuild }));
  };

  const onImport = () => {
    const parsed = importBuildJson(importValue);
    if (!parsed) return;
    setClassSlug(parsed.classSlug);
    setCurrentBuild(parsed.currentBuild);
    setTargetBuild(parsed.targetBuild);
    setActiveMode(parsed.activeMode ?? "current");
  };

  const selectedContext = focusedSlot ?? { mode: editingMode, slotId: gearSlots[0].id };
  const selectedBuild = selectedContext.mode === "target" ? targetBuild : currentBuild;
  const selectedEntry = selectedBuild[selectedContext.slotId];
  const selectedItem = selectedEntry?.itemId ? resolveItem(selectedEntry.itemId) : null;

  const onChangeEnchant = (level: number) => {
    const mode = selectedContext.mode;
    const slotId = selectedContext.slotId;
    if (mode === "current") {
      setCurrentBuild((prev) => {
        const existing = prev[slotId];
        if (!existing?.itemId) return prev;
        return { ...prev, [slotId]: { ...existing, enchantLevel: level } };
      });
    } else {
      setTargetBuild((prev) => {
        const existing = prev[slotId];
        if (!existing?.itemId) return prev;
        return { ...prev, [slotId]: { ...existing, enchantLevel: level } };
      });
    }
  };

  const slotDiffs = useMemo(() => {
    return gearSlots
      .map((slot) => {
        const c = currentBuild[slot.id];
        const t = targetBuild[slot.id];
        const sameItem = (c?.itemId ?? "") === (t?.itemId ?? "");
        const sameEnchant = (c?.enchantLevel ?? 0) === (t?.enchantLevel ?? 0);
        if (sameItem && sameEnchant) return null;
        const currentName = c?.itemId ? resolveItem(c.itemId)?.nameFr ?? c.itemId : "Vide";
        const targetName = t?.itemId ? resolveItem(t.itemId)?.nameFr ?? t.itemId : "Vide";
        return {
          slot: slot.label,
          current: `${c?.enchantLevel ? `+${c.enchantLevel} ` : ""}${currentName}`,
          target: `${t?.enchantLevel ? `+${t.enchantLevel} ` : ""}${targetName}`,
        };
      })
      .filter(Boolean) as Array<{ slot: string; current: string; target: string }>;
  }, [currentBuild, targetBuild]);

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="font-display text-4xl mb-2">Planificateur d equipement</h1>
        <p className="text-sm text-muted-foreground">Prepare ton build, compare tes equipements et visualise tes statistiques.</p>
        <div className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-100/90">
          <span className="font-semibold">En cours de developpement.</span> Cet outil est encore en cours de developpement. Les statistiques, filtres et calculs peuvent evoluer avec les prochaines mises a jour des donnees Aion 2.
        </div>
      </header>

      <section className="rune-border rounded-xl p-4 mb-5 grid gap-3 lg:grid-cols-[1fr_auto] items-end">
        <label className="text-sm">
          <span className="block text-xs text-muted-foreground mb-1">Classe</span>
          <select value={classSlug} onChange={(e) => setClassSlug(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 min-w-52">
            {classOptions.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </label>
        <GearModeToggle value={activeMode} onChange={setActiveMode} />
      </section>

      <div className="grid xl:grid-cols-[1fr_360px] gap-5">
        <div className="space-y-4">
          {activeMode !== "comparison" ? (
            <GearPaperDoll
              build={buildToDisplay}
              onSelectSlot={(slotId) => {
                setEditing({ mode: editingMode, slotId });
                setFocusedSlot({ mode: editingMode, slotId });
              }}
              onRemoveSlot={(slotId) => onRemoveItem(editingMode, slotId)}
              onFocusItem={(slotId) => setFocusedSlot({ mode: editingMode, slotId })}
            />
          ) : (
            <section className="rune-border rounded-xl p-4">
              <h3 className="font-display text-xl mb-3">Comparaison des slots</h3>
              {slotDiffs.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune difference a afficher.</p>
              ) : (
                <div className="space-y-2">
                  {slotDiffs.map((d) => (
                    <div key={d.slot} className="rounded-lg border border-border p-2 text-sm">
                      <p className="text-muted-foreground text-xs">{d.slot}</p>
                      <p><span className="text-rose-300">Actuel:</span> {d.current}</p>
                      <p><span className="text-emerald-300">Cible:</span> {d.target}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        <GearSidebar
          mode={activeMode}
          currentStats={currentStats}
          targetStats={targetStats}
          selectedSlotLabel={slotLabelById.get(selectedContext.slotId) ?? "Slot"}
          selectedItem={selectedItem}
          selectedEnchantLevel={selectedEntry?.enchantLevel ?? 0}
          onChangeEnchant={onChangeEnchant}
          importValue={importValue}
          onImportValueChange={setImportValue}
          onExport={onExport}
          onImport={onImport}
          onReset={onReset}
        />
      </div>

      <ItemPickerModal open={Boolean(editing)} slotId={editing?.slotId ?? null} onClose={() => setEditing(null)} onPick={onPickItem} />
    </div>
  );
}
