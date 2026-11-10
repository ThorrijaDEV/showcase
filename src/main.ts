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
  title: string;
  hint: string;
  render: (container: HTMLElement) => void;
}

const sections: SectionDef[] = [
  {
    id: "overview",
    title: "Overview",
    hint: "Proyectos",
    render: renderHero,
  },
  {
    id: "wtm",
    title: "Wi-Fi Time Machine",
    hint: "WTM",
    render: renderWifiTimeMachine,
  },
  {
    id: "ble",
    title: "BLE Radar",
    hint: "BLE",
    render: renderBleRadar,
  },
  {
    id: "pem",
    title: "Process Ecosystem Monitor",
    hint: "PEM",
    render: renderProcessEcosystem,
  },
  {
    id: "gen",
    title: "Generative Engine",
    hint: "GEN",
    render: renderGenerativeEngine,
  },
  {
    id: "box",
    title: "The Box",
    hint: "BOX",
    render: renderTheBox,
  },
  {
    id: "fidelity",
    title: "Fidelity & Methodology",
    hint: "FID",
    render: renderFidelity,
  },
];

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
    <p>Engineering Showcase &bull; Modelos deterministas reconstruidos desde c&oacute;digo fuente</p>
  `;
  sidebar.appendChild(brand);

  const nav = document.createElement("nav");
  nav.className = "nav";
  sidebar.appendChild(nav);

  const main = document.createElement("main");
  main.className = "main";
  container.appendChild(sidebar);
  container.appendChild(main);

  let currentId: SectionId = "overview";

  function setSection(id: SectionId) {
    currentId = id;

    // Update nav states
    const items = nav.querySelectorAll<HTMLElement>(".nav-item");
    items.forEach((item) => {
      const itemId = item.dataset.section as SectionId | undefined;
      if (itemId === id) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Render section
    main.innerHTML = "";
    const sec = sections.find((s) => s.id === id)!;

    const header = document.createElement("div");
    header.className = "section-header";
    header.innerHTML = `
      <h2>${sec.title}</h2>
      <p>M&oacute;dulo computacional determinista reconstruido desde el c&oacute;digo fuente original.</p>
      <div class="meta">
        <span>Fidelidad: reconstrucci&oacute;n algor&iacute;tmica</span>
        <span>Sin hardware externo</span>
        <span>Sin claves de API</span>
      </div>
    `;
    main.appendChild(header);

    sec.render(main);
  }

  // Build nav items
  sections.forEach((sec) => {
    const item = document.createElement("a");
    item.className = "nav-item";
    item.href = "#";
    item.dataset.section = sec.id;
    item.textContent = sec.title;
    const hint = document.createElement("span");
    hint.className = "item-hint";
    hint.textContent = sec.hint;
    item.appendChild(hint);
    item.addEventListener("click", (e) => {
      e.preventDefault();
      setSection(sec.id);
    });
    nav.appendChild(item);
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
