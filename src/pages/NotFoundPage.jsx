import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-2">404</h1>
      <p className="text-muted">La ruta no existe.</p>
      <Link to="/" className="btn btn-outline-primary">
        Volver al Home
      </Link>
    </div>
  );
}