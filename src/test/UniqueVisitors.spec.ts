import { render, screen, waitFor } from "@testing-library/vue";
import UniqueVisitors from "@/components/widgets/UniqueVisitors.vue";
import { createI18n } from "vue-i18n";
import { vi } from "vitest";

// 🧪 Traducciones mínimas simuladas
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          uniqueVisitors: {
            period: "Usuarios únicos esta semana",
            detail: "Ver detalle",
          },
        },
      },
    },
  },
});

// 🧪 Mock de la store con datos estáticos
vi.mock("@/composables/useApiDummy", () => {
  return {
    useAPI: () => ({
      getUniqueVisitorsData: {
        uniqueVisitors: 54321,
      },
      fetchUniqueVisitors: vi.fn(),
    }),
  };
});

describe("UniqueVisitors.vue", () => {
  it("renderiza correctamente los visitantes únicos", async () => {
    render(UniqueVisitors, {
      global: {
        plugins: [i18n],
      },
    });

    // Espera al atributo con el valor correcto
    await waitFor(() => {
      const el = screen.getByText("0");
      expect(el).toHaveAttribute("data-value", "54321");
    });

    // Verifica textos traducidos visibles
    expect(screen.getByText("Usuarios únicos esta semana")).toBeInTheDocument();
    expect(screen.getByText("Ver detalle")).toBeInTheDocument();
  });
});
