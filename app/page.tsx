import type { Metadata } from 'next';
import Link from 'next/link';
import Header from "@/components/marketing/Header";
import HeroSection from "@/components/marketing/HeroSection";
import PricingTable from "@/components/marketing/PricingTable";
import ContactSection from "@/components/marketing/ContactSection";
import { siteUrl, siteName, defaultDescription } from "./seo";

export const metadata: Metadata = {
  title: {
    absolute: 'نظام نقاط بيع سحابي لإدارة المبيعات والمخزون | نظام كاشير ذكي',
  },
  description:
    'نظام كاشير ونقاط بيع سحابي لإدارة المبيعات والمخزون والفواتير مع تحليلات فورية ودعم الباركود. ابدأ مجاناً وطوّر متجرك من أي مكان وبكل سهولة.',
  alternates: { canonical: '/' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteName,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: defaultDescription,
  url: siteUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '120',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 selection:text-blue-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <main className="flex-grow">
        <section id="hero" className="relative overflow-hidden">
          <HeroSection />
        </section>

        <section id="pricing" className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4 text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">خطط تناسب حجم أعمالك</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">ابدأ مجاناً وقم بالترقية مع توسع نشاطك التجاري. لا توجد رسوم خفية.</p>
          </div>
          <PricingTable />
        </section>

        <section id="contact" className="py-20">
          <ContactSection />
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-10" dir="rtl">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm">© {new Date().getFullYear()} {siteName}. جميع الحقوق محفوظة.</p>
          <nav aria-label="روابط التذييل" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/#pricing" className="hover:text-white transition-colors">الأسعار</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">تواصل معنا</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">تسجيل الدخول</Link>
            <Link href="/auth/register" className="hover:text-white transition-colors">إنشاء حساب</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
