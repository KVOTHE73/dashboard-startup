<template>
  <div class="card border-0 bg-gray-800 text-white border-radius-top">
    <div class="card-body">
      <div id="map-container" class="mb-2" style="height: 200px"></div>
      <div
        v-for="(country, index) in translatedCountries"
        :key="index"
        class="d-flex align-items-center text-white mb-2"
      >
        <div
          class="widget-img widget-img-xs rounded bg-dark me-2 w-40px"
          :style="`background-image: url(${country.flag}); background-size: cover;`"
        ></div>
        <div class="d-flex w-100">
          <div>{{ country.name }}</div>
          <div class="ms-auto text-gray-500">
            <span data-animation="number" :data-value="country.value">0.00</span
            >%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAppVariableStore } from "@/stores/app-variable";
import { animateNumber } from "@/components/app/AnimateNumber";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/jsvectormap.min.css";

const { t, locale } = useI18n();
const appVariable = useAppVariableStore();

const countries = [
  { key: "unitedStates", value: 39.85, flag: "/assets/img/flag/us.jpg" },
  { key: "china", value: 14.23, flag: "/assets/img/flag/cn.jpg" },
  { key: "germany", value: 12.83, flag: "/assets/img/flag/de.jpg" },
  { key: "france", value: 11.14, flag: "/assets/img/flag/fr.jpg" },
  { key: "japan", value: 10.75, flag: "/assets/img/flag/jp.jpg" },
];

const translatedCountries = computed(() =>
  countries.map((c) => ({
    ...c,
    name: t(`dashboard.widgets.sessionByLocation.countries.${c.key}`),
  }))
);

function renderMap() {
  document.getElementById("map-container")!.innerHTML =
    '<div id="map" style="height: 200px"></div>';
  new jsVectorMap({
    selector: "#map",
    map: "world",
    zoomButtons: false,
    normalizeFunction: "polynomial",
    hoverOpacity: 0.5,
    hoverColor: false,
    zoomOnScroll: false,
    selectedRegions: ["US", "CN", "DE", "FR", "JP"],
    labels: { markers: { render: (marker: any) => marker.name } },
    focusOn: { x: 0.5, y: 0.5, scale: 1 },
    markerStyle: {
      initial: {
        fill: appVariable.color.theme,
        stroke: "none",
        r: 5,
      },
      hover: {
        fill: appVariable.color.theme,
      },
    },
    markerLabelStyle: {
      initial: {
        fontFamily: "var(--bs-body-font-family)",
        fontSize: "12px",
        fill: `rgba(${appVariable.color.whiteRgb}, .75)`,
      },
    },
    regionStyle: {
      initial: {
        fill: appVariable.color.gray700,
        fillOpacity: 4,
        stroke: "none",
        strokeWidth: 0.4,
        strokeOpacity: 1,
      },
      hover: { fillOpacity: 0.5 },
      selected: { fill: appVariable.color.teal, fillOpacity: 1 },
    },
    backgroundColor: "transparent",
  });
}

onMounted(() => {
  animateNumber(locale.value);
  renderMap();
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
