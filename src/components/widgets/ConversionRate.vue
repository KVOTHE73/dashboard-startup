<!--
==============================================================================
🔷 CONVERSIONRATE
    💡 Este componente muestra el ratio de conversión de la tienda online:
        🔹 Muestra la tasa de conversión general con un gráfico de línea
        🔹 Incluye comparativas frente a la semana anterior
        🔹 Los datos están animados visualmente mediante `animateNumber`
        🔹 El gráfico simula series dinámicas para reflejar actividad
==============================================================================
-->

<template>
  <div
    class="card border-0 text-truncate bg-gray-800 text-white border-radius-top"
  >
    <div class="card-body mb-3">
      <!-- 🔢 Tasa de conversión con gráfica a la derecha -->
      <div class="d-flex align-items-center mb-1">
        <h2 class="text-white mb-0">
          <span
            data-animation="number"
            data-format="decimal"
            :data-value="mainRate"
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

      <!-- 📊 Comparativa semanal -->
      <div class="mb-3 text-gray-500 text-start w-auto">
        <i class="fa fa-caret-up"></i>
        <span
          data-animation="number"
          data-format="decimal"
          :data-value="weeklyChange"
          >0.00</span
        >%
        {{ t("dashboard.widgets.conversionRate.compareLastWeek") }}
      </div>

      <!-- 🛒 Añadido al carrito -->
      <div class="d-flex mb-2">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-red fs-8px me-2"></i>
          {{ t("dashboard.widgets.conversionRate.addedToCart") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="addedToCartChange"
              >0.00</span
            >%
          </div>
          <div class="w-50px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="addedToCartRate"
              >0.00</span
            >%
          </div>
        </div>
      </div>

      <!-- 🧾 Llegaron al checkout -->
      <div class="d-flex mb-2">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-warning fs-8px me-2"></i>
          {{ t("dashboard.widgets.conversionRate.reachedeCheckout") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="reachedCheckoutChange"
              >0.00</span
            >%
          </div>
          <div class="w-50px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="reachedCheckoutRate"
              >0.00</span
            >%
          </div>
        </div>
      </div>

      <!-- ✅ Sesiones convertidas -->
      <div class="d-flex">
        <div class="d-flex align-items-center">
          <i class="fa fa-circle text-lime fs-8px me-2"></i>
          {{ t("dashboard.widgets.conversionRate.sessionsConverted") }}
        </div>
        <div class="d-flex align-items-center ms-auto">
          <div class="text-gray-500 small">
            <i class="fa fa-caret-up"></i>
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="sessionsConvertedChange"
              >0.00</span
            >%
          </div>
          <div class="w-50px text-end ps-2 fw-bold">
            <span
              data-animation="number"
              data-format="decimal"
              :data-value="sessionsConvertedRate"
              >0.00</span
            >%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { reactive, ref, onMounted, watch, nextTick } from "vue";
import { useAppVariableStore } from "@/stores/app-variable";
import { useI18n } from "vue-i18n";
import ApexChart from "vue3-apexcharts";
import { animateNumber } from "@/components/app/AnimateNumber";

// 🌐 i18n
const { t, locale } = useI18n();
const appVariable = useAppVariableStore();

// 📁 Datos aleatorios simulados
const mainRate = ref((Math.random() * 5 + 1).toFixed(2));
const weeklyChange = ref((Math.random() * 50).toFixed(2));

const addedToCartChange = ref((Math.random() * 20).toFixed(2));
const addedToCartRate = ref((Math.random() * 5).toFixed(2));

const reachedCheckoutChange = ref((Math.random() * 15).toFixed(2));
const reachedCheckoutRate = ref((Math.random() * 5).toFixed(2));

const sessionsConvertedChange = ref((Math.random() * 100).toFixed(2));
const sessionsConvertedRate = ref(mainRate.value);

// 📈 Configuración del gráfico con datos dinámicos
const conversion = reactive({
  chart: {
    series: [{ data: [] as number[] }],
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

// 🔧 Función que genera valores aleatorios para la gráfica
function generateRandomSeries() {
  conversion.chart.series[0].data = Array.from(
    { length: 7 },
    () => +(Math.random() * (4 - 1.5) + 1.5).toFixed(2)
  );
}

// 🔄 Ciclo de vida
onMounted(async () => {
  generateRandomSeries();
  await nextTick();
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
