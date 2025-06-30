<template>
  <div class="card border-0 mb-3 bg-gray-900 text-white">
    <div
      class="card-body"
      style="
        background: no-repeat bottom right;
        background-image: url(/assets/img/svg/img-4.svg);
        background-size: auto 60%;
      "
    >
      <div class="mb-3 text-gray-500">
        <b>{{ t("dashboard.widgets.salesBySocial.title") }}</b>
        <span class="ms-2">
          <i
            class="fa fa-info-circle"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            :data-bs-title="t('dashboard.widgets.salesBySocial.tooltipTitle')"
            data-bs-placement="top"
            :data-bs-content="
              t('dashboard.widgets.salesBySocial.tooltipContent')
            "
          >
          </i>
        </span>
      </div>
      <h3 class="mb-10px">
        $<span data-animation="number" data-value="55547.89">0.00</span>
      </h3>
      <div class="text-gray-500 mb-1px">
        <i class="fa fa-caret-up"></i>
        <span data-animation="number" data-value="45.76">0.00</span>%
        {{ t("dashboard.widgets.salesBySocial.increased") }}
      </div>
    </div>
    <div class="widget-list rounded-bottom" data-bs-theme="dark">
      <div
        v-for="item in socialSources"
        :key="item.name"
        class="widget-list-item rounded-0 pt-3px"
      >
        <div class="widget-list-media icon">
          <i :class="item.icon"></i>
        </div>
        <div class="widget-list-content">
          <div class="widget-list-title">{{ item.name }}</div>
        </div>
        <div class="widget-list-action text-nowrap text-gray-500">
          $<span data-animation="number" :data-value="item.value">0.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

// 🌐 i18n
const { t } = useI18n();

const socialSources = [
  {
    name: "Apple Store",
    value: 34840.17,
    icon: "fab fa-apple bg-indigo text-white",
  },
  {
    name: "Facebook",
    value: 12502.67,
    icon: "fab fa-facebook-f bg-blue text-white",
  },
  { name: "Twitter", value: 4799.2, icon: "fab fa-twitter bg-info text-white" },
  {
    name: "Google Adwords",
    value: 3405.85,
    icon: "fab fa-google bg-red text-white",
  },
  {
    name: "Instagram",
    value: 0.0,
    icon: "fab fa-instagram bg-pink text-white",
  },
];
</script>
