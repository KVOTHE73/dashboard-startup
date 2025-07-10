// ============================================================================
// 🔷 DUMMY STORE
//    💡 Store de datos ficticios desde la API DummyJSON
//       🔹 Maneja productos, carritos, usuarios, comentarios...
//       🔹 Calcula ventas totales, visitantes, métricas analíticas
//       🔹 Provee datos a los widgets del dashboard
// ============================================================================

import { defineStore } from "pinia";
// 🌐 Endpoints y servicios HTTP
import { getEndpoints } from "@/services/apiServices/endpoints";
import { fetchGetData } from "@/services/apiServices/http";
// 🧾 Interfaces tipadas
import type {
  IDummyStore,
  IProductsResponse,
  ICartsResponse,
  IUsersResponse,
  ICommentsResponse,
  ICommentsApiResponse,
  ITopProduct,
  ITotalSalesData,
  ITotalVisitorsData,
  IUniqueVisitorsData,
  IVisitorsAnalyticsData,
} from "@/interfaces/stores/IDummyStore";

const endpoints = getEndpoints();

export const useDummyStore = defineStore("dummyStore", {
  // 📦 STATE ------------------------------------------------------------------
  state: (): IDummyStore => ({
    products: [],
    carts: [],
    users: [],
    comments: [],
    topProducts: [],
    totalSalesData: {
      totalSalesAmount: 0,
      totalSalesOrders: 0,
      avgSalesPerOrder: 0,
      chartSeries: [],
    },
    totalVisitorsData: { totalVisitors: 0 },
    uniqueVisitorsData: { uniqueVisitors: 0 },
    visitorsAnalytics: {} as IVisitorsAnalyticsData,
    loading: false,
    error: null,
  }),

  // 📚 GETTERS ---------------------------------------------------------------
  getters: {
    getProducts: (state) => state.products,
    getCarts: (state) => state.carts || [],
    getUsers: (state) => state.users,
    getComments: (state) => state.comments,
    getTopProducts: (state) => state.topProducts,
    getTotalSalesData: (state) => state.totalSalesData,
    getTotalVisitorsData: (state) => state.totalVisitorsData,
    getUniqueVisitorsData: (state) => state.uniqueVisitorsData,
    getVisitorsAnalytics: (state) => state.visitorsAnalytics,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
  },

  // 🔧 ACTIONS ---------------------------------------------------------------
  actions: {
    // 📥 Productos
    async fetchProducts() {
      try {
        this.loading = true;
        const res = await fetchGetData<IProductsResponse[]>(
          endpoints.products,
          "dummy"
        );
        this.products = res;
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 📥 Carritos
    async fetchCarts() {
      try {
        this.loading = true;
        const res = await fetchGetData<{ carts: ICartsResponse[] }>(
          endpoints.carts,
          "dummy"
        );
        this.carts = res.carts;
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 📥 Usuarios
    async fetchUsers() {
      try {
        this.loading = true;
        const res = await fetchGetData<IUsersResponse[]>(
          endpoints.users,
          "dummy"
        );
        this.users = res;
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 📥 Comentarios
    async fetchComments() {
      try {
        this.loading = true;
        const res = await fetchGetData<ICommentsApiResponse>(
          endpoints.comments,
          "dummy"
        );
        this.comments = res.comments;
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 📊 Productos más vendidos
    async fetchTopProducts() {
      try {
        this.loading = true;
        const cartsRes = await fetchGetData<ICartsResponse>(
          endpoints.carts,
          "dummy"
        );
        const map = new Map<number, number>();
        for (const cart of cartsRes.carts) {
          for (const prod of cart.products) {
            map.set(prod.id, (map.get(prod.id) || 0) + prod.quantity);
          }
        }
        const products = await fetchGetData<IProductsResponse>(
          endpoints.productsByCategory("smartphones"),
          "dummy"
        );
        const ranked = products.products
          .map((p) => ({
            id: p.id,
            name: p.title,
            priceValue: p.price,
            image: p.thumbnail,
            unitsSold: map.get(p.id) || 0,
          }))
          .filter((p) => p.unitsSold > 0)
          .sort((a, b) => b.unitsSold - a.unitsSold)
          .slice(0, 5);
        this.topProducts = ranked;
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 📈 Ventas totales
    async fetchTotalSales() {
      try {
        this.loading = true;
        const res = await fetchGetData<{ carts: ICartsResponse[] }>(
          endpoints.carts,
          "dummy"
        );
        const totalSalesAmount = res.carts.reduce((sum, c) => sum + c.total, 0);
        const totalSalesOrders = res.carts.length;
        const avgSalesPerOrder =
          totalSalesOrders > 0 ? totalSalesAmount / totalSalesOrders : 0;
        const chartSeries = res.carts.map((c) => c.total);

        this.totalSalesData = {
          totalSalesAmount,
          totalSalesOrders,
          avgSalesPerOrder,
          chartSeries,
        };
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 👥 Visitantes totales simulados
    async fetchTotalVisitors() {
      try {
        this.loading = true;
        const res = await fetchGetData<{
          users: IUsersResponse[];
          total: number;
        }>(endpoints.users, "dummy");
        this.totalVisitorsData = { totalVisitors: Math.round(res.total * 1.5) }; // Simulación
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 👤 Visitantes únicos (usuarios reales)
    async fetchUniqueVisitors() {
      try {
        this.loading = true;
        const res = await fetchGetData<{
          users: IUsersResponse[];
          total: number;
        }>(endpoints.users, "dummy");
        this.uniqueVisitorsData = { uniqueVisitors: res.total };
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },

    // 📆 Visitas de hoy (simuladas a partir de visitantes analytics)
    getTodayVisitsData() {
      const n = this.visitorsAnalytics?.newVisitors || 0;
      const r = this.visitorsAnalytics?.returningVisitors || 0;
      const total = n + r;
      const todayVisits = Math.round(total * 0.07); // Simulado
      const goal = 2_000_000;
      const progress = Math.min((todayVisits / goal) * 100, 100);
      return { todayVisits, progress };
    },

    // 📈 Datos analíticos de visitantes
    async fetchVisitorsAnalytics() {
      try {
        this.loading = true;
        const res = await fetchGetData<{
          users: IUsersResponse[];
          total: number;
        }>(endpoints.users, "dummy");
        const totalUsers = res.total;
        const newVisitors = Math.round(totalUsers * 0.65);
        const returningVisitors = totalUsers - newVisitors;
        const pageViews = totalUsers * 5.9;
        const generateTimeSeries = (
          base: number,
          mult = 1
        ): [number, number][] =>
          Array.from({ length: 7 }).map((_, i) => [
            new Date().setDate(new Date().getDate() - (6 - i)),
            Math.round((base / 7) * mult * (0.9 + Math.random() * 0.2)),
          ]);

        this.visitorsAnalytics = {
          newVisitors,
          returningVisitors,
          pageViews: Math.round(pageViews),
          chartData: {
            uniqueVisitors: generateTimeSeries(newVisitors),
            pageViews: generateTimeSeries(pageViews),
          },
        };
      } catch (e) {
        this.error = e as Error;
      } finally {
        this.loading = false;
      }
    },
  },
});

// 🔁 Acceso directo sin necesidad de composición externa
export const dummyStore = useDummyStore;
