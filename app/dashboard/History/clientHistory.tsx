'use client';
import { deleteSale, getSales } from "@/services/sales"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip } from "@mui/material"
import { Edit, Trash2 } from "lucide-react";
import EditSaleDrawer from "./updateSales";
import { Sale } from "@/types/sale";
import { useEffect, useState } from "react";

const ClientHistory = () => {
    const [hyperd, setHyperd] = useState(false);
    // Standard English date formatting
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };
    useEffect(() => {
        setHyperd(true);
    }, [])

    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales(),
        enabled: hyperd
    });

    useEffect(() => {
        console.log(data)
    }, [data])
    const handleDelete = (id: string) => {
        deleteSale(id)
        queryClient.invalidateQueries({ queryKey: ["sales"] });
        window.location.reload();
    };

    if (isLoading) return <div className="p-10 text-center text-gray-500">Loading history...</div>;
    if (error) return <div className="p-10 text-red-500 text-center">Error: {error.message}</div>;
    if (!data || data.length === 0) return <div className="p-10 text-center text-gray-400 font-bold">No sales history found</div>;

    return (
        <TableContainer component={Paper} className="shadow-md border border-gray-200 rounded-xl overflow-hidden">
            <Table>
                <TableHead className="bg-gray-100">
                    <TableRow>
                        <TableCell className="font-bold text-gray-800">Date & Time</TableCell>
                        <TableCell className="font-bold text-gray-800">Payment Method</TableCell>
                        <TableCell className="font-bold text-gray-800 text-right">Total</TableCell>
                        <TableCell className="font-bold text-gray-800 text-center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((sale: Sale) => (
                        <TableRow key={sale._id} hover className="transition-colors">
                            <TableCell className="text-gray-600 font-medium">
                                {formatDate(String(sale.createdAt ?? null))}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={sale.paymentMethod === 'card' ? 'Card' : 'Cash'}
                                    size="small"
                                    className={`font-bold uppercase ${sale.paymentMethod === 'card'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-green-100 text-green-700'
                                        }`}
                                />
                            </TableCell>
                            <TableCell className="text-right font-black text-gray-900">
                                ${sale.total}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center gap-1">
                                    <Tooltip title="Edit">
                                        <div className="flex items-center">
                                            <EditSaleDrawer sale={sale} />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => handleDelete(sale._id ?? '')}
                                            size="small"
                                            className="text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ClientHistory;