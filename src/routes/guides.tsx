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
    <div className="container mx-auto px-4 py-14">
      <header className="mb-12 animate-fade-up">
        <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] mb-3">
          <span className="h-px w-6 bg-gold/60" />KNOWLEDGE OF THE DAEVAS
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Guides</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">Curated by veterans. Updated every patch.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rune-border rune-border-hover rounded-xl p-4 text-left transition-all animate-fade-up ${isActive ? "shadow-gold-glow ring-1 ring-gold/60" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <Icon className={`w-5 h-5 mb-2 transition-colors ${isActive ? "text-gold" : "text-primary"}`} />
              <div className={`font-display text-sm transition-colors ${isActive ? "text-gold" : ""}`}>{cat.label}</div>
              <div className="text-xs text-muted-foreground">{cat.desc}</div>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((g, i) => (
          <article
            key={g.id}
            className="rune-border rune-border-hover rounded-xl p-6 cursor-pointer group relative overflow-hidden animate-fade-up"
            style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,oklch(0.72_0.18_240/0.08),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] tracking-[0.25em] px-2.5 py-1 rounded bg-gradient-arcane text-primary-foreground shadow-glow">
                  {g.category.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {g.readTime} min
                </span>
              </div>
              <h2 className="font-display text-xl mb-2 group-hover:text-gold transition-colors">{g.title}</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{g.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border/50">
                <div className="w-7 h-7 rounded-full bg-gradient-gold shadow-gold-glow" />
                By <span className="text-foreground font-medium">{g.author}</span>
              </div>
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
