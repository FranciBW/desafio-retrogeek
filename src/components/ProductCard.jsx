import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: 180, objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{product.name}</h5>
        <small className="text-muted">
          {product.category} • {product.condition}
        </small>
        <div className="mt-2 fw-bold">
          ${product.price.toLocaleString("es-CL")}
        </div>
        <div className="mt-auto pt-3">
          <Link
            className="btn btn-primary w-100"
            to={`/products/${product.id}`}
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
