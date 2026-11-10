# Gate 1 — Auditoría y línea base (rediseño humano-centrado)

Fecha: 2026-11-10 · Método: auditoría read-only por subagente + verificación directa de build/tests/PDFs.

## Qué es público y qué es interno

- Público: UI del showcase (`index.html`, `src/`, `styles.css`), Portafolio (`index.html`, `i18n.js`, `main.js`, `styles.css`, `assets/`, `robots.txt`, `sitemap.xml`), y los PDFs enlazados (`report/Thorrija-Engineering-Showcase.es.pdf`, `.en.pdf`).
- Interno: los 13 `.md` del showcase (53 menciones de rutas locales `/home/thorrija/…`), `admin.*`, `index.html.bak`, generadores de PDF.
- `index.html.bak` está en la raíz web de Portafolio y GitHub Pages lo serviría públicamente. Hay que moverlo fuera o borrarlo.

### Backups (nada sobrescrito)

- Original previo sin tocar: `/home/thorrija/showcase-backup-20261110-165721/`
- Nuevos: `/home/thorrija/backups/{showcase,Portafolio,report}-preRedesign-20261110-180232.tar.gz`
- `/home/thorrija/the-box/` verificado limpio (`git status` vacío, HEAD 78cbec5). Read-only respetado.

## Línea base verificada

- Tests: `models/` 4 suites, **102/102** (jest directo). Root con `jest.config.js`: 4 suites, **80/80**. Total **182/182**. Números de `hero.ts` (18/16/22/24/42) coinciden archivo a archivo.
- Build: `tsc --noEmit` limpio; Vite build 160.69 kB JS / 7.50 kB CSS, 219 ms. Cero dependencias runtime.
- PDFs reales (PyMuPDF): dossier técnico EN **29 pág** (633,065 B), `Technico.pdf` ES **12 pág** (42,585 B), `.es.pdf` **10 pág** (54,129 B), `.en.pdf` **10 pág** (52,968 B). Los links del Portafolio resuelven contra `.es/.en` correctamente a nivel local.

## Veredicto de estética

El showcase **no tiene** la estética AI genérica: sin glassmorphism, sin glows, sin emojis, sin contadores falsos, gradientes decorativos cero (1 uso funcional en el wordmark), radios de 4px, animaciones solo funcionales. Lo que produce impresión de IA es el **estado del texto**: una queja persistente en este proyecto es exactamente esa. El rediseño es entonces: (1).compiler corregir los strings rotos y homogeneizar la voz, (2) resolver el bilingüismo real, (3) cubrir SEO que sí falta. La identidad visual existente (oscura, industrial, monoespaciada) se conserva.

### Estado de idioma del showcase (mixto, sin infraestructura)

- `<html lang="es">` con `<title>` en inglés; badges EN ("zero deps", "Level 4") con botones ES ("Ejecutar modelo"); "(no data)" EN en canvas ES. Cero componentes de i18n (sin diccionario, sin selector, sin `?lang`, sin persistencia).
- Portafolio: i18n real vía `data-i18n` + diccionario + `localStorage`, pero EN incompleto: hardcode/obvious ES en hero-foot, manifesto, side-works, certificados, footer, toasts; `<title>`/meta/og: nunca cambian de idioma; `?lang` no soportado; sin hreflang.

## Defectos registrados

### Bloqueantes (afirman cosas falsas / fuga)
| # | Defecto | Evidencia |
|---|---|---|
| B1 | `/home/thorjima/` sigue publicado en un doc | `showcase/VALIDATION_REPORT.md:9` |
| B2 | Doc de validación de PDF con cifras falsas: 25 pág (real 29), tamaño 633,038 (real 633,065), "7 imágenes" (real 6 por página) | `report/TECHNICAL_PDF_VALIDATION.md:14-16,47-50,52`, espejado en `FINAL_PRESENTATION_READINESS.md:49,81`, `SYSTEM_WIDE_VALIDATION.md:126` |

### Mayores (rompen funcionalidad o contenido se ve dos veces)
| # | Defecto | Evidencia |
|---|---|---|
| M1 | Redimensionar borra el heatmap: handler dibuja desde `outState.lastOutput`, asignado en ningún sitio | `wtm.ts:325-329` |
| M2 | GenArt pinta un parche ~100×80 inscalado en la esquina de un canvas 600×420 (`pxPerCell*` calculado y no usado) | `generative-engine.ts:144-156` |
| M3 | Datos muertos: `netObs` computado y descartado | `wtm.ts:302-303` |
| M4 | Entidades/acentos corruptos visibles en UI: `M&eacutetricas` (`process-ecosystem.ts:91`), `·ltimos` (`ble-radar.ts:45`), `par·metros` ×5 (`generative-engine.ts:21,65,79,92,102`), `se~nal` ×2 (`fidelity.ts:26,94`) |
| M5 | Portafolio: las 18 descripciones de proyecto se renderizan dos veces (texto fuera + dentro del span `data-i18n`, sin regla CSS que oculte) | `index.html:244-533` |
| M6 | Portafolio EN parcial (ver sección idioma) y toasts ES en vista EN (`main.js:232-241`) |

### Menores (pulido)
T163: `ángel`→`ángulo` (`ble-radar.ts:33`), `inváldo` (`process-ecosystem.ts:138`), `Vainilla`→`Vanilla` (`index.html:365`), `ciberseguridad.Diseño` sin espacio (fallback pre-JS, `index.html:145`); imports TAG_* sin uso (`the-box.ts:12-13`); doble ejecución del modelo Box para obtener State (`the-box.ts:356-371`); reset limpia solo 400×300 CSS-px del canvas Box (`the-box.ts:423`); CSS muerto (`styles.css:159-171, 426-441, 443-454`); `substr` deprecado (`wtm.ts:235`); foco de input solo con outline:none (`styles.css:319`); Box "42 tests" en hero (el modelo total es 102; documentado como 42+25+12+23); docs que dicen "6 tarjetas/6 renderers" (5/7); loops infinitos decorativos retenibles (`styles.css:519, 722`); claves i18n muertas y `proj_genart*` sin target (`i18n.js:103-104`); alias de Vite dependiente de `process.cwd()` (`vite.config.ts:17`); "Presentación técnica para UMA" en diccionario (`i18n.js:138,270`) — universalizar.
Typo coincidente: "·" usado como interpunct en strings corrompidas (M4) y como separador legítimo en lists (`ble-radar.ts:232-235`) — solo tocar los rotos.

## SEO/Meta faltante (showcase)

Sin `<meta og:*>`, sin favicon, sin canonical, sin robots/sitemap, sin hreflang; descripción EN con `lang="es"`. Portafolio: completo salvo hreflang y meta que no cambia de idioma con la vista.

## Decisiones de conservación (justificadas)

- Sistema de diseño industrial-oscuro del showcase (tokens 4px, mono, canvas): se conserva, no se reemplaza por otro lenguaje genérico.
- Monocultura tipográfica Portafolio y su scrollspy/inert menu/JSON-LD: correctos, se queda.
- Loops `arc-spin`/`cue`: funcionales como indicadores de vida; se revisan solo si la prueba de motion法则 los marca.
- Sin README en el showcase (decisión del usuario, se respeta). El README del Portafolio será auditado en Gate 2 (debe ser breve y no manual de desarrollo).
- La palabra del trabajo es siempre "construcción/implementación" (inglés: build/implement). Se descartó cualquier fórmula de investigación; recuento de la palabra "investigando" en A/B/C: 0 por ahora.

## Puntualizaciones resueltas en línea base

- "182 tests" documentado en docs: correcto, archivo por archivo.
- Fidelidad Box: ninguna afirmación de compatibilidad de hashes cross-language (cero hits de "byte-identical"/"same hash"); comprobado en 13 docs + PDFs. Nivel 3 se mantiene y se comunica como equivalencia estructural.
- `apps/certs/python-1.png` "missing" es falso positivo: vive dentro de un comentario HTML explicativo.

## Estado de repos

- `showcase`: limpio, ya en `github.com/ThorrijaDEV/showcase` (master).
- `models`: limpio, remote creado pero **sin refs** (push nunca completó). Pendiente de autorización.
- `Portafolio`: limpio, es origin/main actualizado tras rebase (14dfdd0).
- Los cambios del rediseño se commitean localmente al terminar cada gate; **publish requiere señal explícita del usuario**.
