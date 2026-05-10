import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { ItemLight } from "@/data";
import { cleanItemForDisplay } from "@/data";

type ItemCardProps = {
  item: ItemLight;
};

function ItemIcon({ src, alt }: { src: string | null; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="h-12 w-12 rounded-md border border-border/70 bg-accent/30 flex items-center justify-center text-[9px] tracking-[0.2em] text-muted-foreground">
        OBJET
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-12 w-12 rounded-md border border-border/70 bg-background/40 object-contain p-1"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

export function ItemCard({ item }: ItemCardProps) {
  const view = cleanItemForDisplay(item);

  return (
    <Link to="/items/$id" params={{ id: item.id }} className="rune-border rounded-xl p-4 block hover:border-gold/40 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <ItemIcon src={view.image} alt={view.name} />
        <div className="min-w-0">
          <h2 className="font-display text-lg leading-tight">{view.name}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {(view.categoryFr ?? "Inconnu")}
            {view.mainCategoryFr ? ` • ${view.mainCategoryFr}` : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-2">
        {view.gradeFr ? (
          <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-gold/35 bg-gold/10 text-gold">
            {view.gradeFr}
          </span>
        ) : null}
        <span className={`text-[10px] tracking-[0.12em] px-2 py-1 rounded border ${view.tradable ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-300" : "border-rose-400/35 bg-rose-400/10 text-rose-300"}`}>
          {view.tradable ? "Échangeable" : "Lié"}
        </span>
        {view.minLevelRequirement !== null ? (
          <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-border/60 bg-background/40 text-muted-foreground">
            Niv. min {view.minLevelRequirement}
          </span>
        ) : null}
      </div>

      {view.optionsFr.length > 0 ? (
        <ul className="text-xs text-muted-foreground space-y-1">
          {view.optionsFr.slice(0, 4).map((opt, i) => (
            <li key={`${item.id}-opt-${i}`} className="truncate">{opt}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-3 pt-2 border-t border-border/60 text-[10px] text-amber-300/90 tracking-[0.12em]">
        Base communautaire
      </div>
    </Link>
  );
}
