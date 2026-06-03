'use client';

import { useState } from 'react';

export const useProductFilter = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterStatus(e.target.value);
  };

  return {
    filterStatus,
    handleStatusChange,
  };
};

