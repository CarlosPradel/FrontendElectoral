import axios from "axios";
import type { MesaElectoral } from "../models/MesaElectoral";
import type { CreateMesaElectoral } from "../models/Dtos/MesaElectoralDto";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
//revisar esto 
const ENDPOINT = `${API_ADMIN_URL}/MesaElectorals`; 

export const getMesasElectorales = () => axios.get<MesaElectoral[]>(ENDPOINT);

export const getMesaElectoral = (id: number) =>
  axios.get<MesaElectoral>(`${ENDPOINT}/${id}`);

export const crearMesaElectoral = (data: CreateMesaElectoral) =>
  axios.post<MesaElectoral>(ENDPOINT, data);

export const actualizarMesaElectoral = (id: number, data: CreateMesaElectoral) =>
  axios.put(`${ENDPOINT}/${id}`, data);

export const eliminarMesaElectoral = (id: number) =>
  axios.delete(`${ENDPOINT}/${id}`);
