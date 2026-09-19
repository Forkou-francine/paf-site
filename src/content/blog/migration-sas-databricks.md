---
title: "Du SAS au Lakehouse : pourquoi le vrai défi n'est pas le code, mais la confiance dans la donnée"
date: "2026-09-19"
excerpt: "Retour d'expérience sur la reconstruction d'un système de suivi des réclamations avec Azure Databricks et une architecture Medallion, avec un focus sur la couche Silver, la réconciliation et la qualité des données."
tags: [Data Engineering, Azure Databricks, SAS, Lakehouse, Architecture Medallion, Data Quality]
lang: fr
---

*Retour d'expérience sur la reconstruction d'un système de suivi des réclamations avec Azure Databricks et une architecture Medallion.*

> **Note de confidentialité**
>
> Certaines informations techniques, règles détaillées et données chiffrées ont été volontairement simplifiées ou anonymisées. Les enseignements présentés restent fidèles à la démarche menée.

## Une migration qui dépasse la réécriture technique

Migrer une solution décisionnelle historique vers une plateforme moderne semble, sur le papier, être un problème essentiellement technique.

Il faut identifier les traitements existants, récupérer les données sources, réécrire les programmes, reconstruire les indicateurs, puis reconnecter les outils de restitution.

Dans mon cas, il s'agissait de faire évoluer une solution de suivi des réclamations formulées par les allocataires des Caf, historiquement exploitée dans un environnement SAS, vers une architecture reposant sur Azure Databricks et un stockage Azure.

L'objectif était de reconstruire la chaîne de traitement selon une architecture Medallion, avec des couches Bronze, Silver et Gold, puis de rendre les données disponibles pour leur exploitation décisionnelle, notamment dans Power BI.

Mais au fil de l'étude, une autre question s'est imposée : **que signifie réellement reproduire un indicateur ?**

Obtenir deux colonnes portant le même nom ne suffit pas. Produire le même résultat une première fois ne suffit pas non plus.

Pour qu'une migration décisionnelle soit réussie, il faut pouvoir expliquer pourquoi le nouvel environnement produit un résultat, quelles données ont été utilisées, quelles règles ont été appliquées et dans quelles situations ce résultat peut différer de celui de l'ancien système.

> Le véritable enjeu n'est pas seulement de migrer le code. Il est de reconstruire la confiance dans la donnée.

## Un tableau de bord qui cache plus de logique qu'il n'y paraît

Le système historique de suivi des réclamations ne se limite pas à compter le nombre de demandes reçues.

Il permet d'analyser les réclamations selon plusieurs dimensions : le canal de contact, le motif, la prestation concernée, la période et le délai de traitement. Il sert aussi à repérer des atypies, approfondir certaines situations et accompagner la mise en place d'actions correctives.

Une réclamation n'est donc pas uniquement une ligne à agréger. Elle s'inscrit dans un processus métier.

Une évolution inhabituelle peut conduire à une analyse plus fine par canal, motif ou prestation, puis à l'étude de situations individuelles pour identifier une cause.

C'est cette continuité entre la donnée, l'indicateur et l'usage métier qu'il faut préserver lors de la migration.

Une réécriture mécanique du SAS atteint rapidement ses limites, car les règles ne sont pas toutes visibles au même endroit. Certaines se trouvent dans les programmes, d'autres dans les tables sources, les conventions de saisie, la documentation ou les habitudes des utilisateurs.

## Migrer un système décisionnel ne revient pas à traduire du SAS en PySpark

La stratégie la plus évidente aurait consisté à prendre chaque traitement SAS et à produire son équivalent dans Databricks.

Une requête devient un traitement Spark SQL, une étape de transformation devient un notebook PySpark et une table intermédiaire devient une table Delta.

Cette approche peut fonctionner techniquement. Elle risque cependant de transporter les problèmes de l'ancien système dans le nouveau et de reproduire des comportements dont la raison n'est plus comprise.

Les indicateurs historiques ne proviennent pas tous des mêmes sources ni des mêmes règles. Selon le canal, les informations disponibles peuvent varier. Certains calculs utilisent des dates de référence différentes. Le motif ou la prestation ne sont pas toujours renseignés. Des enregistrements tardifs, des mécanismes d'historisation ou des passages entre applications peuvent également modifier ce qui apparaît dans un indicateur.

Deux questions deviennent alors incontournables :

- Si je reproduis exactement un comportement historique, est-ce parce qu'il correspond à une règle métier attendue ou parce qu'il résulte d'une contrainte technique ancienne ?
- Si je le corrige, est-ce une amélioration de la qualité ou une modification silencieuse de la définition de l'indicateur ?

> La migration ne consiste pas seulement à réécrire ce que faisait l'ancien système. Elle oblige à déterminer ce qu'il fallait réellement conserver.

## Trois couches et trois niveaux de confiance

L'architecture Medallion est souvent résumée ainsi : Bronze reçoit les données brutes, Silver les nettoie et Gold contient les agrégations métier.

Cette représentation est utile pour démarrer, mais elle devient insuffisante dans un projet réel.

Dans cette migration, j'ai préféré considérer les trois couches comme trois niveaux de confiance différents dans la donnée.

| Couche | Question principale | Responsabilité |
| --- | --- | --- |
| **Bronze** | Qu'avons-nous réellement reçu ? | Préserver les données sources et leur contexte d'arrivée |
| **Silver** | Comment interpréter la donnée de façon stable ? | Normaliser, qualifier et rendre les règles explicites et testables |
| **Gold** | Quels indicateurs pouvons-nous exposer ? | Construire des données fiables et adaptées aux usages décisionnels |

## Bronze : préserver avant d'interpréter

La première responsabilité de la couche Bronze est la fidélité à la source.

Il peut être tentant de commencer immédiatement les corrections, de renommer les valeurs, supprimer les lignes jugées inutiles, convertir les codes ou dédupliquer les enregistrements.

Dans le contexte d'une migration, modifier trop tôt la donnée revient pourtant à perdre une partie de la preuve.

Si un écart apparaît entre SAS et Databricks, la première question est simple : **les deux systèmes sont-ils partis de la même donnée ?**

La Bronze doit permettre d'y répondre. Elle conserve les données au plus près de leur état d'origine, ainsi que les métadonnées nécessaires pour retrouver la source, la date d'ingestion, le fichier ou le lot concerné.

> La couche Bronze ne représente pas encore la vérité métier. Elle représente la vérité source.

Cette nuance est essentielle. Une donnée brute peut être incohérente tout en ayant été correctement ingérée.

L'objectif, à ce stade, n'est pas de la déclarer fiable pour l'analyse, mais de garantir qu'elle reste observable et rejouable.

## Silver : l'endroit où se joue réellement la migration

La couche Silver est probablement la moins visible pour l'utilisateur final. Pourtant, c'est ici que se concentre une grande partie de la difficulté.

Avant de construire un indicateur, plusieurs décisions doivent être prises :

- définir ce qu'est une réclamation et la granularité d'une ligne ;
- choisir le canal à retenir lorsque plusieurs informations sont disponibles ;
- déterminer ce que signifie une prestation ou un motif non qualifié ;
- sélectionner la date de référence lorsque plusieurs dates coexistent ;
- traiter les arrivées tardives et les doublons potentiels ;
- séparer les règles métier des comportements hérités de l'ancien système.

La Silver devient ainsi bien plus qu'une zone de nettoyage. Elle constitue une représentation canonique du domaine métier.

Les codes techniques des sources y sont transformés en concepts compréhensibles, documentés et contrôlables.

### Le code ne suffit pas à justifier la règle

Un traitement Silver peut techniquement normaliser un canal, qualifier une réclamation ou choisir une date de référence en quelques lignes :

```python
from pyspark.sql import functions as F

silver_reclamations = (
    bronze_reclamations
        .withColumn(
            "canal_normalise",
            normaliser_canal(F.col("canal_source"))
        )
        .withColumn(
            "date_reference",
            F.coalesce(
                F.col("date_enregistrement"),
                F.col("date_evenement")
            )
        )
        .withColumn(
            "reclamation_qualifiee",
            F.col("motif").isNotNull()
            & F.col("prestation").isNotNull()
        )
)
```

Le code n'est pourtant pas la partie la plus difficile.

Il faut surtout être capable de justifier chaque décision.

Pourquoi cette valeur correspond-elle à ce canal ? Pourquoi cette date est-elle prioritaire ? L'absence de prestation est-elle une anomalie ou une situation prévue ?

La réponse ne peut pas venir uniquement du développeur. Elle doit être confrontée aux données sources, à la documentation historique et à la connaissance du métier.

### Conserver la valeur source après normalisation

Normaliser une donnée ne doit pas faire disparaître trop vite son état d'origine.

Si un code technique devient un libellé métier, conserver uniquement la valeur finale facilite la lecture, mais réduit la traçabilité.

Dans une migration, il est souvent préférable de conserver les deux représentations :

- la valeur reçue du système source ;
- la valeur harmonisée pour l'analyse.

Cette redondance devient utile lorsqu'un utilisateur demande pourquoi une ligne a été classée dans une catégorie donnée. La Silver doit permettre de remonter la chaîne de décision.

## Quand un écart technique révèle une évolution métier

Lors des contrôles de réconciliation entre SAS et Databricks, j'ai constaté une différence sur le nombre de réclamations reçues par courrier pour le motif **« Autres »**.

À première vue, cet écart pouvait être interprété comme une erreur du nouveau pipeline : filtre incorrect, ligne absente, mauvaise jointure ou règle d'agrégation différente.

J'ai donc comparé les résultats des deux environnements, puis interrogé directement les tables sources en SQL afin d'identifier le moment et le niveau auxquels les volumes divergeaient.

L'analyse a montré que le traitement Databricks n'était pas à l'origine du problème.

À partir de 2024, la règle de classification avait évolué dans le système source. Des réclamations auparavant rattachées au motif **« Autres »** étaient désormais enregistrées sous un nouveau motif, **« Non qualifié »**.

Le changement paraît mineur sur le plan technique. Il introduit pourtant une rupture dans la continuité des indicateurs.

Une comparaison directe du motif « Autres » avant et après 2024 peut donner l'impression d'une baisse, alors qu'une partie du volume a simplement changé de catégorie.

> Le problème n'était pas `SAS ≠ Databricks`.
>
> Le problème était `définition métier avant 2024 ≠ définition métier à partir de 2024`.

Cette distinction a changé la manière de traiter l'écart.

Pour conserver une lecture cohérente de l'historique, il a fallu rapprocher les deux motifs dans la donnée analytique, tout en conservant la valeur d'origine pour l'audit.

```sql
CASE
    WHEN motif_source IN ('Autres', 'Non qualifié')
        THEN 'Autres / Non qualifié'
    ELSE motif_source
END AS motif_analyse
```

| Période | Motif source | Motif d'analyse |
| --- | --- | --- |
| Avant 2024 | Autres | Autres / Non qualifié |
| À partir de 2024 | Non qualifié | Autres / Non qualifié |

La correction ne pouvait pas rester uniquement technique.

La nouvelle règle devait être expliquée aux utilisateurs du tableau de bord afin qu'une rupture de classification ne soit pas interprétée comme une évolution réelle du nombre de réclamations.

Deux actions complémentaires ont donc été nécessaires :

1. normaliser les deux catégories dans le modèle analytique afin de préserver la comparabilité historique ;
2. communiquer la règle aux métiers afin d'aligner l'interprétation du nouvel indicateur.

> Avant de corriger un écart, il faut déterminer s'il s'agit d'une erreur de calcul, d'une anomalie de données ou d'un changement de définition métier.

## La réconciliation comme méthode de compréhension

La réconciliation entre SAS et Databricks ne consiste pas seulement à vérifier que deux totaux sont identiques.

Son objectif est de rendre chaque différence explicable.

Pour une même période et une même population, les résultats peuvent être comparés selon plusieurs axes : volume global, canal, motif, prestation, date de référence et source.

Lorsqu'un écart apparaît, l'investigation doit suivre le chemin de la donnée :

- La donnée est-elle absente dès la couche Bronze ?
- A-t-elle été exclue ou reclassée en Silver ?
- Est-elle présente, mais rattachée à une autre période ?
- Le calcul Gold utilise-t-il exactement le même périmètre ?
- La différence correspond-elle à une règle nouvelle validée par le métier ?

L'écart cesse alors d'être seulement un mauvais résultat à corriger. Il devient une information sur le fonctionnement du système.

### Une classification utile des écarts

Au cours d'une migration, tous les écarts ne doivent pas recevoir la même réponse.

Je distingue quatre situations :

1. **Erreur technique du nouveau pipeline** : une transformation, une jointure ou un filtre produit un résultat incorrect et doit être corrigé.
2. **Écart de qualité source** : la donnée initiale est absente, incohérente, tardive ou mal qualifiée.
3. **Comportement historique à conserver** : une règle parfois imparfaite doit être reproduite temporairement pour préserver la continuité des indicateurs.
4. **Écart fonctionnel volontaire** : la règle évolue de manière assumée, documentée et validée avec le métier.

Cette classification évite de considérer l'ancien système comme une vérité absolue.

Il constitue une référence indispensable, mais pas nécessairement une spécification parfaite.

## Un indicateur peut être juste et rester trompeur

Les taux d'évolution sont utiles pour détecter rapidement une hausse ou une baisse.

Ils peuvent cependant devenir spectaculaires lorsque les volumes de départ sont très faibles. Passer de quelques réclamations à un nombre légèrement supérieur peut produire un pourcentage important sans traduire un phénomène de grande ampleur.

Cette situation rappelle une règle fondamentale du décisionnel : **la justesse mathématique d'un indicateur ne garantit pas sa pertinence analytique.**

Le calcul du taux ne suffit donc pas. La couche Gold doit également exposer le volume actuel, le volume de référence et, lorsque cela est pertinent, le contexte nécessaire pour interpréter l'écart.

```text
taux_evolution =
    (volume_actuel - volume_reference) / volume_reference
```

Le rôle du Data Engineer n'est pas d'interpréter le KPI à la place du métier. Il est de construire un modèle qui rende une interprétation correcte possible.

## Gold : simplifier les usages grâce au travail réalisé en amont

Lorsque la Silver est correctement conçue, la couche Gold devient volontairement plus simple. C'est un signe de maturité de l'architecture.

Les règles de normalisation, de qualification et de résolution des incohérences ne devraient pas être réécrites dans chaque indicateur.

La Gold peut alors se concentrer sur les usages décisionnels :

- volumes de réclamations ;
- répartitions par canal, motif ou prestation ;
- délais de traitement ;
- évolutions mensuelles ;
- comparaisons avec les périodes précédentes.

Cette organisation simplifie aussi l'exploitation dans Power BI.

L'outil de restitution ne devrait pas décider ce qu'est une réclamation valide, comment normaliser un canal ou quelle date fait foi. Ces décisions appartiennent à la plateforme de données.

Power BI peut alors se concentrer sur la présentation, le filtrage et l'exploration de l'information.

## La qualité des données comme fonctionnalité du pipeline

Cette migration m'a amenée à revoir ma perception de la Data Quality.

Les contrôles ne doivent pas être une vérification ajoutée uniquement à la fin. La qualité doit devenir une caractéristique observable de chaque couche.

- **En Bronze**, je contrôle que les données attendues sont arrivées, que les volumes sont plausibles et que leur origine est traçable.
- **En Silver**, je vérifie les valeurs, les clés, les doublons, les dates, les données manquantes et les règles métier.
- **En Gold**, je contrôle la cohérence des agrégations, les ruptures inhabituelles et la stabilité des principaux KPI.

On passe ainsi de :

> Le job a terminé avec succès.

à :

> Le job a terminé et je dispose d'éléments permettant d'affirmer que son résultat est exploitable.

Un pipeline peut être vert dans l'orchestrateur tout en ayant perdu une partie des données ou en ayant modifié silencieusement leur sens.

## Le legacy contient aussi de la connaissance

Il serait facile d'opposer un système SAS vieillissant à un Lakehouse moderne. Cette lecture serait trop simpliste.

Un système utilisé pendant plusieurs années contient davantage que du code ancien.

Il contient des décisions, des exceptions, des corrections apportées après des incidents, des pratiques de saisie, des connaissances métier parfois peu documentées et des compromis liés aux technologies disponibles lors de sa construction.

Migrer ce système revient en partie à faire de l'archéologie.

Il faut déterminer quelles règles sont encore pertinentes, lesquelles dépendaient de contraintes anciennes et lesquelles doivent être rediscutées.

La modernisation devient alors une occasion de rendre explicite ce qui était auparavant enfoui dans les traitements.

## Ce projet a changé ma perception du rôle du Data Engineer

Au début d'une migration de ce type, la partie visible du travail semble principalement technologique : SAS, PySpark, Spark SQL, Azure, Databricks, Delta, architecture Medallion et Power BI.

Ces technologies sont importantes, mais elles ne constituent pas le résultat final.

Le véritable produit est un système dans lequel une donnée peut être comprise, vérifiée et utilisée avec suffisamment de confiance pour soutenir une décision.

Le Data Engineer se trouve ainsi à l'intersection de la performance technique, de la qualité, des règles métier, de la traçabilité et de l'exploitation analytique.

Cette responsabilité est particulièrement visible en Silver. Cette couche n'est ni brute ni encore destinée à la restitution. Elle constitue le point où l'on transforme une donnée reçue en une donnée comprise.

## Conclusion

Migrer un système décisionnel historique de SAS vers Azure Databricks ne consiste pas à déplacer des traitements d'une technologie vers une autre.

Le code peut être réécrit, les notebooks peuvent s'exécuter et les données peuvent être chargées sans que le nouvel indicateur raconte exactement la même chose que l'ancien.

Le véritable travail commence lorsqu'on cherche à comprendre les règles qui ont produit l'indicateur, les exceptions qui influencent son calcul et les comportements historiques qu'il faut conserver, corriger ou rendre explicites.

Le cas des motifs « Autres » et « Non qualifié » l'illustre clairement.

L'écart entre SAS et Databricks ne provenait pas d'un défaut du nouveau traitement, mais d'une évolution de la classification source. Sa résolution a nécessité une investigation technique, une règle de normalisation et une communication métier.

C'est pour cette raison que je considère aujourd'hui la couche Silver comme le cœur de cette migration.

Bronze conserve ce qui a été reçu. Gold expose ce que le métier souhaite analyser. **Silver doit être capable d'expliquer comment nous sommes passés de l'un à l'autre.**

> Une plateforme de données moderne ne se distingue pas seulement par sa capacité à calculer. Elle se distingue par sa capacité à expliquer ses résultats et à inspirer confiance.
