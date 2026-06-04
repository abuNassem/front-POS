'use client';

import React, { useMemo } from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { Crown, TrendingUp } from 'lucide-react';
import { TopSellingProduct } from '@/types/overview';

export default function TopProducts({ products }: { products: TopSellingProduct[] }) {
    const maxSales = useMemo(() => {
        return products.length > 0 ? Math.max(...products.map(p => p.totalSales)) : 1;
    }, [products]);

    if (!products || products.length === 0) {
        return (
            <Paper className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white h-full flex items-center justify-center">
                <Typography variant="body2" className="text-gray-400">لا توجد بيانات مبيعات كافية حالياً</Typography>
            </Paper>
        );
    }

    return (
        <Paper className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white h-full">
            <Box className="flex items-center justify-between mb-8" dir="rtl">
                <Box className="flex items-center gap-2">
                    <Box className="p-2 bg-yellow-50 rounded-lg">
                        <Crown className="text-yellow-500" size={24} />
                    </Box>
                    <Box>
                        <Typography variant="h6" className="font-bold text-gray-900 leading-none">
                            الأكثر مبيعاً
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                            أفضل 5 منتجات أداءً من حيث الكمية
                        </Typography>
                    </Box>
                </Box>
                <TrendingUp size={20} className="text-gray-300" />
            </Box>

            <Box className="space-y-6" dir="rtl">
                {products.map((product, index) => {
                    const progressValue = (product.totalSales / maxSales) * 100;

                    return (
                        <Box key={product._id} className="flex items-start gap-4">
                            <Typography 
                                variant="h6" 
                                className={`font-black italic ${index === 0 ? 'text-yellow-500' : 'text-gray-200'}`}
                                style={{ minWidth: '32px' }}
                            >
                                #{index + 1}
                            </Typography>

                            <Box className="flex-grow">
                                <Box className="flex justify-between items-end mb-1.5">
                                    <Typography variant="body2" className="font-bold text-gray-800">
                                        {product.name}
                                    </Typography>
                                    <Box className="text-left">
                                        <Typography variant="caption" className="font-bold text-blue-600 block leading-none">
                                            {product.totalSales}
                                        </Typography>
                                        <Typography variant="caption" style={{ fontSize: '10px' }} className="text-gray-400 uppercase">
                                            مبيعة
                                        </Typography>
                                    </Box>
                                </Box>

                                <LinearProgress 
                                    variant="determinate" 
                                    value={progressValue} 
                                    sx={{
                                        height: 6,
                                        borderRadius: 5,
                                        backgroundColor: '#f1f5f9',
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: 5,
                                            backgroundColor: index === 0 ? '#fbbf24' : '#3b82f6',
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
}