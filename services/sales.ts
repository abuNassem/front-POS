import { Sale } from "@/types/sale"
import apiClient from "."

const createSales = async (sale: Sale) => {
    try {
        const res = await apiClient.post("/sales", sale)
        return res.data
    } catch (error) {
        throw error
    }
}

const getSales = async () => {
    const res = await apiClient.get<Sale[]>("/sales")
    return res.data
}
const deleteSale = async (id: string) => {
    const res = await apiClient.delete(`/sales/${id}`)
    return res.data
}
const updateSale = async (id: string, sale: Sale) => {
    const res = await apiClient.put(`/sales/${id}`, sale)
    return res.data
}
const updateProductStock = async (sale: { idProduct: string, quantity: number }[]) => {
    const res = await apiClient.put(`/sales/product/updateStock`, sale)
    return res.data
}

const syncSale=async(sales:Sale[])=>{
    return apiClient.post('/sales/sync',sales)
}

export {
    createSales,
    getSales,
    deleteSale,
    updateSale,
    updateProductStock,
    syncSale
}