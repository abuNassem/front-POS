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
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
export interface CartItem extends Product {
    quantity: number;
}


export interface Populated {
<<<<<<< HEAD
    _id: string, name: string, price: number, stock: number
<<<<<<< HEAD
=======
    _id: string, name: string, price: number, stock: number,barcode:number
>>>>>>> dev
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
=======
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd
}