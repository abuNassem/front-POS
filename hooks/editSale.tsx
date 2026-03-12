import { useEffect, useState, useCallback } from "react";
import { Sale, SaleItem } from "@/types/sale";
import { updateProductStock, updateSale } from "@/services/sales";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "@/services/product";
import { Product } from "@/types/product";

export type SaleItemWithMaximumQuantity = SaleItem & {
    maximumQuantity: number;
};

export const useEditSale = (sale: Sale) => {
    const [confirmDeleteSale, setConfirmDeleteSale] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const { data: products } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await getProduct(null);
            return res as Product[];
        }
    });

    const calculateMaxQty = useCallback((idProduct: string, originalQty: number) => {
        const product = products?.find(p => p._id === idProduct);
        if (!product) return originalQty;
        return Number(product.stock) + Number(originalQty);
    }, [products]);

    const [formData, setFormData] = useState<{ items: SaleItemWithMaximumQuantity[]; total: number; paymentMethod: 'cash' | 'card' }>({
        items: [],
        total: sale.total,
        paymentMethod: sale.paymentMethod
    });

    const [mangStock, setMangStock] = useState<{ idProduct: string; quantity: number }[]>([]);

    useEffect(() => {
        if (products && isOpen) {
            const updatedItems = sale.items.map(item => ({
                ...item,
                maximumQuantity: calculateMaxQty(item.idProduct, item.quantity)
            }));

            setFormData({
                items: updatedItems,
                total: sale.total,
                paymentMethod: sale.paymentMethod
            });
        }
    }, [products, sale, isOpen, calculateMaxQty]);


    // open edit sale
    const handleOpen = () => {
        setMangStock([]);
        setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);


    // control stock
    const handleMangStock = (idProduct: string, newQuantity: number) => {


        const originalItem = sale.items.find((item) => item.idProduct === idProduct);
        if (!originalItem) return;

        const difference = originalItem.quantity - newQuantity;
        setMangStock((prev) => {
            const filtered = prev.filter(i => i.idProduct !== idProduct);
            return [...filtered, { idProduct, quantity: difference }];
        });


    };



    // change quantity
    const handleItemChange = (index: number, field: keyof SaleItem, value: any) => {
        const updatedItems = [...formData.items];
        let newValue = value;


        if (field === 'quantity') {
            const max = updatedItems[index].maximumQuantity;
            newValue = Math.min(Math.max(0, Number(value)), max);

            // تحديث سجل فروقات المخزون (الكمية الأصلية - الكمية الجديدة)
            handleMangStock(updatedItems[index].idProduct, newValue);
        }

        updatedItems[index] = { ...updatedItems[index], [field]: newValue };

        const newTotal = updatedItems.reduce(
            (acc, item) => acc + Number(item.price) * Number(item.quantity),
            0
        );

        setFormData(prev => ({ ...prev, items: updatedItems, total: newTotal }));


        // إذا كان التعديل على الكمية، نمنع تجاوز الـ maximumQuantity

    };



    // remove from local
    const removeItem = (index: number, idProduct: string) => {

        const updatedItems = formData.items.filter((_, i) => i !== index);
        const newTotal = updatedItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);

        setFormData(prev => ({ ...prev, items: updatedItems, total: newTotal }));

        const originalItem = sale.items.find((item) => item.idProduct === idProduct);
        if (originalItem) {
            handleMangStock(idProduct, 0); // عند الحذف، نرجع كامل الكمية للمخزن

        }
    }



    // post update sale
    const handleSave = async () => {
        setLoading(true);
        try {
            if (formData.items.length === 0) {
                setConfirmDeleteSale(true)
                return;
            }
            const cleanData = {
                items: formData.items.map(({ idProduct, name, quantity, price }) => ({
                    idProduct, name, quantity, price
                })),
                total: formData.total,
                paymentMethod: formData.paymentMethod
            };

            await updateSale(sale._id as string, cleanData);

            if (mangStock.length > 0) {
                await updateProductStock(mangStock);
            }

            await queryClient.invalidateQueries({ queryKey: ["sales"] });
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            setIsOpen(false);
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        isOpen, formData, loading,
        setFormData,
        handleOpen, handleClose, handleItemChange,
        removeItem, handleSave, setIsOpen,
        handleMangStock, confirmDeleteSale, setConfirmDeleteSale
    };
};