---
title: "MLOps Community — Vector DBs in production"
date: 2025-08-05
type: listening
show: "MLOps Community"
episode: "E198"
summary: "Real war stories about Pinecone, Weaviate, Qdrant."
---

Finally an episode with real numbers. The guest ran benchmarks across Pinecone, Weaviate, and Qdrant at 50M vector scale. Qdrant won on latency/cost ratio for self-hosted. Pinecone won on managed simplicity if you don't care about the bill.

The part I'll remember: hybrid search (dense + sparse BM25) consistently outperformed pure dense search on domain-specific corpora. Worth wiring up even if it feels like extra complexity.
