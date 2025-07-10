export interface IDummyStore {
  products: IProductsResponse[];
  carts: ICartsResponse[];
  users: IUsersResponse[];
  comments: ICommentsResponse[];
  topProducts: ITopProduct[];
  totalSalesData: ITotalSalesData;
  totalVisitorsData: ITotalVisitorsData;
  uniqueVisitorsData: IUniqueVisitorsData;
  visitorsAnalytics: IVisitorsAnalyticsData;
  loading: boolean;
  error: Error | null;
}

export interface IDummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProductsResponse {
  id: any;
  title: any;
  price: any;
  thumbnail: any;
  products: IDummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

// interfaces/api/IDummyCart.ts

export interface IDummyCartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface IDummyCart {
  id: number;
  products: IDummyCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface ICartsResponse {
  carts: IDummyCart[];
  total: number;
  skip: number;
  limit: number;
}

// interfaces/api/IDummyUser.ts

export interface IDummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface IUsersResponse {
  users: IDummyUser[];
  total: number;
  skip: number;
  limit: number;
}

// 🔷 Representa un comentario individual
export interface ICommentsResponse {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface ICommentsApiResponse {
  comments: ICommentsResponse[];
  total: number;
  skip: number;
  limit: number;
}

export interface ITopProduct {
  id: number;
  name: string;
  priceValue: number;
  image: string;
  unitsSold: number;
}

export interface ITotalSalesData {
  totalSalesAmount: number;
  totalSalesOrders: number;
  avgSalesPerOrder: number;
  chartSeries: number[];
}

export interface ITotalVisitorsData {
  totalVisitors: number;
}

export interface IUniqueVisitorsData {
  uniqueVisitors: number;
}

export interface IVisitorsAnalyticsData {
  newVisitors: number;
  returningVisitors: number;
  pageViews: number;
  chartData: {
    uniqueVisitors: [number, number][];
    pageViews: [number, number][];
  };
}
