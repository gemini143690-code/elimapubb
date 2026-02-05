import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  likedBooks: string[]; // array of book IDs
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  register: (name: string, email: string, password: string) => void; // Mock register
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      register: (name, email) => {
        // Mock registration logic handled in component usually, but here we can just auto-login
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: 'user', // Default role
          likedBooks: [],
        };
        set({ user: newUser, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
