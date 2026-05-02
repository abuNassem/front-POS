// أنواع البيانات القادمة من API المخزون المنخفض
export interface LowStockProduct {
    _id: string;
    name: string;
    stock: number
    category?: string;
    barcode:number
}

// أنواع البيانات العامة للوحة التحكم
export interface DashboardStats {
    totalStockQuantity: number;
    totalRevenue: number;
    potentialInventoryValue: number;
    uniqueProductsCount: number;
}