<template>
  <div class="position-relative text-center mb-3">
    <div class="d-inline-flex gap-2">
      <button
        class="btn btn-theme rounded-circle"
        style="width: 40px; height: 40px; padding: 0"
        :title="t('dashboard.add')"
        @click="openWidgetSelector"
      >
        <i class="fa fa-plus"></i>
      </button>
      <button
        class="btn btn-primary rounded-circle"
        style="width: 40px; height: 40px; padding: 0"
        :title="t('dashboard.save')"
        @click="saveLayout"
      >
        <i class="fa fa-save"></i>
      </button>
      <button
        class="btn btn-danger rounded-circle"
        style="width: 40px; height: 40px; padding: 0"
        :title="t('dashboard.clear')"
        @click="clearLayout"
      >
        <i class="fa fa-trash"></i>
      </button>
    </div>

    <div class="row g-3 mt-3">
      <template v-for="(widgetId, i) in layoutRow" :key="i">
        <div v-if="widgetId" :class="`col-xl-${getWidgetCols(widgetId)}`">
          <panel>
            <panel-header>
              <panel-title class="text-start"
                >{{ getWidgetName(widgetId)
                }}<span class="ms-2">
                  <i
                    class="fa fa-info-circle"
                    v-tooltip="getWidgettooltipContent(widgetId)"
                  ></i> </span
              ></panel-title>
              <panel-toolbar
                :can-remove="true"
                @remove="() => removeWidget(i)"
                @reload="() => handleReload(widgetId)"
              />
            </panel-header>
            <panel-body>
              <component
                :is="componentsMap[widgetId]"
                :key="reloadKeys[widgetId] || 0"
              />
            </panel-body>
          </panel>
        </div>
      </template>
    </div>

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
              Seleccionar widget
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
              <option disabled value="">Selecciona un widget</option>
              <option v-for="w in dashboardWidgets" :key="w.id" :value="w.id">
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
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addSelectedWidget"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";
import MarketingCampaignWidget from "@/components/widgets/MarketingCampaign.vue";
import SessionByLocationWidget from "@/components/widgets/SessionByLocation.vue";
import TopProductsWidget from "@/components/widgets/TopProducts.vue";
import SalesBySocialWidget from "@/components/widgets/SalesBySocial.vue";
import TotalSalesWidget from "@/components/widgets/TotalSales.vue";
import VisitorsAnalyticsWidget from "@/components/widgets/VisitorsAnalytics.vue";
import ConversionRate from "@/components/widgets/ConversionRate.vue";
import StoreSessions from "@/components/widgets/StoreSessions.vue";

// 🌐 i18n
const { t } = useI18n();

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
    colSpan: 3,
  },
  {
    id: "sessionByLocation",
    name: t("dashboard.widgets.sessionByLocation.title"),
    tooltipContent: t("dashboard.widgets.sessionByLocation.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "topProducts",
    name: t("dashboard.widgets.topProducts.title"),
    tooltipContent: t("dashboard.widgets.topProducts.tooltipContent"),
    colSpan: 3,
  },
  {
    id: "salesBySocial",
    name: t("dashboard.widgets.salesBySocial.title"),
    tooltipContent: t("dashboard.widgets.salesBySocial.tooltipContent"),
    colSpan: 3,
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
]);

const componentsMap: Record<string, any> = {
  totalSales: TotalSalesWidget,
  visitorsAnalytics: VisitorsAnalyticsWidget,
  marketingCampaign: MarketingCampaignWidget,
  sessionByLocation: SessionByLocationWidget,
  topProducts: TopProductsWidget,
  salesBySocial: SalesBySocialWidget,
  conversionRate: ConversionRate,
  storeSessions: StoreSessions,
};

const layoutRow = ref<(string | null)[]>([]);
const selectedWidget = ref("");
const reloadKeys = ref<Record<string, number>>({});
const modalRef = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

const getWidgetCols = (id: string): number => {
  return dashboardWidgets.value.find((w) => w.id === id)?.colSpan || 3;
};

const getWidgetName = (id: string): string => {
  return dashboardWidgets.value.find((w) => w.id === id)?.name || "Widget";
};

const getWidgettooltipContent = (id: string): string => {
  return (
    dashboardWidgets.value.find((w) => w.id === id)?.tooltipContent || "Widget"
  );
};

const openWidgetSelector = () => {
  if (!modalInstance && modalRef.value) {
    modalInstance = new Modal(modalRef.value);
  }
  selectedWidget.value = "";
  modalInstance?.show();
};

const addSelectedWidget = () => {
  if (!selectedWidget.value) return;
  const colsNeeded = getWidgetCols(selectedWidget.value);

  // Agrupar los widgets en filas y encontrar un hueco
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

  // Buscar en filas existentes
  for (let rowIndex = 0, index = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const rowCols = row.reduce((sum, w) => sum + getWidgetCols(w), 0);
    if (rowCols + colsNeeded <= 12) {
      // Insertar al final de esta fila
      let insertAt = index + row.length;
      layoutRow.value.splice(insertAt, 0, selectedWidget.value);
      modalInstance?.hide();
      return;
    }
    index += row.length;
  }

  // Si no hay hueco, añadir al final como nueva fila
  layoutRow.value.push(selectedWidget.value);
  modalInstance?.hide();
};

const saveLayout = () => {
  localStorage.setItem("dashboardLayout", JSON.stringify(layoutRow.value));
};

const clearLayout = () => {
  layoutRow.value = [];
  localStorage.removeItem("dashboardLayout");
};

const handleReload = (id: string) => {
  reloadKeys.value[id] = (reloadKeys.value[id] || 0) + 1;
};

const removeWidget = (i: number) => {
  layoutRow.value.splice(i, 1);
};

onMounted(() => {
  const saved = localStorage.getItem("dashboardLayout");
  if (saved) {
    layoutRow.value = JSON.parse(saved);
  }
});
</script>

<style scoped>
select {
  max-width: 100%;
}
.panel-body {
  padding: 0;
}
</style>
