import { render, screen, waitFor } from "@testing-library/vue";
import NewOrders from "@/components/widgets/NewOrders.vue";
import { createTestingPinia } from "@pinia/testing";
import { createI18n } from "vue-i18n";
import { vi } from "vitest";

// 🌐 i18n dummy
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          newOrders: {
            subTitle: "Nuevos pedidos",
            footerUp: "¡Buen trabajo!",
            footerDown: "Hay que aumentar las ventas",
          },
        },
      },
    },
  },
});

// 🛠️ Mock de useAPI para datos de carrito
vi.mock("@/composables/useApiDummy", () => {
  return {
    useAPI: () => ({
      fetchCarts: vi.fn(),
      getCarts: {
        value: Array.from({ length: 40 }, (_, i) => ({ id: i + 1 })),
      },
    }),
  };
});

describe("NewOrders.vue", () => {
  it("renderiza el número total de pedidos correctamente", async () => {
    render(NewOrders, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const span = await screen.findByTestId("orders-count");
    expect(span.getAttribute("data-value")).toBe("40");
  });

  it("renderiza una barra de progreso con porcentaje válido", async () => {
    render(NewOrders, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const bar = await screen.findByTestId("progress-bar");
    const width = bar.getAttribute("style");
    expect(width).toMatch(/width:\s*\d+%/);
  });

  it("muestra un texto de pie con el porcentaje correcto", async () => {
    render(NewOrders, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const footer = await screen.findByTestId("footer-text");
    await waitFor(() => {
      expect(footer.textContent).toMatch(/(\+|\-)?\d+%/);
    });
  });
});
