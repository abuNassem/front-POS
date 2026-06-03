'use client'

import { useApi } from "@/context"
import { db } from "@/localDB";
import { getPopulated } from "@/services/product";
import { syncSale } from "@/services/sales";
import { Populated } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";



export const useGetProduct=()=>{
    const {online}=useApi()
    const [localProduct,setLocalProduct]=useState<Populated[]>([])
    const { data, isLoading, error } = useQuery({
        queryKey: ["Populated"],
        queryFn: () => getPopulated(),
        staleTime: 1000 * 60 * 5, 
    });
    
    useEffect(()=>{
        if(!online){


            const getLocalProduct=async()=>{
            const products = await db.products.toArray();
        setLocalProduct(products)
            return products
    }
    getLocalProduct()

        }
        
    },[online])

    return{products:online?data:localProduct,loading:online?isLoading:false,error:online?error:null}


}