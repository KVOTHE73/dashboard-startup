<template>
  <div
    class="card border-0 text-truncate bg-gray-800 text-white border-radius-top"
  >
    <div class="card-body mb-3">
      <div class="d-flex align-items-center mb-1">
        <h2 class="text-white mb-0">
          <span data-animation="number" data-format="decimal" data-value="2.19"
            >0.00</span
          >%
        </h2>
        <div class="ms-auto">
          <ApexChart
            type="line"
            height="28"
            :options="conversion.chart.options"
            :series="conversion.chart.series"
          />
        </div>
      </div>
      <div class="mb-3 text-gray-500 text-start w-auto">
        <i class="fa fa-caret-up"></i>
        <span data-animation="number" data-format="decimal" data-value="33.21"
          >0.00</span
        >%
        {{ t("dashboard.widgets.conversionRate.compareLastWeek") }}
      </div>
      <div class="d-flex mb-2">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-red fs-8px me-2"></i>
          {{ t("dashboard.widgets.conversionRate.addedToCart") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span data-animation="number" data-format="decimal" data-value="262"
              >0</span
            >%
          </div>
          <div class="w-50px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="decimal"
              data-value="3.79"
              >0.00</span
            >%
          </div>
        </div>
      </div>
      <!-- END info-row -->
      <!-- BEGIN info-row -->
      <div class="d-flex mb-2">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-warning fs-8px me-2"></i>
          {{ t("dashboard.widgets.conversionRate.reachedeCheckout") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span data-animation="number" data-format="decimal" data-value="11"
              >0</span
            >%
          </div>
          <div class="w-50px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="decimal"
              data-value="3.85"
              >0.00</span
            >%
          </div>
        </div>
      </div>
      <!-- END info-row -->
      <!-- BEGIN info-row -->
      <div class="d-flex">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-lime fs-8px me-2"></i>
          {{ t("dashboard.widgets.conversionRate.sessionsConverted") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span data-animation="number" data-format="decimal" data-value="57"
              >0</span
            >%
          </div>
          <div class="w-50px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="decimal"
              data-value="2.19"
              >0.00</span
            >%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import { useAppVariableStore } from "@/stores/app-variable";
import { useI18n } from "vue-i18n";
import ApexChart from "vue3-apexcharts";
import { animateNumber } from "@/components/app/AnimateNumber";

// 🌐 i18n
const { t, locale } = useI18n();

const appVariable = useAppVariableStore();

const conversion = reactive({
  chart: {
    series: [{ data: [2.68, 2.93, 2.04, 1.61, 1.88, 1.62, 2.8] }],
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
            { offset: 0, color: appVariable.color.red, opacity: 1 },
            { offset: 50, color: appVariable.color.orange, opacity: 1 },
            { offset: 100, color: appVariable.color.lime, opacity: 1 },
          ],
        },
      },
      tooltip: {
        theme: "dark",
        x: { show: false },
        y: { formatter: (value: number) => `${value}%` },
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
</style>
