/**
 * Section 3.6 — Fidelity & Methodology
 *
 * Per-model fidelity ratings (1-4), assumptions, limitations, and honest
 * documentation of what is and isn't reproduced.
 */

import { getLang } from "../i18n";
import { dict } from "../i18n/dict";

function t(key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[getLang()];
}

export function renderFidelity(container: HTMLElement): void {
  container.innerHTML = `
    <div class="grid-2">
      <div style="flex:1;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="fidelity_title"></div>
              <div class="card-subtitle" data-i18n="fidelity_sub"></div>
            </div>
          </div>
          <div class="fidelity-grid">
            <div class="fidelity-card">
              <h4 data-i18n="fidelity_wtm"></h4>
              <div class="level">4</div>
              <ul>
                <li data-i18n="fid_wtm_1"></li>
                <li data-i18n="fid_wtm_2"></li>
                <li data-i18n="fid_wtm_3"></li>
                <li data-i18n="fid_wtm_4"></li>
                <li data-i18n="fid_wtm_5"></li>
                <li data-i18n="fid_wtm_6"></li>
                <li data-i18n="fid_wtm_adapted"></li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4 data-i18n="fidelity_ble"></h4>
              <div class="level">4</div>
              <ul>
                <li data-i18n="fid_ble_1"></li>
                <li data-i18n="fid_ble_2"></li>
                <li data-i18n="fid_ble_3"></li>
                <li data-i18n="fid_ble_4"></li>
                <li data-i18n="fid_ble_5"></li>
                <li data-i18n="fid_ble_6"></li>
                <li data-i18n="fid_ble_adapted"></li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4 data-i18n="fidelity_pem"></h4>
              <div class="level">4</div>
              <ul>
                <li data-i18n="fid_pem_1"></li>
                <li data-i18n="fid_pem_2"></li>
                <li data-i18n="fid_pem_3"></li>
                <li data-i18n="fid_pem_4"></li>
                <li data-i18n="fid_pem_5"></li>
                <li data-i18n="fid_pem_6"></li>
                <li data-i18n="fid_pem_adapted"></li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4 data-i18n="fidelity_gen"></h4>
              <div class="level">4</div>
              <ul>
                <li data-i18n="fid_gen_1"></li>
                <li data-i18n="fid_gen_2"></li>
                <li data-i18n="fid_gen_3"></li>
                <li data-i18n="fid_gen_4"></li>
                <li data-i18n="fid_gen_5"></li>
                <li data-i18n="fid_gen_6"></li>
                <li data-i18n="fid_gen_adapted"></li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4 data-i18n="fidelity_box"></h4>
              <div class="level">3</div>
              <ul>
                <li data-i18n="fid_box_1"></li>
                <li data-i18n="fid_box_2"></li>
                <li data-i18n="fid_box_3"></li>
                <li data-i18n="fid_box_4"></li>
                <li data-i18n="fid_box_5"></li>
                <li data-i18n="fid_box_6"></li>
                <li data-i18n="fid_box_7"></li>
                <li data-i18n="fid_box_8"></li>
                <li data-i18n="fid_box_adapted"></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card mt-16">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);" data-i18n="fidelity_assumptions_title"></h3>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li data-i18n="fid_assume_1"></li>
            <li data-i18n="fid_assume_2"></li>
            <li data-i18n="fid_assume_3"></li>
            <li data-i18n="fid_assume_4"></li>
            <li data-i18n="fid_assume_5"></li>
            <li data-i18n="fid_assume_6"></li>
          </ul>
        </div>
      </div>

      <div style="flex:1;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="fidelity_limitations_title"></div>
              <div class="card-subtitle" data-i18n="fidelity_limitations_sub"></div>
            </div>
          </div>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li data-i18n="fid_limit_1"></li>
            <li data-i18n="fid_limit_2"></li>
            <li data-i18n="fid_limit_3"></li>
            <li data-i18n="fid_limit_4"></li>
            <li data-i18n="fid_limit_5"></li>
            <li data-i18n="fid_limit_6"></li>
          </ul>
        </div>

        <div class="card mt-16">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="fidelity_equations_title"></div>
              <div class="card-subtitle" data-i18n="fidelity_equations_sub"></div>
            </div>
          </div>
          <div style="font-family:var(--mono); font-size:12px; color:var(--text-muted); line-height:1.8;">
            <div class="equation">canal = floor((freq − 5000) / 5)   [5 GHz]</div>
            <div class="equation">canal = floor((freq − 5925) / 5)   [6 GHz]</div>
            <div class="equation">canal = floor((freq − 2407) / 5)   [2.4 GHz, excepto 2484 → 14]</div>
            <div class="equation">rssi_ema = 0.6 × prev + 0.4 × raw      (BLE Radar, alpha=0.4)</div>
            <div class="equation">ángulo = SHA-256(dir)[0:2] / 65536 × 360°    (BLE Radar, convención visual)</div>
            <div class="equation">cpu_proc = Δ(utime+stime) / (interval × CLK_TCK × ncores) × 100   (PEM)</div>
            <div class="equation">cpu_sys = busy_delta / total_delta × 100   (idle = idle + iowait)</div>
            <div class="equation">x = cx + radius × 2 × cos(ángulo);  y = cy − radius × sin(ángulo)   (radar, corrección de aspecto)</div>
            <div class="equation">x' = sin(a·y) + c·cos(a·x),  y' = sin(b·x) + d·cos(b·y)   (attractor Clifford)</div>
            <div class="equation">complejidad: lineal en el número de observaciones / procesos por tick</div>
          </div>
        </div>

        <div class="card mt-16">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);" data-i18n="fidelity_repro_title"></h3>
          <p style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8;" data-i18n="fidelity_repro_body"></p>
        </div>
      </div>
    </div>
  `;
}
