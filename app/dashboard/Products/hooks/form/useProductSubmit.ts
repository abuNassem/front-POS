'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  addProduct,
  updateProduct,
} from '@/services/product';

import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

export const useProductSubmit = () => {
  const router=useRouter()
  const queryClient =
    useQueryClient();

  const [isSubmitting,
    setIsSubmitting] =
    useState(false);

  const saveProduct =
    async (
      productData: Product,
      productId?: string
    ) => {
      setIsSubmitting(true);

      try {
        if (productId) {
          await updateProduct({
            ...productData,
            _id: productId,
          });
        } else {
          await addProduct(
            productData
          );
        }

        await queryClient.invalidateQueries({
          queryKey: ['products'],
        });
      } finally {
        router.push('/dashboard/Products')
        setIsSubmitting(false);
      }
    };

  return {
    saveProduct,
    isSubmitting,
  };
};