'use client'
import { createSales } from "@/services/sales"
import { Product } from "@/types/product"
import { Sale } from "@/types/sale"
import { useState } from "react"


const useCart = () => {
    const [sale, setSale] = useState<Sale>({
        items: [],
        total: 0,
        paymentMethod: "cash"
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSale = (product: Product) => {
        const existingItem = sale.items.find((item) => item.idProduct === product._id)
        if (existingItem) {
            setSale({
                ...sale,
                items: sale.items.map((item) => item.idProduct === product._id ? { ...item, quantity: item.quantity + 1 } : item),
                total: Number(sale.total) + Number(product.price)
            })
        } else {
            setSale({
                ...sale,
                items: [...sale.items, { idProduct: product._id as string, name: product.name, price: Number(product.price), quantity: 1 }],
                total: Number(sale.total) + Number(product.price)
            })
        }
    }

    const handlePaymentMethod = (paymentMethod: "cash" | "card") => {
        setSale({
            ...sale,
            paymentMethod
        })
    }

    const deleteItem = (idProduct: string) => {
        setSale({
            ...sale,
            items: sale.items.filter((item) => item.idProduct !== idProduct),
            total: Number(sale.total) - Number(sale.items.find((item) => item.idProduct === idProduct)?.price)
        })
    }
    const decrementItem = (idProduct: string) => {
        setSale({
            ...sale,
            items: sale.items.map((item) => item.idProduct === idProduct ? { ...item, quantity: item.quantity - 1 } : item),
            total: Number(sale.total) - Number(sale.items.find((item) => item.idProduct === idProduct)?.price)
        })
    }
    const deleteAll = () => {
        setSale({
            items: [],
            total: 0,
            paymentMethod: "cash"
        })
    }

    const createSale = async () => {
        setLoading(true)
        setError(null)
        try {
            await createSales(sale)
            setSuccess(true)
            deleteAll()
        } catch (error) {
            setError("Failed to create sale")
        } finally {
            setLoading(false)
        }
    }
    return {
        sale,
        handleSale,
        handlePaymentMethod,
        deleteItem,
        decrementItem,
        deleteAll,
        createSale,
        error,
        loading,
        success
    }
}

export default useCart