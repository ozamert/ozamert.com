---
title: "MLflow vs Weights & Biases: experiment tracking in 2025"
date: 2025-10-12
tags: [mlflow, wandb, experiment-tracking]
summary: "Self-hosted vs SaaS, when to pick which."
level: intermediate
readingTime: 10
---

Experiment tracking is non-negotiable. Picking the wrong tool means either vendor lock-in or maintenance burden. Here's the honest comparison.

## Quick setup comparison

**MLflow (self-hosted)**

```python
import mlflow

mlflow.set_tracking_uri("http://your-server:5000")
mlflow.set_experiment("baseline-comparison")

with mlflow.start_run():
    mlflow.log_param("lr", 0.001)
    mlflow.log_metric("val_accuracy", 0.87)
    mlflow.sklearn.log_model(model, "model")
```

**Weights & Biases**

```python
import wandb

wandb.init(project="baseline-comparison", config={"lr": 0.001})
wandb.log({"val_accuracy": 0.87})
wandb.finish()
```

W&B is fewer lines, richer UI out of the box. MLflow is more control.

## Decision framework

| Factor | MLflow | W&B |
|---|---|---|
| Data residency requirements | Self-host possible | SaaS only (enterprise plan for private) |
| Team size | Any | Any |
| LLM/diffusion tracking | Basic | Excellent (Tables, Artifacts) |
| Model registry | Built-in | Built-in |
| Monthly cost (10 users) | ~$0 (infra only) | ~$150 |

## What went wrong

Ran MLflow on a free-tier EC2 `t2.micro`. Tracking server OOMed after 500 runs. Size your tracking server at minimum 4GB RAM or use RDS for the backend store.

## Checklist

- [ ] Set `MLFLOW_TRACKING_URI` in CI/CD environment
- [ ] Log artifacts (not just metrics) — models, plots, confusion matrices
- [ ] Tag runs with git commit SHA for reproducibility
- [ ] Archive stale experiments to avoid UI clutter
