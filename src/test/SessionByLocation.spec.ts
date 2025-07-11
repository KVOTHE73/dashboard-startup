import { render, screen } from "@testing-library/vue";
import SessionByLocation from "@/components/widgets/SessionByLocation.vue";
import { createI18n } from "vue-i18n";
import { createTestingPinia } from "@pinia/testing";

// 🌐 Dummy i18n con traducciones de países
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          sessionByLocation: {
            countries: {
              unitedStates: "Estados Unidos",
              china: "China",
              germany: "Alemania",
              france: "Francia",
              japan: "Japón",
            },
          },
        },
      },
    },
  },
});

describe("SessionByLocation.vue", () => {
  it("renderiza todos los países esperados con su porcentaje", () => {
    render(SessionByLocation, {
      global: {
        plugins: [i18n, createTestingPinia()],
      },
    });

    const countryKeys = ["unitedStates", "china", "germany", "france", "japan"];

    for (const key of countryKeys) {
      const row = screen.getByTestId(`country-row-${key}`);
      const percent = screen.getByTestId(`percent-${key}`);
      expect(row).toBeInTheDocument();
      expect(
        parseFloat(percent.getAttribute("data-value") || "0")
      ).toBeGreaterThan(0);
    }
  });
});
