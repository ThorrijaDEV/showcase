/**
 * THE BOX — NVIDIA NIM proxy (Cloudflare Worker example)
 *
 * Holds the NVIDIA API key in Worker secrets (never in code, never in the
 * frontend) and forwards plain-language explanation requests to
 * https://integrate.api.nvidia.com/v1/chat/completions.
 *
 * Deploy:
 *   wrangler login
 *   wrangler secret put NVIDIA_API_KEY   # paste your key here
 *   wrangler deploy
 *
 * Frontend must set VITE_NIM_PROXY_URL to this worker's URL.
 */

interface Env {
  NVIDIA_API_KEY: string;
  ALLOWED_ORIGINS?: string; // comma-separated, e.g. "https://thorrijadev.github.io,http://localhost:5173"
}

const NIM_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = "meta/llama-3.1-8b-instruct";

function corsHeaders(origin: string | null, allowed: string[]): Record<string, string> {
  const allow = origin && allowed.includes(origin) ? origin : (allowed[0] || "*");
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json",
  };
}

function isAllowedOrigin(origin: string | null, allowed: string[]): boolean {
  if (!allowed.length) return true; // no restriction configured
  return !!origin && allowed.includes(origin);
}

function buildPrompt(body: any): string {
  const { input, results, lang } = body;
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
- Engine halted: ${results?.halt ? "yes" : "no"} ${results?.haltReason ? `(${results.haltReason})` : ""}
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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === "OPTIONS") {
      const origin = request.headers.get("Origin");
      const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map(s => s.trim()).filter(Boolean);
      return new Response(null, { headers: corsHeaders(origin, allowed) });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const origin = request.headers.get("Origin");
    const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map(s => s.trim()).filter(Boolean);
    if (!isAllowedOrigin(origin, allowed)) {
      return new Response("Origin not allowed", { status: 403, headers: corsHeaders(origin, allowed) });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
        status: 400,
        headers: corsHeaders(origin, allowed),
      });
    }

    // Validate minimal shape
    if (!body?.input || !body?.results || !body?.lang) {
      return new Response(JSON.stringify({ ok: false, error: "Missing input/results/lang" }), {
        status: 400,
        headers: corsHeaders(origin, allowed),
      });
    }

    const prompt = buildPrompt(body);

    let nimRes: Response;
    try {
      nimRes = await fetch(NIM_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          max_tokens: 512,
        }),
      });
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "NVIDIA NIM unreachable" }), {
        status: 502,
        headers: corsHeaders(origin, allowed),
      });
    }

    const nimJson = await nimRes.json();
    const content = nimJson.choices?.[0]?.message?.content ?? "";

    if (!content) {
      return new Response(JSON.stringify({ ok: false, error: "Empty response from NVIDIA NIM" }), {
        status: 502,
        headers: corsHeaders(origin, allowed),
      });
    }

    return new Response(JSON.stringify({ ok: true, ...splitExplanation(content) }), {
      headers: corsHeaders(origin, allowed),
    });
  },
};
