import * as XLSX from "xlsx";
import { extraInfoProduct} from "@/types/product";
import { useRef, useState } from "react";
import { ImportProduct } from "@/services/product";

export const useImport = () => {

const [loading,setLoading]=useState(false)
      const fileInputRef = useRef(null);

  const isEmpty = (value: string|undefined): boolean =>
    value === undefined || value === null || String(value).trim().length === 0;



  const validateNumber = (value: number): number | null => {
    const num = Number(value);
    return !isNaN(num) && num >= 0 ? num : null;
  };


  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  const processAndValidateData = (rawData: extraInfoProduct[]): extraInfoProduct[] => {
    const validProducts: extraInfoProduct[] = [];

    rawData.forEach((item) => {
      const filledFields = Object.values(item).filter((val) => !isEmpty(val));
      if (filledFields.length <= 2) return;

      const sanitizedProduct = {
        name: !isEmpty(item.name) ? String(item.name).trim() : "منتج غير مسمى",
        category: !isEmpty(item.category) ? String(item.category).trim() : "عام",
        unit: !isEmpty(item.unit) ? String(item.unit) : "منتج",
        unitPrice: !isEmpty(item.unitPrice) ? String(item.unitPrice) : "دينار",
        price: validateNumber(item.price) ?? 0,
        stock: validateNumber(item.stock) ?? 0,
        costPrice: validateNumber(item.costPrice) ?? 0,
        barcode:validateNumber(Number(item.barcode))  ? Number(item.barcode) : null,
        image: item.image || null,
        totalSales: validateNumber(item.totalSales) ?? 0,
      };

      if (sanitizedProduct.price >= 0 && sanitizedProduct.stock >= 0) {
        validProducts.push(sanitizedProduct as extraInfoProduct);
      }
    });

    return validProducts;
  };



  const readExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const target = e.target;
          if (!target || !target.result) return;
          const data = new Uint8Array(target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet);
          resolve(json as any[]);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };



  const handleUpload = async (products: extraInfoProduct[]) => {
    setLoading(true)
   await ImportProduct(products)
   .then(()=>{
   setLoading(false)

   })
   .finally(()=>{
       setLoading(false)
   })
  };



  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const rawData = await readExcelFile(file);
      
      // تنفيذ عملية التنظيف والفلترة
      const processedData = processAndValidateData(rawData);

      console.log("Processed Data:", processedData);

      if (processedData.length === 0) {
        alert("لم يتم العثور على منتجات صالحة للاستيراد.");
        return;
      }

      // إرسال البيانات النظيفة للسيرفر
      await handleUpload(processedData);

      event.target.value = "";
    } catch (error) {
      console.error("Error reading file:", error);
      alert("حدث خطأ أثناء معالجة الملف.");
    }
  };


  return {
    readExcelFile,
    processAndValidateData,
    handleUpload,
    handleFileChange,
    handleClick,
     fileInputRef ,
     loading

  };
};