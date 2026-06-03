
// services/overviewService.ts
import apiClient from '.';
import { DashboardStats, LowStockProduct } from '@/types/overview';

// دالة جلب الإحصائيات العامة
export const getPublicStats = async (): Promise<DashboardStats |null> => {
    const response = await apiClient.get('/overview/public');
    return response.data;
};

// دالة جلب المنتجات منخفضة المخزون
export const getLowStockProducts = async (): Promise<LowStockProduct[]> => {
    const response = await apiClient.get('/overview/repositry');
    // لاحظ أن السيرفر يرسل البيانات داخل كائن اسمه filterdLowProduct
    return response.data.filterdLowProduct;
};

export const getTopSelling = async ()=> {
    const response = await apiClient.get<{name:string,totalSales:number,_id:string}[]>('/overview/topSaling');
    return response.data;
};