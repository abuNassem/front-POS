'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import ExcelImportComponent from './import';
import { useProductSync } from '../hooks/useSync';
import ActionToolbar from './actionToolBar';
import { useProductSelection } from '../hooks/useProductSelection';
import { useDeleteManyProducts } from '../hooks/useDeleteManyProducts';
import ProductActionWrapper from './ProductActionWrapper';
import { useProductsQuery } from '../hooks/useProductsQuery';
import { useProductFilter } from '../hooks/useProductFilter';


const SearchComponent = dynamic(
  () => import('./searchComponent'),
  { ssr: false }
);



const ProductCard = dynamic(
  () => import('../card/productCard'),
  {
    ssr: false,
    loading: () => (
      <div className='h-64 bg-gray-200 animate-pulse rounded-xl' />
    ),
  }
);

const ClientProduct = () => {
  const [modelView,setModelView]=useState<'normal'|'sync'|'deleteMany'>('normal')

  const {
    filterStatus,
    handleStatusChange,
  } = useProductFilter();
     const {
    products,
    setProducts,
    hasMore,
    loadMore,
  } = useProductsQuery(filterStatus);

  const {
    addProductSync,
    removeProductSync,
    syncItems,
    submitSync,
    clearSyncItems,
    syncLoading
  }=useProductSync(modelView)


   const {
      toggleMange,
      selectedIds,
      toggleSelect,
      clearSelection,
    } = useProductSelection();

    const {
    submitIds,
    loadingRemov,
  } = useDeleteManyProducts({
    selectedIds,
    clearSelection,
    setProducts,
    toggleMange,
  });



  const getWrapperConfig = (_id: string,isSync:boolean) => {
  switch (modelView) {
    case 'sync':
      return {
        mode: modelView,
        isChecked: isSync,
        onCheck: () => addProductSync(_id),
        onUnCheck: () => removeProductSync(_id),
      };

    case 'deleteMany':
      return {
        mode: modelView,
        isChecked: selectedIds.includes(_id),
        onCheck: () => toggleSelect(_id),
        onUnCheck: () => toggleSelect(_id),
      };

    default:
      return {
        mode: modelView,
        isChecked: false,
        onCheck: () => {},
        onUnCheck: () => {},
      };
  }
};

  const actionConfig = {
  sync: {
    count: syncItems.length,
    title: 'Sync Products',
    submitText: 'Sync',
    onSubmit: submitSync,
    onClear: clearSyncItems,
    isLoading: syncLoading,
  },

  deleteMany: {
    count: selectedIds.length,
    title: 'Delete Products',
    submitText: 'Delete',
    onSubmit: submitIds,
    onClear: clearSelection,
    isLoading: loadingRemov,
  }
};
const config =  
modelView === 'normal'
    ? null
    : actionConfig[modelView]

  if (loadingRemov || syncLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full'></div>
      </div>
    );
  }

  return (
    <div
      className='p-4 w-full bg-gray-50 min-h-screen relative'
      dir='rtl'
    >


      <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border'>

        <div>
          <h1 className='text-2xl font-black'>إدارة المنتجات</h1>
          <select
            onChange={(t)=>setModelView(t.target.value as 'normal'|'sync'|'deleteMany' )}
          >
            <option value='normal'>عادي</option>
            <option value='deleteMany'>حذف متعدد</option>
            <option value='sync'>مزامنة</option>
          </select>
          {modelView=='deleteMany' && (
            <span className='text-sm text-blue-600'>
              وضع التحديد المتعدد فعال
            </span>
          )}
        </div>

        <div className='flex gap-3 flex-wrap'>
          
          <button
            onClick={() => {

              if (modelView=='deleteMany') {
                clearSelection();
            setModelView('normal')
              }
            }}
          >
            {modelView=='deleteMany' ? 'إلغاء' : 'تحديد متعدد'}
          </button>

          <ExcelImportComponent />

          <select
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value='all'>الكل</option>
            <option value='active'>نشط</option>
            <option value='disActive'>غير نشط</option>
          </select>

          <SearchComponent />

        
      </div>
      </div>

      {/* Products */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {products.map(product => (
          
          
                  <div   key={product._id} className=' w-full h-full relative'>
                 
                   <ProductActionWrapper {...getWrapperConfig(product._id as string,product.isSync as boolean)}/>

               
                    <ProductCard
                    
            product={product}
            modelView={modelView}
          />
                  </div>

          
        ))}
      </div>
      

      {hasMore && (
        <div className='flex justify-center mt-10'>
          <button onClick={loadMore}>
            تحميل المزيد
          </button>
        </div>
      )}
     {config && (
  <ActionToolbar
    {...config}
  />
)}
    </div>
  );
};

export default ClientProduct;
