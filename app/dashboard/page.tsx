import type { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientCash from './cash/clientCash';

export const metadata: Metadata = {
    title: 'نظام الكاشير | إدارة المبيعات الذكية',
    description:
        'واجهة الكاشير الاحترافية لإدارة المبيعات، البحث عن المنتجات، وإتمام المعاملات المالية بسرعة وسهولة.',
    robots: { index: false, follow: false },
};

export default function POSPage() {

    return (
        <DashboardLayout>

            <ClientCash />
        </DashboardLayout>
    );
}
