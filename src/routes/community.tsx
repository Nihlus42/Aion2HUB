import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { guilds } from "@/data/aion";
import { Users, Globe, Search } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Aion 2 Hub" },
      { name: "description", content: "Find a guild on your server, region and play style." },
    ],
  }),
  component: CommunityPage,
});

const focuses = ["All", "PvP", "PvE", "Casual", "Hardcore"] as const;
const factionFilters = ["All", "Elyos", "Asmodian"] as const;

function CommunityPage() {
  const [focus, setFocus] = useState<(typeof focuses)[number]>("All");
  const [faction, setFaction] = useState<(typeof factionFilters)[number]>("All");
  const [q, setQ] = useState("");
  const [recruitingOnly, setRecruitingOnly] = useState(true);

  const filtered = useMemo(() => guilds.filter((g) =>
    (focus === "All" || g.focus === focus) &&
    (faction === "All" || g.faction === faction || g.faction === "Both") &&
    (!recruitingOnly || g.recruiting) &&
    (q === "" || g.name.toLowerCase().includes(q.toLowerCase()))
  ), [focus, faction, q, recruitingOnly]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] mb-3">
          <span className="h-px w-6 bg-gold/60" />FORGE BONDS
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Guild Finder</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">Aion is better with allies. Find a legion that matches your schedule and ambition.</p>
      </header>

      <div className="rune-border rounded-xl p-5 mb-8 grid gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guild name..."
            className="w-full bg-background/60 border border-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1 flex-wrap">
            {focuses.map((f) => (
              <button key={f} onClick={() => setFocus(f)}
                className={`px-3 py-1.5 text-xs tracking-widest rounded-md border transition ${focus === f ? "bg-gold text-gold-foreground border-gold" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {factionFilters.map((f) => (
              <button key={f} onClick={() => setFaction(f)}
                className={`px-3 py-1.5 text-xs tracking-widest rounded-md border transition ${faction === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer ml-auto">
            <input type="checkbox" checked={recruitingOnly} onChange={(e) => setRecruitingOnly(e.target.checked)}
              className="accent-[oklch(0.82_0.15_85)]" />
            Recruiting only
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((g) => (
          <article key={g.id} className="rune-border rounded-xl p-6 hover:shadow-glow transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-2xl mb-1">{g.name}</h3>
                <p className="text-xs italic text-muted-foreground">"{g.motto}"</p>
              </div>
              <span className={`text-[10px] tracking-widest px-2 py-1 rounded ${
                g.recruiting ? "bg-gold/20 text-gold border border-gold/40" : "bg-muted text-muted-foreground border border-border"
              }`}>
                {g.recruiting ? "RECRUITING" : "CLOSED"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <div className="text-[10px] text-gold tracking-widest mb-0.5">FACTION</div>
                <div>{g.faction}</div>
              </div>
              <div>
                <div className="text-[10px] text-gold tracking-widest mb-0.5">FOCUS</div>
                <div>{g.focus}</div>
              </div>
              <div>
                <div className="text-[10px] text-gold tracking-widest mb-0.5 flex items-center gap-1"><Globe className="w-3 h-3" /> REGION</div>
                <div>{g.region} · {g.language}</div>
              </div>
              <div>
                <div className="text-[10px] text-gold tracking-widest mb-0.5 flex items-center gap-1"><Users className="w-3 h-3" /> MEMBERS</div>
                <div>{g.members}</div>
              </div>
            </div>
            <button disabled={!g.recruiting}
              className="w-full py-2 rounded-md bg-gradient-arcane text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition">
              {g.recruiting ? "Apply to Join" : "Not Recruiting"}
            </button>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No guilds match your filters.</div>
      )}
    </div>
  );
}
