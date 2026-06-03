import type { Metadata, Viewport } from "next";
import { Inter, Tajawal } from "next/font/google"; 
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import QueryProvider from "./queryProvider";
import ContextProvider from "@/context";
import NotificationBar from "./NotificationBar";
import { ApiInterceptorBridge } from "@/services/ApiInterceptorBridge";
import './globals.css';

// الخط الأساسي للنصوص الإنجليزية
const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter' 
});

// خط "تجول" لإعطاء مظهر احترافي للنصوص العربية
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: '--font-tajawal'
});

export const metadata: Metadata = {
  title: "نظام كاشير ذكي | SaaS POS System",
  description: "نظام إدارة مبيعات سحابي احترافي يدعم الذكاء الاصطناعي",
  manifest: "/manifest.json", // مهم إذا كنت تحول التطبيق لـ PWA
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // لمنع الزوم التلقائي في الآيفون عند الضغط على الحقول
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // استخدام lang="ar" و dir="rtl" لضبط اتجاه النظام بالكامل
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <QueryProvider>
          <ThemeRegistry>
            <ContextProvider>
              {/* المكونات الخدمية (مخفية بصرياً لكنها تعمل في الخلفية) */}
              <ApiInterceptorBridge />
              {/* واجهة الإشعا>رات العلوية */}
              <NotificationBar />

              {/* المحتوى الأساسي للتطبيق */}
              <main className="min-h-screen">
                {children}
              </main>

            </ContextProvider>
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}