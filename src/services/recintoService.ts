import axios from "axios";
import type { Recinto } from "../models/Recinto";
import type { CreateRecinto } from "../models/Dtos/RecintoDto";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const API_URL = `${API_ADMIN_URL}/recintoes`;

export const getRecintos = async (): Promise<Recinto[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getRecinto = async (id: number): Promise<Recinto> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createRecinto = async (data: CreateRecinto): Promise<Recinto> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateRecinto = async (
  id: number,
  data: CreateRecinto
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const deleteRecinto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
