/**
 * Section 3.1 — Overview / Hero
 * Presents selected projects, their purpose, technologies, verified metrics,
 * main engineering concepts, and links to original repositories.
 */

export function renderHero(container: HTMLElement): void {
  container.innerHTML = `
    <div class="grid-4">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Wi-Fi Time Machine</div>
            <div class="card-subtitle">Wireless environment history · TypeScript · SQLite concepts</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Historial continuo del entorno inalámbrico local (APs, canales, bandas, RSSI, seguridad);
          reproducción y visualización de cómo cambia el entorno con el tiempo. Mapeo freq→canal,
          exportación con desinfección SHA-256. Reconstrucción determinista desde código fuente.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-blue);">18 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">Zero deps</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/wifi-time-machine" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">BLE Radar</div>
            <div class="card-subtitle">Bluetooth LE visualization · TypeScript · deterministic demo</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Radar terminal para el entorno BLE: blips con anillos de fuerza RSSI, máquinas de estado de
          ciclo de vida de dispositivos, historial en SQLite, reproducción de sesiones. Honestidad de
          señal: RSSI es fuerza, no distancia.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">16 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">Demo mode</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/ble-radar" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Process Ecosystem Monitor</div>
            <div class="card-subtitle">Linux process visualization · TypeScript · /proc concepts</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Convierte el árbol de procesos de Linux en un ecosistema vivo: nacimientos, muertes,
          rehuérfanos, CPU% mediante delta de jiffies, árbol de procesos, anillos de historial.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">22 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">/proc parsing</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/process-ecosystem-monitor" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Terminal Generative Engine</div>
            <div class="card-subtitle">Procedural art · TypeScript · splitmix64 RNG</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Gráficos generativos procedimentales deterministas: flowfield (campo analítico de senos),
          plasma (campos de color cerrados), attractor (mapa extraño de Clifford/Dejong).
          Semilla compartible, búsqueda O(1) de frames, huella dactilar SHA-256.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">24 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">Zero deps</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/terminal-generative-engine" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">The Box</div>
            <div class="card-subtitle">Arc-incidence multi-digraph · 6 rules · identity & lineage</div>
          </div>
          <span class="fidelity-badge fidelity-3">Level 3</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Sustrato relacional computacional: seis reglas de reescritura (GATHER, BOND, TAG_PROP,
          QUIET, DESCEND, FUSE), espacio de posibilidades, identidad y linaje derivados,
          métricas estructurales, observables nombrados. Fidelity Level 3: BLAKE2b puro TS
          (no byte-compatible con Python hashlib.blake2b).
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">42 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-amber);">Level 3</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/the-box" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>
    </div>

    <div class="card mt-16">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px;">
        <div style="flex:1;">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);">Engineering concepts</h3>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li>Deterministic lifecycle state machines (BLE: appeared→active→fading→disappeared)</li>
            <li>CPU accounting based on jiffies with per-core normalization (PEM)</li>
            <li>RSSI EMA smoothing (alpha=0.4) and strength bands, not distance (BLE)</li>
            <li>802.11 frequency-to-channel mapping for 2.4/5/6 GHz (WTM)</li>
            <li>Stateless splitmix64 RNG: O(1)-seekable frames (GenArt)</li>
            <li>/proc parsing with nested-paren comm handling (PEM)</li>
            <li>SHA-256 truncated address sanitization (WTM, BLE)</li>
            <li>Arc-incidence multi-digraph with shared id space (The Box)</li>
          </ul>
        </div>
        <div style="flex:0 0 300px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:20px;">
          <h4 style="font-size:13px; color:var(--fg-cyan); margin-bottom:12px; font-family:var(--mono); text-transform:uppercase;">Reconstruction methodology</h4>
          <p style="color:var(--text-muted); font-size:12px; line-height:1.6; margin-bottom:16px;">
            Each model is an independent reconstruction from the original source code. The original
            project is not executed. All outputs are computed from the model. No hardcoded outputs.
          </p>
          <h4 style="font-size:13px; color:var(--fg-cyan); margin-bottom:12px; font-family:var(--mono); text-transform:uppercase;">Fidelity classification</h4>
          <p style="color:var(--text-muted); font-size:12px; line-height:1.6;">
            <strong>Level 4</strong>: direct algorithmic reproduction. I/O boundary adapted to deterministic inputs.<br>
            <strong>Level 3</strong> (The Box): faithful port with documented simplifications — pure-TS BLAKE2b,
            Float64Array instead of NumPy, hard-coded foundry rules.
          </p>
        </div>
      </div>
    </div>
  `;
}