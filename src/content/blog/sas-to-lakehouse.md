---
title: "From SAS to the Lakehouse: why the real challenge isn't the code, but trust in the data"
date: "2026-09-19"
excerpt: "A field report on rebuilding a complaints-tracking system with Azure Databricks and a Medallion architecture, focusing on the Silver layer, reconciliation, and data quality."
tags: [Data Engineering, Azure Databricks, SAS, Lakehouse, Medallion Architecture, Data Quality]
lang: en
---

*A field report on rebuilding a complaints-tracking system with Azure Databricks and a Medallion architecture.*

> **Confidentiality note**
>
> Some technical details, specific rules, and figures have been deliberately simplified or anonymized. The lessons shared here remain faithful to the actual work.

## A migration that goes beyond a technical rewrite

Migrating a legacy BI solution to a modern platform looks, on paper, like a mostly technical problem.

You identify the existing jobs, retrieve the source data, rewrite the programs, rebuild the indicators, then reconnect the reporting tools.

In my case, the goal was to evolve a system tracking complaints filed by CAF beneficiaries, historically run in a SAS environment, toward an architecture based on Azure Databricks and Azure storage.

The objective was to rebuild the processing chain following a Medallion architecture, with Bronze, Silver, and Gold layers, then make the data available for decision-making, notably in Power BI.

But as the study progressed, another question took over: **what does it really mean to reproduce an indicator?**

Getting two columns with the same name isn't enough. Producing the same result once isn't enough either.

For a BI migration to succeed, you have to be able to explain why the new environment produces a given result, which data was used, which rules were applied, and in which situations that result may differ from the old system's.

> The real challenge isn't just to migrate the code. It's to rebuild trust in the data.

## A dashboard that hides more logic than it seems

The legacy complaints-tracking system doesn't just count the number of requests received.

It analyzes complaints across several dimensions: contact channel, reason, benefit concerned, period, and processing time. It also helps spot anomalies, dig into specific situations, and support corrective actions.

A complaint is therefore not just a row to aggregate. It's part of a business process.

An unusual trend can lead to a finer analysis by channel, reason, or benefit, then to studying individual cases to identify a cause.

It's this continuity between the data, the indicator, and the business use that must be preserved during the migration.

A mechanical rewrite of the SAS code quickly hits its limits, because the rules aren't all visible in the same place. Some live in the programs, others in the source tables, the data-entry conventions, the documentation, or the users' habits.

## Migrating a BI system isn't the same as translating SAS into PySpark

The most obvious strategy would have been to take each SAS job and produce its Databricks equivalent.

A query becomes a Spark SQL job, a transformation step becomes a PySpark notebook, and an intermediate table becomes a Delta table.

This approach can work technically. But it risks carrying the old system's problems into the new one, and reproducing behaviors whose reason is no longer understood.

Historical indicators don't all come from the same sources or the same rules. Depending on the channel, the available information can vary. Some calculations use different reference dates. The reason or the benefit isn't always filled in. Late records, historization mechanisms, or handoffs between applications can also change what shows up in an indicator.

Two questions then become unavoidable:

- If I reproduce a historical behavior exactly, is it because it matches an expected business rule, or because it results from an old technical constraint?
- If I fix it, is it a quality improvement or a silent change to the indicator's definition?

> Migration isn't just about rewriting what the old system did. It forces you to decide what actually needed to be kept.

## Three layers and three levels of trust

The Medallion architecture is often summarized like this: Bronze receives the raw data, Silver cleans it, and Gold holds the business aggregations.

This picture is useful to get started, but it becomes insufficient in a real project.

In this migration, I preferred to think of the three layers as three different levels of trust in the data.

| Layer | Core question | Responsibility |
| --- | --- | --- |
| **Bronze** | What did we actually receive? | Preserve the source data and its arrival context |
| **Silver** | How do we interpret the data in a stable way? | Normalize, qualify, and make the rules explicit and testable |
| **Gold** | Which indicators can we expose? | Build reliable data suited to decision-making |

## Bronze: preserve before interpreting

The Bronze layer's first responsibility is fidelity to the source.

It can be tempting to start correcting right away: renaming values, dropping rows deemed useless, converting codes, or deduplicating records.

In a migration context, modifying the data too early actually means losing part of the evidence.

If a gap appears between SAS and Databricks, the first question is simple: **did both systems start from the same data?**

Bronze must make it possible to answer that. It keeps the data as close as possible to its original state, along with the metadata needed to trace the source, the ingestion date, and the file or batch concerned.

> The Bronze layer doesn't yet represent the business truth. It represents the source truth.

This nuance is essential. Raw data can be inconsistent while still having been correctly ingested.

At this stage, the goal isn't to declare it reliable for analysis, but to guarantee that it stays observable and replayable.

## Silver: where the migration really plays out

The Silver layer is probably the least visible to the end user. Yet this is where much of the difficulty is concentrated.

Before building an indicator, several decisions must be made:

- define what a complaint is and the granularity of a row;
- choose which channel to keep when several pieces of information are available;
- determine what an unqualified benefit or reason means;
- select the reference date when several dates coexist;
- handle late arrivals and potential duplicates;
- separate business rules from behaviors inherited from the old system.

Silver thus becomes far more than a cleaning zone. It is a canonical representation of the business domain.

The sources' technical codes are turned into understandable, documented, and controllable concepts.

### Code alone doesn't justify the rule

A Silver job can technically normalize a channel, qualify a complaint, or choose a reference date in a few lines:

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

But the code isn't the hardest part.

Above all, you have to be able to justify each decision.

Why does this value map to that channel? Why does this date take priority? Is a missing benefit an anomaly or an expected situation?

The answer can't come from the developer alone. It has to be checked against the source data, the historical documentation, and business knowledge.

### Keep the source value after normalization

Normalizing data shouldn't make its original state disappear too quickly.

If a technical code becomes a business label, keeping only the final value makes reading easier but reduces traceability.

In a migration, it's often better to keep both representations:

- the value received from the source system;
- the value harmonized for analysis.

This redundancy becomes useful when a user asks why a row was classified in a given category. Silver must make it possible to trace the decision chain back.

## When a technical gap reveals a business change

During the reconciliation checks between SAS and Databricks, I noticed a difference in the number of complaints received by mail for the reason **"Other"**.

At first glance, this gap could have been read as an error in the new pipeline: a wrong filter, a missing row, a bad join, or a different aggregation rule.

So I compared the results from both environments, then queried the source tables directly in SQL to identify at what point and at what level the volumes diverged.

The analysis showed that the Databricks processing wasn't the cause of the problem.

Starting in 2024, the classification rule had changed in the source system. Complaints previously tied to the reason **"Other"** were now recorded under a new reason, **"Unqualified"**.

The change looks minor on the technical side. Yet it introduces a break in the continuity of the indicators.

A direct comparison of the "Other" reason before and after 2024 can give the impression of a drop, when in fact part of the volume simply moved to another category.

> The problem wasn't `SAS ≠ Databricks`.
>
> The problem was `business definition before 2024 ≠ business definition from 2024 onward`.

This distinction changed how I handled the gap.

To keep a consistent reading of the history, the two reasons had to be brought together in the analytical data, while keeping the original value for auditing.

```sql
CASE
    WHEN motif_source IN ('Autres', 'Non qualifié')
        THEN 'Autres / Non qualifié'
    ELSE motif_source
END AS motif_analyse
```

| Period | Source reason | Analysis reason |
| --- | --- | --- |
| Before 2024 | Autres | Autres / Non qualifié |
| From 2024 onward | Non qualifié | Autres / Non qualifié |

The fix couldn't stay purely technical.

The new rule had to be explained to the dashboard's users so that a break in classification wouldn't be read as a real change in the number of complaints.

Two complementary actions were therefore needed:

1. normalize both categories in the analytical model to preserve historical comparability;
2. communicate the rule to the business teams to align the interpretation of the new indicator.

> Before fixing a gap, you have to determine whether it's a calculation error, a data anomaly, or a change in the business definition.

## Reconciliation as a method of understanding

Reconciliation between SAS and Databricks isn't just about checking that two totals match.

Its goal is to make every difference explainable.

For the same period and the same population, results can be compared along several axes: overall volume, channel, reason, benefit, reference date, and source.

When a gap appears, the investigation has to follow the data's path:

- Is the data missing as early as the Bronze layer?
- Was it excluded or reclassified in Silver?
- Is it present, but tied to another period?
- Does the Gold calculation use exactly the same scope?
- Does the difference correspond to a new rule validated by the business?

The gap then stops being just a bad result to fix. It becomes information about how the system works.

### A useful classification of gaps

During a migration, not all gaps should get the same response.

I distinguish four situations:

1. **Technical error in the new pipeline**: a transformation, a join, or a filter produces an incorrect result and must be fixed.
2. **Source quality gap**: the initial data is missing, inconsistent, late, or poorly qualified.
3. **Historical behavior to keep**: a sometimes imperfect rule must be reproduced temporarily to preserve the continuity of the indicators.
4. **Deliberate functional gap**: the rule evolves in a way that is intentional, documented, and validated with the business.

This classification avoids treating the old system as an absolute truth.

It's an indispensable reference, but not necessarily a perfect specification.

## An indicator can be correct and still be misleading

Growth rates are useful for quickly spotting a rise or a fall.

But they can become spectacular when the starting volumes are very small. Going from a few complaints to a slightly higher number can produce a large percentage without reflecting a large-scale phenomenon.

This situation is a reminder of a fundamental BI rule: **the mathematical correctness of an indicator doesn't guarantee its analytical relevance.**

Computing the rate isn't enough. The Gold layer must also expose the current volume, the reference volume, and, where relevant, the context needed to interpret the gap.

```text
taux_evolution =
    (volume_actuel - volume_reference) / volume_reference
```

The Data Engineer's role isn't to interpret the KPI in the business's place. It's to build a model that makes a correct interpretation possible.

## Gold: simplifying usage thanks to the work done upstream

When Silver is well designed, the Gold layer deliberately becomes simpler. That's a sign of architectural maturity.

The rules for normalization, qualification, and resolving inconsistencies shouldn't be rewritten in every indicator.

Gold can then focus on decision-making uses:

- complaint volumes;
- breakdowns by channel, reason, or benefit;
- processing times;
- monthly trends;
- comparisons with previous periods.

This organization also simplifies usage in Power BI.

The reporting tool shouldn't decide what a valid complaint is, how to normalize a channel, or which date is authoritative. Those decisions belong to the data platform.

Power BI can then focus on presentation, filtering, and exploring the information.

## Data quality as a feature of the pipeline

This migration led me to rethink how I see Data Quality.

Checks shouldn't be a verification tacked on only at the end. Quality has to become an observable characteristic of every layer.

- **In Bronze**, I check that the expected data has arrived, that the volumes are plausible, and that their origin is traceable.
- **In Silver**, I verify the values, the keys, the duplicates, the dates, the missing data, and the business rules.
- **In Gold**, I check the consistency of the aggregations, unusual breaks, and the stability of the main KPIs.

We thus move from:

> The job finished successfully.

to:

> The job finished, and I have evidence to state that its result is usable.

A pipeline can be green in the orchestrator while having lost part of the data, or having silently changed its meaning.

## Legacy also holds knowledge

It would be easy to pit an aging SAS system against a modern Lakehouse. That reading would be too simplistic.

A system used for several years contains more than old code.

It contains decisions, exceptions, fixes applied after incidents, data-entry practices, sometimes poorly documented business knowledge, and trade-offs tied to the technologies available when it was built.

Migrating that system is, in part, an act of archaeology.

You have to determine which rules are still relevant, which depended on old constraints, and which need to be reconsidered.

Modernization then becomes an opportunity to make explicit what was previously buried in the jobs.

## This project changed how I see the Data Engineer's role

At the start of a migration like this, the visible part of the work seems mostly technological: SAS, PySpark, Spark SQL, Azure, Databricks, Delta, Medallion architecture, and Power BI.

These technologies matter, but they aren't the final result.

The real product is a system in which data can be understood, verified, and used with enough confidence to support a decision.

The Data Engineer thus stands at the intersection of technical performance, quality, business rules, traceability, and analytical use.

This responsibility is especially visible in Silver. This layer is neither raw nor yet meant for reporting. It's the point where you turn received data into understood data.

## Conclusion

Migrating a legacy BI system from SAS to Azure Databricks isn't about moving jobs from one technology to another.

The code can be rewritten, the notebooks can run, and the data can be loaded without the new indicator telling exactly the same story as the old one.

The real work begins when you try to understand the rules that produced the indicator, the exceptions that influence its calculation, and the historical behaviors that must be kept, corrected, or made explicit.

The case of the "Other" and "Unqualified" reasons illustrates this clearly.

The gap between SAS and Databricks didn't come from a flaw in the new processing, but from a change in the source classification. Resolving it required a technical investigation, a normalization rule, and business communication.

That's why I now consider the Silver layer to be the heart of this migration.

Bronze keeps what was received. Gold exposes what the business wants to analyze. **Silver must be able to explain how we got from one to the other.**

> A modern data platform doesn't stand out only for its ability to compute. It stands out for its ability to explain its results and inspire trust.
