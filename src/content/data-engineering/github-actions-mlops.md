---
title: "From zero to MLOps: GitHub Actions for ML pipelines"
date: 2026-05-10
tags: [github-actions, ci, mlops, docker]
summary: "Wire up a GitHub Actions CI/CD pipeline that trains, tests, and deploys ML models automatically."
level: beginner
readingTime: 8
---

CI/CD isn't just for web apps. ML pipelines benefit enormously from the same automation — reproducible training runs, automated evaluation, and safe model promotion.

## Setup

Add `.github/workflows/ml-pipeline.yml` to your repo. Three jobs: test, train, evaluate.

```yaml
name: ML Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install -r requirements.txt && pytest tests/
  train:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python train.py --output-dir ./model-artifacts
      - uses: actions/upload-artifact@v4
        with:
          name: model
          path: ./model-artifacts
```

That handles test → train. Add an evaluate step to gate on metric thresholds before promoting.

## Applying this to ML pipelines

Unlike standard CI, ML pipelines need to cache datasets and model weights to avoid re-downloading on every run. Use `actions/cache` with a hash of your `data/` folder.

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.cache/huggingface
    key: hf-${{ hashFiles('requirements.txt') }}
```

This alone can cut pipeline time from 20 minutes to 3 minutes on repeated runs.

## Common Errors & Fixes

- **`pytest` fails on import**: add `src/` to `PYTHONPATH` in the workflow env block.
- **Training OOM**: use `runs-on: ubuntu-latest-4-cores` or self-hosted GPU runners for heavy models.
- **Artifact too large**: save only the final weights, not the full checkpoint directory.

## Checklist

- [ ] Workflow file at `.github/workflows/ml-pipeline.yml`
- [ ] Secrets for model registry configured (e.g., `MLFLOW_TRACKING_URI`)
- [ ] Evaluation step gates deployment on minimum accuracy threshold
- [ ] First push triggers green check
