import type { ParsedStats } from "@/lib/aion2/gear/statParser";

type Props = {
  title: string;
  stats: ParsedStats;
};

export function GearStatsPanel({ title, stats }: Props) {
  const entries = Object.entries(stats).filter(([, v]) => Number.isFinite(v) && v !== 0);
  return (
    <section className="rune-border rounded-xl p-4">
      <h3 className="font-display text-xl mb-3">{title}</h3>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune statistique calculable.</p>
      ) : (
        <div className="space-y-1.5">
          {entries.map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
