import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/useAuth";
import { loginUsuario } from "../../services/authService";

interface DecodedToken {
  rol: string;
  exp: number;
  [key: string]: unknown;
}

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUsuario(username, password);
      const token = data.access;

      login(token);
      const decoded: DecodedToken = JSON.parse(atob(token.split(".")[1]));

      console.log("Token decodificado:", decoded);
      const rol = decoded.rol?.toLowerCase();

      if (rol === "admin_padron") {
        navigate("/padron");
      } else if (rol === "super_admin") {
        navigate("/admin");
      } else {
        navigate("/unauthorized");
      }
    } catch (err: unknown) {
      setError("Credenciales incorrectas");
      if (axios.isAxiosError(err)) {
        console.error("Error al iniciar sesión:", err.response?.data || err.message);
      } else {
        console.error("Error inesperado al iniciar sesión:", err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mt-10 bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Iniciar Sesión
      </h2>

      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md"
      >
        Ingresar
      </button>
    </form>
  );
};

export default LoginForm;
