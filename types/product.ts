export interface Product {
    _id?: string;
    name: string;
    price: string;
    barcode: string;
    stock: string;
    costPrice: string
    category?: string;
    description?: string;
}

export interface CartItem extends Product {
    quantity: number;
}


export interface Populated {
    _id: string, name: string, price: number, stock: number
}