/**
 * NVIDIA NIM integration — TypeScript interfaces for the plain-language
 * explanation card on The Box section.
 *
 * Security note: the NVIDIA API key lives ONLY in the proxy backend
 * (Cloudflare Worker / Vercel Edge / Express), never in this frontend.
 * The frontend only knows the public proxy URL (VITE_NIM_PROXY_URL).
 */

export interface NimRequestInput {
  nNodes: number;
  nArcs: number;
  dim: number;
  seed: number;
  steps: number;
  policy: string;
  tagSpread: number;
  maxNodes: number;
  maxArcs: number;
}

export interface NimRequestIdentity {
  maxDepth: number;
  meanDepth: number;
  nFusionClasses: number;
  fusedNodes: number;
  fusedFraction: number;
  equivArcs: number;
  retiredIds: number;
}

export interface NimRequestResults {
  graphHash: string;
  nNodes: number;
  nArcs: number;
  step: number;
  haltReason: string | null;
  observables: Record<string, number>;
  identity: NimRequestIdentity;
  rulesUsed: Record<string, number>;
  complexity: string;
}

export interface NimRequest {
  input: NimRequestInput;
  results: NimRequestResults;
  lang: "en" | "es";
}

export interface NimExplanation {
  ok: boolean;
  notConfigured?: boolean;
  explanation?: string;
  realWorldExample?: string;
  error?: string;
}

export type AiStatus = "idle" | "loading" | "success" | "error" | "not-configured";

export interface AiState {
  status: AiStatus;
  data: { explanation: string; realWorldExample: string } | null;
  error: string | null;
}
