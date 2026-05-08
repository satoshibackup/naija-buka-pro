import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            cart: currentCart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cart: [...currentCart, { ...item, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((i) => i.id !== id) });
      },
      updateQuantity: (id, delta) => {
        set({
          cart: get().cart
            .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
            .filter((i) => i.quantity > 0),
        });
      },
      clearCart: () => set({ cart: [] }),
      getTotal: () => {
        return get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'naija-buka-cart',
    }
  )
);
