# Aion2HUB

Site communautaire non officiel autour de **Aion 2**.

## Stack technique

- React 19 + TypeScript
- TanStack Start / TanStack Router
- Vite
- Tailwind CSS 4

## Démarrage local

```bash
npm install
npm run dev
```

Le site est ensuite disponible en local via Vite (URL affichée dans le terminal).

## Scripts utiles

- `npm run dev` : lance le serveur local
- `npm run build` : build production
- `npm run preview` : prévisualise le build
- `npm run lint` : linting
- `npm run format` : formatage

## Pages principales

- `/` : accueil
- `/updates` : actualités
- `/classes` : classes jouables
- `/classes/$slug` : détail d’une classe
- `/skills` : base de compétences
- `/skills/$classSlug` : compétences par classe
- `/items` : base d’objets
- `/items/$id` : détail objet (routing par `id`)
- `/builds` : planificateur de build
- `/daevanion-planner` : planificateur Daevanion (grille 15x15)

## Sources de données (locales, statiques)

### Compétences

- `src/data/skills/json/*.json`
- Entrée principale : `src/data/skills/index.ts`

### Objets

- Pack principal :
  - `src/data/aion2/items/aion2hub_clean_json/aion2hub_items_fr_light.json`
  - `src/data/aion2/items/aion2hub_clean_json/aion2hub_items_fr_by_id.json`
  - `src/data/aion2/items/aion2hub_clean_json/aion2hub_items_fr_meta.json`
- Typage / mapping :
  - `src/data/items/types.ts`
  - `src/data/items/index.ts`

### Daevanion

- Source brute :
  - `src/data/aion2/daevanion/tb_boards_embedded.js`
  - `src/data/aion2/daevanion/tb_daevanion_skills.json`
- Donnée convertie :
  - `src/data/aion2/daevanion/boards.json`
- Traductions / mapping :
  - `src/data/aion2/daevanion/translations/fr.ts`
  - `src/lib/aion2/daevanion/translate.ts`

## Notes d’architecture

- Pas de backend/API pour le moment : tout est local statique.
- UI visible utilisateur en français.
- Les clés techniques peuvent rester en anglais dans les données.
- Routing dynamique items en `id` pour éviter les collisions de slug.

## Limites connues

- `tsc --noEmit` peut remonter un warning/erreur de typage sur `vite.config.ts` (`customViteReactPlugin`) selon versions de dépendances, sans empêcher le fonctionnement applicatif local.

## SEO de base

Deux fichiers SEO statiques sont exposes depuis `public/` :

- `public/robots.txt`
- `public/sitemap.xml`

URLs en production :

- `https://aion2-hub.vercel.app/robots.txt`
- `https://aion2-hub.vercel.app/sitemap.xml`

Regles actuelles :

- `robots.txt` autorise le crawl global (`User-agent: *`, `Allow: /`).
- aucun blocage global (`Disallow: /` absent).
- `sitemap.xml` reference les pages principales du site.

## Disclaimer

**Aion 2 et les assets associés appartiennent à NCSoft. Aion2HUB est un projet fan non officiel.**
