/**
 * Local explainer wrapper — generates plain-language explanations of The Box
 * results without any external API, proxy, or API key.
 *
 * Works immediately with zero configuration: no CORS issues, no network
 * calls, no secrets. Analyzes the deterministic model output and produces
 * a human-readable explanation plus a real-world analogy in the active
 * language (EN/ES).
 *
 * This replaces the previous NVIDIA NIM integration because browsers block
 * direct calls to NVIDIA NIM (CORS policy), and public CORS proxies don't
 * forward the Authorization header. No backend setup is required.
 */

import { explainLocally } from "./local-explainer";
import type { NimRequest, NimExplanation } from "./nim-types";

export async function fetchNimExplanation(
  _payload: NimRequest,
  lang: "en" | "es",
): Promise<NimExplanation> {
  // Reconstruct a minimal BoxOutput-like shape from the payload for the
  // local explainer. The explainer only needs final + identity + observables
  // + rulesUsed + complexity, which we already have in the payload.
  const { input, results, lang: _lang } = _payload;

  const fakeFinal = {
    graphHash: results.graphHash,
    nNodes: results.nNodes,
    nArcs: results.nArcs,
    step: results.step,
    halt: results.haltReason ? { step: results.step, reason: results.haltReason } : null,
  };

  const fakeOutput: any = {
    final: {
      ...fakeFinal,
      observables: results.observables,
      identity: results.identity,
    },
    rulesUsed: results.rulesUsed,
    complexity: results.complexity,
  };

  return explainLocally(fakeOutput, lang);
}
