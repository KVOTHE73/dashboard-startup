<template>
  <div class="card border-0 bg-gray-800 text-white border-radius-top">
    <div class="card-body mb-3">
      <!-- Primer bloque -->
      <div class="row align-items-center pb-1px mb-3">
        <div class="col-4">
          <div class="h-100px d-flex align-items-center justify-content-center">
            <img src="/assets/img/svg/img-2.svg" class="mw-100 mh-100" />
          </div>
        </div>
        <div class="col-8">
          <div class="mb-2px text-truncate text-start">
            {{ t("dashboard.widgets.marketingCampaign.emailTitle") }}
          </div>
          <div class="mb-2px text-gray-500 small text-start">
            {{ emailDateLabel }}
          </div>
          <div class="d-flex align-items-center mb-2px">
            <div class="flex-grow-1">
              <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                <div
                  class="progress-bar progress-bar-striped bg-indigo"
                  data-animation="width"
                  data-value="80%"
                  style="width: 0%"
                ></div>
              </div>
            </div>
            <div class="ms-2 small w-30px text-center">
              <span
                data-animation="number"
                data-format="integer"
                data-value="80"
                >0</span
              >%
            </div>
          </div>
          <div class="text-gray-500 small mb-15px text-truncate text-start">
            57.5% {{ t("dashboard.widgets.marketingCampaign.peopleClick") }}
          </div>
          <div class="text-start">
            <a href="#" class="btn btn-xs btn-indigo fs-10px ps-2 pe-2">
              {{ t("dashboard.widgets.marketingCampaign.viewCampaign") }}
            </a>
          </div>
        </div>
      </div>

      <hr class="bg-white bg-opacity-20 mt-20px mb-20px" />

      <!-- Segundo bloque -->
      <div class="row align-items-center mb-1">
        <div class="col-4">
          <div class="h-100px d-flex align-items-center justify-content-center">
            <img src="/assets/img/svg/img-3.svg" class="mw-100 mh-100" />
          </div>
        </div>
        <div class="col-8">
          <div class="mb-2px text-truncate text-start">
            {{ t("dashboard.widgets.marketingCampaign.fbTitle") }}
          </div>
          <div class="mb-2px text-gray-500 small text-start">
            {{ fbDateLabel }}
          </div>
          <div class="d-flex align-items-center mb-2px">
            <div class="flex-grow-1">
              <div class="progress h-5px rounded-pill bg-white bg-opacity-10">
                <div
                  class="progress-bar progress-bar-striped bg-warning"
                  data-animation="width"
                  data-value="60%"
                  style="width: 0%"
                ></div>
              </div>
            </div>
            <div class="ms-2 small w-30px text-center">
              <span
                data-animation="number"
                data-format="integer"
                data-value="60"
                >0</span
              >%
            </div>
          </div>
          <div class="text-gray-500 small mb-15px text-truncate text-start">
            +124k {{ t("dashboard.widgets.marketingCampaign.visitorsFromFB") }}
          </div>
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
import { onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { animateNumber } from "@/components/app/AnimateNumber";

const { t, locale } = useI18n();

const emailStart = new Date(2025, 5, 12); // 12/06/2025
const emailEnd = new Date(2025, 5, 18); // 18/06/2025
const fbStart = new Date(2025, 5, 10);
const fbEnd = new Date(2025, 5, 18);

const emailDateLabel = computed(() => {
  const l = locale.value === "es" ? es : enUS;
  return `${format(emailStart, "EEE dd/M", { locale: l })} - ${format(emailEnd, "EEE dd/M", { locale: l })}`;
});

const fbDateLabel = computed(() => {
  const l = locale.value === "es" ? es : enUS;
  return `${format(fbStart, "EEE dd/M", { locale: l })} - ${format(fbEnd, "EEE dd/M", { locale: l })}`;
});

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
