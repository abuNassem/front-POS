'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { Store } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const handleLogin = () => {
        setLoading(true);
        // Simulate login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <Box className="min-h-screen flex items-center justify-center bg-gray-50">
            <Container maxWidth="xs">
                <Paper elevation={0} className="p-8 border border-gray-200 rounded-2xl text-center">
                    <Box className="flex justify-center mb-6">
                        <Box className="bg-blue-50 p-3 rounded-full">
                            <Store className="text-blue-600" size={32} />
                        </Box>
                    </Box>

                    <Typography component="h1" variant="h5" className="font-bold mb-2">
                        Welcome back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mb-8">
                        Sign in to access your POS dashboard
                    </Typography>

                    <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        onClick={handleLogin}
                        disabled={loading}
                        className="mb-4 h-12 text-gray-700 border-gray-300 hover:bg-gray-50 normal-case text-base"
                        startIcon={
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                        }
                    >
                        {loading ? 'Signing in...' : 'Sign in with Google'}
                    </Button>

                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 no-underline">
                        Back to Home
                    </Link>
                </Paper>
                <Typography variant="body2" align="center" color="text.secondary" className="mt-8">
                    © {new Date().getFullYear()} SaaS POS System. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}
