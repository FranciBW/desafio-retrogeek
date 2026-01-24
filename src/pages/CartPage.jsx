import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    increment,
    decrement,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="container py-4">
        <h1 className="mb-3">Carrito</h1>
        <p className="text-muted">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Carrito</h1>
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Vaciar carrito
        </button>
      </div>
      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="d-grid gap-3">
            {cart.map((item) => (
              <div key={item.id} className="card shadow-sm">
                <div className="card-body d-flex gap-3 align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 90,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <div className="flex-grow-1">
                    <div className="fw-bold">{item.name}</div>
                    <div className="text-muted">
                      ${item.price.toLocaleString("es-CL")}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => decrement(item.id)}
                    >
                      -
                    </button>
                    <span className="fw-bold">{item.qty}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => increment(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ width: 120 }} className="text-end fw-bold">
                    ${(item.price * item.qty).toLocaleString("es-CL")}
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItem(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Resumen</h5>
              <div className="d-flex justify-content-between">
                <span>Productos</span>
                <span className="fw-bold">{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Total</span>
                <span className="fw-bold">
                  ${totalPrice.toLocaleString("es-CL")}
                </span>
              </div>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={() =>
                  alert("Comprado (mock). Pago se implementa más adelante.")
                }
              >
                Continuar (mock)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
