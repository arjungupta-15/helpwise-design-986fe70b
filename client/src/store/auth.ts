import { create } from "zustand";

type Role = "employee" | "it";

type User = {
  id: string;
  role: Role;
};

type AuthState = {
  user: User | null;
  login: (identifier: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (identifier: string) => {
    const id = identifier.trim();
    const upper = id.toUpperCase();
    let role: Role = "employee";
    if (upper.startsWith("IT-")) role = "it";
    else if (upper.startsWith("EMP-")) role = "employee";
    // Map demo user ids to existing mock dataset
    const mappedId = role === "employee" ? "user-1" : "it-admin";
    set({ user: { id: mappedId, role } });
  },
  logout: () => set({ user: null }),
}));