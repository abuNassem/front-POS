'use client';

import * as React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SalesChart from '@/components/dashboard/SalesChart';
import LowStockAlerts from '@/components/dashboard/LowStockAlerts';
import { DollarSign, ShoppingBag, Package, BadgeDollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardPage() {
    // القيم هنا تم تحديثها لتعكس مفاهيم المحل الواقعية
    const stats = [
        {
            title: 'إجمالي المبيعات (المال المستلم)',
            value: '$12,450.00',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'عدد المنتجات المبيوعة',
            value: '854 قطعة',
            change: '+54',
            trend: 'up',
            icon: ShoppingBag,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
        {
            title: 'قيمة بضاعة المحل (المتوقعة)',
            value: '$45,231.89',
            change: 'إجمالي المخزون',
            trend: 'up',
            icon: BadgeDollarSign,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        {
            title: 'إجمالي عدد الأصناف',
            value: '124 صنف',
            change: '-2%',
            trend: 'down',
            icon: Package,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        },
    ];

    return (
        <DashboardLayout>
            <Box className="mb-8 text-right"> {/* دعم المحاذاة لليمين بما أنه محل عربي */}
                <Typography variant="h4" className="font-bold text-gray-900 mb-1">
                    لمحة عامة عن المحل
                </Typography>
                <Typography color="text.secondary">
                    مرحباً بك مجدداً، إليك ملخص مبيعات وحالة المخزون اليوم.
                </Typography>
            </Box>

            {/* Stats Grid */}
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <Paper key={i} className="p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <Box className="flex justify-between items-start mb-4">
                            <Box className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </Box>
                            <Box className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {stat.change}
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" className="text-gray-500 mb-1">
                                {stat.title}
                            </Typography>
                            <Typography variant="h4" className="font-bold text-gray-900">
                                {stat.value}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Box>

            {/* Charts & Alerts Grid */}
            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* الرسم البياني لعمليات المبيعات */}
                <Paper className="lg:col-span-2 p-6 rounded-xl border border-gray-200 shadow-sm">
                    <Typography variant="h6" className="font-bold mb-4">تحليل المبيعات</Typography>
                    <SalesChart />
                </Paper>

                {/* المنتجات التي اقتربت من النفاد */}
                <Paper className="p-6 rounded-xl border border-gray-200 shadow-sm">
                    <Typography variant="h6" className="font-bold mb-4 text-red-600">تنبيهات المخزون المنخفض</Typography>
                    <LowStockAlerts />
                </Paper>
            </Box>
        </DashboardLayout>
    );
}