---
title: "Pandas vs Polars: where Polars actually wins"
date: 2025-12-15
tags: [pandas, polars, benchmarks, python]
summary: "Lazy evaluation, parallel ops, when to switch."
level: intermediate
readingTime: 11
---

Polars is faster. But not always 100x faster, and migration has real costs. Here's where it actually matters.

## Environment

Python 3.12, polars 0.20, pandas 2.1, M2 MacBook Pro 16GB

## The benchmark that matters: groupby on 10M rows

```python
import polars as pl
import pandas as pd
import time

# Polars
df_pl = pl.read_csv("events_10m.csv")
t0 = time.perf_counter()
result = df_pl.group_by("user_id").agg(pl.col("amount").sum())
print(f"Polars: {time.perf_counter() - t0:.2f}s")

# Pandas
df_pd = pd.read_csv("events_10m.csv")
t0 = time.perf_counter()
result = df_pd.groupby("user_id")["amount"].sum()
print(f"Pandas: {time.perf_counter() - t0:.2f}s")
```

Results: Polars 0.4s, Pandas 3.1s. That's real.

## Lazy evaluation: the real advantage

```python
# This doesn't execute until .collect()
result = (
    pl.scan_csv("huge_file.csv")
    .filter(pl.col("status") == "active")
    .group_by("region")
    .agg(pl.col("revenue").sum())
    .collect()
)
```

Polars pushes the filter down before reading the full file. On a 50GB CSV this is the difference between 2 minutes and 40 seconds.

## When to stay with Pandas

- Existing codebase with heavy sklearn/statsmodels integration
- Team familiarity > performance gains
- Files under ~1M rows (difference is milliseconds)

## What went wrong

Tried to use Polars `LazyFrame` with a custom Python UDF — not supported. Polars UDFs break parallelism. Keep transforms in native Polars expressions.

## Checklist

- [ ] Use `scan_csv` / `scan_parquet` instead of `read_` for large files
- [ ] Prefer native expressions over `.map_elements` (Python UDFs)
- [ ] Check `.schema` early — Polars is strict about types
