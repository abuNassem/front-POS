import { CartItem, Product } from "./product";

export interface Sale {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    paymentMethod: 'cash' | 'card' | 'online';
}

export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: 'admin' | 'cashier';
}

export interface DashboardStats {
    totalSales: number;
    totalRevenue: number;
    topSellingProducts: Product[];
    lowStockProducts: Product[];
}
