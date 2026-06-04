'use client';

import React, { useRef, useEffect } from "react";
import { Search, X, Loader2, SearchX } from "lucide-react";
import ProductCard from "../card/productCard";
import { useSearch } from "../hooks/useSearch";

const SearchComponent = () => {
    const { handleSearch, resultSearch, closeSearch, searchValue, isSearching } = useSearch();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [resultSearch]);

     useEffect(() => {
    const id = window.location.hash.replace('#', '');

    if (id) {

        handleSearch(id)

    }
  }, [handleSearch]);

    return (
        <div className="relative w-full md:w-80" dir="rtl">

            <div className="relative group">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="ابحث بالاسم أو الباركود..."
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 pr-10 rounded-xl shadow-sm
                             focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent
                             outline-none transition-all text-gray-800 placeholder:text-gray-400 font-medium"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    {isSearching ? (
                        <Loader2 size={18} className="animate-spin text-blue-500" />
                    ) : searchValue ? (
                        <X
                            size={18}
                            className="cursor-pointer hover:text-red-500 transition-colors"
                            onClick={closeSearch}
                        />
                    ) : (
                        <Search size={18} />
                    )}
                </div>
            </div>

            {searchValue && (
                <>

                    <div className="fixed inset-0 z-[998]" onClick={closeSearch} />

                    <div
                        ref={scrollRef}
                        className="absolute top-full mt-3 left-0 md:-left-40 w-[92vw] md:w-[650px]
                                 max-h-[550px] bg-white/95 backdrop-blur-md border border-gray-100
                                 rounded-2xl shadow-2xl z-[999] overflow-y-auto p-5 animate-in slide-in-from-top-2 duration-200"
                    >

                        <div className="flex justify-between items-center mb-5 border-b border-gray-50 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-600 text-xs font-black px-2.5 py-1 rounded-full">
                                    {resultSearch.length}
                                </span>
                                <span className="text-sm font-bold text-gray-700">نتائج البحث</span>
                            </div>
                            <button
                                onClick={closeSearch}
                                className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
                            >
                                إغلاق النافذة
                            </button>
                        </div>

                        {resultSearch.length > 0 ? (
                            <div onClick={(t)=>t.stopPropagation()} className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-2">
                                {resultSearch.map((product) => (
                                    <div
                                        key={product._id}
                                        className="transform transition-transform hover:scale-[1.02] active:scale-95" >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : !isSearching && (
                            <div className="py-16 flex flex-col items-center justify-center text-gray-400 gap-3">
                                <SearchX size={48} className="opacity-20" />
                                <div className="text-center">
                                    <p className="font-bold text-gray-600">لا توجد نتائج مطابقة</p>
                                    <p className="text-xs italic mt-1">{`"${searchValue}"`}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(SearchComponent);