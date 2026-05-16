---
title: "Data Engineering Podcast — Episode on Lakehouses"
date: 2026-04-10
type: listening
show: "Data Engineering Podcast"
episode: "E412"
host: "Tobias Macey"
listenUrl: "https://dataengineeringpodcast.com/lakehouse"
summary: "Solid intro to lakehouse architecture and tradeoffs vs warehouses."
---

Good episode covering Delta Lake, Iceberg, and Hudi. The conversation on table format choice was the most useful part — Iceberg's hidden partitioning is a real quality-of-life improvement over Hive-style partitions you have to manage manually.

Key takeaway: lakehouses close 80% of the performance gap with pure warehouses, while keeping data in open formats you own. The 20% gap only matters for very high-concurrency BI workloads.
