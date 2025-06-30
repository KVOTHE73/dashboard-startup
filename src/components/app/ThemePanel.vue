<!--
===================================================================================================================================================
🔷 ThemePanel
    💡 esta vista gestiona lo siguiente: Barra lateral derecha con los ajustes generales de la aplicación
        🔶 Por defecto este componente está visible en todas las vistas 
        🔶 Click en ⚙️ muestra el contenido del panel, click en ✖️ lo oculta           
        🔶 Se pueden ajustar los colores globales de la aplicación, el modo oscuro / claro y switches con opciones como:
                🔹 Ocultar cabecera: muestra / oculta el header (por defecto desactivado => se muestra)
                🔹 Cabecera fija: header flotante / fijo (por defecto activado => header fijo)
                🔹 Cabecera invertida: header oscuro / claro (por defecto desactivado => header claro)
                🔹 Ocultar sidebar: muestra / oculta el sidebar (por defecto desactivado => se muestra)
                🔹 Sidebar fija: sidebar flotante / fijo (por defecto activado => sidebar fija)
                🔹 Sidebar invertida: sidebar claro / oscuro (por defecto desactivado => sidebar oscuro)
                🔹 Sidebar con rejilla: cambio entre rejilla en los items de la sidebar (por defecto desactivado => sin rejilla)
                🔹 Activar gradiente: cambio entre gradiente (background del color del tema) en los items de la sidebar 
                (por defecto desactivado => sin gradiente)
===================================================================================================================================================
-->
<template>
  <!-- ─── 📌 Contenedor del panel ─────────────────────────────────────────────────── -->
  <div
    class="theme-panel"
    v-bind:class="{ active: appOption.appThemePanelToggled }"
  >
    <a
      href="javascript:;"
      v-on:click="appThemePanelToggled"
      class="theme-collapse-btn"
      ><i class="fa fa-cog"></i
    ></a>
    <perfect-scrollbar class="theme-panel-content h-100">
      <!-- 🔹 Paleta de colores -->
      <h5>Ajustes de color</h5>
      <div class="theme-list">
        <div
          class="theme-list-item"
          v-bind:class="{
            active:
              appOption.appThemeClass == theme.themeClass ||
              (!appOption.appThemeClass && theme.name == 'Default'),
          }"
          v-for="theme in themeList"
        >
          <a
            href="javascript:;"
            class="theme-list-link"
            v-bind:class="theme.bgClass"
            v-on:click="(event) => toggleTheme(event, theme.themeClass)"
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            data-bs-container="body"
            v-bind:data-bs-title="theme.name"
            >&nbsp;</a
          >
        </div>
      </div>

      <div class="theme-panel-divider"></div>

      <!-- 🔹 Modo claro (defecto) / oscuro -->
      <div class="row mt-10px">
        <div class="col-8 control-label text-dark fw-bold">
          <div>Modo oscuro</div>
        </div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              v-on:change="toggleDarkMode()"
              v-model="appOption.appDarkMode"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appThemeDarkMode"
              >&nbsp;</label
            >
          </div>
        </div>
      </div>

      <div class="theme-panel-divider"></div>

      <!-- 🔹 Switches con opciones de configuración del header y el sidebar  -->
      <div class="row mt-10px align-items-center">
        <!-- Cabecera (header) -->
        <div class="col-8 control-label text-dark fw-bold">
          Ocultar cabecera
        </div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appHeaderFixed"
              v-on:change="toggleHeaderHide()"
              v-model="appOption.appHeaderHide"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appHeaderFixed">&nbsp;</label>
          </div>
        </div>
      </div>
      <div class="row mt-10px align-items-center">
        <div class="col-8 control-label text-dark fw-bold">Cabecera fija</div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appHeaderFixed"
              v-on:change="toggleHeaderFixed()"
              v-model="appOption.appHeaderFixed"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appHeaderFixed">&nbsp;</label>
          </div>
        </div>
      </div>
      <div class="row mt-10px align-items-center">
        <div class="col-8 control-label text-dark fw-bold">
          Cabecera invertida
        </div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appHeaderInverse"
              v-on:change="toggleHeaderInverse()"
              v-model="appOption.appHeaderInverse"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appHeaderInverse"
              >&nbsp;</label
            >
          </div>
        </div>
      </div>
      <!-- sidebar -->
      <div class="row mt-10px align-items-center">
        <div class="col-8 control-label text-dark fw-bold">Ocultar sidebar</div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appSidebarFixed"
              v-on:change="toggleSidebarHide()"
              v-model="appOption.appSidebarHide"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appSidebarFixed">&nbsp;</label>
          </div>
        </div>
      </div>
      <div class="row mt-10px align-items-center">
        <div class="col-8 control-label text-dark fw-bold">Sidebar fija</div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appSidebarFixed"
              v-on:change="toggleSidebarFixed()"
              v-model="appOption.appSidebarFixed"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appSidebarFixed">&nbsp;</label>
          </div>
        </div>
      </div>
      <div class="row mt-10px align-items-center">
        <div class="col-8 control-label text-dark fw-bold">
          Sidebar invertida
        </div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appSidebarFixed"
              v-on:change="toggleSidebarLightEnabled()"
              v-model="appOption.appSidebarLight"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appSidebarFixed">&nbsp;</label>
          </div>
        </div>
      </div>
      <div class="row mt-10px align-items-center">
        <div class="col-8 control-label text-dark fw-bold">
          Sidebar con rejilla
        </div>
        <div class="col-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appSidebarGrid"
              v-on:change="toggleSidebarGrid()"
              v-model="appOption.appSidebarGrid"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appSidebarGrid">&nbsp;</label>
          </div>
        </div>
      </div>
      <div class="row mt-10px align-items-center">
        <div class="col-md-8 control-label text-dark fw-bold">
          Activar gradiente
        </div>
        <div class="col-md-4 d-flex">
          <div class="form-check form-switch ms-auto mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              id="appGradientEnabled"
              v-on:change="toggleGradientEnabled()"
              v-model="appOption.appGradientEnabled"
              true-value="true"
              false-value=""
            />
            <label class="form-check-label" for="appGradientEnabled"
              >&nbsp;</label
            >
          </div>
        </div>
      </div>

      <div class="theme-panel-divider"></div>

      <!-- 🔹 copyright -->
      <div class="text-gray-600 text-center text-gray-500-darker mb-0">
        &copy; Nacho Rodríguez 2025
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script setup lang="ts">
// ─── 📌 Core ───────────────────────────────────────────────────
import { onMounted } from "vue";

// ─── 📌 Plugins ────────────────────────────────────────────────
import * as bootstrap from "bootstrap";

// ─── 📌 Composables ────────────────────────────────────────────
import useEmitter from "@/composables/useEmitter.ts";

// ─── 📌 Stores ─────────────────────────────────────────────────
import { useAppOptionStore } from "@/stores/app-option";
import { useAppVariableStore, generateVariables } from "@/stores/app-variable";

// ─── 📌 Instancias ─────────────────────────────────────────────
const appOption = useAppOptionStore();
const appVariable = useAppVariableStore();
const emitter = useEmitter();

// ─── 📌 Estado reactivo ────────────────────────────────────────

// Paleta de Colores
const themeList = [
  { name: "Rojo", bgClass: "bg-red", themeClass: "theme-red" },
  { name: "Rosa", bgClass: "bg-pink", themeClass: "theme-pink" },
  { name: "Naranja", bgClass: "bg-warning", themeClass: "theme-warning" },
  { name: "Amarillo", bgClass: "bg-yellow", themeClass: "theme-yellow" },
  { name: "Lima", bgClass: "bg-lime", themeClass: "theme-lime" },
  { name: "Verde", bgClass: "bg-green", themeClass: "theme-green" },
  {
    name: "Aguamarina (Por defecto)",
    bgClass: "bg-teal",
    themeClass: "theme-teal",
  },
  { name: "Cian", bgClass: "bg-info", themeClass: "theme-info" },
  { name: "Azul", bgClass: "bg-primary", themeClass: "theme-primary" },
  { name: "Purpura", bgClass: "bg-purple", themeClass: "theme-purple" },
  { name: "Indigo", bgClass: "bg-indigo", themeClass: "theme-indigo" },
  { name: "Negro", bgClass: "bg-black", themeClass: "theme-gray-600" },
];

// ─── 📌 Funciones auxiliares ───────────────────────────────────
/**
 * @description recarga de variabes al pasar de modo claro a oscuro y vice versa
 */
const reloadVariable = (): void => {
  var newVariables = generateVariables();
  appVariable.font = newVariables.font;
  appVariable.color = newVariables.color;
};

/**
 * @description apertura / cierre del them panel (por defecto cerrado)
 * @param event Evento click
 */
const appThemePanelToggled = (event: Event): void => {
  event.preventDefault();

  appOption.appThemePanelToggled = !appOption.appThemePanelToggled;
  localStorage.setItem(
    "appThemePanelToggled",
    appOption.appThemePanelToggled ? "true" : ""
  );
};

/**
 * @description eliminación del color de tema preexistente y añadido del nuevo seleccionado
 * @param themeClass Color seleccionado
 */
const setThemeClass = (themeClass: string): void => {
  for (var x = 0; x < document.body.classList.length; x++) {
    var targetClass = document.body.classList[x];
    if (targetClass.search("theme-") > -1) {
      document.body.classList.remove(targetClass);
    }
  }
  document.body.classList.add(themeClass);
  appVariable.color.theme = getComputedStyle(document.body)
    .getPropertyValue("--bs-app-theme")
    .trim();
  appVariable.color.themeRgb = getComputedStyle(document.body)
    .getPropertyValue("--bs-app-theme-rgb")
    .trim();

  emitter.emit("theme-reload", true);
};

/**
 * @description cambio de color en la Paleta de Colores
 * @param event Evento click
 * @param themeClass Color seleccionado
 */
const toggleTheme = (event: Event, themeClass: string): void => {
  event.preventDefault();

  appOption.appThemeClass = themeClass;

  if (localStorage) {
    localStorage.appThemeClass = appOption.appThemeClass;
  }
  setThemeClass(localStorage.appThemeClass);
};

/**
 * @description eliminación del tema (oscuro o claro) preexistente y añadido del nuevo seleccionado
 *  @param darkMode modo seleccionado, si "true" oscuro si "false" claro
 */
const setDarkMode = (darkMode: string) => {
  const html = document.querySelector("html");
  if (!html) return;

  if (darkMode === "true") {
    html.setAttribute("data-bs-theme", "dark");
  } else {
    html.removeAttribute("data-bs-theme");
  }

  reloadVariable();
  emitter.emit("theme-reload", true);
};

/**
 * @description cambio a modo oscuro / claro
 */
const toggleDarkMode = (): void => {
  if (localStorage) {
    localStorage.appDarkMode = appOption.appDarkMode;
  }
  setDarkMode(localStorage.appDarkMode);
};

/**
 * @description cambio entre cabecera oculta / visible (defecto)
 */
const toggleHeaderHide = () => {
  if (localStorage) {
    localStorage.appHeaderHide = appOption.appHeaderHide;
  }
};

/**
 * @description cambio entre cabecera flotante / fija (defecto)
 */
const toggleHeaderFixed = (): void => {
  if (!appOption.appHeaderFixed && appOption.appSidebarFixed) {
    appOption.appSidebarFixed = false;
    localStorage.appSidebarFixed = appOption.appSidebarFixed;
    alert(
      "La opción de cabecera por defecto con sidebar fija no está soportada. Procede con ambas por defecto o ambas fijas."
    );
  }
  if (localStorage) {
    localStorage.appHeaderFixed = appOption.appHeaderFixed;
  }
};

/**
 * @description cambio entre cabecera oscura / clara (defecto)
 */
const toggleHeaderInverse = (): void => {
  if (localStorage) {
    localStorage.appHeaderInverse = appOption.appHeaderInverse;
  }
};

/**
 * @description cambio entre sidebar oculta / visible (defecto)
 */
const toggleSidebarHide = (): void => {
  if (localStorage) {
    localStorage.appSidebarHide = appOption.appSidebarHide;
  }
};

/**
 * @description cambio entre sidebar flotante / fija (defecto)
 */
const toggleSidebarFixed = () => {
  if (!appOption.appHeaderFixed && appOption.appSidebarFixed) {
    appOption.appHeaderFixed = true;
    localStorage.appHeaderFixed = appOption.appHeaderFixed;
    alert(
      "Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar."
    );
  }
  if (localStorage) {
    localStorage.appSidebarFixed = appOption.appSidebarFixed;
  }
};

/**
 * @description cambio entre sidebar clara / oscura (defecto)
 */
const toggleSidebarLightEnabled = () => {
  if (localStorage) {
    localStorage.appSidebarLightEnabled = appOption.appSidebarLight;
  }
};

/**
 * @description cambio entre rejilla en los items de la sidebar o no (defecto)
 */
const toggleSidebarGrid = (): void => {
  if (localStorage) {
    localStorage.appSidebarGrid = appOption.appSidebarGrid;
  }
};

/**
 * @description cambio entre gradiente (background del color del tema) en los items de la sidebar o no (defecto)
 */
const toggleGradientEnabled = () => {
  if (localStorage) {
    localStorage.appGradientEnabled = appOption.appGradientEnabled;
  }
};

// ─── 📌 Ciclo de vida ──────────────────────────────────────────
onMounted(() => {
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach((el) => new (bootstrap as any).Tooltip(el));

  if (localStorage) {
    if (typeof localStorage.appThemePanelToggled !== "undefined") {
      appOption.appThemePanelToggled = localStorage.appThemePanelToggled;
    }
    if (typeof localStorage.appThemeClass !== "undefined") {
      appOption.appThemeClass = localStorage.appThemeClass;
      setThemeClass(localStorage.appThemeClass);
    }
    if (typeof localStorage.appDarkMode !== "undefined") {
      appOption.appDarkMode = localStorage.appDarkMode;
      setDarkMode(appOption.appDarkMode);
    }
    if (typeof localStorage.appHeaderInverse !== "undefined") {
      appOption.appHeaderInverse = localStorage.appHeaderInverse;
    }
    if (typeof localStorage.appHeaderFixed !== "undefined") {
      appOption.appHeaderFixed = localStorage.appHeaderFixed;
    }
    if (typeof localStorage.appSidebarFixed !== "undefined") {
      appOption.appSidebarFixed = localStorage.appSidebarFixed;
    }
    if (typeof localStorage.appSidebarLight !== "undefined") {
      appOption.appSidebarLight = localStorage.appSidebarLight;
    }
    if (typeof localStorage.appHeaderInverse !== "undefined") {
      appOption.appSidebarGrid = localStorage.appSidebarGrid;
    }
    if (typeof localStorage.appGradientEnabled !== "undefined") {
      appOption.appGradientEnabled = localStorage.appGradientEnabled;
    }
  }
});
</script>
