import type { Metadata } from "next";
import ClientNew from "./clientNew";

export const metadata: Metadata = {
  title: "إضافة منتج جديد | نظام الكاشير الذكي",
  description: "قم بإضافة منتجاتك بسرعة وسهولة إلى المخزون باستخدام الإدخال التقليدي أو المساعد الصوتي الذكي.",
  keywords: ["كاشير", "إضافة منتج", "إدارة المخزون", "مساعد صوتی", "نظام POS"],
  authors: [{ name: "Smart POS System" }],
  openGraph: {
    title: "إضافة منتج جديد | نظام الكاشير الذكي",
    description: "أضف منتجاتك عبر الصوت أو الكتابة في ثوانٍ معدودة.",
    type: "website",
    locale: "ar_AR",
  },
};

const Page = () => {
  return (
    <>
      <h1 className="sr-only">إضافة منتج جديد إلى نظام الكاشير</h1>
      <ClientNew />
    </>
  );
};

export default Page;