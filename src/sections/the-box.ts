/**
 * Section 3.7 — The Box Laboratory
 *
 * Interactive deterministic model of The Box: an arc-incidence multi-digraph
 * substrate with 6 rewriting rules (GATHER, BOND, TAG_PROP, QUIET, DESCEND,
 * FUSE), 4 engine policies, possibility space, identity/lineage derivation,
 * and structural observables. All computations are deterministic: same seed
 * => same trajectory.
 */

import { TheBoxModel, type BoxInput, type BoxOutput } from "@models/the-box";
import { foundryRuleSet, State, Engine } from "@models/the-box";
import { interpret, buildExport, exportJson, type Level } from "./the-box-levels";
import { getLang, applyTranslations } from "../i18n";
import { dict } from "../i18n/dict";
import { BOX_INPUT_DESCS, BOX_OBSERVABLE_DESCS, BOX_IDENTITY_DESCS, BOX_RULE_DESCS, BOX_POLICY_DESCS, BOX_WHAT_IS_IT, type Lang } from "../field-descriptions";
import { fetchNimExplanation } from "../ai/nim-client";
import type { NimRequestInput, NimRequestResults, NimExplanation, AiStatus, AiState } from "../ai/nim-types";

function t(key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[getLang()];
}

function desc(d: Record<string, { en: string; es: string }>, key: string): string {
  const entry = d[key];
  if (!entry) return "";
  const lang = getLang() as Lang;
  return entry[lang];
}

export function renderTheBox(container: HTMLElement): void {
  const model = new TheBoxModel();

  container.innerHTML = `
    <div class="card mt-8" style="border-left:3px solid var(--accent); background:#0c0c12;">
      <div class="card-header">
        <div>
          <div class="card-title" style="font-size:15px; color:var(--fg-cyan);">What is The Box?</div>
          <div class="card-subtitle" style="font-size:11px; color:var(--text-muted); margin-top:4px;">¿Qué es The Box?</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--text); line-height:1.7; padding:10px 12px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius);">
        <div id="box-what-is-it" style="white-space:pre-wrap;"></div>
      </div>
    </div>

    <div class="card mt-8" style="border-left:3px solid var(--accent); background:#0c0c12;">
      <div class="card-header">
        <div>
          <div class="card-title" style="font-size:15px; color:var(--fg-cyan);">A real research example</div>
          <div class="card-subtitle" style="font-size:11px; color:var(--text-muted); margin-top:4px;">Un ejemplo de investigación real</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--text); line-height:1.7; padding:10px 12px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); white-space:pre-wrap;">
        <div id="box-real-example" style="white-space:pre-wrap;"></div>
      </div>
    </div>

    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="box_substrate_title"></div>
              <div class="card-subtitle" data-i18n="box_substrate_sub"></div>
            </div>
          </div>
          <div class="controls mt-8">
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_nnodes"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "nNodes")}</div>
            <input type="number" id="box-nnodes" value="20" min="1" max="200" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_narcs"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "nArcs")}</div>
            <input type="number" id="box-narcs" value="40" min="0" max="400" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_dim"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "dim")}</div>
            <input type="number" id="box-dim" value="4" min="1" max="8" style="width:60px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_seed"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "seed")}</div>
            <input type="number" id="box-seed" value="11" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_steps"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "steps")}</div>
            <input type="number" id="box-steps" value="100" min="1" max="2000" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_policy"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_POLICY_DESCS, (document.querySelector("#box-policy") as HTMLSelectElement)?.value || "uniform")}</div>
            <select id="box-policy" style="width:120px; font-family:var(--mono); font-size:12px;">
              <option value="uniform">Uniform</option>
              <option value="canonical">Canonical</option>
              <option value="weighted">Weighted</option>
              <option value="roundrobin">RoundRobin</option>
            </select>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_maxnodes"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "maxNodes")}</div>
            <input type="number" id="box-maxnodes" value="160" min="1" max="1000" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_maxarcs"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "maxArcs")}</div>
            <input type="number" id="box-maxarcs" value="700" min="1" max="5000" style="width:80px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="box_label_tagspread"></label>
            <div style="font-size:9px; color:var(--text-muted); margin-bottom:6px; font-family:var(--mono);">${desc(BOX_INPUT_DESCS, "tagSpread")}</div>
            <input type="number" id="box-tagspread" value="1" min="1" max="10" style="width:60px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <button id="box-run" class="btn primary" data-i18n="box_run"></button>
            <button id="box-reset" class="btn secondary" data-i18n="box_reset"></button>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;" data-i18n="box_level_select"></label>
            <div class="level-segment" role="radiogroup" aria-label="Presentation level">
              <button id="box-level-simple" class="level-btn active" data-level="simple" aria-pressed="true" data-i18n="box_level_simple"></button>
              <button id="box-level-technical" class="level-btn" data-level="technical" aria-pressed="false" data-i18n="box_level_technical"></button>
              <button id="box-level-raw" class="level-btn" data-level="raw" aria-pressed="false" data-i18n="box_level_raw"></button>
            </div>
          </div>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="box_steps_title"></div>
              <div class="card-subtitle" data-i18n="box_steps_sub"></div>
            </div>
          </div>
          <div class="controls mt-8">
            <button id="box-step1" class="btn secondary" data-i18n="box_step1"></button>
            <button id="box-step10" class="btn secondary" data-i18n="box_step10"></button>
            <button id="box-runall" class="btn primary" data-i18n="box_runall"></button>
            <button id="box-pause" class="btn secondary" disabled aria-disabled="true" data-i18n="box_pause"></button>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="box_event_title"></label>
            <div id="box-current-event" style="font-family:var(--mono); font-size:11px; background:#121216; border:1px solid #2a2a3a; padding:8px; border-radius:4px; color:var(--text);">
              <div style="color:var(--text-muted);" data-i18n="box_no_event"></div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="box_hash_title"></label>
            <div id="box-graph-hash" style="font-family:var(--mono); font-size:10px; background:#0c0c10; border:1px solid #2a2a3a; padding:8px; border-radius:4px; color:#06b6d4; word-break:break-all;">
              —
            </div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="box_viz_title"></div>
              <div class="card-subtitle" data-i18n="box_viz_sub"></div>
            </div>
          </div>
          <div class="canvas-container" style="height:300px; display:flex; align-items:center; justify-content:center; background:#0c0c10; border:1px solid #2a2a3a; border-radius:4px;">
            <canvas id="box-canvas" width="400" height="300"></canvas>
          </div>
          <div id="box-canvas-legend" style="font-family:var(--mono); font-size:10px; color:var(--text-muted); margin-top:6px; line-height:1.4;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title" data-i18n="box_observables_title"></div>
                <div class="card-subtitle" data-i18n="box_observables_sub"></div>
              </div>
            </div>
            <div id="box-observables" style="font-family:var(--mono); font-size:10px; color:var(--text-muted); max-height:200px; overflow-y:auto; line-height:1.6;">
              <div style="color:var(--text-muted);" data-i18n="wtm_waiting"></div>
            </div>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title" data-i18n="box_identity_title"></div>
                <div class="card-subtitle" data-i18n="box_identity_sub"></div>
              </div>
            </div>
            <div id="box-identity" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); line-height:1.8;">
              <div style="color:var(--text-muted);" data-i18n="wtm_waiting"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16" id="box-ai-card" style="border-left:3px solid var(--accent); background:#0c0c12; display:none;">
      <div class="card-header">
        <div>
          <div class="card-title" data-i18n="box_ai_title"></div>
          <div class="card-subtitle" data-i18n="box_ai_sub"></div>
        </div>
      </div>
      <div id="box-ai-content" style="font-family:var(--mono); font-size:11px; color:var(--text); line-height:1.7; padding:10px 12px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); white-space:pre-wrap;"></div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title" data-i18n="box_rules_title"></div>
          <div class="card-subtitle" data-i18n="box_rules_sub"></div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); line-height:1.8; padding:8px;">
        <div data-i18n="box_gather"></div>
        <div data-i18n="box_bond"></div>
        <div data-i18n="box_tagprop"></div>
        <div data-i18n="box_quiet"></div>
        <div data-i18n="box_descend"></div>
        <div data-i18n="box_fuse"></div>
      </div>
    </div>

    <div class="card mt-16" style="border-left:3px solid var(--accent);">
      <div class="card-header">
        <div>
          <div class="card-title" data-i18n="box_research_title"></div>
          <div class="card-subtitle" data-i18n="box_research_section_sub"></div>
        </div>
      </div>
      <div style="font-family:var(--mono); color:var(--text); line-height:1.6;">
        <div style="margin-bottom:12px;">
          <div style="font-size:11px; font-weight:600; color:var(--fg-amber); margin-bottom:4px;">${t("box_research_demo_note")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_identity_title")}</div>
          <div style="font-size:11px; color:var(--text-muted);">${t("box_research_identity_body")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_problem_title")}</div>
          <div style="font-size:11px; color:var(--text-muted);">${t("box_research_problem_body")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_components_title")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:6px;"><strong>${t("box_research_component_substrate").split(" — ")[0]}:</strong> ${t("box_research_component_substrate")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_component_rules").split(" — ")[0]}:</strong> ${t("box_research_component_rules")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_component_metrics").split(" — ")[0]}:</strong> ${t("box_research_component_metrics")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_component_observables").split(" — ")[0]}:</strong> ${t("box_research_component_observables")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_component_identity").split(" — ")[0]}:</strong> ${t("box_research_component_identity")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_examples_title")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_example_descend_fuse").split(" — ")[0]}:</strong> ${t("box_research_example_descend_fuse")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_example_lineage_cycles").split(" — ")[0]}:</strong> ${t("box_research_example_lineage_cycles")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_example_invariants").split(" — ")[0]}:</strong> ${t("box_research_example_invariants")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>${t("box_research_example_rule_interactions").split(" — ")[0]}:</strong> ${t("box_research_example_rule_interactions")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_demo_title")}</div>
          <div style="font-size:11px; color:var(--text-muted);">${t("box_research_demo_body")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_maturity_title")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;"><strong>Implemented:</strong> ${t("box_research_maturity_implemented")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>Verified:</strong> ${t("box_research_maturity_verified")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>Preliminary:</strong> ${t("box_research_maturity_preliminary")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>Possible:</strong> ${t("box_research_maturity_possible")}</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:6px;"><strong>Aspirational:</strong> ${t("box_research_maturity_aspirational")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_integrity_title")}</div>
          <div style="font-size:11px; color:var(--text-muted);">${t("box_research_integrity_body")}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:13px; font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${t("box_research_vision_title")}</div>
          <div style="font-size:11px; color:var(--text-muted);">${t("box_research_vision_body")}</div>
        </div>
      </div>
    </div>

    <div class="card mt-16" style="border-left:3px solid var(--accent);">
      <div class="card-header">
        <div>
          <div class="card-title" data-i18n="box_level_view_title"></div>
          <div class="card-subtitle" data-i18n="box_level_view_sub"></div>
        </div>
      </div>
      <div id="box-level-view" style="font-family:var(--mono); color:var(--text); line-height:1.6; min-height:260px;">
        <div style="color:var(--text-muted);" data-i18n="wtm_waiting"></div>
      </div>
      <div class="controls mt-8" style="display:flex; gap:8px; flex-wrap:wrap;">
        <button id="box-export-simple" class="btn secondary" data-i18n="box_simple_export"></button>
        <button id="box-export-technical" class="btn secondary" data-i18n="box_tech_export"></button>
        <button id="box-export-raw" class="btn secondary" data-i18n="box_raw_export"></button>
      </div>
    </div>

    <section class="page-doc" id="understanding-box">
      <h2 data-i18n="doc_box_title"></h2>
      <h3 data-i18n="doc_box_a_title"></h3>
      <p data-i18n="doc_box_a_body"></p>
      <h3 data-i18n="doc_box_b_title"></h3>
      <p data-i18n="doc_box_b_body"></p>
      <h3 data-i18n="doc_box_c_title"></h3>
      <p data-i18n="doc_box_c_body"></p>
      <h3 data-i18n="doc_box_d_title"></h3>
      <p data-i18n="doc_box_d_body"></p>
      <h3 data-i18n="doc_box_e_title"></h3>
      <p data-i18n="doc_box_e_body"></p>
    </section>
  `;

  applyTranslations();

  // What is The Box explanation
  const whatIsItEl = container.querySelector("#box-what-is-it")! as HTMLElement;
  whatIsItEl.textContent = BOX_WHAT_IS_IT[getLang() as Lang];

  const realExampleEl = container.querySelector("#box-real-example")! as HTMLElement;
  realExampleEl.innerHTML = `<div style="font-weight:600; color:var(--fg-cyan); margin-bottom:6px;">${t("box_real_title")}</div><div style="white-space:pre-wrap;">${t("box_real_body")}</div>`;

  document.addEventListener("showcase:lang", () => {
    whatIsItEl.textContent = BOX_WHAT_IS_IT[getLang() as Lang];
    realExampleEl.innerHTML = `<div style="font-weight:600; color:var(--fg-cyan); margin-bottom:6px;">${t("box_real_title")}</div><div style="white-space:pre-wrap;">${t("box_real_body")}</div>`;
  });

  // ------------------------------------------------------------------
  // Elements
  // ------------------------------------------------------------------
  const nnodesEl = container.querySelector("#box-nnodes") as HTMLInputElement;
  const narcsEl = container.querySelector("#box-narcs") as HTMLInputElement;
  const dimEl = container.querySelector("#box-dim") as HTMLInputElement;
  const seedEl = container.querySelector("#box-seed") as HTMLInputElement;
  const stepsEl = container.querySelector("#box-steps") as HTMLInputElement;
  const policyEl = container.querySelector("#box-policy") as HTMLSelectElement;
  const maxNodesEl = container.querySelector("#box-maxnodes") as HTMLInputElement;
  const maxArcsEl = container.querySelector("#box-maxarcs") as HTMLInputElement;
  const tagSpreadEl = container.querySelector("#box-tagspread") as HTMLInputElement;
  const runBtn = container.querySelector("#box-run") as HTMLButtonElement;
  const resetBtn = container.querySelector("#box-reset") as HTMLButtonElement;
  const step1Btn = container.querySelector("#box-step1") as HTMLButtonElement;
  const step10Btn = container.querySelector("#box-step10") as HTMLButtonElement;
  const runAllBtn = container.querySelector("#box-runall") as HTMLButtonElement;
  const pauseBtn = container.querySelector("#box-pause") as HTMLButtonElement;
  const currentEventEl = container.querySelector("#box-current-event")! as HTMLElement;
  const graphHashEl = container.querySelector("#box-graph-hash")! as HTMLElement;
  const canvasEl = container.querySelector("#box-canvas") as HTMLCanvasElement;
  const canvasLegendEl = container.querySelector("#box-canvas-legend")! as HTMLElement;
  const observablesEl = container.querySelector("#box-observables")! as HTMLElement;
  const identityEl = container.querySelector("#box-identity")! as HTMLElement;
  const levelViewEl = container.querySelector("#box-level-view")! as HTMLElement;
  const levelSimpleBtn = container.querySelector("#box-level-simple") as HTMLButtonElement;
  const levelTechnicalBtn = container.querySelector("#box-level-technical") as HTMLButtonElement;
  const levelRawBtn = container.querySelector("#box-level-raw") as HTMLButtonElement;
  const exportSimpleBtn = container.querySelector("#box-export-simple") as HTMLButtonElement;
  const exportTechnicalBtn = container.querySelector("#box-export-technical") as HTMLButtonElement;
  const exportRawBtn = container.querySelector("#box-export-raw") as HTMLButtonElement;

  // ------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------
  let currentInput: BoxInput | null = null;
  let currentState: State | null = null;
  let currentOutput: BoxOutput | null = null;
  let currentEngine: Engine | null = null;
  let currentLevel: Level = "simple";
  let currentStep = 0;
  let animationId: number | null = null;
  let isRunning = false;
  let aiState: AiState = { status: "idle", data: null, error: null };

  // Tag colors
  const TAG_COLORS: Record<number, string> = {
    0: "#666666",
    1: "#06b6c4", // PULL
    2: "#10b981", // BOND
    3: "#f59e0b", // DESCEND
    4: "#8b5cf6", // EQUIV
    5: "#ef4444", // QUIET
  };

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  function getInput(): BoxInput {
    return {
      nNodes: parseInt(nnodesEl.value, 10) || 20,
      nArcs: parseInt(narcsEl.value, 10) || 40,
      dim: parseInt(dimEl.value, 10) || 4,
      seed: parseInt(seedEl.value, 10) || 11,
      steps: parseInt(stepsEl.value, 10) || 100,
      policy: (policyEl.value as BoxInput["policy"]) || "uniform",
      tagSpread: parseInt(tagSpreadEl.value, 10) || 1,
      maxNodes: parseInt(maxNodesEl.value, 10) || 160,
      maxArcs: parseInt(maxArcsEl.value, 10) || 700,
      recordEvery: 1,
    };
  }

  function renderCanvas(state: State): void {
    const dpr = window.devicePixelRatio || 1;
    const displayW = canvasEl.clientWidth || 400;
    const displayH = canvasEl.clientHeight || 300;
    canvasEl.width = displayW * dpr;
    canvasEl.height = displayH * dpr;
    const ctx = canvasEl.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    const nodes = [...state.nodes.values()];
    const arcs = [...state.arcs.values()];

    const cx = displayW / 2;
    const cy = displayH / 2;
    const radius = Math.min(displayW, displayH) / 2 * 0.75;

    const nodePositions = new Map<number, { x: number; y: number }>();
    const nCount = Math.max(nodes.length, 1);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const angle = (i / nCount) * 2 * Math.PI;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      nodePositions.set(n.id, { x, y });
    }

    for (const a of arcs) {
      if (!state.isNode(a.src) || !state.isNode(a.dst)) continue;
      const p1 = nodePositions.get(a.src);
      const p2 = nodePositions.get(a.dst);
      if (!p1 || !p2) continue;

      const faded = state.isRetired(a.src) || state.isRetired(a.dst);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = faded ? "#2a2a3a" : TAG_COLORS[a.tag] ?? "#666666";
      ctx.globalAlpha = faded ? 0.2 : 0.5;
      ctx.lineWidth = faded ? 0.5 : Math.min(2, Math.max(0.5, a.w * 2));
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }

    for (const n of nodes) {
      const p = nodePositions.get(n.id)!;
      const isRetired = state.isRetired(n.id);

      ctx.beginPath();
      ctx.arc(p.x, p.y, isRetired ? 2 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = isRetired ? "#1a1a1e" : TAG_COLORS[n.tag] ?? "#666666";
      ctx.globalAlpha = isRetired ? 0.3 : 0.9;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      if (nodes.length <= 30) {
        ctx.fillStyle = "#666666";
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(String(n.id), p.x, p.y + 6);
      }
    }

    const tagCounts = new Map<number, number>();
    for (const n of nodes) {
      tagCounts.set(n.tag, (tagCounts.get(n.tag) ?? 0) + 1);
    }
    const legendParts: string[] = [];
    for (const [tag, count] of tagCounts.entries()) {
      const color = TAG_COLORS[tag] ?? "#666666";
      const name = tag === 0 ? "default" : tag === 1 ? "PULL" : tag === 2 ? "BOND" : tag === 3 ? "DESCEND" : tag === 4 ? "EQUIV" : tag === 5 ? "QUIET" : `t${tag}`;
      legendParts.push(`<span style="color:${color};">▪ ${name}: ${count}</span>`);
    }
    const retiredCount = state.retired.size;
    if (retiredCount > 0) {
      legendParts.push(`<span style="color:#1a1a1e;">▪ retirados: ${retiredCount}</span>`);
    }
    canvasLegendEl.innerHTML = legendParts.join("   ");
  }

  function renderObservables(obs: Record<string, number>): void {
    const rows = Object.entries(obs).map(([k, v]) => {
      const label = k.replace(/_/g, " ");
      const d = desc(BOX_OBSERVABLE_DESCS, k);
      return `<div style="padding:2px 0; border-bottom:1px solid #1a1a1e; margin-bottom:2px;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${label}:</span>
          <span style="color:var(--text);">${typeof v === "number" ? v.toFixed(4) : v}</span>
        </div>
        ${d ? `<div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${d}</div>` : ""}
      </div>`;
    }).join("");
    observablesEl.innerHTML = rows;
  }

  function renderIdentity(summary: any): void {
    identityEl.innerHTML = `
      <div style="padding:2px 0;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${t("box_identity_max_depth")}:</span>
          <span style="color:var(--text);">${summary.maxDepth}</span>
        </div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${desc(BOX_IDENTITY_DESCS, "maxDepth")}</div>
      </div>
      <div style="padding:2px 0;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${t("box_identity_mean_depth")}:</span>
          <span style="color:var(--text);">${summary.meanDepth.toFixed(2)}</span>
        </div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${desc(BOX_IDENTITY_DESCS, "meanDepth")}</div>
      </div>
      <div style="padding:2px 0;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${t("box_identity_fusion_classes")}:</span>
          <span style="color:var(--text);">${summary.nFusionClasses}</span>
        </div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${desc(BOX_IDENTITY_DESCS, "nFusionClasses")}</div>
      </div>
      <div style="padding:2px 0;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${t("box_identity_fused_nodes")}:</span>
          <span style="color:var(--text);">${summary.fusedNodes}</span>
        </div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${desc(BOX_IDENTITY_DESCS, "fusedNodes")}</div>
      </div>
      <div style="padding:2px 0;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${t("box_identity_fused_fraction")}:</span>
          <span style="color:var(--text);">${(summary.fusedFraction * 100).toFixed(1)}%</span>
        </div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${desc(BOX_IDENTITY_DESCS, "fusedFraction")}</div>
      </div>
      <div style="padding:2px 0;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${t("box_identity_equiv_arcs")}:</span>
          <span style="color:var(--text);">${summary.equivArcs}</span>
        </div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${desc(BOX_IDENTITY_DESCS, "equivArcs")}</div>
      </div>
      <div style="padding:2px 0;">
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">${t("box_identity_retired_ids")}:</span>
          <span style="color:var(--text);">${summary.retiredIds}</span>
        </div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:1px;">${desc(BOX_IDENTITY_DESCS, "retiredIds")}</div>
      </div>
    `;
  }

  function setLevel(level: Level): void {
    currentLevel = level;
    [levelSimpleBtn, levelTechnicalBtn, levelRawBtn].forEach((b) => {
      const active = b.dataset.level === level;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    renderLevelView();
  }

  function renderLevelView(): void {
    if (!currentOutput) {
      levelViewEl.innerHTML = `<div style="color:var(--text-muted);">${t("wtm_waiting")}</div>`;
      return;
    }
    const { simple, technical, raw } = interpret(currentOutput);
    const view: any = currentLevel === "simple" ? simple : currentLevel === "technical" ? technical : raw;

    let html = "";
    if (currentLevel === "simple") {
      const s = view as any;
      html = `
        <h3 style="font-size:15px; margin:0 0 10px 0; color:var(--fg-cyan); text-transform:uppercase; letter-spacing:0.05em;">${s.title}</h3>
        <p style="font-size:11px; color:var(--text-muted); margin-bottom:14px;">${s.subtitle}</p>
        ${s.sections.map((sec: any) => `
          <div style="margin-bottom:12px;">
            <div style="font-size:12.5px; font-weight:600; color:var(--text); margin-bottom:4px;">${sec.heading}</div>
            <div style="font-size:12px; color:var(--text-muted);">${sec.body}</div>
          </div>
        `).join("")}
        <div style="margin-top:14px; border-top:1px solid var(--panel-border); padding-top:10px;">
          <div style="font-size:11px; font-weight:600; color:var(--text-muted); margin-bottom:6px;">${t("box_tech_metrics")}</div>
          ${s.keyNumbers.map((kn: any) => `
            <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text); margin-bottom:2px;">
              <span style="color:var(--text-muted);">${kn.label}:</span> <span>${kn.value}</span>
            </div>
          `).join("")}
        </div>
      `;
    } else if (currentLevel === "technical") {
      const tech = view as any;
      html = `
        <h3 style="font-size:15px; margin:0 0 10px 0; color:var(--fg-cyan); text-transform:uppercase; letter-spacing:0.05em;">${tech.title}</h3>
        <p style="font-size:11px; color:var(--text-muted); margin-bottom:14px;">${tech.processingSummary}</p>
        <div style="font-size:11px; font-weight:600; color:var(--text-muted); margin-bottom:6px;">${t("box_tech_metrics")}</div>
        <table style="font-size:11px; width:100%; border-collapse:collapse; margin-bottom:12px;">
          ${tech.keyMetrics.map((m: any) => `
            <tr style="border-bottom:1px solid var(--panel-border);">
              <td style="padding:4px 0; color:var(--text-muted);">${m.name}</td>
              <td style="padding:4px 0; color:var(--text); text-align:right;">${typeof m.value === "number" ? m.value.toFixed(4) : m.value}</td>
            </tr>
          `).join("")}
        </table>
        <div style="font-size:11px; font-weight:600; color:var(--text-muted); margin-bottom:6px;">${t("box_tech_rules_applied")}</div>
        <div style="font-size:11px; color:var(--text-muted); margin-bottom:10px;">
          ${tech.rulesApplied.map((r: any) => `<span style="display:inline-block; margin:2px 6px 2px 0; padding:2px 6px; background:#1a1a1e; border:1px solid var(--panel-border); border-radius:var(--radius);">${r.rule}: ${r.count}</span>`).join("")}
        </div>
        <div style="font-size:11px; font-weight:600; color:var(--text-muted); margin-bottom:6px;">${t("box_tech_operations")}</div>
        <div style="font-size:11px; color:var(--text-muted); margin-bottom:10px;">
          ${tech.operations.map((o: any) => `<span style="display:inline-block; margin:2px 6px 2px 0; padding:2px 6px; background:#1a1a1e; border:1px solid var(--panel-border); border-radius:var(--radius);">${o.op}: ${o.count}</span>`).join("")}
        </div>
        <div style="font-size:11px; color:var(--text-muted); margin-bottom:10px; line-height:1.5;">
          <strong style="color:var(--text);">${t("box_tech_fusions")}:</strong> ${tech.fusions.count} class${tech.fusions.count !== 1 ? "es" : ""}, ${tech.fusions.nodes} node${tech.fusions.nodes !== 1 ? "s" : ""} fused (${tech.fusions.fraction}). ${tech.halt ? `Engine halted at step ${tech.halt.step}: ${tech.halt.reason}.` : "Engine completed all steps."}
        </div>
      `;
    } else {
      html = `
        <h3 style="font-size:15px; margin:0 0 10px 0; color:var(--fg-cyan); text-transform:uppercase; letter-spacing:0.05em;">${raw.title}</h3>
        <pre style="font-size:10px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:12px; overflow:auto; color:var(--text-muted); max-height:420px;">${JSON.stringify(raw, null, 2)}</pre>
      `;
    }
    levelViewEl.innerHTML = html;
  }

  function renderEvent(ev: { ruleId: string; anchor: number; edits: any[]; siteKey: string } | null): void {
    if (!ev) {
      currentEventEl.innerHTML = `<div style='color:var(--text-muted);'>${t("box_no_event_yet")}</div>`;
      return;
    }
    const ruleColors: Record<string, string> = {
      GATHER: "#06b6c4",
      BOND: "#10b981",
      TAG_PROP: "#f59e0b",
      QUIET: "#ef4444",
      DESCEND: "#a855f7",
      FUSE: "#8b5cf6",
    };
    const color = ruleColors[ev.ruleId] ?? "#666666";
    const editsHtml = ev.edits.map((e: any) => `<div style="margin-left:12px; color:var(--text-muted); font-size:10px;">• ${e.op} ${JSON.stringify(e.args).slice(0, 80)}</div>`).join("");
    currentEventEl.innerHTML = `
      <div style="color:${color}; font-weight:bold;">${ev.ruleId} @ ${ev.anchor}</div>
      <div style="color:var(--text-muted); font-size:10px;">${ev.siteKey}</div>
      ${editsHtml}
    `;
  }

  function renderGraphHash(state: State): void {
    graphHashEl.textContent = state.graphHash();
  }

  // ------------------------------------------------------------------
  // AI explanation (NVIDIA NIM via proxy)
  // ------------------------------------------------------------------

  function requestAiExplanation(output: BoxOutput, lang: "en" | "es"): void {
    const input = currentInput;
    if (!input) return;

    const payload: any = {
      input: {
        nNodes: input.nNodes,
        nArcs: input.nArcs,
        dim: input.dim,
        seed: input.seed,
        steps: input.steps,
        policy: input.policy,
        tagSpread: input.tagSpread,
        maxNodes: input.maxNodes,
        maxArcs: input.maxArcs,
      },
      results: {
        graphHash: output.final.graphHash,
        nNodes: output.final.nNodes,
        nArcs: output.final.nArcs,
        step: output.final.step,
        haltReason: output.final.halt?.reason ?? null,
        observables: output.final.observables,
        identity: output.final.identity,
        rulesUsed: output.rulesUsed,
        complexity: output.complexity,
      },
      lang,
    };

    aiState = { status: "loading", data: null, error: null };
    renderAiCard();

    fetchNimExplanation(payload, lang).then((res: any) => {
      if (res.notConfigured) {
        aiState = { status: "not-configured", data: null, error: null };
      } else if (res.ok && res.explanation && res.realWorldExample) {
        aiState = {
          status: "success",
          data: { explanation: res.explanation, realWorldExample: res.realWorldExample },
          error: null,
        };
      } else {
        aiState = {
          status: "error",
          data: null,
          error: res.error ?? "Unknown error",
        };
      }
      renderAiCard();
    }).catch(() => {
      aiState = { status: "error", data: null, error: "Network error" };
      renderAiCard();
    });
  }

  function renderAiCard(): void {
    const card = container.querySelector("#box-ai-card") as HTMLElement;
    const content = container.querySelector("#box-ai-content") as HTMLElement;

    if (aiState.status === "idle") {
      card.style.display = "none";
      return;
    }

    card.style.display = "block";

    const loading = t("box_ai_loading");
    const error = t("box_ai_error");
    const retry = t("box_ai_retry");
    const notConfigured = t("box_ai_not_configured");
    const explanationLabel = t("box_ai_explanation_label");
    const exampleLabel = t("box_ai_example_label");

    let html = "";
    if (aiState.status === "loading") {
      html = `<div style="color:var(--text-muted);">${loading}</div>`;
    } else if (aiState.status === "not-configured") {
      html = `<div style="color:var(--text-muted);">${notConfigured}</div>`;
    } else if (aiState.status === "error") {
      html = `
        <div style="color:var(--fg-red);">${error}: ${aiState.error ?? ""}</div>
        <div style="margin-top:6px;"><button id="box-ai-retry" style="font-family:var(--mono); font-size:11px; background:transparent; border:1px solid var(--panel-border); color:var(--text); cursor:pointer; padding:2px 8px; border-radius:var(--radius);">${retry}</button></div>
      `;
    } else if (aiState.status === "success" && aiState.data) {
      html = `
        <div style="font-weight:600; color:var(--fg-cyan); margin-bottom:4px;">${explanationLabel}</div>
        <div style="color:var(--text); margin-bottom:10px; line-height:1.6;">${aiState.data.explanation}</div>
        <div style="font-weight:600; color:var(--fg-amber); margin-bottom:4px;">${exampleLabel}</div>
        <div style="color:var(--text); line-height:1.6;">${aiState.data.realWorldExample}</div>
      `;
    }
    content.innerHTML = html;

    // Wire retry button
    const retryBtn = container.querySelector("#box-ai-retry") as HTMLButtonElement | null;
    if (retryBtn && aiState.status === "error" && currentInput && currentOutput) {
      retryBtn.onclick = () => requestAiExplanation(currentOutput!, getLang());
    }
  }

  function fullRender(input: BoxInput): void {
    try {
      const out = model.run(input);
      currentInput = input;
      currentState = out.final as any;
      const stages = out.stages;
      const lastStage = stages[stages.length - 1];
      currentStep = stages.length - 1;

      const ruleset = foundryRuleSet();
      const state = State.random(input.nNodes, input.nArcs, input.dim, input.seed,
        input.tagSpread, { maxNodes: input.maxNodes, maxArcs: input.maxArcs });
      const eng = new Engine(state, ruleset, input.seed, input.policy, true, 1);
      eng.run(input.steps);
      currentEngine = eng;
      currentState = eng.state;

      if (!currentState) throw new Error("Box state not initialized");
      renderCanvas(currentState);
      renderGraphHash(currentState);
      renderObservables(lastStage.observables);
      renderIdentity(out.final.identity);
      renderEvent(null);

      currentEventEl.innerHTML = `<div style="color:var(--text-muted);">${t("box_run_all_label")} · ${t("box_last_rule")}: ${lastStage.ruleId ?? "—"}</div>`;
      currentOutput = out;
      renderLevelView();
      requestAiExplanation(currentOutput!, getLang());

    } catch (e) {
      observablesEl.innerHTML = `<div style="color:var(--fg-red);">Error: ${(e as Error).message}</div>`;
    }
  }

  function stepRender(): void {
    if (!currentInput || !currentEngine || !currentState) return;
    const ev = currentEngine.step();
    if (ev) {
      currentStep++;
      renderCanvas(currentEngine.state);
      renderGraphHash(currentEngine.state);
      renderObservables({});
      renderEvent(ev);
      currentEventEl.innerHTML = `<div style="color:var(--text);">${t("box_step_word")} ${currentStep}: ${ev.ruleId}</div>` + currentEventEl.innerHTML;
    } else {
      pauseBtn.disabled = true;
      runAllBtn.disabled = false;
      currentEventEl.innerHTML = `<div style="color:var(--text-muted);">${t("box_halted_word")}: ${currentEngine.halt?.reason ?? t("unknown")}</div>` + currentEventEl.innerHTML;
    }
  }

  // ------------------------------------------------------------------
  // Event listeners
  // ------------------------------------------------------------------
  runBtn.addEventListener("click", () => {
    if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    isRunning = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = t("btn_pause");
    runAllBtn.disabled = false;
    fullRender(getInput());
  });

  resetBtn.addEventListener("click", () => {
    if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    isRunning = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = t("btn_pause");
    runAllBtn.disabled = false;
    currentState = null;
    currentEngine = null;
    currentStep = 0;
    canvasEl.getContext("2d")!.clearRect(0, 0, canvasEl.width, canvasEl.height);
    currentEventEl.innerHTML = `<div style='color:var(--text-muted);'>${t("btn_reset_done")}</div>`;
    graphHashEl.textContent = "—";
    observablesEl.innerHTML = `<div style='color:var(--text-muted);'>${t("wtm_waiting")}</div>`;
    identityEl.innerHTML = `<div style='color:var(--text-muted);'>${t("wtm_waiting")}</div>`;
    currentOutput = null;
    renderLevelView();
    aiState = { status: "idle", data: null, error: null };
    const aiCard = container.querySelector("#box-ai-card") as HTMLElement;
    if (aiCard) aiCard.style.display = "none";
  });

  levelSimpleBtn.addEventListener("click", () => setLevel("simple"));
  levelTechnicalBtn.addEventListener("click", () => setLevel("technical"));
  levelRawBtn.addEventListener("click", () => setLevel("raw"));

  exportSimpleBtn.addEventListener("click", () => {
    if (!currentOutput) return;
    const { simple } = interpret(currentOutput);
    exportJson(buildExport(currentOutput, "simple", simple));
  });
  exportTechnicalBtn.addEventListener("click", () => {
    if (!currentOutput) return;
    const { technical } = interpret(currentOutput);
    exportJson(buildExport(currentOutput, "technical", technical));
  });
  exportRawBtn.addEventListener("click", () => {
    if (!currentOutput) return;
    const { raw } = interpret(currentOutput);
    exportJson(buildExport(currentOutput, "raw", raw));
  });

  document.addEventListener("showcase:lang", () => {
    renderLevelView();
    renderAiCard();
  });

  step1Btn.addEventListener("click", () => stepRender());

  step10Btn.addEventListener("click", () => {
    if (!currentEngine) return;
    for (let i = 0; i < 10; i++) {
      const ev = currentEngine.step();
      if (!ev) break;
      currentStep++;
    }
    renderCanvas(currentEngine.state);
    renderGraphHash(currentEngine.state);
    renderEvent(null);
    currentEventEl.innerHTML = `<div style="color:var(--text);">${t("box_run_all_label")} (total ${currentStep})</div>` + currentEventEl.innerHTML;
  });

  runAllBtn.addEventListener("click", () => {
    if (!currentInput || !currentEngine) return;
    isRunning = true;
    pauseBtn.disabled = false;
    runAllBtn.disabled = true;
    step1Btn.disabled = true;
    step10Btn.disabled = true;

    function tick() {
      if (!isRunning) return;
      const ev = currentEngine!.step();
      if (ev) {
        currentStep++;
        renderCanvas(currentEngine!.state);
        renderGraphHash(currentEngine!.state);
        renderEvent(ev);
        animationId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
        pauseBtn.disabled = true;
        runAllBtn.disabled = false;
        step1Btn.disabled = false;
        step10Btn.disabled = false;
        currentEventEl.innerHTML = `<div style="color:var(--text-muted);">${t("box_halted_word")}: ${currentEngine!.halt?.reason ?? t("unknown")}</div>` + currentEventEl.innerHTML;
      }
    }
    animationId = requestAnimationFrame(tick);
  });

  pauseBtn.addEventListener("click", () => {
    isRunning = false;
    pauseBtn.disabled = true;
    runAllBtn.disabled = false;
    step1Btn.disabled = false;
    step10Btn.disabled = false;
    if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
  });

  // ------------------------------------------------------------------
  // Initial render
  // ------------------------------------------------------------------
  fullRender(getInput());
}
