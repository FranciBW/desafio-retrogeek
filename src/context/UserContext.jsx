import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const login = async (emailInput, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.error || "Error al iniciar sesión");

    setToken(data.token);
    setEmail(data.email);
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
  };

  const register = async (payload) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.error || "Error al registrarse");

    setToken(data.token);
    setEmail(data.email);
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  // opcional: validar token con /me (si falla, desloguea)
  useEffect(() => {
    const validate = async () => {
      if (!token) return;

      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) logout();
    };

    validate();
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, API_URL]);

  return (
    <UserContext.Provider value={{ token, email, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}