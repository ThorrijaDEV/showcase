/**
 * Section 3.5 — Terminal Generative Engine Laboratory
 *
 * Interactive deterministic generative art model: flowfield, plasma,
 * attractor modes. Seed → parameters → pixels → fingerprint. O(1) frame
 * seeking. All values computed from the splitmix64 RNG.
 */

import { GenerativeEngineModel, type GenModelInput } from "@models/generative-engine";

export function renderGenerativeEngine(container: HTMLElement): void {
  const model = new GenerativeEngineModel();

  container.innerHTML = `
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Identidad del mundo</div>
              <div class="card-subtitle">Semilla · modo · par·metros · frame</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Semilla (entero compartible)</label>
            <input type="number" id="gen-seed" value="12345" style="width:100px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Modo</label>
            <select id="gen-mode" style="margin-left:8px; width:130px; font-family:var(--mono); font-size:12px;">
              <option value="flowfield">flowfield</option>
              <option value="plasma">plasma</option>
              <option value="attractor">attractor</option>
            </select>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Canvas (cols × rows)</label>
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="number" id="gen-width" value="100" min="20" max="200" style="width:70px; font-family:var(--mono); font-size:12px;">
              <span style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">×</span>
              <input type="number" id="gen-height" value="40" min="8" max="120" style="width:70px; font-family:var(--mono); font-size:12px;">
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Frame</label>
            <input type="number" id="gen-frame" value="0" min="0" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Paleta</label>
            <select id="gen-palette" style="margin-left:8px; width:100px; font-family:var(--mono); font-size:12px;">
              <option value="">(desde semilla)</option>
              <option value="neon">neon</option>
              <option value="ocean">ocean</option>
              <option value="ember">ember</option>
              <option value="forest">forest</option>
              <option value="sunset">sunset</option>
              <option value="ice">ice</option>
              <option value="toxic">toxic</option>
              <option value="mono">mono</option>
            </select>
          </div>
          <button id="gen-run" class="btn primary">Renderizar frame</button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Etapas del cálculo</div>
              <div class="card-subtitle">Semilla → par·metros → lienzo → render → huella</div>
            </div>
          </div>
          <div id="gen-stages" style="font-family:var(--mono); font-size:12px; color:var(--text-muted);">
            <div class="stage-row"><span class="stage-chip">Esperando ejecución...</span></div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Render (pixels deterministas)</div>
              <div class="card-subtitle">Cada píxel es una función pura de (semilla, modo, par·metros, frame)</div>
            </div>
          </div>
          <div class="canvas-container" style="height:420px; display:flex; align-items:center; justify-content:center; background:#050507;">
            <canvas id="gen-canvas"></canvas>
          </div>
          <div id="gen-fingerprint" style="font-family:var(--mono); font-size:11px; color:var(--fg-cyan); margin-top:8px; word-break:break-all;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Par·metros del modo</div>
                <div class="card-subtitle">Todos derivados de la semilla</div>
              </div>
            </div>
            <pre id="gen-params" style="font-size:11px;">—</pre>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Huella dactilar del mundo</div>
                <div class="card-subtitle">SHA-256 sobre modo + frame + par·metros + píxeles — identificador compartible</div>
              </div>
            </div>
            <div id="gen-fp-detail" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); background:#0a0a0c; padding:12px; border-radius:var(--radius); border:1px solid var(--panel-border);">—</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ------------------------------------------------------------------
  // Elements
  // ------------------------------------------------------------------
  const seedInput = container.querySelector("#gen-seed") as HTMLInputElement;
  const modeSel = container.querySelector("#gen-mode") as HTMLSelectElement;
  const widthInput = container.querySelector("#gen-width") as HTMLInputElement;
  const heightInput = container.querySelector("#gen-height") as HTMLInputElement;
  const frameInput = container.querySelector("#gen-frame") as HTMLInputElement;
  const paletteSel = container.querySelector("#gen-palette") as HTMLSelectElement;
  const runBtn = container.querySelector("#gen-run") as HTMLButtonElement;
  const stagesEl = container.querySelector("#gen-stages")! as HTMLElement;
  const genCanvas = container.querySelector("#gen-canvas") as HTMLCanvasElement;
  const fingerprintEl = container.querySelector("#gen-fingerprint")! as HTMLElement;
  const paramsPre = container.querySelector("#gen-params")! as HTMLPreElement;
  const fpDetailEl = container.querySelector("#gen-fp-detail")! as HTMLElement;

  // ------------------------------------------------------------------
  // Render canvas
  // ------------------------------------------------------------------

  function renderCanvas(pixels: { x: number; y: number; r: number; g: number; b: number }[], w: number, h: number): void {
    const dpr = window.devicePixelRatio || 1;
    const displayW = genCanvas.clientWidth || 400;
    const displayH = genCanvas.clientHeight || 300;
    genCanvas.width = displayW * dpr;
    genCanvas.height = displayH * dpr;
    const ctx = genCanvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    // Each pixel is drawn as a small rect preserving half-block aspect
    // (2 pixels tall per cell). We map the W×(H×2) pixel buffer to canvas.
    const pxPerCellX = displayW / w;
    const pxPerCellY = displayH / h;

    const img = ctx.createImageData(w, h * 2);
    const data = img.data;
    for (const p of pixels) {
      const idx = (p.y * w + p.x) * 4;
      data[idx] = p.r;
      data[idx + 1] = p.g;
      data[idx + 2] = p.b;
      data[idx + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  // ------------------------------------------------------------------
  // Run model
  // ------------------------------------------------------------------

  function run() {
    const input: GenModelInput = {
      seed: parseInt(seedInput.value, 10) || 0,
      mode: (modeSel.value as any) || "flowfield",
      width: parseInt(widthInput.value, 10) || 100,
      height: parseInt(heightInput.value, 10) || 40,
      frame: parseInt(frameInput.value, 10) || 0,
      palette: paletteSel.value || undefined,
    };

    try {
      const out = model.run(input);

      // Stages
      const html = out.stages.map((s: { name: string; description: string; data: unknown }) => {
        let dataStr = "";
        if (s.data && typeof s.data === "object" && !Array.isArray(s.data)) {
          dataStr = JSON.stringify(s.data).slice(0, 100);
        } else if (Array.isArray(s.data)) {
          dataStr = `(${s.data.length} items)`;
        }
        return `<div class="stage-row"><span class="stage-chip">${s.name}</span><span class="stage-value">${s.description} ${dataStr ? "· " + dataStr : ""}</span></div>`;
      }).join("");
      stagesEl.innerHTML = html;

      // Canvas
      renderCanvas(out.final.pixels, out.final.width, out.final.height * 2);

      // Fingerprint
      fingerprintEl.textContent = `fp=${out.final.fingerprint}`;
      fpDetailEl.textContent = `mode=${out.final.mode} frame=${out.final.frame} seed=${out.final.seed} palette=${out.final.palette} cells=${out.final.cellCount}`;

      // Params
      paramsPre.textContent = JSON.stringify(out.final.params, null, 2);

    } catch (e) {
      stagesEl.innerHTML = `<div style="color:var(--fg-red);">Error: ${(e as Error).message}</div>`;
    }
  }

  runBtn.addEventListener("click", run);

  // Initial run
  run();
}
