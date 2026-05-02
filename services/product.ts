
import { Populated, Product } from "@/types/product"

import apiClient from "./index"
import { ProductImport } from "@/app/dashboard/Products/components/import"

export const getProduct = async (id: string | null,page?:number) => {

    if (id) {
        const res = await apiClient.get<Product>(`/product?id=${id}`)
        return res.data
    } else {

        const res = await apiClient.get<Product[]>(`/product?page=${page}`)
        console.log('page',page)

        return res.data
    }

}

export const getPopulated = async () => {
    const res = await apiClient.get<Populated[]>('/product/populated')
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
