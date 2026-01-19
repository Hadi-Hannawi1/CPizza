import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
  addToCart: (item: MenuItem, size: 'junior' | 'senior' | 'mega', customizations: any) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (menuItem, size, customizations) => {
        const basePrice = 
          size === 'junior' ? menuItem.price_junior :
          size === 'senior' ? menuItem.price_senior : 
          menuItem.price_mega;

        // Calculate extra costs
        const extrasCost = customizations.extras.length * 1.50 + (customizations.base === 'Cheezy Crust' ? 2.50 : 0);
        const unitPrice = basePrice + extrasCost;

        const newItem: CartItem = {
          id: `${menuItem.id}-${size}-${Date.now()}`,
          menuItem,
          size,
          quantity: 1,
          customizations,
          totalPrice: unitPrice
        };

        set((state) => ({ items: [...state.items, newItem] }));
      },
      removeFromCart: (itemId) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== itemId) }));
      },
      updateQuantity: (itemId, delta) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              const newQuantity = Math.max(0, item.quantity + delta);
              return { ...item, quantity: newQuantity };
            }
            return item;
          }).filter(i => i.quantity > 0)
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
      },
      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'cpizza-cart',
    }
  )
);