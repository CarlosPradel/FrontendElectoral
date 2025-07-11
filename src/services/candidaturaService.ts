import axios from "axios";
import type { CandidaturaDto, CreateCandidatura } from "../models/Dtos/CantidaturaDto";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const ENDPOINT = `${API_ADMIN_URL}/candidaturas`;

// Obtener todas las candidaturas (GET)
export const getCandidaturas = async (): Promise<CandidaturaDto[]> => {
  const res = await axios.get<CandidaturaDto[]>(ENDPOINT);
  return res.data;
};

// Obtener una sola candidatura por ID (GET)
export const getCandidatura = async (id: number): Promise<CandidaturaDto> => {
  const res = await axios.get<CandidaturaDto>(`${ENDPOINT}/${id}`);
  return res.data;
};

// Crear una nueva candidatura (POST)
export const createCandidatura = async (data: CreateCandidatura): Promise<CandidaturaDto> => {
  const res = await axios.post<CandidaturaDto>(ENDPOINT, data);
  return res.data;
};

// Actualizar una candidatura existente (PUT)
export const updateCandidatura = async (id: number, data: CreateCandidatura): Promise<void> => {
  await axios.put(`${ENDPOINT}/${id}`, data);
};

// Eliminar una candidatura (DELETE)
export const deleteCandidatura = async (id: number): Promise<void> => {
  await axios.delete(`${ENDPOINT}/${id}`);
};
