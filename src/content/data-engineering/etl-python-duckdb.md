---
title: "ETL with Python + DuckDB: CSV to parquet to SQL"
date: 2026-04-22
tags: [python, duckdb, parquet, etl]
summary: "Skip Spark. DuckDB does CSV → parquet → SQL queries on your laptop in seconds."
level: beginner
readingTime: 6
---

DuckDB makes most "big data" pipelines obsolete for the laptop-scale work most of us actually do.

## Install

```bash
pip install duckdb
```

## Convert CSV to parquet

```python
import duckdb
duckdb.sql("COPY (SELECT * FROM 'events.csv') TO 'events.parquet' (FORMAT PARQUET)")
```

10x smaller, 100x faster to query.

## Query like Postgres

```python
duckdb.sql("SELECT user_id, COUNT(*) FROM 'events.parquet' GROUP BY 1").show()
```

## What went wrong

First run hit `OutOfMemory` on a 12GB CSV. Fix: stream via `read_csv_auto` instead of loading whole file.
