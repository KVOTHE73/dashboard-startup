<!--
==============================================================================
🔷 NEWCOMMENTS
   💡 Widget que muestra el total de nuevos comentarios obtenidos desde la API:
       🔹 Número animado con efecto visual
       🔹 Barra de progreso calculada en base al crecimiento respecto al valor anterior
       🔹 Pie de texto dinámico con mensaje positivo o negativo
==============================================================================
-->
<template>
  <div class="card-height">
    <div class="widget widget-stats bg-dark border-radius-top">
      <!-- Icono decorativo -->
      <div class="stats-icon stats-icon-lg">
        <i class="fa fa-comment-alt fa-fw"></i>
      </div>

      <!-- Contenido principal -->
      <div class="stats-content text-start">
        <!-- 🔸 Título -->
        <div class="stats-title">
          {{ t("dashboard.widgets.newComments.subTitle") }}
        </div>

        <!-- 🔸 Número total de comentarios (animado) -->
        <div class="stats-number">
          <span
            data-animation="number"
            data-format="integer"
            :data-value="totalComments"
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
import { onMounted, watch, computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";
import { useAPI } from "@/composables/useApiDummy";

// ⛳ i18n
const { t, locale } = useI18n();

// 📦 Acceso a datos desde la store vía composable
const { getComments, fetchComments } = useAPI();

// 💾 Valor simulado anterior (para calcular el crecimiento)
const previousValue = Math.floor(
  getComments.value.length * (0.7 + Math.random() * 0.3)
);

// 📊 Valor total actual de comentarios
const totalComments = computed(() => getComments.value.length);

// 📊 Porcentaje de crecimiento
const growthPercent = computed(() =>
  Math.min(
    Math.round(((totalComments.value - previousValue) / previousValue) * 100),
    100
  )
);

// 📊 Texto del pie según crecimiento
const footerText = computed(() =>
  growthPercent.value > 0
    ? `${t("dashboard.widgets.newComments.footerUp")} (+${growthPercent.value}%)`
    : growthPercent.value < 0
      ? `${t("dashboard.widgets.newComments.footerDown")} (${growthPercent.value}%)`
      : `${t("dashboard.widgets.newComments.footerUp")} (0%)`
);

// 🔄 Ciclo de vida
onMounted(async () => {
  await fetchComments(); // desde la store
  await nextTick(); // aseguramos que el DOM está listo
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
