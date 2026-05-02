import axios from "axios";

export const UploadMedia = async (file: File, onProgress?: (percent: number) => void) => {
  try {
    const form = new FormData();
    form.append('file', file);
    form.append("upload_preset", "tiwtter");
    form.append("cloud_name", "dxy6diqla");

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dxy6diqla/auto/upload', 
      form,
      {
        // هنا يكمن السر: Axios يوفر هذه الدالة لمراقبة البيانات المرسلة
        onUploadProgress: (progressEvent) => {
          // حساب النسبة المئوية
          const total = progressEvent.total || 1; // إجمالي حجم الملف
          const current = progressEvent.loaded; // ما تم رفعه حتى الآن
          const percentCompleted = Math.round((current * 100) / total);
          
          // إرسال النسبة إلى دالة الـ callback لتحديث الـ UI
          if (onProgress) onProgress(percentCompleted);
          
          console.log(`تم رفع: ${percentCompleted}%`);
        }
      }
    );

    return res.data.secure_url; 
  } catch (error: any) {
    console.error("Upload Error:", error);
    return null;
  }
};
