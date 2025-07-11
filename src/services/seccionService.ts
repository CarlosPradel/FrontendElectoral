import axios from "axios";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const ENDPOINT = `${API_ADMIN_URL}/seccions`; // Nota: "Seccions" viene del nombre del controlador

export const getSecciones = () => axios.get(ENDPOINT);

export const getSeccion = (id: number) => axios.get(`${ENDPOINT}/${id}`);

export const crearSeccion = (data: { nombre: string; coordenadas: string }) =>
  axios.post(ENDPOINT, data);

export const actualizarSeccion = (id: number, data: { nombre: string; coordenadas: string }) =>
  axios.put(`${ENDPOINT}/${id}`, data);

export const eliminarSeccion = (id: number) => axios.delete(`${ENDPOINT}/${id}`);
