'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import {
    Package,
    Tag,
    Barcode,
    Layers,
    CircleDollarSign,
    Wallet,
    ImagePlus,
    X
} from 'lucide-react';

interface Props {
    formData: Product;
    setFormData:React.Dispatch<React.SetStateAction<Product>>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductFormFields = ({ formData, setFormData, onFileChange }: Props) => {
   const updateField = useCallback(
  (
    field: keyof Product,
    value: Product[keyof Product]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  },
  [setFormData]
);

    const handleUploadClick = () => {
        document.getElementById('image-upload')?.click();
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        updateField('image', null);
    };

    return (
        <div className="space-y-6 text-right" dir="rtl">

            <div className="flex flex-col gap-3">
                <label className="text-sm font-black text-gray-700 flex items-center gap-2">
                    <ImagePlus size={18} className="text-blue-500" />
                    صورة المنتج
                </label>

                <div
                    onClick={handleUploadClick}
                    className="relative group border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all rounded-2xl p-6 cursor-pointer flex flex-col items-center justify-center gap-3"
                >
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="hidden"
                    />

                    {formData.image ? (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md border-4 border-white">
                            <Image src={formData.image} fill className="object-cover" alt="Preview" />
                            <button
                                onClick={removeImage}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-100 transition-all">
                                <ImagePlus size={32} />
                            </div>
                            <p className="text-xs font-medium text-gray-500">اضغط لرفع صورة أو اسحبها هنا</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Package size={16} className="text-blue-500" />
                        اسم المنتج
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="مثال: آيفون 15 برو"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Tag size={16} className="text-blue-500" />
                        التصنيف
                    </label>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => updateField('category', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="مثال: إلكترونيات"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Barcode size={16} className="text-blue-500" />
                        الباركود
                    </label>
                    <input
                        type="number"
                        value={formData.barcode}
                        onChange={(e) => updateField('barcode', Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="00000000"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Layers size={16} className="text-blue-500" />
                        الكمية
                    </label>
                    <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => updateField('stock', Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-blue-800 flex items-center gap-2">
                        <CircleDollarSign size={16} />
                        سعر البيع
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => updateField('price', Number(e.target.value))}
                            className="w-full border border-blue-200 p-3.5 rounded-xl text-blue-700 font-black outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            placeholder="0.00"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-xs font-bold">د.أ</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                        <Wallet size={16} />
                        سعر التكلفة
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={String(formData.costPrice) }
                            onChange={(e) => updateField('costPrice', Number(e.target.value))}
                            className="w-full border border-gray-200 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            placeholder="0.00"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">د.أ</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductFormFields);