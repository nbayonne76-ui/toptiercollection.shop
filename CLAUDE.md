# toptiercollection.shop — conventions du dépôt

Boutique en ligne Top Tier Collection (www.toptiercollection.shop) : Next.js 14 (App Router),
React 18, TypeScript, Tailwind, panier zustand, catalogue et paiement Shopify, contact par Resend.

Règles communes (hébergement, fournisseurs d'IA) : chargées par `~/.claude/rules/happi`, pas ici.
`.claude/settings.json` active le plugin `happi@happi-brain`. Fiche : `happi-brain/projects/toptiercollection.md`.

## Avant de dire qu'une tâche est finie

```bash
npm run verify   # = npm run build : compilation, types et génération des pages
```

Passe en local sans aucune variable (vérifié le 2026-09-16). `npm run lint` n'est **pas** utilisable :
aucune configuration ESLint n'existe, `next lint` ouvre un assistant interactif et sort en erreur.
Aucune CI GitHub Actions : les seuls checks sont les déploiements Vercel.

## Commandes

- `npm run dev` (port 3000), `npm run build`, `npm run start`.
- `studio/` est un paquet séparé (Sanity Studio) avec son propre `package.json` : `sanity dev`.
- Vercel installe avec `npm install --legacy-peer-deps` (`vercel.json`) : garder la même commande en
  local si `npm install` refuse l'arbre de dépendances.

## Ce qui est structurant ici

- Déploiement : Vercel, branche par défaut `main`. Le projet `toptiercollection-shop-m3ei` sert
  `www.toptiercollection.shop`. Quatre autres projets (`toptiercollection-shop`, `-5585`, `-xhri`,
  `-ohhk`) redéploient le même dépôt à chaque push : ne lier aucun d'eux. Le domaine nu redirige
  en 307 vers `www`. Fonctions en `iad1` (`x-vercel-id` relevé le 2026-09-16), pas de `regions`.
- **Le dépôt est public** : aucun secret, aucune adresse, aucun jeton dans le code ni dans un commit.
- Variables (noms seulement) : `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`, `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`,
  `NEXT_PUBLIC_SHOPIFY_API_VERSION` (défaut `2025-01`), `RESEND_API_KEY`. `.env.local.example` ne
  liste que des variables Sanity, que le site n'utilise pas.
- Catégories = tags Shopify : `home-decor`, `kitchenware`, `pet-products`, `beauty-self-care`
  (`mapCategory`, `src/lib/shopify.ts`). Un produit sans tag connu tombe en `home-decor`.
- Six langues côté client (`en`, `fr`, `de`, `it`, `es`, `sv`) dans `src/data/translations.ts`.
  Toute modification de texte visible touche les six blocs.

## Pièges vérifiés dans le code

- **Deux sources de produits.** `/products` et `/products/[category]` lisent Shopify.
  L'accueil et `/product/[id]` lisent `src/data/products.ts`, un tableau **vide**. L'accueil n'affiche
  donc aucun produit vedette, et toute fiche produit renvoie une 404. Au 2026-09-16, `/products`
  en production affiche l'état vide « Products coming soon ».
- Paiement : seul le tiroir (`CartDrawer`) mène au checkout, par l'URL de panier Shopify
  `/cart/<variante>:<quantité>`. Le bouton de `/cart` n'a aucune action.
- `/auth/login` et `/auth/signup` sont des maquettes : validation locale, aucun appel serveur.
- Sanity est du code mort : `src/lib/sanity.ts`, `src/lib/queries.ts`, `sanity/` et `studio/` ne sont
  importés par aucune page.
- `/api/contact` envoie par Resend depuis l'expéditeur partagé `resend.dev`. Les champs du visiteur
  sont validés (chaînes non vides, longueur bornée, email) et **échappés** avant d'entrer dans le HTML
  de l'email ; sujet et `replyTo` sont ramenés sur une ligne. Garder `escapeHtml` sur tout nouveau champ.
