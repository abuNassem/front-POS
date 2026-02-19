'use client';

import { addProduct, updateProduct } from '@/services/product';
import { Product } from '@/types/product';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface ProductDrawerProps {
    product?: Product | null;
    lable: string;
}

const ProductDrawer = ({ product, lable }: ProductDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // الحالة الابتدائية: الحقول الرقمية تبدأ كنصوص أو أرقام وستعامل كنصوص في الإدخال
    const [productForm, setProductForm] = useState<Product>({
        name: product?.name ?? "",
        price: product?.price ?? "",
        costPrice: product?.costPrice ?? "",
        barcode: product?.barcode ?? "",
        stock: product?.stock ?? "",
        category: product?.category ?? "",
        description: product?.description ?? ""
    });
    const queryClient = useQueryClient()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductForm((prev: any) => ({
            ...prev,
            [name]: value, // مرونة كاملة في الإدخال كـ string
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // عملية "التنظيف" والتحويل قبل الإرسال للسيرفر


        try {
            if (product?._id) {
                console.log("جاري التعديل:", productForm);
                await updateProduct({ ...productForm, _id: product._id });
            } else {
                console.log("جاري الإضافة:", productForm);
                await addProduct(productForm);
            }
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["products"] })
            // اختياري: يمكنك عمل window.location.reload() هنا لتحديث القائمة
        } catch (error) {
            console.error("خطأ في الطلب:", error);
            alert("فشلت العملية، تأكد من صحة البيانات المرسلة");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-md"
            >
                {lable}
            </button>

            {isOpen && (
                <div className="fixed w-full h-full flex items-center justify-center p-4 inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
                    <div onClick={(t) => t.stopPropagation()} className="h-full w-full md:w-[600px] max-h-[90vh] my-5 bg-white shadow-2xl flex flex-col rounded-xl overflow-hidden">
                        <div className="p-6 h-full flex flex-col">

                            <div className="flex justify-between items-center border-b pb-4 mb-6">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
                            </div>

                            <form onSubmit={onSubmit} className="flex-grow overflow-y-auto space-y-4 pr-2 text-right" dir="rtl">
                                {/* اسم المنتج */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
                                    <input
                                        type="text"
                                        value={productForm.name}
                                        name="name"
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* صف الأسعار - نوع الحقل text للمرونة */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">سعر البيع</label>
                                        <input
                                            type="text"
                                            value={productForm.price}
                                            name="price"
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="mt-1 block w-full border rounded-md p-2 shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">سعر التكلفة</label>
                                        <input
                                            type="text"
                                            value={productForm.costPrice}
                                            name="costPrice"
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="mt-1 block w-full border rounded-md p-2 shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* المخزون والباركود */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الكمية في المخزن</label>
                                        <input
                                            type="text"
                                            value={productForm.stock}
                                            name="stock"
                                            onChange={handleChange}
                                            className="mt-1 block w-full border rounded-md p-2 shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الباركود</label>
                                        <input
                                            type="text"
                                            value={productForm.barcode}
                                            name="barcode"
                                            onChange={handleChange}
                                            className="mt-1 block w-full border rounded-md p-2 shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* الفئة */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">الفئة</label>
                                    <input
                                        type="text"
                                        value={productForm.category}
                                        name="category"
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md p-2 shadow-sm"
                                    />
                                </div>

                                {/* الوصف */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">الوصف</label>
                                    <textarea
                                        value={productForm.description}
                                        name="description"
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full border rounded-md p-2 shadow-sm"
                                    />
                                </div>

                                <div className="pt-6 border-t mt-auto">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
                                    >
                                        {product ? 'تحديث المنتج' : 'حفظ المنتج الجديد'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDrawer;