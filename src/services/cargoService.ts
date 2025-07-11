import axios from "axios";
import type { Cargo } from "../models/Cargo";
import type { CreateCargo } from "../models/Dtos/CargoDto";

const API_ADMIN_URL = import.meta.env.VITE_API_ADMIN_URL || "http://localhost:5100/api";
const API_URL = `${API_ADMIN_URL}/cargoes`;

export const getCargos = async (): Promise<Cargo[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createCargo = async (data: CreateCargo): Promise<Cargo> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateCargo = async (
  id: number,
  data: CreateCargo
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const deleteCargo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getCargo = async (id: number): Promise<Cargo> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
