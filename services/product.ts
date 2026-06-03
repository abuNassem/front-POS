
import { Populated, Product } from "@/types/product"

import { ProductImport } from "@/app/dashboard/Products/components/import"
import { db } from "@/localDB";
import apiClient from ".";


export const getProduct = async (page: number, status: string) => {
    const params = new URLSearchParams();
    
    if (page) params.append("page", page.toString());
    if (status) params.append("status", status);
    const response = apiClient.get(`/product?${params.toString()}`);
    return (await response).data
};


export const getPopulated = async () => {
    const res = await apiClient.get<Populated[]>('/product/populated')
    if(Array.isArray(res.data)&&res.data.length){
await db.products.bulkPut(res.data);
console.log('res',res.data)
    console.log('localProduct',await db.products.toArray())
    }

    return res.data
}


export const addProduct = (product: Product) => {
    try{
    return apiClient.post("/product", product)

    }catch(err){
        console.log(err)
    }
}

export const updateProduct = (product: Product) => {
    try{
    return apiClient.put("/product/" + product._id, product)

    }catch(err){
        console.log(err)

    }
}

export const deleteProduct = (id: string) => {
    return apiClient.delete("/product/" + id)
}

export const SearchProduct = (param: string | number) => {
    return apiClient.get(`product/search?q=${param}`)
}

export const ImportProduct=(products:ProductImport[],mode:'strict'|'smart')=>{
    return apiClient.post('/product/import',{products,mode})
}

export const deleteMany=(ids:string[])=>{
    if(Array.isArray(ids) && ids.length>1){
         return apiClient.post('/product/deleteMany',{ids})
    }

}


export const saveLocal=async(products:{_id:string,isSync:boolean}[])=>{
    try{
          const res=await apiClient.put('/product/sync/saveLocal',products)
    return res.data

    }catch(err){
        console.log(err)
    }
  
}

export const getSyncProduct=async()=>{
    const res=await apiClient.get('/product/sync/product')
    return res.data
}

export const getProductById = async (id: string) => {
    const response = await apiClient.get(`/product/${id}`);
    return response.data.data;
};

