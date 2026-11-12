/**
 * NVIDIA NIM client — fetches a plain-language explanation of The Box results.
 *
 * The request is sent to a public proxy URL (VITE_NIM_PROXY_URL). The proxy
 * holds the NVIDIA API key in its own environment and forwards to
 * https://integrate.api.nvidia.com/v1/chat/completions.
 *
 * If no proxy URL is configured, the client returns { ok: false, notConfigured: true }
 * so the UI can show a friendly "not configured" message instead of breaking.
 */

import type { NimRequest, NimExplanation } from "./nim-types";

const PROXY_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_NIM_PROXY_URL;
const TIMEOUT_MS = 30_000;

export async function fetchNimExplanation(
  payload: NimRequest,
  lang: "en" | "es",
): Promise<NimExplanation> {
  if (!PROXY_URL) {
    return { ok: false, notConfigured: true };
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, lang }),
      signal: ctrl.signal,
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    const json = (await res.json()) as NimExplanation;
    return { ...json, ok: true };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, error: "timeout" };
    }
    return { ok: false, error: (e as Error).message };
  } finally {
    clearTimeout(timer);
  }
}
