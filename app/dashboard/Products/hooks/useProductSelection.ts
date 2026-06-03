'use client';

import { useState } from 'react';

export const useProductSelection = () => {
  const [mangeMany, setMangeMany] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleMange = (val: boolean) => {
    setMangeMany(val);

    if (!val) {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  return {
    mangeMany,
    toggleMange,
    selectedIds,
    toggleSelect,
    clearSelection,
  };
};
