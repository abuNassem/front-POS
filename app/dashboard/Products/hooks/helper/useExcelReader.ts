import { useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelReaderResult<T> {
  readExcel: (file: File) => Promise<T[]>;
  data: T[];
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export const useExcelReader = <T = any>(): ExcelReaderResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const readExcel = (file: File): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const binaryStr = e.target?.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });

          // اختيار الورقة الأولى من الملف
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // تحويل البيانات إلى JSON
          const jsonRes = XLSX.utils.sheet_to_json(worksheet) as T[];

          setData(jsonRes);
          setLoading(false);
          resolve(jsonRes);
        } catch (err) {
          const msg = "فشل في معالجة ملف Excel، تأكد من صيغة الملف.";
          setError(msg);
          setLoading(false);
          reject(msg);
        }
      };

      reader.onerror = () => {
        setError("حدث خطأ أثناء قراءة الملف.");
        setLoading(false);
        reject("Error reading file");
      };

      reader.readAsBinaryString(file);
    });
  };

  const reset = () => {
    setData([]);
    setError(null);
  };

  return { readExcel, data, loading, error, reset };
};