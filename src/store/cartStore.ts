import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book } from '@/data/books';

export interface CartItem extends Book {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (book) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === book.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === book.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...book, quantity: 1 }] };
        }),
      removeFromCart: (bookId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== bookId),
        })),
      updateQuantity: (bookId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === bookId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
