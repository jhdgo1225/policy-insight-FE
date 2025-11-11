import { create } from "zustand";

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  updateProfileImage: (image: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string) => {
    // 더미 로그인
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
    // 더미 회원가입
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
}));
