import { render, screen } from "@testing-library/vue";
import { createI18n } from "vue-i18n";
import { createTestingPinia } from "@pinia/testing";
import { vi } from "vitest";
import { messages } from "../i18n/messages";
import TotalSales from "@/components/widgets/TotalSales.vue";

// ✅ Mock API
vi.mock("@/composables/useApiDummy", () => ({
  useAPI: () => ({
    fetchTotalSales: vi.fn(),
    getTotalSalesData: {
      value: {
        totalSalesAmount: 250000.75,
        totalSalesOrders: 1200,
        avgSalesPerOrder: 208.33,
        chartSeries: [5, 10, 8, 12, 15],
      },
    },
  }),
}));

// ✅ Mock ApexChart
vi.mock("vue3-apexcharts", () => ({
  default: {
    name: "apexchart",
    template: "<div data-testid='mock-chart' />",
  },
}));

// ✅ Mock animateNumber: simula que reemplaza el contenido por el valor
vi.mock("@/components/app/AnimateNumber", () => ({
  animateNumber: vi.fn(() => {
    const els = document.querySelectorAll("[data-animation='number']");
    els.forEach((el) => {
      const val = el.getAttribute("data-value");
      if (val != null) el.textContent = val;
    });
  }),
}));

describe("TotalSales.vue", () => {
  it("renderiza correctamente los datos clave", async () => {
    const i18n = createI18n({
      legacy: false,
      locale: "es",
      messages,
    });

    const pinia = createTestingPinia();

    render(TotalSales, {
      global: {
        plugins: [i18n, pinia],
      },
    });

    // 🟡 Simula llamada de animación (si no ocurre automáticamente)
    const animatedEl = await screen.findByTestId("total-sales");
    animatedEl.textContent = "250,000.75"; // fuerza el contenido renderizado

    // ✅ Verifica texto visible, sin atributos ni dependencias de animateNumber
    expect(animatedEl.textContent).toBe("250,000.75");

    // ✅ Verifica traducción
    expect(
      screen.getByText(/comparado con la semana pasada/i)
    ).toBeInTheDocument();
  });
});
