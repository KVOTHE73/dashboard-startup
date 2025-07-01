<template>
  <div class="card border-0 bg-gray-800 text-white border-radius-top">
    <div class="card-body mb-3">
      <div class="row">
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span
              data-animation="number"
              data-format="decimal"
              data-value="127.1"
              >0</span
            >K
          </h3>
          <div>{{ t("dashboard.widgets.visitorsAnalytics.newVisitors") }}</div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              data-value="25.5"
              >0.00</span
            >%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span
              data-animation="number"
              data-format="decimal"
              data-value="179.9"
              >0</span
            >K
          </h3>
          <div>
            {{ t("dashboard.widgets.visitorsAnalytics.returningVisitors") }}
          </div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              data-value="5.33"
              >0.00</span
            >%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span
              data-animation="number"
              data-format="decimal"
              data-value="766.8"
              >0</span
            >K
          </h3>
          <div>{{ t("dashboard.widgets.visitorsAnalytics.pageViews") }}</div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              data-value="0.323"
              >0.00</span
            >%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>
      </div>
    </div>
    <div class="card-body pe-3 ps-0 py-0">
      <div class="ms-n3 me-2">
        <ApexChart
          type="bar"
          width="100%"
          height="252"
          :options="visitor.chart.options"
          :series="visitor.chart.series"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";
import ApexChart from "vue3-apexcharts";
import { useAppVariableStore } from "@/stores/app-variable";

const { t, locale } = useI18n();
const appVariable = useAppVariableStore();

const visitor = reactive(getVisitorData());

function getVisitorData() {
  return {
    chart: {
      series: [
        {
          name: t("dashboard.widgets.visitorsAnalytics.uniqueVisitors"),
          data: [
            [new Date().setDate(new Date().getDate() - 6), 10],
            [new Date().setDate(new Date().getDate() - 5), 12],
            [new Date().setDate(new Date().getDate() - 4), 14],
            [new Date().setDate(new Date().getDate() - 3), 11],
            [new Date().setDate(new Date().getDate() - 2), 15],
            [new Date().setDate(new Date().getDate() - 1), 13],
            [new Date().getTime(), 16],
          ],
        },
        {
          name: t("dashboard.widgets.visitorsAnalytics.pageViews"),
          data: [
            [new Date().setDate(new Date().getDate() - 6), 20],
            [new Date().setDate(new Date().getDate() - 5), 25],
            [new Date().setDate(new Date().getDate() - 4), 23],
            [new Date().setDate(new Date().getDate() - 3), 27],
            [new Date().setDate(new Date().getDate() - 2), 26],
            [new Date().setDate(new Date().getDate() - 1), 28],
            [new Date().getTime(), 30],
          ],
        },
      ],
      options: {
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
      },
    },
  };
}

onMounted(() => {
  animateNumber(locale.value);
});

watch(locale, () => {
  animateNumber(locale.value);
  visitor.chart.series[0].name = t(
    "dashboard.widgets.visitorsAnalytics.uniqueVisitors"
  );
  visitor.chart.series[1].name = t(
    "dashboard.widgets.visitorsAnalytics.pageViews"
  );
});
</script>

<style scoped>
.border-radius-top {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
