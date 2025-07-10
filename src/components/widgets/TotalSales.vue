<!--
==============================================================================
🔷 TOTAL SALES
   💡 Widget que muestra:
       🔹 Total en ventas reales (desde /carts)
       🔹 Total pedidos y media por pedido
       🔹 Mini gráfica dinámica con ApexCharts
==============================================================================
-->
<template>
  <div
    v-if="totalSalesData"
    class="card border-0 overflow-hidden bg-gray-800 text-white border-radius-top"
  >
    <div class="card-body">
      <div class="row">
        <!-- col-7 -->
        <div class="col-xl-7 col-lg-8">
          <!-- 💰 Total ventas -->
          <div class="d-flex mb-2">
            <h2 class="mb-0">
              <span
                data-animation="number"
                data-format="currency"
                :data-value="totalSalesData.totalSalesAmount"
                >0.00</span
              >
            </h2>
            <div class="ms-auto mt-n1 mb-n1">
              <ApexChart
                type="line"
                height="36"
                :options="sales.options"
                :series="sales.series"
              />
            </div>
          </div>

          <!-- 📊 Comparativa (porcentaje ficticio) -->
          <div class="mb-3 text-gray-500 text-start w-auto">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              data-value="33.21"
              >0.00</span
            >
            % {{ t("dashboard.widgets.totalSales.compareLastWeek") }}
          </div>

          <hr class="bg-white bg-opacity-50" />

          <!-- 📦 Pedidos y media -->
          <div class="row text-truncate">
            <div class="col-6">
              <div class="text-gray-500">
                {{ t("dashboard.widgets.totalSales.totalSalesOrder") }}
              </div>
              <div
                class="fs-18px mb-8px fw-bold"
                data-animation="number"
                data-format="integer"
                :data-value="totalSalesData.totalSalesOrders"
              >
                0
              </div>
              <div class="progress h-5px rounded-3 bg-gray-900 mb-5px">
                <div
                  class="progress-bar progress-bar-striped rounded-right bg-teal"
                  data-animation="width"
                  data-format="decimal"
                  data-value="55%"
                  style="width: 0%"
                ></div>
              </div>
            </div>

            <div class="col-6">
              <div class="text-gray-500">
                {{ t("dashboard.widgets.totalSales.avgSalesPerOrder") }}
              </div>
              <div class="fs-18px mb-8px fw-bold">
                <span
                  data-animation="number"
                  data-format="currency"
                  :data-value="totalSalesData.avgSalesPerOrder"
                  >0.00</span
                >
              </div>
              <div class="progress h-5px rounded-3 bg-gray-900 mb-5px">
                <div
                  class="progress-bar progress-bar-striped rounded-right"
                  data-animation="width"
                  data-format="decimal"
                  data-value="55%"
                  style="width: 0%"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 📷 Imagen decorativa -->
        <div
          class="col-xl-5 col-lg-4 align-items-center d-flex justify-content-center"
        >
          <img
            src="/assets/img/svg/img-1.svg"
            height="150"
            class="d-none d-lg-block"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useAppVariableStore } from "@/stores/app-variable";
import { useAPI } from "@/composables/useApiDummy";
import ApexChart from "vue3-apexcharts";
import { animateNumber } from "@/components/app/AnimateNumber";

import type { ApexOptions } from "apexcharts";

// 🌐 i18n
const { t, locale } = useI18n();

// 🧩 App config (colores)
const appVariable = useAppVariableStore();

// 📦 Datos desde store vía composable
const { fetchTotalSales, getTotalSalesData } = useAPI();
const totalSalesData = getTotalSalesData;

// 📈 Configuración del gráfico
const sales = reactive<{
  series: { data: number[] }[];
  options: ApexOptions;
}>({
  series: [{ data: [] }],
  options: {
    chart: {
      type: "line",
      width: 100,
      height: 36,
      sparkline: { enabled: true },
      stacked: false,
    },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          { offset: 0, color: appVariable.color.blue, opacity: 1 },
          { offset: 100, color: appVariable.color.indigo, opacity: 1 },
        ],
      },
    },
    tooltip: {
      theme: "dark",
      x: { show: false },
      y: {
        formatter: (value: number) =>
          `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      },
      marker: { show: false },
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    grid: { show: false },
  },
});

// 🔄 Ciclo de vida
onMounted(async () => {
  await fetchTotalSales();
  sales.series[0].data = totalSalesData.value.chartSeries;
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
