---
title: "Fix: KeyError on pandas merge with mismatched dtypes"
date: 2026-02-08
category: "lab-notes"
tags: [pandas, python, error, merge]
context: "macOS 15 / Python 3.12 / pandas 2.2"
---

## What happened

```python
df1.merge(df2, on="user_id")
# KeyError: 'user_id'
```

Both DataFrames have `user_id`. So what's wrong?

## Root cause

dtypes mismatch. `df1.user_id` is `int64`, `df2.user_id` is `object` (string).

## Fix

```python
df2["user_id"] = df2["user_id"].astype(int)
df1.merge(df2, on="user_id")
```

Always check `df.dtypes` before merge.
