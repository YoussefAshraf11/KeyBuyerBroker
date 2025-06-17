import { axiosInstance } from "./index.js";

const addToFavorites = async (payload) => await axiosInstance.post(`/api/users/${payload.propertyId}/add-to-favorites`, payload);

const removeFromFavorites = async (payload) => await axiosInstance.delete(`/api/users/${payload.propertyId}/remove-from-favorites`, payload);

const getUserFavorites = async () => await axiosInstance.get('/api/users/favorites');

const getUsersList = async (params) => await axiosInstance.get('/api/users', {params});


export {
    addToFavorites,
    removeFromFavorites,
    getUserFavorites,
    getUsersList
};


