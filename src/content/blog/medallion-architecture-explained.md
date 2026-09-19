---
title: "The Medallion Architecture, Simply Explained"
date: "2026-07-20"
excerpt: "Bronze, Silver, Gold: three layers that turn raw data into reliable decisions. Here's how I use it every day."
tags: [Data Engineering, Databricks, Architecture]
lang: en
---

When you start out in data engineering, you quickly hear about the **Medallion architecture**. Behind that slightly solemn name lies a very simple idea: never mix raw data with ready-to-use data. You let it mature in three stages.

## 🥉 Bronze: raw data

This is the entry point. You store the data **exactly as it arrives**, without changing it: files in every format, badly named columns, duplicates, missing values.

The golden rule: **never touch the Bronze layer**. It's your full history. If a downstream job goes wrong, you can always start again from this source of truth.

## 🥈 Silver: cleaned-up data

Here, you bring structure. You clean up outliers, type the columns correctly, deduplicate, and apply business rules. The data becomes **reliable and consistent**.

This is often the layer with the most logic: it's where the quality of everything that follows is decided.

## 🥇 Gold: decision-ready data

Finally, you aggregate. The Gold layer holds the tables and metrics that a dashboard or an analysis can **consume directly**: KPIs, aggregates, precomputed business metrics.

The result: queries are fast, and business users see clear numbers without worrying about the upstream complexity.

## Why I love this model

- **Traceability**: at every stage, I know where the data comes from.
- **Robustness**: an error in one layer doesn't corrupt the others.
- **Clarity**: each layer has a single, understandable role.

It's the same model I use on my pipelines at CNAF and on my personal projects. Easy to explain, solid in production, exactly what you want from a good data architecture.
