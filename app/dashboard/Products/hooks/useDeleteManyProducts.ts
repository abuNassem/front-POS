'use client';

import { useState } from 'react';
import { deleteMany } from '@/services/product';
import { Product } from '@/types/product';

interface Props {
  selectedIds: string[];
  clearSelection: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  toggleMange: (val: boolean) => void;
}

export const useDeleteManyProducts = ({
  selectedIds,
  clearSelection,
  setProducts,
  toggleMange,
}: Props) => {
  const [loadingRemov, setLoadingRemov] = useState(false);

  const submitIds = async () => {
    if (selectedIds.length === 0) return;

    try {
      setLoadingRemov(true);

      await deleteMany(selectedIds);

      const idsSet = new Set(selectedIds);

      setProducts(prev =>
        prev.filter(item => !(item._id && idsSet.has(item._id)))
      );

      clearSelection();
      toggleMange(false);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRemov(false);
    }
  };

  return {
    submitIds,
    loadingRemov,
  };
};

