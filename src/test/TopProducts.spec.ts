import { render, screen } from "@testing-library/vue";
import TopProducts from "@/components/widgets/TopProducts.vue";
import { createTestingPinia } from "@pinia/testing";
import { createI18n } from "vue-i18n";
import { messages } from "../i18n/messages";
import { beforeEach, expect, test } from "vitest";

// 🌐 i18n instanciado manualmente para testing
const i18n = createI18n({
  legacy: false,
  locale: "es",
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});

test("renderiza un producto con unidades vendidas", async () => {
  render(TopProducts, {
    global: {
      plugins: [
        createTestingPinia({
          stubActions: false,
          initialState: {
            dummyStore: {
              topProducts: [
                {
                  id: 1,
                  name: "Producto de prueba",
                  priceValue: 19.99,
                  unitsSold: 1200,
                  image: "https://dummyimage.com/100x100/000/fff",
                },
              ],
            },
          },
        }),
        i18n,
      ],
    },
  });

  expect(screen.getByText("Producto de prueba")).toBeInTheDocument();
  expect(
    screen.getByText((text) => text.includes("19,99") && text.includes("€"))
  ).toBeInTheDocument();
  expect(screen.getByText("vendidos")).toBeInTheDocument();
});

test("muestra mensaje si no hay productos", async () => {
  render(TopProducts, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            dummyStore: {
              topProducts: [],
            },
          },
        }),
        i18n,
      ],
    },
  });

  expect(screen.getByText(/no hay productos/i)).toBeInTheDocument();
});
