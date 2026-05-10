import type { ParsedStats } from "@/lib/aion2/gear/statParser";

type Props = {
  current: ParsedStats;
  target: ParsedStats;
};

export function GearComparisonPanel({ current, target }: Props) {
  const keys = Array.from(new Set([...Object.keys(current), ...Object.keys(target)])).sort();
  return (
    <section className="rune-border rounded-xl p-4">
      <h3 className="font-display text-xl mb-3">Comparaison</h3>
      {keys.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune difference a afficher.</p>
      ) : (
        <div className="space-y-1.5">
          {keys.map((k) => {
            const a = current[k] ?? 0;
            const b = target[k] ?? 0;
            const d = b - a;
            const cls = d > 0 ? "text-emerald-300" : d < 0 ? "text-rose-300" : "text-muted-foreground";
            return (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className={cls}>{d > 0 ? `+${d}` : d}</span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
