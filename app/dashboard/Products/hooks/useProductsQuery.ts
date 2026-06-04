'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProduct } from '@/services/product';
import { Product } from '@/types/product';

export const useProductsQuery = (filterStatus: string) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ['products-list', filterStatus, page],
    queryFn: () => getProduct(page, filterStatus),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [filterStatus]);

  useEffect(() => {
    if (!data) return;

    setHasMore(data.hasMore);
    setProducts(data.data);
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
