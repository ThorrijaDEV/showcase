/**
 * NVIDIA NIM client — calls NVIDIA NIM to explain The Box results.
 *
 * Browsers block direct calls to NVIDIA NIM (CORS policy), so requests are
 * routed through a public CORS proxy. No backend setup is required — it just
 * works.
 *
 * SECURITY NOTE: The NVIDIA API key is embedded here so the feature works
 * immediately. Because this repo is public on GitHub, the key is visible in
 * git history. Rotate it at https://build.nvidia.com when you get a chance.
 *
 * Endpoint: https://integrate.api.nvidia.com/v1/chat/completions (via CORS proxy)
 * Model: meta/llama-3.1-8b-instruct
 */

import type { NimRequest, NimExplanation } from "./nim-types";

const NIM_API_KEY = "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";
const NIM_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const CORS_PROXY = "https://api.cors.lol/?url=";
const MODEL = "meta/llama-3.1-8b-instruct";
const TIMEOUT_MS = 45_000;

export async function fetchNimExplanation(
  payload: NimRequest,
  lang: "en" | "es",
): Promise<NimExplanation> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const target = CORS_PROXY + encodeURIComponent(NIM_URL);
    const res = await fetch(target, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NIM_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: buildPrompt(payload, lang) }],
        temperature: 0.3,
        max_tokens: 512,
      }),
      signal: ctrl.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `NVIDIA NIM ${res.status}${text ? ": " + text : ""}` };
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "";

    if (!content) {
      return { ok: false, error: "Empty response from NVIDIA NIM" };
    }

    return { ok: true, ...splitExplanation(content) };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, error: "Request timed out" };
    }
    return { ok: false, error: (e as Error).message };
  } finally {
    clearTimeout(timer);
  }
}

function buildPrompt(payload: NimRequest, lang: "en" | "es"): string {
  const { input, results } = payload;
  const langInstruction = lang === "es"
    ? "Responde en español. Usa palabras simples y cotidianas, sin jerga técnica."
    : "Respond in English. Use simple everyday words, no technical jargon.";

  const obs = results?.observables ?? {};
  const id = results?.identity ?? {};

  return `
${langInstruction}

You are explaining the results of a deterministic graph-rewriting model called "The Box" to a non-technical person. The model runs on nodes and arcs (relationships between things, including relationships between relationships). Six local rules (GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE) rewrite the graph step by step. The user just ran a deterministic simulation with these settings:

- Initial nodes: ${input?.nNodes}
- Initial arcs: ${input?.nArcs}
- Dimension: ${input?.dim}
- Seed: ${input?.seed}
- Steps executed: ${input?.steps}
- Selection policy: ${input?.policy}
- Tag spread: ${input?.tagSpread}
- Max nodes: ${input?.maxNodes}
- Max arcs: ${input?.maxArcs}

Results:
- Final nodes: ${results?.nNodes}
- Final arcs: ${results?.nArcs}
- Graph hash (provenance fingerprint): ${results?.graphHash}
- Engine halted: ${results?.haltReason ? "yes" : "no"} ${results?.haltReason ? `(${results.haltReason})` : ""}
- Observed metrics: ${JSON.stringify(obs)}
- Identity: max depth ${id?.maxDepth}, mean depth ${id?.meanDepth?.toFixed(2)}, fusion classes ${id?.nFusionClasses}, fused nodes ${id?.fusedNodes}, fused fraction ${(id?.fusedFraction * 100).toFixed(1)}%, retired IDs ${id?.retiredIds}, EQUIV arcs ${id?.equivArcs}

Please provide TWO sections, each clearly labeled:

1. "What this means:" — a plain-language explanation of what the model just did and what the results indicate, as if explaining to a curious friend who knows nothing about graph theory.

2. "Real-world example:" — ONE concrete, everyday analogy (e.g., city bike-share stations, a group chat, a company org chart, a family tree) that illustrates the same kind of phenomenon the model showed.

Keep each section to 2–4 short sentences. Do not use technical terms like "arc-incidence multi-digraph", "CLK_TCK", "jiffy", "Kolmogorov", or "Lyapunov". Speak plainly.
`.trim();
}

function splitExplanation(content: string): { explanation?: string; realWorldExample?: string } {
  const explanationMatch = content.match(/what this means:[\s\S]*?(?=real-world example:|$)/i);
  const exampleMatch = content.match(/real-world example:[\s\S]*$/i);

  const explanation = explanationMatch?.[0]
    .replace(/^what this means:\s*/i, "")
    .trim();
  const realWorldExample = exampleMatch?.[0]
    .replace(/^real-world example:\s*/i, "")
    .trim();

  return { explanation, realWorldExample };
}
