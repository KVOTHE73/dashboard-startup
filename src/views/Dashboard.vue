<!-- ============================================================================
🔷 DASHBOARD
   💡 Vista principal del panel de control:
       🔹 Botones de control (añadir, guardar, limpiar, restaurar)
       🔹 Widgets dinámicos insertables en filas
       🔹 Modal selector de widgets
       🔹 Soporte para layout persistente (localStorage)
       🔹 Toast de confirmación para acciones críticas
============================================================================ -->

<template>
  <!-- ============================================================================
  🔘 BOTONES DE CONTROL
     💡 Incluye botones para añadir, guardar, limpiar y restaurar layout
  ============================================================================ -->
  <div class="position-relative text-center mb-3">
    <div class="d-inline-flex gap-2">
      <!-- ➕ Añadir widget -->
      <button
        class="btn btn-theme rounded-circle"
        style="width: 40px; height: 40px; padding: 0"
        :title="t('dashboard.add')"
        :disabled="!availableWidgets.length"
        @click="openWidgetSelector"
      >
        <i class="fa fa-plus"></i>
      </button>

      <!-- 💾 Guardar layout -->
      <button
        class="btn btn-primary rounded-circle"
        style="width: 40px; height: 40px; padding: 0"
        :title="t('dashboard.save')"
        :disabled="!canSave"
        @click="saveLayout"
      >
        <i class="fa fa-save"></i>
      </button>

      <!-- 🗑️ Limpiar layout -->
      <button
        class="btn btn-danger rounded-circle"
        style="width: 40px; height: 40px; padding: 0"
        :title="t('dashboard.clear')"
        :disabled="!canClear"
        @click="clearLayout"
      >
        <i class="fa fa-trash"></i>
      </button>

      <!-- ♻️ Restaurar layout por defecto -->
      <button
        class="btn btn-secondary rounded-circle"
        style="width: 40px; height: 40px; padding: 0"
        :title="t('dashboard.restoreDefault')"
        :disabled="!canRestore"
        @click="restoreDefaultLayout"
      >
        <i class="fa fa-undo"></i>
      </button>
    </div>

    <!-- ============================================================================
    📦 GRID DE WIDGETS
       💡 Renderiza los widgets en base al layout actual
    ============================================================================ -->
    <div class="row g-3 mt-3">
      <template v-for="(widgetId, i) in layoutRow" :key="i">
        <div v-if="widgetId" :class="`col-xl-${getWidgetCols(widgetId)}`">
          <panel>
            <panel-header>
              <panel-title class="text-start">
                {{ getWidgetName(widgetId) }}
                <span class="ms-2">
                  <i
                    class="fa fa-info-circle"
                    v-tooltip="getWidgettooltipContent(widgetId)"
                  ></i>
                </span>
              </panel-title>
              <panel-toolbar
                :can-remove="true"
                @remove="() => removeWidget(i)"
                @reload="() => handleReload(widgetId)"
              />
            </panel-header>
            <panel-body>
              <!-- 🧩 Carga dinámica del componente -->
              <component
                :is="componentsMap[widgetId]"
                :key="reloadKeys[widgetId] || 0"
              />
            </panel-body>
          </panel>
        </div>
      </template>
    </div>

    <!-- ============================================================================
    🔍 MODAL DE SELECCIÓN DE WIDGETS
       💡 Permite al usuario seleccionar e insertar nuevos widgets
    ============================================================================ -->
    <div
      class="modal fade"
      id="widgetSelectorModal"
      tabindex="-1"
      aria-labelledby="widgetSelectorLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="widgetSelectorLabel">
              {{ t("dashboard.widgetsModal.title") }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <select class="form-select" v-model="selectedWidget">
              <option disabled value="">
                {{ t("dashboard.widgetsModal.widgetSelect") }}
              </option>
              <option v-for="w in availableWidgets" :key="w.id" :value="w.id">
                {{ w.name }} ({{ w.colSpan }} cols)
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ t("dashboard.widgetsModal.btnCancel") }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addSelectedWidget"
            >
              {{ t("dashboard.widgetsModal.btnAdd") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================================================
  ✅ TOAST DE CONFIRMACIÓN GLOBAL
     💡 Confirma acciones destructivas como limpiar, restaurar o guardar layout
  ============================================================================ -->
  <ConfirmToast ref="confirmToastRef" />
</template>

<script setup lang="ts">
// ⛳ Imports
import { ref, computed, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";

// 📦 Componentes
import ConfirmToast from "@/components/plugins/ConfirmToast.vue";
import MarketingCampaignWidget from "@/components/widgets/MarketingCampaign.vue";
import SessionByLocationWidget from "@/components/widgets/SessionByLocation.vue";
import TopProductsWidget from "@/components/widgets/TopProducts.vue";
import SalesBySocialWidget from "@/components/widgets/SalesBySocial.vue";
import TotalSalesWidget from "@/components/widgets/TotalSales.vue";
import VisitorsAnalyticsWidget from "@/components/widgets/VisitorsAnalytics.vue";
import ConversionRate from "@/components/widgets/ConversionRate.vue";
import StoreSessions from "@/components/widgets/StoreSessions.vue";
import TotalVisitors from "@/components/widgets/TotalVisitors.vue";
import BounceRate from "@/components/widgets/BounceRate.vue";
import UniqueVisitors from "@/components/widgets/UniqueVisitors.vue";
import AvgTimeSite from "@/components/widgets/AvgTimeSite.vue";
import TodayVisits from "@/components/widgets/TodayVisits.vue";
import TodayProfit from "@/components/widgets/TodayProfit.vue";
import NewOrders from "@/components/widgets/NewOrders.vue";
import NewComments from "@/components/widgets/NewComments.vue";

// 🌐 i18n
const { t } = useI18n();

// 📁 Estado general
const confirmToastRef = ref<InstanceType<typeof ConfirmToast>>();
const isDefaultLayout = ref(false);
const layoutRow = ref<(string | null)[]>([]);
const selectedWidget = ref("");
const reloadKeys = ref<Record<string, number>>({});
const modalRef = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

// 📁 Layout por defecto
const defaultLayout: (string | null)[] = [
  "totalVisitors",
  "bounceRate",
  "uniqueVisitors",
  "avgTimeSite",
  "totalSales",
  "conversionRate",
  "storeSessions",
  "visitorsAnalytics",
  "sessionByLocation",
  "salesBySocial",
  "topProducts",
  "marketingCampaign",
];

// 🧩 Widgets disponibles (configuración)
const dashboardWidgets = computed(() => [
  {
    id: "totalSales",
    name: t("dashboard.widgets.totalSales.title"),
    tooltipContent: t("dashboard.widgets.totalSales.tooltipContent"),
    colSpan: 6,
  },
  {
    id: "visitorsAnalytics",
    name: t("dashboard.widgets.visitorsAnalytics.title"),
    tooltipContent: t("dashboard.widgets.visitorsAnalytics.tooltipContent"),
    colSpan: 8,
  },
  {
    id: "marketingCampaign",
    name: t("dashboard.widgets.marketingCampaign.title"),
    tooltipContent: t("dashboard.widgets.marketingCampaign.tooltipContent"),
    colSpan: 4,
  },
  {
    id: "sessionByLocation",
    name: t("dashboard.widgets.sessionByLocation.title"),
    tooltipContent: t("dashboard.widgets.sessionByLocation.tooltipContent"),
    colSpan: 4,
  },
  {
    id: "topProducts",
    name: t("dashboard.widgets.topProducts.title"),
    tooltipContent: t("dashboard.widgets.topProducts.tooltipContent"),
    colSpan: 4,
  },
  {
    id: "salesBySocial",
    name: t("dashboard.widgets.salesBySocial.title"),
    tooltipContent: t("dashboard.widgets.salesBySocial.tooltipContent"),
    colSpan: 4,
  },
  {
    id: "conversionRate",
    name: t("dashboard.widgets.conversionRate.title"),
    tooltipContent: t("dashboard.widgets.conversionRate.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "storeSessions",
    name: t("dashboard.widgets.storeSessions.title"),
    tooltipContent: t("dashboard.widgets.storeSessions.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "totalVisitors",
    name: t("dashboard.widgets.totalVisitors.title"),
    tooltipContent: t("dashboard.widgets.totalVisitors.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "bounceRate",
    name: t("dashboard.widgets.bounceRate.title"),
    tooltipContent: t("dashboard.widgets.bounceRate.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "uniqueVisitors",
    name: t("dashboard.widgets.uniqueVisitors.title"),
    tooltipContent: t("dashboard.widgets.uniqueVisitors.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "avgTimeSite",
    name: t("dashboard.widgets.avgTimeSite.title"),
    tooltipContent: t("dashboard.widgets.avgTimeSite.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "todayVisits",
    name: t("dashboard.widgets.todayVisits.title"),
    tooltipContent: t("dashboard.widgets.todayVisits.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "todayProfit",
    name: t("dashboard.widgets.todayProfit.title"),
    tooltipContent: t("dashboard.widgets.todayProfit.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "newOrders",
    name: t("dashboard.widgets.newOrders.title"),
    tooltipContent: t("dashboard.widgets.newOrders.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "newComments",
    name: t("dashboard.widgets.newComments.title"),
    tooltipContent: t("dashboard.widgets.newComments.tooltipContent"),
    colSpan: 3,
  },
]);

// 🧩 Mapeo de ID a componentes
const componentsMap: Record<string, any> = {
  totalSales: TotalSalesWidget,
  visitorsAnalytics: VisitorsAnalyticsWidget,
  marketingCampaign: MarketingCampaignWidget,
  sessionByLocation: SessionByLocationWidget,
  topProducts: TopProductsWidget,
  salesBySocial: SalesBySocialWidget,
  conversionRate: ConversionRate,
  storeSessions: StoreSessions,
  totalVisitors: TotalVisitors,
  bounceRate: BounceRate,
  uniqueVisitors: UniqueVisitors,
  avgTimeSite: AvgTimeSite,
  todayVisits: TodayVisits,
  todayProfit: TodayProfit,
  newOrders: NewOrders,
  newComments: NewComments,
};

// 🧮 Computeds
const canSave = computed(() => layoutRow.value.length > 0);
const canClear = computed(() => layoutRow.value.length > 0);
const canRestore = computed(() => !isDefaultLayout.value);
const availableWidgets = computed(() =>
  dashboardWidgets.value.filter((w) => !layoutRow.value.includes(w.id))
);

// 🔧 Métodos auxiliares
const getWidgetCols = (id: string) =>
  dashboardWidgets.value.find((w) => w.id === id)?.colSpan || 3;
const getWidgetName = (id: string) =>
  dashboardWidgets.value.find((w) => w.id === id)?.name || "Widget";
const getWidgettooltipContent = (id: string) =>
  dashboardWidgets.value.find((w) => w.id === id)?.tooltipContent || "Widget";

// ⚙️ Control de modal
const openWidgetSelector = () => {
  if (!modalInstance && modalRef.value)
    modalInstance = new Modal(modalRef.value);
  selectedWidget.value = "";
  modalInstance?.show();
};

const addSelectedWidget = () => {
  if (!selectedWidget.value) return;
  const colsNeeded = getWidgetCols(selectedWidget.value);

  let rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCols = 0;

  for (const widget of layoutRow.value) {
    const col = widget ? getWidgetCols(widget) : 0;
    if (currentCols + col > 12) {
      rows.push(currentRow);
      currentRow = [];
      currentCols = 0;
    }
    if (widget) {
      currentRow.push(widget);
      currentCols += col;
    }
  }
  if (currentRow.length) rows.push(currentRow);

  for (let rowIndex = 0, index = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const rowCols = row.reduce((sum, w) => sum + getWidgetCols(w), 0);
    if (rowCols + colsNeeded <= 12) {
      let insertAt = index + row.length;
      layoutRow.value.splice(insertAt, 0, selectedWidget.value);
      modalInstance?.hide();
      return;
    }
    index += row.length;
  }

  layoutRow.value.push(selectedWidget.value);
  modalInstance?.hide();
};

// 🔧 Funciones de acción
const saveLayout = () => {
  if (!layoutRow.value.length) return;
  confirmToastRef.value?.show(
    t("dashboard.alertMessages.saveLayoutAlert"),
    () => {
      localStorage.setItem("dashboardLayout", JSON.stringify(layoutRow.value));
      isDefaultLayout.value = false;
      console.log("✅ Layout guardado");
    },
    () => console.log("❌ Cancelado guardado"),
    "success"
  );
};

const clearLayout = () => {
  if (!layoutRow.value.length) return;
  confirmToastRef.value?.show(
    t("dashboard.alertMessages.clearLayoutAlert"),
    () => {
      layoutRow.value = [];
      localStorage.removeItem("dashboardLayout");
      isDefaultLayout.value = false;
      console.log("ℹ️ Layout limpiado");
    },
    () => console.log("❌ Cancelado limpieza"),
    "warning"
  );
};

const restoreDefaultLayout = () => {
  if (isDefaultLayout.value) return;
  confirmToastRef.value?.show(
    t("dashboard.alertMessages.restoreDefaultAlert"),
    () => {
      layoutRow.value = [...defaultLayout];
      localStorage.setItem("dashboardLayout", JSON.stringify(layoutRow.value));
      isDefaultLayout.value = true;
      console.log("🔄 Layout restaurado");
    },
    () => console.log("❌ Cancelado restaurar"),
    "info"
  );
};

const removeWidget = (i: number) => layoutRow.value.splice(i, 1);
const handleReload = (id: string) =>
  (reloadKeys.value[id] = (reloadKeys.value[id] || 0) + 1);
const checkIfDefaultLayout = () =>
  (isDefaultLayout.value =
    JSON.stringify(layoutRow.value) === JSON.stringify(defaultLayout));

// 🔄 Ciclo de vida
onMounted(() => {
  const saved = localStorage.getItem("dashboardLayout");
  layoutRow.value = saved ? JSON.parse(saved) : [...defaultLayout];
  checkIfDefaultLayout();
});
</script>

<style scoped>
/* 🎨 Estilo del selector */
select {
  max-width: 100%;
}

/* 🎨 Ajuste visual del cuerpo del panel */
.panel-body {
  padding: 0;
}
</style>
