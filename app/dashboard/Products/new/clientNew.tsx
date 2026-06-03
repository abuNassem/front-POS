'use client'
import { useState } from "react"
import ProductForm from "../components/productForm"
import VoiceInputModal from "../components/VoiceInputModal"
import { useProductForm } from "../hooks/rrrr/useProductForm"
import { useProductVoice } from "../hooks/useProductVoice"
import { Mic, MoveLeft, MoveRight } from "lucide-react"
import Link from "next/link"

const ClientNew = () => {
    const { formData, setFormData } = useProductForm()
    const productVoice = useProductVoice(formData, setFormData)
    
    const [isVoiceOpen, setIsVoiceOpen] = useState(false)

    return (
        <div className="bg-gray-50 min-h-screen pt-8 px-4 md:px-[100px] relative">
            
            {/* الحاوية الرئيسية */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. مكون الفورم */}
                <div className="lg:col-span-8 bg-white shadow-md rounded-xl p-6">
                     <div className=" flex justify-between">
                         <h2 className="text-xl font-bold mb-6  text-gray-800">إضافة منتج جديد</h2>
                    <Link
  href="/dashboard/Products" 
  prefetch={true} 
  className="inline-flex items-center justify-center gap-2 p-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 active:scale-95 shadow-sm"
  aria-label="العودة إلى المنتجات"
>
  <MoveRight className="w-5 h-5 rtl:rotate-180" /> 
</Link>

                     </div>
                   
                    <ProductForm formData={formData} setFormData={setFormData} />
                </div>

                {/* 2. مكون الصوت في الشاشات الكبيرة */}
                <div className="hidden lg:block lg:col-span-4 sticky top-8">
                    <div className="bg-white shadow-md rounded-xl p-6 border-2 border-blue-50">
                        <h3 className="font-semibold mb-4 text-blue-600 flex items-center gap-2">
                            <Mic size={18} /> المساعد الصوتي الذكي
                        </h3>
                        <VoiceInputModal voiceState={productVoice} />
                    </div>
                </div>
            </div>

            {/* 3. وضع الموبايل: زر عائم لتفعيل الصوت */}
            <button 
                onClick={() => setIsVoiceOpen(!isVoiceOpen)}
                className="lg:hidden fixed bottom-6 left-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 active:scale-90 transition-transform"
                aria-label="تفعيل الإدخال الصوتي"
            >
                <Mic size={28} />
            </button>

           

            <div className={`
                lg:hidden fixed bottom-0 inset-x-0 h-[50vh] z-[60] bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] 
                transition-transform duration-300 ease-out p-6 border-t
                ${isVoiceOpen ? 'translate-y-0' : 'translate-y-full'}
            `}>
                
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">تحدث لوصف المنتج</span>
                    <button onClick={() => setIsVoiceOpen(false)} className="text-gray-400 text-sm underline">إغلاق</button>
                </div>
                
                <div className="h-[calc(100%-40px)] overflow-y-auto">
                    <VoiceInputModal voiceState={productVoice} />
                </div>
            </div>

        </div>
    )
}

export default ClientNew;