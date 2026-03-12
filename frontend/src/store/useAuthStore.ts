import { create } from "zustand";
import { persist } from "zustand/middleware";

// type Report = {
//   _id: string;
//   category: string;
//   urgency: string;
//   message: string;
//   sourceType: string;
//   imagePath: string | null;
//   createdAt: string;
// };
// type User = {
//   _id: string;
//   agentCode: string;
//   fullName: string;
//   SourceType: string;
//   role:string
//   createdAt: string;
// };

interface AuthState {
  user: { role: "admin" | "agent" } | null;
  // reports: Report[];
  // reportsAdmin: User[];
  loginUser: (role: "admin" | "agent") => void;
  logout: () => void;
  // setreports: (data: Report[]) => void;
  // setReportsAdmin: (data: User[]) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      // reports: [],
      // reportsAdmin: [],
      loginUser: (role) => set({ user: { role } }),
      logout: () => set({ user: null }),
      // setreports: (data) => set({ reports: data }),
      // setReportsAdmin: (data) => set({ reportsAdmin: data }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
