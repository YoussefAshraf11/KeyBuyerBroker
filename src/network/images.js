import { axiosInstance } from "./index.js";

const uploadImages = async (payload) => {
    const formData = new FormData();
    payload.images.forEach((image) => {
        formData.append(`images`, image);
    });
    formData.append('type', payload.type);

    return await axiosInstance.post("/api/images", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export { uploadImages };
