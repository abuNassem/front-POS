import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientProduct from "./components/clientProduct";

export const metadata = {
    title: "إدارة المنتجات | لوحة التحكم",
    description: "عرض وإدارة قائمة المنتجات، الأسعار، والمخزون بشكل مباشر.",
};

const ProductsPage = () => {
    return (
        <DashboardLayout>
                 <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
                <ClientProduct />

        </DashboardLayout>
    );
};

export default ProductsPage;