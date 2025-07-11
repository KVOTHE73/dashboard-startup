<!--
==============================================================================
🔷 SALES BY SOCIAL
   💡 Widget que muestra el total de ventas por canal social (mock):
       🔹 Monto total animado
       🔹 Porcentaje de incremento
       🔹 Listado de canales con sus ventas individuales
==============================================================================

📌 NOTA: Este widget usa datos estáticos locales porque no existe un endpoint en DummyJSON
⚠️ No se accede a la store ni al backend
-->

<template>
  <div class="card border-0 bg-gray-900 text-white border-radius-top">
    <!-- 🔸 Contenedor principal con imagen decorativa -->
    <div
      class="card-body"
      style="
        background: no-repeat bottom right;
        background-image: url(/assets/img/svg/img-4.svg);
        background-size: auto 80%;
      "
    >
      <!-- 🔸 Total de ventas (animado) -->
      <h3 class="text-start">
        <span
          data-testid="total-sales"
          data-animation="number"
          data-format="currency"
          :data-value="totalSales"
          >0.00</span
        >
      </h3>

      <!-- 🔸 Porcentaje de incremento (animado) -->
      <div class="text-gray-500 text-start">
        <i class="fa fa-caret-up"></i>
        <span
          data-testid="increase-percent"
          data-animation="number"
          data-format="decimal"
          :data-value="increasePercent"
          >0.00</span
        >%
        {{ t("dashboard.widgets.salesBySocial.increased") }}
      </div>
    </div>

    <!-- 🔸 Lista de fuentes sociales -->
    <div class="widget-list rounded-bottom" data-bs-theme="dark">
      <a
        v-for="source in sources"
        :key="source.nameKey"
        :data-testid="'source-' + source.nameKey.split('.').pop()"
        href="#"
        class="widget-list-item mb-1"
        :class="{
          'pb-3px rounded-bottom': source.isLast,
          'rounded-0 pt-3px': source.isFirst,
        }"
      >
        <div class="widget-list-media icon">
          <i :class="source.iconClass"></i>
        </div>
        <div class="widget-list-content text-start">
          <div class="widget-list-title">{{ t(source.nameKey) }}</div>
        </div>
        <div class="widget-list-action text-nowrap text-gray-500">
          <span
            :data-testid="'value-' + source.nameKey.split('.').pop()"
            data-animation="number"
            data-format="currency"
            :data-value="source.value"
            >0.00</span
          >
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";

// ⛳ i18n
const { t, locale } = useI18n();

// 📊 Datos estáticos (mock)
const sources = [
  {
    nameKey: "dashboard.widgets.salesBySocial.appleStore",
    value: 34840.17,
    iconClass: "fab fa-apple bg-indigo text-white",
    isFirst: true,
    isLast: false,
  },
  {
    nameKey: "dashboard.widgets.salesBySocial.facebook",
    value: 12502.67,
    iconClass: "fab fa-facebook-f bg-blue text-white",
    isFirst: false,
    isLast: false,
  },
  {
    nameKey: "dashboard.widgets.salesBySocial.twitter",
    value: 4799.2,
    iconClass: "fab fa-twitter bg-info text-white",
    isFirst: false,
    isLast: false,
  },
  {
    nameKey: "dashboard.widgets.salesBySocial.google",
    value: 3405.85,
    iconClass: "fab fa-google bg-red text-white",
    isFirst: false,
    isLast: false,
  },
  {
    nameKey: "dashboard.widgets.salesBySocial.instagram",
    value: 758.29,
    iconClass: "fab fa-instagram bg-pink text-white",
    isFirst: false,
    isLast: true,
  },
];

// 📊 Total de ventas (sumatoria)
const totalSales = computed(() => sources.reduce((sum, s) => sum + s.value, 0));

// 📈 Porcentaje de incremento (mock aleatorio entre 30-60%)
const increasePercent = computed(() => +(30 + Math.random() * 30).toFixed(2));

// 🔄 Animación en montaje y cambio de idioma
onMounted(() => animateNumber(locale.value));
watch(locale, () => animateNumber(locale.value));
</script>

<style scoped>
.border-radius-top {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
