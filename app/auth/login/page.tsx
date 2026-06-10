import type { Metadata } from 'next';
import * as React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { Store } from 'lucide-react';
import LoginForm from './clientLogin';

export const metadata: Metadata = {
    title: 'تسجيل الدخول',
    description: 'سجّل الدخول إلى حساب نظام نقاط البيع الخاص بك لإدارة المبيعات والمخزون والفواتير ومتابعة تقاريرك من لوحة تحكم واحدة بسهولة وأمان.',
    alternates: { canonical: '/auth/login' },
};

export default function LoginPage() {
    return (
        <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <Container maxWidth="xs">
                <Paper elevation={0} className="p-8 border border-gray-200 rounded-3xl shadow-sm">
                    <Box className="text-center mb-8">
                        <Box className="inline-flex bg-blue-50 p-4 rounded-2xl mb-4">
                            <Store className="text-blue-600" size={32} />
                        </Box>
                        <Typography variant="h5" className="font-bold text-gray-900">
                            تسجيل الدخول
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 mt-2">
                            مرحباً بك مجدداً في نظام POS
                        </Typography>
                    </Box>

                    <LoginForm />

                    <Box className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <Typography variant="body2" className="text-gray-600">
                            ليس لديك حساب؟{' '}
                            <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
                                إنشاء حساب جديد
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}