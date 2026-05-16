---
title: "Your first baseline model: train/test split without overfitting"
date: 2026-04-08
tags: [ml, baseline, sklearn]
summary: "Stop reaching for XGBoost on day one. Build a baseline."
level: beginner
readingTime: 7
---

The most common ML mistake: jumping to complex models before you have a baseline. A baseline tells you whether your fancy model is actually better than a coin flip.

## Environment

Python 3.11, scikit-learn 1.5, pandas 2.2

## Setup a proper train/test split

```python
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score
import pandas as pd

df = pd.read_csv('dataset.csv')
X = df.drop('target', axis=1)
y = df['target']

# Stratify to preserve class balance
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

## Build the baseline

```python
baseline = DummyClassifier(strategy='most_frequent')
baseline.fit(X_train, y_train)
score = accuracy_score(y_test, baseline.predict(X_test))
print(f"Baseline accuracy: {score:.3f}")
```

If your XGBoost gets 72% on a dataset where the baseline gets 71%, you have a problem — not a model.

## Why stratify matters

Without `stratify=y`, on a 95/5 class imbalance your test set might contain zero minority class examples. The model learns nothing useful.

## What went wrong

Hit 99% accuracy on first run — forgot I had an ID column in features. Always check `X.columns` before fitting.

## Checklist

- [ ] `stratify=y` on imbalanced datasets
- [ ] Drop ID/date/leakage columns from features
- [ ] Run baseline before any complex model
- [ ] Report both train and test scores to catch overfitting
