/*
 * =================================================================================================
 * @file useQueryHighlight.ts
 * @description Composable para sincronizar la búsqueda global (query ?q=) con el resaltado visual
 *              en el DOM. Permite registrar elementos, actualizarlos dinámicamente y navegar
 *              entre coincidencias resaltadas de forma precisa.
 * =================================================================================================
 */

import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

/* ────────────────────────────────────────────────────────────────────────────────
🔹 Tipos y variables reactivas
───────────────────────────────────────────────────────────────────────────────────*/
interface HighlightEntry {
  el: HTMLElement;
  originalText: string;
}

const entries = ref<HighlightEntry[]>([]); // Elementos registrados para resaltar
const currentMatchIndex = ref(0); // Índice del resultado actual activo
const searchTerm = ref<string>(""); // Término de búsqueda actual
const flatMatches = ref<{ el: HTMLElement; start: number; end: number }[]>([]); // Lista lineal de matches

let initialized = false;

/* ────────────────────────────────────────────────────────────────────────────────
🔧 Funciones auxiliares
───────────────────────────────────────────────────────────────────────────────────*/

/**
 * Escapa HTML para prevenir inyecciones y mantener el texto plano.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Elimina tildes y diacríticos para permitir búsqueda flexible.
 */
function removeDiacritics(str: string): string {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

/* ────────────────────────────────────────────────────────────────────────────────
✨ Lógica de resaltado de coincidencias
───────────────────────────────────────────────────────────────────────────────────*/

/**
 * Aplica el resaltado a todos los elementos registrados.
 */
function applyHighlighting() {
  flatMatches.value = [];

  if (!searchTerm.value) {
    // Si no hay búsqueda, se restaura el contenido original
    entries.value.forEach(({ el, originalText }) => {
      el.innerHTML = escapeHtml(originalText);
    });
    return;
  }

  const normTerm = removeDiacritics(searchTerm.value).toLowerCase();
  const len = normTerm.length;

  entries.value.forEach(({ el, originalText }) => {
    const normText = removeDiacritics(originalText).toLowerCase();
    const matches: { start: number; end: number }[] = [];

    // Buscar todas las ocurrencias del término
    for (let i = 0; i <= normText.length - len; i++) {
      if (normText.slice(i, i + len) === normTerm) {
        matches.push({ start: i, end: i + len });
      }
    }

    if (!matches.length) {
      el.innerHTML = escapeHtml(originalText);
      return;
    }

    // Generar HTML con <mark> para cada match
    let result = "";
    let last = 0;
    matches.forEach(() => {}); // reset breakpoints if needed

    matches.forEach((m) => {
      result += escapeHtml(originalText.slice(last, m.start));
      const matchIndex = flatMatches.value.length;
      const cls =
        matchIndex === currentMatchIndex.value ? "highlight-current" : "match";
      result += `<mark class="${cls}">${escapeHtml(
        originalText.slice(m.start, m.end)
      )}</mark>`;
      flatMatches.value.push({ el, start: m.start, end: m.end });
      last = m.end;
    });

    result += escapeHtml(originalText.slice(last));
    el.innerHTML = result;
  });
}

/* ────────────────────────────────────────────────────────────────────────────────
🧩 Inicialización (una sola vez por app)
───────────────────────────────────────────────────────────────────────────────────*/

/**
 * Establece el watcher sobre la ruta y activa el sistema.
 */
function initOnce() {
  if (initialized) return;
  initialized = true;

  const route = useRoute();

  watch(
    () => route.query.q,
    (q) => {
      searchTerm.value = (q as string) || "";
      currentMatchIndex.value = 0;
      nextTick(() => applyHighlighting());
    },
    { immediate: true }
  );
}

/**
 * Cuando cambia el resultado activo, hacemos scroll a ese resultado.
 */
watch(currentMatchIndex, () => {
  nextTick(() => {
    const el = document.querySelector(".highlight-current");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

/* ────────────────────────────────────────────────────────────────────────────────
🧩 API pública del composable
───────────────────────────────────────────────────────────────────────────────────*/

export function useQueryHighlight() {
  initOnce();

  /**
   * Registra un nuevo elemento con su contenido de texto original.
   */
  function registerElement(el: HTMLElement, text: string) {
    entries.value.push({ el, originalText: text });
    nextTick(() => applyHighlighting());
  }

  /**
   * Elimina un elemento de la lista (por ejemplo al desmontarlo).
   */
  function unregisterElement(el: HTMLElement) {
    entries.value = entries.value.filter((e) => e.el !== el);
    flatMatches.value = flatMatches.value.filter((m) => m.el !== el);
    currentMatchIndex.value = 0;
  }

  /**
   * Actualiza el texto original de un elemento ya registrado.
   */
  function updateElement(el: HTMLElement, newText: string) {
    const entry = entries.value.find((e) => e.el === el);
    if (entry) {
      entry.originalText = newText;
      nextTick(() => applyHighlighting());
    }
  }

  /**
   * Navega al siguiente resultado.
   */
  function nextMatch() {
    if (!flatMatches.value.length) return;
    currentMatchIndex.value =
      (currentMatchIndex.value + 1) % flatMatches.value.length;
    applyHighlighting();
  }

  /**
   * Navega al resultado anterior.
   */
  function prevMatch() {
    if (!flatMatches.value.length) return;
    currentMatchIndex.value =
      (currentMatchIndex.value - 1 + flatMatches.value.length) %
      flatMatches.value.length;
    applyHighlighting();
  }

  return {
    searchTerm,
    currentMatchIndex,
    totalMatches: () => flatMatches.value.length,
    nextMatch,
    prevMatch,
    registerElement,
    unregisterElement,
    updateElement,
  };
}
