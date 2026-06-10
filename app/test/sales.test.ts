import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSales, deleteSale, updateSale } from '../../services/sales';
import apiClient from '../../services/index';
import { Sale } from '../../types/sale';

interface ApiErrorResponse {
    response: { status: number; data: { message: string } };
}

vi.mock('../../services/index', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        delete: vi.fn(),
        put: vi.fn(),
    },
}));

describe('Sales Integration Logic (Frontend-to-Backend)', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('يجب أن ينشئ عملية بيع بنجاح ويرجع كود 201', async () => {
        const validSale: Sale = {
            items: [{ idProduct: 'p1', quantity: 2, price: 50, name: 'Product 1' }],
            paymentMethod: 'cash',
            total: 100
        };

        vi.mocked(apiClient.post).mockResolvedValue({ status: 201, data: { ...validSale, _id: 'sale123' } });

        const result = await createSales(validSale);

        expect(apiClient.post).toHaveBeenCalledWith('/sales', validSale);
        expect(result._id).toBe('sale123');
    });

    it('يجب أن يرمي خطأ عندما يكون المخزون غير كافٍ (Error 400)', async () => {
        const outOfStockItem: Sale = {
            items: [{ idProduct: 'p1', quantity: 1000, price: 50, name: 'Product 1' }],
            paymentMethod: 'cash',
            total: 50000
        };

        const serverError = {
            response: {
                status: 400,
                data: { message: 'مخزون غير كافٍ للمنتج: Product 1. المتوفر: 5' }
            }
        };

        vi.mocked(apiClient.post).mockRejectedValue(serverError);

        try {
            await createSales(outOfStockItem);
        } catch (error) {
            const err = error as ApiErrorResponse;
            expect(err.response.status).toBe(400);
            expect(err.response.data.message).toContain('مخزون غير كافٍ');
        }
    });

    it('يجب أن يرمي خطأ 404 إذا كان المنتج غير موجود في قاعدة البيانات', async () => {
        vi.mocked(apiClient.post).mockRejectedValue({
            response: { status: 404, data: { message: 'المنتج غير موجود' } }
        });

        await expect(createSales({ items: [{ idProduct: 'invalid' }] } as unknown as Sale))
            .rejects.toMatchObject({ response: { status: 404 } });
    });
});

it('يجب أن يحذف عملية بيع ويرجع رسالة نجاح', async () => {
    const saleId = '65d1f2a3e4b0a12345678901';

    vi.mocked(apiClient.delete).mockResolvedValue({
        data: { message: 'Sale removed' }
    });

    const result = await deleteSale(saleId);

    expect(apiClient.delete).toHaveBeenCalledWith(`/sales/${saleId}`);
    expect(result.message).toBe('Sale removed');
});

it('يجب أن يرسل البيانات المحدثة بشكل صحيح عند التعديل', async () => {
    const saleId = '123';
    const updatedData: Sale = {
        items: [{ idProduct: 'p1', quantity: 5, price: 50, name: 'Updated Product' }],
        paymentMethod: 'card',
        total: 250
    };

    vi.mocked(apiClient.put).mockResolvedValue({
        data: { message: 'Sale updated' }
    });

    const result = await updateSale(saleId, updatedData);

    expect(apiClient.put).toHaveBeenCalledWith(`/sales/${saleId}`, updatedData);
    expect(result.message).toBe('Sale updated');
});

it('يجب أن يرمي خطأ 404 عند محاولة حذف فاتورة غير موجودة', async () => {
    vi.mocked(apiClient.delete).mockRejectedValue({
        response: { status: 404, data: { message: 'Sale not found' } }
    });

    try {
        await deleteSale('invalid-id');
    } catch (error) {
        const err = error as ApiErrorResponse;
        expect(err.response.status).toBe(404);
        expect(err.response.data.message).toBe('Sale not found');
    }
});