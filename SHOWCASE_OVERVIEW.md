# THORRIJA Engineering Showcase — Overview

A collection of independent, deterministic TypeScript computational models
reconstructed from source code, presented through a dark-industrial web
application. Each model is a faithful algorithmic port: same input → same
output, no hardcoded outputs, no hardware dependencies, no fabricated results.

## Projects

| Project | Fidelity | Tests | Description |
|---------|----------|-------|-------------|
| Wi-Fi Time Machine | Level 4 | 18 | Wireless environment history: BSS parsing, channel mapping, timeline heatmap, export |
| BLE Radar | Level 4 | 16 | BLE device lifecycle, RSSI bands, hash→angle mapping, radar geometry, replay |
| Process Ecosystem Monitor | Level 4 | 22 | Linux process lifecycle, CPU jiffie accounting, process tree, orphan re-homing |
| Terminal Generative Engine | Level 4 | 24 | Deterministic generative art: flowfield, plasma, attractor, O(1) frame seek |
| The Box | Level 3 | 42+25+12+23 | Arc-incidence multi-digraph, 6 rewriting rules, identity/lineage, null models, p-values |

## Engineering Philosophy

- **No original code execution.** Models are independent reconstructions from
  source code. The original projects are never run inside demonstrations.
- **Real calculations.** Every number is computed; nothing is hardcoded.
- **Deterministic.** Same input always produces the same output.
- **Intermediate stages shown.** Processing pipelines are visible, not just
  final results.
- **Fidelity classified.** Each model carries a Level 1–4 rating with evidence
  and documented adaptations.
- **Honest about limitations.** Nothing is claimed that is not implemented
  and tested.

## Audience

Researchers, university professors, and technical professionals. The
showcase is designed for technical inspection, not casual browsing. Every
claim has evidence in the code, tests, or documentation.

## Quick Start

```bash
cd /home/thorrija/showcase
npm run build      # Production build
npm run dev        # Dev server at http://localhost:3000
npm run preview    # Preview production build
```

Tests:

```bash
cd /home/thorrija/models && npm test      # 102 model + experimental tests
cd /home/thorrija/tests && npm test       # 80 showcase model tests
```

## Directory Structure

```
showcase/          — Vite + TypeScript web application
  src/sections/    — 6 section renderers (hero, 5 labs, fidelity)
  src/main.ts      — Shell, navigation, section registry
models/            — 5 deterministic TypeScript models + shared types
tests/             — 4 model test suites (80 tests)
report/            — Bilingual PDF report (ES/EN)
research/          — Fidelity matrix, inventory, assumptions, diagrams
```
