'use client';

import { useCallback, useState } from 'react';
import { Product } from '@/types/product';

export const INITIAL_FORM_STATE: Product = {
  name: '',
  barcode: 0,
  price: 0,
  costPrice: 0,
  stock: 0,
  category: '',
  image: null,
};

export const useProductForm = (
  initialData?: Product | null
) => {
  const [formData, setFormData] =
    useState<Product>(
      initialData ?? INITIAL_FORM_STATE
    );

<<<<<<< HEAD:app/dashboard/Products/hooks/rrrr/useProductForm.ts
  useEffect(() => {
    if (initialData) {
      const handleState=()=>{
      setFormData(initialData);

      }
      handleState()
    }
  }, [initialData]);
=======
  const [appliedInitialData, setAppliedInitialData] =
    useState(initialData);

  if (initialData && initialData !== appliedInitialData) {
    setAppliedInitialData(initialData);
    setFormData(initialData);
  }
>>>>>>> prof:app/dashboard/Products/hooks/form/useProductForm.ts

  const updateField = useCallback(
    (
      field: keyof Product,
      value: Product[keyof Product]
    ) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
  }, []);

  return {
    formData,
    setFormData,
    updateField,
    resetForm,
  };
};