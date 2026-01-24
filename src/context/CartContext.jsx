import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => String(i.id) === String(product.id));
      if (found) {
        return prev.map((i) =>
          String(i.id) === String(product.id) ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ];
    });
  };
  const increment = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        String(i.id) === String(id) ? { ...i, qty: i.qty + 1 } : i,
      ),
    );
  };
  const decrement = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        String(i.id) === String(id) ? { ...i, qty: Math.max(1, i.qty - 1) } : i,
      ),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => String(i.id) !== String(id)));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(
    () => cart.reduce((acc, i) => acc + i.qty, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, i) => acc + i.price * i.qty, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increment,
        decrement,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}