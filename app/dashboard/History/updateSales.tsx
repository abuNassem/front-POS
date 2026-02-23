'use client'
import { useState } from "react";
import { Sale, SaleItem } from "@/types/sale";
import { X, Save, Edit3, Trash2, Hash, Banknote, CreditCard } from "lucide-react";
import { updateSale } from "@/services/sales";

interface EditSaleDrawerProps {
    sale: Sale;
}

const EditSaleDrawer = ({ sale }: EditSaleDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<Sale>({ ...sale });
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setFormData({ ...sale });
        setIsOpen(true);
    };

    // تحديث العناصر وحساب الإجمالي
    const handleItemChange = (index: number, field: keyof SaleItem, value: any) => {
        const updatedItems = [...formData.items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };

        const newTotal = updatedItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
        setFormData({ ...formData, items: updatedItems, total: newTotal });
    };

    // حذف عنصر من الفاتورة
    const removeItem = (index: number) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        const newTotal = updatedItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
        setFormData({ ...formData, items: updatedItems, total: newTotal });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // استخراج البيانات النظيفة فقط (بدون التواريخ والمعرفات التلقائية)
            const cleanData = {
                items: formData.items.map(({ idProduct, name, quantity, price }) => ({
                    idProduct, name, quantity, price
                })),
                total: formData.total,
                paymentMethod: formData.paymentMethod
            };

            await updateSale(sale._id as string, cleanData);
            setIsOpen(false);
            window.location.reload(); // لتحديث الجدول بالبيانات الجديدة
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={handleOpen} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1">
                <Edit3 size={18} />
                <span className="text-xs font-bold">تعديل الفاتورة</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                <Edit3 size={20} className="text-blue-600" /> تعديل الفاتورة
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                            {/* طريقة الدفع */}
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

                            {/* قائمة المنتجات */}
                            {formData.items.map((item, index) => (
                                <div key={index} className="p-4 border rounded-xl bg-gray-50/50 relative group">
                                    <button
                                        onClick={() => removeItem(index)}
                                        className="absolute -top-2 -left-2 bg-red-100 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>

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
                                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
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
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t bg-white">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <span className="text-gray-500 text-sm font-bold">الإجمالي المحدث</span>
                                <span className="text-2xl font-black text-blue-600">{formData.total} ر.س</span>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all">إلغاء</button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading || formData.items.length === 0}
                                    className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:bg-gray-300 transition-all"
                                >
                                    {loading ? "جاري الحفظ..." : <><Save size={18} /> حفظ التعديلات</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditSaleDrawer;