import { useMemo, useState } from "react";
import { cleanItemForDisplay, itemsLight } from "@/data";
import type { GearSlotId } from "@/lib/aion2/gear/slotDefinitions";
import { isItemCompatibleWithSlot } from "@/lib/aion2/gear/slotMapping";

type Props = {
  open: boolean;
  slotId: GearSlotId | null;
  onClose: () => void;
  onPick: (itemId: string) => void;
};

export function ItemPickerModal({ open, slotId, onClose, onPick }: Props) {
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("all");
  const [minLevel, setMinLevel] = useState("");
  const [tradable, setTradable] = useState("all");

  const list = useMemo(() => {
    if (!slotId) return [];
    const q = query.trim().toLowerCase();
    return itemsLight
      .map((item) => ({ raw: item, view: cleanItemForDisplay(item) }))
      .filter(({ view }) => isItemCompatibleWithSlot(view, slotId))
      .filter(({ view }) => {
        if (q && !view.searchText.includes(q)) return false;
        if (grade !== "all" && (view.gradeEn ?? "").toLowerCase() !== grade) return false;
        if (tradable !== "all") {
          if (tradable === "yes" && view.tradable !== true) return false;
          if (tradable === "no" && view.tradable !== false) return false;
        }
        if (minLevel.trim()) {
          const min = Number(minLevel);
          if (Number.isFinite(min)) {
            const value = view.minLevelRequirement ?? 0;
            if (value < min) return false;
          }
        }
        return true;
      })
      .slice(0, 120);
  }, [slotId, query, grade, minLevel, tradable]);

  if (!open || !slotId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-xl border border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display text-2xl">Selection d objet</h3>
          <button onClick={onClose} className="px-3 py-1 rounded border border-border text-sm">Fermer</button>
        </div>
        <div className="p-4 grid gap-3 md:grid-cols-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher..." className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm" />
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
            <option value="all">Rareté</option>
            <option value="common">Commun</option>
            <option value="rare">Rare</option>
            <option value="unique">Unique</option>
            <option value="legend">Légendaire</option>
            <option value="epic">Épique</option>
            <option value="heroic">Héroïque</option>
          </select>
          <input value={minLevel} onChange={(e) => setMinLevel(e.target.value)} placeholder="Niveau min" className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm" />
          <select value={tradable} onChange={(e) => setTradable(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
            <option value="all">Échange</option>
            <option value="yes">Échangeable</option>
            <option value="no">Lié</option>
          </select>
        </div>
        <div className="p-4 pt-0 overflow-auto max-h-[65vh] grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {list.map(({ raw, view }) => (
            <button key={raw.id} onClick={() => onPick(raw.id)} className="text-left rounded-lg border border-border bg-background/40 p-3 hover:border-gold/50">
              <div className="flex gap-3">
                {view.image ? <img src={view.image} alt={view.name} className="w-11 h-11 rounded border border-border object-cover" loading="lazy" /> : <div className="w-11 h-11 rounded border border-border bg-accent/20" />}
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{view.name}</div>
                  <div className="text-xs text-muted-foreground">{view.categoryFr ?? "Inconnu"} - {view.subCategory ?? "Inconnu"}</div>
                  <div className="text-xs text-muted-foreground">{view.gradeFr ?? "Inconnu"} {view.minLevelRequirement ? `- Niv. ${view.minLevelRequirement}` : ""}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
