<!--
===================================================================================================================================================
🔷 Header
    💡 esta vista gestiona lo siguiente: Cabecera (header) superior
        🔶 Por defecto este componente está visible en todas las vistas excepto en el login  
        🔶 El componente cambia para situarse en dos líneas en pantallas móviles        
        🔶 Este componente maneja múltiples opciones, de izquierda a derecha:
                🔹 Icono que oculta / muestra la sidebar
                🔹 Título de la aplicación
                🔹 Componente mega-menu, cuando esta presente, que abre un menú inferior debajo del header
                🔹 Searchbar para búsqueda de coincidencias en las vistas, con número de resultados y navegación a ellos 
                🔹 Campana con dropdown para mostrar notificaciones del usuario logueado
                🔹 Dropdown de cambio de idioma, si existe
                🔹 Imagen, nombre y dropdown de opciones del usuario logueado
                🔹 Botón de apertura / cierre de la sidebar derecha cuando ésta está presente
===================================================================================================================================================
-->
<template>
  <!-- ─── 📌 Contenedor del header ─────────────────────────────────────────────────── -->
  <div
    id="header"
    class="app-header"
    :data-bs-theme="appOption.appHeaderInverse ? 'dark' : ''"
  >
    <!-- ─── 📌 Opciones en la parte izquierda ──────────────────────────────────────── -->
    <div class="navbar-header">
      <!-- 🔹 Botón que abre / cierra la segunda sidebar, si está presente, en vistas móvil -->
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="appOption.appSidebarTwo"
        v-on:click="toggleAppSidebarEndMobileToggled"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <!-- 🔹 Botón que abre / cierra la sidebar y título del proyecto -->
      <div class="navbar-brand d-flex align-items-center">
        <!-- Sólo este <a> es clicable y solo se muestra en pantallas mayores a 768px-->
        <a
          href="#"
          @click.prevent="toggleSidebar"
          class="navbar-logo d-none d-md-inline-block"
          style="cursor: pointer"
        ></a>
        <!-- El texto ni está en enlace, ni tiene pointer-events -->
        <span class="ms-2" style="cursor: default; user-select: none">
          <b>Panel</b>Admin
        </span>
      </div>

      <!-- 🔹 Botón que abre / cierra el mega-menú inferior, si está presente -->
      <button
        type="button"
        class="navbar-mobile-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#top-navbar"
        v-if="appOption.appHeaderMegaMenu && !appOption.appSidebarTwo"
      >
        <span class="fa-stack fa-lg">
          <i class="far fa-square fa-stack-2x"></i>
          <i class="fa fa-cog fa-stack-1x mt-1px"></i>
        </span>
      </button>

      <!-- 🔹 Botón que abre / cierra el mega-menú inferior, si está presente, en vistas móvil -->
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="
          appOption.appTopMenu &&
          !appOption.appSidebarHide &&
          !appOption.appSidebarTwo
        "
        v-on:click="toggleAppTopMenuMobileToggled"
      >
        <span class="fa-stack fa-lg">
          <i class="far fa-square fa-stack-2x"></i>
          <i class="fa fa-cog fa-stack-1x mt-1px"></i>
        </span>
      </button>

      <!-- 🔹 Botón hamburguesa que abre / cierra la sidebar en vistas móvil -->
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="
          appOption.appTopMenu &&
          appOption.appSidebarHide &&
          !appOption.appSidebarTwo
        "
        v-on:click="toggleAppTopMenuMobileToggled($event)"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <button
        type="button"
        class="navbar-mobile-toggler"
        v-if="!appOption.appSidebarHide"
        v-on:click="toggleAppSidebarMobileToggled"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <!-- 🔹 Componente mega-menu inferior -->
    <app-header-mega-menu v-if="appOption.appHeaderMegaMenu" />

    <!-- ─── 📌 Opciones en la parte derecha ──────────────────────────────────────── -->
    <div class="navbar-nav">
      <!-- 🔍 Barra de búsqueda con contador y navegación -->
      <div class="navbar-item navbar-form">
        <form action="" method="POST" name="search" v-on:submit="onSearch">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar..."
              v-model="term"
              @keyup.enter="onSearch"
            />
            <button type="submit" class="btn btn-search">
              <i class="fa fa-search"></i>
              <i
                v-if="term"
                class="ms-1 fas fa-times fs-17px mb-1"
                style="color: red"
                v-on:click="clearSearch"
              ></i>
            </button>
          </div>
        </form>
      </div>
      <!-- contador y navegación -->
      <div
        v-if="term && searched && totalMatches() > 0"
        class="d-flex align-items-center mt-1"
      >
        <small class="ms-1">
          {{ currentMatchIndex + 1 }} / {{ totalMatches() }} resultados
        </small>
        <i
          class="ms-1 fas fa-arrow-up mb-1 cursor-pointer"
          @click="prevMatch"
        ></i>
        <i
          class="ms-1 fas fa-arrow-down mb-1 cursor-pointer"
          @click="nextMatch"
        ></i>
      </div>
      <span v-if="term && searched && totalMatches() == 0"
        >No hay resultados</span
      >

      <!--🔹 notificaciones del usuario logueado, campana y dropdown -->
      <div class="navbar-item dropdown">
        <a
          href="javascript:;"
          data-bs-toggle="dropdown"
          class="navbar-link dropdown-toggle icon"
        >
          <i class="fa fa-bell"></i>
          <span class="badge">{{ notificationData.length }}</span>
        </a>
        <div class="dropdown-menu media-list dropdown-menu-end">
          <div class="dropdown-header">
            NOTIFICACIONES ({{ notificationData.length }})
          </div>
          <template v-if="notificationData && notificationData.length > 0">
            <a
              href="javascript:;"
              class="dropdown-item media"
              v-for="(notification, index) in notificationData"
              v-bind:key="index"
            >
              <div class="media-left">
                <i
                  v-if="notification.icon"
                  v-bind:class="notification.icon"
                ></i>
                <i
                  v-if="notification.iconMedia"
                  v-bind:class="notification.iconMedia"
                ></i>
                <img
                  v-if="notification.img"
                  v-bind:src="notification.img"
                  class="media-object"
                  alt=""
                />
              </div>
              <div class="media-body">
                <h6 class="media-heading" v-html="notification.title"></h6>
                <p v-if="notification.desc" v-html="notification.desc"></p>
                <div class="text-muted fs-10px">{{ notification.time }}</div>
              </div>
            </a>
          </template>
          <template v-else>
            <div class="text-center w-300px py-3">
              No existen notificaciones
            </div>
          </template>
          <div class="dropdown-footer text-center">
            <a href="javascript:;" class="text-decoration-none">Ver más</a>
          </div>
        </div>
      </div>

      <!--🔹 dropdown de cambio de idioma, si existe -->
      <div class="navbar-item dropdown" v-if="appOption.appHeaderLanguageBar">
        <a
          href="#"
          class="navbar-link dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <span
            :class="currentLangIcon"
            :title="currentLangLabel.toLowerCase()"
          ></span>
          <span class="d-none d-sm-inline ms-1">{{ currentLangLabel }}</span>
          <b class="caret"></b>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a href="javascript:;" @click="setLang('en')" class="dropdown-item"
            ><span class="fi fi-us me-2" title="us"></span
            ><img :src="flagEn" alt="English" class="flag" />&nbsp;{{
              t("lang.en")
            }}</a
          >
          <a href="javascript:;" @click="setLang('es')" class="dropdown-item"
            ><span class="fi fi-cn me-2" title="es"></span
            ><img :src="flagEs" alt="Español" class="flag" />&nbsp;{{
              t("lang.es")
            }}</a
          >
        </div>
      </div>

      <!--🔹 Imagen, nombre y dropdown de opciones del usuario logueado -->
      <div class="navbar-item navbar-user dropdown">
        <a
          href="#"
          class="navbar-link dropdown-toggle d-flex align-items-center"
          data-bs-toggle="dropdown"
        >
          <!-- imagen del usuario, o anónima si no existe -->
          <div class="image image-icon bg-gray-800 text-gray-600">
            <i class="fa fa-user"></i>
          </div>
          <span>
            <!-- nombre del usuario con la primera letra en mayúscula -->
            <span class="d-none d-md-inline fw-bold">Nacho Rodríguez</span>
            <b class="caret"></b>
          </span>
        </a>
        <!-- dropdown de opciones del usuario logueado -->
        <div class="dropdown-menu dropdown-menu-end me-1">
          <a href="javascript:;" class="dropdown-item">Editar perfil</a>
          <a href="javascript:;" class="dropdown-item">Configuración</a>
          <div class="dropdown-divider"></div>
          <a href="javascript:;" @click="logOut" class="dropdown-item"
            >Desconectarse</a
          >
        </div>
      </div>

      <!-- 🔹 Botón que abre / cierra la segunda sidebar, si está presente -->
      <div
        class="navbar-divider d-none d-md-block"
        v-if="appOption.appSidebarTwo"
      ></div>
      <div class="navbar-item d-none d-md-block" v-if="appOption.appSidebarTwo">
        <a
          href="javascript:;"
          v-on:click="toggleAppSidebarEndToggled"
          class="navbar-link icon"
        >
          <i class="fa fa-th"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ─── 📌 Core ───────────────────────────────────────────────────
import { ref, watch, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

// ─── 📌 Plugins ────────────────────────────────────────────────
import debounce from "lodash/debounce";
import flagEs from "../../assets/flags/es.png";
import flagEn from "../../assets/flags/en.png";

// ─── 📌 Composables ────────────────────────────────────────────
import { slideToggle } from "@/composables/slideToggle.ts";
import AppHeaderMegaMenu from "@/components/app/HeaderMegaMenu.vue";
import { useQueryHighlight } from "@/composables/useQueryHighlight";

// ─── 📌 Tipos e interfaces ─────────────────────────────────────
interface NotificationItem {
  icon: string;
  iconMedia: string;
  img: string;
  desc: string;
  title: string;
  time: string;
}

// ─── 📌 Stores ─────────────────────────────────────────────────
import { useAppOptionStore } from "@/stores/app-option";

// ─── 📌 Instancias ─────────────────────────────────────────────
const { currentMatchIndex, totalMatches, nextMatch, prevMatch, searchTerm } =
  useQueryHighlight();
const appOption = useAppOptionStore();
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();

// 🌐 i18n

const setLang = (lang: string) => (locale.value = lang);
const currentLangIcon = computed(() => {
  return locale.value === "es" ? "fi fi-cn" : "fi fi-us";
});

const currentLangLabel = computed(() => {
  return locale.value === "es" ? "ES" : "EN";
});

// ─── 📌 Estado reactivo ────────────────────────────────────────

// término de búsqueda en el input
const term = ref(searchTerm.value);

// indica si se ha buscado, si ha habido click en la lupa o enter
const searched = ref(false);

// array en donde se cargan las notificaciones del usuario
const notificationData: NotificationItem[] = [
  /* {
	  icon: 'fa fa-bug media-object bg-gray-500',
	  title: 'Server Error Reports <i class="fa fa-exclamation-circle text-danger"></i>',
	  time: '3 minutes ago'
  } */
];

// ─── 📌 Funciones auxiliares ───────────────────────────────────
/**
 * @description evita cambios excesivos al teclear
 */
const navigateWithQuery = debounce((q: string): void => {
  router.replace({
    name: route.name as string,
    query: { ...route.query, q },
  });
}, 300);

/**
 * @description click en la lupa o enter del input de búsqueda
 * @param event Evento click
 */
const onSearch = (event: Event): void => {
  event.preventDefault();
  searched.value = true;
  const trimmed = term.value.trim();
  searchTerm.value = trimmed;
  navigateWithQuery(trimmed);
};

/**
 * @description limpia el input de búsqueda al hacer click en el botón X
 */
const clearSearch = (): void => {
  term.value = "";
  searchTerm.value = "";
  searched.value = false;
  navigateWithQuery("");
};

/**
 * @description desconexión del usuario logueado
 */
const logOut = (): void => {
  router.push("/login");
};

/**
 * @description muestra / oculta la sidebar
 * @param event Evento click
 */
const toggleSidebar = (event: Event) => {
  event.preventDefault();

  // En anchos de escritorio colapsamos/expandimos
  appOption.appSidebarHide = !appOption.appSidebarHide;
};

/**
 * @description muestra / oculta la sidebar en vista móvil
 */
const toggleAppSidebarMobileToggled = () => {
  appOption.appSidebarMobileToggled = !appOption.appSidebarMobileToggled;
};

/**
 * @description mueve la sidebar a la derecha / izquierda (defecto)
 */
const toggleAppSidebarEndToggled = () => {
  appOption.appSidebarEndToggled = !appOption.appSidebarEndToggled;
};

/**
 * @description mueve la sidebar a la derecha / izquierda (defecto) en vista móvil
 */
const toggleAppSidebarEndMobileToggled = () => {
  appOption.appSidebarEndMobileToggled = !appOption.appSidebarEndMobileToggled;
};

/**
 * @description coloca el menú de la sidebar arriba
 * @param event Evento click
 */
const toggleAppTopMenuMobileToggled = (event: Event) => {
  event.preventDefault();
  const el = document.querySelector(".app-top-menu") as HTMLElement | null;
  if (el) {
    slideToggle(el); // ✅ ahora el es HTMLElement, no null
  }
};

/**
 * @description maneja el cambio de tamaño de pantalla
 */
const handleWindowResize = () => {
  window.addEventListener("resize", function () {
    var elm = document.querySelector(".app-top-menu");
    if (elm) {
      elm.removeAttribute("style");
    }
  });
};

// ─── 📌 Watchers ───────────────────────────────────────────────
// sincroniza `term` local con el composable
watch(term, (val) => {
  searchTerm.value = val;
});

// sincroniza `searchTerm` con `term` si cambia por URL
watch(searchTerm, (val) => {
  term.value = val;
});

// ─── 📌 Ciclo de vida ──────────────────────────────────────────
onMounted(() => {
  handleWindowResize();
});
</script>

<style>
.flag {
  width: 24px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
  transition: transform 0.2s ease;
}
</style>
