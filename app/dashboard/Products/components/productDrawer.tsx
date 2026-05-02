'use client';

import React, { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useQueryClient } from '@tanstack/react-query';
import { addProduct, updateProduct } from '@/services/product';
import { UploadMedia } from '@/services/uploadImage';
import { Product } from '@/types/product';
import { useProductVoice } from '../hooks/useProductVoice';
import ProductFormFields from './ProductFormFields';

// استيراد المودال صوتي ديناميكياً لتقليل حجم الحزمة الابتدائية
const VoiceInputModal = dynamic(() => import('./VoiceInputModal'), { ssr: false });

const INITIAL_FORM_STATE: Product = {
    name: "",
    barcode: 0,
    price: 0,
    costPrice: 0,
    stock: 0,
    category: "",
    image: null
};

const ProductDrawer = ({ product, lable }: { product?: Product | null; lable: string }) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // تهيئة النموذج (Form)
    const [productForm, setProductForm] = useState<Product>(product || INITIAL_FORM_STATE);

    const voiceState = useProductVoice(productForm);

    // التعامل مع إغلاق الـ Drawer وتصفير البيانات إذا كان إضافة جديد
    const toggleDrawer = useCallback((state: boolean) => {
        setIsOpen(state);
        if (!state && !product) {
            setProductForm(INITIAL_FORM_STATE);
            setSelectedFile(null);
        }
    }, [product]);

    const handleConfirmVoice = useCallback((data: Product) => {
        setProductForm(data);
        setIsVoiceModalOpen(false);
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setProductForm(prev => ({ ...prev, image: reader.result as string }));
            reader.readAsDataURL(file);
        }
    }, []);

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isUploading) return;

        setIsUploading(true);
        try {
            let finalImageUrl = productForm.image;

            // 1. رفع الصورة إلى السيرفر إذا وُجد ملف جديد
            if (selectedFile) {
                const uploadedUrl = await UploadMedia(selectedFile);
                if (!uploadedUrl) throw new Error("فشل رفع الصورة");
                finalImageUrl = uploadedUrl;
            }

            // 2. إعداد البيانات النهائية
            const finalProductData = { ...productForm, image: finalImageUrl };

            // 3. التنفيذ (إضافة أو تحديث)
            if (product?._id) {
                await updateProduct({ ...finalProductData, _id: product._id });
            } else {
                await addProduct(finalProductData);
            }

            // 4. نجاح العملية
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toggleDrawer(false);
        } catch (error) {
            console.error("Submission Error:", error);
            alert("حدث خطأ أثناء حفظ المنتج، يرجى المحاولة مرة أخرى.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <button 
                onClick={() => toggleDrawer(true)} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 font-bold"
            >
                {lable}
            </button>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" 
                    onClick={() => toggleDrawer(false)}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="w-full md:w-[750px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300"
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b bg-gray-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-gray-800">
                                    {product ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">أكمل البيانات أدناه لحفظ المنتج في المخزون</p>
                            </div>
                            <button 
                                onClick={() => setIsVoiceModalOpen(true)} 
                                className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                            >
                                <span>المساعد الصوتي</span>
                                <span className="text-lg">🎤</span>
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form id="product-form" onSubmit={handleFinalSubmit} className="space-y-8">
                                <ProductFormFields 
                                    formData={productForm} 
                                    setFormData={setProductForm} 
                                    onFileChange={handleFileChange} 
                                />
                            </form>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 border-t bg-gray-50 flex gap-4">
                            <button 
                                type="button"
                                onClick={() => toggleDrawer(false)}
                                className="flex-1 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all"
                            >
                                إلغاء
                            </button>
                            <button 
                                form="product-form"
                                type="submit" 
                                disabled={isUploading}
                                className={`flex-[2] py-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all 
                                    ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200'}`}
                            >
                                {isUploading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        جاري الحفظ...
                                    </span>
                                ) : "حفظ المنتج نهائياً"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isVoiceModalOpen && (
                <VoiceInputModal
                    isOpen={isVoiceModalOpen} 
                    onClose={() => setIsVoiceModalOpen(false)} 
                    onConfirm={handleConfirmVoice} 
                    voiceState={voiceState} 
                />
            )}
        </>
    );
};

export default React.memo(ProductDrawer);