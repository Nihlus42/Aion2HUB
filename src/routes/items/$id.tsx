import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cleanItemForDisplay, getItemById, isValidText, normalizeUnknown } from "@/data";

export const Route = createFileRoute("/items/$id")({
  head: ({ params }) => {
    const item = getItemById(params.id);
    const view = item ? cleanItemForDisplay(item) : null;
    return {
      meta: [
        { title: `${view ? view.name : "Objet"} - Aion 2 Hub` },
        { name: "description", content: view?.descriptionFr ?? "Fiche objet Aion 2" },
      ],
    };
  },
  component: ItemDetailPage,
});

function ItemIcon({ src, alt }: { src: string | null; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="h-24 w-24 rounded-md border border-border/70 bg-accent/30 flex items-center justify-center text-[10px] tracking-[0.2em] text-muted-foreground">
        OBJET
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-24 w-24 rounded-md border border-border/70 bg-background/40 object-contain p-2"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

function ItemDetailPage() {
  const { id } = Route.useParams();
  const item = getItemById(id);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-14">
        <div className="rune-border rounded-xl p-10 text-center">
          <h1 className="font-display text-4xl mb-3">Objet introuvable</h1>
          <p className="text-muted-foreground mb-6">Aucun objet ne correspond a cet identifiant.</p>
          <Link to="/items" className="inline-flex items-center gap-2 rounded-md bg-gradient-arcane px-4 py-2 text-primary-foreground font-semibold">
            <ArrowLeft className="w-4 h-4" /> Retour aux objets
          </Link>
        </div>
      </div>
    );
  }

  const view = cleanItemForDisplay(item);
  const detailOptions = (item.optionsFr ?? view.optionsFr).filter((opt) => isValidText(opt)).map((opt) => normalizeUnknown(opt));
  const detailSources = view.sourceFr;

  return (
    <div className="container mx-auto px-4 py-14">
      <Link to="/items" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Retour aux objets
      </Link>

      <article className="rune-border rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
          <ItemIcon src={view.image} alt={view.name} />
          <div className="min-w-0">
            <h1 className="font-display text-3xl md:text-4xl leading-tight">{view.name}</h1>
            {view.nameEn ? <p className="text-sm text-muted-foreground mt-1">{view.nameEn}</p> : null}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {view.gradeFr ? <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-gold/35 bg-gold/10 text-gold">{view.gradeFr}</span> : null}
              {view.categoryFr ? <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-primary/35 bg-primary/10 text-primary">{view.categoryFr}</span> : null}
              {view.mainCategoryFr ? <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-border/60 bg-background/40 text-muted-foreground">{view.mainCategoryFr}</span> : null}
              <span className={`text-[10px] tracking-[0.12em] px-2 py-1 rounded border ${view.tradable ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-300" : "border-rose-400/35 bg-rose-400/10 text-rose-300"}`}>
                {view.tradable ? "Échangeable" : "Lié"}
              </span>
              {view.minLevelRequirement !== null ? (
                <span className="text-[10px] tracking-[0.12em] px-2 py-1 rounded border border-border/60 bg-background/40 text-muted-foreground">
                  Niv. min {view.minLevelRequirement}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {detailOptions.length > 0 ? (
          <section className="rounded-lg border border-border/60 bg-background/30 p-4">
            <h2 className="font-display text-xl mb-2">Options</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {detailOptions.map((opt, i) => (
                <li key={`${id}-opt-${i}`}>{opt}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {view.descriptionFr ? (
          <section className="rounded-lg border border-border/60 bg-background/30 p-4">
            <h2 className="font-display text-xl mb-2">Description</h2>
            <p className="text-sm text-muted-foreground">{view.descriptionFr}</p>
          </section>
        ) : null}

        {detailSources.length > 0 ? (
          <section className="rounded-lg border border-border/60 bg-background/30 p-4">
            <h2 className="font-display text-xl mb-2">Sources</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              {detailSources.map((src, i) => (
                <li key={`${id}-src-${i}`}>{src}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </div>
  );
}
