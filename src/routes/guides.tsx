import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { guides, type GuideCategory } from "@/data/aion";
import { BookOpen, Zap, Swords, Skull, Clock } from "lucide-react";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Guides — Aion 2 Hub" },
      { name: "description", content: "Beginner, leveling, PvP and PvE guides for Aion 2." },
    ],
  }),
  component: GuidesPage,
});

const categories: { id: "all" | GuideCategory; label: string; icon: typeof BookOpen; desc: string }[] = [
  { id: "all", label: "All", icon: BookOpen, desc: "Every guide" },
  { id: "beginner", label: "Beginner", icon: BookOpen, desc: "Start here" },
  { id: "leveling", label: "Leveling", icon: Zap, desc: "Hit max fast" },
  { id: "pvp", label: "PvP", icon: Swords, desc: "Win the abyss" },
  { id: "pve", label: "PvE", icon: Skull, desc: "Conquer dungeons" },
];

function GuidesPage() {
  const [active, setActive] = useState<"all" | GuideCategory>("all");
  const filtered = active === "all" ? guides : guides.filter((g) => g.category === active);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10">
        <div className="text-gold text-xs tracking-widest mb-2">KNOWLEDGE OF THE DAEVAS</div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Guides</h1>
        <p className="text-muted-foreground max-w-2xl">Curated by veterans. Updated every patch.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <button key={cat.id} onClick={() => setActive(cat.id)}
              className={`rune-border rounded-xl p-4 text-left transition-all ${isActive ? "shadow-glow ring-1 ring-primary" : "hover:shadow-glow"}`}>
              <Icon className={`w-5 h-5 mb-2 ${isActive ? "text-gold" : "text-primary"}`} />
              <div className="font-display text-sm">{cat.label}</div>
              <div className="text-xs text-muted-foreground">{cat.desc}</div>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((g) => (
          <article key={g.id} className="rune-border rounded-xl p-6 hover:shadow-glow transition cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] tracking-widest px-2 py-1 rounded bg-gradient-arcane text-primary-foreground">
                {g.category.toUpperCase()}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {g.readTime} min
              </span>
            </div>
            <h2 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">{g.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{g.excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-6 h-6 rounded-full bg-gradient-gold" />
              By <span className="text-foreground font-medium">{g.author}</span>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No guides yet in this category.</div>
      )}
    </div>
  );
}
