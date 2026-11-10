# Presentation Guide

Suggested presentation sequences for researchers, professors, and technical
professionals. The actual software is the centerpiece — no slideshow.

---

## 5-Minute Version (Short)

| Time | Section | Content |
|------|---------|---------|
| 0:00–0:30 | Introduction | Engineering Showcase: 5 deterministic models, reconstructed from source code, no hardcoded outputs, all tested |
| 0:30–1:30 | Wi-Fi Time Machine | Run `iw` dump fixture, show timeline heatmap, explain channel mapping and SHA-256 sanitization |
| 1:30–2:30 | BLE Radar | Run demo mode, show radar sweep and device lifecycle, explain RSSI≠distance |
| 2:30–3:30 | Process Ecosystem | Load snapshot, tick forward, show CPU% from jiffie deltas and process tree |
| 3:30–4:30 | Generative Engine | Change seed, switch modes, show O(1) frame seeking and world fingerprint |
| 4:30–5:00 | The Box + Q&A | Brief mention: 6 rules, identity/lineage derived from arc tags, Level 3 fidelity |

---

## 10-Minute Version (Standard)

| Time | Section | Content |
|------|---------|---------|
| 0:00–1:00 | Introduction | Showcase overview, engineering philosophy, fidelity levels, test counts (182 total) |
| 1:00–2:00 | Wi-Fi Time Machine | Full demo: fixture → stages → heatmap → channels → sparkline → export |
| 2:00–3:00 | BLE Radar | Full demo: demo mode → lifecycle → radar → summary → replay → export |
| 3:00–4:00 | Process Ecosystem | Full demo: snapshot → tick → events → table → tree → metrics |
| 4:00–5:00 | Generative Engine | Full demo: seed → mode → frame → fingerprint → palette switch → O(1) seek |
| 5:00–8:00 | The Box | Full demo: configure → run → step-by-step → observables → identity → null models → export |
| 8:00–10:00 | Limitations + Q&A | BLAKE2b limitation, Level 3 fidelity, what's not implemented, honest discussion |

---

## 20-Minute Version (Extended Technical)

| Time | Section | Content |
|------|---------|---------|
| 0:00–1:30 | Introduction | Showcase overview, architecture, DeterministicModel contract, test strategy |
| 1:30–3:00 | Wi-Fi Time Machine | Deep dive: parser, deduplication, channel mapping, security inference, code walkthrough |
| 3:00–4:30 | BLE Radar | Deep dive: EMA smoothing, lifecycle state machine, hash→angle, radar geometry, replay |
| 4:30–6:00 | Process Ecosystem | Deep dive: `/proc` parsing, CPU jiffie accounting, PID reuse, orphan re-homing |
| 6:00–7:30 | Generative Engine | Deep dive: stateless splitmix64 RNG, palettes, flowfield/plasma/attractor, world fingerprint, O(1) seek |
| 7:30–13:00 | The Box | Full deep dive: kernel invariants, 6 rules, engine policies, possibility space, identity/lineage, metrics, observables, null models, p-values, experiment export/import, step-by-step execution |
| 13:00–16:00 | Limitations & Validation | BLAKE2b incompatibility, fidelity Level 3, cross-language validation matrix, test results (182/182), what's not implemented |
| 16:00–20:00 | Q&A | Technical questions from researchers |

---

## Key Talking Points by Project

### Wi-Fi Time Machine
- "Every number is computed from the fixture. No `iw` command is executed."
- "BSSIDs are truncated via SHA-256 before export — no raw MACs leave the model."
- "Channel mapping is 802.11 compliant: 2.4/5/6 GHz with 6 GHz as channel 0."

### BLE Radar
- "RSSI is signal strength, never meters. The rings on the radar are strength bands."
- "The angle is a visual convention from SHA-256(MAC). BLE provides no bearing."
- "Device lifecycle: appeared → active → fading → disappeared (15s/30s windows)."

### Process Ecosystem Monitor
- "PID reuse is detected when starttime changes — old incarnation evicted, fresh spawn recorded."
- "CPU% = Δ(utime+stime) / (interval × CLK_TCK × ncores) × 100, normalized per core."
- "Orphaned processes are re-homed to init (pid 1)."

### Terminal Generative Engine
- "No RNG state is kept. Every pixel = f(seed, frame, salt, index)."
- "Frame N can be rendered in O(1) without computing frames 0–N-1."
- "World fingerprint = SHA-256(mode + frame + params + pixels). Share the seed, reproduce the world."

### The Box
- "Six rules. None mention identity, lineage, or community. Those are derived from arc tags alone."
- "Fidelity Level 3: pure-TS BLAKE2b (not byte-compatible with Python), Float64Array instead of NumPy, hard-coded foundry rules."
- "Same seed → same trajectory within this implementation. Cross-language hash compatibility is not claimed."
- "Null models: degree-preserving rewire, tag permutation, homogeneous. p-values with +1 correction."

---

## What to Avoid Saying

| Don't say | Instead say |
|-----------|-------------|
| "Revolutionary" | "A deterministic reconstruction of..." |
| "Industry-leading" | "Reconstructed from source code with Level 4 fidelity" |
| "Scientifically proven" | "Verified against 182 automated tests" |
| "Production-ready" | "A demonstration and research tool" |
| "AI-powered" | "No AI computation involved; deterministic algorithms only" |
| "Same results as Python" | "Same structural properties; hashes differ due to BLAKE2b implementation" |
