'use client'

import React, { useMemo, useCallback } from "react";
import { X, Save, Edit3, Trash2, Banknote, CreditCard } from "lucide-react";
import { useEditSale } from "@/hooks/editSale";
import ConfirmCard from "@/components/dashboard/confirmCard";
import { deleteSale } from "@/services/sales";
import { useQueryClient } from "@tanstack/react-query";
import { Sale } from "@/types/sale";

const EditSaleDrawer = ({ sale }: { sale: Sale }) => {
    const queryClient = useQueryClient();
    const {
        isOpen,
        formData,
        loading,
        setIsOpen,
        handleOpen,
        confirmDeleteSale,
        setConfirmDeleteSale,
        setFormData,
        handleClose,
        handleItemChange,
        handleMangStock,
        removeItem,
        handleSave
    } = useEditSale(sale);

    const confirmDelete = useCallback(() => {
        setConfirmDeleteSale(false);
        deleteSale(sale._id as string);
        queryClient.setQueriesData<Sale[]>({ queryKey: ['sales'] }, (ele) => {
            if (!ele) return [];
            return ele.filter(item => item._id !== sale._id);
        });
        setIsOpen(false);
    }, [sale._id, queryClient, setConfirmDeleteSale, setIsOpen]);

    const renderedItems = useMemo(() => {
        return formData.items.map((item, index) => (
            <div key={`${item.idProduct}-${index}`} className="p-4 border rounded-xl bg-gray-50/50 relative group">
                <ConfirmCard
                    message="هذا التغيير سوف يؤثر على المخزون"
                    onConfirm={() => removeItem(index, item.idProduct)}
                >
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                    </button>
                </ConfirmCard>

                <div className="space-y-3">
                    <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none focus:border-blue-500"
                        placeholder="اسم المنتج"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 block mb-1">الكمية</label>
                            <input
                                type="number"
                                value={item.quantity}
                                min={1}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    handleItemChange(index, 'quantity', val);
                                    handleMangStock(item.idProduct, val);
                                }}
                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 block mb-1">سعر الوحدة</label>
                            <input
                                type="number"
                                value={item.price}
                                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        ));
    }, [formData.items, handleItemChange, handleMangStock, removeItem]);

    return (
        <>
            <button onClick={handleOpen} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1">
                <Edit3 size={18} />
                <span className="text-xs font-bold">تعديل الفاتورة</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => handleClose()} />

                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <header className="p-4 border-b bg-gray-50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                <Edit3 size={20} className="text-blue-600" /> تعديل الفاتورة
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </header>

                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <button
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                                    className={`flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all ${formData.paymentMethod === 'cash' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-400'}`}
                                >
                                    <Banknote size={18} /> كاش
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                    className={`flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all ${formData.paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-400'}`}
                                >
                                    <CreditCard size={18} /> شبكة
                                </button>
                            </div>

                            <ConfirmCard
                                message="هذا التغيير سوف يحذف الفاتورة بالكامل"
                                open={confirmDeleteSale}
                                onConfirm={confirmDelete}
                                onCancel={() => setConfirmDeleteSale(false)}
                            />

                            <div className="space-y-4">
                                {renderedItems}
                            </div>
                        </div>

                        <footer className="p-4 border-t bg-white">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <span className="text-gray-500 text-sm font-bold">الإجمالي المحدث</span>
                                <span className="text-2xl font-black text-blue-600">{formData.total} ر.س</span>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all">إلغاء</button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:bg-gray-300 transition-all"
                                >
                                    {loading ? "جاري الحفظ..." : <><Save size={18} /> حفظ التعديلات</>}
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default React.memo(EditSaleDrawer);