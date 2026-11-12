/**
 * Local explainer — generates simple, human-friendly explanations of The Box
 * results without any external API, proxy, or API key.
 *
 * Zero configuration: no CORS, no network, no secrets.
 * Uses everyday language, varies the example each time (based on seed), and
 * keeps technical jargon out — or explains it at the end.
 */

import type { BoxOutput } from "@models/the-box";
import type { NimExplanation } from "./nim-types";

/** Map of rule IDs to display names (EN/ES). */
const RULE_NAMES: Record<string, { en: string; es: string }> = {
  GATHER: { en: "connect", es: "conectar" },
  BOND: { en: "link", es: "enlazar" },
  TAG_PROP: { en: "copy-label", es: "copiar-etiqueta" },
  QUIET: { en: "rest", es: "descansar" },
  DESCEND: { en: "spawn", es: "crear" },
  FUSE: { en: "merge", es: "fusionar" },
};

const EXAMPLES_EN = [
  "Imagine a city's bike-share stations: each station is a dot, and every rider trip is a line between dots. When stations start acting the same way, The Box groups them together. Then some stations spawn new ones nearby, creating chains of influence that spread through the whole city.",
  "Think of a school classroom: every student is a dot, and every time two students talk, a line appears between them. If two groups start behaving alike, The Box sees them as one group. New students join and copy the habits of their neighbors, so ideas spread like waves through the class.",
  "Picture an ant colony: each ant is a dot, and every trail they leave is a line. The Box notices which ants do similar things and treats them as a team. New ants are born and follow the trails of older ones, building a network that grows more organized with every step.",
  "Imagine a group chat: every person is a dot, and every reply they send is a line. The Box watches who talks to whom and which patterns repeat. Over time, the chat organizes itself into clusters, and some messages spark new conversations that branch out like a family tree.",
];

const EXAMPLES_ES = [
  "Imagina las estaciones de bicicletas compartidas de una ciudad: cada estación es un punto, y cada viaje en bicicleta es una línea entre puntos. Cuando las estaciones empiezan a comportarse igual, The Box las agrupa. Luego algunas estaciones crean otras nuevas cerca, formando cadenas de influencia que se extienden por toda la ciudad.",
  "Piensa en un salón de clase: cada estudiante es un punto, y cada vez que dos estudiantes hablan aparece una línea entre ellos. Si dos grupos empiezan a comportarse de forma parecida, The Box los ve como un solo grupo. Nuevos estudiantes se unen y copian los hábitos de sus vecinos, así las ideas se propagan como ondas por el aula.",
  "Imagina una colonia de hormigas: cada hormiga es un punto, y cada rastro que dejan es una línea. The Box nota qué hormigas hacen cosas similares y las trata como un equipo. Nacen nuevas hormigas y siguen los rastros de las más viejas, construyendo una red que se vuelve más organizada con cada paso.",
  "Imagina un chat grupal: cada persona es un punto, y cada respuesta que envían es una línea. The Box observa quién habla con quién y qué patrones se repiten. Con el tiempo, el chat se organiza en grupos, y algunos mensajes provocan nuevas conversaciones que se ramifican como un árbol genealógico.",
];

const RESEARCH_EXAMPLES_EN = [
  {
    title: "Curing cancer",
    text: "Scientists could model cancer cells as dots and the signals they send as arcs. The Box would find which cells act like 'leaders' (fusion classes), which signals spread fastest (lineage depth), and which drugs break the chains (node retirements). It is like having a microscope that sees not just cells, but the hidden rules that decide whether a tumor grows or dies.",
  },
  {
    title: "Understanding the brain",
    text: "Researchers could map every neuron as a dot and every synapse as an arc. The Box would reveal which thoughts are actually the same pattern wearing different masks (identity classes), and which ideas are 'descendants' of others. It is like finding the Rosetta Stone of the mind — seeing the hidden grammar behind consciousness itself.",
  },
  {
    title: "Predicting the next pandemic",
    text: "Epidemiologists could model every person as a dot and every contact as an arc. The Box would spot which people are 'superspreader hubs' before anyone gets sick, and which interventions actually break the chain. It is like having a weather forecast for diseases — seeing the storm before the first raindrop falls.",
  },
  {
    title: "Designing new materials",
    text: "Materials scientists could model every atom as a dot and every bond as an arc. The Box would discover which atomic arrangements create unbreakable materials (stable fusion classes) and which ones self-repair (DESCEND chains). It is like alchemy, but with math instead of magic.",
  },
];

const RESEARCH_EXAMPLES_ES = [
  {
    title: "Curar el cáncer",
    text: "Los científicos podrían modelar cada célula cancerosa como un punto y cada señal que envía como un arco. The Box encontraría qué células actúan como 'líderes' (clases de fusión), qué señales se propagan más rápido (profundidad de linaje), y qué medicamentos rompen las cadenas (nodos retirados). Es como tener un microscopio que no solo ve células, sino las reglas ocultas que deciden si un tumor crece o muere.",
  },
  {
    title: "Entender el cerebro",
    text: "Los investigadores podrían mapear cada neurona como un punto y cada sinapsis como un arco. The Box revelaría qué pensamientos son en realidad el mismo patrón con máscara distinta (clases de identidad), y qué ideas son 'descendientes' de otras. Es como encontrar la Piedra Rosetta de la mente — ver la gramática oculta detrás de la conciencia misma.",
  },
  {
    title: "Predecir la próxima pandemia",
    text: "Los epidemiólogos podrían modelar cada persona como un punto y cada contacto como un arco. The Box detectaría quiénes son los 'centros de superspreader' antes de que enferme nadie, y qué intervenciones realmente rompen la cadena. Es como tener un pronóstico del tiempo para enfermedades — ver la tormenta antes de la primera gota de lluvia.",
  },
  {
    title: "Diseñar nuevos materiales",
    text: "Los científicos de materiales podrían modelar cada átomo como un punto y cada enlace como un arco. The Box descubriría qué arreglos atómicos crean materiales irrompibles (clases de fusión estables) y cuáles se autorreparan (cadenas DESCEND). Es como alquimia, pero con matemáticas en lugar de magia.",
  },
];

function pick(arr: any[], seed: number): any {
  return arr[Math.abs(seed) % arr.length];
}

function glossaryEN(): string {
  return `<div style="font-size:10px; color:var(--text-muted); line-height:1.4; margin-top:8px; border-top:1px solid var(--panel-border); padding-top:6px;">
<strong>Simple word guide:</strong>
<ul style="margin:2px 0 0 0; padding-left:14px;">
<li><strong>Dot / node</strong> — one thing in the system (a person, a station, a cell).</li>
<li><strong>Line / arc / connection</strong> — a link between two dots (who talks to whom).</li>
<li><strong>Merge / family</strong> — when The Box decides two dots are the same kind of thing and groups them.</li>
<li><strong>Chain length / lineage depth</strong> — how many "parent → child" steps exist from start to finish.</li>
<li><strong>Retired / witness</strong> — a dot that stopped being active but is remembered so its story isn't lost.</li>
</ul></div>`;
}

function glossaryES(): string {
  return `<div style="font-size:10px; color:var(--text-muted); line-height:1.4; margin-top:8px; border-top:1px solid var(--panel-border); padding-top:6px;">
<strong>Guía sencilla de palabras:</strong>
<ul style="margin:2px 0 0 0; padding-left:14px;">
<li><strong>Punto / nodo</strong> — una cosa en el sistema (una persona, una estación, una célula).</li>
<li><strong>Línea / arco / conexión</strong> — un vínculo entre dos puntos (quién le habla a quién).</li>
<li><strong>Fusión / familia</strong> — cuando The Box decide que dos puntos son el mismo tipo de cosa y los agrupa.</li>
<li><strong>Longitud de cadena / profundidad de linaje</strong> — cuántos pasos de "padre → hijo" hay desde el principio hasta el final.</li>
<li><strong>Retirado / testigo</strong> — un punto que dejó de estar activo pero se recuerda para no perder su historia.</li>
</ul></div>`;
}

/** Build a simple, human-friendly explanation from BoxOutput (no external API). */
export function explainLocally(output: BoxOutput, lang: "en" | "es"): NimExplanation {
  const f = output.final;
  const id = f.identity;
  const rules = output.rulesUsed;

  // Seed for picking varied examples (deterministic: same output → same example)
  const seed = typeof f.step === "number" ? f.step : 0;

  const parts: string[] = [];

  if (lang === "es") {
    parts.push(`The Box ejecutó ${f.step} rondas y terminó con ${f.nNodes} puntos y ${f.nArcs} líneas.`);
    const ruleEntries = Object.entries(rules).sort((a: any, b: any) => b[1] - a[1]);
    const top = ruleEntries[0];
    if (top) {
      const name = RULE_NAMES[top[0]]?.es ?? top[0];
      parts.push(`El movimiento más usado fue "${name}", aplicado ${top[1]} veces — fue el que más moldeó el resultado.`);
    }
    if (id.nFusionClasses > 0) {
      parts.push(`Encontró ${id.nFusionClasses} familia(s) de cosas similares y fusionó ${id.fusedNodes} punto(s). Cosas que parecían diferentes resultaron ser lo mismo.`);
    } else {
      parts.push("No se fusionó nada — cada punto siguió siendo único.");
    }
    if (id.maxDepth > 0) {
      parts.push(`La cadena más larga tiene ${id.maxDepth} pasos — eso es hasta dónde llega un solo cambio.`);
    }
    if (id.retiredIds > 0) {
      parts.push(`${id.retiredIds} punto(s) se retiraron pero se guardaron como testigos.`);
    }
  } else {
    parts.push(`The Box ran ${f.step} rounds and ended with ${f.nNodes} dots and ${f.nArcs} lines.`);
    const ruleEntries = Object.entries(rules).sort((a: any, b: any) => b[1] - a[1]);
    const top = ruleEntries[0];
    if (top) {
      const name = RULE_NAMES[top[0]]?.en ?? top[0];
      parts.push(`The most-used move was "${name}", applied ${top[1]} times — it shaped the result most.`);
    }
    if (id.nFusionClasses > 0) {
      parts.push(`The Box found ${id.nFusionClasses} family(-ies) of similar things and merged ${id.fusedNodes} dot(s). Things that looked different turned out to be the same underneath.`);
    } else {
      parts.push("Nothing was merged — every dot stayed unique.");
    }
    if (id.maxDepth > 0) {
      parts.push(`The longest chain is ${id.maxDepth} steps long — that is how far one change can ripple through the system.`);
    }
    if (id.retiredIds > 0) {
      parts.push(`${id.retiredIds} dot(s) stepped aside but were kept as witnesses.`);
    }
  }

  const explanation = lang === "es" ? exampleES(seed) : exampleEN(seed);
  const research: any = lang === "es" ? researchES(seed) : researchEN(seed);
  const glossary = lang === "es" ? glossaryES() : glossaryEN();

  const explanationHtml = `
<div style="font-size:11px; color:var(--text); line-height:1.6;">
  <div style="font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${lang === "es" ? "Qué significa esto:" : "What this means:"}</div>
  <div style="margin-bottom:8px;">${parts.join(" ")}</div>
  <div style="font-weight:600; color:var(--fg-amber); margin-bottom:4px; margin-top:8px;">${lang === "es" ? "Ejemplo de la vida real:" : "Real-world example:"}</div>
  <div style="color:var(--text-muted); margin-bottom:8px;">${explanation}</div>
  <div style="font-weight:600; color:var(--fg-purple); margin-bottom:4px; margin-top:8px;">${lang === "es" ? "Un ejemplo increíble de investigación:" : "An amazing research example:"}</div>
  <div style="background:#0a0a0c; border:1px solid var(--panel-border); border-radius:4px; padding:8px; font-size:10px; color:var(--text);">${research.title}: ${research.text}</div>
  ${glossary}
</div>
`;

  return {
    ok: true,
    explanation: explanationHtml,
    realWorldExample: "",
  };
}

function exampleEN(seed: number): string {
  return pick(EXAMPLES_EN, seed);
}

function exampleES(seed: number): string {
  return pick(EXAMPLES_ES, seed);
}

function researchEN(seed: number): string {
  return pick(RESEARCH_EXAMPLES_EN, seed);
}

function researchES(seed: number): string {
  return pick(RESEARCH_EXAMPLES_ES, seed);
}
