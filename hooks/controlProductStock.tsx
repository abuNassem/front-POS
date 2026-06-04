// utils/stockValidator.ts
import { ProductSummary, Product } from "@/types/product";

export const isStockExceeded = (requestedQty: number, productData?: ProductSummary): boolean => {
    if (!productData) return false;

    const stock = Number(productData.stock);
    return requestedQty >= stock;
};