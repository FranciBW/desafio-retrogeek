import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [API_URL]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["Todas", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category === "Todas" || p.category === category;

      const matchSearch = (p.name || "")
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const price = Number(p.price);
      const minOk = minPrice === "" || price >= Number(minPrice);
      const maxOk = maxPrice === "" || price <= Number(maxPrice);

      return matchCategory && matchSearch && minOk && maxOk;
    });
  }, [products, search, category, minPrice, maxPrice]);

  const handleReset = () => {
    setSearch("");
    setCategory("Todas");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-3">
        <aside className="col-12 col-md-3 col-lg-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Filtros</h5>

              <label className="form-label mt-2">Buscar</label>
              <input
                className="form-control"
                placeholder="Ej: Mario, PS1..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <label className="form-label mt-3">Categoría</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label className="form-label mt-3">Precio mínimo</label>
              <input
                className="form-control"
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <label className="form-label mt-3">Precio máximo</label>
              <input
                className="form-control"
                type="number"
                placeholder="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />

              <button
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={handleReset}
              >
                Limpiar
              </button>
            </div>
          </div>
        </aside>

        <main className="col-12 col-md-9 col-lg-10">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="mb-0">Retro Market</h2>
            <small className="text-muted">
              {loading ? "Cargando..." : `${filtered.length} publicaciones`}
            </small>
          </div>

          {loading ? (
            <div className="alert alert-secondary">Cargando productos...</div>
          ) : (
            <div className="row g-3">
              {filtered.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}