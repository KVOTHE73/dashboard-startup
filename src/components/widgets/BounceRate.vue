<!--
========================================================================
🔷 BOUNCERATE WIDGET
   💡 Este componente muestra la tasa de rebote estimada del sitio.
       🔹 El valor se calcula localmente de forma aleatoria al montar.
       🔹 Usa `data-animation="number"` para animar con AnimateNumber.
       🔹 La animación se relanza al cambiar el idioma.
========================================================================
-->
<template>
  <div class="card-height">
    <div class="widget widget-stats bg-info border-radius-top">
      <div class="stats-icon"><i class="fa fa-link"></i></div>

      <div class="stats-info text-start">
        <h4>{{ t("dashboard.widgets.bounceRate.period") }}</h4>
        <p>
          <!-- 💡 Se usa data-animation para activar animateNumber -->
          <span
            data-animation="number"
            data-format="decimal"
            :data-value="bounceRate.toFixed(2)"
            >0.00</span
          >%
        </p>
      </div>

      <div class="stats-link">
        <a href="javascript:;">
          {{ t("dashboard.widgets.bounceRate.detail") }}
          <i class="fa fa-arrow-alt-circle-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { ref, onMounted, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";

// ⛳ i18n
const { t, locale } = useI18n();

// 📁 Estado local
const bounceRate = ref(0);

// 🔧 Función auxiliar para generar un valor aleatorio
function generateRandomBounceRate(): number {
  return Math.random() * (60 - 15) + 15; // entre 15% y 60%
}

// 🔄 Ciclo de vida
onMounted(async () => {
  bounceRate.value = generateRandomBounceRate();
  await nextTick(); // asegura que el DOM ya tiene el nuevo data-value
  animateNumber(locale.value); // ✅ se llama sin pasarle el ref
});

// 🧩 Relanza la animación si cambia el idioma
watch(locale, async () => {
  await nextTick();
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
