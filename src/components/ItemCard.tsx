import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Item } from "@/data";
import { cleanItemForDisplay } from "@/data";

type ItemCardProps = {
  item: Item;
};

function ItemIcon({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="h-14 w-14 rounded-md border border-border/70 bg-accent/30 flex items-center justify-center text-[10px] tracking-[0.2em] text-muted-foreground">
        OBJET
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-14 w-14 rounded-md border border-border/70 bg-background/40 object-contain p-1"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

export function ItemCard({ item }: ItemCardProps) {
  const view = cleanItemForDisplay(item);
  const hasQualityBadge = view.quality.toLowerCase() !== "inconnu";
  const showCooldown = item.category.toLowerCase() === "usable" && view.cooldown !== null;

  return (
    <Link
      key={item.id}
      to="/items/$id"
      params={{ id: item.id }}
      className="rune-border rounded-xl p-5 block hover:border-gold/40 transition-colors"
    >
      <div className="flex items-start gap-4 mb-4">
        <ItemIcon src={view.icon} alt={view.name} />
        <div className="min-w-0">
          <h2 className="font-display text-xl leading-tight">{view.name}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {view.category} - {view.subCategory}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-gold/35 bg-gold/10 text-gold">
              {view.rarity}
            </span>
            {hasQualityBadge ? (
              <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-primary/35 bg-primary/10 text-primary">
                {view.quality}
              </span>
            ) : null}
            <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">
              Base communautaire
            </span>
          </div>
        </div>
      </div>

      {view.description ? (
        <p className="text-sm text-muted-foreground leading-relaxed">{view.description}</p>
      ) : null}

      {showCooldown ? (
        <div className="mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground">
          <span className="text-gold">Recharge :</span> {view.cooldown}
        </div>
      ) : null}
    </Link>
  );
}
