/**
 * Section 3.6 — Fidelity & Methodology
 *
 * Per-model fidelity ratings (1-4), assumptions, limitations, and honest
 * documentation of what is and isn't reproduced.
 */

export function renderFidelity(container: HTMLElement): void {
  container.innerHTML = `
    <div class="grid-2">
      <div style="flex:1;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Clasificación de fidelidad por modelo</div>
              <div class="card-subtitle">Nivel 1 = modelo conceptual · Nivel 4 = reproducción algorítmica directa</div>
            </div>
          </div>
          <div class="fidelity-grid">
            <div class="fidelity-card">
              <h4>Wi-Fi Time Machine</h4>
              <div class="level">4</div>
              <ul>
                <li>Parsing de bloques BSS de iw dump</li>
                <li>Tokenizador escapado de nmcli</li>
                <li>Deduplicación por BSSID (se~nal más fuerte)</li>
                <li>Mapeo freq→canal 2.4/5/6 GHz</li>
                <li>Inferencia de seguridad por AKM</li>
                <li>Mapa de calor tiempo × buckets</li>
                <li>Sanitización SHA-256 de BSSID</li>
                <li><strong>Adaptado:</strong> sin iw/nmcli, sin SQLite, sin tamaño de terminal</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>BLE Radar</h4>
              <div class="level">4</div>
              <ul>
                <li>M&aacutequina de estado: appeared→active→fading→disappeared</li>
                <li>EMA RSSI (alpha=0.4)</li>
                <li>Bandas de fuerza (NO distancia)</li>
                <li>Ángulo desde SHA-256(dir) — convención visual</li>
                <li>Geometría del frame radar (cárdenas)</li>
                <li>Cursor de reproducción con seek/speed</li>
                <li><strong>Adaptado:</strong> sin bleak/BlueZ, sin curses, sin SQLite</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>Process Ecosystem Monitor</h4>
              <div class="level">4</div>
              <ul>
                <li>Parsing de /proc/[pid]/stat (comm con paréntesis anidados)</li>
                <li>CPU% por delta de jiffies, normalizado per-núcleo</li>
                <li>CPU del sistema desde /proc/stat</li>
                <li>Identidad (pid, starttime) y detección de reuso de PID</li>
                <li>&Aacute;rbol desde ppid, rehuerfamiento con cementerio</li>
                <li>Ciclo: new→active/idle→dying→dead</li>
                <li><strong>Adaptado:</strong> sin /proc real, sin curses</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>Generative Engine</h4>
              <div class="level">4</div>
              <ul>
                <li>RNG splitmix64 sin estado (O(1) buscar frames)</li>
                <li>Paletas continuas 1-D interpoladas</li>
                <li>Flowfield: campo de sénos análitico</li>
                <li>Plasma: fórmulas de color cerradas</li>
                <li>Attractor: Clifford/Dejong con sondeo de coeficientes</li>
                <li>Huella dactilar del mundo (hash de píxeles)</li>
                <li><strong>Adaptado:</strong> sin terminal/ANSI, sin exportación de archivo</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>The Box</h4>
              <div class="level">3</div>
              <ul>
                <li>Kernel arc-incidence multi-digraph con invariantes I1-I4</li>
                <li>Seis reglas (GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE)</li>
                <li>4 políticas del motor (canonical, uniform, weighted, roundrobin)</li>
                <li>Espacio de posibilidades: sitios finitos, enumerables, sin semilla</li>
                <li>unit_hash: BLAKE2b(semilla||paso||prop||digest_estructural) / 2^64</li>
                <li>Identidad y linaje: descenso, profundidad, clases de fusión</li>
                <li>Métricas estructurales: grados, componentes, beta0/beta1, modularidad</li>
                <li>Observables nombrados (14 mediciones)</li>
                <li><strong>Adaptado:</strong> BLAKE2b puro TS (no hashlib), Float64Array (no NumPy), reglas hard-coded (no YAML), sin batería de modelos nulos ni koopman</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card mt-16">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);">Suposiciones documentadas</h3>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li><strong>RSSI ≠ distancia:</strong> los anillos del radar son bandas de fuerza se~nal, nunca metros físicos.</li>
            <li><strong>Ángulo ≠ orientación:</strong> el ángulo de dispositivo se deriva del hash de la dirección MAC; BLE no proporciona orientación.</li>
            <li><strong>Sin hardware:</strong> los modelos no acceden a adaptadores Bluetooth, Wi-Fi ni /proc. Las entradas son sintéticas o de muestra.</li>
            <li><strong>Sin I/O original:</strong> no se invocan iw, nmcli, bleak ni curses. Límites de E/S sustituidos por entradas deterministas.</li>
            <li><strong>Reloj configurable:</strong> el tiempo de pared se sustituye por un reloj de época configurable para reproducibilidad.</li>
            <li><strong>GenArt tests upstream:</strong> el motor original tiene 5 tests fallidos (no reproducidos aquí).</li>
          </ul>
        </div>
      </div>

      <div style="flex:1;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Limitaciones honestas</div>
              <div class="card-subtitle">Qué no se reproduce y por qué</div>
            </div>
          </div>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li><strong>Hardware de radio:</strong> WTM y BLE requieren adaptadores Wi-Fi/BLE reales para escaneo en vivo; sustituidos por datos sintéticos.</li>
            <li><strong>Base de datos SQLite:</strong> la persistencia se sustituyó por almacén en memoria con la misma semántica de consultas.</li>
            <li><strong>Interfaz de terminal:</strong> curses/pantalla sustituidos por lienzo HTML y geometría de cárdenas.</li>
            <li><strong>/proc de Linux:</strong> el modelo PEM usa instantáneas sintéticas; no lee /proc del sistema anfitrión.</li>
            <li><strong>Exportación de archivo:</strong> GIF/PNG/ANS del GenArt no están en el nivel de modelo; los arrays de píxeles se exportan como datos.</li>
            <li><strong>No se afirman capacidades:</strong> nada se afirma que no esté implementado y probado.</li>
          </ul>
        </div>

        <div class="card mt-16">
          <div class="card-header">
            <div>
              <div class="card-title">Ecuaciones y complejidad</div>
              <div class="card-subtitle">Fundamentos matemáticos de los modelos reconstruidos</div>
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
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);">Reproducibilidad</h3>
          <p style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8;">
            Todos los modelos son deterministas: misma entrada → misma salida. No hay aleatoriedad en tiempo de render, ni hardware, ni reloj de pared. Cada ejecución produce salidas idénticas byte a byte, verificadas por pruebas automatizadas en <code>tests/</code>.
          </p>
        </div>
      </div>
    </div>
  `;
}
