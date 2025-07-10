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
            "Campaña que se ejecuta para conseguir más clientes recurrentes",
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
            "Ventas totales de la tienda online que provienen de un referente social",
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
            "Productos con más unidades vendidas. Incluye pedidos de todos los canales de venta",
          soldLabel: "vendidos",
        },
        sessionByLocation: {
          title: "SESIONES POR UBICACIÓN",
          tooltipTitle: "Sesiones por ubicación",
          tooltipContent:
            "Mapa de los 5 paises de p`rocedencia de los usuarios con más número de sesiones en la tienda. Una sesión es un período de actividad continua de un visitante",
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
            "Ventas netas (ventas brutas menos descuentos y devoluciones) más impuestos y envíos. Incluye pedidos de todos los canales de venta",
          compareLastWeek: "comparado con la semana pasada",
          totalSalesOrder: "Total de ventas de pedidos",
          avgSalesPerOrder: "Ventas promedio por pedido",
        },
        conversionRate: {
          title: "RATIOS DE CONVERSION",
          tooltipContent:
            "Porcentaje de sesiones que resultaron en pedidos del número total de sesiones",
          compareLastWeek: "comparado con la semana pasada",
          addedToCart: "Añadido al carrito",
          reachedeCheckout: "Alcanzó el pago",
          sessionsConverted: "Sesiones convertidas en pedidos",
        },
        storeSessions: {
          title: "SESIONES DE LA TIENDA",
          tooltipContent:
            "Número de sesiones en tu tienda online. Una sesión es un período de actividad continua de un visitante",
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
        totalVisitors: {
          title: "VISITANTES TOTALES",
          tooltipContent: "Número total de accesos a la página",
          period: "Desde el 01/01",
          detail: "Ver detalle",
        },
        bounceRate: {
          title: "PORCENTAJE DE REBOTE",
          tooltipContent:
            "Porcentaje de usuarios que abandonan la página sin interactuar o sin navegar a otras páginas del sitio",
          period: "Desde el 01/01",
          detail: "Ver detalle",
        },
        uniqueVisitors: {
          title: "VISITANTES UNICOS",
          tooltipContent:
            "Número de usuarios individuales que visitan el sitio web durante un período específico, contados solo una vez sin importar cuántas veces regresen",
          period: "Desde el 01/01",
          detail: "Ver detalle",
        },
        avgTimeSite: {
          title: "MEDIA DE TIEMPO EN LA PAGINA",
          tooltipContent:
            "Tiempo promedio que los usuarios pasan en el sitio web durante una sesión",
          period: "Desde el 01/01",
          detail: "Ver detalle",
        },
        todayVisits: {
          title: "VISITAS DE HOY",
          tooltipContent:
            "Número de visitas que ha recibido el sitio web hasta ahora en el día de hoy",
          subTitle: "Todo tipo de usuarios",
          footer: "Mejor que en el día de ayer (70.1%)",
        },
        todayProfit: {
          title: "BENEFICIO DE HOY",
          tooltipContent:
            "Cantidad total de ganancias obtenidas por el negocio durante el día de hoy",
          subTitle: "Ganancia neta del día",
          footer: "Mejor que la semana pasada (40.5%)",
        },
        newOrders: {
          title: "NUEVOS PEDIDOS",
          tooltipContent:
            "Cantidad total de pedidos obtenidos desde la página durante el día de hoy",
          subTitle: "Recibidos de todo tipo de usuarios",
          footerDown: "Peor que la semana pasada",
          footerUp: "Mejor que la semana pasada",
        },
        newComments: {
          title: "NUEVOS COMENTARIOS",
          tooltipContent:
            "Cantidad total de comentarios escritos en la página durante el día de hoy",
          subTitle: "Recibidos de usuarios registrados",
          footerDown: "Peor que la semana pasada",
          footerUp: "Mejor que la semana pasada",
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
            "Map of the top 5 countries of origin of users with the highest number of store sessions. A session is a period of continuous activity by a visitor.",
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
        totalVisitors: {
          title: "TOTAL VISITORS",
          tooltipContent: "Total page views",
          period: "From 01/01",
          detail: "View detail",
        },
        bounceRate: {
          title: "BOUNCE RATE",
          tooltipContent:
            "Percentage of users who leave the page without any interaction or visiting other pages on the site",
          period: "From el 01/01",
          detail: "View detail",
        },
        uniqueVisitors: {
          title: "UNIQUE VISTORS",
          tooltipContent:
            "Number of individual users who visit the website during a specific period, counted only once regardless of how many times they return",
          period: "From el 01/01",
          detail: "View detail",
        },
        avgTimeSite: {
          title: "AVG TIME SITE",
          tooltipContent:
            "Average amount of time that users spend on the website during a session",
          period: "From el 01/01",
          detail: "View detail",
        },
        todayVisits: {
          title: "TODAY'S VISITS",
          tooltipContent:
            "Number of visits the website has received so far today",
          subTitle: "All kind of users",
          footer: "Better than yesterday (70.1%)",
        },
        todayProfit: {
          title: "TODAY'S PROFIT",
          tooltipContent:
            "Total amount of profit generated by the business so far today",
          subTitle: "Today's net earnings",
          footer: "Better than last week (40.5%)",
        },
        newOrders: {
          title: "NEW ORDERS",
          tooltipContent:
            "Total number of orders received through the site so far today",
          subTitle: "Received from all types of users",
          footerDown: "Worse than last week",
          footerUp: "Better than last week",
        },
        newComments: {
          title: "NEW COMMENTS",
          tooltipContent:
            "Total number of comments posted on the site so far today",
          subTitle: "Received from registered users",
          footerDown: "Worse than last week",
          footerUp: "Better than last week",
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
