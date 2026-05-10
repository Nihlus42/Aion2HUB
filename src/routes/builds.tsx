import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { classes, skillsByClass } from "@/data";
import { Trash2, Plus, Check, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/builds")({
  head: () => ({
    meta: [
      { title: "Build Planner - Aion 2 Hub" },
      { name: "description", content: "Plan your Aion 2 class build by selecting skills and tracking total cost." },
    ],
  }),
  component: BuildsPage,
});

function BuildsPage() {
  const [classId, setClassId] = useState<string>(classes[0].id);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const skills = skillsByClass[classId] ?? [];
  const klass = classes.find((c) => c.id === classId)!;
  const selectedSkills = skills.filter((s) => selectedIds.includes(s.id));
  const totalCost = selectedSkills.reduce((sum, skill) => sum + skill.cost, 0);

  const toggleSkill = (skillId: string) => {
    setSelectedIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId],
    );
  };

  const changeClass = (nextClassId: string) => {
    setClassId(nextClassId);
    setSelectedIds([]);
  };

  const resetBuild = () => setSelectedIds([]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] mb-3">
          <span className="h-px w-6 bg-gold/60" />THEORYCRAFTING
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Build Planner</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Select a class, click skills to add or remove them, and track your total cost.
        </p>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
        <aside className="rune-border rounded-xl p-4">
          <div className="text-xs text-gold tracking-widest mb-3">CLASS</div>
          <div className="space-y-1">
            {classes.map((c) => (
              <button
                key={c.id}
                onClick={() => changeClass(c.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  classId === c.id
                    ? "bg-gradient-arcane text-primary-foreground shadow-glow"
                    : "hover:bg-accent/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="font-display">{c.name}</div>
                <div className="text-[10px] opacity-75">
                  {c.role} - {c.faction}
                </div>
              </button>
            ))}
          </div>
        </aside>

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
              {skills.map((skill) => {
                const picked = selectedIds.includes(skill.id);
                return (
                  <li key={skill.id}>
                    <button
                      onClick={() => toggleSkill(skill.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${
                        picked
                          ? "border-gold bg-gold/5 shadow-gold-glow"
                          : "border-border hover:border-primary/60 hover:bg-accent/20 hover:translate-x-1"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-transform ${picked ? "scale-110" : ""} ${
                          skill.type === "Stigma"
                            ? "bg-gradient-gold text-gold-foreground"
                            : skill.type === "Active"
                              ? "bg-gradient-arcane text-primary-foreground"
                              : "bg-accent text-foreground"
                        }`}
                      >
                        {picked ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display">{skill.name}</span>
                          <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-accent/40 text-muted-foreground">
                            {skill.type.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{skill.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-gold tracking-widest">COST</div>
                        <div className="font-display text-lg">{skill.cost}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <aside className="rune-border rounded-xl p-5 h-fit lg:sticky lg:top-20">
          <h3 className="font-display text-xl mb-1">{klass.name} Build</h3>
          <div className="text-xs text-muted-foreground mb-4">Selected skills and total cost</div>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Total cost</span>
              <span className="text-gold">{totalCost}</span>
            </div>
            <div className="h-1.5 bg-background rounded overflow-hidden">
              <div
                className="h-full bg-gradient-gold transition-all"
                style={{ width: `${skills.length === 0 ? 0 : Math.min(100, (selectedSkills.length / skills.length) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
            {selectedSkills.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border rounded-md">
                No skills selected
              </div>
            ) : (
              selectedSkills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 p-2 rounded bg-background/60 border border-border">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{skill.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {skill.type} - {skill.cost} pts
                    </div>
                  </div>
                  <button onClick={() => toggleSkill(skill.id)} className="p-1 text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <button
            onClick={resetBuild}
            disabled={selectedSkills.length === 0}
            className="w-full py-2.5 rounded-md bg-gradient-arcane text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-glow disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset Build
          </button>
        </aside>
      </div>
    </div>
  );
}

