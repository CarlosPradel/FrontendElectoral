import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});
