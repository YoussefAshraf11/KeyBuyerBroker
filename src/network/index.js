import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000"
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } 
        
        return config;
    },
    (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);


export  {axiosInstance};