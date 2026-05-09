import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { classes, skillsByClass, type Skill } from "@/data/aion";
import { Share2, Trash2, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/builds")({
  head: () => ({
    meta: [
      { title: "Build Planner — Aion 2 Hub" },
      { name: "description", content: "Plan, save, and share Aion 2 character builds." },
    ],
  }),
  component: BuildsPage,
});

function BuildsPage() {
  const [classId, setClassId] = useState<string>(classes[0].id);
  const [selected, setSelected] = useState<Skill[]>([]);
  const [shared, setShared] = useState(false);
  const [buildName, setBuildName] = useState("My New Build");

  const skills = skillsByClass[classId] ?? [];
  const klass = classes.find((c) => c.id === classId)!;
  const totalCost = selected.reduce((s, sk) => s + sk.cost, 0);
  const stigmaBudget = 240;

  const toggle = (s: Skill) => {
    setSelected((prev) =>
      prev.find((p) => p.id === s.id) ? prev.filter((p) => p.id !== s.id) : [...prev, s]
    );
  };

  const share = async () => {
    const url = `${window.location.origin}/builds?b=${encodeURIComponent(btoa(JSON.stringify({ c: classId, s: selected.map((x) => x.id), n: buildName })))}`;
    try { await navigator.clipboard.writeText(url); } catch {}
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] mb-3">
          <span className="h-px w-6 bg-gold/60" />THEORYCRAFTING
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Build Planner</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">Pick your class, assemble a stigma loadout, and share it with your legion.</p>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
        {/* Class selector */}
        <aside className="rune-border rounded-xl p-4">
          <div className="text-xs text-gold tracking-widest mb-3">CLASS</div>
          <div className="space-y-1">
            {classes.map((c) => (
              <button key={c.id} onClick={() => { setClassId(c.id); setSelected([]); }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  classId === c.id ? "bg-gradient-arcane text-primary-foreground shadow-glow" : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                }`}>
                <div className="font-display">{c.name}</div>
                <div className="text-[10px] opacity-75">{c.role} · {c.faction}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Skill list */}
        <section className="rune-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl">{klass.name} Skills</h2>
              <p className="text-xs text-muted-foreground">{klass.tagline}</p>
            </div>
            <span className="text-xs text-muted-foreground">{skills.length} skills available</span>
          </div>

          {skills.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground border border-dashed border-border rounded-lg">
              Skill data for {klass.name} coming soon.
            </div>
          ) : (
            <ul className="space-y-2">
              {skills.map((s) => {
                const picked = !!selected.find((p) => p.id === s.id);
                return (
                  <li key={s.id}>
                    <button onClick={() => toggle(s)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${
                        picked ? "border-gold bg-gold/5 shadow-gold-glow" : "border-border hover:border-primary/60 hover:bg-accent/20 hover:translate-x-1"
                      }`}>
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-transform ${picked ? "scale-110" : ""} ${
                        s.type === "Stigma" ? "bg-gradient-gold text-gold-foreground" :
                        s.type === "Active" ? "bg-gradient-arcane text-primary-foreground" : "bg-accent text-foreground"
                      }`}>
                        {picked ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display">{s.name}</span>
                          <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-accent/40 text-muted-foreground">{s.type.toUpperCase()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{s.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-gold tracking-widest">COST</div>
                        <div className="font-display text-lg">{s.cost}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Selected build panel */}
        <aside className="rune-border rounded-xl p-5 h-fit lg:sticky lg:top-20">
          <input
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            className="w-full bg-transparent font-display text-xl mb-1 focus:outline-none border-b border-transparent focus:border-primary py-1"
          />
          <div className="text-xs text-muted-foreground mb-4">{klass.name} build</div>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Stigma points</span>
              <span className={totalCost > stigmaBudget ? "text-destructive" : "text-gold"}>
                {totalCost} / {stigmaBudget}
              </span>
            </div>
            <div className="h-1.5 bg-background rounded overflow-hidden">
              <div className="h-full bg-gradient-gold transition-all"
                style={{ width: `${Math.min(100, (totalCost / stigmaBudget) * 100)}%` }} />
            </div>
          </div>

          <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
            {selected.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border rounded-md">
                No skills selected
              </div>
            ) : selected.map((s) => (
              <div key={s.id} className="flex items-center gap-2 p-2 rounded bg-background/60 border border-border">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground">{s.type} · {s.cost} pts</div>
                </div>
                <button onClick={() => toggle(s)} className="p-1 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={share}
            disabled={selected.length === 0}
            className="w-full py-2.5 rounded-md bg-gradient-arcane text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-glow disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            {shared ? <><Check className="w-4 h-4" /> Copied!</> : <><Share2 className="w-4 h-4" /> Share Build</>}
          </button>
        </aside>
      </div>
    </div>
  );
}
