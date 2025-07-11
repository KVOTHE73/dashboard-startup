import { render, screen } from "@testing-library/vue";
import ConversionRate from "@/components/widgets/ConversionRate.vue";
import { createTestingPinia } from "@pinia/testing";
import { createI18n } from "vue-i18n";

// 🛠️ Mock de ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// 🛠️ Mock para evitar fallo getBBox de ApexCharts
beforeAll(() => {
  if (!(window.SVGElement.prototype as any).getBBox) {
    (window.SVGElement.prototype as any).getBBox = () => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  }
});

// 🌐 i18n dummy
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          conversionRate: {
            compareLastWeek: "vs semana anterior",
            addedToCart: "añadido al carrito",
            reachedeCheckout: "llegaron al checkout",
            sessionsConverted: "sesiones convertidas",
          },
        },
      },
    },
  },
});

describe("ConversionRate.vue", () => {
  it("muestra los textos estáticos correctamente", () => {
    render(ConversionRate, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    expect(screen.getByText(/vs semana anterior/i)).toBeInTheDocument();
    expect(screen.getByText(/añadido al carrito/i)).toBeInTheDocument();
    expect(screen.getByText(/llegaron al checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/sesiones convertidas/i)).toBeInTheDocument();
  });

  it("renderiza 3 métricas principales", () => {
    render(ConversionRate, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const metrics = screen.getAllByTestId("conversion-metric");
    expect(metrics.length).toBe(3); // carrito, checkout, sesiones
  });
});
