/**
 * Section 3.1 — Overview / Hero
 * Presents selected projects, their purpose, technologies, verified metrics,
 * main engineering concepts, and links to original repositories.
 */

import { getLang } from "../i18n";
import { dict } from "../i18n/dict";

function t(key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[getLang()];
}

export function renderHero(container: HTMLElement): void {
  container.innerHTML = `
    <div class="grid-4">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title" data-i18n="hero_wtm_title"></div>
            <div class="card-subtitle" data-i18n="hero_wtm_sub"></div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;" data-i18n="hero_wtm_body"></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-blue);" data-i18n="wtm_tests"></span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="hero_chip_zero_deps"></span>
        </div>
        <a href="https://github.com/ThorrijaDEV/wifi-time-machine" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;" data-i18n="hero_view_repo"></a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title" data-i18n="hero_ble_title"></div>
            <div class="card-subtitle" data-i18n="hero_ble_sub"></div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;" data-i18n="hero_ble_body"></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="ble_tests"></span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="hero_chip_demo_mode"></span>
        </div>
        <a href="https://github.com/ThorrijaDEV/ble-radar" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;" data-i18n="hero_view_repo"></a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title" data-i18n="hero_pem_title"></div>
            <div class="card-subtitle" data-i18n="hero_pem_sub"></div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;" data-i18n="hero_pem_body"></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="pem_tests"></span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="hero_chip_proc"></span>
        </div>
        <a href="https://github.com/ThorrijaDEV/process-ecosystem-monitor" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;" data-i18n="hero_view_repo"></a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title" data-i18n="hero_gen_title"></div>
            <div class="card-subtitle" data-i18n="hero_gen_sub"></div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;" data-i18n="hero_gen_body"></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="gen_tests"></span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="hero_chip_zero_deps"></span>
        </div>
        <a href="https://github.com/ThorrijaDEV/terminal-generative-engine" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;" data-i18n="hero_view_repo"></a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title" data-i18n="hero_box_title"></div>
            <div class="card-subtitle" data-i18n="hero_box_sub"></div>
          </div>
          <span class="fidelity-badge fidelity-3">Level 3</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;" data-i18n="hero_box_body"></p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);" data-i18n="box_tests"></span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-amber);" data-i18n="hero_chip_level3"></span>
        </div>
        <a href="https://github.com/ThorrijaDEV/the-box" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;" data-i18n="hero_view_repo"></a>
      </div>
    </div>

    <div class="card mt-16">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px;">
        <div style="flex:1;">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);" data-i18n="hero_concepts_title"></h3>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li data-i18n="hero_concepts_1"></li>
            <li data-i18n="hero_concepts_2"></li>
            <li data-i18n="hero_concepts_3"></li>
            <li data-i18n="hero_concepts_4"></li>
            <li data-i18n="hero_concepts_5"></li>
            <li data-i18n="hero_concepts_6"></li>
            <li data-i18n="hero_concepts_7"></li>
            <li data-i18n="hero_concepts_8"></li>
          </ul>
        </div>
        <div style="flex:0 0 300px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:20px;">
          <h4 style="font-size:13px; color:var(--fg-cyan); margin-bottom:12px; font-family:var(--mono); text-transform:uppercase;" data-i18n="hero_method_title"></h4>
          <p style="color:var(--text-muted); font-size:12px; line-height:1.6; margin-bottom:16px;" data-i18n="hero_method_body"></p>
          <h4 style="font-size:13px; color:var(--fg-cyan); margin-bottom:12px; font-family:var(--mono); text-transform:uppercase;" data-i18n="hero_fidelity_title"></h4>
          <p style="color:var(--text-muted); font-size:12px; line-height:1.6;" data-i18n="hero_fidelity_l4"></p>
          <p style="color:var(--text-muted); font-size:12px; line-height:1.6;" data-i18n="hero_fidelity_l3"></p>
        </div>
      </div>

    <section class="page-doc" id="understanding-overview">
      <h2 data-i18n="doc_overview_title"></h2>
      <h3 data-i18n="doc_overview_a_title"></h3>
      <p data-i18n="doc_overview_a_body"></p>
      <h3 data-i18n="doc_overview_b_title"></h3>
      <p data-i18n="doc_overview_b_body"></p>
      <h3 data-i18n="doc_overview_c_title"></h3>
      <p data-i18n="doc_overview_c_body"></p>
      <h3 data-i18n="doc_overview_d_title"></h3>
      <p data-i18n="doc_overview_d_body"></p>
      <h3 data-i18n="doc_overview_e_title"></h3>
      <p data-i18n="doc_overview_e_body"></p>
    </section>
  `;
}
