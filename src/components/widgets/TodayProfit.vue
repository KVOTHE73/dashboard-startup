<!--
==============================================================================
🔷 TODAYPROFIT
   💡 Widget que muestra el beneficio de hoy:
       🔹 Cantidad total (animada)
       🔹 Barra de progreso visual
       🔹 Texto de pie traducido
==============================================================================

📌 NOTA: Este widget usa datos estáticos locales porque no existe un endpoint en DummyJSON
⚠️ No se accede a la store ni al backend
-->

<template>
  <div class="card-height">
    <div class="widget widget-stats bg-blue border-radius-top">
      <!-- Icono decorativo -->
      <div class="stats-icon stats-icon-lg">
        <i class="fa fa-dollar-sign fa-fw"></i>
      </div>

      <!-- Contenido principal -->
      <div class="stats-content text-start">
        <!-- 🔸 Título -->
        <div class="stats-title">
          {{ t("dashboard.widgets.todayProfit.subTitle") }}
        </div>

        <!-- 🔸 Beneficio (valor animado) -->
        <div class="stats-number">
          <span
            data-animation="number"
            data-format="currency"
            data-value="180200.23"
          >
            0.00
          </span>
        </div>

        <!-- 🔸 Barra de progreso -->
        <div class="stats-progress progress">
          <div class="progress-bar" style="width: 40.5%"></div>
        </div>

        <!-- 🔸 Texto de pie -->
        <div class="stats-desc">
          {{ t("dashboard.widgets.todayProfit.footer") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";

// 🌐 i18n
const { t, locale } = useI18n();

// 🔄 Animaciones al montar y al cambiar idioma
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
.card-height {
  height: 7rem;
}
</style>
