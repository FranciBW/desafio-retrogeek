import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo2.png";

export default function Navbar() {
  const { token, logout } = useContext(UserContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="RetroGeek logo" />
        </Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav ms-auto gap-2 align-items-lg-center">
            {!token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Ingresar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Registrar
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create">
                    Publicar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    👤Perfil
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="btn btn-outline-warning btn-sm"
                    to="/cart"
                  >
                    🛒 Carrito {totalItems > 0 ? `(${totalItems})` : ""}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light btn-sm"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
