<template>
  <div class="card border-0 mb-3 bg-gray-800 text-white">
    <div class="card-body">
      <div class="mb-2 text-gray-500">
        <b>{{ t("dashboard.widgets.sessionByLocation.title") }}</b>
        <span class="ms-2">
          <i
            class="fa fa-info-circle"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            :data-bs-title="
              t('dashboard.widgets.sessionByLocation.tooltipTitle')
            "
            data-bs-placement="top"
            :data-bs-content="
              t('dashboard.widgets.sessionByLocation.tooltipContent')
            "
          >
          </i>
        </span>
      </div>
      <div id="map-container" class="mb-2" style="height: 200px"></div>
      <div>
        <div
          v-for="country in countries"
          :key="country.name"
          class="d-flex align-items-center text-white mb-2"
        >
          <div
            class="widget-img widget-img-xs rounded bg-dark me-2 w-40px"
            :style="`background-image: url(${country.flag})`"
          ></div>
          <div class="d-flex w-100">
            <div>{{ country.name }}</div>
            <div class="ms-auto text-gray-500">
              <span data-animation="number" :data-value="country.value"
                >0.00</span
              >%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppVariableStore } from "@/stores/app-variable";
import jsVectorMap from "jsvectormap";
import { useI18n } from "vue-i18n";

// 🌐 i18n
const { t } = useI18n();
const appVariable = useAppVariableStore();

const countries = [
  { name: "United States", value: 39.85, flag: "/assets/img/flag/us.jpg" },
  { name: "China", value: 14.23, flag: "/assets/img/flag/cn.jpg" },
  { name: "Germany", value: 12.83, flag: "/assets/img/flag/de.jpg" },
  { name: "France", value: 11.14, flag: "/assets/img/flag/fr.jpg" },
  { name: "Japan", value: 10.75, flag: "/assets/img/flag/jp.jpg" },
];

const renderMap = () => {
  document.getElementById("map-container")!.innerHTML = '<div id="map"></div>';
  new jsVectorMap({
    selector: "#map",
    map: "world",
    zoomButtons: false,
    normalizeFunction: "polynomial",
    hoverOpacity: 0.5,
    hoverColor: false,
    zoomOnScroll: false,
    selectedRegions: ["IN", "US", "MN", "RU"],
    focusOn: { x: 0.5, y: 0.5, scale: 1 },
    markerStyle: {
      initial: { fill: appVariable.color.theme, stroke: "none", r: 5 },
      hover: { fill: appVariable.color.theme },
    },
    backgroundColor: "transparent",
  });
};

onMounted(() => {
  renderMap();
});
</script>
