export interface SaleItem {
    idProduct: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Sale {
    _id?: string;
    items: SaleItem[];
    total: number;
    paymentMethod: 'cash' | 'card';
    createdAt?: Date;
    updatedAt?: Date;
}