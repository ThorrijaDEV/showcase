/**
 * THORRIJA Engineering Showcase — Main Application
 *
 * Bootstraps the shell, navigation, and section rendering.
 * All computational models are imported from ../models/ and consumed
 * through a clean separation between logic and UI.
 */

import { WifiTimeMachineModel } from "@models/wifi-time-machine";
import { BleRadarModel } from "@models/ble-radar";
import { ProcessEcosystemModel } from "@models/process-ecosystem";
import { GenerativeEngineModel } from "@models/generative-engine";
import { TheBoxModel } from "@models/the-box";

import { renderHero } from "./sections/hero";
import { renderWifiTimeMachine } from "./sections/wtm";
import { renderBleRadar } from "./sections/ble-radar";
import { renderProcessEcosystem } from "./sections/process-ecosystem";
import { renderGenerativeEngine } from "./sections/generative-engine";
import { renderFidelity } from "./sections/fidelity";
import { renderTheBox } from "./sections/the-box";

import { initI18n, getLang } from "./i18n";
import { dict } from "./i18n/dict";

// ---------------------------------------------------------------------------
// Model instances (singletons — stateful, reset per demo run)
// ---------------------------------------------------------------------------

const models = {
  wtm: new WifiTimeMachineModel(),
  ble: new BleRadarModel(),
  pem: new ProcessEcosystemModel(),
  gen: new GenerativeEngineModel(),
  box: new TheBoxModel(),
};

// ---------------------------------------------------------------------------
// Section registry
// ---------------------------------------------------------------------------

type SectionId =
  | "overview"
  | "wtm"
  | "ble"
  | "pem"
  | "gen"
  | "box"
  | "fidelity";

interface SectionDef {
  id: SectionId;
  titleKey: string;
  hintKey: string;
  render: (container: HTMLElement) => void;
}

const sections: SectionDef[] = [
  { id: "overview", titleKey: "nav_overview", hintKey: "nav_overview", render: renderHero },
  { id: "wtm", titleKey: "nav_wtm", hintKey: "nav_wtm", render: renderWifiTimeMachine },
  { id: "ble", titleKey: "nav_ble", hintKey: "nav_ble", render: renderBleRadar },
  { id: "pem", titleKey: "nav_pem", hintKey: "nav_pem", render: renderProcessEcosystem },
  { id: "gen", titleKey: "nav_gen", hintKey: "nav_gen", render: renderGenerativeEngine },
  { id: "box", titleKey: "nav_box", hintKey: "nav_box", render: renderTheBox },
  { id: "fidelity", titleKey: "nav_fidelity", hintKey: "nav_fidelity", render: renderFidelity },
];

function dictGet(key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[getLang()];
}

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

function buildShell(container: HTMLElement): { main: HTMLElement; setSection: (id: SectionId) => void } {
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";

  const brand = document.createElement("div");
  brand.className = "brand";
  brand.innerHTML = `
    <h1>THORRIJA</h1>
    <p data-i18n="brand_line"></p>
  `;
  sidebar.appendChild(brand);

  // Language selector (EN | ES), mounted under the brand block.
  sidebar.appendChild(initI18n());

  const nav = document.createElement("nav");
  nav.className = "nav";
  sidebar.appendChild(nav);

  const main = document.createElement("main");
  main.className = "main";
  container.appendChild(sidebar);
  container.appendChild(main);

  let currentId: SectionId = "overview";
  const items: HTMLElement[] = [];

  function updateNavLabels(): void {
    items.forEach((item) => {
      const itemId = item.dataset.section as SectionId | undefined;
      if (!itemId) return;
      const sec = sections.find((s) => s.id === itemId)!;
      item.querySelector(".item-title")!.textContent = dictGet(sec.titleKey);
      item.querySelector(".item-hint")!.textContent = dictGet(sec.hintKey);
    });
  }

  function setSection(id: SectionId) {
    currentId = id;

    items.forEach((item) => {
      item.classList.toggle("active", item.dataset.section === id);
    });

    main.innerHTML = "";
    const sec = sections.find((s) => s.id === id)!;

    const header = document.createElement("div");
    header.className = "section-header";
    header.innerHTML = `
      <h2 data-i18n="${sec.titleKey}"></h2>
      <p data-i18n="section_lede"></p>
      <div class="meta">
        <span data-i18n="chip_fidelity"></span>
        <span data-i18n="chip_no_hardware"></span>
        <span data-i18n="chip_no_api"></span>
      </div>
    `;
    main.appendChild(header);

    sec.render(main);
  }

  sections.forEach((sec) => {
    const item = document.createElement("a");
    item.className = "nav-item";
    item.href = "#";
    item.dataset.section = sec.id;

    const title = document.createElement("span");
    title.className = "item-title";
    title.textContent = dictGet(sec.titleKey);

    const hint = document.createElement("span");
    hint.className = "item-hint";
    hint.textContent = dictGet(sec.hintKey);

    item.appendChild(title);
    item.appendChild(hint);
    items.push(item);

    item.addEventListener("click", (e) => {
      e.preventDefault();
      setSection(sec.id);
    });
    nav.appendChild(item);
  });

  // React to language switches (nav labels are outside [data-i18n] flow).
  document.addEventListener("showcase:lang", () => {
    updateNavLabels();
  });

  // Start
  setSection("overview");

  return { main, setSection };
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

function boot() {
  const app = document.getElementById("app")!;
  app.innerHTML = `<div class="shell"></div>`;
  const shell = app.querySelector(".shell")! as HTMLElement;
  buildShell(shell);
}

document.addEventListener("DOMContentLoaded", boot);
