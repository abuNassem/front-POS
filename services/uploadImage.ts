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

        onUploadProgress: (progressEvent) => {

          const total = progressEvent.total || 1;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current * 100) / total);

          if (onProgress) onProgress(percentCompleted);

        }
      }
    );

    return res.data.secure_url;
  } catch (error: any) {
    console.error("Upload Error:", error);
    return null;
  }
};
