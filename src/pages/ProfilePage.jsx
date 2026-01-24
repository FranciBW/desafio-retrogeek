import { useContext, useMemo } from "react";
import { UserContext } from "../context/UserContext";

export default function ProfilePage() {
  const { email } = useContext(UserContext);

  const fullName = useMemo(() => {
    const first = localStorage.getItem("firstName") || "Nombre";
    const last = localStorage.getItem("lastName") || "Apellido";
    return `${first} ${last}`;
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Perfil</h1>
      <div className="card shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-3 text-center">
              <div
                className="border rounded-4 d-flex align-items-center justify-content-center mx-auto"
                style={{ width: 160, height: 160, background: "#f3f3f3" }}
              >
                Imagen
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="d-flex flex-column flex-md-row gap-3">
                <div className="flex-fill p-3 border rounded-4 bg-light">
                  <div className="text-muted small">Nombre y apellido</div>
                  <div className="fw-bold">{fullName}</div>
                </div>
                <div className="flex-fill p-3 border rounded-4 bg-light">
                  <div className="text-muted small">Correo</div>
                  <div className="fw-bold">{email}</div>
                </div>
              </div>
              <div
                className="mt-4 p-4 border rounded-4"
                style={{ background: "#fafafa" }}
              >
                <h5 className="mb-2">Mis compras</h5>
                <p className="text-muted m-0">
                  Aquí después mostraremos compras reales cuando exista backend.
                </p>
              </div>
              <div
                className="mt-3 p-4 border rounded-4"
                style={{ background: "#fafafa" }}
              >
                <h5 className="mb-2">Mis publicaciones</h5>
                <p className="text-muted m-0">
                  podrás editar/eliminar tus publicaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
