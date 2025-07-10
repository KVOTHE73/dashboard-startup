<!--
==============================================================================
🔷 TODAYVISITS
   💡 Widget que muestra el total de visitas de hoy:
       🔹 Número total de visitas (animado)
       🔹 Barra de progreso visual (% hacia un objetivo diario)
       🔹 Texto de pie traducido

📌 Usa datos dinámicos desde dummyStore.visitorsAnalytics
   ✔️ Si no hay datos, cae en valores por defecto (0)
==============================================================================
-->

<template>
  <div class="card-height">
    <div class="widget widget-stats bg-teal border-radius-top">
      <!-- Icono decorativo -->
      <div class="stats-icon stats-icon-lg">
        <i class="fa fa-globe fa-fw"></i>
      </div>

      <!-- Contenido principal -->
      <div class="stats-content text-start">
        <!-- 🔸 Título -->
        <div class="stats-title">
          {{ t("dashboard.widgets.todayVisits.subTitle") }}
        </div>

        <!-- 🔸 Total de visitas de hoy -->
        <div class="stats-number">
          <span
            data-animation="number"
            data-format="integer"
            :data-value="todayVisits"
          >
            0
          </span>
        </div>

        <!-- 🔸 Barra de progreso hacia la meta -->
        <div class="stats-progress progress">
          <div
            class="progress-bar"
            :style="`width: ${safeProgress.toFixed(1)}%`"
          ></div>
        </div>

        <!-- 🔸 Pie de descripción -->
        <div class="stats-desc">
          {{ t("dashboard.widgets.todayVisits.footer") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useDummyStore } from "@/stores/dummyStore";
import { animateNumber } from "@/components/app/AnimateNumber";

// 🌐 i18n
const { t, locale } = useI18n();

// 🧩 Store
const dummyStore = useDummyStore();

// 📁 Computeds derivados de la store
const todayVisitsData = computed(() => {
  return dummyStore.getTodayVisitsData?.() ?? { todayVisits: 0, progress: 0 };
});

const todayVisits = computed(() => todayVisitsData.value.todayVisits);
const progress = computed(() => todayVisitsData.value.progress);

const safeProgress = computed(() => {
  const raw = progress.value;
  if (isNaN(raw) || raw <= 0) return 0;
  if (raw < 1) return 70.1; // Mínimo visual de 70.1% (número aleatorio indicado en messages)
  return raw;
});

// 🔄 Animaciones numéricas
onMounted(() => {
  animateNumber(locale.value);
});
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
