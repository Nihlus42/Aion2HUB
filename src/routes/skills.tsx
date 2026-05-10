import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  classes,
  skills,
  cleanSkillText,
  getSkillDisplayName,
  getSkillDisplayDescription,
  normalizeSkillClassSlug,
  type SkillCategory,
  type Skill,
} from "@/data";
import { Eyebrow } from "@/components/Ornament";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Base de competences - Aion 2 Hub" },
      { name: "description", content: "Base de competences Aion 2 basee sur des analyses de gameplay communautaires." },
    ],
  }),
  component: SkillsPage,
});

const categories: ("All" | SkillCategory)[] = [
  "All",
  "Basic Attack",
  "Combo",
  "AoE",
  "Burst",
  "Mobility",
  "Crowd Control",
  "Defensive",
  "Utility",
  "Unknown",
];

const categoryLabel: Record<SkillCategory, string> = {
  "Basic Attack": "Attaque de base",
  Combo: "Combo",
  AoE: "Zone",
  Burst: "Rafale",
  Mobility: "Mobilite",
  "Crowd Control": "Controle",
  Defensive: "Defensif",
  Utility: "Utilitaire",
  Unknown: "Inconnu",
};

const targetTypes: ("All" | Skill["targetType"])[] = [
  "All",
  "Single Target",
  "AoE",
  "Cone",
  "Line",
  "Self",
  "Unknown",
];

const targetTypeLabel: Record<Skill["targetType"], string> = {
  "Single Target": "Cible unique",
  AoE: "Zone",
  Cone: "Cone",
  Line: "Ligne",
  Self: "Soi",
  Unknown: "Inconnu",
};

const damageTypeLabel: Record<Skill["damageType"], string> = {
  Physical: "Physique",
  Magical: "Magique",
  Hybrid: "Hybride",
  Unknown: "Inconnu",
};

function SkillsPage() {
  const [query, setQuery] = useState("");
  const [classSlug, setClassSlug] = useState("All");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [targetType, setTargetType] = useState<(typeof targetTypes)[number]>("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const classFromQuery = params.get("classSlug");
    if (classFromQuery && classes.some((c) => c.slug === classFromQuery)) {
      setClassSlug(classFromQuery);
    }
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const normalizedClass = normalizeSkillClassSlug(classSlug);
      const textMatch =
        normalizedQuery.length === 0 ||
        getSkillDisplayName(skill).toLowerCase().includes(normalizedQuery) ||
        getSkillDisplayDescription(skill).toLowerCase().includes(normalizedQuery);

      return (
        textMatch &&
        (classSlug === "All" || skill.classSlug === normalizedClass) &&
        (category === "All" || skill.category === category) &&
        (targetType === "All" || skill.targetType === targetType)
      );
    });
  }, [query, classSlug, category, targetType]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mb-10 animate-fade-up">
        <Eyebrow>ARCHIVES DE COMBAT</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Base de competences</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Base preliminaire issue de la communaute, ce n est pas une documentation officielle.
        </p>
      </header>

      <section className="rune-border rounded-xl p-5 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par nom ou description..."
          className="bg-background/60 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-gold/60"
        />
        <select value={classSlug} onChange={(e) => setClassSlug(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Classe</option>
          {classes.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as (typeof categories)[number])} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          {categories.map((item) => (
            <option key={item} value={item}>{item === "All" ? "Categorie" : categoryLabel[item]}</option>
          ))}
        </select>
        <select value={targetType} onChange={(e) => setTargetType(e.target.value as (typeof targetTypes)[number])} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          {targetTypes.map((item) => (
            <option key={item} value={item}>{item === "All" ? "Type de cible" : targetTypeLabel[item]}</option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <div className="rune-border rounded-xl p-10 text-center text-muted-foreground">
          Donnees de competences a venir
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill) => (
            <article key={skill.id} className="rune-border rounded-xl p-5">
              <div className="mb-3">
                <span className="inline-block text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">
                  Analyse gameplay / Sujet a changement
                </span>
              </div>
              <h2 className="font-display text-2xl">{getSkillDisplayName(skill)}</h2>
              <p className="text-[11px] text-amber-300/90 mt-1">Traduction litterale non finale</p>
              <p className="text-xs text-muted-foreground mt-1">
                {categoryLabel[skill.category]} - {targetTypeLabel[skill.targetType]} - {damageTypeLabel[skill.damageType]}
              </p>
              <p className="text-sm text-muted-foreground mt-3">{cleanSkillText(getSkillDisplayDescription(skill))}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p><span className="text-gold">PvE :</span> {cleanSkillText(skill.pveUseFr)}</p>
                <p className="mt-1"><span className="text-gold">PvP :</span> {cleanSkillText(skill.pvpUseFr)}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
