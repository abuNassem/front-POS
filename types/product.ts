export interface Product {
    _id?: string;
    name: string;
    barcode?: number;
    price: number;        // تم التغيير من string إلى number
    costPrice: number;    // تم التغيير من string إلى number
    stock: number;        // تم التغيير من string إلى number
    
    // الخواص التي كانت ناقصة بناءً على السكيما:
    totalSales?: number;  // إجمالي المبيعات، افتراضياً 0
    image?: string | null; // رابط الصورة
    category?: string;    // الفئة
    isSync?:boolean
    isActive?:boolean
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
export interface CartItem extends Product {
    quantity: number;
}


export interface Populated {

    _id: string, name: string, price: number, stock: number,barcode:number
}



export interface extraInfoProduct {
  name: string;
  category: string;
  unit: string;
  unitPrice: string;
  price: number;
  stock: number;
  costPrice: number;
  barcode: string | null;
  image: string | null;
  totalSales: number;
}