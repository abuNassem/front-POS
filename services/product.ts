import { ProductSummary, Product, ProductListResponse } from "@/types/product"
import apiClient from "./index"
import { ProductImport } from "@/app/dashboard/Products/components/import"
import { db } from "@/localDB";

export const getProduct = async (page?: number, status?: string): Promise<ProductListResponse> => {
    const params = new URLSearchParams();

    if (page) params.append("page", page.toString());
    if (status) params.append("status", status);
    const response = await apiClient.get<ProductListResponse>(`/product?${params.toString()}`);
    return response.data
};

export const getPopulated = async () => {
    const res = await apiClient.get<ProductSummary[]>('/product/populated')
    if (Array.isArray(res.data) && res.data.length) {
        await db.products.bulkPut(res.data);
    }
    return res.data
}

export const addProduct = (product: Product) => {
    return apiClient.post("/product", product)
}

export const updateProduct = (product: Product) => {
    return apiClient.put("/product/" + product._id, product)
}

export const deleteProduct = (id: string) => {
    return apiClient.delete("/product/" + id)
}

export const SearchProduct = (param: string | number) => {
    return apiClient.get(`product/search?q=${param}`)
}

export const ImportProduct = (products: ProductImport[], mode: 'strict' | 'smart') => {
    return apiClient.post('/product/import', { products, mode })
}

export const deleteMany = (ids: string[]) => {
    if (Array.isArray(ids) && ids.length > 1) {
        return apiClient.post('/product/deleteMany', { ids })
    }
}

export const saveLocal = async (products: { _id: string, isSync: boolean }[]) => {
    const res = await apiClient.put('/product/sync/saveLocal', products)
    return res.data
}

export const getSyncProduct = async () => {
    const res = await apiClient.get('/product/sync/product')
    return res.data
}

export const getProductById = async (id: string) => {
    const response = await apiClient.get(`/product/${id}`);
    return response.data.data;
};
