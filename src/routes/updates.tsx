import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { updates, type UpdateCategory } from "@/data";
import { Calendar, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Updates - Aion 2 Hub" },
      { name: "description", content: "Latest placeholder patch notes, news, events, and maintenance updates." },
    ],
  }),
  component: UpdatesPage,
});

const categories: ("All" | UpdateCategory)[] = [
  "All",
  "Patch Notes",
  "News",
  "Events",
  "Maintenance",
];

function sourceStatusClass(status: "confirmed" | "expected" | "placeholder") {
  if (status === "confirmed") return "bg-gold/20 text-gold border border-gold/40";
  if (status === "expected") return "bg-primary/20 text-primary border border-primary/40";
  return "bg-muted/60 text-muted-foreground border border-border";
}

function regionClass(region: "KR" | "Global" | "EU") {
  if (region === "KR") return "bg-primary/15 text-primary border border-primary/30";
  if (region === "EU") return "bg-gold/15 text-gold border border-gold/30";
  return "bg-accent/30 text-foreground border border-border";
}

function UpdatesPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? updates : updates.filter((u) => u.category === active)),
    [active],
  );

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] mb-3">
          <span className="h-px w-6 bg-gold/60" />INTEL FEED
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Updates & Patch Notes</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Placeholder update stream for future official ingestion.
        </p>
      </header>

      <div className="rune-border rounded-xl p-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3 py-1.5 text-xs tracking-widest rounded-md border transition ${
                active === cat
                  ? "bg-gradient-arcane text-primary-foreground border-primary shadow-glow"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((item, i) => (
          <article
            key={item.id}
            className="rune-border rune-border-hover rounded-xl p-6 animate-fade-up relative overflow-hidden"
            style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] tracking-[0.2em] px-2 py-1 rounded bg-gradient-arcane text-primary-foreground">
                  {item.category.toUpperCase()}
                </span>
                <span className={`text-[10px] tracking-[0.2em] px-2 py-1 rounded ${regionClass(item.region)}`}>
                  {item.region}
                </span>
                <span className={`text-[10px] tracking-[0.2em] px-2 py-1 rounded ${sourceStatusClass(item.sourceStatus)}`}>
                  {item.sourceStatus.toUpperCase()}
                </span>
              </div>

              <h2 className="font-display text-2xl mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.summary}</p>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/50">
                <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Updated {item.lastUpdated}
                </div>
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
                  >
                    Source <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

