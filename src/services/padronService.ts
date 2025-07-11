import axios from "axios";

const API_URL = "http://127.0.0.1:8001/api";

// Obtener todos los votantes
export const getVotantes = (token: string) =>
  axios.get(`${API_URL}/votantes/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const crearVotante = (data: FormData, token: string) =>
  axios.post(`${API_URL}/votantes/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  export const getRecintos = (token: string) =>
  axios.get(`${API_URL}/recintos/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const crearRecinto = (data: FormData, token: string) =>
  axios.post(`${API_URL}/recintos/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const actualizarRecinto = (
  id: number,
  data: FormData,
  token: string
) =>
  axios.put(`${API_URL}/recintos/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const eliminarRecinto = (id: number, token: string) =>
  axios.delete(`${API_URL}/recintos/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Actualizar votante por ID (UUID)
export const actualizarVotante = (
  id: string,
  data: FormData,
  token: string
) =>
  axios.put(`${API_URL}/votantes/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

// Eliminar votante por ID
export const eliminarVotante = (id: string, token: string) =>
  axios.delete(`${API_URL}/votantes/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Verificación pública de un votante por CI
export const verificarVotantePorCI = (ci: string) =>
  axios.get(`${API_URL}/verificar/${ci}/`);
