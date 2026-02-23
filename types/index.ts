import { Product } from "./product";


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
