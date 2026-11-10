# Research & Engineering

## Methodology

### Reconstruction Principles

1. **Independent reconstruction.** Every model is rebuilt from source code as
   an independent TypeScript implementation. The original project is never
   executed inside a demonstration.

2. **Real calculations.** All outputs are computed from inputs. No hardcoded
   outputs, no fabricated results, no simulated progress.

3. **Deterministic.** Same input → same output. Every random decision is a
   pure function of `(state, seed, step)` via `unit_hash`.

4. **Intermediate stages.** Demonstrations show processing stages, not just
   final results. Each section renders per-step observables, event logs, and
   intermediate data structures.

5. **Fidelity classified.** Each model carries a Level 1–4 rating with
   documented adaptations. Nothing is overclaimed.

6. **Honest about limitations.** Limitations are listed explicitly in the
   fidelity section and in `TECHNICAL_LIMITATIONS.md`.

## Experimental Methodology (The Box)

### Null Models

Three surrogate families test whether structural statistics are degree
artefacts:

- **Degree:** degree-preserving double-edge swaps (Milo et al. 2002). Preserves
  every in- and out-degree; destroys higher-order structure.
- **Tags:** node-tag permutation. Preserves tag multiset; destroys which node
  carries which label.
- **Homogeneous:** labels erased, weights normalised. Keeps topology; removes
  every label-derived quantity.

### p-Values

Empirical one-sided p-value with +1 correction:

```
p = (count(null >= real) + 1) / (null_count + 1)
```

Reachability floor: `1/(null_count + 1)`. If floor > alpha (0.01), the test is
not attainable and reported as such.

### Provenance

Experiment fingerprint is a BLAKE2b-16 digest over:
- Experiment name, seed sum, steps, substrate_seed
- Ruleset ID and ruleset content hash
- Configuration
- Fingerprint version

Two records with the same fingerprint are the same experiment.

## Algorithmic Complexity

| Operation | Complexity | Notes |
|-----------|------------|-------|
| State.add_node/add_arc | O(1) | Hash map insertion |
| State.validate() | O(n + a) | n nodes, a arcs |
| State.graph_hash() | O(n + a) | Sorted iteration over all objects |
| State.structural_digest() | O(ball size) | Memoised per object per version |
| Engine.step() | O(|sites| × predicates) | Site enumeration dominates |
| unit_hash() | O(1) | BLAKE2b-8 over fixed-size input |
| PossibilitySpace enumeration | O(rules × nodes × predicates) | Every rule × every node |
| BLAKE2b compress | O(blocks) | 12 rounds per 128-byte block |

## Design Decisions

### Shared id space
Nodes and arcs draw from one counter. Any id resolves unambiguously to a node
or an arc. This enables second-order relational structure (arcs pointing to
arcs) with a single dictionary.

### Retired IDs
When a node is deleted but witness arcs (TAG_EQUIV) reference it, the ID is
moved to `retired` rather than removed. It is not a node (cannot be matched or
edited) but arcs may still terminate on it. Invariant I2 is deliberately
weakened for preserved tags.

### Rules as data
Rules are data structures (JSON-compatible), not functions. This means the
substrate can modify its own transition set — rule derivation is part of the
system under study, not the host language.

### Stateless models
All models implement `DeterministicModel<Input, Output>` with `validate()`,
`run()`, and `reset()`. Models are stateless by design; `reset()` is a no-op
included for API symmetry.

### Pure-TS BLAKE2b
RFC 7693 implemented in pure TypeScript using `BigInt` for 64-bit arithmetic.
Deterministic and self-consistent, but **not byte-compatible** with Python's
`hashlib.blake2b`. See `THE_BOX_COMPATIBILITY_REPORT.md` for details.
