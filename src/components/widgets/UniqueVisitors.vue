<!--
==============================================================================
🔷 UNIQUE VISITORS
   💡 Widget que muestra usuarios únicos (usuarios registrados como proxy).
==============================================================================
-->
<template>
  <div class="card-height">
    <div
      class="widget widget-stats bg-orange border-radius-top"
      v-if="uniqueVisitorsData"
    >
      <div class="stats-icon"><i class="fa fa-users"></i></div>

      <div class="stats-info text-start">
        <h4>{{ t("dashboard.widgets.uniqueVisitors.period") }}</h4>
        <p>
          <span
            data-animation="number"
            data-format="integer"
            :data-value="uniqueVisitorsData.uniqueVisitors"
            >0</span
          >
        </p>
      </div>

      <div class="stats-link">
        <a href="javascript:;">
          {{ t("dashboard.widgets.uniqueVisitors.detail") }}
          <i class="fa fa-arrow-alt-circle-right"></i>
        </a>
      </div>
    </div>

    <div v-else class="text-white p-3">Cargando visitantes únicos...</div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";
import { useAPI } from "@/composables/useApiDummy";

// 🌍 i18n
const { t, locale } = useI18n();

// 📦 Store
const { getUniqueVisitorsData, fetchUniqueVisitors } = useAPI();
const uniqueVisitorsData = getUniqueVisitorsData;

// 🔄 Ciclo de vida
onMounted(async () => {
  await fetchUniqueVisitors();
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
