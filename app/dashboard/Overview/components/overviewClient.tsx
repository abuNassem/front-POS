'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import { DashboardStats, LowStockProduct, TopSellingProduct } from '@/types/overview';
import { getLowStockProducts, getPublicStats, getTopSelling } from '@/services/overview';

const StatsCards = dynamic(() => import("../card/stateCards"), {
    ssr: false,
    loading: () => <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 h-32 animate-pulse bg-gray-50 rounded-xl" />
});

const TopProducts = dynamic(() => import("./TopProducts"), {
    ssr: false,
    loading: () => <Skeleton variant="rectangular" width="100%" height={400} className="rounded-xl" />
});

const LowStockAlerts = dynamic(() => import("./LowStockAlerts"), {
    ssr: false,
    loading: () => <Skeleton variant="rectangular" width="100%" height={400} className="rounded-xl" />
});

export default function StoreOverview() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [lowStock, setLowStock] = useState<LowStockProduct[]>([]);
    const [topSelling, setTopSelling] = useState<TopSellingProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statsData, lowStockData, topSellingData] = await Promise.all([
                    getPublicStats(),
                    getLowStockProducts(),
                    getTopSelling()
                ]);

                setStats(statsData);
                setLowStock(lowStockData);
                setTopSelling(topSellingData);
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const memoizedStats = useMemo(() => stats, [stats]);
    const memoizedLowStock = useMemo(() => lowStock, [lowStock]);
    const memoizedTopSelling = useMemo(() => topSelling, [topSelling]);

    if (loading) {
        return (
            <Box className="flex justify-center items-center p-20 min-h-[60vh]">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box>
            <Suspense fallback={<Box className="h-32 bg-gray-100 rounded-xl animate-pulse" />}>
                <StatsCards data={memoizedStats} />
            </Suspense>

            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8" dir="rtl">
                <Box className="lg:col-span-2 space-y-8">
                    <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
                        <TopProducts products={memoizedTopSelling} />
                    </Suspense>
                </Box>

                <Box>
                    <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
                        <LowStockAlerts products={memoizedLowStock} />
                    </Suspense>
                </Box>
            </Box>
        </Box>
    );
}