import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      const data = await res.json();

      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
    };

    loadProduct();
  }, [API_URL, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, description }),
    });

    alert("Producto actualizado");
    navigate("/profile");
  };

  return (
    <div className="container py-4" style={{ maxWidth: 500 }}>
      <h2>Editar producto</h2>

      <form onSubmit={handleSubmit} className="d-grid gap-3">
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-warning">Guardar cambios</button>
      </form>
    </div>
  );
}
