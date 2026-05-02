import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientProduct from "./components/clientProduct";
import ProductContext from "./context";


export const metadata = {
    title: "إدارة المنتجات | لوحة التحكم",
    description: "عرض وإدارة قائمة المنتجات، الأسعار، والمخزون بشكل مباشر.",
};

const ProductsPage = () => {
    return (
        <DashboardLayout>
            <ProductContext>
                 <h1 className="text-2xl font-bold mb-6 text-gray-800">Products</h1>
                <ClientProduct />
            </ProductContext>
           
        </DashboardLayout>
    );
};

export default ProductsPage;