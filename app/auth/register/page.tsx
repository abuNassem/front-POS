import * as React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import RegisterForm from './clientRegister';

export default function RegisterPage() {
    return (
        <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <Container maxWidth="xs">
                <Paper elevation={0} className="p-8 border border-gray-200 rounded-3xl shadow-sm">
                    <Box className="text-center mb-8">
                        <Box className="inline-flex bg-green-50 p-4 rounded-2xl mb-4">
                            <UserPlus className="text-green-600" size={32} />
                        </Box>
                        <Typography variant="h5" className="font-bold text-gray-900">
                            إنشاء حساب
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 mt-2">
                            انضم إلينا وابدأ إدارة تجارتك بكل سهولة
                        </Typography>
                    </Box>

                    {/* استدعاء المكون التفاعلي المنفصل */}
                    <RegisterForm />

                    <Box className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <Typography variant="body2" className="text-gray-600">
                            لديك حساب بالفعل؟{' '}
                            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                                تسجيل الدخول
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}