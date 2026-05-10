type Mode = "current" | "target" | "comparison";

type Props = {
  value: Mode;
  onChange: (next: Mode) => void;
};

export function GearModeToggle({ value, onChange }: Props) {
  const options: Array<{ id: Mode; label: string }> = [
    { id: "current", label: "Build actuel" },
    { id: "target", label: "Build cible" },
    { id: "comparison", label: "Comparaison" },
  ];

  return (
    <div className="inline-flex rounded-lg border border-border bg-background/50 p-1 gap-1">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-3 py-1.5 text-sm rounded-md transition ${value === o.id ? "bg-gold/15 text-gold border border-gold/50" : "hover:bg-accent/20"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
