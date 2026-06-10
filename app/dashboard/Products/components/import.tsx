import React, { useState, ChangeEvent } from 'react';
import { useExcelReader } from '../hooks/helper/useExcelReader';
import { ImportProduct } from '@/services/product';

export interface ProductImport {
  name: string;
  barcode: number;
  price: number;
  stock: number;
  category?: string;
}

const ExcelImportComponent: React.FC = () => {
  const { readExcel, data, loading, error, reset } = useExcelReader<ProductImport>();
  const [importMode, setImportMode] = useState<'strict' | 'smart'>('strict');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await readExcel(file);
      } catch (err) {
        console.error("خطأ في القراءة:", err);
      }
    }
  };


  const handleFinalUpload = async () => {
      await ImportProduct(data, importMode);
     reset()
  };

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white max-w-2xl mx-auto">
      <h3 className="mb-6 text-xl font-bold text-gray-800 border-b pb-2">استيراد المنتجات بالجملة</h3>

      <div className="flex items-center gap-4 mb-6 p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">نمط المعالجة:</span>
        <div className="flex border rounded-md overflow-hidden">
          <button
            onClick={() => setImportMode('strict')}
            className={`px-4 py-1 text-sm ${importMode === 'strict' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
          >
            Strict (صارم)
          </button>
          <button
            onClick={() => setImportMode('smart')}
            className={`px-4 py-1 text-sm ${importMode === 'smart' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
          >
            Smart (ذكي)
          </button>
        </div>
        <p className="text-xs text-gray-500">
          {importMode === 'strict' ? "* سيرفض أي صف يحتوي خطأ" : "* سيصلح الأخطاء البسيطة ويحفظها للمراجعة"}
        </p>
      </div>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        disabled={loading}
      />

      {loading && <p className="mt-4 text-blue-500 animate-pulse">جاري تحليل ملف Excel...</p>}
      {error && <p className="mt-4 text-red-500 bg-red-50 p-2 rounded">{error}</p>}

      {data.length > 0 && !loading && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-center">
            <p className="text-green-700 font-bold">✅ جاهز لرفع {data.length} سجل بنمط ({importMode})</p>
            <button
              onClick={handleFinalUpload}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-green-700 transition-colors"
            >
              تأكيد الرفع النهائي
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelImportComponent;