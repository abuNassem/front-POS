import apiClient from '.';
import { DashboardStats, LowStockProduct, TopSellingProduct } from '@/types/overview';

export const getPublicStats = async (): Promise<DashboardStats> => {
    const response = await apiClient.get('/overview/public');
    return response.data;
};

export const getLowStockProducts = async (): Promise<LowStockProduct[]> => {
    const response = await apiClient.get('/overview/repositry');
    return response.data.filterdLowProduct;
};

export const getTopSelling = async (): Promise<TopSellingProduct[]> => {
    const response = await apiClient.get<TopSellingProduct[]>('/overview/topSaling');
    return response.data;
};
