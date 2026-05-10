import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  items,
  getItemDisplayName,
  getItemDisplayDescription,
  getItemCategoryLabel,
  getItemSubCategoryLabel,
  getItemRarityLabel,
} from "@/data";
import { Eyebrow } from "@/components/Ornament";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/items")({
  head: () => ({
    meta: [
      { title: "Objets - Aion 2 Hub" },
      { name: "description", content: "Base d objets Aion 2 avec recherche et filtres." },
    ],
  }),
  component: ItemsPage,
});

function ItemsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("All");
  const [rarity, setRarity] = useState("All");

  const categoryOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of items) {
      if (!map.has(item.category)) map.set(item.category, getItemCategoryLabel(item));
    }
    return Array.from(map.entries());
  }, []);

  const subCategoryOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of items) {
      if (!map.has(item.subCategory)) map.set(item.subCategory, getItemSubCategoryLabel(item));
    }
    return Array.from(map.entries());
  }, []);

  const rarityOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of items) {
      if (!map.has(item.rarity)) map.set(item.rarity, getItemRarityLabel(item));
    }
    return Array.from(map.entries());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const textMatch =
        q.length === 0 ||
        getItemDisplayName(item).toLowerCase().includes(q) ||
        getItemDisplayDescription(item).toLowerCase().includes(q);

      return (
        textMatch &&
        (category === "All" || item.category === category) &&
        (subCategory === "All" || item.subCategory === subCategory) &&
        (rarity === "All" || item.rarity === rarity)
      );
    });
  }, [query, category, subCategory, rarity]);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mb-10 animate-fade-up">
        <Eyebrow>ARCHIVES D OBJETS</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Objets</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Base communautaire d objets AION 2 avec filtres par categorie, sous-categorie et rarete.
        </p>
      </header>

      <section className="rune-border rounded-xl p-5 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par nom ou description..."
          className="bg-background/60 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-gold/60"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Categorie</option>
          {categoryOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Sous-categorie</option>
          {subCategoryOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select value={rarity} onChange={(e) => setRarity(e.target.value)} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Rarete</option>
          {rarityOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <div className="rune-border rounded-xl p-10 text-center text-muted-foreground">Aucun objet correspondant.</div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}
