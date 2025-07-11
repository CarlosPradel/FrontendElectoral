import axios from "axios";
import type { Jurado } from "../models/Jurado";
import type { CreateJurado } from "../models/Dtos/JuradoDto";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const ENDPOINT = `${API_ADMIN_URL}/juradoes`; // cuidado con la pluralización en backend

export const getJurados = () => axios.get<Jurado[]>(ENDPOINT);

export const getJurado = (id: number) => axios.get<Jurado>(`${ENDPOINT}/${id}`);

export const crearJurado = (data: CreateJurado) => axios.post<Jurado>(ENDPOINT, data);

export const actualizarJurado = (id: number, data: CreateJurado) =>
  axios.put(`${ENDPOINT}/${id}`, data);

export const eliminarJurado = (id: number) => axios.delete(`${ENDPOINT}/${id}`);
