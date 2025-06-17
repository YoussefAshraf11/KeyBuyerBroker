import { axiosInstance } from "./index.js";


const createAppointment = async (payload) => await axiosInstance.post('/api/appointments', payload);

const getMyAppointments = async () => await axiosInstance.get('/api/appointments/my-appointments');

const deleteAppointment = async (id) => await axiosInstance.delete(`/api/appointments/${id}`);

const updateAppointment = async (id, payload) => await axiosInstance.patch(`/api/appointments/${id}`, payload);

const getAppointmentById = async (id) => await axiosInstance.get(`/api/appointments/appointment/${id}`);
// const addFeedback = async (id, payload) => await axiosInstance.post(`/api/appointments/${id}/feedback`, payload);

export {
     createAppointment,
     getMyAppointments,
      deleteAppointment,
      updateAppointment,
      getAppointmentById
    //    addFeedback 
    };