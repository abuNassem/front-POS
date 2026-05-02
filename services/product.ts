<<<<<<< HEAD
import { extraInfoProduct, Populated, Product } from "@/types/product"
=======
import { Populated, Product } from "@/types/product"
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd
import apiClient from "./index"
import { ProductImport } from "@/app/dashboard/Products/components/import"

<<<<<<< HEAD
export const getProduct = async (id: string | null,page?:number) => {
=======
export const getProduct = async (id: string | null) => {
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd
    if (id) {
        const res = await apiClient.get<Product>(`/product?id=${id}`)
        return res.data
    } else {
<<<<<<< HEAD
        const res = await apiClient.get<Product[]>(`/product?page=${page}`)
        console.log('page',page)
=======
        const res = await apiClient.get<Product[]>("/product")
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd
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
<<<<<<< HEAD
}

export const ImportProduct=(products:ProductImport[],mode:'strict'|'smart')=>{
    return apiClient.post('/product/import',{products,mode})
}

export const deleteMany=(ids:string[])=>{
    if(Array.isArray(ids) && ids.length>1){
         return apiClient.post('/product/deleteMany',{ids})
    }
=======
>>>>>>> 47f7505cb4d54d229acaadaebaacb604e90e97cd
}