import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientProduct from "./clientProduct";

const ProductsPage = () => {
    return (
        <DashboardLayout>
            <h1>Products</h1>
            <ClientProduct />
        </DashboardLayout>
    );
};
export default ProductsPage;