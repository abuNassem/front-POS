export interface Product {
    _id?: string;
    name: string;
    barcode?: number;
<<<<<<< HEAD
    price: number;        // تم التغيير من string إلى number
    costPrice: number;    // تم التغيير من string إلى number
    stock: number;        // تم التغيير من string إلى number
    
    // الخواص التي كانت ناقصة بناءً على السكيما:
    totalSales?: number;  // إجمالي المبيعات، افتراضياً 0
    image?: string | null; // رابط الصورة
    category?: string;    // الفئة
    isSync?:boolean
    isActive?:boolean
=======
    price: number;
    costPrice: number;
    stock: number;
    totalSales?: number;
    image?: string | null;
    category?: string;
    isActive?: boolean;
    isSync?: boolean;
>>>>>>> prof
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface CartItem extends Product {
    quantity: number;
}

<<<<<<< HEAD

export interface Populated {

    _id: string, name: string, price: number, stock: number,barcode:number
=======
export interface ProductSummary {
    _id: string;
    name: string;
    price: number;
    stock: number;
    barcode: number;
>>>>>>> prof
}

export interface ProductListResponse {
    data: Product[];
    hasMore: boolean;
}
