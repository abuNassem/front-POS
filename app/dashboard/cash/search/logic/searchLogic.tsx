'use client'
import { useState, useRef } from "react"
import { SearchProduct } from "@/services/product"
import { Populated } from "@/types/product"

export const useSearch = () => {
    const [resultSearch, setResultSearch] = useState<Populated[]>([])
    const [searchValue, setSearchValue] = useState("")
    const refSearch = useRef<HTMLInputElement | null>(null)

    const handleSearch = async (params: string) => {
        setSearchValue(params)
        if (!params.trim()) {
            setResultSearch([])
            return
        }

        // ملاحظة: الـ setTimeout قد يسبب تراكم للطلبات، يفضل مستقبلاً استخدام Debounce
        setTimeout(async () => {
            const data = await SearchProduct(params)
            setResultSearch(data.data)
        }, 300)
    }

    const closeSearch = () => {
        setResultSearch([])
        setSearchValue("")
        if (refSearch.current) {
            refSearch.current.value = ''
        }
    }

    return {
        handleSearch,
        resultSearch,
        refSearch,
        closeSearch,
        searchValue,
        setResultSearch // قد تحتاجه لتصفير النتائج يدوياً
    }
}