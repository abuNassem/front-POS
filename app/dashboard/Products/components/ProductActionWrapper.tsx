'use client';

import { useEffect, useState } from 'react';

interface ProductActionWrapperProps {
  mode: 'normal' | 'sync' | 'deleteMany';

  isChecked?: boolean;

  onCheck?: () => void;
  onUnCheck?: () => void;

  disabled?: boolean;
}

const ProductActionWrapper = ({
  mode,
  isChecked = false,
  onCheck,
  onUnCheck,
  disabled,
}: ProductActionWrapperProps) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  if (mode === 'normal') return null;

  return (
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={(e) => {
        const value = e.target.checked;

        setChecked(value);

        if (value) {
          onCheck?.();
        } else {
          onUnCheck?.();
        }
      }}
      className="w-6 h-6 absolute z-10 end-0"
    />
  );
};

export default ProductActionWrapper;