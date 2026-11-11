/**
 * Section 3.3 — BLE Radar Laboratory
 *
 * Interactive deterministic model of BLE device lifecycle, RSSI bands,
 * hash→angle mapping, radar frame geometry, and replay. Accepts synthetic
 * observation input or deterministic demo mode.
 */

import { BleRadarModel, type BleModelInput } from "@models/ble-radar";
import { getLang } from "../i18n";
import { dict, type Lang } from "../i18n/dict";
import { BLE_DESCS } from "../field-descriptions";

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

export function renderBleRadar(container: HTMLElement): void {
  const model = new BleRadarModel();

  container.innerHTML = `
    <div class="card mt-8" style="border-left:3px solid var(--accent); background:#0c0c12;">
      <div class="card-header">
        <div>
          <div class="card-title" style="font-size:15px; color:var(--fg-cyan);">What is BLE Radar?</div>
          <div class="card-subtitle" style="font-size:11px; color:var(--text-muted); margin-top:4px;">¿Qué es BLE Radar?</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--text); line-height:1.7; padding:10px 12px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); white-space:pre-wrap;">
A deterministic model of the Bluetooth LE environment. It simulates device observations through a lifecycle state machine (appeared → active → fading → disappeared), applies RSSI EMA smoothing (alpha = 0.4), classifies signals into strength bands (strong / near / mid / far / weak — these are signal strength bands, NOT physical distance), computes a pseudo-angle from the MAC address hash (a visual convention only; BLE provides no real orientation), and supports session replay with a time cursor. Export JSON/CSV with SHA-256 address sanitization. Every number is computed from the model — no real Bluetooth hardware is accessed.

Un modelo determinista del entorno Bluetooth LE. Simula observaciones de dispositivos mediante una máquina de estado de ciclo de vida (aparecido → activo → desvaneciendo → desaparecido), aplica suavizado EMA de RSSI (alpha = 0.4), clasifica las señales en bandas de fuerza (strong / near / mid / far / weak — son bandas de fuerza de señal, NO distancia física), calcula un pseudo-ángulo a partir del hash de la dirección MAC (solo una convención visual; BLE no da orientación real), y soporta reproducción de sesión con cursor de tiempo. Exportación JSON/CSV con desinfección SHA-256 de direcciones. Cada número se calcula desde el modelo — no se accede a hardware Bluetooth real.
      </div>
    </div>

    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="ble_input_title"></div>
              <div class="card-subtitle" data-i18n="ble_input_sub"></div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;" data-i18n="ble_label_demo_secs"></label>
            <input type="number" id="ble-demo-seconds" value="30" min="1" max="300" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);" data-i18n="ble_label_seed"></label>
            <input type="number" id="ble-demo-seed" value="7" style="width:70px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted);" data-i18n="ble_label_clock"></label>
            <input type="number" id="ble-clock" value="1000000000" style="width:120px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);" data-i18n="ble_label_sweep"></label>
            <input type="number" id="ble-sweep" value="0" min="0" max="359" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);" data-i18n="ble_label_sanitize"></label>
            <input type="checkbox" id="ble-sanitize" style="margin-left:6px;">
          </div>
          <button id="ble-run" class="btn primary" data-i18n="ble_run"></button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="ble_device_title"></div>
              <div class="card-subtitle" data-i18n="ble_device_sub"></div>
            </div>
          </div>
          <div id="ble-devices" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); max-height:200px; overflow-y:auto;">
            <div style="color:var(--text-muted);" data-i18n="wtm_waiting"></div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="ble_radar_title"></div>
              <div class="card-subtitle" data-i18n="ble_radar_sub"></div>
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
                <div class="card-title" data-i18n="ble_lifecycle_title"></div>
                <div class="card-subtitle" data-i18n="ble_lifecycle_sub"></div>
              </div>
            </div>
            <div id="ble-lifecycle" style="font-family:var(--mono); font-size:13px; line-height:2;"></div>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title" data-i18n="ble_replay_title"></div>
                <div class="card-subtitle" data-i18n="ble_replay_sub"></div>
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
          <div class="card-title" data-i18n="ble_export_title"></div>
          <div class="card-subtitle" data-i18n="ble_export_sub"></div>
        </div>
      </div>
      <div class="controls mt-8">
        <button id="ble-export-json" class="btn secondary" data-i18n="ble_export_json"></button>
        <button id="ble-export-csv" class="btn secondary" data-i18n="ble_export_csv"></button>
      </div>
      <pre id="ble-export-output" style="font-size:11px; max-height:180px; overflow:auto;">—</pre>
    </div>

    <div class="card mt-16" style="border-left:3px solid var(--accent);">
      <div class="card-header">
        <div>
          <div class="card-title" style="font-size:13px; color:var(--fg-cyan);">Value meanings · Significado de los valores</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:10px; color:var(--text-muted); line-height:1.6; padding:8px 12px;">
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">RSSI</span> <span style="color:var(--text);">${desc(BLE_DESCS, "rssi")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Seen at</span> <span style="color:var(--text);">${desc(BLE_DESCS, "seenAt")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Times seen</span> <span style="color:var(--text);">${desc(BLE_DESCS, "timesSeen")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Appeared / Active / Fading / Disappeared</span> <span style="color:var(--text);">${desc(BLE_DESCS, "appeared")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Strength band</span> <span style="color:var(--text);">${desc(BLE_DESCS, "strengthBand")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Pseudo-angle</span> <span style="color:var(--text);">${desc(BLE_DESCS, "pseudoAngle")}</span></div>
      </div>
    </div>

    <section class="page-doc" id="understanding-ble">
      <h2 data-i18n="doc_ble_title"></h2>
      <h3 data-i18n="doc_ble_a_title"></h3>
      <p data-i18n="doc_ble_a_body"></p>
      <h3 data-i18n="doc_ble_b_title"></h3>
      <p data-i18n="doc_ble_b_body"></p>
      <h3 data-i18n="doc_ble_c_title"></h3>
      <p data-i18n="doc_ble_c_body"></p>
      <h3 data-i18n="doc_ble_d_title"></h3>
      <p data-i18n="doc_ble_d_body"></p>
      <h3 data-i18n="doc_ble_e_title"></h3>
      <p data-i18n="doc_ble_e_body"></p>
    </section>
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
  const exportOutput = container.querySelector("#ble-export-output")! as HTMLElement;

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
        const stateLabel = t(`ble_${d.state}`);
        return `
          <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #1a1a1e;">
            <span style="color:var(--text);">${d.name || d.address}</span>
            <span style="color:${stateColor}; font-weight:bold;">${stateLabel}</span>
            <span style="color:var(--text-muted);">${band}</span>
            <span style="color:var(--text-muted);">${d.timesSeen} ${t("ble_obs")}</span>
          </div>
        `;
      }).join("");
      devicesEl.innerHTML = devHtml || `<div style='color:var(--text-muted);' data-i18n="ble_no_devices"></div>`;

      // Radar frame
      renderRadarFrame(out.final.frame);

      // Lifecycle summary
      const ls = out.final.lifecycleSummary;
      lifecycleEl.innerHTML = `
        <div><span style="color:#a855f7;">▪ ${t("ble_appeared")}:</span> <span style="color:var(--text);">${ls.appeared}</span></div>
        <div><span style="color:#10b981;">▪ ${t("ble_active")}:</span> <span style="color:var(--text);">${ls.active}</span></div>
        <div><span style="color:#f59e0b;">▪ ${t("ble_fading")}:</span> <span style="color:var(--text);">${ls.fading}</span></div>
        <div><span style="color:#ef4444;">▪ ${t("ble_disappeared")}:</span> <span style="color:var(--text);">${ls.disappeared}</span></div>
      `;

      // Replay
      if (out.final.replay) {
        const r = out.final.replay;
        replayEl.innerHTML = `
          <div style="text-align:center;">
            <div style="color:var(--text); font-size:13px;">${r.progress.toFixed(0)}% — t=${Math.round(r.replayT)} / ${r.endT}</div>
            <div style="color:var(--text-muted); font-size:11px;">${r.done ? t("ble_completed") : t("ble_playing")}</div>
          </div>
        `;
      } else {
        replayEl.innerHTML = `<div style='color:var(--text-muted);' data-i18n="ble_replay_none"></div>`;
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
