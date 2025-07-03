<template>
  <div class="card-height">
    <div class="widget widget-stats bg-blue border-radius-top">
      <div class="stats-icon"><i class="fa fa-desktop"></i></div>

      <div class="stats-info text-start">
        <h4>{{ t("dashboard.widgets.totalVisitors.period") }}</h4>
        <p>
          <span
            data-animation="number"
            data-format="integer"
            data-value="3291922"
            >0</span
          >
        </p>
      </div>
      <div class="stats-link">
        <a href="javascript:;"
          >{{ t("dashboard.widgets.totalVisitors.detail") }}
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
