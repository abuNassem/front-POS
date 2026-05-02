'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { 
    Box, 
    Typography, 
    Chip, 
    List, 
    Paper
} from '@mui/material';
import { AlertCircle, Package, ArrowRight } from 'lucide-react';
import { LowStockProduct } from '@/types/overview';
import Link from 'next/link';

interface LowStockAlertsProps {
    products: LowStockProduct[];
}

const LowStockAlerts = ({ products }: LowStockAlertsProps) => {
    React.useEffect(()=>{
        console.log(products)
    },[])
    const renderedProducts = useMemo(() => {
        return products.map((product) => (
            <Paper 
                key={product._id} 
                elevation={0} 
                className="mb-3 border border-gray-100 hover:border-red-200 transition-all rounded-xl overflow-hidden shadow-sm hover:shadow-md"
            >
                <Link 
                    href={`/dashboard/Products#${product.barcode}`} 
                    prefetch={true} 
                    className="no-underline block"
                >
                    <Box className="p-3 flex gap-3 items-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <Box className={`flex-shrink-0 p-2.5 rounded-xl ${product.stock <= 5 ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                            <AlertCircle size={20} />
                        </Box>

                        <Box className="flex-grow text-right">
                            <Typography variant="body2" component="div" className="font-bold text-gray-900 mb-0.5">
                                {product.name}
                            </Typography>
                            <Typography variant="caption" component="div" className="text-gray-400">
                                رقم المنتج: {product.barcode}
                            </Typography>
                        </Box>

                        <Box className="flex flex-col items-center min-w-[60px] border-r border-gray-100 pr-3 mr-1">
                            <Typography variant="h6" component="div" className={`font-black leading-none ${product.stock <= 5 ? 'text-red-600' : 'text-orange-600'}`}>
                                {product.stock}
                            </Typography>
                            <Typography variant="caption" component="div" className="text-gray-400 font-medium">
                                قطعة
                            </Typography>
                        </Box>
                    </Box>
                </Link>
            </Paper>
        ));
    }, [products]);

    if (products.length === 0) {
        return (
            <Box className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                <Package size={40} className="mb-3 opacity-20" />
                <Typography variant="body2" className="font-medium">المخزون مكتمل ولا توجد نواقص</Typography>
            </Box>
        );
    }

    return (
        <Box className="flex flex-col h-full bg-white">
            <Box className="flex items-center justify-between mb-6 px-1">
                <Box>
                    <Typography variant="h6" className="font-bold text-gray-900 leading-none">
                        تنبيهات المخزون
                    </Typography>
                    <Typography variant="caption" className="text-gray-500 mt-1 block">
                        منتجات وصلت لحد الطلب
                    </Typography>
                </Box>
                <Chip 
                    label={products.length} 
                    size="small" 
                    className="font-bold bg-red-600 text-white" 
                />
            </Box>

            <Box className="flex-grow overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: '420px' }}>
                <List disablePadding component="div">
                    {renderedProducts}
                </List>
            </Box>

            <Box className="mt-4">
                <Link href="/dashboard/Products" prefetch={true} className="no-underline">
                    <Box className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-bold transition-all border border-gray-200 group">
                        <ArrowRight size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <Typography variant="body2" className="font-bold">عرض تفاصيل المخازن</Typography>
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};

export default React.memo(LowStockAlerts);