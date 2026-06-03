'use client';

import * as React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { DollarSign, ShoppingBag, Package, BadgeDollarSign } from 'lucide-react';
import { DashboardStats } from '@/types/overview';

interface StatsCardsProps {
    data: DashboardStats | null;
}

export default function StatsCards({ data }: StatsCardsProps) {
    // مصفوفة الإعدادات لسهولة العرض
    const cards = [
        {
            title: 'إجمالي المبيعات',
            value: data ? `$${data.totalRevenue.toLocaleString()}` : '...',
            icon: DollarSign,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'إجمالي المخزون (قطع)',
            value: data ? `${data.totalStockQuantity} قطعة` : '...',
            icon: ShoppingBag,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
        {
            title: 'قيمة البضاعة المتوقعة',
            value: data ? `$${data.potentialInventoryValue.toLocaleString()}` : '...',
            icon: BadgeDollarSign,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        {
            title: 'عدد الأصناف الفريدة',
            value: data ? `${data.uniqueProductsCount} صنف` : '...',
            icon: Package,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        }
    ];

    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
            {cards.map((card, i) => (
                <Paper key={i} className="p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <Box className="flex justify-between items-start mb-4">
                        <Box className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                            <card.icon size={24} />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" className="text-gray-500 font-medium mb-1">
                            {card.title}
                        </Typography>
                        <Typography variant="h4" className="font-bold text-gray-900">
                            {card.value}
                        </Typography>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}