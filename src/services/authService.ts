import axios from "axios";

const API_AUTH = import.meta.env.VITE_API_AUTH_URL || "http://localhost:8000/api";

export const loginUsuario = async (username: string, password: string) => {
  const response = await axios.post(`${API_AUTH}/login/`, {
    username,
    password,
  });
  return response.data;
};
