<!--
==============================================================================
🔷 NEWORDERS
   💡 Widget que muestra el total de nuevos pedidos desde la API:
       🔹 Número animado con efecto visual
       🔹 Barra de progreso basada en crecimiento
       🔹 Pie de texto dinámico traducido (positivo o negativo)
==============================================================================
-->
<template>
  <div class="card-height">
    <div class="widget widget-stats bg-indigo border-radius-top">
      <!-- Icono decorativo -->
      <div class="stats-icon stats-icon-lg">
        <i class="fa fa-archive fa-fw"></i>
      </div>

      <!-- Contenido principal -->
      <div class="stats-content text-start">
        <!-- 🔸 Título -->
        <div class="stats-title">
          {{ t("dashboard.widgets.newOrders.subTitle") }}
        </div>

        <!-- 🔸 Número total de pedidos (animado) -->
        <div class="stats-number">
          <span
            data-animation="number"
            data-format="integer"
            :data-value="totalOrders"
          >
            0
          </span>
        </div>

        <!-- 🔸 Barra de progreso basada en crecimiento -->
        <div class="stats-progress progress">
          <div
            class="progress-bar"
            :style="{ width: `${growthPercent}%` }"
          ></div>
        </div>

        <!-- 🔸 Pie de texto con crecimiento dinámico -->
        <div class="stats-desc">
          {{ footerText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch, computed, ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";
import { useAPI } from "@/composables/useApiDummy";

// ⛳ i18n
const { t, locale } = useI18n();

// 📦 Acceso a datos desde la store vía composable
const { getCarts, fetchCarts } = useAPI();

// 💾 Valor anterior (simulado una vez se cargan los datos)
const previousValue = ref(0);

// 📊 Total actual de pedidos
const totalOrders = computed(() => getCarts.value.length);

// 📊 Porcentaje de crecimiento
const growthPercent = computed(() => {
  if (previousValue.value === 0) return 0;
  return Math.min(
    Math.round(
      ((totalOrders.value - previousValue.value) / previousValue.value) * 100
    ),
    100
  );
});

// 📊 Pie de texto dinámico
const footerText = computed(() =>
  growthPercent.value > 0
    ? `${t("dashboard.widgets.newOrders.footerUp")} (+${growthPercent.value}%)`
    : growthPercent.value < 0
      ? `${t("dashboard.widgets.newOrders.footerDown")} (${growthPercent.value}%)`
      : `${t("dashboard.widgets.newOrders.footerUp")} (0%)`
);

// 🔄 Ciclo de vida
onMounted(async () => {
  await fetchCarts();

  // 🧮 Calculamos previousValue después de obtener los datos
  previousValue.value = Math.floor(
    getCarts.value.length * (0.7 + Math.random() * 0.2)
  );

  await nextTick();
  animateNumber(locale.value);
});

watch(locale, () => animateNumber(locale.value));
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
