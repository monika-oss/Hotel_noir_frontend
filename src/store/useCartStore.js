import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addToCart: (item) => {
    set((state) => {
      const existing = state.cart.find(i => i._id === item._id);
      if (existing) {
        return { cart: state.cart.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    });
  },
  removeFromCart: (id) => {
    set((state) => ({ cart: state.cart.filter(i => i._id !== id) }));
  },
  updateQuantity: (id, qty) => {
    if (qty < 1) return get().removeFromCart(id);
    set((state) => ({ cart: state.cart.map(i => i._id === id ? { ...i, quantity: qty } : i) }));
  },
  clearCart: () => set({ cart: [], isOpen: false }),
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));

export default useCartStore;
