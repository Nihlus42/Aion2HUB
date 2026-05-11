import { cleanItemForDisplay, type ItemFull, type ItemLight } from "@/data";
import { getAvailableEnchantLevels } from "@/lib/aion2/gear/statParser";

type Props = {
  slotLabel: string;
  item: ItemLight | ItemFull | null;
  enchantLevel: number;
  onEnchantChange: (level: number) => void;
};

export function SelectedItemPanel({ slotLabel, item, enchantLevel, onEnchantChange }: Props) {
  if (!item) {
    return (
      <section className="rune-border rounded-xl p-4">
        <h4 className="font-display text-lg mb-2">Item selectionne</h4>
        <p className="text-sm text-muted-foreground">Selectionne un slot pour voir le detail.</p>
      </section>
    );
  }

  const view = cleanItemForDisplay(item);
  const enchantLevels = getAvailableEnchantLevels(item);

  return (
    <section className="rune-border rounded-xl p-4">
      <h4 className="font-display text-lg mb-2">Item selectionne</h4>
      <p className="text-xs text-muted-foreground mb-2">{slotLabel}</p>
      <div className="flex gap-3">
        {view.image ? (
          <img
            src={view.image}
            alt={view.name}
            className="w-14 h-14 rounded border border-border object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-14 h-14 rounded border border-border bg-accent/20" />
        )}
        <div className="min-w-0">
          <div className="font-medium">
            {enchantLevel > 0 ? `+${enchantLevel} ` : ""}
            {view.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {view.gradeFr ?? "-"} {view.minLevelRequirement ? `- Niv. ${view.minLevelRequirement}` : ""}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {view.categoryFr ?? ""} {view.subCategory ? `- ${view.subCategory}` : ""}
          </div>
        </div>
      </div>

      {enchantLevels.length > 1 && (
        <div className="mt-3">
          <label className="text-xs text-muted-foreground block mb-1">Enchantement</label>
          <select
            value={enchantLevel}
            onChange={(e) => onEnchantChange(Number(e.target.value))}
            className="w-full bg-background/60 border border-border rounded-md px-3 py-2 text-sm"
          >
            {enchantLevels.map((level) => (
              <option key={level} value={level}>{`+${level}`}</option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-3 text-xs text-muted-foreground space-y-1">
        {view.optionsFr.slice(0, 6).map((opt) => (
          <p key={opt}>{opt}</p>
        ))}
      </div>
    </section>
  );
}
