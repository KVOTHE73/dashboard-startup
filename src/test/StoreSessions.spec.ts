import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { createI18n } from "vue-i18n";
import StoreSessions from "@/components/widgets/StoreSessions.vue";
import { messages } from "../i18n/messages";
import { vi } from "vitest";

// Mock completo del componente gráfico
vi.mock("vue3-apexcharts", () => ({
  default: {
    name: "ApexChart",
    template: "<div data-testid='apex-chart'>Mock Chart</div>",
  },
}));

// I18n en español
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages,
});

describe("StoreSessions.vue", () => {
  it("renderiza correctamente los textos clave", async () => {
    render(StoreSessions, {
      global: {
        plugins: [
          createTestingPinia(), // ⬅️ registra automáticamente todas las stores que se usen
          i18n,
        ],
      },
    });

    // Traducciones visibles
    expect(
      screen.getByText(/comparado con la semana pasada/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Móvil")).toBeInTheDocument();
    expect(screen.getByText("Escritorio")).toBeInTheDocument();
    const tabletElements = screen.getAllByText((_, el) =>
      !!el && el.textContent ? el.textContent.includes("Tableta") : false
    );

    expect(tabletElements.length).toBeGreaterThan(0);

    // Mock del gráfico
    expect(screen.getByTestId("apex-chart")).toBeInTheDocument();
  });
});
