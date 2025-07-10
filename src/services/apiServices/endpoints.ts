// endpoints.ts
// Lista de endpoints base para la API de DummyJSON

const BASE_URL = "https://dummyjson.com";

export function getEndpoints() {
  return {
    // Productos (puedes añadir filtros, búsquedas, categorías…)
    products: `${BASE_URL}/products`,
    productById: (id: number | string) => `${BASE_URL}/products/${id}`,

    // Categorías de producto
    categories: `${BASE_URL}/products/categories`,
    productsByCategory: (category: string) =>
      `${BASE_URL}/products/category/${encodeURIComponent(category)}`,

    // Usuarios
    users: `${BASE_URL}/users`,
    userById: (id: number | string) => `${BASE_URL}/users/${id}`,

    // Carritos de compra
    carts: `${BASE_URL}/carts`,
    cartByUserId: (userId: number | string) =>
      `${BASE_URL}/carts/user/${userId}`,

    // Otros endpoints disponibles en DummyJSON (si necesitas más adelante):
    posts: `${BASE_URL}/posts`,
    comments: `${BASE_URL}/comments`,
  };
}
