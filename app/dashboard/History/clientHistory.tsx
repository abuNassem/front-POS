'use client'

import React, { useMemo, useCallback, Suspense } from "react";
import { deleteSale, getSales } from "@/services/sales";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Sale } from "@/types/sale";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";

const InvoiceCard = dynamic(() => import("./card/invoiceCard"), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />
});

const ClientHistory = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales(),
        staleTime: 1000 * 60 * 5,
    });

    const handleDelete = useCallback(async (id: string) => {
        if (!window.confirm("هل تريد حذف هذه العملية من السجل؟")) return;

        try {
            await deleteSale(id);
            queryClient.setQueryData<Sale[]>(["sales"], (oldData) => {
                return oldData ? oldData.filter((item) => item._id !== id) : [];
            });
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }, [queryClient]);

    const renderedSales = useMemo(() => {
        return data?.map((sale: Sale) => (
            <InvoiceCard
                key={sale._id || Math.random()}
                sale={sale}
                handleDelete={handleDelete}
            />
        ));
    }, [data, handleDelete]);

    if (isLoading) return <div className="p-10 text-center text-gray-500 animate-pulse font-medium">جاري تحميل السجل...</div>;
    if (error) return <div className="p-10 text-red-500 text-center">خطأ في تحميل البيانات</div>;
    if (!data || data.length === 0) return <div className="p-10 text-center text-gray-400 font-bold">لا يوجد سجل مبيعات حالياً</div>;

    return (
                        <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={400} />}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {renderedSales}
        </div>
        </Suspense>
    );
};

export default React.memo(ClientHistory);