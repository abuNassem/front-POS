'use client';

import { Typography } from '@mui/material';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientHistory from './clientHistory';

export default function SalesHistoryPage() {



    return (
        <DashboardLayout>
            <Typography variant="h4" className="font-bold mb-6 text-gray-900">
                Sales History
            </Typography>

            <ClientHistory />
        </DashboardLayout>
    );
}
