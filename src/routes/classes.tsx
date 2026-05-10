import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { classes, type ClassRole, type ClassFaction } from "@/data";
import { Shield, Sword, Heart, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/Ornament";

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
    <div className="container mx-auto px-4 py-14">
      <header className="mb-12 animate-fade-up">
        <Eyebrow>CHOOSE YOUR PATH</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Classes of Atreia</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">Eight unique paths await. Filter by role, faction, or search to find your calling.</p>
      </header>

      {/* Filters */}
      <div className="rune-border rounded-xl p-5 mb-10 grid gap-4 md:grid-cols-[1fr_auto_auto]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search class..."
          className="bg-background/60 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40 transition"
        />
        <div className="flex gap-1 flex-wrap">
          {roles.map((r) => (
            <button key={r} onClick={() => setRole(r)}
              className={`px-3 py-2 text-xs tracking-[0.2em] rounded-md border transition-all ${role === r ? "bg-gold text-gold-foreground border-gold shadow-gold-glow" : "border-border text-muted-foreground hover:text-gold hover:border-gold/50"}`}>
              {r.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {factions.map((f) => (
            <button key={f} onClick={() => setFaction(f)}
              className={`px-3 py-2 text-xs tracking-[0.2em] rounded-md border transition-all ${faction === f ? "bg-primary text-primary-foreground border-primary shadow-glow" : "border-border text-muted-foreground hover:text-primary hover:border-primary/50"}`}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Class grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c, i) => {
          const Icon = roleIcon[c.role];
          return (
            <a
              key={c.slug}
              href={`/skills?classSlug=${c.slug}`}
              className="block h-full rune-border rune-border-hover rounded-xl p-6 group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-start justify-between mb-4 relative">
                <div className="w-12 h-12 rounded-lg bg-gradient-arcane flex items-center justify-center shadow-glow group-hover:animate-pulse-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex gap-1" title={`Difficulty ${c.difficulty}/5`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`w-1.5 h-4 rounded-sm transition-colors ${i <= c.difficulty ? "bg-gradient-gold" : "bg-border"}`} />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-2xl mb-1 group-hover:text-gold transition-colors">{c.name}</h3>
              <div className="mb-3">
                <span className="inline-block text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">
                  Community info / Subject to change
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="text-[10px] tracking-[0.2em] px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/20">{c.role.toUpperCase()}</span>
                <span className="text-[10px] tracking-[0.2em] px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">{c.faction.toUpperCase()}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.description}</p>
              <div className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
                PvE {c.pveRating}/5 • PvP {c.pvpRating}/5 • {c.combatStyle}
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No classes match your filters.</div>
      )}
    </div>
  );
}

