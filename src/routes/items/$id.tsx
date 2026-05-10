import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cleanItemForDisplay, getItemById } from "@/data";

export const Route = createFileRoute("/items/$id")({
  head: ({ params }) => {
    const item = getItemById(params.id);
    const view = item ? cleanItemForDisplay(item) : null;
    return {
      meta: [
        { title: `${view ? view.name : "Objet"} - Aion 2 Hub` },
        { name: "description", content: view?.description ?? "Fiche objet Aion 2" },
      ],
    };
  },
  component: ItemDetailPage,
});

function ItemIcon({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="h-20 w-20 rounded-md border border-border/70 bg-accent/30 flex items-center justify-center text-[10px] tracking-[0.2em] text-muted-foreground">
        OBJET
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-20 w-20 rounded-md border border-border/70 bg-background/40 object-contain p-2"
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
            <ArrowLeft className="w-4 h-4" />
            Retour aux objets
          </Link>
        </div>
      </div>
    );
  }

  const view = cleanItemForDisplay(item);
  const qualityDisplay = view.quality.toLowerCase() === "inconnu" ? "Qualite inconnue" : view.quality;

  return (
    <div className="container mx-auto px-4 py-14">
      <Link to="/items" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Retour aux objets
      </Link>

      <article className="rune-border rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-start">
          <ItemIcon src={view.icon} alt={view.name} />
          <div className="min-w-0">
            <h1 className="font-display text-3xl md:text-4xl leading-tight">{view.name}</h1>
            {view.description ? <p className="text-sm text-muted-foreground mt-2">{view.description}</p> : null}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Categorie :</span> {view.category}</div>
          <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Sous-categorie :</span> {view.subCategory}</div>
          <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Rarete / Tier :</span> {view.rarity}{view.tier ? ` (${view.tier})` : ""}</div>
          <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Qualite :</span> {qualityDisplay}</div>
          {view.minLevel !== null ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Niveau min :</span> {view.minLevel}</div> : null}
          {view.race ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Race :</span> {view.race}</div> : null}
          {view.sellPrice !== null ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Prix de vente :</span> {view.sellPrice.toLocaleString("fr-FR")}</div> : null}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {view.equipment.weaponType ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Type d arme :</span> {view.equipment.weaponType}</div> : null}
          {view.equipment.armorType ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Type d armure :</span> {view.equipment.armorType}</div> : null}
          {view.equipment.slot ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Slot :</span> {view.equipment.slot}</div> : null}
          {view.equipment.range ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Portee :</span> {view.equipment.range}</div> : null}
          {view.equipment.attackSpeed ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Vitesse d attaque :</span> {view.equipment.attackSpeed}</div> : null}
          {view.cooldown ? <div className="rounded-lg border border-border/60 bg-background/30 p-3"><span className="text-gold">Recharge :</span> {view.cooldown}</div> : null}
        </div>

        {view.statsByEnchant.length > 0 ? (
          <section className="rounded-lg border border-border/60 bg-background/30 p-4">
            <h2 className="font-display text-xl mb-3">Stats (compact)</h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {view.statsByEnchant.map((group) => (
                <div key={group.enchantLevel} className="rounded-md border border-border/50 p-3">
                  <div className="text-gold text-xs tracking-widest mb-2">+{group.enchantLevel}</div>
                  <ul className="space-y-1 text-muted-foreground">
                    {group.lines.map((line, idx) => (
                      <li key={`${group.enchantLevel}-${idx}`}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {view.crafting.isCraftable ? (
          <section className="rounded-lg border border-border/60 bg-background/30 p-4">
            <h2 className="font-display text-xl mb-2">Crafting</h2>
            <p className="text-xs text-amber-300 mb-3">Craftable</p>
            {view.crafting.ingredients.length > 0 ? (
              <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                {view.crafting.ingredients.map((ing, idx) => (
                  <li key={`${ing.name}-${idx}`}>{ing.name}{ing.quantity !== null ? ` x${ing.quantity}` : ""}</li>
                ))}
              </ul>
            ) : null}
            <div className="text-sm text-muted-foreground space-y-1">
              {view.crafting.normalOutput ? <div><span className="text-gold">Sortie normale :</span> {view.crafting.normalOutput}</div> : null}
              {view.crafting.comboOutput ? <div><span className="text-gold">Sortie combo :</span> {view.crafting.comboOutput}</div> : null}
            </div>
          </section>
        ) : null}

        {(view.sourceName || view.lastUpdated) ? (
          <div className="text-[11px] text-muted-foreground border-t border-border/60 pt-3">
            {view.sourceName ? <span>Source: {view.sourceName}</span> : null}
            {view.lastUpdated ? <span>{view.sourceName ? " • " : ""}Maj: {view.lastUpdated}</span> : null}
          </div>
        ) : null}
      </article>
    </div>
  );
}
