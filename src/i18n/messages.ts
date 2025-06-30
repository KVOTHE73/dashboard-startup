import type { Plugin } from "vue";
import { createI18n } from "vue-i18n";

const messages = {
  es: {
    "Cambiar tema": "Cambiar tema",
    lang: {
      es: "Español",
      en: "Inglés",
    },
    dashboard: {
      add: "Añadir widget",
      save: "Guardar diseño",
      clear: "Eliminar diseño",
      widgets: {
        marketingCampaign: {
          title: "CAMPAÑA DE MARKETING",
          tooltipTitle: "Campaña de Marketing",
          tooltipContent:
            "Campaña que se ejecuta para conseguir más clientes recurrentes.",
          view: "Ver campaña",
        },
        salesBySocial: {
          title: "VENTAS POR FUENTE SOCIAL",
          tooltipTitle: "Ventas por fuente social",
          tooltipContent:
            "Ventas totales de la tienda online que provienen de un referente social.",
        },
        topProducts: {
          title: "PRODUCTOS MÁS VENDIDOS",
          tooltipTitle: "Productos más vendidos",
          tooltipContent:
            "Productos con más unidades vendidas. Incluye pedidos de todos los canales de venta.",
        },
        sessionByLocation: {
          title: "SESIONES POR UBICACIÓN",
          tooltipTitle: "Sesiones por ubicación",
          tooltipContent:
            "Número de sesiones en tu tienda online. Una sesión es un período de actividad continua de un visitante.",
        },
        totalSales: {
          title: "VENTAS TOTALES",
          tooltipContent:
            "Ventas netas (ventas brutas menos descuentos y devoluciones) más impuestos y envíos. Incluye pedidos de todos los canales de venta.",
          compareLastWeek: "comparado con la semana pasada",
          totalSalesOrder: "Total de ventas de pedidos",
          avgSalesPerOrder: "Ventas promedio por pedido",
        },
        conversionRate: {
          title: "RATIOS DE CONVERSION",
          tooltipContent:
            "Porcentaje de sesiones que resultaron en pedidos del número total de sesiones.",
          compareLastWeek: "comparado con la semana pasada",
          addedToCart: "Añadido al carrito",
          reachedeCheckout: "Alcanzó el pago",
          sessionsConverted: "Sesiones convertidas en pedidos",
        },
        storeSessions: {
          title: "SESIONES DE LA TIENDA",
          tooltipContent:
            "Número de sesiones en tu tienda online. Una sesión es un período de actividad continua de un visitante.",
          compareLastWeek: "comparado con la semana pasada",
          mobile: "Móvil",
          desktop: "Escritorio",
          tablet: "Tableta",
        },
        visitorsAnalytics: {
          title: "ANALISIS DE VISITANTES",
          tooltipContent: "Productos principales por unidades vendidas",
          newVisitors: "Nuevos Visitantes",
          returningVisitors: "Visitantes Recurrentes",
          pageViews: "Total de Páginas Vistas",
          fromPrevious: "respecto a los últimos 7 días",
        },
      },
    },
  },
  en: {
    "Cambiar tema": "Toggle theme",
    lang: {
      es: "Spanish",
      en: "English",
    },
    dashboard: {
      add: "Add widget",
      save: "Save layout",
      clear: "Clear layout",
      widgets: {
        marketingCampaign: {
          title: "MARKETING CAMPAIGN",
          tooltipTitle: "Marketing Campaign",
          tooltipContent:
            "Campaign that runs for getting more returning customers.",
          view: "View campaign",
        },
        salesBySocial: {
          title: "SALES BY SOCIAL SOURCE",
          tooltipTitle: "Sales by social source",
          tooltipContent:
            "Total online store sales that came from a social referrer source.",
        },
        topProducts: {
          title: "TOP PRODUCTS BY UNITS SOLD",
          tooltipTitle: "Top products with units sold",
          tooltipContent:
            "Products with the most individual units sold. Includes orders from all sales channels.",
        },
        sessionByLocation: {
          title: "SESSION BY LOCATION",
          tooltipTitle: "Session by location",
          tooltipContent:
            "Number of sessions on your online store. A session is a period of continuous activity from a visitor.",
        },
        totalSales: {
          title: "TOTAL SALES",
          tooltipContent:
            "Net sales (gross sales minus discounts and returns) plus taxes and shipping. Includes orders from all sales channels.",
          compareLastWeek: "compare to last week",
          totalSalesOrder: "Total sales from orders",
          avgSalesPerOrder: "Average sales per order",
        },
        conversionRate: {
          title: "CONVERSION RATE",
          tooltipContent:
            "Percentage of sessions that resulted in orders from total number of sessions.",
          compareLastWeek: "compare to last week",
          addedToCart: "Added to cart",
          reachedeCheckout: "Reached checkout",
          sessionsConverted: "Sessions converted",
        },
        storeSessions: {
          title: "STORE SESSIONS",
          tooltipContent:
            "Number of sessions on your online store. A session is a period of continuous activity from a visitor.",
          compareLastWeek: "compare to last week",
          mobile: "Mobile",
          desktop: "Desktop",
          tablet: "Tablet",
        },
        visitorsAnalytics: {
          title: "VISITORS ANALYTICS",
          tooltipContent: "Top products with units sold",
          newVisitors: "New Visitors",
          returningVisitors: "Returning Visitors",
          pageViews: "Total Page Views",
          fromPrevious: "from previous 7 days",
        },
      },
    },
  },
};

// ✅ Creamos instancia con Composition API habilitada
const i18n = createI18n({
  legacy: false,
  locale: navigator.language.startsWith("es") ? "es" : "en",
  fallbackLocale: "en",
  messages,
});

export const i18nPlugin = i18n as unknown as Plugin;

// 🟩 Exportamos la instancia (para app.use())
export default i18n;
