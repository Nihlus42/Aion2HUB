import { GearStatsPanel } from "./GearStatsPanel";
import { GearComparisonPanel } from "./GearComparisonPanel";
import { SelectedItemPanel } from "./SelectedItemPanel";
import type { ParsedStats } from "@/lib/aion2/gear/statParser";
import type { ItemFull, ItemLight } from "@/data";

type Mode = "current" | "target" | "comparison";

type Props = {
  mode: Mode;
  currentStats: ParsedStats;
  targetStats: ParsedStats;
  selectedSlotLabel: string;
  selectedItem: ItemLight | ItemFull | null;
  selectedEnchantLevel: number;
  onChangeEnchant: (level: number) => void;
  importValue: string;
  onImportValueChange: (value: string) => void;
  onExport: () => void;
  onImport: () => void;
  onReset: () => void;
};

export function GearSidebar({
  mode,
  currentStats,
  targetStats,
  selectedSlotLabel,
  selectedItem,
  selectedEnchantLevel,
  onChangeEnchant,
  importValue,
  onImportValueChange,
  onExport,
  onImport,
  onReset,
}: Props) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
      {mode === "current" && <GearStatsPanel title="Statistiques totales" stats={currentStats} />}
      {mode === "target" && <GearStatsPanel title="Statistiques totales" stats={targetStats} />}
      {mode === "comparison" && <GearComparisonPanel current={currentStats} target={targetStats} />}

      <SelectedItemPanel
        slotLabel={selectedSlotLabel}
        item={selectedItem}
        enchantLevel={selectedEnchantLevel}
        onEnchantChange={onChangeEnchant}
      />

      <section className="rune-border rounded-xl p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <button onClick={onExport} className="px-3 py-2 rounded-md border border-gold/40 text-gold text-sm hover:bg-gold/10">
            Exporter le build
          </button>
          <button onClick={onImport} className="px-3 py-2 rounded-md border border-border text-sm hover:bg-accent/20">
            Importer un build
          </button>
          <button onClick={onReset} className="px-3 py-2 rounded-md border border-border text-sm hover:bg-accent/20">
            Reinitialiser
          </button>
        </div>
        <textarea
          value={importValue}
          onChange={(e) => onImportValueChange(e.target.value)}
          placeholder="JSON exporte/importe..."
          className="w-full min-h-28 bg-background/60 border border-border rounded-md px-3 py-2 text-xs"
        />
      </section>
    </aside>
  );
}
