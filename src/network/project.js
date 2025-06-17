import { axiosInstance } from "./index.js";


const getProjects = async () => await axiosInstance.get('/api/projects');

const getProperties = async (payload) => await axiosInstance.post('/api/projects/list-properties', payload);

const getProjectById = async (id) => await axiosInstance.get(`/api/projects/${id}`);

const createProject = async (payload) => await axiosInstance.post('/api/projects', payload);

const updateProject = async (id, payload) => await axiosInstance.put(`/api/projects/${id}`, payload);

const deleteProject = async (id) => await axiosInstance.delete(`/api/projects/${id}`);

const getPropertyById = async (id) => await axiosInstance.get(`/api/projects/property/${id}`);



export {
    getProjects,
    getProjectById,
    getProperties,
    createProject,
    updateProject,
    deleteProject,
    getPropertyById
};





