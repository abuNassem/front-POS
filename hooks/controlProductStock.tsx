// utils/stockValidator.ts
import { Populated, Product } from "@/types/product";

export const isStockExceeded = (requestedQty: number, productData?: Populated): boolean => {
    if (!productData) return false;

    const stock = Number(productData.stock);
    return requestedQty >= stock;
};