import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Interfaces
export interface UsuarioPayload {
  username: string;
  email: string;
  password?: string;
  role_id: number;
}

export interface UsuarioResponse {
  id: number;
  username: string;
  email: string;
  rol: string;
}

export const getUsuarios = (token: string) =>
  axios.get<UsuarioResponse[]>(`${API_URL}/usuarios/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const crearUsuario = (data: UsuarioPayload, token: string) =>
  axios.post<UsuarioResponse>(`${API_URL}/usuarios/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const actualizarUsuario = (id: number, data: UsuarioPayload, token: string) =>
  axios.put<UsuarioResponse>(`${API_URL}/usuarios/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const eliminarUsuario = (id: number, token: string) =>
  axios.delete(`${API_URL}/usuarios/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
