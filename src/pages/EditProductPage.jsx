import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function EditProductPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    condition: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // ✅ ideal: endpoint público GET /api/products/:id
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          alert(data?.error || "No se pudo cargar el producto");
          navigate("/profile");
          return;
        }

        setForm({
          name: data.name ?? "",
          price: data.price ?? "",
          category: data.category ?? "",
          condition: data.condition ?? "",
          image: data.image ?? "",
          description: data.description ?? "",
        });
      } catch (e) {
        console.error(e);
        alert("Error de conexión");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [API_URL, id, navigate]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          category: form.category,
          condition: form.condition,
          image: form.image,
          description: form.description,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data?.error || "No se pudo actualizar");
        return;
      }

      alert("Producto actualizado ✅");
      navigate("/profile");
    } catch (e) {
      console.error(e);
      alert("Error de conexión");
    }
  };

  if (loading) return <div className="container py-4">Cargando...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: 560 }}>
      <h1 className="mb-3 text-center">Editar producto</h1>

      <div className="card shadow-sm rounded-4">
        <div className="card-body p-4">
          <form onSubmit={onSubmit} className="d-grid gap-3">
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Nombre"
              required
            />

            <input
              className="form-control"
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              placeholder="Precio"
              required
              min={0}
            />

            <input
              className="form-control"
              name="category"
              value={form.category}
              onChange={onChange}
              placeholder="Categoría"
              required
            />

            <input
              className="form-control"
              name="condition"
              value={form.condition}
              onChange={onChange}
              placeholder="Condición"
              required
            />

            <input
              className="form-control"
              name="image"
              value={form.image}
              onChange={onChange}
              placeholder="URL imagen"
              required
            />

            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Descripción"
              rows={4}
              required
            />

            <button className="btn btn-warning fw-bold" type="submit">
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
