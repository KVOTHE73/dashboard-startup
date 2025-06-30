<template>
  <div class="card border-0 mb-3 bg-gray-800 text-white">
    <div class="card-body">
      <div class="mb-3 text-gray-500">
        <b>{{ t("dashboard.widgets.visitorsAnalytics.title") }}</b>
        <span class="ms-2">
          <i
            class="fa fa-info-circle"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            :data-bs-title="t('dashboard.widgets.visitorsAnalytics.title')"
            data-bs-placement="top"
            :data-bs-content="
              t('dashboard.widgets.visitorsAnalytics.description')
            "
          ></i>
        </span>
      </div>
      <div class="row">
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span data-animation="number" data-value="127.1">0</span>K
          </h3>
          <div>{{ t("dashboard.widgets.visitorsAnalytics.newVisitors") }}</div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span data-animation="number" data-value="25.5">0.00</span>%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span data-animation="number" data-value="179.9">0</span>K
          </h3>
          <div>
            {{ t("dashboard.widgets.visitorsAnalytics.returningVisitors") }}
          </div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span data-animation="number" data-value="5.33">0.00</span>%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>
        <div class="col-xl-3 col-4">
          <h3 class="mb-1">
            <span data-animation="number" data-value="766.8">0</span>K
          </h3>
          <div>{{ t("dashboard.widgets.visitorsAnalytics.pageViews") }}</div>
          <div class="text-gray-500 small text-truncate">
            <i class="fa fa-caret-up"></i>
            <span data-animation="number" data-value="0.323">0.00</span>%
            {{ t("dashboard.widgets.visitorsAnalytics.fromPrevious") }}
          </div>
        </div>
      </div>
    </div>
    <div class="card-body pe-3 ps-0 py-0">
      <div class="ms-n3 me-2">
        <apexchart
          type="bar"
          width="100%"
          height="252"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import apexchart from "@/components/plugins/Apexcharts.vue";

const { t } = useI18n();

const chartOptions = {
  chart: { type: "bar", stacked: true, toolbar: { show: false } },
  xaxis: { type: "datetime" },
  yaxis: {},
  legend: { position: "top" },
  fill: { opacity: 0.7 },
};

const chartSeries = [
  { name: "Unique Visitors", data: [] },
  { name: "Page Views", data: [] },
];
</script>
