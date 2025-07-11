import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, role, token } = useAuth();

  if (token === null) {
    return <div className="text-center mt-10 text-gray-500">Cargando...</div>;
  }

  if (!isAuthenticated) {
    console.warn("Redirigiendo a /login: usuario no autenticado");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role || "")) {
    console.warn("Redirigiendo a /unauthorized: rol no permitido");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
