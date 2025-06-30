<template>
  <div
    class="card border-0 overflow-hidden bg-gray-800 text-white border-radius-top"
  >
    <div class="card-body">
      <div class="row">
        <!-- col-7 -->
        <div class="col-xl-7 col-lg-8">
          <!-- total-sales -->
          <div class="d-flex mb-1">
            <h2 class="mb-0">
              <span
                data-animation="number"
                data-format="currency"
                data-value="64559.25"
                >0.00</span
              >
            </h2>

            <div class="ms-auto mt-n1 mb-n1">
              <ApexChart
                type="line"
                height="36"
                :options="sales.chart.options"
                :series="sales.chart.series"
              />
            </div>
          </div>
          <!-- percentage -->
          <div class="mb-3 text-gray-500 text-start w-auto">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              data-value="33.21"
              >0.00</span
            >%
            {{ t("dashboard.widgets.totalSales.compareLastWeek") }}
          </div>
          <hr class="bg-white bg-opacity-50" />
          <!-- inner row -->
          <div class="row text-truncate">
            <div class="col-6">
              <div class="text-gray-500">
                {{ t("dashboard.widgets.totalSales.totalSalesOrder") }}
              </div>
              <div
                class="fs-18px mb-8px fw-bold"
                data-animation="number"
                data-format="currency"
                data-value="1568"
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
                  data-value="41.20"
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
        <!-- col-5 -->
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
import { reactive, onMounted, watch } from "vue";
import { useAppVariableStore } from "@/stores/app-variable";
import { animateNumber } from "@/components/app/AnimateNumber";
import ApexChart from "vue3-apexcharts";
import { useI18n } from "vue-i18n";

const appVariable = useAppVariableStore();
const { t, locale } = useI18n();

const sales = reactive({
  chart: {
    series: [
      {
        data: [9452.37, 11018.87, 7296.37, 6274.29, 7924.05, 6581.34, 12918.14],
      },
    ],
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
        y: { formatter: (value: number) => `$${value.toLocaleString()}` },
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
