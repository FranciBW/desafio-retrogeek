import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

export default function ProductDetailPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) {
          setProduct(null);
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error(e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [API_URL, id]);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-secondary">Cargando producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-4">
        <h1>No encontrado</h1>
        <p>El producto no existe.</p>
        <Link to="/" className="btn btn-outline-secondary">
          Volver
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!token) {
      alert("Primero tienes que iniciar sesión para agregar al carrito.");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert("Agregado al carrito ✅");
  };

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        ← Volver
      </Link>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{ maxHeight: 420, objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="mb-1">{product.name}</h2>
              <p className="text-muted mb-2">
                {product.category} • {product.condition}
              </p>
              <h3 className="mb-3">
                ${Number(product.price).toLocaleString("es-CL")}
              </h3>
              <p className="mb-4">{product.description}</p>

              <button className="btn btn-success" onClick={handleAddToCart}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}