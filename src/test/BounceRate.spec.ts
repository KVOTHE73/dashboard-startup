import { render, screen, waitFor } from "@testing-library/vue";
import BounceRate from "@/components/widgets/BounceRate.vue";
import { createI18n } from "vue-i18n";
import { messages } from "../i18n/messages";
import { describe, test, expect } from "vitest";

// 🌐 i18n manual para los tests
const i18n = createI18n({
  legacy: false,
  locale: "es",
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});

describe("BounceRate.vue", () => {
  test("renderiza el título traducido correctamente", () => {
    render(BounceRate, {
      global: {
        plugins: [i18n],
      },
    });

    expect(screen.getByText("Desde el 01/01")).toBeInTheDocument(); // Ajusta el texto si cambia en el i18n
  });

  test("renderiza el valor de tasa de rebote en el atributo data-value", async () => {
    render(BounceRate, {
      global: {
        plugins: [i18n],
      },
    });

    await waitFor(() => {
      const bounceSpan = screen.getByTestId("bounce-rate-value");
      const valueAttr = bounceSpan.getAttribute("data-value");
      expect(valueAttr).toMatch(/^\d{2}\.\d{2}$/); // ejemplo: 42.58
    });
  });

  test("renderiza el enlace de 'Ver detalle'", () => {
    render(BounceRate, {
      global: {
        plugins: [i18n],
      },
    });

    expect(screen.getByText(/ver detalle/i)).toBeInTheDocument();
  });
});
