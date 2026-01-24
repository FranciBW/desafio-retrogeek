import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProductPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("PlayStation");
  const [condition, setCondition] = useState("Usado");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      category,
      condition,
      price: Number(price),
      quantity: Number(quantity),
      image,
      description,
    };

    console.log("PUBLICACIÓN (mock):", newProduct);
    alert("Publicación creada (mock). Más adelante se guardará en backend.");
    navigate("/profile");
  };

  return (
    <div className="container py-4" style={{ maxWidth: 720 }}>
      <h1 className="mb-3">Crear publicación</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                placeholder="Ej: Crash Bandicoot (PS1)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>PlayStation</option>
                <option>Nintendo</option>
                <option>SEGA</option>
                <option>Arcade</option>
                <option>PC</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option>Nuevo</option>
                <option>Usado</option>
                <option>Colección</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">Precio (CLP)</label>
              <input
                className="form-control"
                type="number"
                placeholder="15000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">Cantidad</label>
              <input
                className="form-control"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">URL Imagen</label>
              <input
                className="form-control"
                placeholder="https://..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el producto..."
              />
            </div>
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-success" type="submit">
                Publicar (mock)
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}