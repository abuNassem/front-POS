import { Product } from '@/types/product'
import ProductDrawer from '../components/productDrawer'
import { deleteProduct } from '@/services/product'

const ProductCard = ({ product, mangeMany, selectedIds, toggleSelect }: 
  {
   product: Product &{isActive:boolean} ;
  mangeMany: boolean;
  toggleMange: (val: boolean) => void;
selectedIds: string[];toggleSelect: (id: string) => void;}) => {
  // هل المنتج مختار حالياً؟
  const isSelected = selectedIds?.includes(product._id as string);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border relative flex flex-col
      ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'}`}
    >
      {/* 1. المربع الاختياري (يظهر فقط في وضع الإدارة) */}
      {mangeMany && (
        <div className="absolute top-3 left-3 z-20">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelect(product._id as string)}
            className="w-6 h-6 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shadow-sm"
          />
        </div>
      )}

      {/* Image Section */}
      <div className="h-48 bg-gray-200 relative overflow-hidden group">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            لا توجد صورة
          </div>
        )}

        {/* 2. شارة الحالة (Active/Inactive) */}
        <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold uppercase shadow-sm
          ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {product.isActive ? '● نشط' : '○ غير نشط'}
        </div>

        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          {product.category || 'عام'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
          <span className="text-blue-700 font-black text-xl">${product.price}</span>
        </div>

        <p className="text-xs text-gray-400 mb-4 font-mono">Barcode: {product.barcode}</p>

        <div className="grid grid-cols-2 gap-3 text-sm border-t pt-4">
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">المخزون</span>
            <span className={`font-semibold ${product.stock <= 5 ? 'text-red-500' : 'text-gray-800'}`}>
              {product.stock} {'منتج'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">إجمالي المبيعات</span>
            <span className="font-semibold text-green-600">{product.totalSales}</span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="p-4 bg-gray-50 border-t flex justify-between gap-2 mt-auto">
        {!mangeMany ? (
          <>
            <div className="flex-grow">
              <ProductDrawer product={product} lable="تعديل" />
            </div>
            <button
              onClick={() => deleteProduct(product._id as string)}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors text-sm font-medium"
            >
              حذف
            </button>
          </>
        ) : (
          <div className="w-full text-center py-2 text-xs text-blue-600 font-bold bg-blue-50 rounded-lg">
            {isSelected ? "تم التحديد" : "اضغط للتحديد"}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard