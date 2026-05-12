import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { classes, getNormalizedSkills, normalizeClassSlug, type NormalizedSkill } from "@/data";
import { Eyebrow } from "@/components/Ornament";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Base de compétences - Aion 2 Hub" },
      { name: "description", content: "Base de compétences Aion 2 en français." },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const allSkills = useMemo(() => getNormalizedSkills(), []);
  const [query, setQuery] = useState("");
  const [classSlug, setClassSlug] = useState("all");
  const [typeFr, setTypeFr] = useState("all");

  const types = useMemo(
    () => ["all", ...Array.from(new Set(allSkills.map((s) => s.typeFr).filter(Boolean)))],
    [allSkills],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSkills.filter((skill) => {
      const classMatch = classSlug === "all" || normalizeClassSlug(skill.classSlug) === normalizeClassSlug(classSlug);
      const typeMatch = typeFr === "all" || skill.typeFr === typeFr;
      const text = [skill.nameFr, skill.descriptionFr ?? "", skill.classFr, ...(skill.tagsFr ?? [])].join(" ").toLowerCase();
      const queryMatch = q.length === 0 || text.includes(q);
      return classMatch && typeMatch && queryMatch;
    });
  }, [allSkills, classSlug, typeFr, query]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mb-10 animate-fade-up">
        <Eyebrow>ARCHIVES DE COMBAT</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Base de compétences</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">Source principale Talentbuilds FR. Fallback Questlog en interne.</p>
      </header>

      <section className="mb-8 rounded-xl border border-gold/30 bg-gold/5 p-4 md:p-5">
        <p className="text-sm font-semibold text-gold">Traductions en cours d&apos;amélioration</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Les compétences sont traduites progressivement en français. Certaines descriptions, spécialités ou effets peuvent
          encore être approximatifs ou incomplets. Les corrections seront faites petit à petit, surtout lorsque des données
          FR plus fiables seront disponibles.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Tu as repéré une erreur ?{" "}
          <Link to="/contact" className="text-gold hover:underline">
            Contacte-nous.
          </Link>
        </p>
      </section>

      <section className="rune-border rounded-xl p-5 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher..." className="bg-background/60 border border-border rounded-md px-4 py-2 text-sm" />
        <select value={classSlug} onChange={(e) => setClassSlug(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="all">Classe</option>
          {classes.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select value={typeFr} onChange={(e) => setTypeFr(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          {types.map((t) => (
            <option key={t} value={t}>{t === "all" ? "Type" : t}</option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <div className="rune-border rounded-xl p-10 text-center text-muted-foreground">Aucune compétence trouvée.</div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill: NormalizedSkill) => (
            <article key={`${skill.source}-${skill.id}`} className="rune-border rounded-xl p-5">
              <div className="mb-3"><span className="inline-block text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">Base communautaire / Sujet à changement</span></div>
              <div className="flex items-start gap-3">
                {skill.imageUrl ? (
                  <img src={skill.imageUrl} alt={skill.nameFr} className="w-12 h-12 rounded border border-border object-cover" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="w-12 h-12 rounded border border-border bg-accent/20" />
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl leading-tight">{skill.nameFr}</h2>
                  <p className="text-xs text-muted-foreground mt-1">{skill.classFr} - {skill.typeFr}</p>
                  {typeof skill.unlocked === "number" && <p className="text-xs text-muted-foreground">Déblocage niveau {skill.unlocked}</p>}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{skill.descriptionFr || "Description indisponible"}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Temps de recharge : {skill.estimatedCooldown || "—"}
              </p>
              {(skill.tagsFr?.length ?? 0) > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {skill.tagsFr!.map((tag) => (
                    <span key={`${skill.id}-${tag}`} className="text-[10px] px-2 py-0.5 rounded border border-border bg-accent/20">{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}


