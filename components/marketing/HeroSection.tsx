'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Zap, ShieldCheck, BarChart3, Cloud, ArrowLeft } from 'lucide-react';
import { Grid } from '@mui/material';

const features = [
    {
        icon: <Zap className="text-blue-600" size={24} />,
        title: 'سرعة البرق',
        description: 'معالجة العمليات في أجزاء من الثانية بفضل تدفق الدفع المحسّن لدينا.',
    },
    {
        icon: <Cloud className="text-blue-600" size={24} />,
        title: 'سحابي بالكامل',
        description: 'الوصول إلى بيانات مبيعاتك ومخزونك من أي مكان ومن أي جهاز.',
    },
    {
        icon: <BarChart3 className="text-blue-600" size={24} />,
        title: 'تحليلات مباشرة',
        description: 'تتبع المبيعات والأرباح ومستويات المخزون في الوقت الفعلي.',
    },
    {
        icon: <ShieldCheck className="text-blue-600" size={24} />,
        title: 'آمن وموثوق',
        description: 'حماية على مستوى المؤسسات لضمان أمان بيانات عملك الحساسة.',
    },
];

export default function HeroSection() {
    return (
        <Box 
            id="hero" 
            className="relative py-20 lg:py-32 bg-white overflow-hidden"
            sx={{ direction: 'rtl' }}
        >
            {/* لمسة خلفية جمالية */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl" />
            </div>

            <Container maxWidth="lg">
                <Grid container spacing={8} alignItems="center">
                    {/* النصوص الرئيسية */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                            <Typography 
                                variant="h2" 
                                component="h1" 
                                className="font-black text-gray-900 mb-6 leading-[1.1]"
                                sx={{ fontFamily: 'var(--font-tajawal)', fontSize: { xs: '2.5rem', md: '3.75rem' } }}
                            >
                                نظام <span className="text-blue-600">كاشير متطور</span><br />
                                لإدارة نمو أعمالك
                            </Typography>
                            
                            <Typography 
                                variant="h6" 
                                className="text-gray-600 mb-10 leading-relaxed font-medium"
                                sx={{ fontFamily: 'var(--font-tajawal)', maxWidth: '90%' }}
                            >
                                بسط عملياتك اليومية، أدر مخزونك بكل سهولة، وضاعف مبيعاتك مع حل الكاشير السحابي المتكامل والشامل.
                            </Typography>

                            <Box className="flex flex-wrap gap-4">
                                <Link href="/auth/login" passHref>
                                    <Button 
                                        variant="contained" 
                                        size="large" 
                                        color="primary" 
                                        disableElevation 
                                        className="px-10 py-4 text-lg font-black rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100"
                                        sx={{ fontFamily: 'var(--font-tajawal)' }}
                                    >
                                        ابدأ مجاناً الآن
                                    </Button>
                                </Link>
                                <Link href="#features" passHref>
                                    <Button 
                                        variant="text" 
                                        size="large" 
                                        className="px-8 py-4 text-lg font-bold text-gray-700 flex gap-2 hover:bg-gray-50 rounded-2xl"
                                        sx={{ fontFamily: 'var(--font-tajawal)' }}
                                    >
                                        اكتشف المميزات
                                        <ArrowLeft size={20} />
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>

                    {/* شبكة المميزات (البصرية) */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-2">
                            {features.map((feature, index) => (
                                <Box 
                                    key={index} 
                                    className={`p-8 rounded-[2rem] border transition-all duration-300 group
                                        ${index % 2 === 0 ? 'bg-white border-gray-100 shadow-xl shadow-gray-50' : 'bg-blue-600 border-blue-600 text-white md:-mt-6 shadow-xl shadow-blue-100'}
                                        hover:-translate-y-2`}
                                >
                                    <Box className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                                        ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white/20 text-white'}`}
                                    >
 <p className={ index % 2 === 0?'text-blue-600' : 'text-white'  }>
                                       {feature.icon}

                                        </p>                                       
                                    </Box>
                                    
                                    <Typography 
                                        variant="h6" 
                                        className={`font-black mb-3 ${index % 2 === 0 ? 'text-gray-900' : 'text-white'}`}
                                        sx={{ fontFamily: 'var(--font-tajawal)' }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    
                                    <Typography 
                                        variant="body2" 
                                        className={`leading-relaxed font-medium ${index % 2 === 0 ? 'text-gray-500' : 'text-blue-50'}`}
                                        sx={{ fontFamily: 'var(--font-tajawal)' }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}