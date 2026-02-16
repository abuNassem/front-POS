'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
    {
        title: 'Basic',
        price: '0',
        description: ['1 User', '100 Products', 'Basic Analytics', 'Email Support'],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most Popular',
        price: '29',
        description: [
            '5 Users',
            'Unlimited Products',
            'Advanced Analytics',
            'Priority Support',
            'Barcode Scanning',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '99',
        description: [
            'Unlimited Users',
            'Unlimited Products',
            'Custom Analytics',
            '24/7 Phone Support',
            'API Access',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];

export default function PricingTable() {
    return (
        <Container id="pricing" maxWidth="lg" component="section" className="py-20">
            <Box className="text-center mb-16">
                <Typography component="h2" variant="h3" color="text.primary" className="font-bold mb-4">
                    Simple, Transparent Pricing
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Choose the plan that best fits your business needs. No hidden fees.
                </Typography>
            </Box>
            <Grid container spacing={4} alignItems="flex-end">
                {tiers.map((tier) => (
                    <Grid key={tier.title} size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}>
                        <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow border-gray-200 ${tier.title === 'Pro' ? 'border-primary shadow-md transform scale-105 z-10' : ''}`}>
                            <CardHeader
                                title={tier.title}
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center', className: 'font-bold' }}
                                subheaderTypographyProps={{ align: 'center', className: 'text-blue-600 font-medium' }}
                                className="bg-gray-50 border-b border-gray-100"
                            />
                            <CardContent className="flex-grow">
                                <Box className="flex justify-center items-baseline mb-6">
                                    <Typography component="h2" variant="h3" color="text.primary" className="font-bold">
                                        ${tier.price}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        /mo
                                    </Typography>
                                </Box>
                                <ul className="space-y-4">
                                    {tier.description.map((line) => (
                                        <li key={line} className="flex items-center gap-2">
                                            <Check size={18} className="text-green-500" />
                                            <Typography variant="body1" color="text.primary">
                                                {line}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions className="p-4">
                                <Link href="/auth/login" passHref className="w-full">
                                    <Button fullWidth variant={tier.buttonVariant as 'outlined' | 'contained'} color="primary" size="large">
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
