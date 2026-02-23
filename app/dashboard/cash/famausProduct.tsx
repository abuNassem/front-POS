'use client'
import { getProduct } from "@/services/product";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react"; // تأكد من تثبيت lucide-react للأيقونات

const FamausProduct = ({ addItems }: { addItems: (product: Product) => void }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProduct(),
    });

    if (isLoading) return <div className="p-4 text-center animate-pulse">جاري التحميل...</div>;
    if (error) return <div className="p-4 text-red-500 text-sm">خطأ في التحميل</div>;

    return (
        <div className="p-2 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-bold mb-3 text-gray-800 border-b pb-2">الأكثر طلباً</h2>

            {/* شبكة المنتجات - مرنة لتناسب واجهات الكاشير */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data?.data?.map((product: Product) => (
                    <div
                        key={product._id}
                        className="flex flex-col justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-xs font-semibold text-gray-700 truncate mb-2" title={product.name}>
                            {product.name}
                        </h3>

                        <button
                            onClick={() => addItems(product)}
                            className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-[10px] transition-colors"
                        >
                            <span className="font-bold">{product.price} ر.س</span>
                            <Plus size={14} strokeWidth={3} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FamausProduct;