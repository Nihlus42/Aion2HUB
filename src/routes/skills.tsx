import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { classes, skills, type SkillCategory, type Skill } from "@/data";
import { Eyebrow } from "@/components/Ornament";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills Database - Aion 2 Hub" },
      { name: "description", content: "Community-driven Aion 2 skills database from gameplay analysis." },
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

const targetTypes: ("All" | Skill["targetType"])[] = [
  "All",
  "Single Target",
  "AoE",
  "Cone",
  "Line",
  "Self",
  "Unknown",
];

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
      const textMatch =
        normalizedQuery.length === 0 ||
        skill.name.toLowerCase().includes(normalizedQuery) ||
        skill.description.toLowerCase().includes(normalizedQuery);

      return (
        textMatch &&
        (classSlug === "All" || skill.classSlug === classSlug) &&
        (category === "All" || skill.category === category) &&
        (targetType === "All" || skill.targetType === targetType)
      );
    });
  }, [query, classSlug, category, targetType]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mb-10 animate-fade-up">
        <Eyebrow>COMBAT ARCHIVES</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Skills Database</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Early database based on community gameplay analysis, not official documentation.
        </p>
      </header>

      <section className="rune-border rounded-xl p-5 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or description..."
          className="bg-background/60 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-gold/60"
        />
        <select value={classSlug} onChange={(e) => setClassSlug(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Class</option>
          {classes.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as (typeof categories)[number])} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          {categories.map((item) => (
            <option key={item} value={item}>{item === "All" ? "Category" : item}</option>
          ))}
        </select>
        <select value={targetType} onChange={(e) => setTargetType(e.target.value as (typeof targetTypes)[number])} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          {targetTypes.map((item) => (
            <option key={item} value={item}>{item === "All" ? "Target Type" : item}</option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <div className="rune-border rounded-xl p-10 text-center text-muted-foreground">
          Skill data coming soon
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill) => (
            <article key={skill.id} className="rune-border rounded-xl p-5">
              <div className="mb-3">
                <span className="inline-block text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">
                  Gameplay analysis / Subject to change
                </span>
              </div>
              <h2 className="font-display text-2xl">{skill.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {skill.category} • {skill.targetType} • {skill.damageType}
              </p>
              <p className="text-sm text-muted-foreground mt-3">{skill.description}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p><span className="text-gold">PvE:</span> {skill.pveUse}</p>
                <p className="mt-1"><span className="text-gold">PvP:</span> {skill.pvpUse}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
