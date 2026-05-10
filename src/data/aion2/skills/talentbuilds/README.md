# Aion2HUB - Skills FR Pack

Contenu généré à partir des exports Talentbuilds Skills fournis.

## Fichiers principaux
- `aion2hub_skills_fr_all.json` : toutes les compétences fusionnées (175 skills)
- `aion2hub_skills_fr_by_id.json` : accès direct par ID
- `aion2hub_skills_fr_by_class.json` : compétences groupées par classe
- `aion2hub_skills_fr_meta.json` : metadata pour filtres
- `aion2hub_skills_<classe>_fr.json` : fichier séparé par classe

## Règle UI importante
Afficher en priorité :
- `nameFr`
- `classFr`
- `typeFr`
- `descriptionFr`
- `specialtyFr`
- `tagsFr`

Conserver les champs anglais uniquement comme référence interne/debug.
Ne pas afficher de fallback anglais dans l’UI publique si l’objectif est un site 100 % FR.

## Note qualité
La traduction est automatique/rule-based. Elle est exploitable pour une V1 FR, mais certains textes longs peuvent mériter une relecture humaine plus tard.
