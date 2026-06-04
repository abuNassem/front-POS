export interface Product {
    _id?: string;
    name: string;
    barcode?: number;
    price: number;
    costPrice: number;
    stock: number;
    totalSales?: number;
    image?: string | null;
    category?: string;
    isActive?: boolean;
    isSync?: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ProductSummary {
    _id: string;
    name: string;
    price: number;
    stock: number;
    barcode: number;
}

export interface ProductListResponse {
    data: Product[];
    hasMore: boolean;
}
