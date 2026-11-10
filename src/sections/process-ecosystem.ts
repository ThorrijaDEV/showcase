/**
 * Section 3.4 — Process Ecosystem Monitor Laboratory
 *
 * Interactive deterministic model of Linux process lifecycle, CPU jiffie
 * accounting, process tree building, orphan re-homing, and PID-reuse
 * detection. Accepts synthetic /proc-style snapshots.
 */

import { ProcessEcosystemModel, type ProcModelInput, type ProcSnapshot } from "@models/process-ecosystem";
import { getLang } from "../i18n";
import { dict } from "../i18n/dict";

function t(key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[getLang()];
}

const DEFAULT_SNAPS: ProcSnapshot[] = [
  { pid: 1, ppid: 0, comm: "systemd", state: "S", utime: 100, stime: 10, numThreads: 5, starttime: 200, vsize: 60 * 1024 * 1024, rss: 60 * 1024 * 1024, user: "root" },
  { pid: 2, ppid: 0, comm: "kthreadd", state: "S", utime: 0, stime: 0, numThreads: 1, starttime: 200, vsize: 1 * 1024 * 1024, rss: 1 * 1024 * 1024, user: null },
  { pid: 10, ppid: 1, comm: "dbus", state: "S", utime: 200, stime: 50, numThreads: 2, starttime: 300, vsize: 12 * 1024 * 1024, rss: 12 * 1024 * 1024, user: "dbus" },
  { pid: 100, ppid: 10, comm: "browser", state: "R", utime: 1000, stime: 200, numThreads: 10, starttime: 400, vsize: 980 * 1024 * 1024, rss: 980 * 1024 * 1024, user: "user" },
  { pid: 110, ppid: 100, comm: "renderer", state: "R", utime: 800, stime: 100, numThreads: 4, starttime: 450, vsize: 210 * 1024 * 1024, rss: 210 * 1024 * 1024, user: "user" },
];

export function renderProcessEcosystem(container: HTMLElement): void {
  const model = new ProcessEcosystemModel();

  container.innerHTML = `
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="pem_input_title"></div>
              <div class="card-subtitle" data-i18n="pem_input_sub"></div>
            </div>
          </div>
          <textarea id="pem-snapshots" rows="12" style="width:100%; font-family:var(--mono); font-size:11px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); color:var(--text); padding:12px; resize:vertical;">${JSON.stringify(DEFAULT_SNAPS, null, 2)}</textarea>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;" data-i18n="pem_label_interval"></label>
            <div style="display:flex; gap:12px;">
              <div style="flex:1;"><label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="pem_label_interval_sec"></label><input type="number" id="pem-interval" value="0.2" step="0.1" style="width:70px; font-family:var(--mono); font-size:12px;"></div>
              <div style="flex:1;"><label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="pem_label_clktick"></label><input type="number" id="pem-clktick" value="100" style="width:70px; font-family:var(--mono); font-size:12px;"></div>
              <div style="flex:1;"><label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;" data-i18n="pem_label_ncores"></label><input type="number" id="pem-ncores" value="1" style="width:70px; font-family:var(--mono); font-size:12px;"></div>
            </div>
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px; margin-top:8px;" data-i18n="pem_label_walltime"></label>
            <input type="number" id="pem-walltime" value="0" style="width:100px; font-family:var(--mono); font-size:12px;">
          </div>
          <button id="pem-run" class="btn primary" data-i18n="pem_run"></button>
          <button id="pem-reset" class="btn secondary" data-i18n="pem_reset"></button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="pem_diff_title"></div>
              <div class="card-subtitle" data-i18n="pem_diff_sub"></div>
            </div>
          </div>
          <div id="pem-diff" style="font-family:var(--mono); font-size:12px; color:var(--text-muted); max-height:200px; overflow-y:auto;">
            <div style="color:var(--text-muted);" data-i18n="wtm_waiting"></div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="pem_state_title"></div>
              <div class="card-subtitle" data-i18n="pem_state_sub"></div>
            </div>
          </div>
          <table id="pem-table">
            <thead><tr><th data-i18n="pem_table_pid">PID</th><th data-i18n="pem_table_comm">Comm</th><th data-i18n="pem_table_state">Estado</th><th data-i18n="pem_table_cpu">CPU%</th><th data-i18n="pem_table_rss">RSS (MB)</th><th data-i18n="pem_table_threads">Hilos</th><th data-i18n="pem_table_orphan">Huérfano</th><th data-i18n="pem_table_spike">Pico</th></tr></thead>
            <tbody id="pem-table-body"></tbody>
          </table>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title" data-i18n="pem_tree_title"></div>
              <div class="card-subtitle" data-i18n="pem_tree_sub"></div>
            </div>
          </div>
          <div id="pem-tree" style="font-family:var(--mono); font-size:12px; color:var(--text-muted); line-height:2; background:#0a0a0c; padding:16px; border-radius:var(--radius); border:1px solid var(--panel-border);">
            <div style="color:var(--text-muted);" data-i18n="wtm_waiting"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title" data-i18n="pem_metrics_title"></div>
          <div class="card-subtitle" data-i18n="pem_metrics_sub"></div>
        </div>
      </div>
      <div class="grid-3">
        <div style="background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:16px;">
          <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); text-transform:uppercase;" data-i18n="pem_sys_cpu"></div>
          <div id="pem-sys-cpu" style="font-size:28px; font-weight:700; color:var(--fg-cyan); font-variant-numeric:tabular-nums;">—</div>
        </div>
        <div style="background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:16px;">
          <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); text-transform:uppercase;" data-i18n="pem_sys_ram"></div>
          <div id="pem-sys-ram" style="font-size:28px; font-weight:700; color:var(--fg-green); font-variant-numeric:tabular-nums;">—</div>
        </div>
        <div style="background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:16px;">
          <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); text-transform:uppercase;" data-i18n="pem_alive"></div>
          <div id="pem-alive" style="font-size:28px; font-weight:700; color:var(--fg-blue); font-variant-numeric:tabular-nums;">—</div>
        </div>
      </div>

    <section class="page-doc" id="understanding-pem">
      <h2 data-i18n="doc_pem_title"></h2>
      <h3 data-i18n="doc_pem_a_title"></h3>
      <p data-i18n="doc_pem_a_body"></p>
      <h3 data-i18n="doc_pem_b_title"></h3>
      <p data-i18n="doc_pem_b_body"></p>
      <h3 data-i18n="doc_pem_c_title"></h3>
      <p data-i18n="doc_pem_c_body"></p>
      <h3 data-i18n="doc_pem_d_title"></h3>
      <p data-i18n="doc_pem_d_body"></p>
      <h3 data-i18n="doc_pem_e_title"></h3>
      <p data-i18n="doc_pem_e_body"></p>
    </section>
  `;

  // ------------------------------------------------------------------
  // Elements
  // ------------------------------------------------------------------
  const snapInput = container.querySelector("#pem-snapshots") as HTMLTextAreaElement;
  const intervalInput = container.querySelector("#pem-interval") as HTMLInputElement;
  const clkTickInput = container.querySelector("#pem-clktick") as HTMLInputElement;
  const ncoresInput = container.querySelector("#pem-ncores") as HTMLInputElement;
  const wallTimeInput = container.querySelector("#pem-walltime") as HTMLInputElement;
  const runBtn = container.querySelector("#pem-run") as HTMLButtonElement;
  const resetBtn = container.querySelector("#pem-reset") as HTMLButtonElement;
  const diffEl = container.querySelector("#pem-diff")! as HTMLElement;
  const tableBody = container.querySelector("#pem-table-body")! as HTMLTableSectionElement;
  const treeEl = container.querySelector("#pem-tree")! as HTMLElement;
  const sysCpuEl = container.querySelector("#pem-sys-cpu")! as HTMLElement;
  const sysRamEl = container.querySelector("#pem-sys-ram")! as HTMLElement;
  const aliveEl = container.querySelector("#pem-alive")! as HTMLElement;

  // ------------------------------------------------------------------
  // Run model
  // ------------------------------------------------------------------

  function run() {
    let snaps: ProcSnapshot[];
    try {
      snaps = JSON.parse(snapInput.value);
    } catch {
      diffEl.innerHTML = `<div style="color:var(--fg-red);">${t("pem_json_invalid")}</div>`;
      return;
    }

    const input: ProcModelInput = {
      snapshots: snaps as ProcSnapshot[],
      system: null,
      intervalSec: parseFloat(intervalInput.value) || 0.2,
      clkTick: parseInt(clkTickInput.value, 10) || 100,
      ncores: parseInt(ncoresInput.value, 10) || 1,
      wallTime: parseFloat(wallTimeInput.value),
    };

    try {
      const out = model.run(input);

      // Diff
      const d = out.final.diff;
      diffEl.innerHTML = `
        <div style="color:var(--fg-green);">▲ ${t("pem_births")}: ${d.births.length} (${d.births.map(b => `${b.pid}:${b.comm}`).join(", ") || "—"})</div>
        <div style="color:var(--fg-red);">▼ ${t("pem_deaths")}: ${d.deaths.length} (${d.deaths.map(d => `${d.pid}:${d.comm}`).join(", ") || "—"})</div>
        <div style="color:var(--fg-amber);">◆ ${t("pem_spikes")}: ${d.spikes.length}</div>
        <div style="color:var(--fg-purple);">● ${t("pem_orphans")}: ${d.orphans.length}</div>
        <div style="color:var(--text-muted);">sistema CPU: ${d.cpuPct.toFixed(1)}% · RAM: ${d.ramPct.toFixed(1)}% · ${t("pem_alive_short")}: ${d.alive}</div>
      `;

      // Table
      const rows = out.final.processes.map(p => {
        const stateColor = p.lifecycle === "active" ? "#10b981" : p.lifecycle === "idle" ? "#f59e0b" : p.lifecycle === "new" ? "#a855f7" : p.lifecycle === "dying" ? "#ef4444" : "#666666";
        const rssMB = (p.rss / (1024 * 1024)).toFixed(1);
        return `
          <tr>
            <td>${p.pid}</td>
            <td>${p.comm}</td>
            <td style="color:${stateColor};">${p.lifecycle}</td>
            <td>${p.cpuPct.toFixed(1)}%</td>
            <td>${rssMB}</td>
            <td>${p.numThreads}</td>
            <td>${p.orphan ? t("pem_yes") : t("pem_no")}</td>
            <td>${p.spike ? t("pem_yes") : t("pem_no")}</td>
          </tr>
        `;
      }).join("");
      tableBody.innerHTML = rows || `<tr><td colspan='8' style='color:var(--text-muted);'>${t("pem_no_processes")}</td></tr>`;

      // Tree
      treeEl.innerHTML = `
        <div style="color:var(--fg-blue); font-weight:bold;">${t("pem_roots")}: ${out.final.treeRoots.join(", ") || "—"}</div>
        <div style="color:var(--text-muted); margin-top:6px;">${t("pem_kernel_threads")}: ${out.final.kernelThreads.join(", ") || "—"}</div>
        <div style="color:var(--text-muted); margin-top:6px;">Núcleos: ${input.ncores} · CLK_TCK: ${input.clkTick}</div>
      `;

      // System metrics
      sysCpuEl.textContent = out.final.systemCpu.toFixed(1) + "%";
      sysRamEl.textContent = out.final.systemRam.toFixed(1) + "%";
      aliveEl.textContent = out.final.aliveCount.toString();

    } catch (e) {
      diffEl.innerHTML = `<div style="color:var(--fg-red);">Error: ${(e as Error).message}</div>`;
    }
  }

  function reset() {
    model.reset();
    diffEl.innerHTML = `<div style='color:var(--text-muted);'>${t("pem_reset_done")}</div>`;
    tableBody.innerHTML = `<tr><td colspan='8' style='color:var(--text-muted);'>${t("pem_no_processes")}</td></tr>`;
    treeEl.innerHTML = `<div style='color:var(--text-muted);'>${t("wtm_waiting")}</div>`;
    sysCpuEl.textContent = "—";
    sysRamEl.textContent = "—";
    aliveEl.textContent = "—";
  }

  runBtn.addEventListener("click", run);
  resetBtn.addEventListener("click", reset);

  // Initial run
  run();
}
