export interface Product {
    id: string;
    name: string;
    price: number;
    barcode: string;
    stock: number;
    category?: string;
    description?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

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
