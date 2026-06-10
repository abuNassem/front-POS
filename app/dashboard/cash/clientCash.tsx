'use client'

import React, { useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import useCart from "@/hooks/useCart";
import { useApi } from "@/context";

const SearchComponent = dynamic(() => import("@/app/dashboard/cash/search/searchComponent"), {
    loading: () => <div className="h-10 w-full bg-gray-100 animate-pulse rounded" />,
    ssr: false
});

const SaleComponent = dynamic(() => import("./components/saleComponent"), {
    ssr: false
});

const FamausProduct = dynamic(() => import("./components/popularProducts"), {
    ssr: false
});

const ClientCash = () => {
    const {online}=useApi()
    const {
        sale,
        deleteAll,
        deleteItem,
        handleSale,
        handlePaymentMethod,
        createSale,
        error,
        loading,
        success
    } = useCart(online);

    const memoizedSaleItems = useMemo(() => sale.items, [sale.items]);


    return (
        <>
            <Head>
                <title>نظام الكاشير | إدارة المبيعات الذكية</title>
                <meta name="description" content="واجهة الكاشير الاحترافية لإدارة المبيعات، البحث عن المنتجات، وإتمام المعملات المالية بسرعة وسهولة." />
                <meta name="robots" content="noindex, nofollow" /> 
            </Head>

            <div className="p-4">
                <header className="flex justify-between items-center gap-4">
                        <SearchComponent
                            addToCart={handleSale}
                            sale={memoizedSaleItems}
                        />

                </header>
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                    <section className="lg:col-span-2">
                        <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse" />}>
                            <FamausProduct
                                sale={memoizedSaleItems}
                                addItems={handleSale}
                            />
                        </Suspense>
                    </section>

                    <aside className="lg:col-span-1">
                        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
                            <SaleComponent
                                error={error}
                                loading={loading}
                                success={success}
                                createSale={createSale}
                                sale={sale}
                                deleteItem={deleteItem}
                                deleteAll={deleteAll}
                                handlePaymentMethod={handlePaymentMethod}
                            />
                        </Suspense>
                    </aside>
                </main>
            </div>
        </>
    );
};

export default ClientCash;