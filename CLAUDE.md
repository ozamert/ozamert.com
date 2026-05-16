# Developer Website — AI Agent Playbook

Personal tech + creative blog. Mert Öztürk. Learning out loud across data, security, and languages.

## Site identity

- **Tagline:** "Learning out loud across data, security, and languages."
- **Audience:** Beginners → intermediate tech learners; career switchers; lifelong learners.
- **Tone:** Friendly, concise, practical. Show dead-ends and fixes. Second person ("you").
- **Logo:** Monogram `AO` in rounded square.

## Stack

- Astro + MDX (content in `src/content/`)
- Deploy: Vercel
- Analytics: Plausible or Umami
- Comments: Giscus (GitHub Discussions)

## Content structure

```
src/content/
  tech/
    data-engineering/
    data-science/
    data-analysis/
    networking-ethical-hacking/
    smart-contracts/
    devops/
  hobbies/
    travel/
    music/
    languages/
  lab-notes/       # short daily/weekly logs
  projects/        # case studies + GitHub links
```

## Content types

| Type | Use |
|---|---|
| Bug Diary | "I hit error X; here's the fix." ≤600 words |
| Framework Primer | 10–15 min intro: what/why/how |
| Build Log | End-to-end mini-project |
| Checklist/Playbook | Step-by-step, printable |
| Deep Dive | 2000+ words, diagrams, reproducible code |
| Hobby Post | Trip notes, practice logs, language challenges |

## Front-matter schema

### Tech post
```yaml
title: "<Clear problem or concept>"
date: YYYY-MM-DD
updated: YYYY-MM-DD
category: "devops"   # data-engineering | data-science | data-analysis | networking-ethical-hacking | smart-contracts | devops
tags: [docker, kubernetes, error, troubleshooting]
summary: "What broke, why, and the fix in 5 minutes."
repo: ""
level: beginner      # beginner | intermediate | advanced
readingTime: 12
cover: "/images/<slug>.png"
```

### Bug Diary
```yaml
title: "Fix: <error code / message>"
date: YYYY-MM-DD
category: "lab-notes"
tags: [error, log, <tool>]
context: "OS / version / environment"
```

### Project
```yaml
title: "<Project name>: <one-liner>"
date: YYYY-MM-DD
category: "projects"
stack: [python, airflow, postgres]
links:
  demo: ""
  repo: ""
impact: "What changed / metrics"
```

### Hobby
```yaml
title: "<Trip/Practice/Language Challenge>"
date: YYYY-MM-DD
category: "hobbies"
sub: travel          # travel | music | languages
tags: [itinerary, budget]
```

## Writing rules (enforce these)

- Intros ≤4 lines; jump to steps quickly.
- Always include environment (OS, versions).
- Code first, theory second.
- Add "What went wrong?" to every build post.
- Callouts: Note, Gotcha, Pro Tip.
- Final Checklist + References on every post.
- ALT text for all images; semantic headings.
- 1 diagram (Mermaid) + screenshots for tech posts.

## SEO checklist (run on every post)

- Unique title + H1; descriptive slug.
- 150–160 char meta description.
- One primary keyword; 3–5 related.
- Internal links ≥3; external reputable links ≥2.
- Lighthouse ≥90; images ≤200 KB; code blocks have copy button.

## AI agent workflow

### Local LLM setup (Ollama / Qwen / DeepSeek)
Scripts live in `scripts/`. Run any prompt from §AI Prompts below via:
```bash
node scripts/prompt.mjs <prompt-name> [args]
# or with Ollama directly:
ollama run qwen2.5-coder "$(cat scripts/prompts/<name>.txt)"
```

### Prompt library (§6 from playbook)
All prompts in `scripts/prompts/`. Fill `[BRACKETS]` before running.

| Script | Purpose |
|---|---|
| `ideation.txt` | 25 post ideas for a track |
| `seo-brief.txt` | SEO brief for a post title |
| `outline-to-draft.txt` | Outline → 1200-1800 word draft |
| `bug-diary.txt` | Error → fix post ≤600 words |
| `code-explain.txt` | Code → annotated explanation |
| `case-study.txt` | GitHub repo → blog case study |
| `travel-guide.txt` | 3-day city guide |
| `music-plan.txt` | 30-day practice plan |
| `language-plan.txt` | 30-day language learning plan |
| `social-repurpose.txt` | Post → LinkedIn/X/Short/Carousel |
| `og-brief.txt` | OG image visual brief |

### open-design integration
For OG images, social carousels, landing page redesigns:
- open-design auto-detects local agents (qwen, deepseek) on PATH
- Use `social-carousel` skill for Instagram/LinkedIn carousels
- Use `magazine-poster` skill for OG images
- MCP server in open-design Settings → wire to this project

## Weekly cadence

- Mon: Pick 1 tech + 1 hobby topic from `KANBAN.md`
- Tue: Draft tech post
- Wed: Test code + screenshots
- Thu: Edit
- Fri: Publish + social repurpose
- Weekend: Hobby post + video Short

## Taxonomy

- **Categories** = content tracks above
- **Tags** = tools (Docker, Pandas, Wireshark, Solidity, Terraform), errors (EACCES, KeyError), frameworks (Astro, Next.js), datasets

## Ready-made starter topics

- DevOps: "From zero to CI: GitHub Actions in 20 minutes (Node + Docker)"
- Data Eng: "ETL with Python + DuckDB: CSV → parquet → SQL in minutes"
- Data Sci: "Your first baseline model: train/test split without overfitting"
- Networking: "Wireshark primer: capture, filter, export"
- Ethical Hacking: "Kali basics in a VM: safe lab setup"
- Smart Contracts: "Solidity 101: first ERC-20 with Foundry"
- Languages: "Spanish A2: 50 verbs that power 80% of daily speech"
- Music: "Guitar: 20-min daily routine to first clean chord changes"
- Travel: "3 days in [City] for tech nerds: cafés, bookstores, maker spaces"

## Publish checklist (every post)

- [ ] Proofread (read aloud once)
- [ ] Run code in clean env
- [ ] 1 diagram + captions
- [ ] Images ≤200 KB compressed
- [ ] Update `updated:` in front-matter
- [ ] Share LinkedIn + X + Short + Carousel
- [ ] Add to newsletter (if exists)
- [ ] Update `KANBAN.md` → Published
