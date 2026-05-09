import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { classes, type ClassRole, type ClassFaction } from "@/data/aion";
import { Shield, Sword, Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Classes — Aion 2 Hub" },
      { name: "description", content: "Browse all Aion 2 classes with role, faction and difficulty filters." },
    ],
  }),
  component: ClassesPage,
});

const roleIcon: Record<ClassRole, typeof Shield> = {
  Tank: Shield, DPS: Sword, Healer: Heart, Support: Sparkles,
};

const roles: ("All" | ClassRole)[] = ["All", "Tank", "DPS", "Healer", "Support"];
const factions: ("All" | ClassFaction)[] = ["All", "Elyos", "Asmodian", "Both"];

function ClassesPage() {
  const [role, setRole] = useState<(typeof roles)[number]>("All");
  const [faction, setFaction] = useState<(typeof factions)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => classes.filter((c) =>
    (role === "All" || c.role === role) &&
    (faction === "All" || c.faction === faction) &&
    (query === "" || c.name.toLowerCase().includes(query.toLowerCase()))
  ), [role, faction, query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10">
        <div className="text-gold text-xs tracking-widest mb-2">CHOOSE YOUR PATH</div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Classes of Atreia</h1>
        <p className="text-muted-foreground max-w-2xl">Eight unique paths await. Filter by role, faction, or search to find your calling.</p>
      </header>

      {/* Filters */}
      <div className="rune-border rounded-xl p-5 mb-8 grid gap-4 md:grid-cols-[1fr_auto_auto]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search class..."
          className="bg-background/60 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary"
        />
        <div className="flex gap-1 flex-wrap">
          {roles.map((r) => (
            <button key={r} onClick={() => setRole(r)}
              className={`px-3 py-2 text-xs tracking-widest rounded-md border transition ${role === r ? "bg-gold text-gold-foreground border-gold" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {r.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {factions.map((f) => (
            <button key={f} onClick={() => setFaction(f)}
              className={`px-3 py-2 text-xs tracking-widest rounded-md border transition ${faction === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Class grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => {
          const Icon = roleIcon[c.role];
          return (
            <article key={c.id} className="rune-border rounded-xl p-6 hover:shadow-glow transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-arcane flex items-center justify-center shadow-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`w-1.5 h-4 rounded-sm ${i <= c.difficulty ? "bg-gold" : "bg-border"}`} />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-2xl mb-1 group-hover:text-gold transition-colors">{c.name}</h3>
              <p className="text-sm text-muted-foreground italic mb-3">{c.tagline}</p>
              <div className="flex gap-2 mb-4">
                <span className="text-[10px] tracking-widest px-2 py-0.5 rounded bg-accent/40 text-foreground">{c.role.toUpperCase()}</span>
                <span className="text-[10px] tracking-widest px-2 py-0.5 rounded bg-accent/40 text-foreground">{c.faction.toUpperCase()}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{c.description}</p>
              <div className="border-t border-border pt-3">
                <div className="text-xs text-gold tracking-widest mb-2">SIGNATURE SKILLS</div>
                <ul className="text-sm space-y-1">
                  {c.signatureSkills.map((s) => <li key={s} className="text-muted-foreground">• {s}</li>)}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No classes match your filters.</div>
      )}
    </div>
  );
}
