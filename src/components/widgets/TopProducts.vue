<!--
==============================================================================
🔷 TOP PRODUCTS
   💡 Widget que muestra los productos más vendidos:
       🔹 Imagen y nombre del producto
       🔹 Precio formateado según el idioma
       🔹 Unidades vendidas (número animado)
==============================================================================
-->
<template>
  <div class="card border-0 bg-gray-800 text-white border-radius-top">
    <div class="card-body">
      <template v-if="topProducts.length">
        <!-- 🔁 Listado de productos -->
        <div
          v-for="product in topProducts"
          :key="product.id"
          class="d-flex align-items-center mb-15px"
        >
          <!-- 🖼️ Imagen del producto -->
          <div class="widget-img rounded-3 me-10px bg-white p-3px w-30px">
            <div
              class="h-100 w-100"
              :style="`background: url(${product.image}) center no-repeat; background-size: auto 100%;`"
            ></div>
          </div>

          <!-- 📦 Nombre y precio -->
          <div class="text-truncate">
            <div>{{ product.name }}</div>
            <div class="text-gray-500 text-start">
              {{ formatPrice(product.priceValue) }}
            </div>
          </div>

          <!-- 🔢 Unidades vendidas -->
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
      </template>

      <!-- ⚠️ Si no hay productos -->
      <template v-else>
        <div
          class="text-center text-gray-500 py-20px"
          data-testid="no-products-msg"
        >
          {{ t("dashboard.widgets.topProducts.noProducts") }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// ⛳ Imports
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { animateNumber } from "@/components/app/AnimateNumber";
import { useAPI } from "@/composables/useApiDummy";

// ⛳ i18n
const { t, locale } = useI18n();

// 📦 Acceso a datos desde la store vía composable
const { getTopProducts, fetchTopProducts } = useAPI();
const topProducts = getTopProducts;

// 💱 Formateo de precio según idioma
function formatPrice(value: number) {
  if (locale.value === "en") {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  } else if (locale.value === "es") {
    return `${value.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €`;
  }
  return value.toString();
}

// 🔄 Ciclo de vida
onMounted(async () => {
  await fetchTopProducts();
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
