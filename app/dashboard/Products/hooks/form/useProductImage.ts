'use client';

import { useCallback, useState } from 'react';
import { UploadMedia } from '@/services/uploadImage';

export const useProductImage = (
  setImage: (url: string | null) => void
) => {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const handleFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      setSelectedFile(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(
          reader.result as string
        );
      };

      reader.readAsDataURL(file);
    },
    [setImage]
  );

  const uploadImage =
    useCallback(async () => {
      if (!selectedFile) {
        return null;
      }

      setIsUploading(true);

      try {
        const imageUrl =
          await UploadMedia(
            selectedFile
          );

        return imageUrl;
      } finally {
        setIsUploading(false);
      }
    }, [selectedFile]);

  const clearImage =
    useCallback(() => {
      setSelectedFile(null);
      setImage(null);
    }, [setImage]);

  return {
    selectedFile,
    isUploading,
    handleFileChange,
    uploadImage,
    clearImage,
  };
};