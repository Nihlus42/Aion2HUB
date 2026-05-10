# Aion2HUB clean item JSON files

Generated from `talentbuilds_items_all_organized.json`.

Files:

- `aion2hub_items_fr_light.json`: recommended for list/search/card UI.
- `aion2hub_items_fr_full.json`: full detail data, no raw source blob.
- `aion2hub_items_fr_by_id.json`: same full data keyed by item id.
- `aion2hub_items_fr_meta.json`: counts + filters for UI.
- `by_category/*.json`: optional lazy-loaded category splits.

Important notes:

- Original English text is preserved in `nameEn`, `descriptionEn`, `categoryEn`, `gradeNameEn`.
- French fields are rule-based: `nameFr`, `descriptionFr`, `categoryFr`, `gradeFr`, `optionsFr`.
- `descriptionStatus` marks empty, auto_partial, same_as_en, or untranslated_non_latin.
- `nameFrStatus` marks auto_partial or same_as_en.
- Use `image` directly for icons; it points to the NCSoft CDN path found in the source data.
- Avoid displaying descriptions where `descriptionFr` is null or `descriptionStatus` is `untranslated_non_latin` unless you add a warning/fallback.

Suggested UI usage:

```ts
import items from '@/data/aion2hub_items_fr_light.json';

// Card fields:
// item.nameFr, item.image, item.categoryFr, item.gradeFr, item.tradable, item.topOptionsFr
```
