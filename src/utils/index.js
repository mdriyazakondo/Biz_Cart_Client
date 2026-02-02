import axios from "axios";

export const imageUpload = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB_secure_key}`,
      formData,
    );

    return data?.data?.display_url;
  } catch (error) {
    console.error("Image upload failed", error);
    return null;
  }
};
