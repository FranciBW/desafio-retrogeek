import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function RegisterPage() {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await register({ firstName, lastName, email, password });

      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);

      navigate("/profile");
    } catch (error) {
      alert(error.message || "Error al registrarse");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 560 }}>
      <h1 className="mb-3 text-center">Registro</h1>
      <div className="card shadow-sm rounded-4">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <input
              className="form-control"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="form-control"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              className="form-control"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <input
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength={6}
            />
            <input
              className="form-control"
              placeholder="Confirmar contraseña"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              required
              minLength={6}
            />
            <button className="btn btn-warning fw-bold" type="submit">
              Registrar
            </button>
            <small className="text-muted text-center">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}
