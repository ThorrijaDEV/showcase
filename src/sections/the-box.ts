/**
 * Section 3.7 — The Box Laboratory
 *
 * Interactive deterministic model of The Box: an arc-incidence multi-digraph
 * substrate with 6 rewriting rules (GATHER, BOND, TAG_PROP, QUIET, DESCEND,
 * FUSE), 4 engine policies, possibility space, identity/lineage derivation,
 * and structural observables. All computations are deterministic: same seed
 * => same trajectory.
 */

import { TheBoxModel, type BoxInput } from "@models/the-box";
import { foundryRuleSet, State, Engine } from "@models/the-box";

export function renderTheBox(container: HTMLElement): void {
  const model = new TheBoxModel();

  container.innerHTML = `
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Configuración del sustrato</div>
              <div class="card-subtitle">Arc-incidence multi-digraph · 6 reglas · motor determinista</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Nodos iniciales</label>
            <input type="number" id="box-nnodes" value="20" min="1" max="200" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Arcos iniciales</label>
            <input type="number" id="box-narcs" value="40" min="0" max="400" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Dimensión</label>
            <input type="number" id="box-dim" value="4" min="1" max="8" style="width:60px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Semilla</label>
            <input type="number" id="box-seed" value="11" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Pasos</label>
            <input type="number" id="box-steps" value="100" min="1" max="2000" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Política</label>
            <select id="box-policy" style="width:120px; font-family:var(--mono); font-size:12px;">
              <option value="uniform">Uniform</option>
              <option value="canonical">Canonical</option>
              <option value="weighted">Weighted</option>
              <option value="roundrobin">RoundRobin</option>
            </select>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Max nodos</label>
            <input type="number" id="box-maxnodes" value="160" min="1" max="1000" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Max arcos</label>
            <input type="number" id="box-maxarcs" value="700" min="1" max="5000" style="width:80px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Spread de etiquetas</label>
            <input type="number" id="box-tagspread" value="1" min="1" max="10" style="width:60px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <button id="box-run" class="btn primary">Ejecutar modelo</button>
            <button id="box-reset" class="btn secondary">Resetear</button>
          </div>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Controles de paso a paso</div>
              <div class="card-subtitle">Ejecución un paso a la vez con visualización del evento</div>
            </div>
          </div>
          <div class="controls mt-8">
            <button id="box-step1" class="btn secondary">Paso 1</button>
            <button id="box-step10" class="btn secondary">Paso 10</button>
            <button id="box-runall" class="btn primary">Ejecutar todo</button>
            <button id="box-pause" class="btn secondary" disabled>Pausar</button>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Evento actual</div>
            <div id="box-current-event" style="font-family:var(--mono); font-size:11px; background:#121216; border:1px solid #2a2a3a; padding:8px; border-radius:4px; color:var(--text);">
              <div style="color:var(--text-muted);">Ningún evento aún</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Hash del grafo (proveniencia)</div>
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
              <div class="card-title">Visualización del sustrato</div>
              <div class="card-subtitle">Nodos = puntos (color por etiqueta) · Arcos = líneas (color por etiqueta de arco) · Retirados = desvanecidos</div>
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
                <div class="card-title">Observables (nombrados)</div>
                <div class="card-subtitle">Medi­das estructurales del sustrato en cada paso</div>
              </div>
            </div>
            <div id="box-observables" style="font-family:var(--mono); font-size:10px; color:var(--text-muted); max-height:200px; overflow-y:auto; line-height:1.6;">
              <div style="color:var(--text-muted);">Esperando ejecución...</div>
            </div>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Identidad y linaje</div>
                <div class="card-subtitle">Profundidad, clases de fusión, fracción de fusiones</div>
              </div>
            </div>
            <div id="box-identity" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); line-height:1.8;">
              <div style="color:var(--text-muted);">Esperando ejecución...</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title">Reglas del foundry (datas, no código)</div>
          <div class="card-subtitle">Seis reescrituras locales del sustrato, cada una con predicado, selectores y efectos</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); line-height:1.8; padding:8px;">
        <div><span style="color:#06b6d4;">GATHER</span>: Dos partidarios del mismo hub se conectan directamente. (tag=1, w=0.6)</div>
        <div><span style="color:#10b981;">BOND</span>: Ancla y vecino de salida que comparten 2 veci­nos de entrada se enlazan. (tag=2, w=0.4)</div>
        <div><span style="color:#f59e0b;">TAG_PROP</span>: La ancla copia la etiqueta de un vecino de salida.</div>
        <div><span style="color:#ef4444;">QUIET</span>: Nodo sin flujo de entrada durante 30 pasos se marca como QUIET (tag=5).</div>
        <div><span style="color:#a855f7;">DESCEND</span>: Nodo QUIET con espacio genera hijo con su etiqueta y payload con jitter. (tag=3, w=0.9)</div>
        <div><span style="color:#8b5cf6;">FUSE</span>: Dos hermanos con etiqueta igual y payload cercano se identifican. El gemelo se retira; el testigo EQUIV perdura. (tag=4)</div>
      </div>
    </div>
  `;

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

  // ------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------
  let currentInput: BoxInput | null = null;
  let currentState: State | null = null;
  let currentRuleset = foundryRuleSet();
  let currentEngine: Engine | null = null;
  let currentStep = 0;
  let animationId: number | null = null;
  let isRunning = false;

  // Tag colors
  const TAG_COLORS: Record<number, string> = {
    0: "#666666",
    1: "#06b6d4", // PULL
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

    // Layout: simple force-directed-ish circular layout by id
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

    // Draw arcs first (behind nodes)
    for (const a of arcs) {
      if (!state.isNode(a.src) || !state.isNode(a.dst)) continue;
      const p1 = nodePositions.get(a.src);
      const p2 = nodePositions.get(a.dst);
      if (!p1 || !p2) continue;

      const isRetiredSrc = state.isRetired(a.src);
      const isRetiredDst = state.isRetired(a.dst);
      const faded = isRetiredSrc || isRetiredDst;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = faded ? "#2a2a3a" : TAG_COLORS[a.tag] ?? "#666666";
      ctx.globalAlpha = faded ? 0.2 : 0.5;
      ctx.lineWidth = faded ? 0.5 : Math.min(2, Math.max(0.5, a.w * 2));
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }

    // Draw nodes
    for (const n of nodes) {
      const p = nodePositions.get(n.id)!;
      const isRetired = state.isRetired(n.id);

      ctx.beginPath();
      ctx.arc(p.x, p.y, isRetired ? 2 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = isRetired ? "#1a1a1e" : TAG_COLORS[n.tag] ?? "#666666";
      ctx.globalAlpha = isRetired ? 0.3 : 0.9;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Node id label for small graphs
      if (nodes.length <= 30) {
        ctx.fillStyle = "#666666";
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.fillText(String(n.id), p.x, p.y + 6);
      }
    }

    // Legend
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
      return `<div style="display:flex; justify-content:space-between; padding:1px 0;">
        <span style="color:var(--text-muted);">${label}:</span>
        <span style="color:var(--text);">${typeof v === "number" ? v.toFixed(4) : v}</span>
      </div>`;
    }).join("");
    observablesEl.innerHTML = rows;
  }

  function renderIdentity(summary: any): void {
    identityEl.innerHTML = `
      <div><span style="color:var(--text-muted);">Profundidad máxima:</span> <span style="color:var(--text);">${summary.maxDepth}</span></div>
      <div><span style="color:var(--text-muted);">Profundidad media:</span> <span style="color:var(--text);">${summary.meanDepth.toFixed(2)}</span></div>
      <div><span style="color:var(--text-muted);">Clases de fusión:</span> <span style="color:var(--text);">${summary.nFusionClasses}</span></div>
      <div><span style="color:var(--text-muted);">Nodos fusionados:</span> <span style="color:var(--text);">${summary.fusedNodes}</span></div>
      <div><span style="color:var(--text-muted);">Fracción fusionada:</span> <span style="color:var(--text);">${(summary.fusedFraction * 100).toFixed(1)}%</span></div>
      <div><span style="color:var(--text-muted);">Arcos EQUIV:</span> <span style="color:var(--text);">${summary.equivArcs}</span></div>
      <div><span style="color:var(--text-muted);">IDs retirados:</span> <span style="color:var(--text);">${summary.retiredIds}</span></div>
    `;
  }

  function renderEvent(ev: { ruleId: string; anchor: number; edits: any[]; siteKey: string } | null): void {
    if (!ev) {
      currentEventEl.innerHTML = "<div style='color:var(--text-muted);'>Ningún evento aún</div>";
      return;
    }
    const ruleColors: Record<string, string> = {
      GATHER: "#06b6d4",
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

  function fullRender(input: BoxInput): void {
    try {
      const out = model.run(input);
      currentInput = input;
      currentState = out.final as any;
      const stages = out.stages;
      const lastStage = stages[stages.length - 1];
      currentStep = stages.length - 1;

      // Rebuild the stepping engine from the same deterministic inputs so
      // single-step controls (Paso 1 / Paso 10 / Ejecutar todo) continue
      // from the exact state the full run produced.
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

      currentEventEl.innerHTML = `<div style="color:var(--text-muted);">${stages.length - 1} pasos ejecutados · Última regla: ${lastStage.ruleId ?? "—"}</div>`;

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
      currentEventEl.innerHTML = `<div style="color:var(--text);">Paso ${currentStep}: ${ev.ruleId}</div>` + currentEventEl.innerHTML;
    } else {
      pauseBtn.disabled = true;
      runAllBtn.disabled = false;
      currentEventEl.innerHTML = `<div style="color:var(--text-muted);">Motor detenido: ${currentEngine.halt?.reason ?? "desconocido"}</div>` + currentEventEl.innerHTML;
    }
  }

  // ------------------------------------------------------------------
  // Event listeners
  // ------------------------------------------------------------------
  runBtn.addEventListener("click", () => {
    if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    isRunning = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = "Pausar";
    runAllBtn.disabled = false;
    fullRender(getInput());
  });

  resetBtn.addEventListener("click", () => {
    if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    isRunning = false;
    pauseBtn.disabled = true;
    runAllBtn.disabled = false;
    currentState = null;
    currentEngine = null;
    currentStep = 0;
    canvasEl.getContext("2d")!.clearRect(0, 0, canvasEl.width, canvasEl.height);
    currentEventEl.innerHTML = "<div style='color:var(--text-muted);'>Resetado</div>";
    graphHashEl.textContent = "—";
    observablesEl.innerHTML = "<div style='color:var(--text-muted);'>Esperando ejecución...</div>";
    identityEl.innerHTML = "<div style='color:var(--text-muted);'>Esperando ejecución...</div>";
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
    currentEventEl.innerHTML = `<div style="color:var(--text);">Ejecutados 10 pasos (total ${currentStep})</div>` + currentEventEl.innerHTML;
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
        currentEventEl.innerHTML = `<div style="color:var(--text-muted);">Motor detenido: ${currentEngine!.halt?.reason ?? "desconocido"}</div>` + currentEventEl.innerHTML;
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
