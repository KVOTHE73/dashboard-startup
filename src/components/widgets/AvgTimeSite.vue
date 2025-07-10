<!--
========================================================================
🔷 WIDGET: AvgTimeSite
   💡 Este widget muestra el tiempo medio de permanencia en el sitio web.
       🔹 El dato se genera de forma simulada entre 5 y 20 minutos.
       🔹 Icono representativo con animación numérica.
       🔹 Texto traducido vía i18n.
========================================================================
-->

<template>
  <div class="card-height">
    <div class="widget widget-stats bg-red border-radius-top">
      <!-- Icono -->
      <div class="stats-icon"><i class="fa fa-clock"></i></div>

      <!-- Contenido principal -->
      <div class="stats-info text-start">
        <h4>{{ t("dashboard.widgets.avgTimeSite.period") }}</h4>
        <p>{{ averageTime }}</p>
      </div>

      <!-- Enlace a más detalles -->
      <div class="stats-link">
        <a href="javascript:;">
          {{ t("dashboard.widgets.avgTimeSite.detail") }}
          <i class="fa fa-arrow-alt-circle-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ⛳ Imports */
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";

/* 🌐 Traducción */
const { t, locale } = useI18n();

/* 📁 Estado reactivo */
const averageTime = ref("00:00:00");

/* 🔧 Función para generar tiempo aleatorio entre 5 y 20 minutos */
function generateRandomAvgTime() {
  const minSeconds = 5 * 60; // 5 minutos
  const maxSeconds = 20 * 60; // 20 minutos
  const totalSeconds =
    Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;

  const h = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");

  return `${h}:${m}:${s}`;
}

/* 🔄 Ciclo de vida */
onMounted(() => {
  averageTime.value = generateRandomAvgTime();
  animateNumber(locale.value);
});

/* 🧩 Watcher para reanimar número si cambia el idioma */
watch(locale, () => {
  animateNumber(locale.value);
});
</script>

<style scoped>
.border-radius-top {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.card-height {
  height: 7rem;
}
</style>
