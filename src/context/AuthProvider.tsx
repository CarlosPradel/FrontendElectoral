import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext, type AuthContextType } from "./authContext";

interface DecodedToken {
  rol: string;
  exp: number;
  [key: string]: unknown;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(storedToken);
        console.log("Token cargado desde localStorage:", decoded);
        setToken(storedToken);
        setRole(decoded.rol);
      } catch (error) {
        console.error("Token inválido al cargar:", error);
        logout();
      }
    }
  }, []);

  const login = (newToken: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(newToken);
      console.log("Token al hacer login:", decoded);
      setToken(newToken);
      setRole(decoded.rol);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error("Token inválido en login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
  };

  const value: AuthContextType = useMemo(
    () => ({
      token,
      role,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
