<template>
  <div class="card border-0 bg-gray-800 text-white border-radius-top">
    <div class="card-body">
      <div
        v-for="product in products"
        :key="product.name"
        class="d-flex align-items-center mb-15px"
      >
        <div class="widget-img rounded-3 me-10px bg-white p-3px w-30px">
          <div
            class="h-100 w-100"
            :style="`background: url(${product.image}) center no-repeat; background-size: auto 100%;`"
          ></div>
        </div>
        <div class="text-truncate">
          <div>{{ product.name }}</div>
          <div class="text-gray-500 text-start">
            {{ formatPrice(product.priceValue) }}
          </div>
        </div>
        <div class="ms-auto text-center">
          <div class="fs-13px">
            <span
              data-animation="number"
              data-format="integer"
              :data-value="product.unitsSold"
              >0</span
            >
          </div>
          <div class="text-gray-500 fs-10px">
            {{ t("dashboard.widgets.topProducts.soldLabel") }}
          </div>
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

const products = [
  {
    name: "Apple iPhone XR (2025)",
    priceValue: 799.0,
    unitsSold: 195,
    image: "/assets/img/product/product-8.jpg",
  },
  {
    name: "Apple iPhone XS (2025)",
    priceValue: 1199.0,
    unitsSold: 185,
    image: "/assets/img/product/product-9.jpg",
  },
  {
    name: "Apple iPhone XS Pro Max (2025)",
    priceValue: 1399.0,
    unitsSold: 129,
    image: "/assets/img/product/product-10.jpg",
  },
  {
    name: "Huawei Y5 (2025)",
    priceValue: 99.0,
    unitsSold: 96,
    image: "/assets/img/product/product-11.jpg",
  },
  {
    name: "Huawei Nova 4 (2025)",
    priceValue: 499.0,
    unitsSold: 55,
    image: "/assets/img/product/product-12.jpg",
  },
];

function formatPrice(value: number) {
  if (locale.value === "en") {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  } else if (locale.value === "es") {
    return `${value.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €`;
  }
  return value.toString();
}

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
