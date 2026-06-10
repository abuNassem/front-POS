'use client';
import React from 'react';

interface BulkActionToolbarProps {
    selectedCount: number;
    onDelete: () => void;
    onClear: () => void;
    isLoading: boolean;
}

const BulkActionToolbar = ({ selectedCount, onDelete, onClear, isLoading }: BulkActionToolbarProps) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
            <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-gray-700 backdrop-blur-md bg-opacity-95">
                <div className="flex items-center gap-4">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {selectedCount}
                    </span>
                    <p className="font-medium">منتجات تم تحديدها</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onClear}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        إلغاء
                    </button>

                    <button
                        onClick={onDelete}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${
                            isLoading
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 active:scale-95"
                        }`}
                    >
                        {isLoading ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "حذف المحددة"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkActionToolbar;