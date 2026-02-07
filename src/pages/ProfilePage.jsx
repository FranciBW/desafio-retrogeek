import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const API_URL = import.meta.env.VITE_API_URL;

 const { user, token } = useContext(UserContext);

 const fullName = `${user?.firstName ?? "Nombre"} ${user?.lastName ?? "Apellido"}`;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved);
  }, []);

  const handleClearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  const [myProducts, setMyProducts] = useState([]);
  const [loadingMyProducts, setLoadingMyProducts] = useState(true);

  useEffect(() => {
    const loadMyProducts = async () => {
      try {
        setLoadingMyProducts(true);

        if (!token) {
          setMyProducts([]);
          return;
        }

        const res = await fetch(`${API_URL}/api/products/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("Error /mine:", data);
          setMyProducts([]);
          return;
        }

        setMyProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setMyProducts([]);
      } finally {
        setLoadingMyProducts(false);
      }
    };

    loadMyProducts();
  }, [API_URL, token]);

  const handleDeleteProduct = async (productId) => {
    try {
      const ok = confirm("¿Eliminar esta publicación?");
      if (!ok) return;

      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data?.error || "No se pudo eliminar");
        return;
      }

      setMyProducts((prev) => prev.filter((p) => p.id !== productId));
      alert("Eliminado ✅");
    } catch (e) {
      console.error(e);
      alert("Error de conexión");
    }
  };

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
              {/* Info */}
              <div className="d-flex flex-column flex-md-row gap-3">
                <div className="flex-fill p-3 border rounded-4 bg-light">
                  <div className="text-muted small">Nombre y apellido</div>
                  <div className="fw-bold">{fullName}</div>
                </div>

                <div className="flex-fill p-3 border rounded-4 bg-light">
                  <div className="text-muted small">Correo</div>
                  <div className="fw-bold">{user?.email ?? "-"}</div>
                </div>
              </div>

              <div
                className="mt-4 p-4 border rounded-4"
                style={{ background: "#fafafa" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Mis compras</h5>

                  {orders.length > 0 && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleClearOrders}
                    >
                      Borrar historial (mock)
                    </button>
                  )}
                </div>

                {orders.length === 0 ? (
                  <p className="text-muted mt-2 mb-0">
                    Aún no tienes compras. (Mock: finaliza una compra desde el
                    carrito y se guardará aquí.)
                  </p>
                ) : (
                  <div className="mt-3 d-grid gap-3">
                    {orders.map((o) => (
                      <div key={o.id} className="border rounded-4 p-3 bg-white">
                        <div className="d-flex justify-content-between">
                          <div>
                            <div className="fw-bold">Orden {o.id}</div>
                            <small className="text-muted">Fecha: {o.date}</small>
                          </div>

                          <div className="text-end">
                            <div className="fw-bold">
                              ${Number(o.totalPrice).toLocaleString("es-CL")}
                            </div>
                            <small className="text-muted">
                              {o.totalItems} productos
                            </small>
                          </div>
                        </div>

                        <hr className="my-2" />

                        <div className="d-grid gap-2">
                          {o.items.map((it) => (
                            <div
                              key={`${o.id}-${it.id}`}
                              className="d-flex align-items-center gap-2"
                            >
                              <img
                                src={it.image}
                                alt={it.name}
                                style={{
                                  width: 46,
                                  height: 36,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                }}
                              />

                              <div className="flex-grow-1">
                                <div className="fw-semibold">{it.name}</div>
                                <small className="text-muted">
                                  {it.qty} x $
                                  {Number(it.price).toLocaleString("es-CL")}
                                </small>
                              </div>

                              <div className="fw-semibold">
                                ${(Number(it.price) * Number(it.qty)).toLocaleString(
                                  "es-CL"
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="mt-3 p-4 border rounded-4"
                style={{ background: "#fafafa" }}
              >
                <h5 className="mb-2">Mis publicaciones</h5>

                {loadingMyProducts ? (
                  <p className="text-muted m-0">Cargando publicaciones...</p>
                ) : myProducts.length === 0 ? (
                  <p className="text-muted m-0">
                    Aún no has publicado productos.
                  </p>
                ) : (
                  <div className="row g-3 mt-1">
                    {myProducts.map((p) => (
                      <div key={p.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card shadow-sm h-100">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="card-img-top"
                            style={{ height: 140, objectFit: "cover" }}
                          />

                          <div className="card-body d-flex flex-column">
                            <div className="fw-bold">{p.name}</div>
                            <div className="text-muted small">
                              {p.category} • {p.condition}
                            </div>

                            <div className="mt-2 fw-semibold">
                              ${Number(p.price).toLocaleString("es-CL")}
                            </div>

                            <div className="mt-auto d-flex gap-2 pt-3">
  <Link
    className="btn btn-outline-secondary btn-sm w-100"
    to={`/edit/${p.id}`}
    title="Editar publicación"
  >
    Editar
  </Link>

  <button
    className="btn btn-outline-danger btn-sm w-100"
    onClick={() => handleDeleteProduct(p.id)}
  >
    Eliminar
  </button>
</div>
                            
                              <button
                                className="btn btn-outline-danger btn-sm w-100"
                                onClick={() => handleDeleteProduct(p.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
