'use client'
import { isStockExceeded } from "@/hooks/controlProductStock";
import { Populated } from "@/types/product";
import { SaleItem } from "@/types/sale";
import { Plus } from "lucide-react";

interface ProductCardProps {
    product: Populated;
    onAdd: (product: Populated) => void;
    sale: SaleItem[]
}

const ProductCard = ({ product, onAdd, sale }: ProductCardProps) => {
    const currentNum = sale.find(ele => ele.idProduct === product._id)?.quantity
    console.log( !isStockExceeded(currentNum as number, product)|| product.stock>0)
    return (
        <div className="flex w-[250px] h-[80px] flex-col justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs font-semibold text-gray-700 truncate mb-2" title={product.name}>
                {product.name}
            </h3>

            {isStockExceeded(currentNum as number, product)|| product.stock==0 && <span className="ml-2 text-red-500">out of stock</span>}

            {!isStockExceeded(currentNum as number, product)&& product.stock>0 && <button
                onClick={() => {
                    onAdd(product)
                }}
                className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-[10px] transition-colors"
            >
                <span className="font-bold">{product.price} ر.س</span>
                <Plus size={14} strokeWidth={3} />

            </button>}

        </div>
    );
};

export default ProductCard;