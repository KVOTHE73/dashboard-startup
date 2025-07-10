// ===================================================================================
// 🔷 useAPI (DummyJSON)
//    💡 Composable que centraliza el acceso a la store de DummyJSON para obtener datos de productos, carritos y usuarios.
//       🔹 Expone funciones para obtener los datos (reactivamente o bajo demanda)
//       🔹 Facilita el acceso desde cualquier componente o widget
// ===================================================================================

// ⛳ Imports
import { storeToRefs } from "pinia";
import { useDummyStore } from "@/stores/dummyStore";

// ⚙️ Composable principal
export const useAPI = () => {
  // 📦 Instancia de la store
  const dummyStore = useDummyStore();

  // 🧮 Datos reactivos expuestos por la store
  const {
    getProducts,
    getCarts,
    getUsers,
    getComments,
    getTopProducts,
    getTotalSalesData,
    getTotalVisitorsData,
    getUniqueVisitorsData,
    getVisitorsAnalytics,
    getLoading,
    getError,
  } = storeToRefs(dummyStore);

  // 🔧 Funciones para lanzar las llamadas explícitamente
  const fetchProducts = dummyStore.fetchProducts;
  const fetchCarts = dummyStore.fetchCarts;
  const fetchUsers = dummyStore.fetchUsers;
  const fetchComments = dummyStore.fetchComments;
  const fetchTopProducts = dummyStore.fetchTopProducts;
  const fetchTotalSales = dummyStore.fetchTotalSales;
  const fetchTotalVisitors = dummyStore.fetchTotalVisitors;
  const fetchUniqueVisitors = dummyStore.fetchUniqueVisitors;
  const fetchVisitorsAnalytics = dummyStore.fetchVisitorsAnalytics;

  // 📤 Exportamos datos y funciones
  return {
    getProducts,
    getCarts,
    getUsers,
    getComments,
    getTopProducts,
    getTotalSalesData,
    getTotalVisitorsData,
    getUniqueVisitorsData,
    getVisitorsAnalytics,
    getLoading,
    getError,
    fetchProducts,
    fetchCarts,
    fetchUsers,
    fetchComments,
    fetchTopProducts,
    fetchTotalSales,
    fetchTotalVisitors,
    fetchUniqueVisitors,
    fetchVisitorsAnalytics,
  };
};
