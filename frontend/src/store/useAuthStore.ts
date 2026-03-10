import { create } from "zustand";
import { persist } from "zustand/middleware";

type Report = {
  id: string;
  category: string;
  urgency: string;
  message : string,
  sourceType : string
};

interface AuthState {
  user: { role: "admin" | "agent" } | null;
  reports: Report[];
  loginUser: (role: "admin" | "agent") => void;
  logout: () => void;
  setreports: (data: Report[]) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      reports: [],
      loginUser: (role) => set({ user: { role } }),
      logout: () => set({ user: null }),
      setreports: (data) => set({ reports: data }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
