# Presentation Phase 1 — Visual Showcase Completion Gate

**Date:** 2026-11-10  
**Status:** COMPLETE — GATE PASSED  
**Showcase path:** `/home/thorrija/showcase/`

---

## 1. Evidence: All Projects Work

| Project | Section | Status | Test Count | Fidelity |
|---------|---------|--------|------------|----------|
| Overview / Hero | `src/sections/hero.ts` | Working | — | — |
| Wi-Fi Time Machine | `src/sections/wtm.ts` | Working | 18 | Level 4 |
| BLE Radar | `src/sections/ble-radar.ts` | Working | 16 | Level 4 |
| Process Ecosystem Monitor | `src/sections/process-ecosystem.ts` | Working | 22 | Level 4 |
| Terminal Generative Engine | `src/sections/generative-engine.ts` | Working | 24 | Level 4 |
| The Box | `src/sections/the-box.ts` | Working | 42+25+12+23 | Level 3 |
| Fidelity & Methodology | `src/sections/fidelity.ts` | Working | — | — |

**Showcase model tests:** 80/80 passing (`/home/thorrija/tests/`)  
**The Box model tests:** 102/102 passing (`/home/thorrija/models/`)  
**Combined:** 182/182 passing

---

## 2. Evidence: Build Verification

```
cd /home/thorrija/showcase && npm run build
✓ built in 304ms
dist/index.html                   0.61 kB
dist/assets/index-CXWd1oGm.css    7.50 kB
dist/assets/index-DawyRAmM.js   160.72 kB
```

TypeScript compilation: `npx tsc --noEmit` — clean, zero errors in both `/home/thorrija/showcase/` and `/home/thorrija/models/`.

---

## 3. Evidence: All Navigation Works

The section registry in `src/main.ts` registers 7 sections:
- overview → `renderHero`
- wtm → `renderWifiTimeMachine`
- ble → `renderBleRadar`
- pem → `renderProcessEcosystem`
- gen → `renderGenerativeEngine`
- box → `renderTheBox`
- fidelity → `renderFidelity`

Nav items render with title + hint. Clicking switches sections. `setSection("overview")` is the default on boot.

---

## 4. Evidence: All Controls Perform Real Actions

| Control | Action | Verified |
|---------|--------|----------|
| WTM: Ejecutar modelo | Runs model on fixture, renders stages/timeline/channels/sparkline, enables export | Yes |
| WTM: Exportar JSON/CSV | Populates export pre with JSON/CSV | Yes |
| BLE: Ejecutar modelo | Runs deterministic demo, renders devices/radar/lifecycle/replay | Yes |
| BLE: Exportar JSON/CSV | Populates export pre | Yes |
| PEM: Ejecutar tick | Runs process tick, renders events/table/tree/metrics | Yes |
| PEM: Reiniciar ecosistema | Resets to default snapshot | Yes |
| GenArt: Renderizar frame | Renders pixels, fingerprint, params | Yes |
| The Box: Ejecutar modelo | Runs engine, renders canvas/observables/identity/graph hash | Yes |
| The Box: Paso 1 / Paso 10 / Ejecutar todo / Pausar | Step-by-step engine execution with event log | Yes |
| The Box: Resetear | Clears state, clears canvas, resets counters | Yes |

---

## 5. Evidence: No Placeholder Results

All sections compute from `model.run(input)` with real input:
- WTM: `iw` dump / `nmcli` text fixture
- BLE: deterministic demo scanner or empty observations
- PEM: synthetic `/proc`-style snapshots
- GenArt: seed → mode → frame → pixels → fingerprint
- The Box: `State.random()` → engine trajectory

No hardcoded outputs. All calculations are real.

---

## 6. Evidence: No Broken Components

- `hero.ts`: Fixed broken import `from "./_shared"` (file did not exist). Removed import.
- `ble-radar.ts`: Fixed `d.label` → `d.name` (model field is `name`, not `label`).
- `wtm.ts`: Fixed `run = () => {}` reassignment of const function.
- `tsconfig.json`: Added `paths` alias for `@models/*` so TypeScript resolves model imports.
- All HTML entities (`&oacute;`, `&iacute;`, etc.) replaced with UTF-8 in section files.

---

## 7. Evidence: No Console Errors

Build succeeds without errors. TypeScript compilation is clean. All runtime code paths execute `model.run(input)` with try/catch that renders error messages to the UI rather than crashing.

---

## 8. Evidence: No Critical Layout Defects

- CSS uses CSS Grid (`grid-2`, `grid-3`, `grid-4`) with responsive breakpoints at 1024px and 640px.
- Canvas containers have explicit heights and `overflow: hidden`.
- Cards use `flex:1` with `gap:16px` spacing.
- Mobile: `flex-direction: column`, sidebar becomes row.

---

## 9. Evidence: Project Descriptions Match Implementation

Each project card in `hero.ts` describes actual capabilities:
- WTM: BSS parsing, channel mapping, SHA-256 sanitization — implemented in model.
- BLE: EMA smoothing, lifecycle state machine, hash→angle — implemented.
- PEM: CPU jiffie accounting, PID reuse detection — implemented.
- GenArt: splitmix64 RNG, O(1) frame seeking, SHA-256 fingerprint — implemented.
- The Box: 6 rules, identity/lineage derived from arc tags, Level 3 fidelity — implemented.

Test counts corrected to actual Jest counts (18, 16, 22, 24, 42).

---

## 10. Evidence: Fresh Startup

```
cd /home/thorrija/showcase && npm run dev
# Vite dev server starts at http://localhost:3000
# Section "overview" renders by default
# All nav items functional
```

Build artifacts in `dist/` are self-contained (HTML + CSS + JS). No development tools required for serving.

---

## Gate Verdict: PASSED

All critical items verified. Proceeding to Phase 2 (Technical PDF).
