'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProduct } from '@/services/product';
import { Product } from '@/types/product';

export const useProductsQuery = (filterStatus: string) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState(filterStatus);

  const { data, isFetching } = useQuery({
    queryKey: ['products-list', filterStatus, page],
    queryFn: () => getProduct(page, filterStatus),
    placeholderData: keepPreviousData,
  });

  if (filterStatus !== appliedFilter) {
    setAppliedFilter(filterStatus);
    setPage(1);
    setProducts([]);
  }

  const [appliedData, setAppliedData] = useState(data);

  if (data && data !== appliedData) {
    setAppliedData(data);
    setHasMore(data.hasMore);
    setProducts(data.data);
  }

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
