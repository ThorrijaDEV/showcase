# Project Catalog — Technical Inventory

Each entry describes what the project solves, its architecture, actual
capabilities, test coverage, limitations, and how to demonstrate it.

---

## 1. Wi-Fi Time Machine

**Problem:** Reconstruct wireless environment scanning history from raw
`iw`/`nmcli` output, producing per-channel activity, timeline heatmaps, and
sanitized exports.

**Architecture:**
- Input parser: `iw` scan-dump blocks and escaped `nmcli` tab-separated output
- Deduplication: strongest signal per BSSID
- Channel mapping: 802.11 freq→channel (2.4/5/6 GHz)
- Security inference: AKM suite text → WPA/WPA2/WPA3 label
- Timeline heatmap: rows = networks, columns = time buckets, glyph = signal tier
- Export: SHA-256-truncated BSSID sanitization, JSON/CSV

**Actual capabilities:** Parse synthetic `iw`/`nmcli` fixtures, build
time×bucket heatmap, per-channel activity counts, signal sparklines,
deduplicated AP list. No hardware access — synthetic fixtures only.

**Test coverage:** 18 tests (wifi-time-machine.test.ts)

**Limitations:** No live `iw`/`nmcli` subprocess; no SQLite persistence
(in-memory only); no terminal size adaptation.

**Demonstration (2–5 min):** Paste an `iw` dump fixture, run, observe the
timeline heatmap populate row by row, inspect channel activity, export JSON.

---

## 2. BLE Radar

**Problem:** Visualize Bluetooth LE device presence as a deterministic radar:
device lifecycle (appeared→active→fading→disappeared), RSSI strength bands,
hash→angle mapping, session replay.

**Architecture:**
- Observation model: address, name, RSSI, timestamp, backend, manufacturer data
- EMA smoothing: alpha=0.4
- Strength bands: strong/near/mid/far/weak (signal strength, NOT distance)
- Stable angle: SHA-256(address) → 0–360° (visual convention, not bearing)
- Lifecycle state machine: ACTIVE_WINDOW=15s, GONE_WINDOW=30s
- Radar frame: crosshair, concentric rings, sweep line, device markers,
  history trails
- Replay: time-cursor over recorded observations

**Actual capabilities:** Deterministic demo scanner with scripted devices,
lifecycle transitions, radar canvas, per-device state table, session replay,
JSON/CSV export with address sanitization.

**Test coverage:** 16 tests (ble-radar.test.ts)

**Limitations:** No BLE hardware (BlueZ/bleak); no live scanning; RSSI is
signal strength, never physical distance; angle is a visual convention.

**Demonstration (2–5 min):** Run demo mode, watch devices appear/fade,
observe radar sweep, adjust sweep angle, inspect lifecycle summary,
replay a recorded session.

---

## 3. Process Ecosystem Monitor

**Problem:** Reconstruct Linux process ecosystem from synthetic `/proc`
snapshots: process lifecycle, CPU jiffie accounting, process tree, orphan
re-homing, PID-reuse detection.

**Architecture:**
- Parser: `/proc/[pid]/stat` (nested-paren comm handling), `/proc/[pid]/statm`,
  `/proc/stat`, `/proc/meminfo`, `/proc/loadavg`
- System CPU%: busy delta / total delta from `/proc/stat`
- Per-process CPU%: Δ(utime+stime) / (interval × CLK_TCK × ncores)
- Identity: (pid, starttime); PID reuse detected on starttime change
- Lifecycle: NEW (2-tick grace) → ACTIVE/IDLE → DYING → DEAD
- Orphan re-homing: reparent to init when parent dies

**Actual capabilities:** Parse synthetic `/proc`-style snapshots, build process
tree, compute per-process and system CPU%, detect PID reuse, track lifecycle
states, render process table and tree.

**Test coverage:** 22 tests (process-ecosystem.test.ts)

**Limitations:** No live `/proc` access; synthetic snapshots only; no curses
terminal UI.

**Demonstration (2–5 min):** Load default snapshot, tick forward, observe
process state transitions, inspect CPU% deltas, view process tree.

---

## 4. Terminal Generative Engine

**Problem:** Deterministic generative art: flowfield, plasma, and attractor
modes, all computed from a stateless splitmix64 RNG with O(1) frame seeking.

**Architecture:**
- RNG: splitmix64-style, every value = f(seed, frame, salt, index); no state
- Palettes: continuous 1-D color stops with linear interpolation
- xterm-256 color mapping
- Framebuffer: W×H pixel canvas, half-block terminal cell encoding
- Flowfield: analytic angle field (sine harmonics), particle streamlines
- Plasma: closed-form per-pixel color fields (4 formulas)
- Attractor: Clifford/Dejong strange attractor
- World fingerprint: SHA-256 over mode+frame+params+pixels

**Actual capabilities:** Seed→frame→pixels→fingerprint pipeline, O(1) frame
seeking, three render modes, palette selection, pixel buffer output, world
fingerprint.

**Test coverage:** 24 tests (generative-engine.test.ts)

**Limitations:** No terminal/ANSI output; no file export (pixels as data);
original project has 5 failing tests not reproduced here.

**Demonstration (2–5 min):** Change seed, switch modes, seek to arbitrary
frame, observe fingerprint stability, copy world fingerprint.

---

## 5. The Box

**Problem:** Relational/computational substrate for studying emergent
relational structure. Six rewriting rules (GATHER, BOND, TAG_PROP, QUIET,
DESCEND, FUSE) operate on an arc-incidence multi-digraph.

**Architecture:**
- Kernel: Node {id, tag, payload, born}, Arc {id, src, dst, tag, w, clock};
  shared id space; arcs may point to arcs (second-order structure)
- Invariants: I1 unique ids, I2 no dangling arcs, I3 caps, I4 payload dim
- Rules (data, not code): GATHER (hub reinforcement), BOND (cycle closure),
  TAG_PROP (contextual relabelling), QUIET (starvation), DESCEND (birth with
  inheritance), FUSE (identity fusion)
- Engine: 4 policies (canonical, uniform, weighted, roundrobin); possibility
  space = finite, exactly enumerable, seed-independent
- Identity/lineage: descent_map, parents, lineage_depths (cycle detection),
  identity_classes (union-find incl. retired endpoints), fused_fraction
- Metrics: degree tables (Gini), components (union-find), beta0/beta1
  (Euler-exact), component_size_profile, modularity (deterministic Louvain)
- Observables: 14 named structural measurements
- Null models: degree-preserving rewire, tag permutation, homogeneous
- Experiment: provenance, fingerprint, JSON export/import, integrity validation

**Actual capabilities:** Deterministic trajectory execution, step-by-step
event log, substrate visualization, observables table, identity/lineage panel,
null model distributions, empirical p-values, experiment export/import.

**Test coverage:** 42 + 25 + 12 + 23 = 102 tests (the-box.test.ts,
the-box-experiment.test.ts, the-box-validation.test.ts,
the-box-yaml.test.ts)

**Limitations:** Pure-TS BLAKE2b not byte-compatible with Python
`hashlib.blake2b`; no null-model surrogate battery in model layer
(experimental layer has it); no Koopman analysis; no classifier gates;
no SQLite; no CLI.

**Demonstration (5–10 min):** Configure substrate, run engine, step through
events one at a time, observe graph changes on canvas, inspect observables,
run null models, export experiment, re-import and validate.

---

## Fidelity Classification

| Level | Meaning |
|-------|---------|
| 4 | Direct algorithmic reproduction; same algorithm, same data structures, same rules; only I/O boundary adapted |
| 3 | Faithful reconstruction with documented simplifications; algorithm preserved; edge cases or I/O simplified |
| 2 | Partial reconstruction; core pipeline reproduced; some stages omitted or approximated |
| 1 | Conceptual model only; behaviour inspired; algorithm not faithfully reproduced |

All showcase models are Level 4 except The Box (Level 3) due to BLAKE2b
reimplementation and missing Koopman/classifier experiment layer.
