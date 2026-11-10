# Architecture

## High-Level Structure

```
showcase/
├── index.html          — Entry point
├── styles.css          — Dark industrial design system
├── vite.config.ts      — Vite config with @models alias
├── tsconfig.json       — TypeScript config
├── src/
│   ├── main.ts         — Shell, navigation, section registry
│   └── sections/
│       ├── hero.ts          — Overview (6 project cards)
│       ├── wtm.ts           — Wi-Fi Time Machine lab
│       ├── ble-radar.ts     — BLE Radar lab
│       ├── process-ecosystem.ts — PEM lab
│       ├── generative-engine.ts — GenArt lab
│       ├── the-box.ts       — The Box lab
│       └── fidelity.ts      — Fidelity & methodology
models/               — Independent TypeScript deterministic models
├── the-box.ts            — Kernel, rules, engine, identity, metrics, observables
├── the-box-experiment.ts   — Null models, p-values, experiment execution, export/import
├── the-box-yaml.ts         — YAML ruleset loader (foundry.yaml subset)
├── the-box.test.ts         — 42 kernel/engine/rules tests
├── the-box-experiment.test.ts — 25 experimental layer tests
├── the-box-validation.test.ts — 12 cross-language validation tests
├── the-box-yaml.test.ts    — 23 YAML loader tests
├── types.ts                — Shared DeterministicModel contract
└── jest.config.js          — Jest configuration
tests/                — Showcase model test suites (80 tests)
```

## Section Registration Pattern

Each laboratory follows the same pattern:

1. Import the model class from `@models/<name>`
2. Create a singleton model instance
3. Render HTML with input controls, output areas, and canvas elements
4. Wire event listeners to `model.run(input)`
5. Render intermediate stages, not just final results

```typescript
// Example pattern (from hero.ts section registry)
const models = {
  wtm: new WifiTimeMachineModel(),
  ble: new BleRadarModel(),
  pem: new ProcessEcosystemModel(),
  gen: new GenerativeEngineModel(),
  box: new TheBoxModel(),
};

const sections: SectionDef[] = [
  { id: "wtm", title: "Wi-Fi Time Machine", render: renderWifiTimeMachine },
  // ...
];
```

## The Box — Internal Architecture

```
State (arc-incidence multi-digraph)
├── nodes: Map<id, Node{id, tag, payload: Float64Array, born}>
├── arcs:  Map<id, Arc{id, src, dst, tag, w, clock}>
├── Shared id space (nodes + arcs)
├── Incidence indices: incSrc, incDst
├── Retired IDs (witness arcs survive node deletion)
└── Invariants: I1–I4 (unique ids, no dangling arcs, caps, payload dim)

Engine (transition)
├── Policies: canonical, uniform, weighted, roundrobin
├── Step: enumerate PossibilitySpace → select site → instantiate → apply edits
├── Events: step, ruleId, anchor, edits, siteKey
└── Activity tracking: eligible vs applied per rule

PossibilitySpace
├── Sites: (ruleId, anchor) pairs where all predicates hold
├── Seed-independent enumeration
├── canonical_key: relabelling-invariant digest
└── Sampling: unit_hash argmax (relabelling-equivariant)

Rules (data, not code)
├── GATHER: two supporters of same hub → direct connection
├── BOND: anchor + out-neighbour sharing 2 in-neighbours → link
├── TAG_PROP: anchor copies out-neighbour's tag
├── QUIET: no inflow for 30 steps → tag=5
├── DESCEND: QUIET node + headroom → spawn child (tag=3 arc)
└── FUSE: siblings + same tag + close payload → retire twin, EQUIV witness

Identity & Lineage
├── descent_map: TAG_DESCEND arcs → {parent: [children]}
├── parents: {child: parent} with ambiguous tracking
├── lineage_depths: DFS with cycle detection
├── identity_classes: union-find over TAG_EQUIV (incl. retired endpoints)
└── identity_summary: fused_fraction, class_reduction, closure_ratio

Metrics
├── degree_tables: in/out degree over node-node arcs
├── degree_moments: mean, var, max, Gini, CV
├── components: union-find connected components
├── beta0_beta1: Euler-exact on incidence graph
├── component_size_profile: n, max, mean, entropy, largest_frac
├── modularity: deterministic Louvain (single-level)
└── shannon_entropy

Named Observables (14)
├── n_nodes, n_arcs, arc_density, beta0, beta1
├── mean_in_degree, mean_out_degree, max_in_degree, gini_in_degree
├── largest_component_frac, tag_entropy
├── mean_lineage_depth, max_lineage_depth
├── n_identity_classes, n_fusion_classes, fused_nodes, fused_fraction

Experimental Layer
├── Null models: degree-preserving rewire, tag permutation, homogeneous
├── p-value: empirical +1 correction (count+1)/(n+1)
├── Provenance: fingerprint from config, seeds, ruleset hash
├── Export/import: JSON serialisation with integrity validation
└── Complexity: entropy, LZ, turnover on rule-application sequence
```

## Determinism Contract

Every random decision is `unit_hash(seed, step, purpose, structural_digest(candidate))` — a pure function of `(state, seed, step)`. Same `(initial state, seed, ruleset)` → identical trajectory. No hidden stream state; steps can be replayed in isolation.

Relabelling equivariance: `traj(P(s0), seed) == P(traj(s0, seed))` for any permutation `P`.

## Dependencies

- TypeScript 5.6.3
- Vite 5.4.0
- Jest 29.7.0 + ts-jest
- No runtime dependencies (zero-deps models)

## Browser Compatibility

ES2022 target, ESNext modules. Uses `Float64Array`, `BigInt`, `TextEncoder`,
`DataView`, `Uint8Array`, `Map`, `Set`, `requestAnimationFrame`, `canvas`.
Works in any modern browser.
