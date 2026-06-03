import { Product } from '@/types/product'
import { deleteProduct } from '@/services/product'
import Link from 'next/link';

const ProductCard = ({ product,modelView}: 
  {
   product: Product &{isActive:boolean,isSync:boolean} ;
   modelView:'normal'|'deleteMany'|'sync'
  }) => {
    
  
  return (
    <div 
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border relative flex flex-col
       border-gray-100`}
    >
      
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
      {/* Actions Section */}
<div className="p-4 bg-gray-50 border-t flex justify-between gap-2 mt-auto">

 
  {modelView=='normal' && (
    <>
      
      <button
        onClick={() =>
          deleteProduct(product._id as string)
        }
        className="
          px-4 py-2 text-red-600
          hover:bg-red-50 rounded-lg
          border border-red-200
          transition-colors text-sm font-medium
        "
      >
        حذف
      </button>
      <Link href={`/dashboard/Products/${product._id as string}/edit`}>
      <button
        
        className="
          px-4 py-2 text-blue-600
          hover:bg-red-50 rounded-lg
          border border-red-200
          transition-colors text-sm font-medium
        "
      >
        تعديل
      </button>
      </Link>
    </>
  )}
</div>
    </div>
  )
}

export default ProductCard