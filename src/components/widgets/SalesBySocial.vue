<template>
  <div class="card border-0 bg-gray-900 text-white border-radius-top">
    <!-- Card Body -->
    <div
      class="card-body"
      style="
        background: no-repeat bottom right;
        background-image: url(/assets/img/svg/img-4.svg);
        background-size: auto 80%;
      "
    >
      <h3 class="text-start">
        <span
          data-animation="number"
          data-format="currency"
          :data-value="55547.89"
          >0.00</span
        >
      </h3>
      <div class="text-gray-500 text-start">
        <i class="fa fa-caret-up"></i>
        <span data-animation="number" data-format="decimal" :data-value="45.76"
          >0.00</span
        >%
        {{ t("dashboard.widgets.salesBySocial.increased") }}
      </div>
    </div>

    <!-- List -->
    <div class="widget-list rounded-bottom" data-bs-theme="dark">
      <a
        v-for="source in sources"
        :key="source.nameKey"
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
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";

const { t, locale } = useI18n();

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
