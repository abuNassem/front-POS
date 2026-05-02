import { Sale } from '@/types/sale';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { Banknote, Calendar, Clock, CreditCard, Trash2 } from 'lucide-react';
import EditSaleDrawer from '../components/updateSales';

const InvoiceCard = ({sale,handleDelete}:{sale:Sale,handleDelete:(id:string)=>void}) => {


     const formatDate = (dateString: string | null) => {
        if (!dateString) return { date: 'N/A', time: '' };
        const d = new Date(dateString);
        return {
            date: d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };


       const { date, time } = formatDate(String(sale.createdAt ?? null));

  return (
    <div key={sale._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all relative overflow-hidden group">
                        {/* الزينة الجانبية بناءً على نوع الدفع */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${sale.paymentMethod === 'card' ? 'bg-blue-500' : 'bg-green-500'}`} />

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                    <Calendar size={14} />
                                    <span>{date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-xs">
                                    <Clock size={14} />
                                    <span>{time}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider">إجمالي المبلغ</span>
                                <span className="text-xl font-black text-gray-900">${sale.total}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-4">
                            <div className="flex items-center gap-2">
                                {sale.paymentMethod === 'card' ? (
                                    <Chip
                                        icon={<CreditCard size={14} className="text-blue-700" />} 
                                        label="بطاقة" 
                                        size="small"
                                        className="bg-blue-50 text-blue-700 font-bold border border-blue-100"
                                    />
                                ) : (
                                    <Chip 
                                        icon={<Banknote size={14} className="text-green-700" />} 
                                        label="نقدي" 
                                        size="small"
                                        className="bg-green-50 text-green-700 font-bold border border-green-100"
                                    />
                                )}
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <EditSaleDrawer sale={sale} />
                                <Tooltip title="حذف من السجل">
                                    <IconButton
                                        onClick={() => handleDelete(sale._id ?? '')}
                                        size="small"
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={18} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
  )
}

export default InvoiceCard
