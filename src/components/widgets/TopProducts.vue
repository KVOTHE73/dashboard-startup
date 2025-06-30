<template>
  <div class="card border-0 mb-3 bg-gray-800 text-white">
    <div class="card-body">
      <div class="mb-3 text-gray-500">
        <b>{{ t("dashboard.widgets.topProducts.title") }}</b>
        <span class="ms-2">
          <i
            class="fa fa-info-circle"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            :data-bs-title="t('dashboard.widgets.topProducts.tooltipTitle')"
            data-bs-placement="top"
            :data-bs-content="t('dashboard.widgets.topProducts.tooltipContent')"
          >
          </i>
        </span>
      </div>
      <div
        v-for="product in products"
        :key="product.name"
        class="d-flex align-items-center mb-15px"
      >
        <div class="widget-img rounded-3 me-10px bg-white p-3px w-30px">
          <div
            class="h-100 w-100"
            :style="`background: url(${product.img}) center no-repeat; background-size: auto 100%;`"
          ></div>
        </div>
        <div class="text-truncate">
          <div>{{ product.name }}</div>
          <div class="text-gray-500">{{ product.price }}</div>
        </div>
        <div class="ms-auto text-center">
          <div class="fs-13px">
            <span data-animation="number" :data-value="product.sold">0</span>
          </div>
          <div class="text-gray-500 fs-10px">
            {{ t("dashboard.widgets.topProducts.sold") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

// 🌐 i18n
const { t } = useI18n();

const products = [
  {
    name: "Apple iPhone XR (2025)",
    price: "$799.00",
    sold: 195,
    img: "/assets/img/product/product-8.jpg",
  },
  {
    name: "Apple iPhone XS (2025)",
    price: "$1,199.00",
    sold: 185,
    img: "/assets/img/product/product-9.jpg",
  },
  {
    name: "Apple iPhone XS Max (2025)",
    price: "$3,399",
    sold: 129,
    img: "/assets/img/product/product-10.jpg",
  },
  {
    name: "Huawei Y5 (2025)",
    price: "$99.00",
    sold: 96,
    img: "/assets/img/product/product-11.jpg",
  },
  {
    name: "Huawei Nova 4 (2025)",
    price: "$499.00",
    sold: 55,
    img: "/assets/img/product/product-12.jpg",
  },
];
</script>
