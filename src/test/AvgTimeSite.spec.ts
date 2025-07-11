import { render, screen } from "@testing-library/vue";
import AvgTimeSite from "@/components/widgets/AvgTimeSite.vue";
import { createI18n } from "vue-i18n";
import { messages } from "../i18n/messages";
import { describe, expect, test } from "vitest";

// 🌐 i18n manual para test
const i18n = createI18n({
  legacy: false,
  locale: "es",
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});

describe("AvgTimeSite.vue", () => {
  test("renderiza el título y tiempo medio correctamente", async () => {
    render(AvgTimeSite, {
      global: {
        plugins: [i18n],
      },
    });

    // Título traducido
    const heading = await screen.findByText(/desde el 01\/01/i);
    expect(heading).toBeInTheDocument();

    // Formato de tiempo simulado (ej. 00:12:53)
    const timeRegex = /\d{2}:\d{2}:\d{2}/;
    const timeElement = screen.getByText(timeRegex);
    expect(timeElement).toBeInTheDocument();
  });

  test("renderiza enlace de 'Ver detalle'", async () => {
    render(AvgTimeSite, {
      global: {
        plugins: [i18n],
      },
    });

    const link = await screen.findByText(/ver detalle/i);
    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe("a");
  });
});
