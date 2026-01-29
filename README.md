# Playdex

Završni rad iz kolegija Programiranje za Web.

**Tema:** Aplikacija za preporuku i recenzije za video igre

**Autori:** Martin Pavlaković, Patrik Mandić

## Pokretanje DEV servera

- U backend folderu kreirati .env datoteku i definirati SECRET_KEY
- U backend folderu napraviti virual environment i instalirati pakete iz `requirements.txt`
- Opcionalno pokrenuti python datoteku `load_test_data.py`.
- U backend folderu pokrenuti komandu `uvicorn main:app --reload`
- U frontend folderu pokrenuti `npm install` i `npm run dev`

## Live server

Web stranica je (trenutno) dostupna na [https://playdex.fly.dev/](https://playdex.fly.dev/). Podatci se brišu nakon kratkog peroioda.