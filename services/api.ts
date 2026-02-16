import { Product, Sale, DashboardStats } from '@/types';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    { id: '1', name: 'Wireless Mouse', price: 25.00, barcode: '123456789', stock: 50, category: 'Electronics' },
    { id: '2', name: 'Mechanical Keyboard', price: 120.00, barcode: '987654321', stock: 20, category: 'Electronics' },
    { id: '3', name: 'USB-C Cable', price: 15.00, barcode: '456123789', stock: 100, category: 'Accessories' },
    { id: '4', name: 'Monitor 24"', price: 180.00, barcode: '321654987', stock: 5, category: 'Electronics' },
    { id: '5', name: 'Laptop Stand', price: 45.00, barcode: '789123456', stock: 15, category: 'Accessories' },
];

const MOCK_SALES: Sale[] = [];

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    products: {
        getAll: async (): Promise<Product[]> => {
            await delay(500);
            return [...MOCK_PRODUCTS];
        },
        getByBarcode: async (barcode: string): Promise<Product | undefined> => {
            await delay(300);
            return MOCK_PRODUCTS.find(p => p.barcode === barcode);
        },
        create: async (product: Omit<Product, 'id'>): Promise<Product> => {
            await delay(500);
            const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
            MOCK_PRODUCTS.push(newProduct);
            return newProduct;
        },
        update: async (id: string, updates: Partial<Product>): Promise<Product> => {
            await delay(500);
            const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
            if (index === -1) throw new Error('Product not found');
            MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...updates };
            return MOCK_PRODUCTS[index];
        },
        delete: async (id: string): Promise<void> => {
            await delay(500);
            const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
            if (index !== -1) MOCK_PRODUCTS.splice(index, 1);
        }
    },
    sales: {
        create: async (items: Product[], total: number, paymentMethod: 'cash' | 'card'): Promise<Sale> => {
            await delay(800);
            const newSale: Sale = {
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString(),
                items: items.map(i => ({ ...i, quantity: 1 })), // Simplified for mock
                total,
                paymentMethod
            };
            MOCK_SALES.push(newSale);
            return newSale;
        },
        getHistory: async (): Promise<Sale[]> => {
            await delay(500);
            return [...MOCK_SALES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
    },
    stats: {
        getOverview: async (): Promise<DashboardStats> => {
            await delay(600);
            return {
                totalSales: MOCK_SALES.length,
                totalRevenue: MOCK_SALES.reduce((sum, sale) => sum + sale.total, 0),
                topSellingProducts: MOCK_PRODUCTS.slice(0, 3), // Mock
                lowStockProducts: MOCK_PRODUCTS.filter(p => p.stock < 10)
            };
        }
    }
};
