<template>
  <div class="card-height">
    <div class="widget widget-stats bg-red border-radius-top">
      <div class="stats-icon"><i class="fa fa-clock"></i></div>

      <div class="stats-info text-start">
        <h4>{{ t("dashboard.widgets.avgTimeSite.period") }}</h4>
        <p>00:12:23</p>
      </div>
      <div class="stats-link">
        <a href="javascript:;"
          >{{ t("dashboard.widgets.avgTimeSite.detail") }}
          <i class="fa fa-arrow-alt-circle-right"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";

const { t, locale } = useI18n();

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
