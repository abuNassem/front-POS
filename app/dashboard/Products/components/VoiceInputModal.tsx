'use client';

import React, { useEffect, useRef } from 'react';
import { Product } from '@/types/product';
import { Mic, MicOff, RotateCcw, CheckCircle2, Wand2, Info } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: Product) => void;
    voiceState: any;
}

const VoiceInputModal = ({ isOpen, onClose, onConfirm, voiceState }: Props) => {
    const { 
        voiceText, 
        setVoiceText, 
        isListening, 
        tempProduct, 
        toggleListening, 
        resetVoice, 
        parseText 
    } = voiceState;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // التركيز التلقائي عند الفتح
    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300" 
            onClick={onClose}
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[650px] animate-in zoom-in-95 duration-300" 
                dir="rtl"
            >
                
                {/* الجزء الأيمن: محرك المعالجة */}
                <div className="flex-[1.5] p-6 md:p-10 flex flex-col border-l border-gray-100 bg-white">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                            <Wand2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-800">المعالج الذكي</h3>
                            <p className="text-sm text-gray-500">أملِ البيانات صوتياً أو اكتبها وسنقوم بتحليلها</p>
                        </div>
                    </div>

                    <div className="relative flex-1 flex flex-col group">
                        <textarea 
                            ref={textareaRef}
                            value={voiceText}
                            onChange={(e) => { 
                                setVoiceText(e.target.value); 
                                parseText(e.target.value); 
                            }}
                            className="w-full flex-1 p-6 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none text-xl leading-relaxed text-gray-700 resize-none"
                            placeholder="مثال: إضافة آيفون 15 برو، سعره 1200 دينار، والمتوفر 5 حبات..."
                        />
                        
                        {/* مؤشر الصوت التفاعلي */}
                        {isListening && (
                            <div className="absolute bottom-6 left-6 flex items-center gap-1">
                                <span className="w-1.5 h-4 bg-blue-500 rounded-full animate-bounce" />
                                <span className="w-1.5 h-8 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button 
                            onClick={toggleListening} 
                            className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-black transition-all shadow-lg active:scale-95
                                ${isListening 
                                    ? 'bg-red-500 text-white shadow-red-200 hover:bg-red-600' 
                                    : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                                }`}
                        >
                            {isListening ? (
                                <><MicOff size={20} /> إيقاف التسجيل</>
                            ) : (
                                <><Mic size={20} /> ابدأ التحدث</>
                            )}
                        </button>
                        <button 
                            onClick={resetVoice} 
                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                        >
                            <RotateCcw size={18} /> إعادة تعيين
                        </button>
                    </div>
                </div>

                {/* الجزء الأيسر: المعاينة الحية */}
                <div className="w-full md:w-[400px] bg-gray-50/80 p-6 md:p-10 flex flex-col border-r border-gray-100">
                    <div className="mb-6 flex items-center gap-2 text-gray-400">
                        <Info size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">بطاقة المنتج المستخرجة</span>
                    </div>

                    <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 w-full border border-white relative overflow-hidden group">
                        {/* تأثير بصري للخلفية */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative z-10">
                            <div className="w-full h-44 bg-gray-50 rounded-[2rem] mb-5 flex items-center justify-center overflow-hidden border border-gray-100">
                                {tempProduct.image ? (
                                    <img src={tempProduct.image} className="object-cover w-full h-full transition-transform group-hover:scale-110" alt="Product" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-6xl filter grayscale">📦</span>
                                        <p className="text-[10px] text-gray-400 font-bold">لا توجد صورة</p>
                                    </div>
                                )}
                            </div>

                            <h5 className="font-black text-gray-800 text-xl mb-4 line-clamp-2 min-h-[3.5rem]">
                                {tempProduct.name || "اسم المنتج..."}
                            </h5>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                                    <div>
                                        <p className="text-[10px] text-blue-500 font-black uppercase mb-1">السعر التقديري</p>
                                        <p className="text-2xl font-black text-blue-700">
                                            {tempProduct.price || 0} 
                                            <span className="text-xs mr-1 font-bold">دينار</span>
                                        </p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] text-gray-400 font-black uppercase mb-1">المخزون</p>
                                        <p className="font-black text-gray-700 text-lg">
                                            {tempProduct.stock || 0} 
                                            <span className="text-xs mr-1">{tempProduct.unit || 'قطعة'}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <p className="text-[10px] text-gray-400 font-black uppercase">التصنيف المستنتج</p>
                                    <p className="text-sm font-bold text-gray-600">{tempProduct.category || "عام"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => onConfirm(tempProduct)} 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-[2rem] font-black mt-10 transition-all shadow-xl shadow-green-100 active:scale-95 flex items-center justify-center gap-3"
                    >
                        <CheckCircle2 size={24} />
                        تأكيد البيانات ونقلها
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoiceInputModal;