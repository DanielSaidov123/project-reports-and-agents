import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { role: "admin" | "agent" } | null;
  loginUser: (role: "admin" | "agent") => void;
  logout: () => void;
} 

export const useAuthStore = create<AuthState>()(persist((set) => ({
      user: null,
      loginUser: (role) => set({ user: { role } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', 
    }
  )
);
