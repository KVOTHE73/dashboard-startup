import type { Plugin } from "vue";
import { createI18n } from "vue-i18n";

const messages = {
  es: {
    "Cambiar tema": "Cambiar tema",
    user: {
      occupation: "Desarrollador frontend",
      profile: "Editar perfil",
      settings: "Configuración",
      logOut: "Desconectarse",
      feedback: "Enviar feedback",
      help: "Ayuda",
    },
    lang: {
      es: "Español",
      en: "Inglés",
    },
    searchbar: {
      placeholder: "Buscar...",
      search: "Buscar",
      clearSearch: "Limpiar búsqueda",
    },
    notifications: {
      title: "Notificaciones",
      header: "NOTIFICACIONES",
      empty: "No existen notificaciones",
      markAllAsRead: "Marcar todo como leído",
      markAsRead: "Marcar como leído",
      markAsUnread: "Marcar como no leído",
      clearAll: "Limpiar todas las notificaciones",
      seeMore: "Ver más",
    },
    themePanel: {
      colorAdjustment: "Ajustes de color",
      darkMode: "Modo oscuro",
      headerHide: "Ocultar cabecera",
      fixedHeader: "Cabecera fija",
      invertedHeader: "Cabecera invertida",
      sidebarHide: "Ocultar sidebar",
      fixedSidebar: "Sidebar fija",
      invertedSidebar: "Sidebar invertida",
      sidebarGrid: "Sidebar con rejilla",
      gradientEnabled: "Habilitar degradado",
    },
    sidebar: {
      open: "Abrir sidebar",
      close: "Cerrar sidebar",
      navigation: "Navegación",
      dashboard: "Panel de control",
    },
    confirmToast: {
      btnConfirm: "Confirmar",
      btnCancel: "Cancelar",
    },
    dashboard: {
      add: "Añadir widget",
      save: "Guardar diseño",
      clear: "Eliminar diseño",
      restoreDefault: "Restaurar diseño por defecto",
      alertMessages: {
        saveLayoutAlert: "¿Seguro que quieres guardar el diseño actual?",
        clearLayoutAlert: "¿Seguro que quieres eliminar el diseño actual?",
        restoreDefaultAlert:
          "¿Seguro que quieres restaurar el diseño por defecto?",
      },
      widgetsModal: {
        title: "Seleccionar widget",
        widgetSelect: "Selecciona un widget",
        btnAdd: "Añadir",
        btnCancel: "Cancelar",
      },
      widgets: {
        marketingCampaign: {
          title: "CAMPAÑA DE MARKETING",
          tooltipTitle: "Campaña de Marketing",
          tooltipContent:
            "Campaña que se ejecuta para conseguir más clientes recurrentes.",
          emailTitle: "Campaña de Email Marketing",
          fbTitle: "Campaña de Facebook Marketing",
          peopleClick: "personas hicieron clic en el correo",
          visitorsFromFB: "visitantes desde Facebook",
          viewCampaign: "Ver campaña",
        },
        salesBySocial: {
          title: "VENTAS POR FUENTE SOCIAL",
          tooltipTitle: "Ventas por fuente social",
          tooltipContent:
            "Ventas totales de la tienda online que provienen de un referente social.",
          increased: "de incremento",
          appleStore: "Apple Store",
          facebook: "Facebook",
          twitter: "Twitter",
          google: "Google Adwords",
          instagram: "Instagram",
        },
        topProducts: {
          title: "PRODUCTOS MÁS VENDIDOS",
          tooltipTitle: "Productos más vendidos",
          tooltipContent:
            "Productos con más unidades vendidas. Incluye pedidos de todos los canales de venta.",
          soldLabel: "vendidos",
        },
        sessionByLocation: {
          title: "SESIONES POR UBICACIÓN",
          tooltipTitle: "Sesiones por ubicación",
          tooltipContent:
            "Número de sesiones en tu tienda online. Una sesión es un período de actividad continua de un visitante.",
          countries: {
            unitedStates: "Estados Unidos",
            china: "China",
            germany: "Alemania",
            france: "Francia",
            japan: "Japón",
          },
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
          tooltipContent:
            "Análisis de visitantes de la página en función de su tipo",
          newVisitors: "Nuevos visitantes",
          returningVisitors: "Visitantes recurrentes",
          uniqueVisitors: "Visitantes únicos",
          pageViews: "Total de visitas a la página",
          fromPrevious: "respecto a los últimos 7 días",
        },
      },
    },
  },
  en: {
    "Cambiar tema": "Toggle theme",
    user: {
      occupation: "Frontend developer",
      profile: "Profile",
      settings: "Settings",
      logOut: "Log out",
      feedback: "Send feedback",
      help: "Help",
    },
    lang: {
      es: "Spanish",
      en: "English",
    },
    searchbar: {
      placeholder: "Search...",
      search: "Search",
      clearSearch: "Clear search",
    },
    notifications: {
      title: "Notifications",
      header: "NOTIFICATIONS",
      empty: "No notifications",
      markAllAsRead: "Mark all as read",
      markAsRead: "Mark as read",
      markAsUnread: "Mark as unread",
      clearAll: "Clear all notifications",
      seeMore: "See more",
    },
    confirmToast: {
      btnConfirm: "Confirm",
      btnCancel: "Cancel",
    },
    themePanel: {
      colorAdjustment: "Colors adjustment",
      darkMode: "Dark mode",
      headerHide: "Hide header",
      fixedHeader: "Fixed header",
      invertedHeader: "Header inverse",
      sidebarHide: "Hide sidebar",
      fixedSidebar: "Fixed sidebar",
      invertedSidebar: "Sidebar inverse",
      sidebarGrid: "Sidebar grid",
      gradientEnabled: "Gradient enabled",
    },
    sidebar: {
      open: "Open sidebar",
      close: "Close sidebar",
      navigation: "Navigation",
      dashboard: "Dashboard",
    },
    dashboard: {
      add: "Add widget",
      save: "Save layout",
      clear: "Clear layout",
      restoreDefault: "Restore default layout",
      alertMessages: {
        saveLayoutAlert: "Are you sure you want to save the current layout?",
        clearLayoutAlert: "Are you sure you want to clear the current layout?",
        restoreDefaultAlert:
          "Are you sure you want to restore the default layout?",
      },
      widgetsModal: {
        title: "Widget select",
        widgetSelect: "Select a widget",
        btnAdd: "Add",
        btnCancel: "Cancel",
      },
      widgets: {
        marketingCampaign: {
          title: "MARKETING CAMPAIGN",
          tooltipTitle: "Marketing Campaign",
          tooltipContent:
            "Campaign that runs for getting more returning customers.",
          emailTitle: "Email Marketing Campaign",
          fbTitle: "Facebook Marketing Campaign",
          peopleClick: "people click the email",
          visitorsFromFB: "visitors from facebook",
          viewCampaign: "View campaign",
        },
        salesBySocial: {
          title: "SALES BY SOCIAL SOURCE",
          tooltipTitle: "Sales by social source",
          tooltipContent:
            "Total online store sales that came from a social referrer source.",
          increased: "increased",
          appleStore: "Apple Store",
          facebook: "Facebook",
          twitter: "Twitter",
          google: "Google Adwords",
          instagram: "Instagram",
        },
        topProducts: {
          title: "TOP PRODUCTS BY UNITS SOLD",
          tooltipTitle: "Top products with units sold",
          tooltipContent:
            "Products with the most individual units sold. Includes orders from all sales channels.",
          soldLabel: "sold",
        },
        sessionByLocation: {
          title: "SESSION BY LOCATION",
          tooltipTitle: "Session by location",
          tooltipContent:
            "Number of sessions on your online store. A session is a period of continuous activity from a visitor.",
          countries: {
            unitedStates: "United States",
            china: "China",
            germany: "Germany",
            france: "France",
            japan: "Japan",
          },
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
          tooltipContent: "Visitor analysis of the page based on their type",
          newVisitors: "New visitors",
          returningVisitors: "Returning visitors",
          uniqueVisitors: "Unique visitors",
          pageViews: "Total page views",
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
