'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        title: 'الأساسية',
        price: '0',
        description: ['مستخدم واحد', '100 منتج', 'تحليلات أساسية', 'دعم عبر البريد'],
        buttonText: 'ابدأ مجاناً',
        buttonVariant: 'outlined',
    },
    {
        title: 'الاحترافية',
        subheader: 'الأكثر شيوعاً',
        price: '29',
        description: [
            '5 مستخدمين',
            'منتجات غير محدودة',
            'تحليلات متقدمة',
            'دعم فني ذو أولوية',
            'نظام قراءة الباركود',
        ],
        buttonText: 'اشترك الآن',
        buttonVariant: 'contained',
    },
    {
        title: 'المؤسسات',
        price: '99',
        description: [
            'مستخدمين غير محدودين',
            'منتجات غير محدودة',
            'تحليلات مخصصة',
            'دعم هاتفي 24/7',
            'الوصول إلى الـ API',
        ],
        buttonText: 'تواصل معنا',
        buttonVariant: 'outlined',
    },
];

export default function PricingTable() {
    return (
        <Container id="pricing" maxWidth="lg" component="section" className="py-24" dir="rtl">
            <Box className="text-center mb-16">
                <Typography 
                    component="h2" 
                    variant="h3" 
                    className="font-black mb-4 text-gray-900"
                    sx={{ fontFamily: 'var(--font-tajawal)' }}
                >
                    أسعار بسيطة وشفافة
                </Typography>
                <Typography 
                    variant="h6" 
                    className="text-gray-500 max-w-2xl mx-auto font-medium"
                    sx={{ fontFamily: 'var(--font-tajawal)' }}
                >
                    اختر الخطة التي تناسب حجم أعمالك. لا توجد رسوم خفية أو عقود معقدة.
                </Typography>
            </Box>

            <Grid container spacing={4} alignItems="stretch">
                {tiers.map((tier) => (
                    <Grid key={tier.title} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card 
                            className={`h-full flex flex-col transition-all duration-300 rounded-[2rem] border-2 
                                ${tier.title === 'الاحترافية' 
                                    ? 'border-blue-600 shadow-2xl shadow-blue-100 scale-105 relative z-10' 
                                    : 'border-gray-100 shadow-sm hover:shadow-md'}`}
                        >
                            {tier.subheader && (
                                <Box className="bg-blue-600 text-white text-center py-2 flex items-center justify-center gap-2">
                                    <Star size={16} fill="white" />
                                    <Typography className="text-xs font-black uppercase tracking-widest leading-none">
                                        {tier.subheader}
                                    </Typography>
                                </Box>
                            )}
                            
                            <CardHeader
                                title={tier.title}
                                titleTypographyProps={{ 
                                    align: 'center', 
                                    className: 'font-black text-2xl pt-4',
                                    sx: { fontFamily: 'var(--font-tajawal)' } 
                                }}
                                className={tier.title === 'الاحترافية' ? 'bg-blue-50/50' : 'bg-gray-50/50'}
                            />
                            
                            <CardContent className="flex-grow px-8">
                                <Box className="flex justify-center items-baseline mb-8">
                                    <Typography variant="h3" className="font-black text-gray-900">
                                        {tier.price}
                                    </Typography>
                                    <Typography variant="h6" className="text-gray-400 mr-2 font-bold">
                                        د.أ / شهر
                                    </Typography>
                                </Box>
                                <ul className="space-y-4">
                                    {tier.description.map((line) => (
                                        <li key={line} className="flex items-center gap-3">
                                            <div className="bg-green-100 rounded-full p-1">
                                                <Check size={14} className="text-green-600 stroke-[3]" />
                                            </div>
                                            <Typography className="text-gray-600 font-bold text-sm" sx={{ fontFamily: 'var(--font-tajawal)' }}>
                                                {line}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            
                            <CardActions className="p-8 mt-auto">
                                <Link href="/auth/login" passHref className="w-full">
                                    <Button 
                                        fullWidth 
                                        variant={tier.buttonVariant as 'outlined' | 'contained'} 
                                        color="primary" 
                                        size="large"
                                        className={`py-4 rounded-2xl font-black shadow-lg transition-transform active:scale-95
                                            ${tier.title === 'الاحترافية' ? 'bg-blue-600 shadow-blue-200' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                        sx={{ fontFamily: 'var(--font-tajawal)' }}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}