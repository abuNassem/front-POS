'use client';

import { saveLocal } from '@/services/product';
<<<<<<< HEAD
import {  useState } from 'react';
=======
import { useState } from 'react';
>>>>>>> prof

export type SyncItem = {
  _id: string;
  isSync: boolean;
};

export const useProductSync = () => {
  const [syncItems, setSyncItems] = useState<SyncItem[]>([]);
const [syncLoading,setSyncLoading]=useState(false)

  const addProductSync = (_id: string) => {
    const exist=syncItems.find(ele=>ele._id==_id)
    if(exist){
    setSyncItems(prev=>(
      prev.filter(obj=>obj._id!=_id)
    ))
    }else{
       setSyncItems(prev=>{
        const update=prev.concat({_id,isSync:true})
        return update
       })

    }
  };

  const removeProductSync = (_id: string) => {
    const exist=syncItems.find(ele=>ele._id==_id)
    if(exist){
    setSyncItems(prev=>(
      prev.filter(obj=>obj._id!=_id)
    ))
    }else{
       setSyncItems(prev=>{
        const update=prev.concat({_id,isSync:false})
        return update
       })

    }
  };

  const clearSyncItems = () => {
    setSyncItems([]);
  };

  const isSync=(_id:string)=>{
    return !!syncItems.find(ele=>ele._id===_id&& ele.isSync)
  }
const submitSync=async()=>{
  try{
 if(!syncItems.length)return;
    setSyncLoading(true)
    await saveLocal(syncItems)
    setSyncLoading(false)
    clearSyncItems()
  }catch{
    setSyncLoading(false
    )
<<<<<<< HEAD
  }}
   

=======
  }

}

  const isMax = syncItems.filter(ele => ele.isSync).length > 2;
>>>>>>> prof

  return {
    syncItems,
    addProductSync,
    removeProductSync,
    clearSyncItems,
    syncLoading,
    submitSync,
    isSync,
    isMax
  };
};