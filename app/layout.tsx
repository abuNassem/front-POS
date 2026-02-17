import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import QueryProvider from "./queryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS POS System",
  description: "Professional Cloud-based Point of Sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
