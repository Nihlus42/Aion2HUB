import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Sword, Heart, Sparkles, ArrowLeft } from "lucide-react";
import { classes, type ClassRole } from "@/data";
import { Eyebrow } from "@/components/Ornament";

const roleIcon: Record<ClassRole, typeof Shield> = {
  Tank: Shield, DPS: Sword, Healer: Heart, Support: Sparkles,
};
const roleLabel: Record<ClassRole, string> = { Tank: "Tank", DPS: "DPS", Healer: "Soigneur", Support: "Support" };
const factionLabel = { Elyos: "Elyos", Asmodian: "Asmodien", Both: "Les deux" } as const;

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 text-xs tracking-[0.2em] text-muted-foreground">{label.toUpperCase()}</div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`h-3 w-7 rounded-sm ${i <= value ? "bg-gradient-gold" : "bg-border"}`} />
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/classes/$slug")({
  head: ({ params }) => {
    const currentClass = classes.find((item) => item.slug === params.slug);
    return {
      meta: [
        { title: `${currentClass?.name ?? "Classe"} - Aion 2 Hub` },
        {
          name: "description",
          content: currentClass
            ? `${currentClass.name} details de classe, role, notes et evaluations.`
            : "Page de details de classe.",
        },
      ],
    };
  },
  component: ClassDetailPage,
});

function ClassDetailPage() {
  const { slug } = Route.useParams();
  const currentClass = classes.find((item) => item.slug === slug);

  if (!currentClass) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="rune-border rounded-xl p-8 text-center">
          <h1 className="font-display text-4xl mb-3">Classe introuvable</h1>
          <p className="text-muted-foreground mb-6">Cette entree de classe n existe pas dans les donnees actuelles.</p>
          <Link to="/classes" className="inline-flex items-center gap-2 rounded-md bg-gradient-arcane px-4 py-2 text-primary-foreground font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Retour aux classes
          </Link>
        </div>
      </div>
    );
  }

  const Icon = roleIcon[currentClass.role];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Link to="/classes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Retour aux classes
      </Link>

      <section className="rune-border rounded-2xl p-6 md:p-10 mt-5 relative overflow-hidden">
        <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative">
          <Eyebrow>{factionLabel[currentClass.faction]} FACTION</Eyebrow>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mt-3">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-arcane flex items-center justify-center shadow-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="font-display text-4xl md:text-6xl">{currentClass.name}</h1>
              </div>
              <div>
                <span className="inline-block text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-300">
                  Infos communaute / Sujet a changement
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 min-w-[220px]">
              <div className="rounded-lg border border-border p-3 bg-background/40">
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1">ROLE</div>
                <div className="font-semibold">{roleLabel[currentClass.role]}</div>
              </div>
              <div className="rounded-lg border border-border p-3 bg-background/40">
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground mb-1">DIFFICULTE</div>
                <div className="font-semibold">{currentClass.difficulty}/5</div>
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-muted-foreground leading-relaxed">{currentClass.description}</p>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-6 mt-8">
        <article className="rune-border rounded-xl p-6">
          <h2 className="font-display text-2xl mb-4">Style de combat</h2>
          <p className="text-muted-foreground leading-relaxed">{currentClass.combatStyle}</p>
        </article>

        <article className="rune-border rounded-xl p-6 lg:col-span-2">
          <h2 className="font-display text-2xl mb-4">Evaluations de performance</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <RatingBar label="PvE" value={currentClass.pveRating} />
            <RatingBar label="PvP" value={currentClass.pvpRating} />
          </div>
        </article>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mt-8">
        <article className="rune-border rounded-xl p-6">
          <h2 className="font-display text-2xl mb-4">Forces</h2>
          <ul className="space-y-2">
            {currentClass.strengths.map((item) => (
              <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rune-border rounded-xl p-6">
          <h2 className="font-display text-2xl mb-4">Faiblesses</h2>
          <ul className="space-y-2">
            {currentClass.weaknesses.map((item) => (
              <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

    </div>
  );
}
