<!--
==============================================================================
🔷 MARKETINGCAMPAIGN
    💡 Este componente muestra el progreso de campañas de marketing activas:
        🔹 Incluye dos campañas: Email y Facebook
        🔹 Muestra fechas de campaña con formato localizado
        🔹 Muestra barra de progreso animada en anchura (`data-animation="width"`)
        🔹 Muestra valor porcentual animado con `data-animation="number"`
        🔹 Se apoya en date-fns para formateo y `animateNumber` para animaciones
==============================================================================
-->

<template>
  <div class="card border-0 bg-gray-800 text-white border-radius-top">
    <div class="card-body mb-3">
      <!-- =========================================================================
      📨 CAMPAÑA DE EMAIL
      ========================================================================== -->
      <div
        class="row align-items-center pb-1px mb-3"
        data-testid="email-campaign"
      >
        <!-- 🖼 Imagen ilustrativa -->
        <div class="col-4">
          <div class="h-100px d-flex align-items-center justify-content-center">
            <img src="/assets/img/svg/img-2.svg" class="mw-100 mh-100" />
          </div>
        </div>

        <!-- 📊 Datos de la campaña -->
        <div class="col-8">
          <div class="mb-2px text-truncate text-start">
            {{ t("dashboard.widgets.marketingCampaign.emailTitle") }}
          </div>
          <div class="mb-2px text-gray-500 small text-start">
            {{ emailDateLabel }}
          </div>

          <!-- 📈 Barra de progreso animada -->
          <div class="d-flex align-items-center mb-2px">
            <div class="flex-grow-1">
              <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                <div
                  class="progress-bar progress-bar-striped bg-indigo"
                  data-animation="width"
                  :data-value="`${emailProgress}%`"
                  style="width: 0%"
                ></div>
              </div>
            </div>
            <div class="ms-2 small w-30px text-center">
              <span
                data-animation="number"
                data-format="integer"
                :data-value="emailProgress"
                >0</span
              >%
            </div>
          </div>

          <!-- 💬 Texto explicativo -->
          <div class="text-gray-500 small mb-15px text-truncate text-start">
            57.5% {{ t("dashboard.widgets.marketingCampaign.peopleClick") }}
          </div>

          <!-- 🔗 Enlace a la campaña -->
          <div class="text-start">
            <a href="#" class="btn btn-xs btn-indigo fs-10px ps-2 pe-2">
              {{ t("dashboard.widgets.marketingCampaign.viewCampaign") }}
            </a>
          </div>
        </div>
      </div>

      <!-- Separador -->
      <hr class="bg-white bg-opacity-20 mt-20px mb-20px" />

      <!-- =========================================================================
      📘 CAMPAÑA DE FACEBOOK
      ========================================================================== -->
      <div class="row align-items-center mb-1" data-testid="fb-campaign">
        <!-- 🖼 Imagen ilustrativa -->
        <div class="col-4">
          <div class="h-100px d-flex align-items-center justify-content-center">
            <img src="/assets/img/svg/img-3.svg" class="mw-100 mh-100" />
          </div>
        </div>

        <!-- 📊 Datos de la campaña -->
        <div class="col-8">
          <div class="mb-2px text-truncate text-start">
            {{ t("dashboard.widgets.marketingCampaign.fbTitle") }}
          </div>
          <div class="mb-2px text-gray-500 small text-start">
            {{ fbDateLabel }}
          </div>

          <!-- 📈 Barra de progreso animada -->
          <div class="d-flex align-items-center mb-2px">
            <div class="flex-grow-1">
              <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                <div
                  class="progress-bar progress-bar-striped bg-warning"
                  data-animation="width"
                  :data-value="`${fbProgress}%`"
                  style="width: 0%"
                ></div>
              </div>
            </div>
            <div class="ms-2 small w-30px text-center">
              <span
                data-animation="number"
                data-format="integer"
                :data-value="fbProgress"
                >0</span
              >%
            </div>
          </div>

          <!-- 💬 Texto explicativo -->
          <div class="text-gray-500 small mb-15px text-truncate text-start">
            +124k {{ t("dashboard.widgets.marketingCampaign.visitorsFromFB") }}
          </div>

          <!-- 🔗 Enlace a la campaña -->
          <div class="text-start">
            <a href="#" class="btn btn-xs btn-warning fs-10px ps-2 pe-2">
              {{ t("dashboard.widgets.marketingCampaign.viewCampaign") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { animateNumber } from "@/components/app/AnimateNumber";

// 🌐 i18n
const { t, locale } = useI18n();

// 📁 Progreso simulado (aleatorio entre 60 y 90)
const emailProgress = ref(Math.floor(Math.random() * 30 + 60));
const fbProgress = ref(Math.floor(Math.random() * 30 + 60));

// 🗓 Fechas de campaña
const emailStart = new Date(2025, 5, 12); // 12/06/2025
const emailEnd = new Date(2025, 5, 18); // 18/06/2025
const fbStart = new Date(2025, 5, 10);
const fbEnd = new Date(2025, 5, 18);

// 🧮 Computed con formato localizado
const emailDateLabel = computed(() => {
  const l = locale.value === "es" ? es : enUS;
  return `${format(emailStart, "EEE dd/M", { locale: l })} - ${format(emailEnd, "EEE dd/M", { locale: l })}`;
});

const fbDateLabel = computed(() => {
  const l = locale.value === "es" ? es : enUS;
  return `${format(fbStart, "EEE dd/M", { locale: l })} - ${format(fbEnd, "EEE dd/M", { locale: l })}`;
});

// 🔄 Animaciones
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
</style>
