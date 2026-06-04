export interface LowStockProduct {
    _id: string;
    name: string;
    stock: number;
    category?: string;
    barcode: number;
}

export interface DashboardStats {
    totalStockQuantity: number;
    totalRevenue: number;
    potentialInventoryValue: number;
    uniqueProductsCount: number;
}

export interface TopSellingProduct {
    _id: string;
    name: string;
    totalSales: number;
}
