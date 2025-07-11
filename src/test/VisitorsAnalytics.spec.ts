import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import VisitorsAnalytics from "@/components/widgets/VisitorsAnalytics.vue";
import { ref } from "vue";

// 🧪 Mock de i18n
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          visitorsAnalytics: {
            newVisitors: "Nuevos visitantes",
            returningVisitors: "Visitantes recurrentes",
            pageViews: "Vistas de página",
            uniqueVisitors: "Visitantes únicos",
            fromPrevious: "desde el periodo anterior",
          },
        },
      },
    },
  },
});

// 🧪 Mock del composable useAPI
vi.mock("@/composables/useApiDummy", () => ({
  useAPI: () => ({
    getVisitorsAnalytics: ref({
      newVisitors: 13450,
      returningVisitors: 8765,
      pageViews: 22500,
      chartData: {
        uniqueVisitors: [100, 200, 300],
        pageViews: [400, 500, 600],
      },
    }),
    fetchVisitorsAnalytics: vi.fn(),
  }),
}));

// 🧪 Mock de animateNumber (evita errores en DOM)
vi.mock("@/components/app/AnimateNumber", () => ({
  animateNumber: vi.fn(),
}));

// ⛔ Evita que ApexCharts se monte en el test
vi.mock("vue3-apexcharts", () => ({
  default: {
    name: "apexchart",
    template: "<div data-testid='mock-chart'></div>",
  },
}));

describe("VisitorsAnalytics.vue", () => {
  it("renderiza correctamente los datos de visitantes", async () => {
    render(VisitorsAnalytics, {
      global: {
        plugins: [createPinia(), i18n],
      },
    });

    const spans = await screen.findAllByTestId("animated-number");

    expect(spans[0]).toHaveAttribute("data-value", "13.45");
    expect(spans[1]).toHaveAttribute("data-value", "8.765");
    expect(spans[2]).toHaveAttribute("data-value", "22.5");

    expect(screen.getByText("Nuevos visitantes")).toBeInTheDocument();
    expect(screen.getByText("Visitantes recurrentes")).toBeInTheDocument();
    expect(screen.getByText("Vistas de página")).toBeInTheDocument();
  });
});
