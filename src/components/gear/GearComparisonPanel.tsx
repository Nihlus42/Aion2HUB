import type { ParsedStats } from "@/lib/aion2/gear/statParser";

type Props = {
  current: ParsedStats;
  target: ParsedStats;
};

export function GearComparisonPanel({ current, target }: Props) {
  const keys = Array.from(new Set([...Object.keys(current), ...Object.keys(target)])).sort();
  const diffs = keys
    .map((k) => ({ key: k, delta: (target[k] ?? 0) - (current[k] ?? 0) }))
    .filter((d) => d.delta !== 0);

  const improves = diffs.filter((d) => d.delta > 0);
  const losses = diffs.filter((d) => d.delta < 0);

  return (
    <section className="rune-border rounded-xl p-4">
      <h3 className="font-display text-xl mb-3">Comparaison</h3>
      {diffs.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune difference a afficher.</p>
      ) : (
        <div className="space-y-3">
          {improves.length > 0 && (
            <div>
              <h5 className="text-xs text-emerald-300 tracking-wider mb-1">Ameliorations</h5>
              <div className="space-y-1">
                {improves.map((d) => (
                  <div key={d.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{d.key}</span>
                    <span className="text-emerald-300">+{d.delta}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {losses.length > 0 && (
            <div>
              <h5 className="text-xs text-rose-300 tracking-wider mb-1">Pertes</h5>
              <div className="space-y-1">
                {losses.map((d) => (
                  <div key={d.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{d.key}</span>
                    <span className="text-rose-300">{d.delta}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
