---
title: "dbt + Snowflake: incremental models that don't break"
date: 2026-02-12
tags: [dbt, snowflake, sql, incremental]
summary: "Pattern for incremental models with late-arriving data"
level: intermediate
readingTime: 9
---

Incremental models in dbt promise faster builds. In practice, late-arriving data silently corrupts them. Here's the pattern that holds up.

## The naive approach (breaks with late data)

```sql
-- models/orders_daily.sql
{{ config(materialized='incremental') }}

SELECT *
FROM {{ source('raw', 'orders') }}
{% if is_incremental() %}
  WHERE created_at > (SELECT MAX(created_at) FROM {{ this }})
{% endif %}
```

This fails when an event from 3 days ago arrives today. The `MAX(created_at)` filter skips it forever.

## The robust pattern: lookback window

```sql
{{ config(
  materialized='incremental',
  unique_key='order_id',
  incremental_strategy='merge'
) }}

WITH source AS (
  SELECT *
  FROM {{ source('raw', 'orders') }}
  {% if is_incremental() %}
    -- lookback 3 days to catch late arrivals
    WHERE created_at >= DATEADD('day', -3, (SELECT MAX(created_at) FROM {{ this }}))
  {% endif %}
)

SELECT * FROM source
```

The `DATEADD(-3 days)` lookback catches late-arriving events. The `unique_key` + `merge` strategy deduplicates.

## Mermaid: incremental merge flow

```mermaid
graph LR
  A[Raw orders table] -->|filter last N+3 days| B[Staging CTE]
  B -->|MERGE on order_id| C[Existing incremental table]
  C --> D[Updated table]
```

## What went wrong

Default `append` strategy meant duplicate rows after a Snowflake task retry. Switching to `merge` + `unique_key` fixed it immediately.

## Checklist

- [ ] Use `incremental_strategy='merge'` with a `unique_key`
- [ ] Add a 2-3 day lookback window for late arrivals
- [ ] Test with `dbt test` after each full-refresh
- [ ] Set `on_schema_change='append_new_columns'` for evolving schemas
