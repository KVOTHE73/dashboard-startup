<template>
  <div class="card-height">
    <div class="widget widget-stats bg-blue border-radius-top">
      <div class="stats-icon stats-icon-lg">
        <i class="fa fa-dollar-sign fa-fw"></i>
      </div>
      <div class="stats-content text-start">
        <div class="stats-title">
          {{ t("dashboard.widgets.todayProfit.subTitle") }}
        </div>
        <div class="stats-number">
          <span
            data-animation="number"
            data-format="currency"
            data-value="180200.23"
            >0.00</span
          >
        </div>
        <div class="stats-progress progress">
          <div class="progress-bar" style="width: 40.5%"></div>
        </div>
        <div class="stats-desc">
          {{ t("dashboard.widgets.todayProfit.footer") }}
        </div>
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
