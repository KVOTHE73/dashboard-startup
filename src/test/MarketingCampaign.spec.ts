import { render, screen } from "@testing-library/vue";
import MarketingCampaign from "@/components/widgets/MarketingCampaign.vue";
import { createTestingPinia } from "@pinia/testing";
import { createI18n } from "vue-i18n";

// 🌐 Dummy i18n
const i18n = createI18n({
  legacy: false,
  locale: "es",
  messages: {
    es: {
      dashboard: {
        widgets: {
          marketingCampaign: {
            emailTitle: "Campaña de email",
            fbTitle: "Campaña de Facebook",
            peopleClick: "personas hicieron clic",
            visitorsFromFB: "visitas desde Facebook",
            viewCampaign: "Ver campaña",
          },
        },
      },
    },
  },
});

describe("MarketingCampaign.vue", () => {
  it("renderiza ambas campañas con texto estático", () => {
    render(MarketingCampaign, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    expect(screen.getByTestId("email-campaign")).toBeInTheDocument();
    expect(screen.getByTestId("fb-campaign")).toBeInTheDocument();

    expect(screen.getByText(/Campaña de email/i)).toBeInTheDocument();
    expect(screen.getByText(/Campaña de Facebook/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ver campaña/i).length).toBe(2);
  });

  it("muestra las barras de progreso animadas", () => {
    render(MarketingCampaign, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const emailCampaign = screen.getByTestId("email-campaign");
    const fbCampaign = screen.getByTestId("fb-campaign");

    const emailProgress = emailCampaign.querySelector(
      '[data-animation="width"]'
    );
    const fbProgress = fbCampaign.querySelector('[data-animation="width"]');

    expect(emailProgress).toBeTruthy();
    expect(fbProgress).toBeTruthy();
  });

  it("muestra los porcentajes animados", () => {
    render(MarketingCampaign, {
      global: {
        plugins: [createTestingPinia(), i18n],
      },
    });

    const animatedNumbers = document.querySelectorAll(
      '[data-animation="number"]'
    );
    expect(animatedNumbers.length).toBe(2); // Uno por campaña
  });
});
