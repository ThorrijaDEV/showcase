/**
 * Showcase i18n — runtime dictionary, default EN.
 *
 * Resolution: ?lang=es|en (strict whitelist) > localStorage "showcase-lang" > "en".
 * Selection persists and is reflected in <html lang>, <title>, meta description
 * and every [data-i18n="key"] node (innerHTML semantics, same as the portfolio).
 *
 * Zero dependencies. Mirror the proven mechanism used in Portafolio/i18n.js.
 */

import { dict, Lang } from "./i18n/dict";
export { dict };

const STORAGE_KEY = "showcase-lang";
const DEFAULT_LANG: Lang = "en";

let currentLang: Lang = DEFAULT_LANG;

export function getLang(): Lang {
  return currentLang;
}

/** Resolve the language for this visit. */
export function resolveLang(): Lang {
  const params = new URLSearchParams(location.search);
  const raw = params.get("lang");
  if (raw === "en" || raw === "es") return raw;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch (_) {
    // storage may be blocked; fall through to default
  }
  return DEFAULT_LANG;
}

/** Apply a language to the whole document. */
export function setLang(lang: Lang): void {
  currentLang = lang;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (_) {
    // storage blocked — preference lasts this session only
  }

  document.documentElement.lang = lang;

  // Page title + meta description
  const entry = dict["meta_title"];
  const desc = dict["meta_desc"];
  if (entry) document.title = entry[lang];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && desc) metaDesc.setAttribute("content", desc[lang]);

  // Translate every [data-i18n="key"] node
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n")!;
    const entry = dict[key];
    if (!entry) return;
    const value = entry[lang];
    // Allow simple function-valued entries (e.g. test counts)
    el.innerHTML = value;
  });

  // Notify any section-specific renderers that language changed
  document.dispatchEvent(new Event("showcase:lang"));
}

/** Build the language selector UI (two toggle buttons). */
export function buildLangSelector(): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "lang-selector";
  wrap.setAttribute("aria-label", "Language");
  wrap.style.cssText =
    "display:flex; gap:6px; border:1px solid var(--panel-border); " +
    "background:#0a0a0c; border-radius:var(--radius); padding:2px; font-family:var(--mono); font-size:11px;";

  const makeBtn = (code: Lang, label: string) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-btn";
    btn.dataset.lang = code;
    btn.textContent = label;
    btn.setAttribute("aria-pressed", code === currentLang ? "true" : "false");
    btn.style.cssText =
      "flex:1; padding:3px 8px; background:transparent; border:none; " +
      "color:var(--text-muted); cursor:pointer; text-transform:uppercase;";
    if (code === currentLang) {
      btn.style.color = "var(--text)";
      btn.style.background = "var(--panel)";
      btn.style.borderRadius = "var(--radius)";
    }
    btn.addEventListener("click", () => {
      if (code === currentLang) return;
      setLang(code);
      refreshSelector(wrap);
    });
    return btn;
  };

  const enBtn = makeBtn("en", dict.lang_label_en.en);
  const esBtn = makeBtn("es", dict.lang_label_es.es);
  wrap.appendChild(enBtn);
  wrap.appendChild(esBtn);

  function refreshSelector(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>(".lang-btn").forEach((b) => {
      const code = b.dataset.lang as Lang;
      const active = code === currentLang;
      b.setAttribute("aria-pressed", active ? "true" : "false");
      b.style.color = active ? "var(--text)" : "var(--text-muted)";
      b.style.background = active ? "var(--panel)" : "transparent";
      b.style.borderRadius = active ? "var(--radius)" : "";
    });
  }

  document.addEventListener("showcase:lang", () => refreshSelector(wrap));
  return wrap;
}

/** Initialize i18n at boot: resolve + apply + return the selector element. */
export function initI18n(): HTMLElement {
  const lang = resolveLang();
  setLang(lang);
  return buildLangSelector();
}
