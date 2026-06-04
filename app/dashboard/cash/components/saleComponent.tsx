'use client'

import React, { useMemo } from "react";
import { Sale } from "@/types/sale";
import { Trash2, XCircle, Banknote, CreditCard, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface SaleComponentProps {
    sale: Sale;
    deleteItem: (idProduct: string) => void;
    deleteAll: () => void;
    handlePaymentMethod: (paymentMethod: "cash" | "card") => void;
    createSale: () => void;
    error?: string | null;
    loading?: boolean;
    success?: boolean;
}

const SaleComponent = ({
    sale,
    deleteItem,
    deleteAll,
    handlePaymentMethod,
    createSale,
    error,
    loading,
    success
}: SaleComponentProps) => {

    const hasItems = useMemo(() => sale?.items && sale.items.length > 0, [sale?.items]);

    const renderedItems = useMemo(() => {
        return sale?.items?.map((item, index) => (
            <div key={`${item.idProduct}-${index}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100 group transition-all">
                <div className="flex flex-col flex-1">
                    <span className="font-semibold text-sm text-gray-800">{item.name}</span>
                    <span className="text-[10px] text-gray-500">{item.quantity} × {item.price} ر.س</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-blue-600">{(item.price * item.quantity).toFixed(2)}</span>
                    <button
                        onClick={() => deleteItem(item.idProduct)}
                        className="text-gray-400 hover:text-red-500 transition-colors md:opacity-0 group-hover:opacity-100"
                        aria-label="حذف المنتج"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        ));
    }, [sale?.items, deleteItem]);

    if (!hasItems) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg m-4">
                <p>انتظار إضافة منتجات...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white border-l border-gray-200 shadow-lg w-full max-w-md mx-auto relative rounded-lg overflow-hidden">

            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">الفاتورة ({sale.items.length})</h2>
                <button
                    onClick={deleteAll}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-medium transition-colors"
                >
                    <XCircle size={14} /> مسح الكل
                </button>
            </div>

            {error && (
                <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                    <div className="text-xs font-bold leading-relaxed">{error}</div>
                </div>
            )}

            {success && (
                <div className="mx-4 mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                    <div className="text-xs font-bold leading-relaxed">تمت العملية بنجاح</div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
                {renderedItems}
            </div>

            <div className="p-4 bg-gray-50 border-t">
                <p className="text-xs font-bold text-gray-600 mb-2 font-arabic">طريقة الدفع:</p>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        disabled={loading}
                        onClick={() => handlePaymentMethod('cash')}
                        className={`flex items-center justify-center gap-2 py-2 rounded-md border-2 transition-all ${sale.paymentMethod === 'cash' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                    >
                        <Banknote size={18} />
                        <span className="text-sm font-bold">كاش</span>
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => handlePaymentMethod('card')}
                        className={`flex items-center justify-center gap-2 py-2 rounded-md border-2 transition-all ${sale.paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                    >
                        <CreditCard size={18} />
                        <span className="text-sm font-bold">شبكة</span>
                    </button>
                </div>
            </div>

            <div className="p-4 bg-gray-900 text-white">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-sm">الإجمالي</span>
                    <span className="text-2xl font-black text-green-400">
                        {sale?.total?.toFixed(2) || 0} ر.س
                    </span>
                </div>

                <button
                    disabled={loading}
                    onClick={createSale}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-lg transition-all active:scale-[0.98] shadow-lg ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 shadow-green-900/20'}`}
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>جاري الحفظ...</span>
                        </>
                    ) : "إنهاء العملية"}
                </button>
            </div>
        </div>
    );
};

export default React.memo(SaleComponent);