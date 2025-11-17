import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileImage?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  updateProfileImage: (image: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      login: async (email: string) => {
        // 더미 로그인 (하위 호환성을 위해 유지)
        set({
          user: {
            id: "1",
            email,
            name: "홍길동",
            phone: "010-1234-5678",
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: async (userData) => {
        // 더미 회원가입 (하위 호환성을 위해 유지)
        set({
          user: {
            id: "1",
            email: userData.email || "",
            name: userData.name || "",
            phone: userData.phone || "",
          },
          isAuthenticated: true,
        });
      },
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      updateProfileImage: (image: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, profileImage: image } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
