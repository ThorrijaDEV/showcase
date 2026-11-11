/**
 * Field descriptions — plain-language explanations of every value, variable
 * and observable shown in the Showcase UI.
 *
 * Purpose: the user should never have to guess what a number means.
 * Each entry maps a model field/key to a human-readable sentence (EN + ES)
 * that is rendered next to the value in the UI.
 *
 * All entries are bilingual. Keys are language-neutral model output keys;
 * values are translated copy.
 */

export type Lang = "en" | "es";

interface FieldDesc {
  en: string;
  es: string;
}

/** The Box — substrate configuration inputs. */
export const BOX_INPUT_DESCS: Record<string, FieldDesc> = {
  nNodes: {
    en: "Initial nodes — how many starting points exist in the substrate before any rules run.",
    es: "Nodos iniciales — cuántos puntos de partida existen en el sustrato antes de que se apliquen reglas.",
  },
  nArcs: {
    en: "Initial arcs — how many starting relationships (lines between points) exist before any rules run.",
    es: "Arcos iniciales — cuántas relaciones iniciales (líneas entre puntos) existen antes de que se apliquen reglas.",
  },
  dim: {
    en: "Dimension — the coordinate space size used for node positioning and structural hashing.",
    es: "Dimensión — tamaño del espacio de coordenadas usado para posicionar nodos y para el hash estructural.",
  },
  seed: {
    en: "Seed — the deterministic seed. Same seed always produces the same trajectory.",
    es: "Semilla — la semilla determinista. Misma semilla siempre produce la misma trayectoria.",
  },
  steps: {
    en: "Steps — how many rule applications the engine will attempt before stopping.",
    es: "Pasos — cuántas aplicaciones de regla intentará el motor antes de detenerse.",
  },
  policy: {
    en: "Policy — the rule-selection strategy (Uniform, Canonical, Weighted, RoundRobin).",
    es: "Política — la estrategia de selección de regla (Uniforme, Canónica, Ponderada, RoundRobin).",
  },
  maxNodes: {
    en: "Max nodes — safety cap: the engine stops creating nodes once this many exist.",
    es: "Máx nodos — tope de seguridad: el motor deja de crear nodos una vez que existen tantos.",
  },
  maxArcs: {
    en: "Max arcs — safety cap: the engine stops creating arcs once this many exist.",
    es: "Máx arcos — tope de seguridad: el motor deja de crear arcos una vez que existen tantos.",
  },
  tagSpread: {
    en: "Tag spread — how many distinct tags (colours) are initially assigned to nodes.",
    es: "Spread de etiquetas — cuántas etiquetas distintas (colores) se asignan inicialmente a los nodos.",
  },
};

/** The Box — observable metrics (what each number means). */
export const BOX_OBSERVABLE_DESCS: Record<string, FieldDesc> = {
  n_nodes: {
    en: "Live nodes — points currently active in the substrate graph.",
    es: "Nodos activos — puntos actualmente activos en el grafo del sustrato.",
  },
  n_arcs: {
    en: "Live arcs — relationships (lines) currently active between nodes.",
    es: "Arcos activos — relaciones (líneas) actualmente activas entre nodos.",
  },
  arc_density: {
    en: "Arc density — ratio of arcs to nodes. Higher = more densely connected substrate.",
    es: "Densidad de arcos — proporción de arcos por nodo. Mayor = sustrato más densamente conectado.",
  },
  beta0: {
    en: "Beta-0 (connected components) — number of separate groups of nodes that are not connected to each other. 1 = all one group.",
    es: "Beta-0 (componentes conectados) — número de grupos de nodos separados que no están conectados entre sí. 1 = todos forman un solo grupo.",
  },
  beta1: {
    en: "Beta-1 (independent cycles) — number of independent loops in the graph. 0 = tree-like (no cycles).",
    es: "Beta-1 (ciclos independientes) — número de bucles independientes en el grafo. 0 = tipo árbol (sin ciclos).",
  },
  mean_in_degree: {
    en: "Mean in-degree — average number of incoming relationships per node.",
    es: "Grado de entrada medio — número promedio de relaciones entrantes por nodo.",
  },
  mean_out_degree: {
    en: "Mean out-degree — average number of outgoing relationships per node.",
    es: "Grado de salida medio — número promedio de relaciones salientes por nodo.",
  },
  max_in_degree: {
    en: "Max in-degree — the highest number of incoming relationships any single node receives.",
    es: "Grado de entrada máximo — el mayor número de relaciones entrantes que recibe un solo nodo.",
  },
  gini_in_degree: {
    en: "Gini coefficient of in-degree — measures inequality of incoming connections. 0 = perfectly equal, 1 = one node receives everything.",
    es: "Coeficiente de Gini del grado de entrada — mide la desigualdad de conexiones entrantes. 0 = perfectamente igual, 1 = un nodo recibe todo.",
  },
  largest_component_frac: {
    en: "Largest component fraction — share of all nodes that belong to the biggest connected group.",
    es: "Fracción del componente más grande — proporción de todos los nodos que pertenecen al grupo más grande conectado.",
  },
  tag_entropy: {
    en: "Tag entropy — diversity of node colours/tags. Higher = more varied tag distribution.",
    es: "Entropía de etiquetas — diversidad de colores/etiquetas de nodos. Mayor = distribución de etiquetas más variada.",
  },
  mean_lineage_depth: {
    en: "Mean lineage depth — average length of DESCEND (parent→child) chains from roots to leaves.",
    es: "Profundidad de linaje media — longitud promedio de cadenas DESCEND (padre→hijo) desde raíces hasta hojas.",
  },
  max_lineage_depth: {
    en: "Max lineage depth — length of the longest DESCEND chain. A descendant is a node reached by following parent→child links.",
    es: "Profundidad de linaje máxima — longitud de la cadena DESCEND más larga. Un descendiente es un nodo alcanzado siguiendo enlaces padre→hijo.",
  },
  n_identity_classes: {
    en: "Identity classes — distinct structural groups after FUSE recognition.",
    es: "Clases de identidad — grupos estructurales distintos después del reconocimiento FUSE.",
  },
  n_fusion_classes: {
    en: "Fusion classes — identity classes with more than one member (structures recognised as the same and merged).",
    es: "Clases de fusión — clases de identidad con más de un miembro (estructuras reconocidas como iguales y fusionadas).",
  },
  fused_nodes: {
    en: "Fused nodes — nodes that participated in at least one FUSE identity merge.",
    es: "Nodos fusionados — nodos que participaron en al menos una fusión de identidad FUSE.",
  },
  fused_fraction: {
    en: "Fused fraction — share of the identity-relevant population that was merged into another structure.",
    es: "Fracción fusionada — proporción de la población relevante de identidad que se fusionó en otra estructura.",
  },
};

/** The Box — identity & lineage summary fields. */
export const BOX_IDENTITY_DESCS: Record<string, FieldDesc> = {
  maxDepth: {
    en: "Max depth — longest DESCEND chain from root to leaf. A descendant is any node reached by following parent→child links down the tree.",
    es: "Profundidad máxima — cadena DESCEND más larga desde raíz hasta hoja. Un descendiente es cualquier nodo alcanzado siguiendo enlaces padre→hijo hacia abajo en el árbol.",
  },
  meanDepth: {
    en: "Mean depth — average DESCEND chain length across all nodes.",
    es: "Profundidad media — longitud promedio de cadenas DESCEND en todos los nodos.",
  },
  nFusionClasses: {
    en: "Fusion classes — groups of nodes recognised as structurally equivalent and merged by the FUSE rule.",
    es: "Clases de fusión — grupos de nodos reconocidos como estructuralmente equivalentes y fusionados por la regla FUSE.",
  },
  fusedNodes: {
    en: "Fused nodes — total nodes that took part in at least one FUSE merge.",
    es: "Nodos fusionados — total de nodos que participaron en al menos una fusión FUSE.",
  },
  fusedFraction: {
    en: "Fused fraction — percentage of nodes involved in fusions relative to the total population.",
    es: "Fracción fusionada — porcentaje de nodos involucrados en fusiones respecto a la población total.",
  },
  equivArcs: {
    en: "EQUIV arcs — arcs tagged EQUIV by the FUSE rule, marking sibling structures recognised as equivalent.",
    es: "Arcos EQUIV — arcos etiquetados como EQUIV por la regla FUSE, que marcan estructuras hermanas reconocidas como equivalentes.",
  },
  retiredIds: {
    en: "Retired IDs — nodes removed from the live graph but retained as fusion witnesses (they no longer participate but are remembered).",
    es: "IDs retirados — nodos eliminados del grafo activo pero retenidos como testigos de fusión (ya no participan pero se recuerdan).",
  },
  nLineageCycles: {
    en: "Lineage cycles — DESCEND relationships that looped back on themselves at least once.",
    es: "Ciclos de linaje — relaciones DESCEND que volvieron sobre sí mismas al menos una vez.",
  },
};

/** The Box — foundry rules (what each rule does). */
export const BOX_RULE_DESCS: Record<string, FieldDesc> = {
  GATHER: {
    en: "GATHER — two nodes that both point to the same hub connect directly to each other. Tag 1, weight 0.6.",
    es: "GATHER — dos nodos que apuntan al mismo hub se conectan directamente entre sí. Etiqueta 1, peso 0.6.",
  },
  BOND: {
    en: "BOND — an anchor node and one of its out-neighbors link up when they share 2 in-neighbors. Tag 2, weight 0.4.",
    es: "BOND — un nodo ancla y uno de sus vecinos de salida se enlazan cuando comparten 2 vecinos de entrada. Etiqueta 2, peso 0.4.",
  },
  TAG_PROP: {
    en: "TAG_PROP — an anchor node copies the tag (colour) of one of its out-neighbors.",
    es: "TAG_PROP — un nodo ancla copia la etiqueta (color) de uno de sus vecinos de salida.",
  },
  QUIET: {
    en: "QUIET — a node with no incoming flow for 30 steps is marked QUIET (tag 5).",
    es: "QUIET — un nodo sin flujo entrante durante 30 pasos se marca como QUIET (etiqueta 5).",
  },
  DESCEND: {
    en: "DESCEND — a QUIET node with space spawns a child node with its tag and a jittered payload. The child is a descendant. Tag 3, weight 0.9.",
    es: "DESCEND — un nodo QUIET con espacio genera un nodo hijo con su etiqueta y un payload con jitter. El hijo es un descendiente. Etiqueta 3, peso 0.9.",
  },
  FUSE: {
    en: "FUSE — two sibling nodes with the same tag and similar payload are identified as equivalent; one retires, the EQUIV witness endures. Tag 4.",
    es: "FUSE — dos nodos hermanos con la misma etiqueta y payload similar se identifican como equivalentes; uno se retira, el testigo EQUIV perdura. Etiqueta 4.",
  }
};

/** The Box — engine policies. */
export const BOX_POLICY_DESCS: Record<string, FieldDesc> = {
  uniform: {
    en: "Uniform — every eligible rule has the same chance of being selected each step.",
    es: "Uniforme — cada regla elegible tiene la misma probabilidad de ser seleccionada en cada paso.",
  },
  canonical: {
    en: "Canonical — rules are selected in a fixed priority order (GATHER → BOND → TAG_PROP → QUIET → DESCEND → FUSE).",
    es: "Canónica — las reglas se seleccionan en un orden de prioridad fijo (GATHER → BOND → TAG_PROP → QUIET → DESCEND → FUSE).",
  },
  weighted: {
    en: "Weighted — rules are selected with probability proportional to their configured weight.",
    es: "Ponderada — las reglas se seleccionan con probabilidad proporcional a su peso configurado.",
  },
  roundrobin: {
    en: "RoundRobin — rules are selected in strict rotation, one after another.",
    es: "RoundRobin — las reglas se seleccionan en estricta rotación, una tras otra.",
  },
};

/** Wi-Fi Time Machine — input/output field descriptions. */
export const WTM_DESCS: Record<string, FieldDesc> = {
  signal: {
    en: "Signal (RSSI) — received signal strength in dBm. Closer to 0 = stronger. Not distance.",
    es: "Señal (RSSI) — fuerza de señal recibida en dBm. Más cercano a 0 = más fuerte. No es distancia.",
  },
  frequency: {
    en: "Frequency — Wi-Fi radio frequency in MHz (2.4/5/6 GHz bands).",
    es: "Frecuencia — frecuencia de radio Wi-Fi en MHz (bandas 2.4/5/6 GHz).",
  },
  channel: {
    en: "Channel — 802.11 channel number derived from frequency.",
    es: "Canal — número de canal 802.11 derivado de la frecuencia.",
  },
  bssid: {
    en: "BSSID — the MAC address of the access point (shown raw or SHA-256 sanitized).",
    es: "BSSID — la dirección MAC del punto de acceso (mostrada sin modificar o desinfectada con SHA-256).",
  },
  ssid: {
    en: "SSID — the human-readable name of the Wi-Fi network.",
    es: "SSID — el nombre legible por humanos de la red Wi-Fi.",
  },
  security: {
    en: "Security — authentication suite inferred from the scan (WPA2, WPA3, etc.).",
    es: "Seguridad — suite de autenticación inferida del escaneo (WPA2, WPA3, etc.).",
  },
  avgSignal: {
    en: "Average signal — mean RSSI observed for this network within the time bucket.",
    es: "Señal media — RSSI medio observado para esta red dentro del bucket de tiempo.",
  },
  count: {
    en: "Observation count — how many times this network was seen.",
    es: "Conteo de observaciones — cuántas veces se vio esta red.",
  },
};

/** BLE Radar — input/output field descriptions. */
export const BLE_DESCS: Record<string, FieldDesc> = {
  rssi: {
    en: "RSSI — received signal strength indicator in dBm. Closer to 0 = stronger. RSSI is strength, NOT distance.",
    es: "RSSI — indicador de fuerza de señal recibida en dBm. Más cercano a 0 = más fuerte. RSSI es fuerza, NO distancia.",
  },
  seenAt: {
    en: "Seen at — the epoch second when this observation was recorded.",
    es: "Visto en — el segundo de época cuando se registró esta observación.",
  },
  timesSeen: {
    en: "Times seen — how many observations were recorded for this device.",
    es: "Veces visto — cuántas observaciones se registraron para este dispositivo.",
  },
  appeared: {
    en: "Appeared — the device was first detected in this session.",
    es: "Apareció — el dispositivo fue detectado por primera vez en esta sesión.",
  },
  active: {
    en: "Active — the device was recently detected (within the active window).",
    es: "Activo — el dispositivo fue detectado recientemente (dentro de la ventana activa).",
  },
  fading: {
    en: "Fading — the device has not been detected for a while and is disappearing from the radar.",
    es: "Desvaneciendo — el dispositivo no ha sido detectado hace un tiempo y está desapareciendo del radar.",
  },
  disappeared: {
    en: "Disappeared — the device has not been detected for the full gone window and is removed.",
    es: "Desaparecido — el dispositivo no ha sido detectado durante toda la ventana de desaparición y se elimina.",
  },
  strengthBand: {
    en: "Strength band — RSSI strength category (strong/near/mid/far/weak). These are signal bands, not physical distance.",
    es: "Banda de fuerza — categoría de fuerza RSSI (strong/near/mid/far/weak). Estas son bandas de señal, no distancia física.",
  },
  pseudoAngle: {
    en: "Pseudo-angle — a visual position derived from the MAC address hash. BLE provides no real orientation; this is a convention only.",
    es: "Pseudo-ángulo — una posición visual derivada del hash de la dirección MAC. BLE no proporciona orientación real; esto es solo una convención visual.",
  },
};

/** Process Ecosystem Monitor — field descriptions. */
export const PEM_DESCS: Record<string, FieldDesc> = {
  pid: {
    en: "PID — process identifier (Linux process ID).",
    es: "PID — identificador de proceso (ID de proceso de Linux).",
  },
  ppid: {
    en: "PPID — parent process identifier (the process that spawned this one).",
    es: "PPID — identificador del proceso padre (el proceso que generó este).",
  },
  utime: {
    en: "UTIME — CPU time spent in user mode (jiffies, kernel clock ticks).",
    es: "UTIME — tiempo de CPU en modo usuario (jiffies, ticks del reloj del kernel).",
  },
  stime: {
    en: "STIME — CPU time spent in kernel mode (jiffies).",
    es: "STIME — tiempo de CPU en modo kernel (jiffies).",
  },
  cpuPct: {
    en: "CPU% — percentage of one core used by this process. Calculated as Δ(utime+stime) / (interval × CLK_TCK × ncores) × 100.",
    es: "CPU% — porcentaje de un núcleo usado por este proceso. Calculado como Δ(utime+stime) / (intervalo × CLK_TCK × ncores) × 100.",
  },
  rss: {
    en: "RSS — resident set size: physical memory used by the process, in bytes (shown as MB).",
    es: "RSS — tamaño del conjunto residente: memoria física usada por el proceso, en bytes (mostrado como MB).",
  },
  numThreads: {
    en: "Threads — number of threads in the process.",
    es: "Hilos — número de hilos en el proceso.",
  },
  starttime: {
    en: "Start time — when the process started (ticks since boot). Used with PID to detect PID reuse.",
    es: "Hora de inicio — cuándo empezó el proceso (ticks desde el arranque). Se usa con el PID para detectar reuso de PID.",
  },
  state: {
    en: "State — kernel process state (R=running, S=sleeping, D=uninterruptible sleep, Z=zombie, etc.).",
    es: "Estado — estado del proceso en el kernel (R=ejecutando, S=durmiendo, D=sueño ininterrumpible, Z=zombi, etc.).",
  },
  orphan: {
    en: "Orphan — the process's parent has died and it was re-homed to another living ancestor.",
    es: "Huérfano — el padre del proceso murió y fue reasignado a otro ancestro vivo.",
  },
  spike: {
    en: "Spike — CPU usage above the spike threshold (50% of one core) during this tick.",
    es: "Pico — uso de CPU por encima del umbral de pico (50% de un núcleo) durante este tick.",
  },
  lifecycle: {
    en: "Lifecycle — new (just born) → active/idle (alive) → dying (missing from sweeps) → dead (removed).",
    es: "Ciclo de vida — new (recién nacido) → active/idle (vivo) → dying (desaparece de los barridos) → dead (eliminado).",
  },
  clkTick: {
    en: "CLK_TCK — kernel clock ticks per second (usually 100). Used to convert jiffies to seconds.",
    es: "CLK_TCK — ticks del reloj del kernel por segundo (normalmente 100). Se usa para convertir jiffies a segundos.",
  },
  ncores: {
    en: "NCores — number of CPU cores used for per-core normalization of CPU%.",
    es: "NCores — número de núcleos de CPU usados para la normalización por núcleo de CPU%.",
  },
  intervalSec: {
    en: "Interval — seconds between ticks, used for CPU% calculation.",
    es: "Intervalo — segundos entre ticks, usado para el cálculo de CPU%.",
  },
};

/** Terminal Generative Engine — field descriptions. */
export const GEN_DESCS: Record<string, FieldDesc> = {
  seed: {
    en: "Seed — the deterministic seed. Same seed always produces the same frame.",
    es: "Semilla — la semilla determinista. Misma semilla siempre produce el mismo frame.",
  },
  mode: {
    en: "Mode — the generative algorithm: flowfield (sine field), plasma (closed-form color), or attractor (strange map).",
    es: "Modo — el algoritmo generativo: flowfield (campo de senos), plasma (color de forma cerrada), o attractor (mapa extraño).",
  },
  frame: {
    en: "Frame — the frame number. Each frame is a pure function of (seed, mode, parameters, frame).",
    es: "Frame — el número de frame. Cada frame es una función pura de (semilla, modo, parámetros, frame).",
  },
  fingerprint: {
    en: "World fingerprint — SHA-256 hash over mode + frame + parameters + pixels. Same input = identical fingerprint.",
    es: "Huella dactilar del mundo — hash SHA-256 sobre modo + frame + parámetros + píxeles. Misma entrada = huella idéntica.",
  },
  palette: {
    en: "Palette — the continuous color gradient used to map values to colors.",
    es: "Paleta — el degradado de color continuo usado para mapear valores a colores.",
  },
};

/** The Box — what is it (top-level explanation). */
export const BOX_WHAT_IS_IT: FieldDesc = {
  en: "The Box is a deterministic computational substrate: a graph of nodes and arcs that evolves by applying six local rewriting rules (GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE). It is not a simulation of any real system — it is an abstract model used to demonstrate deterministic graph rewriting, structural metrics, identity derivation, and lineage tracking. Every run with the same seed produces byte-identical results.",
  es: "The Box es un sustrato computacional determinista: un grafo de nodos y arcos que evoluciona aplicando seis reglas locales de reescritura (GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE). No es una simulación de ningún sistema real — es un modelo abstracto usado para demostrar reescritura de grafos determinista, métricas estructurales, derivación de identidad y seguimiento de linaje. Cada ejecución con la misma semilla produce resultados idénticos byte a byte.",
};
