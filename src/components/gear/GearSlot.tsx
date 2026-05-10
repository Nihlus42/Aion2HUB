import { cleanItemForDisplay, type ItemLight } from "@/data";

type Props = {
  label: string;
  item: ItemLight | null;
  onChange: () => void;
  onRemove: () => void;
};

export function GearSlot({ label, item, onChange, onRemove }: Props) {
  const view = item ? cleanItemForDisplay(item) : null;
  return (
    <article className="rune-border rounded-xl p-3">
      <div className="text-xs text-muted-foreground mb-2">{label}</div>
      {!view ? (
        <div className="text-sm text-muted-foreground min-h-16 flex items-center">Aucun equipement</div>
      ) : (
        <div className="flex gap-3 min-h-16">
          {view.image ? <img src={view.image} alt={view.name} className="w-12 h-12 rounded border border-border object-cover" loading="lazy" /> : <div className="w-12 h-12 rounded border border-border bg-accent/20" />}
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{view.name}</div>
            <div className="text-xs text-muted-foreground">{view.gradeFr ?? "Inconnu"} {view.minLevelRequirement ? `- Niv. ${view.minLevelRequirement}` : ""}</div>
            <div className="text-[11px] text-muted-foreground truncate">{view.optionsFr.slice(0, 2).join(" | ")}</div>
          </div>
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <button onClick={onChange} className="px-2.5 py-1.5 rounded border border-gold/40 text-gold text-xs hover:bg-gold/10">Changer</button>
        <button onClick={onRemove} className="px-2.5 py-1.5 rounded border border-border text-xs hover:bg-accent/20">Retirer</button>
      </div>
    </article>
  );
}
