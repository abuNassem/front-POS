'use client'

import React, { Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import { Search, X } from "lucide-react";
import { SaleItem } from "@/types/sale";
import { ProductSummary } from "@/types/product";
import { useSearch } from "./logic/searchLogic";

const ProductCard = dynamic(() => import("../card/productCard"), {
    ssr: false,
    loading: () => (
        <div className="h-24 bg-gray-100 animate-pulse rounded-xl" />
    )
});

const SearchComponent = ({
    addToCart,
    sale
}: {
    addToCart: (product: ProductSummary) => void,
    sale: SaleItem[]
}) => {

    const {
        handleSearch,
        resultSearch,
        refSearch,
        closeSearch,
        searchValue
    } = useSearch();

    const renderedResults = useMemo(() => {
        if (!resultSearch?.length) return null;

        return resultSearch.map((product, ind) => (
            <ProductCard
                key={`${product._id}-${ind}`}
                product={product}
                sale={sale}
                onAdd={addToCart}
            />
        ));
    }, [resultSearch, sale, addToCart]);

    return (
        <div dir="rtl" className="relative w-full flex flex-col items-center">

            {/* 🔎 Search Box */}
            <div className="relative w-full max-w-[90%]   ">

                <div className="relative flex-1">
                    <input
                        ref={refSearch}
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        type="text"
                        placeholder="ابحث عن المنتجات..."
                        className="
                            w-full h-[60px]
                            px-14 pr-15
                            text-right text-lg
                            rounded-full
                            border border-gray-200
                            bg-white shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            transition
                        "
                    />

                    {/* Search Icon */}
                    <Search
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                        size={22}
                    />

                    {/* Clear Button */}
                    {(searchValue || resultSearch) && (
                        <button
                            onClick={closeSearch}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                
            </div>

           {/* 📦 Results Dropdown */}

{resultSearch && resultSearch.length > 0 && (
    <div
        className="
            absolute top-[75px]
            w-full max-w-[650px]
            bg-white
            border border-gray-100
            shadow-2xl
            rounded-2xl
            max-h-[420px]
            overflow-y-auto
            p-3
            z-50
        "
    >

        {/* 🔴 Close Button */}
        <button
            onClick={closeSearch}
            className="
                absolute left-3 top-3
                w-8 h-8
                flex items-center justify-center
                rounded-full
                bg-gray-100 hover:bg-red-100
                text-gray-500 hover:text-red-500
                transition
            "
        >
            <X size={18} />
        </button>
                    <Suspense fallback={<div className="flex-1 h-10 bg-gray-100 animate-pulse" />}>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
            {renderedResults}
        </div>
                    </Suspense>
       
    </div>
)}
        </div>
    );
};

export default React.memo(SearchComponent);