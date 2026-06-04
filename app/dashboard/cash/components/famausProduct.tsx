'use client'

import React, { useMemo } from "react";
import { getPopulated } from "@/services/product";
import { ProductSummary } from "@/types/product";
import { SaleItem } from "@/types/sale";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useGetProduct } from "@/repositryProduct";

const ProductCard = dynamic(() => import("../card/productCard"), {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-md" />
});

const FamausProduct = ({ addItems, sale }: { addItems: (product: ProductSummary) => void, sale: SaleItem[] }) => {
  
    const {products,loading,error}=useGetProduct()

    const productGrid = useMemo(() => {
        return products?.map((product: ProductSummary) => (
            <ProductCard
                key={product._id}
                sale={sale}
                product={product}
                onAdd={addItems}
            />
        ));
    }, [products, sale, addItems]);

    if (loading) return <div className="p-4 text-center animate-pulse text-gray-500">جاري التحميل...</div>;
    if (error) return <div className="p-4 text-red-500 text-sm">خطأ في تحميل البيانات</div>;

    return (
        <div className="p-2 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-bold mb-3 text-gray-800 border-b pb-2">الأكثر طلباً</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {productGrid}
            </div>
        </div>
    );
};

export default React.memo(FamausProduct);