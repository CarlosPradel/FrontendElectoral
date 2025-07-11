import axios from "axios";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const ENDPOINT = `${API_ADMIN_URL}/partidoes`; 

export const getPartidos = () => axios.get(ENDPOINT);

export const getPartido = (id: number) => axios.get(`${ENDPOINT}/${id}`);

export const crearPartido = (data: { nombre: string; sigla: string; color: string }) =>
  axios.post(ENDPOINT, data);

export const actualizarPartido = (id: number, data: { nombre: string; sigla: string; color: string }) =>
  axios.put(`${ENDPOINT}/${id}`, data);

export const eliminarPartido = (id: number) => axios.delete(`${ENDPOINT}/${id}`);
