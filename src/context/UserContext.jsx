import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const login = async (emailInput, password) => {
    if (!emailInput || !password) throw new Error("Faltan credenciales");

    const mockToken = "mock-jwt-token";
    setToken(mockToken);
    setEmail(emailInput);
    localStorage.setItem("token", mockToken);
    localStorage.setItem("email", emailInput);
  };

  const register = async (payload) => {
    if (!payload?.email || !payload?.password) throw new Error("Faltan datos");

    const mockToken = "mock-jwt-token";
    setToken(mockToken);
    setEmail(payload.email);
    localStorage.setItem("token", mockToken);
    localStorage.setItem("email", payload.email);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  useEffect(() => {
    if (!token) return;
  }, [token]);

  return (
    <UserContext.Provider value={{ token, email, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}