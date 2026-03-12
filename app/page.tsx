'use client'
import Header from "@/components/marketing/Header";
import HeroSection from "@/components/marketing/HeroSection";
import PricingTable from "@/components/marketing/PricingTable";
import ContactSection from "@/components/marketing/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <HeroSection />
      <PricingTable />
      <ContactSection />
    </main>
  );
}
