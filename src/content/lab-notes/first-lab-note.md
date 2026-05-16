---
title: "Fix: EACCES on Docker bind mount"
date: 2026-05-15
category: "lab-notes"
tags: [error, docker, permissions, linux]
context: "macOS 15 / Docker Desktop 4.x / Fedora container"
---

## What happened

Running `docker run -v $(pwd)/data:/app/data myimage` gave:

```
PermissionError: [Errno 13] Permission denied: '/app/data/output.csv'
```

## Root cause

UID/GID mismatch — host user (UID 1000) ≠ container user (UID 0 or different).

## Fixes (safest → most invasive)

**Fix 1 — SELinux label (Fedora/RHEL only)**
```bash
docker run -v $(pwd)/data:/app/data:Z myimage
```

**Fix 2 — Match UIDs**
```dockerfile
RUN useradd -u 1000 appuser
USER appuser
```

**Fix 3 — chmod on host**
```bash
chmod -R 777 ./data   # quick test only, not production
```

Fix 1 worked in 30 seconds. Ship Fix 2 in the Dockerfile long-term.
