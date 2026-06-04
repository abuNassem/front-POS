'use client'
import { db } from "@/localDB"
import { SearchProduct } from "@/services/product"
import { createSales } from "@/services/sales"
import { ProductSummary, Product } from "@/types/product"
import { Sale } from "@/types/sale"
import { useQueryClient } from "@tanstack/react-query"
import {  useRef, useState } from "react"


const useCart = (online:boolean) => {
    const [sale, setSale] = useState<Sale>({
        items: [],
        total: 0,
        paymentMethod: "cash"
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)


    const querClient = useQueryClient()


   

   
    const handleSale = (product: ProductSummary) => {
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


  const updateProductsStock = () => {
    querClient.setQueriesData({ queryKey: ["products"] }, (old: any) => {

        if (!old || !old.data) return old;

        return {
            ...old,

            data: old.data.map((product: Product) => {

                const itemInSale = sale.items.find(
                    obj => obj.idProduct === product._id
                );

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
};



const createOnlineSale = async () => {

    await createSales(sale);

    updateProductsStock();

    deleteAll();

    setSuccess(true);
};



const createOfflineSale = async () => {

    // تخزين الفاتورة محليًا
    console.log(sale)
    await db.invoices.add({
        ...sale
    });
console.log("local sale",await db.invoices.toArray())
    // تحديث المخزون محليًا
    await Promise.all(

        sale.items.map(async (item) => {

            const product = await db.products.get(item.idProduct);

            if (!product) return;

            await db.products.put({
                ...product,
                stock: Number(product.stock) - item.quantity
            });
        })
    );

    updateProductsStock();

    deleteAll();

    setSuccess(true);
};



const createSale = async () => {

    setLoading(true);

    setError(null);

    try {

        if (online) {

            await createOnlineSale();

        } else {

            await createOfflineSale();
        }

    } catch (error) {

        console.log(error);

        setError("Failed to create sale");

    } finally {

        setLoading(false);
    }
};


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