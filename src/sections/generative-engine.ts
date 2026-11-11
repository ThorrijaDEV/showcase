/**
 * Section 3.5 — Terminal Generative Engine Laboratory
 *
 * Interactive deterministic generative art model: flowfield, plasma,
 * attractor modes. Seed → parameters → pixels → fingerprint. O(1) frame
 * seeking. All values computed from the splitmix64 RNG.
 */

import { GenerativeEngineModel, type GenModelInput } from "@models/generative-engine";
import { getLang } from "../i18n";
import { dict, type Lang } from "../i18n/dict";
import { GEN_DESCS } from "../field-descriptions";

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

export function renderGenerativeEngine(container: HTMLElement): void {
  const model = new GenerativeEngineModel();

  container.innerHTML = `
    <div class="card mt-8" style="border-left:3px solid var(--accent); background:#0c0c12;">
      <div class="card-header">
        <div>
          <div class="card-title" style="font-size:15px; color:var(--fg-cyan);">What is the Terminal Generative Engine?</div>
          <div class="card-subtitle" style="font-size:11px; color:var(--text-muted); margin-top:4px;">¿Qué es el Terminal Generative Engine?</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--text); line-height:1.7; padding:10px 12px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); white-space:pre-wrap;">
Deterministic procedural generative art. A stateless splitmix64 RNG turns a seed into every pixel value — no PRNG state is kept, so the same seed always produces the same frame (O(1) frame seeking). Three modes: flowfield (analytic sine field driving particles along streamlines), plasma (closed-form per-pixel color fields: classic / rings / mandala / sweep), and attractor (Clifford/Dejong strange map with coefficient probing). Continuous interpolated palettes map values to colors, and a SHA-256 world fingerprint over mode + frame + parameters + pixels gives each world a shareable identity. Every pixel is computed — nothing is hardcoded.

Arte generativo procedimental determinista. Un RNG splitmix64 sin estado convierte una semilla en cada valor de píxel — no se conserva estado de PRNG, por lo que la misma semilla siempre produce el mismo frame (búsqueda O(1) de frames). Tres modos: flowfield (campo analítico de senos que impulsa partículas a lo largo de streamlines), plasma (campos de color cerrados por píxel: classic / rings / mandala / sweep), y attractor (mapa extraño de Clifford/Dejong con sondeo de coeficientes). Paletas continuas interpoladas mapean valores a colores, y una huella dactilar SHA-256 del mundo sobre modo + frame + parámetros + píxeles da a cada mundo una identidad compartible. Cada píxel se calcula — nada está hardcodeado.
      </div>
    </div>

    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="gen_world_title"></div>
              <div class="card-subtitle" data-i18n="gen_world_sub"></div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;" data-i18n="gen_label_seed"></label>
            <input type="number" id="gen-seed" value="12345" style="width:100px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);" data-i18n="gen_label_mode"></label>
            <select id="gen-mode" style="margin-left:8px; width:130px; font-family:var(--mono); font-size:12px;">
              <option value="flowfield">flowfield</option>
              <option value="plasma">plasma</option>
              <option value="attractor">attractor</option>
            </select>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;" data-i18n="gen_label_canvas"></label>
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="number" id="gen-width" value="100" min="20" max="200" style="width:70px; font-family:var(--mono); font-size:12px;">
              <span style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">×</span>
              <input type="number" id="gen-height" value="40" min="8" max="120" style="width:70px; font-family:var(--mono); font-size:12px;">
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;" data-i18n="gen_label_frame"></label>
            <input type="number" id="gen-frame" value="0" min="0" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);" data-i18n="gen_label_palette"></label>
            <select id="gen-palette" style="margin-left:8px; width:100px; font-family:var(--mono); font-size:12px;">
              <option value="" data-i18n="gen_palette_seed"></option>
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
          <button id="gen-run" class="btn primary" data-i18n="gen_run"></button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="gen_stages_title"></div>
              <div class="card-subtitle" data-i18n="gen_stages_sub"></div>
            </div>
          </div>
          <div id="gen-stages" style="font-family:var(--mono); font-size:12px; color:var(--text-muted);">
            <div class="stage-row"><span class="stage-chip" data-i18n="wtm_waiting"></span></div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="gen_render_title"></div>
              <div class="card-subtitle" data-i18n="gen_render_sub"></div>
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
                <div class="card-title" data-i18n="gen_params_title"></div>
                <div class="card-subtitle" data-i18n="gen_params_sub"></div>
              </div>
            </div>
            <pre id="gen-params" style="font-size:11px;">—</pre>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title" data-i18n="gen_fp_title"></div>
                <div class="card-subtitle" data-i18n="gen_fp_sub"></div>
              </div>
            </div>
            <div id="gen-fp-detail" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); background:#0a0a0c; padding:12px; border-radius:var(--radius); border:1px solid var(--panel-border);">—</div>
          </div>
        </div>
      </div>

    <div class="card mt-16" style="border-left:3px solid var(--accent);">
      <div class="card-header">
        <div>
          <div class="card-title" style="font-size:13px; color:var(--fg-cyan);">Value meanings · Significado de los valores</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:10px; color:var(--text-muted); line-height:1.6; padding:8px 12px;">
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Seed</span> <span style="color:var(--text);">${desc(GEN_DESCS, "seed")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Mode</span> <span style="color:var(--text);">${desc(GEN_DESCS, "mode")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Frame</span> <span style="color:var(--text);">${desc(GEN_DESCS, "frame")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Fingerprint</span> <span style="color:var(--text);">${desc(GEN_DESCS, "fingerprint")}</span></div>
        <div style="display:flex; justify-content:space-between; margin:2px 0;"><span style="color:var(--text-muted);">Palette</span> <span style="color:var(--text);">${desc(GEN_DESCS, "palette")}</span></div>
      </div>
    </div>

    <section class="page-doc" id="understanding-gen">
      <h2 data-i18n="doc_gen_title"></h2>
      <h3 data-i18n="doc_gen_a_title"></h3>
      <p data-i18n="doc_gen_a_body"></p>
      <h3 data-i18n="doc_gen_b_title"></h3>
      <p data-i18n="doc_gen_b_body"></p>
      <h3 data-i18n="doc_gen_c_title"></h3>
      <p data-i18n="doc_gen_c_body"></p>
      <h3 data-i18n="doc_gen_d_title"></h3>
      <p data-i18n="doc_gen_d_body"></p>
      <h3 data-i18n="doc_gen_e_title"></h3>
      <p data-i18n="doc_gen_e_body"></p>
    </section>
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
    const tmp = document.createElement("canvas");
    tmp.width = w;
    tmp.height = h * 2;
    tmp.getContext("2d")!.putImageData(img, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, displayW, displayH);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tmp, 0, 0, w, h * 2, 0, 0, displayW, displayH);
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

      renderCanvas(out.final.pixels, out.final.width, out.final.height * 2);

      fingerprintEl.textContent = `fp=${out.final.fingerprint}`;
      fpDetailEl.textContent = `mode=${out.final.mode} frame=${out.final.frame} seed=${out.final.seed} palette=${out.final.palette} cells=${out.final.cellCount}`;
      paramsPre.textContent = JSON.stringify(out.final.params, null, 2);

    } catch (e) {
      stagesEl.innerHTML = `<div style="color:var(--fg-red);">Error: ${(e as Error).message}</div>`;
    }
  }

  runBtn.addEventListener("click", run);

  // Initial run
  run();
}
