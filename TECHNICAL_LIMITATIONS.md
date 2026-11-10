# Technical Limitations

Honest documentation of what is and isn't reproduced, and known limitations
of each model. Nothing is claimed that is not implemented and tested.

---

## Cross-Language Limitations (The Box)

### BLAKE2b Not Byte-Compatible

The TypeScript BLAKE2b implementation (RFC 7693, pure JS with `BigInt`) is
**deterministic and self-consistent but NOT byte-compatible** with Python's
`hashlib.blake2b`.

**Affected:**
- `State.graph_hash()` — provenance anchor differs from Python
- `unit_hash()` — rule selection trajectories diverge from Python
- `State.structural_digest()` — site selection keys differ from Python
- `PossibilitySpace.canonical_key()` — differs from Python
- Experiment provenance fingerprint — differs from Python

**Not affected:**
- Structural properties (node/arc counts, degree distributions, beta0/beta1,
  components, modularity, identity metrics, observable values computed from
  structure)
- All null model computations (no hashing involved)
- All p-value computations (no hashing involved)

**Recommendation:** For cross-language validation, compare equivalent
structural properties, not hash values. See `THE_BOX_COMPATIBILITY_REPORT.md`
for the full compatibility matrix.

### Float Representation

Python `float(self.w).hex()` and TypeScript `v.toString(16)` produce different
string formats for the same float. This affects `Arc.digest()` and contributes
to the BLAKE2b incompatibility.

### PRNG Difference

`State.random()` uses `numpy.random.default_rng(seed)` (PCG64) in Python vs
a splitmix64-style JS RNG in TypeScript. Different algorithms produce
different random sequences for the same seed. Initial substrates differ;
validation compares statistical properties, not identical substrates.

---

## Model-Specific Limitations

### Wi-Fi Time Machine

- No live `iw`/`nmcli` subprocess; synthetic fixtures only
- No SQLite persistence; in-memory record store only
- No terminal size adaptation
- No 802.11be (7 GHz) channel mapping

### BLE Radar

- No BLE hardware (BlueZ/bleak); no live scanning
- RSSI is signal strength, **never** physical distance
- Angle is a visual convention derived from MAC hash; BLE provides no bearing
- No curses terminal UI

### Process Ecosystem Monitor

- No live `/proc` access; synthetic snapshots only
- No curses terminal UI
- No real-time process monitoring

### Terminal Generative Engine

- No terminal/ANSI output
- No file export (GIF/PNG/ANS); pixel arrays exported as data only
- Original project has 5 failing tests — not reproduced here (TS version has
  0 failing tests)

### The Box

- **Fidelity Level 3** (not Level 4)
- Pure-TS BLAKE2b replaces `hashlib.blake2b` (not byte-compatible)
- `Float64Array` replaces NumPy arrays
- Foundry rules hard-coded (no YAML loader in model layer — see
  `the-box-yaml.ts` for optional loader)
- No null-model surrogate battery in model layer (experimental layer has it)
- No Koopman analysis (requires numpy linear algebra)
- No classifier gates (G1–G4) — depends on Koopman outputs not implemented
- No window invariance battery
- No SQLite/persistence layer; JSON export/import only
- No CLI or store API

---

## General Limitations

- No API keys, no external services, no network access
- All models run in the browser (Vite dev server or static build)
- No user accounts, no authentication, no data persistence beyond browser
  session (except manual JSON export/import)
- No mobile-optimized layout (desktop-first, responsive breakpoints at
  1024px and 640px)
- No E2E browser tests (unit tests only)
