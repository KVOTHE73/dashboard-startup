import { render, screen, waitFor } from "@testing-library/vue";
import NewComments from "@/components/widgets/NewComments.vue";
import { createTestingPinia } from "@pinia/testing";
import { createI18n } from "vue-i18n";
import { vi } from "vitest";

// 🌐 i18n mock
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          newComments: {
            subTitle: "Nuevos comentarios",
            footerUp: "¡Buen trabajo!",
            footerDown: "Necesitamos mejorar",
          },
        },
      },
    },
  },
});

// 🛠️ Mock para el composable useApiDummy
vi.mock("@/composables/useApiDummy", () => {
  return {
    useAPI: () => ({
      fetchComments: vi.fn(),
      getComments: {
        value: Array.from({ length: 50 }, (_, i) => ({ id: i + 1 })),
      },
    }),
  };
});

describe("NewComments.vue", () => {
  it("renderiza el número de comentarios correctamente", async () => {
    render(NewComments, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const countSpan = await screen.findByTestId("comments-count");
    const value = countSpan.getAttribute("data-value");
    expect(Number(value)).toBe(50); // porque el mock tiene 50 elementos
  });

  it("muestra la barra de progreso con un valor entre 0% y 100%", async () => {
    render(NewComments, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const bar = await screen.findByTestId("progress-bar");
    const widthStyle = bar?.getAttribute("style") ?? "";
    expect(widthStyle).toMatch(/width:\s*\d+%/);
  });

  it("muestra el texto del pie según el crecimiento", async () => {
    render(NewComments, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const footer = await screen.findByTestId("footer-text");
    await waitFor(() => {
      expect(footer.textContent).toMatch(/(\+|\-)?\d+%/);
    });
  });
});
