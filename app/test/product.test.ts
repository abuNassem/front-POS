import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { getProduct, addProduct, updateProduct, deleteProduct } from '../../services/product'
import { Product } from '@/types/product'

const server = setupServer(
  http.get('*/product', () => {
    return HttpResponse.json({
      data: [{ _id: '1', name: 'Product 1', price: 10, costPrice: 5, stock: 3 }],
      hasMore: false,
    })
  }),
  http.post('*/product', async ({ request }) => {
    const newProduct = await request.json()
    return HttpResponse.json(newProduct, { status: 201 })
  }),
  http.put('*/product/:id', async ({ request }) => {
    const updatedProduct = await request.json()
    return HttpResponse.json(updatedProduct)
  }),
  http.delete('*/product/:id', () => {
    return new HttpResponse(null, { status: 200 })
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Product Service', () => {

  it('يجب أن يجلب قائمة المنتجات بنجاح', async () => {
    const response = await getProduct(1, 'all')
    expect(response.data).toBeInstanceOf(Array)
    expect(response.data[0].name).toBe('Product 1')
    expect(response.hasMore).toBe(false)
  })

  it('يجب أن يضيف منتجاً جديداً', async () => {
    const mockProduct: Product = { _id: '2', name: 'New Product', price: 100, costPrice: 50, stock: 1 }
    const response = await addProduct(mockProduct)
    expect(response.status).toBe(201)
    expect(response.data.name).toBe('New Product')
  })

  it('يجب أن يحدّث بيانات المنتج', async () => {
    const updatedData: Product = { _id: '1', name: 'Updated Name', price: 100, costPrice: 50, stock: 1 }
    const response = await updateProduct(updatedData)
    expect(response.status).toBe(200)
    expect(response.data.name).toBe('Updated Name')
  })

  it('يجب أن يحذف المنتج عن طريق الـ ID', async () => {
    const response = await deleteProduct('1')
    expect(response.status).toBe(200)
  })
})
