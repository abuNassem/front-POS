'use client'

import React from 'react';
import dynamic from 'next/dynamic';

// استيراد المكونات الأساسية

import Header from "@/components/marketing/Header";
import HeroSection from "@/components/marketing/HeroSection";

// استيراد المكونات الثانوية ديناميكياً لتحسين سرعة تحميل الصفحة الأولى (LCP)
const PricingTable = dynamic(() => import("@/components/marketing/PricingTable"), { 
  loading: () => <div className="h-96 animate-pulse bg-gray-50" /> 
});
const ContactSection = dynamic(() => import("@/components/marketing/ContactSection"), { 
  ssr: false 
});

// مكون الفوتر (ينصح بإضافته دائماً في الصفحات التسويقية)
// const Footer = dynamic(() => import("@/components/marketing/Footer"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-700">
      {/* الهيدر ثابت في الأعلى أو شفاف حسب التصميم */}
      <Header />

      <main className="flex-grow">
        {/* قسم البطاقة التعريفية - الجزء الأهم لجذب العميل */}
        <section id="hero" className="relative overflow-hidden">
           <HeroSection />
        </section>

        {/* قسم الباقات والأسعار - مفصول بظل خفيف للفصل البصري */}
        <section id="pricing" className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">خطط تناسب حجم أعمالك</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">ابدأ مجاناً وقم بالترقية مع توسع نشاطك التجاري. لا توجد رسوم خفية.</p>
          </div>
          <PricingTable />
        </section>

        {/* قسم تواصل معنا */}
        <section id="contact" className="py-20">
          <ContactSection />
        </section>
      </main>

      {/* الفوتر لروابط التنقل وحقوق النشر */}
      {/* <Footer /> */}
    </div>
  );
}