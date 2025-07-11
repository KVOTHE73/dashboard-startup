import { render, screen } from "@testing-library/vue";
import SalesBySocial from "@/components/widgets/SalesBySocial.vue";
import { createI18n } from "vue-i18n";

// 🌐 Dummy i18n
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          salesBySocial: {
            increased: "más que la semana pasada",
            appleStore: "Apple Store",
            facebook: "Facebook",
            twitter: "Twitter",
            google: "Google",
            instagram: "Instagram",
          },
        },
      },
    },
  },
});

describe("SalesBySocial.vue", () => {
  it("renderiza el total de ventas correctamente", () => {
    render(SalesBySocial, {
      global: {
        plugins: [i18n],
      },
    });

    const total = screen.getByTestId("total-sales");
    const value = parseFloat(total.getAttribute("data-value") || "0");
    expect(value).toBeGreaterThan(0);
  });

  it("muestra un porcentaje de incremento mayor que 0", () => {
    render(SalesBySocial, {
      global: {
        plugins: [i18n],
      },
    });

    const percent = screen.getByTestId("increase-percent");
    const value = parseFloat(percent.getAttribute("data-value") || "0");
    expect(value).toBeGreaterThanOrEqual(30);
    expect(value).toBeLessThanOrEqual(60);
  });

  it("renderiza todos los canales sociales con sus valores", () => {
    render(SalesBySocial, {
      global: {
        plugins: [i18n],
      },
    });

    const expectedKeys = [
      "appleStore",
      "facebook",
      "twitter",
      "google",
      "instagram",
    ];
    for (const key of expectedKeys) {
      const row = screen.getByTestId(`source-${key}`);
      const value = screen.getByTestId(`value-${key}`);
      expect(row).toBeInTheDocument();
      expect(
        parseFloat(value.getAttribute("data-value") || "0")
      ).toBeGreaterThan(0);
    }
  });
});
