import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/profile");
  };

  return (
    <div className="container py-4" style={{ maxWidth: 520 }}>
      <h1 className="mb-3">Ingresar</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <div>
              <label className="form-label">Correo</label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                type="email"
                required
              />
            </div>
            <div>
              <label className="form-label">Contraseña</label>
              <input
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Entrar
            </button>
            <small className="text-muted">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}