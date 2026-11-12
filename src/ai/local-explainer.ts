/**
 * Local explainer — generates plain-language explanations of The Box results
 * without any external API, proxy, or API key.
 *
 * Works immediately with zero configuration: no CORS issues, no network
 * calls, no secrets. Analyzes the deterministic model output and produces
 * a human-readable explanation plus a real-world analogy in the active
 * language (EN/ES).
 */

import type { BoxOutput } from "@models/the-box";
import type { NimExplanation } from "./nim-types";

/** Map of rule IDs to display names (EN/ES). */
const RULE_NAMES: Record<string, { en: string; es: string }> = {
  GATHER: { en: "GATHER", es: "GATHER" },
  BOND: { en: "BOND", es: "BOND" },
  TAG_PROP: { en: "TAG_PROP", es: "TAG_PROP" },
  QUIET: { en: "QUIET", es: "QUIET" },
  DESCEND: { en: "DESCEND", es: "DESCEND" },
  FUSE: { en: "FUSE", es: "FUSE" },
};

/** Build a plain-language explanation from a BoxOutput (no external API). */
export function explainLocally(output: BoxOutput, lang: "en" | "es"): NimExplanation {
  const f = output.final;
  const id = f.identity;
  const obs = f.observables;
  const rules = output.rulesUsed;
  const edits = output.editsUsed;

  // Most-used rule
  const ruleEntries = Object.entries(rules).sort((a, b) => b[1] - a[1]);
  const topRule = ruleEntries[0];

  // Build sentences
  let explanation = "";
  let example = "";

  if (lang === "es") {
    explanation = explainES(f, id, obs, rules, edits, topRule);
    example = exampleES(f, id, obs, topRule);
  } else {
    explanation = explainEN(f, id, obs, rules, edits, topRule);
    example = exampleEN(f, id, obs, topRule);
  }

  return { ok: true, explanation, realWorldExample: example };
}

/** ---------- English ---------- */

function explainEN(
  f: any,
  id: any,
  obs: Record<string, number>,
  rules: Record<string, number>,
  edits: Record<string, number>,
  topRule: [string, number] | undefined,
): string {
  const parts: string[] = [];

  parts.push(
    `The model ran ${f.step} steps and ended with ${f.nNodes} nodes and ${f.nArcs} arcs.`,
  );

  if (topRule) {
    const name = RULE_NAMES[topRule[0]]?.en ?? topRule[0];
    parts.push(
      `The rule "${name}" was applied ${topRule[1]} times — more than any other — so it shaped the final structure the most.`,
    );
  }

  if (id.nFusionClasses > 0) {
    parts.push(
      `It found ${id.nFusionClasses} group(s) of similar structures and merged ${id.fusedNodes} node(s) into them, simplifying the graph.`,
    );
  } else {
    parts.push("No structures were merged — everything stayed distinct.");
  }

  if (id.maxDepth > 0) {
    parts.push(
      `The longest chain of "parent → child" steps is ${id.maxDepth} levels deep, showing how far influence can spread from a starting point.`,
    );
  }

  if (id.retiredIds > 0) {
    parts.push(
      `${id.retiredIds} node(s) were retired but kept as witnesses, so their history isn't lost.`,
    );
  }

  if (f.halt) {
    parts.push(
      `The engine stopped at step ${f.halt.step}: ${f.halt.reason}.`,
    );
  } else {
    parts.push("The engine completed all requested steps without stopping early.");
  }

  return parts.join(" ");
}

function exampleEN(
  f: any,
  id: any,
  obs: Record<string, number>,
  topRule: [string, number] | undefined,
): string {
  const rule = topRule ? RULE_NAMES[topRule[0]]?.en ?? topRule[0] : "a rule";

  if (id.nFusionClasses > 0 && id.maxDepth > 0) {
    return `Think of a city's bike-share network: stations are nodes, rider flows are arcs. When two stations behave the same way (same number of bikes coming and going), the system treats them as one "type" of station (fusion). Over time, some stations spawn new ones nearby (descend), creating chains of influence up to ${id.maxDepth} steps long. The most common rule — "${rule}" — is like the city's main rebalancing truck: it does the most work shaping how bikes move around.`;
  }
  if (id.nFusionClasses > 0) {
    return `Think of sorting a pile of LEGO bricks by color: bricks of the same color get grouped together (fusion), so you end up with ${id.nFusionClasses} color groups instead of individual bricks. The "${rule}" rule is what decides which bricks belong together.`;
  }
  if (id.maxDepth > 0) {
    return `Think of a family tree: each person is a node, and parent→child links are arcs. The longest chain from an ancestor to a descendant is ${id.maxDepth} steps long. The "${rule}" rule is like the most common way new family members are added.`;
  }
  return `Think of a group chat: each person is a node, and each message they reply to is an arc. The system watches how people connect and which patterns repeat, applying the "${rule}" rule most often to decide how the conversation evolves.`;
}

/** ---------- Spanish ---------- */

function explainES(
  f: any,
  id: any,
  obs: Record<string, number>,
  rules: Record<string, number>,
  edits: Record<string, number>,
  topRule: [string, number] | undefined,
): string {
  const parts: string[] = [];

  parts.push(
    `El modelo ejecutó ${f.step} pasos y terminó con ${f.nNodes} nodos y ${f.nArcs} arcos.`,
  );

  if (topRule) {
    const name = RULE_NAMES[topRule[0]]?.es ?? topRule[0];
    parts.push(
      `La regla "${name}" se aplicó ${topRule[1]} veces — más que cualquier otra — por lo que fue la que más moldeó la estructura final.`,
    );
  }

  if (id.nFusionClasses > 0) {
    parts.push(
      `Encontró ${id.nFusionClasses} grupo(s) de estructuras similares y fusionó ${id.fusedNodes} nodo(s) en ellos, simplificando el grafo.`,
    );
  } else {
    parts.push("No se fusionaron estructuras — todo se mantuvo distinto.");
  }

  if (id.maxDepth > 0) {
    parts.push(
      `La cadena más larga de "padre → hijo" tiene ${id.maxDepth} niveles de profundidad, mostrando hasta dónde se extiende la influencia desde un punto de partida.`,
    );
  }

  if (id.retiredIds > 0) {
    parts.push(
      `${id.retiredIds} nodo(s) se retiraron pero se conservaron como testigos, para no perder su historial.`,
    );
  }

  if (f.halt) {
    parts.push(
      `El motor se detuvo en el paso ${f.halt.step}: ${f.halt.reason}.`,
    );
  } else {
    parts.push("El motor completó todos los pasos solicitados sin detenerse antes.");
  }

  return parts.join(" ");
}

function exampleES(
  f: any,
  id: any,
  obs: Record<string, number>,
  topRule: [string, number] | undefined,
): string {
  const rule = topRule ? RULE_NAMES[topRule[0]]?.es ?? topRule[0] : "una regla";

  if (id.nFusionClasses > 0 && id.maxDepth > 0) {
    return `Imagina una red de estaciones de bicicletas compartidas: las estaciones son nodos, los flujos de usuarios son arcos. Cuando dos estaciones se comportan igual (mismo número de bicis que entran y salen), el sistema las trata como un mismo "tipo" de estación (fusión). Con el tiempo, algunas estaciones generan otras nuevas cerca (descend), creando cadenas de influencia de hasta ${id.maxDepth} pasos. La regla más frecuente — "${rule}" — es como el camión principal de rebalanceo de la ciudad: es el que más trabaja moviendo bicis por la red.`;
  }
  if (id.nFusionClasses > 0) {
    return `Imagina ordenar un montón de piezas de LEGO por color: las piezas del mismo color se agrupan (fusión), así terminas con ${id.nFusionClasses} grupos de color en lugar de piezas individuales. La regla "${rule}" es la que decide qué piezas pertenecen juntas.`;
  }
  if (id.maxDepth > 0) {
    return `Imagina un árbol genealógico: cada persona es un nodo, y los enlaces padre→hijo son arcos. La cadena más larga de un ancestro a un descendiente tiene ${id.maxDepth} pasos. La regla "${rule}" es como la forma más común en que se añaden nuevos miembros a la familia.`;
  }
  return `Imagina un chat grupal: cada persona es un nodo, y cada mensaje al que responden es un arco. El sistema observa cómo se conectan las personas y qué patrones se repiten, aplicando la regla "${rule}" con más frecuencia para decidir cómo evoluciona la conversación.`;
}
