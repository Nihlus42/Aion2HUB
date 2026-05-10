import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { itemFilterOptions, itemsLight, cleanItemForDisplay, normalizeUnknown } from "@/data";
import { Eyebrow } from "@/components/Ornament";
import { ItemCard } from "@/components/ItemCard";

const PAGE_SIZE = 60;

export const Route = createFileRoute("/items")({
  head: () => ({
    meta: [
      { title: "Objets - Aion 2 Hub" },
      { name: "description", content: "Base d objets Aion 2 avec recherche rapide et filtres dynamiques." },
    ],
  }),
  component: ItemsPage,
});

function ItemsPage() {
  const [query, setQuery] = useState("");
  const [mainCategory, setMainCategory] = useState("All");
  const [category, setCategory] = useState("All");
  const [grade, setGrade] = useState("All");
  const [tradable, setTradable] = useState("All");
  const [source, setSource] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const prepared = useMemo(() => itemsLight.map((item) => ({ raw: item, view: cleanItemForDisplay(item) })), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return prepared.filter(({ raw, view }) => {
      const textMatch =
        q.length === 0 ||
        view.searchText.includes(q) ||
        view.name.toLowerCase().includes(q) ||
        (view.categoryFr ?? "").toLowerCase().includes(q) ||
        (view.gradeFr ?? "").toLowerCase().includes(q) ||
        view.optionsFr.join(" ").toLowerCase().includes(q);

      const mainCatMatch = mainCategory === "All" || raw.mainCategory === mainCategory;
      const catMatch = category === "All" || raw.categoryEn === category;
      const gradeMatch = grade === "All" || raw.gradeNameEn === grade;
      const tradableMatch = tradable === "All" || (tradable === "yes" ? view.tradable === true : view.tradable === false);
      const sourceMatch = source === "All" || view.sourceFr.some((s) => s === normalizeUnknown(source));

      return textMatch && mainCatMatch && catMatch && gradeMatch && tradableMatch && sourceMatch;
    });
  }, [prepared, query, mainCategory, category, grade, tradable, source]);

  const visibleItems = filtered.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 py-14">
      <header className="mb-10 animate-fade-up">
        <Eyebrow>DATABASE D OBJETS</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl mb-3">Objets</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">Recherche rapide et filtres dynamiques sur la base FR.</p>
      </header>

      <section className="rune-border rounded-xl p-5 mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="Rechercher (nom, catégorie, grade, options)..."
          className="xl:col-span-2 bg-background/60 border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:border-gold/60"
        />

        <select value={mainCategory} onChange={(e) => { setMainCategory(e.target.value); setVisibleCount(PAGE_SIZE); }} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Catégorie principale</option>
          {itemFilterOptions.mainCategories.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select value={category} onChange={(e) => { setCategory(e.target.value); setVisibleCount(PAGE_SIZE); }} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Catégorie détaillée</option>
          {itemFilterOptions.categories.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select value={grade} onChange={(e) => { setGrade(e.target.value); setVisibleCount(PAGE_SIZE); }} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Rareté / grade</option>
          {itemFilterOptions.grades.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select value={tradable} onChange={(e) => { setTradable(e.target.value); setVisibleCount(PAGE_SIZE); }} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Échange</option>
          <option value="yes">Échangeable</option>
          <option value="no">Lié</option>
        </select>

        <select value={source} onChange={(e) => { setSource(e.target.value); setVisibleCount(PAGE_SIZE); }} className="bg-background/60 border border-border rounded-md px-3 py-2 text-sm">
          <option value="All">Source</option>
          {itemFilterOptions.sources.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <div className="rune-border rounded-xl p-10 text-center text-muted-foreground">Aucun objet correspondant.</div>
      ) : (
        <>
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visibleItems.map(({ raw }) => (
              <ItemCard key={raw.id} item={raw} />
            ))}
          </section>

          {visibleCount < filtered.length ? (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="px-5 py-2 rounded-md border border-gold/40 text-gold hover:bg-gold/10 transition"
              >
                Charger plus ({Math.min(PAGE_SIZE, filtered.length - visibleCount)})
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
