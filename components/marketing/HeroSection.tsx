'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { Zap, ShieldCheck, BarChart3, Cloud } from 'lucide-react';

const features = [
    {
        icon: <Zap className="text-blue-600" size={24} />,
        title: 'Lightning Fast',
        description: 'Process transactions in milliseconds with our optimized checkout flow.',
    },
    {
        icon: <Cloud className="text-blue-600" size={24} />,
        title: 'Cloud Based',
        description: 'Access your sales data and inventory from anywhere, on any device.',
    },
    {
        icon: <BarChart3 className="text-blue-600" size={24} />,
        title: 'Real-time Analytics',
        description: 'Track sales, profits, and inventory levels in real-time.',
    },
    {
        icon: <ShieldCheck className="text-blue-600" size={24} />,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security to keep your business data safe.',
    },
];

export default function HeroSection() {
    return (
        <Box id="hero" className="py-20 lg:py-32 bg-gray-50 border-b border-gray-200">
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h2" component="h1" className="font-extrabold text-gray-900 mb-6 leading-tight">
                            The Modern <span className="text-blue-600">POS System</span><br />
                            for Growing Business
                        </Typography>
                        <Typography variant="h6" className="text-gray-600 mb-8 leading-relaxed">
                            Streamline your operations, manage inventory effortlessly, and boost your sales with our all-in-one cloud POS solution.
                        </Typography>
                        <Box className="flex gap-4">
                            <Link href="/auth/login" passHref>
                                <Button variant="contained" size="large" color="primary" disableElevation className="px-8 py-3 text-lg">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Link href="#features" passHref>
                                <Button variant="outlined" size="large" color="primary" className="px-8 py-3 text-lg">
                                    Learn More
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box className="grid grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <Box key={index} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <Box className="mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center">
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" className="font-bold mb-2 text-gray-900">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-600">
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
