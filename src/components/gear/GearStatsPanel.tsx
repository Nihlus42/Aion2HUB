import { groupStats, type ParsedStats } from "@/lib/aion2/gear/statParser";

type Props = {
  title: string;
  stats: ParsedStats;
};

export function GearStatsPanel({ title, stats }: Props) {
  const grouped = groupStats(stats);
  const hasAny = Object.values(grouped).some((arr) => arr.length > 0);
  const formatValue = (label: string, value: number) => {
    const percentLike =
      label.includes("PvE") ||
      label.includes("PvP") ||
      label.toLowerCase().includes("vitesse") ||
      label.toLowerCase().includes("degats critiques");
    return percentLike ? `${value}%` : String(value);
  };

  return (
    <section className="rune-border rounded-xl p-4">
      <h3 className="font-display text-xl mb-3">{title}</h3>
      {!hasAny ? (
        <p className="text-sm text-muted-foreground">Aucune statistique calculable pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).map(([group, entries]) => {
            if (entries.length === 0) return null;
            return (
              <div key={group}>
                <h5 className="text-xs text-gold tracking-wider mb-1">{group}</h5>
                <div className="space-y-1">
                  {entries.map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span>{formatValue(label, value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
