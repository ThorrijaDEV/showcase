/**
 * Section 3.3 — BLE Radar Laboratory
 *
 * Interactive deterministic model of BLE device lifecycle, RSSI bands,
 * hash→angle mapping, radar frame geometry, and replay. Accepts synthetic
 * observation input or deterministic demo mode.
 */

import { BleRadarModel, type BleModelInput } from "@models/ble-radar";

export function renderBleRadar(container: HTMLElement): void {
  const model = new BleRadarModel();

  container.innerHTML = `
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Configuración de entrada</div>
              <div class="card-subtitle">Observaciones BLE o modo demo determinista</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Modo demo (segundos sintéticos)</label>
            <input type="number" id="ble-demo-seconds" value="30" min="1" max="300" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Seed</label>
            <input type="number" id="ble-demo-seed" value="7" style="width:70px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">Clock (epoch s)</label>
            <input type="number" id="ble-clock" value="1000000000" style="width:120px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Sweep ángel (°)</label>
            <input type="number" id="ble-sweep" value="0" min="0" max="359" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Sanitizar direcciones</label>
            <input type="checkbox" id="ble-sanitize" style="margin-left:6px;">
          </div>
          <button id="ble-run" class="btn primary">Ejecutar modelo</button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Estado del dispositivo (ciclo de vida)</div>
              <div class="card-subtitle">Estado, RSSI, ·ltimos vistos, trails de histórico</div>
            </div>
          </div>
          <div id="ble-devices" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); max-height:200px; overflow-y:auto;">
            <div style="color:var(--text-muted);">Esperando ejecución...</div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Radar (geometría determinista)</div>
              <div class="card-subtitle">Anillos = fuerza RSSI (NO distancia) · Ángulo = hash de dirección (convención visual)</div>
            </div>
          </div>
          <div class="canvas-container" style="height:360px; display:flex; align-items:center; justify-content:center;">
            <canvas id="ble-radar-canvas" width="400" height="300"></canvas>
          </div>
          <div id="ble-radar-legend" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); margin-top:8px; line-height:1.6;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Resumen de ciclo de vida</div>
                <div class="card-subtitle">Conteo de dispositivos por estado</div>
              </div>
            </div>
            <div id="ble-lifecycle" style="font-family:var(--mono); font-size:13px; line-height:2;"></div>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Reproducción de sesión</div>
                <div class="card-subtitle">Cursor de tiempo sobre observaciones grabadas</div>
              </div>
            </div>
            <div id="ble-replay" style="font-family:var(--mono); font-size:12px; color:var(--text-muted); height:80px; display:flex; align-items:center; justify-content:center;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title">Exportación</div>
          <div class="card-subtitle">JSON / CSV con desinfección de direcciones SHA-256</div>
        </div>
      </div>
      <div class="controls mt-8">
        <button id="ble-export-json" class="btn secondary">Exportar JSON</button>
        <button id="ble-export-csv" class="btn secondary">Exportar CSV</button>
      </div>
      <pre id="ble-export-output" style="font-size:11px; max-height:180px; overflow:auto;">—</pre>
    </div>
  `;

  // ------------------------------------------------------------------
  // Elements
  // ------------------------------------------------------------------
  const demoSeconds = container.querySelector("#ble-demo-seconds") as HTMLInputElement;
  const demoSeed = container.querySelector("#ble-demo-seed") as HTMLInputElement;
  const clockInput = container.querySelector("#ble-clock") as HTMLInputElement;
  const sweepInput = container.querySelector("#ble-sweep") as HTMLInputElement;
  const sanitizeCb = container.querySelector("#ble-sanitize") as HTMLInputElement;
  const runBtn = container.querySelector("#ble-run") as HTMLButtonElement;
  const devicesEl = container.querySelector("#ble-devices")! as HTMLElement;
  const radarCanvas = container.querySelector("#ble-radar-canvas") as HTMLCanvasElement;
  const radarLegend = container.querySelector("#ble-radar-legend")! as HTMLElement;
  const lifecycleEl = container.querySelector("#ble-lifecycle")! as HTMLElement;
  const replayEl = container.querySelector("#ble-replay")! as HTMLElement;
  const exportJsonBtn = container.querySelector("#ble-export-json") as HTMLButtonElement;
  const exportCsvBtn = container.querySelector("#ble-export-csv") as HTMLButtonElement;
  const exportOutput = container.querySelector("#ble-export-output")! as HTMLPreElement;

  // ------------------------------------------------------------------
  // Radar canvas rendering
  // ------------------------------------------------------------------

  function renderRadarFrame(frame: {
    cells: { row: number; col: number; char: string; kind: string; device: string | null }[];
    width: number; height: number; centerX: number; centerY: number; maxRadius: number; sweepAngle: number;
    legend: string[];
  }): void {
    const dpr = window.devicePixelRatio || 1;
    const displayW = radarCanvas.clientWidth || 400;
    const displayH = radarCanvas.clientHeight || 300;
    radarCanvas.width = displayW * dpr;
    radarCanvas.height = displayH * dpr;
    const ctx = radarCanvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    const { cells, centerX, centerY, maxRadius } = frame;

    // Scale frame geometry to canvas
    const scaleX = displayW / frame.width;
    const scaleY = displayH / frame.height;
    const cx = centerX * scaleX;
    const cy = centerY * scaleY;

    for (const cell of cells) {
      const x = cell.col * scaleX;
      const y = cell.row * scaleY;

      let color = "#4a4a55";
      let alpha = 0.5;
      switch (cell.kind) {
        case "cross": color = "#666666"; alpha = 0.8; break;
        case "ring": color = "#2a2a3a"; alpha = 0.6; break;
        case "sweep": color = "#06b6d4"; alpha = 0.8; break;
        case "trail": color = "#5b21b6"; alpha = 0.4; break;
        case "marker": color = "#10b981"; alpha = 0.9; break;
      }

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.max(1, scaleX), Math.max(1, scaleY));
      ctx.globalAlpha = 1.0;
    }

    // Draw center crosshair highlight
    ctx.strokeStyle = "#666666";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy);
    ctx.lineTo(cx + 10, cy);
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx, cy + 10);
    ctx.stroke();

    radarLegend.innerHTML = frame.legend.map(l => `<div style="margin:2px 0;">${l}</div>`).join("");
  }

  // ------------------------------------------------------------------
  // Run model
  // ------------------------------------------------------------------

  function run() {
    const now = parseInt(clockInput.value, 10) || 1000000000;
    const sweepAngle = parseFloat(sweepInput.value) || 0;
    const sanitize = sanitizeCb.checked;
    const demoSecs = parseInt(demoSeconds.value, 10) || 0;
    const demoS = parseInt(demoSeed.value, 10) || 7;

    const input: BleModelInput = {
      observations: [],
      now,
      sweepAngle,
      sanitize,
      width: 60,
      height: 24,
    };

    if (demoSecs > 0) {
      input.demoSeconds = demoSecs;
      input.demoSeed = demoS;
    }

    try {
      const out = model.run(input);

      // Devices table
      const devHtml = out.final.devices.map(d => {
        const stateColor = d.state === "active" ? "#10b981" : d.state === "fading" ? "#f59e0b" : d.state === "disappeared" ? "#ef4444" : "#a855f7";
        const band = d.rawRssi !== null ? `RSSI ${d.rawRssi} dBm` : "—";
        return `
          <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #1a1a1e;">
            <span style="color:var(--text);">${d.name || d.address}</span>
            <span style="color:${stateColor}; font-weight:bold;">${d.state}</span>
            <span style="color:var(--text-muted);">${band}</span>
            <span style="color:var(--text-muted);">${d.timesSeen} obs</span>
          </div>
        `;
      }).join("");
      devicesEl.innerHTML = devHtml || "<div style='color:var(--text-muted);'>Sin dispositivos</div>";

      // Radar frame
      renderRadarFrame(out.final.frame);

      // Lifecycle summary
      const ls = out.final.lifecycleSummary;
      lifecycleEl.innerHTML = `
        <div><span style="color:#a855f7;">▪ appeared:</span> <span style="color:var(--text);">${ls.appeared}</span></div>
        <div><span style="color:#10b981;">▪ active:</span> <span style="color:var(--text);">${ls.active}</span></div>
        <div><span style="color:#f59e0b;">▪ fading:</span> <span style="color:var(--text);">${ls.fading}</span></div>
        <div><span style="color:#ef4444;">▪ disappeared:</span> <span style="color:var(--text);">${ls.disappeared}</span></div>
      `;

      // Replay
      if (out.final.replay) {
        const r = out.final.replay;
        replayEl.innerHTML = `
          <div style="text-align:center;">
            <div style="color:var(--text); font-size:13px;">${r.progress.toFixed(0)}% — t=${Math.round(r.replayT)} / ${r.endT}</div>
            <div style="color:var(--text-muted); font-size:11px;">${r.done ? "sesión completada" : "en reproducción"}</div>
          </div>
        `;
      } else {
        replayEl.innerHTML = "<div style='color:var(--text-muted);'>Sin datos de reproducción</div>";
      }

      // Export
      exportJsonBtn.onclick = () => { exportOutput.textContent = out.final.exportJson; };
      exportCsvBtn.onclick = () => { exportOutput.textContent = out.final.exportCsv; };

    } catch (e) {
      devicesEl.innerHTML = `<div style="color:var(--fg-red);">Error: ${(e as Error).message}</div>`;
    }
  }

  runBtn.addEventListener("click", run);
  window.addEventListener("resize", () => renderRadarFrame(model.run({
    observations: [],
    now: parseInt(clockInput.value) || 1000000000,
    sweepAngle: parseFloat(sweepInput.value) || 0,
    sanitize: sanitizeCb.checked,
    width: 60,
    height: 24,
    demoSeconds: parseInt(demoSeconds.value) || 0,
    demoSeed: parseInt(demoSeed.value) || 7,
  }).final.frame));

  run();
}
