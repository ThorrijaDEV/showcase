# Questions & Answers

Prepared answers to likely technical questions from researchers and
professors. All answers are grounded in the code and documentation.

---

## General

### Q: What is this showcase?

**A:** A collection of five independent, deterministic TypeScript computational
models reconstructed from source code. Each model is a faithful algorithmic
port: same input → same output, no hardcoded outputs, all calculations real
and tested. The models cover wireless environment history, BLE device
tracking, Linux process monitoring, generative art, and a relational
computational substrate (The Box).

### Q: Why reconstruct instead of running the originals?

**A:** The originals may have hardware dependencies, external I/O, or
non-deterministic behavior. Reconstruction isolates the algorithms, makes
them deterministic, and allows intermediate stages to be displayed. It also
makes the code auditable — every number is computed from the model, not
hardcoded.

### Q: How many tests are there?

**A:** 182 total: 80 across four showcase model test suites, 102 across four
The Box model/experimental test suites. All pass.

### Q: Is the code open source?

**A:** The showcase and models are at `/home/thorrija/showcase/` and
`/home/thorrija/models/`. The original The Box Python implementation is at
`/home/thorrija/the-box/` (read-only reference).

---

## The Box — Technical

### Q: What is The Box?

**A:** A relational/computational substrate for studying emergent relational
structure. It has an arc-incidence multi-digraph kernel (nodes and arcs share
one id space; arcs can point to arcs) and six rewriting rules:
GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE. Rules are data, not code.

### Q: What are the six rules?

**A:**
- **GATHER:** Two supporters of the same hub become directly connected (tag=1, w=0.6).
- **BOND:** Anchor and an out-neighbour sharing two in-neighbours are linked (tag=2, w=0.4).
- **TAG_PROP:** Anchor copies the tag of an out-neighbour (contextual relabelling).
- **QUIET:** A node with no inflow for 30 steps is marked QUIET (tag=5).
- **DESCEND:** A QUIET node with headroom spawns a child inheriting its tag (tag=3, w=0.9).
- **FUSE:** Two siblings (same parent via DESCEND) with the same tag and close payload are identified; the twin is retired and an EQUIV arc records the witness (tag=4, w=1.0).

### Q: Where do identity and lineage come from if no rule mentions them?

**A:** They are derived from arc tags alone. `TAG_DESCEND` arcs (parent→child)
define descent and lineage depth. `TAG_EQUIV` arcs (fusion witnesses) define
identity classes via union-find, including retired endpoints. No rule knows
what labels mean; label domains organise themselves if they organise at all.

### Q: What is the fidelity level?

**A:** Level 3 — faithful reconstruction with documented simplifications:
- Pure-TS BLAKE2b replaces Python `hashlib.blake2b` (not byte-compatible)
- `Float64Array` replaces NumPy arrays
- Foundry rules hard-coded (no YAML loader in model layer)
- No Koopman analysis, no classifier gates, no null-model battery in model
  layer (experimental layer has null models and p-values)

### Q: Is BLAKE2b byte-compatible with Python?

**A:** No. The TypeScript BLAKE2b is deterministic and self-consistent
(same seed → same trajectory within TypeScript), but it is **not**
byte-compatible with Python's `hashlib.blake2b`. Graph hashes, unit_hash
outputs, structural digests, and experiment fingerprints differ between
implementations. For cross-language validation, compare equivalent
structural properties, not hash values.

### Q: Can I reproduce a Python run exactly in TypeScript?

**A:** No. Different PRNGs (numpy PCG64 vs splitmix64 JS) produce different
initial substrates for the same seed, and BLAKE2b differences cause
divergent rule selection trajectories. Structural properties (degree
distributions, beta0/beta1, identity metrics) are comparable; hash values
and exact trajectories are not.

### Q: What null models are available?

**A:** Three: degree-preserving double-edge swaps (preserves in/out degrees,
destroys higher-order structure), tag permutation (preserves tag multiset,
destroys label assignment), and homogeneous substrate (erases labels,
normalises weights, keeps topology). All with empirical p-values using +1
correction.

### Q: Can I export and replay an experiment?

**A:** Yes. `exportExperiment()` produces JSON with config, provenance,
per-run data (initial state, events, identity, structure, observables,
records). `importExperiment()` reconstructs and validates integrity
(version, required fields, provenance fingerprint). Imported data is never
silently modified.

---

## Other Models

### Q: Does BLE Radar measure distance?

**A:** No. RSSI is signal strength, not distance. The radar rings are
strength bands (strong/near/mid/far/weak). The angle is a visual convention
derived from SHA-256(MAC address) — BLE provides no bearing information.

### Q: Does Process Ecosystem Monitor read live /proc?

**A:** No. It accepts synthetic `/proc`-style snapshots as input. No live
hardware access.

### Q: Does Generative Engine use AI?

**A:** No. It is a deterministic generative art engine using a stateless
splitmix64 RNG. Every pixel is a pure function of (seed, frame, salt, index).
No machine learning, no neural networks, no AI of any kind.

### Q: Does Wi-Fi Time Machine access live Wi-Fi?

**A:** No. It accepts synthetic `iw` dump or `nmcli` text fixtures. No
hardware access, no `iw`/`nmcli` subprocess.

---

## Architecture & Implementation

### Q: What is the DeterministicModel contract?

**A:** Every model implements:
- `validate(input): Input` — normalize and validate input, throw on invalid
- `run(input): Output` — run deterministically, return output with stages
- `reset(): void` — no-op (stateless by design)
- Properties: `name`, `version`, `fidelity` (FidelityRating)

### Q: How is determinism guaranteed?

**A:** Every random decision is `unit_hash(seed, step, purpose,
structural_digest(candidate))` — a pure function of `(state, seed, step)`.
No hidden stream state. Relabelling equivariant: renumbering the substrate
permutes candidates but leaves each candidate's structural digest unchanged.

### Q: What is the visual design?

**A:** Dark industrial aesthetic: `#0a0a0b` background, `#111113` panels,
JetBrains Mono/Fira Code monospace, purple accent (`#7c3aed`), 4px border
radius, canvas-based visualisations for radar, timeline heatmap, substrate,
and generative pixels.

### Q: Can I run this without a server?

**A:** The Vite dev server is for development. For production, `npm run build`
produces static assets in `dist/` that can be served by any static file server
or opened directly (though some browsers restrict ES modules from `file://`).

---

## Honest Limitations

### Q: What is NOT implemented?

**A:**
- Koopman analysis (DMD, SCT, noninvariance residual)
- Classifier gates (G1–G4)
- Window invariance battery
- Null-model surrogate battery in the model layer (experimental layer has it)
- SQLite/persistence layer (JSON only)
- CLI or store API
- Live hardware access (Wi-Fi, BLE, /proc)
- E2E browser tests
- Accessibility audit (WCAG)

### Q: What is the biggest limitation?

**A:** The BLAKE2b incompatibility with Python. It prevents byte-for-byte
reproduction of Python runs and prevents direct hash comparison. Everything
else — structural properties, observables, null models, p-values — is
directly comparable and tested.

### Q: What would make this Level 4?

**A:** Byte-compatible BLAKE2b with Python `hashlib.blake2b`, plus the
Koopman analysis and classifier gates from the experiment layer. Currently
Level 3 with all limitations documented.
