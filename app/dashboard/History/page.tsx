

import Head from 'next/head';
import { Typography } from '@mui/material';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientHistory from './clientHistory';

export default function SalesHistoryPage() {
    return (
        <>
            <Head>
                <title>Sales History | Dashboard</title>
                <meta name="description" content="View and manage your complete sales history and transaction records." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <DashboardLayout>
                <Typography
                    variant="h4"
                    className="font-bold mb-6 text-gray-900"
                    component="h1"
                >
                    Sales History
                </Typography>

                    <ClientHistory />
            </DashboardLayout>
        </>
    );
}