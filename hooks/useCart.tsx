'use client'
import { SearchProduct } from "@/services/product"
import { createSales } from "@/services/sales"
import { Populated, Product } from "@/types/product"
import { Sale } from "@/types/sale"
import { useQueryClient } from "@tanstack/react-query"
<<<<<<< HEAD
import {  useRef, useState } from "react"
=======
import { useRef, useState } from "react"
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd


const useCart = () => {
    const [sale, setSale] = useState<Sale>({
        items: [],
        total: 0,
        paymentMethod: "cash"
    })

    const [resultSearch, setResultSearch] = useState<Populated[]>([])
    const refSearch = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)


    const querClient = useQueryClient()


<<<<<<< HEAD
   

   
=======
    const handleSearch = (params: string) => {
        setTimeout(async () => {
            const data = await SearchProduct(params)
            setResultSearch(data.data)
        }, 300)
    }

    const closeSeach = () => {
        if (refSearch.current) {
            setResultSearch([])
            refSearch.current.value = ''
        }

    }
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd
    const handleSale = (product: Populated) => {
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
            console.log(sale)
            await createSales(sale)
            setSuccess(true)

            querClient.setQueriesData({ queryKey: ["products"] }, (old: any) => {
                // 1. التأكد من وجود البيانات وهيكل الـ data بداخلها
                if (!old || !old.data) return old;

                return {
                    ...old, // الحفاظ على أي خصائص أخرى (مثل total أو page)
                    data: old.data.map((product: Product) => {
                        // البحث عن المنتج في المبيعات
                        const itemInSale = sale.items.find(obj => obj.idProduct === product._id);

                        if (itemInSale) {
                            return {
                                ...product,
                                stock: Number(product.stock) - itemInSale.quantity
                            };
                        }

                        return product;
                    })
                };
            });


            deleteAll()
        } catch (error) {
            console.log(error)
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
<<<<<<< HEAD
        success
       }
=======
        success,
        closeSeach,
        handleSearch,
        resultSearch,
        refSearch
    }
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd
}

export default useCart