'use client';

import React, { useState, useEffect, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { getProduct } from "@/services/product";
import { useProductContext } from "../context";
import ExcelImportComponent from "./import";

// استيراد المكونات الثقيلة ديناميكياً
const SearchComponent = dynamic(() => import("./searchComponent"), { ssr: false });
const ProductDrawer = dynamic(() => import("./productDrawer"), { ssr: false });
const ProductCard = dynamic(() => import("../card/productCard"), { 
    ssr: false,
    loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
});

const ClientProduct = () => {
    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    
    // استدعاء القيم من الـ Context
    const { mangeMany, toggleMange, selectedIds, toggleSelect, clearSelection,loadingRemov,submitIds} = useProductContext();

    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["products", page], 
        queryFn: () => getProduct(null, page),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5, 
    });

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setAllProducts(prev => {
                const newProducts = data as (Product & {isActive: boolean})[];
                const existingIds = new Set(prev.map(p => p._id));
                const uniqueNew = newProducts.filter(p => !existingIds.has(p._id));
                return [...prev, ...uniqueNew];
            });
        }
    }, [data]);

    // تحسين الأداء في رندر البطاقات مع ربطها بالـ Context
    const renderedProducts = useMemo(() => {
        return allProducts.map((product, index) => (
            <ProductCard 
                key={product._id || index} 
                product={product} 
                selectedIds={selectedIds} 
                mangeMany={mangeMany} 
                toggleSelect={toggleSelect}  
            />
        ));
    }, [allProducts, selectedIds, mangeMany, toggleSelect]);

    if ((isLoading && page === 1)||loadingRemov) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error) return <div className="p-10 text-red-500 text-center font-bold">خطأ في الاتصال: {(error as Error).message}</div>;

    return (
        <div className="p-4 w-full bg-gray-50 min-h-screen" dir="rtl">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-gray-800">إدارة المنتجات</h1>
                    {mangeMany && (
                        <span className="text-sm text-blue-600 font-bold animate-pulse">
                            وضع التحديد المتعدد نشط ({selectedIds.length} مختار)
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* زر تفعيل/إلغاء وضع الإدارة */}
                    <button 
                        onClick={() => toggleMange(!mangeMany)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            mangeMany 
                            ? "bg-red-50 text-red-600 border border-red-200" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {mangeMany ? "إلغاء التحديد" : "تحديد متعدد"}
                    </button>

                    <ExcelImportComponent/>
                    <SearchComponent />
                    <ProductDrawer lable="إضافة منتج جديد" />
                </div>
            </div>

            {/* شريط الإجراءات الجماعية (يظهر فقط عند التحديد) */}
            {mangeMany && selectedIds.length > 0 && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white shadow-2xl border border-blue-100 p-4 rounded-2xl flex items-center gap-6 animate-slide-up">
                    <p className="text-gray-700 font-bold">تم تحديد {selectedIds.length} منتج</p>
                    <div className="flex gap-2">
                        <button onClick={()=>submitIds()} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">حذف المختار</button>
                        <button onClick={clearSelection} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">مسح الكل</button>
                    </div>
                </div>
            )}

            {/* Grid Layout */}
            <Suspense fallback={<div className="w-full h-96 bg-gray-50" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allProducts.length > 0 ? (
                        renderedProducts
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed">
                            <p className="text-gray-400 text-lg font-medium">لا توجد منتجات متاحة حالياً.</p>
                        </div>
                    )}
                </div>
            </Suspense>

            {/* Load More Section */}
            <div className="flex flex-col items-center mt-12 mb-10 gap-4">
                <button 
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={isFetching}
                    className={`group relative px-10 py-4 rounded-xl font-bold text-white transition-all overflow-hidden
                        ${isFetching ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-xl active:scale-95'}`}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {isFetching ? (
                            <>
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                جاري التحميل...
                            </>
                        ) : "تحميل المزيد من المنتجات"}
                    </span>
                </button>
                <p className="text-xs text-gray-400 font-medium">
                    عرض {allProducts.length} منتج | الصفحة {page}
                </p>
            </div>
        </div>
    );
};

export default React.memo(ClientProduct);