'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/services/product';
import { Product } from '@/types/product';

export const useProductsQuery = (filterStatus: string) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ['products-list', filterStatus, page],
    queryFn: () => getProduct(page, filterStatus)
  });

  useEffect(() => {
    const handleState=()=>{
  setPage(1);
    setProducts([]);
    }
    handleState()
  
  }, [filterStatus]);

  useEffect(() => {
    if (!data) return;
     const handleState=()=>{
 setHasMore(data.hasMore);
    setProducts(data.data);
    }
    handleState()

    
  }, [data]);

  const loadMore = () => {
    if (!hasMore || isFetching) return;
    setPage(prev => prev + 1);
  };

  return {
    products,
    setProducts,
    hasMore,
    loadMore,
    isFetching,
  };
};
