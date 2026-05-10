import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { classes, skills, cleanSkillText, getSkillDisplayName, getSkillDisplayDescription, normalizeSkillClassSlug } from "@/data";
import { Trash2, Plus, Check, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/builds")({
  head: () => ({
    meta: [
      { title: "Planificateur de build - Aion 2 Hub" },
      { name: "description", content: "Planifie ton build Aion 2 en selectionnant des competences et en suivant le cout total." },
    ],
  }),
  component: BuildsPage,
});

const categoryLabel = {
  "Basic Attack": "Attaque de base",
  Combo: "Combo",
  AoE: "Zone",
  Burst: "Rafale",
  Mobility: "Mobilite",
  "Crowd Control": "Controle",
  Defensive: "Defensif",
  Utility: "Utilitaire",
  Unknown: "Inconnu",
} as const;

const roleLabel = { Tank: "Tank", DPS: "DPS", Healer: "Soigneur", Support: "Support" } as const;
const factionLabel = { Elyos: "Elyos", Asmodian: "Asmodien", Both: "Les deux" } as const;

function BuildsPage() {
  const [classId, setClassId] = useState<string>(classes[0].id);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const klass = classes.find((c) => c.id === classId)!;
  const classSkills = skills.filter((s) => s.classSlug === normalizeSkillClassSlug(klass.slug));
  const selectedSkills = classSkills.filter((s) => selectedSlugs.includes(s.slug));
  const totalCost = selectedSkills.length;

  const toggleSkill = (skillSlug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(skillSlug) ? prev.filter((id) => id !== skillSlug) : [...prev, skillSlug],
    );
  };

  const changeClass = (nextClassId: string) => {
    setClassId(nextClassId);
    setSelectedSlugs([]);
  };

  const resetBuild = () => setSelectedSlugs([]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] mb-3">
          <span className="h-px w-6 bg-gold/60" />THEORIECRAFT
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Planificateur de build</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Selectionne une classe, ajoute ou retire des competences, puis suis ton cout total.
        </p>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
        <aside className="rune-border rounded-xl p-4">
          <div className="text-xs text-gold tracking-widest mb-3">CLASSE</div>
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
                  {roleLabel[c.role]} - {factionLabel[c.faction]}
              </div>
            </button>
          ))}
          </div>
        </aside>

        <section className="rune-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl">Competences {klass.name}</h2>
              <p className="text-xs text-muted-foreground">{klass.combatStyle}</p>
            </div>
            <span className="text-xs text-muted-foreground">{classSkills.length} competences disponibles</span>
          </div>

          {classSkills.length === 0 ? (
            <div className="text-center py-12 text-sm text-muted-foreground border border-dashed border-border rounded-lg">
              Donnees de competences pour {klass.name} a venir.
            </div>
          ) : (
            <ul className="space-y-2">
              {classSkills.map((skill) => {
                const picked = selectedSlugs.includes(skill.slug);
                return (
                  <li key={skill.slug}>
                    <button
                      onClick={() => toggleSkill(skill.slug)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${
                        picked
                          ? "border-gold bg-gold/5 shadow-gold-glow"
                          : "border-border hover:border-primary/60 hover:bg-accent/20 hover:translate-x-1"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 transition-transform ${
                          picked ? "scale-110 bg-gradient-arcane text-primary-foreground" : "bg-accent text-foreground"
                        }`}
                      >
                        {picked ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display">{getSkillDisplayName(skill)}</span>
                          <span className="text-[10px] text-amber-300/90">Traduction litterale non finale</span>
                          <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-accent/40 text-muted-foreground">
                            {categoryLabel[skill.category].toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{cleanSkillText(getSkillDisplayDescription(skill))}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-gold tracking-widest">RECHARGE</div>
                        <div className="font-display text-sm">{skill.estimatedCooldown}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <aside className="rune-border rounded-xl p-5 h-fit lg:sticky lg:top-20">
          <h3 className="font-display text-xl mb-1">Build {klass.name}</h3>
          <div className="text-xs text-muted-foreground mb-4">Competences selectionnees et cout total</div>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Cout total</span>
              <span className="text-gold">{totalCost}</span>
            </div>
            <div className="h-1.5 bg-background rounded overflow-hidden">
              <div
                className="h-full bg-gradient-gold transition-all"
                style={{ width: `${classSkills.length === 0 ? 0 : Math.min(100, (selectedSkills.length / classSkills.length) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 mb-4 max-h-72 overflow-y-auto">
            {selectedSkills.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-6 border border-dashed border-border rounded-md">
                Aucune competence selectionnee
              </div>
            ) : (
              selectedSkills.map((skill) => (
                <div key={skill.slug} className="flex items-center gap-2 p-2 rounded bg-background/60 border border-border">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{getSkillDisplayName(skill)}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {categoryLabel[skill.category]} - {skill.estimatedCooldown}
                    </div>
                  </div>
                  <button onClick={() => toggleSkill(skill.slug)} className="p-1 text-muted-foreground hover:text-destructive">
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
            <RotateCcw className="w-4 h-4" /> Reinitialiser le build
          </button>
        </aside>
      </div>
    </div>
  );
}

