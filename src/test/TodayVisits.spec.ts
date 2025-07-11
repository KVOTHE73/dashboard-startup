import { render, screen } from "@testing-library/vue";
import TodayVisits from "@/components/widgets/TodayVisits.vue";
import { createTestingPinia } from "@pinia/testing";
import { createI18n } from "vue-i18n";
import { vi } from "vitest";

// 📌 i18n simulado
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          todayVisits: {
            subTitle: "Visitas de hoy",
            footer: "Comparado con el día anterior",
          },
        },
      },
    },
  },
});

// 📌 Mock de la store con datos personalizados
const mockGetTodayVisitsData = vi.fn(() => ({
  todayVisits: 1234,
  progress: 76.5,
}));

vi.mock("@/stores/dummyStore", () => ({
  useDummyStore: () => ({
    getTodayVisitsData: mockGetTodayVisitsData,
  }),
}));

describe("TodayVisits.vue", () => {
  it("renderiza correctamente los textos y datos clave", async () => {
    render(TodayVisits, {
      global: {
        plugins: [i18n, createTestingPinia()],
      },
    });

    // 🔸 Subtítulo traducido
    expect(screen.getByText("Visitas de hoy")).toBeInTheDocument();

    // 🔸 Footer traducido
    expect(
      screen.getByText("Comparado con el día anterior")
    ).toBeInTheDocument();

    // 🔸 Número renderizado
    const span = screen.getByText("0");
    expect(span).toBeInTheDocument();
    expect(span).toHaveAttribute("data-value", "1234");

    // 🔸 Barra de progreso
    const progressBar = document.querySelector(".progress-bar");
    expect(progressBar).not.toBeNull();
    expect(progressBar?.getAttribute("style")).toContain("width: 76.5%");
  });
});
