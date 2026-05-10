import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { classes, skills } from "@/data";
import { Eyebrow } from "@/components/Ornament";

export const Route = createFileRoute("/skills/$classSlug")({
  head: ({ params }) => {
    const klass = classes.find((c) => c.slug === params.classSlug);
    return {
      meta: [
        { title: `${klass?.name ?? "Class"} Skills - Aion 2 Hub` },
        { name: "description", content: "Class-focused skills page based on gameplay analysis." },
      ],
    };
  },
  component: ClassSkillsPage,
});

function cleanSkillText(value: string) {
  return value
    .replace(/\{se_dmg:[^}]+\}/g, "damage")
    .replace(/\s+/g, " ")
    .trim();
}

function ClassSkillsPage() {
  const { classSlug } = Route.useParams();
  const klass = classes.find((c) => c.slug === classSlug);

  if (!klass) {
    return (
      <div className="container mx-auto px-4 py-14">
        <div className="rune-border rounded-xl p-10 text-center">
          <h1 className="font-display text-4xl mb-3">Class not found</h1>
          <p className="text-muted-foreground mb-6">No class matches this URL.</p>
          <Link to="/classes" className="inline-flex items-center gap-2 rounded-md bg-gradient-arcane px-4 py-2 text-primary-foreground font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  const classSkills = skills.filter((s) => s.classSlug === classSlug);

  return (
    <div className="container mx-auto px-4 py-14">
      <Link to="/classes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Classes
      </Link>

      <header className="mb-10 animate-fade-up">
        <Eyebrow>{klass.role.toUpperCase()}</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">{klass.name} Skills</h1>
        <span className="inline-block text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">
          Gameplay analysis / Subject to change
        </span>
      </header>

      {classSkills.length === 0 ? (
        <div className="rune-border rounded-xl p-10 text-center text-muted-foreground">
          Skill data coming soon
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classSkills.map((skill) => (
            <article key={skill.id} className="rune-border rounded-xl p-5">
              <h2 className="font-display text-2xl">{skill.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {skill.category} • {skill.targetType} • {skill.damageType}
              </p>
              <p className="text-sm text-muted-foreground mt-3">{cleanSkillText(skill.description)}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p><span className="text-gold">PvE:</span> {cleanSkillText(skill.pveUse)}</p>
                <p className="mt-1"><span className="text-gold">PvP:</span> {cleanSkillText(skill.pvpUse)}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
