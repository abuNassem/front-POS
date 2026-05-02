'use client'
import { deleteMany } from "@/services/product";
import { createContext, ReactNode, useContext, useState } from "react";

export interface ProductContextType {
  mangeMany: boolean;
  toggleMange: (val: boolean) => void;
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
  submitIds:()=>void;
  loadingRemov:boolean,
  toggleLoadingRemov:(val:boolean)=>void
}

const context = createContext<ProductContextType | null>(null);

const ProductContext = ({ children }: { children: ReactNode }) => {
  const [mangeMany, setMangeMany] = useState(false);
  const [loadingRemov,setLoadingRemov]=useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


const toggleLoadingRemov=(val:boolean)=>setLoadingRemov(val)


  const toggleMange = (val: boolean) => {
    setMangeMany(val);
    if (!val) setSelectedIds([]); // تنظيف القائمة عند إغلاق وضع الإدارة
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const submitIds=async()=>{
    if(Array.isArray(selectedIds) && selectedIds.length>1){
          toggleLoadingRemov(true)
 await deleteMany(selectedIds)
    setMangeMany(false)
    toggleLoadingRemov(false)
    }
   
  }

  return (
    <context.Provider
      value={{ mangeMany, toggleMange, selectedIds, toggleSelect, clearSelection,submitIds,toggleLoadingRemov,loadingRemov}}>
      {children}
    </context.Provider>
  );
};

export const useProductContext = () => {
  const contextProd = useContext(context);
  if (!contextProd) throw new Error("useProductContext must be used within ProductContext");
  return contextProd;
};

export default ProductContext;