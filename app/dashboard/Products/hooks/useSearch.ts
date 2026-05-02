'use client'
import { useState, useRef } from "react"
import { SearchProduct } from "@/services/product"
import { Product } from "@/types/product"

export const useSearch = () => {
    const [resultSearch, setResultSearch] = useState<Product[]>([])
    const [searchValue, setSearchValue] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleSearch = async (params: string) => {
        setSearchValue(params)
        
        // مسح المؤقت السابق إذا وجد
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        if (!params.trim()) {
            setResultSearch([])
            return
        }

        setIsSearching(true)
        // تطبيق Debounce لمدة 400ms
        timeoutRef.current = setTimeout(async () => {
            try {
                const data = await SearchProduct(params)
                setResultSearch(data.data)
            } finally {
                setIsSearching(false)
            }
        }, 400)
    }

    const closeSearch = () => {
        setResultSearch([])
        setSearchValue("")
    }

    return {
        handleSearch,
        resultSearch,
        closeSearch,
        searchValue,
        isSearching
    }
}