'use client';

import { saveLocal } from '@/services/product';
import {  useState } from 'react';

export type SyncItem = {
  _id: string;
  isSync: boolean;
};

export const useProductSync = (modelView:'normal'|'sync'|'deleteMany') => {
  const [syncItems, setSyncItems] = useState<SyncItem[]>([]);
  const [isMax,setIsMax]=useState<boolean>(syncItems.length>10)
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
  
  
  /*
    تنظيف الكل بعد الإرسال
  */
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
  }catch(err){
    setSyncLoading(false
    )
  }}
   


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