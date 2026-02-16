'use client';

import * as React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Sale } from '@/types';

export default function SalesHistoryPage() {
    const [sales, setSales] = React.useState<Sale[]>([]);

    React.useEffect(() => {
        // Mock some sales history data if empty in API
        if (sales.length === 0) {
            const mockHistory: Sale[] = [
                { id: '1001', date: new Date().toISOString(), total: 45.00, items: [], paymentMethod: 'cash' },
                { id: '1002', date: new Date(Date.now() - 3600000).toISOString(), total: 120.50, items: [], paymentMethod: 'card' },
                { id: '1003', date: new Date(Date.now() - 86400000).toISOString(), total: 25.00, items: [], paymentMethod: 'cash' },
            ];
            setSales(mockHistory);
        }
    }, [sales.length]);

    // Simple date formatter
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <DashboardLayout>
            <Typography variant="h4" className="font-bold mb-6 text-gray-900">
                Sales History
            </Typography>

            <TableContainer component={Paper} className="shadow-sm border border-gray-200 rounded-lg">
                <Table>
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            <TableCell className="font-bold text-gray-700">Transaction ID</TableCell>
                            <TableCell className="font-bold text-gray-700">Date & Time</TableCell>
                            <TableCell className="font-bold text-gray-700">Payment Method</TableCell>
                            <TableCell className="font-bold text-gray-700 text-right">Total Amount</TableCell>
                            <TableCell className="font-bold text-gray-700 text-center">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow key={sale.id} hover>
                                <TableCell className="font-mono text-xs font-medium text-gray-600">
                                    #{sale.id}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {formatDate(sale.date)}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={sale.paymentMethod.toUpperCase()}
                                        size="small"
                                        className={sale.paymentMethod === 'card' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}
                                    />
                                </TableCell>
                                <TableCell className="text-right font-bold text-gray-900">
                                    ${sale.total.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Chip label="Completed" size="small" color="success" variant="outlined" />
                                </TableCell>
                            </TableRow>
                        ))}
                        {sales.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                    No sales history available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardLayout>
    );
}
