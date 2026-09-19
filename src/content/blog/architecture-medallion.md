---
title: "L'architecture Medallion, expliquée simplement"
date: "2026-07-20"
excerpt: "Bronze, Silver, Gold : trois couches pour transformer des données brutes en décisions fiables. Voici comment je l'utilise au quotidien."
tags: [Data Engineering, Databricks, Architecture]
lang: fr
---

Quand on débute en data engineering, on entend vite parler de l'**architecture Medallion**. Derrière ce nom un peu solennel se cache une idée toute simple : ne jamais mélanger la donnée brute et la donnée prête à l'emploi. On la fait mûrir en trois étapes.

## 🥉 Bronze : la donnée brute

C'est le point d'entrée. On y stocke la donnée **exactement comme elle arrive**, sans la modifier : fichiers dans tous les formats, colonnes mal nommées, doublons, valeurs manquantes.

La règle d'or : **on ne touche jamais au Bronze**. C'est notre historique complet. Si un traitement en aval se trompe, on peut toujours repartir de cette source de vérité.

## 🥈 Silver : la donnée nettoyée

Ici, on structure. On nettoie les valeurs aberrantes, on type correctement les colonnes, on déduplique, on applique les règles métier. La donnée devient **fiable et cohérente**.

C'est souvent la couche la plus riche en logique : c'est là que se joue la qualité de tout ce qui suivra.

## 🥇 Gold : la donnée prête pour la décision

Enfin, on agrège. Le Gold contient les tables et indicateurs **directement consommables** par un dashboard ou une analyse : KPIs, agrégats, métriques métier précalculées.

Résultat : les requêtes sont rapides, et les utilisateurs métier voient des chiffres clairs sans se soucier de la complexité en amont.

## Pourquoi j'aime ce modèle

- **Traçabilité** : à chaque étape, je sais d'où vient la donnée.
- **Robustesse** : une erreur dans une couche ne corrompt pas les autres.
- **Clarté** : chaque couche a un rôle unique et compréhensible.

C'est le même modèle que j'utilise sur mes pipelines à la CNAF comme sur mes projets perso. Simple à expliquer, solide en production, exactement ce qu'on demande à une bonne architecture de données.
