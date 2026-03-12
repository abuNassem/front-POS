import { Populated, Product } from "@/types/product"
import apiClient from "./index"

export const getProduct = async (id: string | null) => {
    if (id) {
        const res = await apiClient.get<Product>(`/product?id=${id}`)
        return res.data
    } else {
        const res = await apiClient.get<Product[]>("/product")
        return res.data
    }

}

export const getPopulated = async () => {
    const res = await apiClient.get<Populated[]>('/product/populated')
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