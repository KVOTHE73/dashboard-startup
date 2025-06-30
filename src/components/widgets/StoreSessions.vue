<template>
  <div
    class="card border-0 text-truncate bg-gray-800 text-white border-radius-top"
  >
    <div class="card-body">
      <!-- Total sesiones + gráfica -->
      <div class="d-flex align-items-center mb-1">
        <h2 class="text-white mb-0">
          <span
            data-animation="number"
            data-format="currency"
            data-value="70719"
            >0</span
          >
        </h2>
        <div class="ms-auto chart-wrapper">
          <ApexChart
            type="line"
            height="28"
            width="250"
            :options="session.chart.options"
            :series="session.chart.series"
          />
        </div>
      </div>

      <!-- Comparativa semana anterior -->
      <div class="mb-3 text-gray-500 text-start w-auto">
        <i class="fa fa-caret-up"></i>
        <span data-animation="number" data-format="decimal" data-value="9.5"
          >0.00</span
        >%
        {{ t("dashboard.widgets.storeSessions.compareLastWeek") }}
      </div>

      <!-- Mobile -->
      <div class="d-flex mb-2">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-teal fs-8px me-2"></i>
          {{ t("dashboard.widgets.storeSessions.mobile") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              data-value="25.7"
              >0.00</span
            >%
          </div>
          <div class="w-75px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="currency"
              data-value="53210"
              >0</span
            >
          </div>
        </div>
      </div>

      <!-- Desktop -->
      <div class="d-flex mb-2">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-blue fs-8px me-2"></i>
          {{ t("dashboard.widgets.storeSessions.desktop") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              data-value="16.0"
              >0.00</span
            >%
          </div>
          <div class="w-75px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="currency"
              data-value="11959"
              >0</span
            >
          </div>
        </div>
      </div>

      <!-- Tablet -->
      <div class="d-flex">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-cyan fs-8px me-2"></i>
          {{ t("dashboard.widgets.storeSessions.tablet") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span data-animation="number" data-format="decimal" data-value="7.9"
              >0.00</span
            >%
          </div>
          <div class="w-75px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="currency"
              data-value="5545"
              >0</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import ApexChart from "vue3-apexcharts";
import { animateNumber } from "@/components/app/AnimateNumber";
import { useAppVariableStore } from "@/stores/app-variable";

const { t, locale } = useI18n();
const appVariable = useAppVariableStore();

const session = reactive({
  chart: {
    series: [{ data: [65000, 67000, 62000, 60000, 61000, 60500, 70719] }],
    options: {
      chart: {
        type: "line",
        width: 160,
        height: 28,
        sparkline: { enabled: true },
      },
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 1,
          opacityTo: 1,
          colorStops: [
            { offset: 0, color: appVariable.color.teal, opacity: 1 },
            { offset: 100, color: appVariable.color.cyan, opacity: 1 },
          ],
        },
      },
      tooltip: {
        theme: "dark",
        x: { show: false },
        y: { formatter: (value: number) => `${value}` },
        marker: { show: false },
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      grid: {
        show: false,
      },
    },
  },
});

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

.chart-wrapper {
  max-width: 85%;
  margin-right: 8px;
}
</style>
