'use client';


import { Product } from '@/types/product';

import { useProductsQuery } from '../hooks/useProductsQuery';
import { useProductFilter } from '../hooks/useProductFilter';
import { useProductSelection } from '../hooks/useProductSelection';
import { useDeleteManyProducts } from '../hooks/useDeleteManyProducts';
import { SyncItem, useProductSync } from '../hooks/useSync';

export interface ProductContextType {
  products: Product[];
  hasMore: boolean;
  loadMore: () => void;

  filterStatus: string;
  handleStatusChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  mangeMany: boolean;
  toggleMange: (val: boolean) => void;

  selectedIds: string[];
  toggleSelect: (id: string) => void;
  clearSelection: () => void;

  submitIds: () => Promise<void>;
  loadingRemov: boolean;

   clearSyncItems:()=>void
    addProductSync:(_id:string)=>void
    removeProductSync:(_id:string)=>void
   syncItems:SyncItem[],
   toggleSync:()=>void,
   syncMode:boolean,
   submitSync:()=>void,
   syncLoading:boolean
   
}



export const useProductContext = ():ProductContextType => {

  

 

 

  

  return {
        products,
        hasMore,
        loadMore,

        filterStatus,
        handleStatusChange,

        mangeMany,
        toggleMange,

        selectedIds,
        toggleSelect,
        clearSelection,

        submitIds,
        loadingRemov,

        clearSyncItems
        ,
          syncItems,
          addProductSync,
          removeProductSync,
          toggleSync,
          syncMode,
          submitSync,
          syncLoading
          
      }
    
    
};




