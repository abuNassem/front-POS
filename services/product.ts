import { Product } from "@/types/product"
import apiClient from "./index"

export const getProduct = () => {
    return apiClient.get("/product")
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
