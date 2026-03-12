'use client'
import ProductCard from "@/components/dashboard/productCard";
import { getPopulated } from "@/services/product";
import { Populated } from "@/types/product";
import { SaleItem } from "@/types/sale";
import { useQuery } from "@tanstack/react-query";

const FamausProduct = ({ addItems, sale }: { addItems: (product: Populated) => void, sale: SaleItem[] }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["Populated"],
        queryFn: () => getPopulated(),
    });


    if (isLoading) return <div className="p-4 text-center animate-pulse">جاري التحميل...</div>;
    if (error) return <div className="p-4 text-red-500 text-sm">خطأ في التحميل</div>;

    return (
        <div className="p-2 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-bold mb-3 text-gray-800 border-b pb-2">الأكثر طلباً</h2>

            {/* شبكة المنتجات - مرنة لتناسب واجهات الكاشير */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data?.length && data.map((product: Populated) => (
                    <ProductCard
                        key={product._id}
                        sale={sale}
                        product={product}
                        onAdd={addItems}
                    />
                ))}
            </div>
        </div>
    );
};

export default FamausProduct;

