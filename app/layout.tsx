import type { Metadata, Viewport } from "next";
import { Inter, Tajawal } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import QueryProvider from "./queryProvider";
import ContextProvider from "@/context";
import NotificationBar from "./NotificationBar";
import { ApiInterceptorBridge } from "@/services/ApiInterceptorBridge";
import { siteUrl, siteName, defaultDescription, siteKeywords } from "./seo";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: '--font-tajawal'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | نظام نقاط بيع سحابي`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    siteName,
    title: `${siteName} | نظام نقاط بيع سحابي`,
    description: defaultDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | نظام نقاط بيع سحابي`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <QueryProvider>
          <ThemeRegistry>
            <ContextProvider>
              <ApiInterceptorBridge />
              <NotificationBar />
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
