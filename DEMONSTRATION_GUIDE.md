# Demonstration Guide

Step-by-step demonstrations for each laboratory. Each demo takes 2–5 minutes
and allows deeper inspection afterward. The actual software is the centerpiece
— no slideshow.

---

## 1. Wi-Fi Time Machine (2–3 min)

**Objective:** Show how raw `iw` scan output is parsed into a structured
wireless environment history with timeline heatmap.

**Steps:**
1. Navigate to "Wi-Fi Time Machine" from the sidebar.
2. Observe the default `iw` dump fixture in the textarea (3 APs: 2.4 GHz,
   5 GHz, 6 GHz).
3. Click "Ejecutar modelo" (Run model).
4. Observe the intermediate stages panel: parsing → deduplication → channel
   mapping → security inference → timeline construction.
5. Watch the timeline heatmap canvas populate: rows = networks, columns =
   time buckets, color = signal strength (green=strong → red=weak).
6. Inspect channel activity counts in the left panel.
7. View the signal sparkline for the strongest network in the right panel.
8. Click "Exportar JSON" to view sanitized output (BSSIDs truncated via
   SHA-256).

**Expected output:** 3 networks deduplicated to 3 unique BSSIDs, 3 channels
(1, 36, 0/6GHz), timeline heatmap with observed cells colored by signal.

**Key talking point:** "Everything is computed from the fixture. No `iw`
command is executed. No hardware is accessed."

---

## 2. BLE Radar (2–3 min)

**Objective:** Show deterministic BLE device lifecycle tracking with radar
visualization and RSSI strength bands (not distance).

**Steps:**
1. Navigate to "BLE Radar".
2. Leave default demo settings (30 seconds, seed 7).
3. Click "Ejecutar modelo".
4. Watch the device lifecycle table: devices transition from appeared →
   active → fading → disappeared.
5. Observe the radar canvas: nodes as colored dots by RSSI band, sweep line
   rotating, concentric strength rings.
6. Note: rings = signal strength bands (strong/near/mid/far/weak), NOT
   physical distance. Angle = SHA-256(address), a visual convention.
7. Inspect the lifecycle summary counts.
8. Click "Exportar JSON" to view sanitized output (MAC addresses truncated
   via SHA-256).

**Expected output:** Scripted devices with random walks and lifecycles,
deterministic across runs with the same seed.

**Key talking point:** "RSSI is signal strength, never meters. The angle is
a visual convention derived from the MAC hash — BLE provides no bearing."

---

## 3. Process Ecosystem Monitor (2–3 min)

**Objective:** Show Linux process lifecycle reconstruction from synthetic
`/proc` snapshots with CPU accounting and PID-reuse detection.

**Steps:**
1. Navigate to "Process Ecosystem Monitor".
2. Observe the default synthetic snapshot (systemd, kthreadd, dbus, browser,
   renderer).
3. Adjust interval, CLK_TCK, and core count if desired.
4. Click "Ejecutar tick" (Run tick).
5. Watch the events panel: births, deaths, CPU spikes, orphan re-homing.
6. Inspect the process table: PID, comm, state, CPU%, RSS, threads, orphan,
   peak flags.
7. View the process tree visualization.
8. Check system metrics: CPU%, RAM%, load.

**Expected output:** Process state transitions, CPU% computed from jiffie
deltas, process tree with parent-child relationships.

**Key talking point:** "PID reuse is detected when starttime changes — the
old incarnation is evicted and a fresh spawn is recorded."

---

## 4. Terminal Generative Engine (2–3 min)

**Objective:** Show deterministic generative art: seed → parameters → pixels
→ fingerprint, with O(1) frame seeking.

**Steps:**
1. Navigate to "Terminal Generative Engine".
2. Leave default seed (12345) and mode (flowfield).
3. Click "Renderizar frame" (Render frame).
4. Observe the calculation stages: seed → parameters → pixels → render →
   fingerprint.
5. Watch the pixel canvas render deterministically.
6. Copy the world fingerprint (SHA-256 over mode+frame+params+pixels).
7. Change the frame number and re-render: observe O(1) seeking — same seed,
   different frame produces different but deterministic pixels.
8. Switch modes (flowfield → plasma → attractor) and observe different
   algorithms from the same seed.
9. Copy a different palette and re-render.

**Expected output:** Deterministic pixel buffer, world fingerprint identical
for same (seed, mode, frame, palette), O(1) frame seeking.

**Key talking point:** "No RNG state is kept. Every pixel is a pure function
of (seed, frame, salt, index). Frame N can be sought in O(1) without
rendering frames 0–N-1."

---

## 5. The Box (5–10 min)

**Objective:** Show the complete research-oriented demonstration: substrate
configuration, step-by-step execution, observables, null models, experiment
export/import.

**Steps:**
1. Navigate to "The Box".
2. **Substrate configuration:** Set nodes (20), arcs (40), dim (4), seed (11),
   steps (100), policy (uniform), caps (160/700), tag spread (1).
3. Click "Ejecutar modelo" (Run model).
4. **Observe the result:** graph hash provenance, substrate canvas (nodes
   colored by tag, arcs by weight), observables table (14 metrics), identity
   panel (lineage depth, fusion classes, fused fraction).
5. **Step-by-step:** Click "Resetear", then "Paso 1" repeatedly. Watch the
   current event panel: rule, anchor, edits, site key. Each step advances
   the substrate by one rule application.
6. **Run all:** Click "Ejecutar todo" to run all 100 steps with animation.
   Use "Pausar" to stop mid-run.
7. **Rule semantics:** Review the rules panel (GATHER, BOND, TAG_PROP,
   QUIET, DESCEND, FUSE) with descriptions.
8. **Experimental layer:** The null models, p-values, and experiment
   export/import are available through the TypeScript model API
   (`the-box-experiment.ts`). See `VALIDATION_REPORT.md` for test details.
9. **Reset:** Click "Resetear" to clear and start over.

**Expected output:** Deterministic trajectory — same seed produces identical
graph hash and observables across runs.

**Key talking points:**
- "Six rules, none mention identity or lineage. Those are derived from arc
  tags alone."
- "Fidelity Level 3: BLAKE2b reimplemented in pure TS (not byte-compatible
  with Python), Float64Array instead of NumPy, foundry rules hard-coded."
- "Same seed → same trajectory within this implementation. Cross-language
  hash compatibility is not claimed."

---

## General Demo Tips

- **Start fresh:** Always click "Resetear" or reload the page before a demo
  to ensure clean state.
- **Same seed, same result:** Demonstrate determinism by running twice with
  the same seed and showing identical graph hashes.
- **No internet required:** All models run locally. No API keys, no hardware,
  no external services.
- **Show the code:** The source is in `/home/thorrija/models/` and
  `/home/thorrija/showcase/src/sections/`. All tests pass (182 total).
