import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StoreOverview from "./components/overviewClient";


export const metadata = {
    title: "لوحة التحكم | الإحصائيات العامة",
    description: "عرض ملخص الأداء والإحصائيات الحيوية للنظام عبر لوحة التحكم الرئيسية.",
    robots: "noindex, nofollow"
};

export default function page() {
    return (
    
        
        <DashboardLayout>
         

<main>
  <StoreOverview />
</main>
                
        </DashboardLayout>
    );
}