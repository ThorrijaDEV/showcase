/**
 * Section 3.2 — Wi-Fi Time Machine Laboratory
 *
 * Interactive deterministic model of Wi-Fi scanning, channel mapping,
 * timeline heatmap, and export. Accepts synthetic iw dump / nmcli text.
 */

import { WifiTimeMachineModel, type WifiModelInput } from "@models/wifi-time-machine";

export function renderWifiTimeMachine(container: HTMLElement): void {
  const model = new WifiTimeMachineModel();

  const DEFAULT_IW = `BSS 11:22:33:44:55:66(Onboard)
	freq: 2412
	signal: -45
	SSID: Home-Network
	DS Parameter set: channel 1
	RSN:
		Authentication suites: 00-0f-ac:2
BSS aa:bb:cc:dd:ee:ff(Onboard)
	freq: 5180
	signal: -60
	SSID: Office-5G
	DS Parameter set: channel 36
	WPA:
		Authentication suites: 00-0f-ac:8
BSS 00:11:22:33:44:55(Onboard)
	freq: 5925
	signal: -70
	SSID: Six-G
`;

  container.innerHTML = `
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Entrada de escaneo</div>
              <div class="card-subtitle">Fixture sintética de iw dump o nmcli</div>
            </div>
          </div>
          <textarea id="wtm-iw-input" rows="14" style="width:100%; font-family:var(--mono); font-size:11px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); color:var(--text); padding:12px; resize:vertical;">${DEFAULT_IW}</textarea>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">Backend</label>
            <select id="wtm-backend" style="margin-left:8px;">
              <option value="iw">iw</option>
              <option value="nmcli">nmcli</option>
            </select>
            <label style="margin-left:24px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Sanitizar BSSIDs</label>
            <input type="checkbox" id="wtm-sanitize" style="margin-left:6px;">
          </div>
          <button id="wtm-run" class="btn primary">Ejecutar modelo</button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Etapas intermedias</div>
              <div class="card-subtitle">Cada etapa del cálculo, no solo el resultado final</div>
            </div>
          </div>
          <div id="wtm-stages" style="font-family:var(--mono); font-size:12px; color:var(--text-muted);">
            <div class="stage-row"><span class="stage-chip">Esperando ejecución...</span></div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Mapa de calor de tiempo (timeline)</div>
              <div class="card-subtitle">Filas: redes · Columnas: buckets de tiempo · Glifo: señal media · Blanco: no observado</div>
            </div>
          </div>
          <div class="canvas-container" style="height:320px;">
            <canvas id="wtm-timeline-canvas"></canvas>
          </div>
          <div id="wtm-timeline-footer" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); margin-top:8px;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Actividad por canal</div>
                <div class="card-subtitle">Conteo de observaciones y señal media por canal 802.11</div>
              </div>
            </div>
            <pre id="wtm-channels" style="font-size:11px;">—</pre>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Sparkline de señal</div>
                <div class="card-subtitle">Señal a lo largo del tiempo para la red más fuerte</div>
              </div>
            </div>
            <div id="wtm-sparkline" style="font-family:var(--mono); font-size:16px; color:var(--fg-cyan); height:40px; display:flex; align-items:center; gap:2px;"></div>
            <div id="wtm-sparkline-stats" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); margin-top:4px;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title">Exportación</div>
          <div class="card-subtitle">JSON / CSV con opción de desinfección SHA-256</div>
        </div>
      </div>
      <div class="controls mt-8">
        <button id="wtm-export-json" class="btn secondary">Exportar JSON</button>
        <button id="wtm-export-csv" class="btn secondary">Exportar CSV</button>
      </div>
      <pre id="wtm-export-output" style="font-size:11px; max-height:200px; overflow:auto;">—</pre>
    </div>
  `;

  // ------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------
  const iwInput = container.querySelector("#wtm-iw-input") as HTMLTextAreaElement;
  const backendSel = container.querySelector("#wtm-backend") as HTMLSelectElement;
  const sanitizeCb = container.querySelector("#wtm-sanitize") as HTMLInputElement;
  const runBtn = container.querySelector("#wtm-run") as HTMLButtonElement;
  const stagesEl = container.querySelector("#wtm-stages")! as HTMLElement;
  const timelineCanvas = container.querySelector("#wtm-timeline-canvas") as HTMLCanvasElement;
  const timelineFooter = container.querySelector("#wtm-timeline-footer")! as HTMLElement;
  const channelsPre = container.querySelector("#wtm-channels")! as HTMLPreElement;
  const sparklineDiv = container.querySelector("#wtm-sparkline")! as HTMLDivElement;
  const sparklineStats = container.querySelector("#wtm-sparkline-stats")! as HTMLElement;
  const exportJsonBtn = container.querySelector("#wtm-export-json") as HTMLButtonElement;
  const exportCsvBtn = container.querySelector("#wtm-export-csv") as HTMLButtonElement;
  const exportOutput = container.querySelector("#wtm-export-output")! as HTMLPreElement;

  // ------------------------------------------------------------------
  // Rendering helpers
  // ------------------------------------------------------------------

  function renderStages(stages: { name: string; description: string; data: unknown }[]): void {
    const html = stages.map((s) => {
      let dataStr = "";
      if (Array.isArray(s.data)) {
        dataStr = `(${s.data.length} items)`;
      } else if (s.data && typeof s.data === "object") {
        dataStr = JSON.stringify(s.data).slice(0, 120);
      } else {
        dataStr = String(s.data ?? "");
      }
      return `
        <div class="stage-row">
          <span class="stage-chip">${s.name}</span>
          <span class="stage-value">${s.description} ${dataStr ? "· " + dataStr : ""}</span>
        </div>
      `;
    }).join("");
    stagesEl.innerHTML = html;
  }

  function renderTimeline(tl: { bucketSeconds: number; startEpoch: number; nCols: number; rows: { label: string; cells: { glyph: string; observed: boolean; avgSignal: number | null }[] }[]; footer: string } | null, canvas: HTMLCanvasElement): void {
    if (!tl) {
      canvas.width = canvas.clientWidth || 400;
      canvas.height = canvas.clientHeight || 200;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#4a4a55";
      ctx.font = "12px monospace";
      ctx.fillText("(no data)", 20, 30);
      timelineFooter.textContent = "";
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#050507";
    ctx.fillRect(0, 0, displayW, displayH);

    const nRows = tl.rows.length;
    const nCols = tl.nCols;
    const padLeft = 150;
    const padTop = 24;
    const padRight = 20;
    const padBottom = 24;
    const cellW = (displayW - padLeft - padRight) / nCols;
    const cellH = (displayH - padTop - padBottom) / Math.max(nRows, 1);

    // Draw cells
    for (let r = 0; r < nRows; r++) {
      const row = tl.rows[r];
      for (let c = 0; c < nCols; c++) {
        const cell = row.cells[c];
        const x = padLeft + c * cellW;
        const y = padTop + r * cellH;
        if (cell.observed && cell.avgSignal !== null) {
          const sig = cell.avgSignal;
          const color = sig >= -50 ? "#10b981" : sig >= -60 ? "#3b82f6" : sig >= -70 ? "#a855f7" : sig >= -80 ? "#f59e0b" : "#ef4444";
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.7;
        } else {
          ctx.fillStyle = "#0a0a0c";
          ctx.globalAlpha = 1.0;
        }
        ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
        ctx.globalAlpha = 1.0;
      }
    }

    // Draw row labels
    ctx.fillStyle = "#8a8a92";
    ctx.font = "11px monospace";
    ctx.textAlign = "right";
    for (let r = 0; r < nRows; r++) {
      const row = tl.rows[r];
      const label = row.label.length > 28 ? row.label.slice(0, 25) + "..." : row.label;
      ctx.fillText(label, padLeft - 8, padTop + r * cellH + cellH / 2 + 4);
    }

    // Draw column header (time axis)
    ctx.fillStyle = "#8a8a92";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    for (let c = 0; c < nCols; c++) {
      if (c % 5 === 0 || c === nCols - 1) {
        const t = tl.startEpoch + c * tl.bucketSeconds;
        const h = new Date(t * 1000).toISOString().substr(11, 5);
        const x = padLeft + (c + 0.5) * cellW;
        ctx.fillText(h, x, padTop - 6);
      }
    }

    timelineFooter.textContent = tl.footer;
  }

  function renderChannels(stats: { channel: number; count: number; avgSignal: number | null }[]): void {
    if (!stats || stats.length === 0) {
      channelsPre.textContent = "(no data)";
      return;
    }
    const lines = stats.map((s) => {
      const bar = "█".repeat(Math.max(1, Math.round((s.count / 10) * 20)));
      return `ch ${String(s.channel).padStart(2)}  ${bar}  ${s.count} obs · avg ${s.avgSignal ?? "-"} dBm`;
    });
    channelsPre.textContent = lines.join("\n");
  }

  function renderSparkline(sl: { rendered: string; min: number; max: number; values: number[] } | null, label: string): void {
    if (!sl) {
      sparklineDiv.textContent = "(no data)";
      sparklineStats.textContent = "";
      return;
    }
    sparklineDiv.textContent = sl.rendered;
    sparklineStats.textContent = `${label}: min ${sl.min} dBm · max ${sl.max} dBm · ${sl.values.length} samples`;
  }

  // ------------------------------------------------------------------
  // Run model
  // ------------------------------------------------------------------

  const run = () => {
    const iwDump = iwInput.value.trim();
    const backend = backendSel.value;
    const sanitize = sanitizeCb.checked;

    const input: WifiModelInput = {
      [backend === "iw" ? "iwDump" : "nmcliText"]: iwDump,
      observedAt: Math.floor(Date.now() / 1000),
      backend,
      sanitize,
      width: 100,
      labelWidth: 22,
    };

    try {
      const out = model.run(input);

      // Stages
      renderStages(out.stages);

      // Timeline
      const tc = timelineCanvas;
      tc.width = tc.clientWidth * (window.devicePixelRatio || 1);
      tc.height = tc.clientHeight * (window.devicePixelRatio || 1);
      renderTimeline(out.final.timeline, timelineCanvas);
      if (out.final.timeline) timelineFooter.textContent = out.final.timeline.footer;

      // Channels
      renderChannels(out.final.channelStats);

      // Sparkline
      if (out.final.sparkline) {
        const netObs = out.final.observations.filter(o => o.bssid === out.final.networks[0]?.bssid && o.signal !== null)
          .sort((a, b) => a.observedAt - b.observedAt).map(o => o.signal!);
        renderSparkline(out.final.sparkline, out.final.networks[0]?.ssid ?? out.final.networks[0]?.bssid ?? "unknown");
      } else {
        renderSparkline(null, "");
      }

      // Export
      exportJsonBtn.onclick = () => {
        exportOutput.textContent = out.final.exportJson;
      };
      exportCsvBtn.onclick = () => {
        exportOutput.textContent = out.final.exportCsv;
      };

    } catch (e) {
      stagesEl.innerHTML = `<div style="color:var(--fg-red);">Error: ${(e as Error).message}</div>`;
    }
  };

  runBtn.addEventListener("click", run);

  // Auto-resize canvas on window resize
  window.addEventListener("resize", () => {
    if (outState.lastOutput) renderTimeline(outState.lastOutput.final.timeline, timelineCanvas);
  });

  let outState = { lastOutput: null as any };
  run();
}
