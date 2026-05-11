# Maintenance Contenu (FR)

Guide rapide pour mettre à jour les données sans casser l’UI.

## 1) Objets

1. Déposer/mettre à jour les JSON dans `src/data/aion2/items/aion2hub_clean_json/`.
2. Vérifier les fichiers minimum :
   - `aion2hub_items_fr_light.json`
   - `aion2hub_items_fr_by_id.json`
   - `aion2hub_items_fr_meta.json`
3. Contrôler le mapping dans `src/data/items/index.ts` :
   - `isValidText`
   - `cleanItemForDisplay`
   - filtres dynamiques via `itemFilterOptions`
4. Vérifier `/items` et `/items/$id` en local.

## 2) Compétences

1. Mettre à jour les JSON dans `src/data/skills/json/`.
2. Vérifier les champs FR attendus (`nameFr`, `descriptionFr`, etc.).
3. Contrôler les helpers d’affichage dans `src/data/skills/index.ts`.
4. Vérifier `/skills` et `/skills/$classSlug`.

## 3) Daevanion Planner

1. Mettre à jour les sources :
   - `src/data/aion2/daevanion/tb_boards_embedded.js`
   - `src/data/aion2/daevanion/tb_daevanion_skills.json`
2. Reconvertir `boards.json` si nécessaire.
3. Vérifier :
   - grille 15x15 respectant `row/col`
   - infos compactes node
   - panneau détail
   - export/import + localStorage
4. Fichiers clés :
   - `src/components/daevanion/DaevanionPlanner.tsx`
   - `src/lib/aion2/daevanion/translate.ts`
   - `src/data/aion2/daevanion/translations/fr.ts`

## 4) SEO de base

Verifier que ces fichiers existent dans `public/` :

- `robots.txt`
- `sitemap.xml`

Contenu attendu :

- `robots.txt` doit autoriser le crawl (`User-agent: *` + `Allow: /`).
- ne pas mettre `Disallow: /`.
- `robots.txt` doit declarer `Sitemap: https://aion2frenchub.vercel.app/sitemap.xml`.
- `sitemap.xml` doit contenir les pages principales du site.

Verification rapide en prod :

- `https://aion2frenchub.vercel.app/robots.txt`
- `https://aion2frenchub.vercel.app/sitemap.xml`

## 5) Checklist avant push

1. `npm run dev`
2. vérifier navigation desktop + mobile
3. tester routes clés (`/items`, `/skills`, `/classes`, `/daevanion-planner`)
4. commit clair
5. push `main`
