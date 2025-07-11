<!--
==============================================================================
🔷 VISITORS ANALYTICS
   💡 Muestra visitantes nuevos, recurrentes y vistas de página:
       🔹 KPI numéricos animados
       🔹 Gráfica comparativa: visitas únicas vs page views
==============================================================================
-->
<template>
  <div
    v-if="visitorsData"
    class="card border-0 bg-gray-800 text-white border-radius-top"
  >
    <div class="card-body mb-3">
      <div class="row">
        <!-- 🔷 New Visitors -->
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span
              data-testid="animated-number"
              data-animation="number"
              :data-format="formatType(visitorsData?.newVisitors)"
              :data-value="formatValue(visitorsData?.newVisitors)"
              >0</span
            >
            <span v-if="showK(visitorsData?.newVisitors)">K</span>
          </h3>
          <div>{{ t("dashboard.widgets.visitorsAnalytics.newVisitors") }}</div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="visitorsData?.newVisitors || 0"
              >0.00</span
            >%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>

        <!-- 🟧 Returning Visitors -->
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span
              data-testid="animated-number"
              data-animation="number"
              :data-format="formatType(visitorsData?.returningVisitors)"
              :data-value="formatValue(visitorsData?.returningVisitors)"
              >0</span
            >
            <span v-if="showK(visitorsData?.returningVisitors)">K</span>
          </h3>
          <div>
            {{ t("dashboard.widgets.visitorsAnalytics.returningVisitors") }}
          </div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="visitorsData?.returningVisitors || 0"
              >0.00</span
            >%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>

        <!-- 🔶 Page Views -->
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span
              data-testid="animated-number"
              data-animation="number"
              :data-format="formatType(visitorsData?.pageViews)"
              :data-value="formatValue(visitorsData?.pageViews)"
              >0</span
            >
            <span v-if="showK(visitorsData?.pageViews)">K</span>
          </h3>
          <div>{{ t("dashboard.widgets.visitorsAnalytics.pageViews") }}</div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="visitorsData?.pageViews || 0"
              >0.00</span
            >%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>
      </div>
    </div>

    <!-- 📊 Chart -->
    <div class="card-body pe-3 ps-0 py-0">
      <div class="ms-n3 me-2">
        <ApexChart
          type="bar"
          width="100%"
          height="252"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>
    </div>
  </div>

  <!-- 🕓 Placeholder si no hay datos -->
  <div v-else class="text-white p-3">Cargando analítica de visitantes...</div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";
import ApexChart from "vue3-apexcharts";
import { useAppVariableStore } from "@/stores/app-variable";
import { useAPI } from "@/composables/useApiDummy";

// 📁 Stores y datos
const { t, locale } = useI18n();
const appVariable = useAppVariableStore();
const { getVisitorsAnalytics, fetchVisitorsAnalytics } = useAPI();
const visitorsData = getVisitorsAnalytics;

// 🧮 Computed: formato de gráfica
const chartSeries = computed(() => {
  const data = visitorsData.value;
  if (!data || !data.chartData) return [];
  return [
    {
      name: t("dashboard.widgets.visitorsAnalytics.uniqueVisitors"),
      data: data.chartData.uniqueVisitors,
    },
    {
      name: t("dashboard.widgets.visitorsAnalytics.pageViews"),
      data: data.chartData.pageViews,
    },
  ];
});

const chartOptions = computed(() => ({
  colors: [appVariable.color.teal, appVariable.color.blue],
  fill: {
    opacity: 0.75,
    type: "solid",
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    labels: { colors: appVariable.color.white },
  },
  xaxis: {
    type: "datetime",
    tickAmount: 6,
    labels: { style: { colors: appVariable.color.white } },
  },
  yaxis: {
    labels: { style: { colors: appVariable.color.white } },
  },
  tooltip: {
    y: { formatter: (val: number) => `$ ${val} thousands` },
  },
  chart: {
    height: "100%",
    type: "area",
    toolbar: { show: false },
    stacked: true,
  },
  grid: {
    show: true,
    borderColor: `rgba(${appVariable.color.whiteRgb}, .15)`,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
    padding: { top: -40, right: 3, bottom: 0, left: 10 },
  },
  stroke: { show: false, curve: "straight" },
}));

// 🔧 Utilidades de formato
function formatType(value?: number) {
  return value && value >= 1000 ? "decimal" : "integer";
}
function formatValue(value?: number) {
  return value && value >= 1000 ? value / 1000 : value || 0;
}
function showK(value?: number) {
  return value !== undefined && value >= 1000;
}

// 🔄 Ciclo de vida
onMounted(async () => {
  await fetchVisitorsAnalytics();
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
</style>
