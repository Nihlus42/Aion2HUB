import { cleanItemForDisplay, type ItemLight } from "@/data";

type Props = {
  slotLabel: string;
  item: ItemLight | null;
  enchantLevel: number;
  onSelect: () => void;
  onRemove: () => void;
};

export function GearSlot({ slotLabel, item, enchantLevel, onSelect, onRemove }: Props) {
  const view = item ? cleanItemForDisplay(item) : null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
      className="group relative w-full h-[82px] rounded-xl border border-border/70 bg-background/60 hover:border-gold/50 transition p-2 text-left cursor-pointer"
      title={view ? view.name : slotLabel}
    >
      {!view ? (
        <div className="h-full flex flex-col justify-center">
          <div className="text-[11px] text-muted-foreground">{slotLabel}</div>
          <div className="text-sm">Vide</div>
        </div>
      ) : (
        <div className="h-full flex gap-2">
          {view.image ? (
            <img src={view.image} alt={view.name} className="w-11 h-11 rounded-md border border-border object-cover shrink-0" loading="lazy" />
          ) : (
            <div className="w-11 h-11 rounded-md border border-border bg-accent/20 shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <div className="text-[11px] text-muted-foreground truncate">{slotLabel}</div>
            <div className="text-sm font-medium truncate">{enchantLevel > 0 ? `+${enchantLevel} ` : ""}{view.name}</div>
            <div className="text-[11px] text-muted-foreground truncate">{view.gradeFr ?? "-"}</div>
          </div>
        </div>
      )}

      {view && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition text-[10px] px-1.5 py-0.5 rounded border border-border bg-card"
        >
          Retirer
        </button>
      )}
    </div>
  );
}
