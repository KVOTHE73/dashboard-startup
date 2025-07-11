import { render, screen } from "@testing-library/vue";
import TodayProfit from "@/components/widgets/TodayProfit.vue";
import { createI18n } from "vue-i18n";

// 🧪 i18n básico
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          todayProfit: {
            subTitle: "Beneficio de hoy",
            footer: "Comparado con el día anterior",
          },
        },
      },
    },
  },
});

describe("TodayProfit.vue", () => {
  it("renderiza correctamente los textos clave", () => {
    render(TodayProfit, {
      global: {
        plugins: [i18n],
      },
    });

    // ✅ Subtítulo
    expect(screen.getByText("Beneficio de hoy")).toBeInTheDocument();

    // ✅ Número animado
    const span = screen.getByText("0.00");
    expect(span).toBeInTheDocument();
    expect(span).toHaveAttribute("data-value", "180200.23");

    // ✅ Footer
    expect(
      screen.getByText("Comparado con el día anterior")
    ).toBeInTheDocument();

    // ✅ Barra de progreso por clase
    const progressBar = document.querySelector(".progress-bar");
    expect(progressBar).not.toBeNull();
    expect(progressBar?.getAttribute("style")).toContain("width: 40.5%");
  });
});
