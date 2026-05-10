import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  classes,
  skills,
  cleanSkillText,
  getSkillDisplayName,
  getSkillDisplayDescription,
  getSkillDisplayPveUse,
  getSkillDisplayPvpUse,
  getSkillDisplayCooldown,
  getSkillCategoryLabel,
  getSkillTargetTypeLabel,
  getSkillDamageTypeLabel,
  getSkillRangeLabel,
  normalizeSkillClassSlug,
} from "@/data";
import { Eyebrow } from "@/components/Ornament";

export const Route = createFileRoute("/skills/$classSlug")({
  head: ({ params }) => {
    const klass = classes.find((c) => c.slug === params.classSlug);
    return {
      meta: [
        { title: `${klass?.name ?? "Classe"} - Competences - Aion 2 Hub` },
        { name: "description", content: "Page de competences par classe basee sur des analyses de gameplay." },
      ],
    };
  },
  component: ClassSkillsPage,
});

const roleLabel = { Tank: "TANK", DPS: "DPS", Healer: "SOIGNEUR", Support: "SUPPORT" } as const;

function ClassSkillsPage() {
  const { classSlug } = Route.useParams();
  const klass = classes.find((c) => c.slug === classSlug);

  if (!klass) {
    return (
      <div className="container mx-auto px-4 py-14">
        <div className="rune-border rounded-xl p-10 text-center">
          <h1 className="font-display text-4xl mb-3">Classe introuvable</h1>
          <p className="text-muted-foreground mb-6">Aucune classe ne correspond a cette URL.</p>
          <Link to="/classes" className="inline-flex items-center gap-2 rounded-md bg-gradient-arcane px-4 py-2 text-primary-foreground font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Retour aux classes
          </Link>
        </div>
      </div>
    );
  }

  const classSkills = skills.filter((s) => s.classSlug === normalizeSkillClassSlug(classSlug));

  return (
    <div className="container mx-auto px-4 py-14">
      <Link to="/classes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Retour aux classes
      </Link>

      <header className="mb-10 animate-fade-up">
        <Eyebrow>{roleLabel[klass.role]}</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Competences {klass.name}</h1>
        <span className="inline-block text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">
          Analyse gameplay / Sujet a changement
        </span>
      </header>

      {classSkills.length === 0 ? (
        <div className="rune-border rounded-xl p-10 text-center text-muted-foreground">
          Donnees de competences a venir
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classSkills.map((skill) => (
            <article key={skill.id} className="rune-border rounded-xl p-5">
              <h2 className="font-display text-2xl">{getSkillDisplayName(skill)}</h2>
              <p className="text-[11px] text-amber-300/90 mt-1">Traduction litterale non finale</p>
              <p className="text-xs text-muted-foreground mt-1">
                {getSkillCategoryLabel(skill)} - {getSkillTargetTypeLabel(skill)} - {getSkillDamageTypeLabel(skill)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-gold">Recharge :</span> {getSkillDisplayCooldown(skill)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-gold">Distance :</span> {getSkillRangeLabel(skill)}
              </p>
              <p className="text-sm text-muted-foreground mt-3">{cleanSkillText(getSkillDisplayDescription(skill))}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p><span className="text-gold">PvE :</span> {cleanSkillText(getSkillDisplayPveUse(skill))}</p>
                <p className="mt-1"><span className="text-gold">PvP :</span> {cleanSkillText(getSkillDisplayPvpUse(skill))}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
