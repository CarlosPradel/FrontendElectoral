import axios from "axios";
import type { Eleccion } from "../models/Eleccion";
import type { CreateEleccion } from "../models/Dtos/EleccionDto";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const ENDPOINT = `${API_ADMIN_URL}/eleccions`; // Nota: pluralizado con 's'

export const getElecciones = () => axios.get<Eleccion[]>(ENDPOINT);

export const getEleccion = (id: number) => axios.get<Eleccion>(`${ENDPOINT}/${id}`);

export const crearEleccion = (data: CreateEleccion) =>
  axios.post<Eleccion>(ENDPOINT, data);

export const actualizarEleccion = (id: number, data: CreateEleccion) =>
  axios.put(`${ENDPOINT}/${id}`, data);

export const eliminarEleccion = (id: number) => axios.delete(`${ENDPOINT}/${id}`);
