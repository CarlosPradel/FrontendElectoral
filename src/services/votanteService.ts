import axios from "axios";
import type { Votante } from "../models/Votante";
import type { CreateVotante } from "../models/Dtos/VotanteDto";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const ENDPOINT = `${API_ADMIN_URL}/votantes`;

export const getVotantes = () => axios.get<Votante[]>(ENDPOINT);

export const getVotante = (id: number) => axios.get<Votante>(`${ENDPOINT}/${id}`);

export const crearVotante = (data: CreateVotante) =>
  axios.post<Votante>(ENDPOINT, data);

export const actualizarVotante = (id: number, data: CreateVotante) =>
  axios.put<void>(`${ENDPOINT}/${id}`, data);

export const eliminarVotante = (id: number) =>
  axios.delete<void>(`${ENDPOINT}/${id}`);
