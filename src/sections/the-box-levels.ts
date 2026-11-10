/**
 * THE BOX — Three-level result presentation layer.
 *
 * Pure interpretation layer: reads the immutable BoxOutput produced by the
 * engine and transforms it into three view representations (simple /
 * technical / raw). It never re-runs the engine, never mutates the original
 * execution data, and never calculates different results per level.
 *
 * All narrative text is generated from real results only. No invented
 * conclusions, no generic filler.
 */

import type { BoxOutput, BoxStage, EngineHalt, EditSpec } from "@models/the-box";
import { getLang } from "../i18n";
import { dict } from "../i18n/dict";

export type Level = "simple" | "technical" | "raw";

function t(key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[getLang()];
}

// ---------------------------------------------------------------------------
// View data structures (plain data, no DOM)
// ---------------------------------------------------------------------------

export interface SimpleViewData {
  level: "simple";
  title: string;
  subtitle: string;
  sections: SimpleSection[];
  keyNumbers: Array<{ label: string; value: string }>;
}

export interface SimpleSection {
  heading: string;
  body: string;
}

export interface TechnicalMetric {
  name: string;
  value: string | number;
  context: string; // brief plain-language description of what it means
}

export interface TechnicalViewData {
  level: "technical";
  title: string;
  subtitle: string;
  processingSummary: string;
  keyMetrics: TechnicalMetric[];
  rulesApplied: Array<{ rule: string; count: number }>;
  operations: Array<{ op: string; count: number }>;
  fusions: { count: number; nodes: number; fraction: string };
  halt: { ran: boolean; reason: string | null } | null;
}

export interface RawViewData {
  level: "raw";
  title: string;
  subtitle: string;
  input: any;
  determinism: any;
  rulesUsed: Record<string, number>;
  editsUsed: Record<string, number>;
  complexity: string;
  equations: string[];
  stages: BoxStage[];
  final: any;
  nodeCount: number;
  arcCount: number;
}

export interface InterpretationResult {
  simple: SimpleViewData;
  technical: TechnicalViewData;
  raw: RawViewData;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(n: number): string {
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function pct(n: number, d: number): string {
  if (!d) return "0 %";
  return ((n / d) * 100).toFixed(1) + " %";
}

function ruleName(ruleId: string): string {
  const names: Record<string, string> = {
    GATHER: "GATHER",
    BOND: "BOND",
    TAG_PROP: "TAG_PROP",
    QUIET: "QUIET",
    DESCEND: "DESCEND",
    FUSE: "FUSE",
  };
  return names[ruleId] ?? ruleId;
}

// ---------------------------------------------------------------------------
// Level 1 — Simple (natural language, real results only)
// ---------------------------------------------------------------------------

function plural(n: number, one: string, other: string): string {
  return n === 1 ? one : other;
}

function sOf(n: number): string {
  return n === 1 ? "" : "s";
}

function interpretSimple(output: BoxOutput): SimpleViewData {
  const lang = getLang();
  const f = output.final;
  const id = f.identity;
  const rules = output.rulesUsed;
  const ruleIds = Object.keys(rules);
  const totalSteps = f.step;
  const ruleApplications = Object.values(rules).reduce((a, b) => a + b, 0);

  const T = (k: string): string => dict[k]?.[lang] ?? k;

  // Build narrative from real results.
  const sections: SimpleSection[] = [];

  // A. What it did
  sections.push({
    heading: T("box_simple_what_did"),
    body: lang === "es"
      ? `The Box ejecutó ${totalSteps} paso${sOf(totalSteps)} determinista sobre un sustrato que comenzó con ${output.input.nNodes} nodos y ${output.input.nArcs} arcos, aplicando ${ruleApplications} aplicación${plural(ruleApplications, "", "s")} de regla${plural(ruleApplications, "", "s")} a través de ${ruleIds.length} tipo${plural(ruleIds.length, "", "s")} de regla (${ruleIds.map(ruleName).join(", ")}).`
      : `The Box ran ${totalSteps} deterministic step${sOf(totalSteps)} on a substrate that started with ${output.input.nNodes} nodes and ${output.input.nArcs} arcs, applying ${ruleApplications} rule application${sOf(ruleApplications)} across ${ruleIds.length} rule type${sOf(ruleIds.length)} (${ruleIds.map(ruleName).join(", ")}).`,
  });

  // B. What it achieved
  const fusions = id.fusedNodes;
  const fusionClasses = id.nFusionClasses;
  const achBody: string[] = [];
  if (fusions > 0) {
    achBody.push(
      lang === "es"
        ? `identificó ${fusions} nodo${sOf(fusions)} que pertenecía a ${fusionClasses} clase de fusión${sOf(fusionClasses)} (estructuras reconocidas como iguales y fusionadas).`
        : `it identified ${fusions} node${sOf(fusions)} that belonged to ${fusionClasses} fusion class${sOf(fusionClasses)} (structures recognised as the same and merged).`
    );
  } else {
    achBody.push(T("box_simple_no_fusions"));
  }
  if (id.nIdentityClasses > 0) {
    achBody.push(
      lang === "es"
        ? `organizó la estructura final en ${id.nIdentityClasses} clase de identidad${sOf(id.nIdentityClasses)}.`
        : `it organised the final structure into ${id.nIdentityClasses} identity class${sOf(id.nIdentityClasses)}.`
    );
  }
  if (id.nLineageCycles > 0) {
    achBody.push(
      lang === "es"
        ? `detectó ${id.nLineageCycles} ciclo de linaje${sOf(id.nLineageCycles)} en la estructura de descendencia.`
        : `it detected ${id.nLineageCycles} lineage cycle${sOf(id.nLineageCycles)} in the descent structure.`
    );
  }
  sections.push({
    heading: T("box_simple_achieved"),
    body: achBody.join(" ") || T("box_simple_no_change"),
  });

  // C. What changed
  const nodesDelta = f.nNodes - output.input.nNodes;
  const arcsDelta = f.nArcs - output.input.nArcs;
  const changedParts: string[] = [];
  if (nodesDelta !== 0) {
    changedParts.push(
      lang === "es"
        ? `el conteo de nodos cambió ${nodesDelta > 0 ? "+" : ""}${nodesDelta}`
        : `node count changed by ${nodesDelta > 0 ? "+" : ""}${nodesDelta}`
    );
  }
  if (arcsDelta !== 0) {
    changedParts.push(
      lang === "es"
        ? `el conteo de arcos cambió ${arcsDelta > 0 ? "+" : ""}${arcsDelta}`
        : `arc count changed by ${arcsDelta > 0 ? "+" : ""}${arcsDelta}`
    );
  }
  if (id.retiredIds > 0) {
    changedParts.push(
      lang === "es"
        ? `${id.retiredIds} nodo${sOf(id.retiredIds)} retirado${sOf(id.retiredIds)}`
        : `${id.retiredIds} node${sOf(id.retiredIds)} retired`
    );
  }
  sections.push({
    heading: T("box_simple_changed"),
    body:
      changedParts.length > 0
        ? changedParts.join(", ") + "."
        : lang === "es"
        ? "No cambió nada estructuralmente: el sustrato terminó la ejecución como comenzó."
        : "Nothing changed structurally — the substrate ended the run as it began.",
  });

  // D. Final result
  sections.push({
    heading: T("box_simple_result"),
    body: lang === "es"
      ? `El sustrato terminó con ${f.nNodes} nodos y ${f.nArcs} arcos. Su hash del grafo (una huella de proveniencia) es ${f.graphHash}. ${
          f.halt
            ? `El motor se detuvo en el paso ${f.halt.step}: ${f.halt.reason}.`
            : "El motor completó todos los pasos solicitados sin detenerse."
        }`
      : `The substrate finished with ${f.nNodes} nodes and ${f.nArcs} arcs. Its graph hash (a provenance fingerprint) is ${f.graphHash}. ${
          f.halt
            ? `The engine halted at step ${f.halt.step}: ${f.halt.reason}.`
            : "The engine completed all requested steps without halting."
        }`,
  });

  // E. What it means
  const meaningParts: string[] = [];
  if (fusions > 0) {
    meaningParts.push(
      lang === "es"
        ? "Algunas estructuras fueron reconocidas como equivalentes y fusionadas, por lo que el grafo final es más simple de lo que el conteo de pasos podría sugerir."
        : "Some structures were recognised as equivalent and merged, so the final graph is simpler than the raw step count might suggest."
    );
  } else {
    meaningParts.push(T("box_simple_no_fusions"));
  }
  if (id.nLineageCycles > 0) {
    meaningParts.push(
      lang === "es"
        ? "Los ciclos de linaje indican que las relaciones de descendencia volvieron sobre sí mismas al menos una vez."
        : "Lineage cycles indicate that descent relationships looped back on themselves at least once."
    );
  }
  sections.push({
    heading: T("box_simple_meaning"),
    body: meaningParts.join(" ") || "The run produced a stable final structure with no unexpected transformations.",
  });

  // Key numbers (minimal, honest)
  const keyNumbers: Array<{ label: string; value: string }> = [
    { label: T("box_tech_steps_count"), value: String(totalSteps) },
    { label: "Rule types used", value: String(ruleIds.length) },
    { label: "Nodes (start → end)", value: `${output.input.nNodes} → ${f.nNodes}` },
    { label: "Arcs (start → end)", value: `${output.input.nArcs} → ${f.nArcs}` },
    { label: "Nodes merged (fusions)", value: String(fusions) },
    { label: "Graph hash", value: f.graphHash.slice(0, 16) + "…" },
  ];

  return {
    level: "simple",
    title: T("box_level_simple_title"),
    subtitle: T("box_level_simple_sub"),
    sections,
    keyNumbers,
  };
}

// ---------------------------------------------------------------------------
// Level 2 — Technical (metrics with context)
// ---------------------------------------------------------------------------

function interpretTechnical(output: BoxOutput): TechnicalViewData {
  const f = output.final;
  const id = f.identity;
  const struct = f.structure;
  const obs = f.observables;

  const processingSummary =
    `Deterministic Box run: ${f.step} step${
      f.step !== 1 ? "s" : ""
    } under the "${output.input.policy}" selection policy, starting from ${output.input.nNodes} nodes and ${output.input.nArcs} arcs (dimension ${output.input.dim}, seed ${output.input.seed}), applying the six foundry rules (GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE) until completion or halt.`;

  const keyMetrics: TechnicalMetric[] = [
    {
      name: "Steps executed",
      value: f.step,
      context: "Number of rule applications completed before the engine halted or finished the requested step budget.",
    },
    {
      name: "Nodes (final)",
      value: f.nNodes,
      context: "Live nodes remaining in the substrate after all steps and retirements.",
    },
    {
      name: "Arcs (final)",
      value: f.nArcs,
      context: "Live relationships remaining between nodes/arcs.",
    },
    {
      name: "Nodes retired",
      value: id.retiredIds,
      context: "Nodes removed from the live graph but retained as fusion witnesses.",
    },
    {
      name: "Fused nodes",
      value: id.fusedNodes,
      context: "Nodes that participated in at least one FUSE identity merge.",
    },
    {
      name: "Fused fraction",
      value: pct(id.fusedNodes, id.nIdentityClasses + id.fusedNodes - id.nFusionClasses || 1),
      context: "Share of the identity-relevant population that was merged into another structure.",
    },
    {
      name: "Fusion classes",
      value: id.nFusionClasses,
      context: "Distinct equivalence classes produced by FUSE (classes with more than one member).",
    },
    {
      name: "Max lineage depth",
      value: id.maxDepth,
      context: "Longest descent chain from a root to a leaf in the DESCEND tree.",
    },
    {
      name: "Beta-0 / Beta-1",
      value: `${struct.beta0} / ${struct.beta1}`,
      context: "Euler-exact incidence-graph invariants: connected components and independent cycles.",
    },
    {
      name: "Modularity",
      value: struct.modularity.toFixed(4),
      context: "Deterministic single-level Louvain modularity of the final node/arc partition.",
    },
    {
      name: "Graph hash (provenance)",
      value: f.graphHash.slice(0, 16) + "…",
      context: "BLAKE2b-32 fingerprint over sorted nodes, arcs and retired IDs — same input yields identical hash.",
    },
  ];

  const rulesApplied = Object.entries(output.rulesUsed)
    .map(([rule, count]) => ({ rule: ruleName(rule), count }))
    .sort((a, b) => b.count - a.count);

  const operations = Object.entries(output.editsUsed)
    .map(([op, count]) => ({ op, count }))
    .sort((a, b) => b.count - a.count);

  const fusions = {
    count: id.nFusionClasses,
    nodes: id.fusedNodes,
    fraction: pct(id.fusedNodes, Math.max(id.nIdentityClasses, 1)),
  };

  const halt = f.halt
    ? { ran: true, reason: f.halt.reason }
    : { ran: false, reason: null };

  return {
    level: "technical",
    title: "Technical — processing summary",
    subtitle: "Steps, rules, metrics, structures",
    processingSummary,
    keyMetrics,
    rulesApplied,
    operations,
    fusions,
    halt,
  };
}

// ---------------------------------------------------------------------------
// Level 3 — Raw (complete transparency)
// ---------------------------------------------------------------------------

function interpretRaw(output: BoxOutput): RawViewData {
  return {
    level: "raw",
    title: "RAW — complete data",
    subtitle: "Nodes, arcs, rule history, debug info",
    input: output.input,
    determinism: output.determinism,
    rulesUsed: output.rulesUsed,
    editsUsed: output.editsUsed,
    complexity: output.complexity,
    equations: output.equations,
    stages: output.stages,
    final: output.final,
    nodeCount: output.final.nNodes,
    arcCount: output.final.nArcs,
  };
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function interpret(output: BoxOutput): InterpretationResult {
  return {
    simple: interpretSimple(output),
    technical: interpretTechnical(output),
    raw: interpretRaw(output),
  };
}

// ---------------------------------------------------------------------------
// Export (traceable, all from same execution)
// ---------------------------------------------------------------------------

export interface ExportPayload {
  executionId: string;
  generatedAt: string;
  source: string;
  fidelity: string;
  level: Level;
  input: BoxOutput["input"];
  determinism: BoxOutput["determinism"];
  interpretation: any;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function buildExport(
  output: BoxOutput,
  level: Level,
  view: SimpleViewData | TechnicalViewData | RawViewData,
): ExportPayload {
  const executionId = `box-${output.input.seed}-${output.final.step}-${Date.now()}`;
  return {
    executionId,
    generatedAt: nowIso(),
    source: "The Box showcase model v0.1.0 (deterministic reconstruction)",
    fidelity: "Level 3 — pure-TS BLAKE2b, not byte-compatible with Python hashlib.blake2b; structural equivalence only",
    level,
    input: output.input,
    determinism: output.determinism,
    interpretation: view,
  };
}

export function exportJson(payload: ExportPayload): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `the-box-${payload.level}-report-${payload.executionId}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
