'use client';

import React from 'react';

import ProductFormFields from './ProductFormFields';

import { Product } from '@/types/product';
import { useProductImage } from '../hooks/rrrr/useProductImage';
import { useProductSubmit } from '../hooks/rrrr/useProductSubmit';

interface Props {
  formData: Product;
  setFormData: React.Dispatch<
    React.SetStateAction<Product>
  >;

  productId?: string;
}

const ProductForm = ({
  formData,
  setFormData,
  productId,
}: Props) => {

  const {
    handleFileChange,
    uploadImage,
    isUploading,
  } = useProductImage(
    image =>
      setFormData(prev => ({
        ...prev,
        image,
      }))
  );

  const {
    saveProduct,
    isSubmitting,
  } = useProductSubmit();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    let image =
      formData.image;

    const uploadedImage =
      await uploadImage();

    if (uploadedImage) {
      image = uploadedImage;
    }

    await saveProduct(
      {
        ...formData,
        image,
      },
      productId
    );
  };

  const isReady=formData.category&&formData.costPrice&&formData.name&&formData.stock&&formData.price
  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
      "
    >
      <ProductFormFields
        formData={formData}
        setFormData={setFormData}
        onFileChange={handleFileChange}
      />

      <div className="mt-8">
        <button
          type="submit"
          disabled={
            isUploading ||
            isSubmitting||
            !isReady
          }
          className={`
             w-full
             ${isReady?'bg-blue-600':'bg-gray-600 cursor-not-allowed'}

            text-white
            py-4
            rounded-2xl
            font-black
            `}

        >
          {productId
            ? 'تحديث المنتج'
            : 'إضافة المنتج'}
        </button>
      </div>
    </form>
  );
};

export default React.memo(ProductForm);