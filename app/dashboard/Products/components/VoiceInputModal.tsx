'use client';

import React, { useRef } from 'react';
import { Mic, MicOff, RotateCcw, Wand2 } from 'lucide-react';

interface Props {
    voiceState: any;
}

const VoiceInputModal = ({ voiceState }: Props) => {
    const {
        voiceText,
        setVoiceText,
        isListening,
        toggleListening,
        resetVoice,
        extractProductFields
    } = voiceState;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        // أزلنا bg-black ليتناسق مع تصميم المودال الأبيض، وجعلنا الـ padding مرن
        <div className="flex items-center justify-center p-0 lg:p-4 w-full">
            <div
                className="w-full max-w-3xl p-2 sm:p-4 lg:p-8"
                dir="rtl"
            >
                {/* العنوان - تم تصغير الفراغات والنصوص في الموبايل */}
                <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-6">
                    <div className="p-2 lg:p-3 bg-blue-600 rounded-xl lg:rounded-2xl text-white shrink-0">
                        <Wand2 className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>

                    <div>
                        <h3 className="text-base lg:text-2xl font-black text-gray-800 leading-tight">
                            الإدخل الصوتي
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-500">
                            تحدث أو اكتب البيانات ليتم تحليلها
                        </p>
                    </div>
                </div>

                {/* حقل النص - تم تعديل الارتفاع ليصبح ديناميكياً وصغيراً في الموبايل (h-28) */}
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={voiceText}
                        onChange={(e) => {
                            setVoiceText(e.target.value);
                            extractProductFields(e.target.value);
                        }}
                        className="w-full h-28 lg:h-80 p-3 lg:p-6 bg-gray-50 rounded-2xl lg:rounded-3xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none text-sm lg:text-lg resize-none"
                        placeholder="اسم بيبسي سعر 1.5 تكلفة 1 مخزون 20 باركود 10002"
                    />

                    {isListening && (
                        <div className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6 flex items-center gap-1 bg-white/80 backdrop-blur-sm p-1 rounded-full px-2 shadow-sm">
                            <span className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" />
                            <span className="w-1 h-5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    )}
                </div>

                {/* الأزرار - أصبحت أقل طولاً في الموبايل لتوفير مساحة */}
                <div className="grid grid-cols-2 gap-3 mt-3 lg:mt-6">
                    <button
                        onClick={toggleListening}
                        className={`flex items-center justify-center gap-2 py-2.5 lg:py-4 rounded-xl lg:rounded-2xl text-sm lg:text-base font-black transition-all shadow-sm
                        ${
                            isListening
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {isListening ? (
                            <>
                                <MicOff className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span>إيقاف</span>
                            </>
                        ) : (
                            <>
                                <Mic className="w-4 h-4 lg:w-5 lg:h-5" />
                                <span>بدء التسجيل</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={resetVoice}
                        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 lg:py-4 rounded-xl lg:rounded-2xl text-sm lg:text-base font-bold hover:bg-gray-200 shadow-sm"
                    >
                        <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>إعادة تعيين</span>
                    </button>
                </div>

                {/* قسم التعليمات - مدمج ومناسب جداً للموبايل ويوفر مساحة رأسية ضخمة */}
                <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 mt-3 lg:mt-4 text-xs lg:text-sm">
                    <h4 className="font-bold text-blue-800 mb-1">
                        الكلمات المفتاحية المساعدة:
                    </h4>
                    
                    {/* في الموبايل تظهر الكلمات بجانب بعضها لتوفر السكرول، وفي الشاشات الكبيرة تظهر كقائمة */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-blue-700 font-medium lg:hidden">
                        <span>• اسم</span>
                        <span>• سعر</span>
                        <span>• تكلفة</span>
                        <span>• مخزون</span>
                        <span>• باركود</span>
                                                <span>• تصنيف</span>

                    </div>

                    {/* القائمة العادية تظهر فقط في الشاشات الكبيرة */}
                    <ul className="hidden lg:block text-blue-700 space-y-1 mt-1">
                        <li>• استخدم كلمة <strong>اسم</strong> ثم اسم المنتج.</li>
                        <li>• استخدم كلمة <strong>سعر</strong> ثم سعر البيع.</li>
                        <li>• استخدم كلمة <strong>تكلفة</strong> ثم سعر الشراء.</li>
                        <li>• استخدم كلمة <strong>مخزون</strong> ثم الكمية المتوفرة.</li>
                        <li>• استخدم كلمة <strong>باركود</strong> ثم رقم الباركود.</li>
                        <li>• استخدم كلمة <strong>تصنيف</strong> ثم تصنيف المنتج.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VoiceInputModal;