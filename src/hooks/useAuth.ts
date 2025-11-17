"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import * as authApi from "@/lib/api/auth";
import { hasTokens, clearTokens, getCsrfToken } from "@/lib/utils/cookies";

/**
 * 인증 관련 커스텀 훅
 * 로그인, 로그아웃, 사용자 정보 관리를 담당
 */
export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();

  /**
   * CSRF 토큰이 없으면 자동으로 요청
   */
  useEffect(() => {
    const ensureCsrfToken = async () => {
      if (typeof window !== "undefined" && !getCsrfToken()) {
        try {
          await authApi.fetchCsrfToken();
        } catch (error) {
          console.error("Failed to fetch CSRF token:", error);
        }
      }
    };

    ensureCsrfToken();
  }, []);

  /**
   * 로그인 처리
   */
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authApi.login({ email, password });

        // 스토어에 사용자 정보 저장
        setUser({
          id: response.id.toString(),
          email: response.email,
          name: response.name,
          phone: response.phone,
          profileImage: response.image,
        });

        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        let errorMessage = "로그인에 실패했습니다.";
        if (error && typeof error === "object" && "response" in error) {
          const responseError = error as {
            response?: { data?: { error?: string } };
          };
          errorMessage = responseError.response?.data?.error || errorMessage;
        }
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [setUser]
  );

  /**
   * 로그아웃 처리
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 스토어 초기화
      clearUser();
      // 로그인 페이지로 리다이렉트
      router.push("/login");
    }
  }, [clearUser, router]);

  /**
   * 현재 사용자 정보 새로고침
   */
  const refreshUser = useCallback(async () => {
    try {
      if (!hasTokens()) {
        clearUser();
        return;
      }

      const userData = await authApi.getUserInfo();
      const userToSet = {
        id: user?.id || "", // 기존 ID 유지 (getUserInfo는 ID를 반환하지 않음)
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        profileImage: userData.image,
      };
      setUser(userToSet);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // 토큰이 유효하지 않으면 로그아웃
      clearTokens();
      clearUser();
    }
  }, [setUser, clearUser, user?.id]);

  /**
   * 인증 상태 확인
   */
  const checkAuth = useCallback(() => {
    return isAuthenticated && hasTokens();
  }, [isAuthenticated]);

  /**
   * 회원가입 처리
   */
  const signup = useCallback(async (data: authApi.SignupRequest) => {
    try {
      const response = await authApi.signup(data);
      return { success: true, message: response.message };
    } catch (error) {
      console.error("Signup failed:", error);
      let errorMessage = "회원가입에 실패했습니다.";
      if (error && typeof error === "object" && "response" in error) {
        const responseError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage = responseError.response?.data?.error || errorMessage;
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, []);

  /**
   * 아이디 찾기
   */
  const findId = useCallback(async (email: string) => {
    try {
      const response = await authApi.findId({ email });
      return { success: true, id: response.id };
    } catch (error) {
      console.error("Find ID failed:", error);
      let errorMessage = "아이디를 찾을 수 없습니다.";
      if (error && typeof error === "object" && "response" in error) {
        const responseError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage = responseError.response?.data?.error || errorMessage;
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, []);

  /**
   * 비밀번호 변경 (로그인 안 한 상태)
   */
  const changePasswordNoLogin = useCallback(
    async (id: string, password: string) => {
      try {
        const response = await authApi.changePasswordNoLogin({ id, password });
        return { success: true, message: response.message };
      } catch (error) {
        console.error("Change password failed:", error);
        let errorMessage = "비밀번호 변경에 실패했습니다.";
        if (error && typeof error === "object" && "response" in error) {
          const responseError = error as {
            response?: { data?: { error?: string } };
          };
          errorMessage = responseError.response?.data?.error || errorMessage;
        }
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    []
  );

  /**
   * 로그인 상태에서 비밀번호 인증
   */
  const verifyPasswordLogin = useCallback(async (password: string) => {
    try {
      const response = await authApi.verifyPasswordLogin({ password });
      return {
        success: true,
        title: response.title,
        date: response.date,
      };
    } catch (error) {
      console.error("Password verification failed:", error);
      let errorMessage = "비밀번호 인증에 실패했습니다.";
      if (error && typeof error === "object" && "response" in error) {
        const responseError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage = responseError.response?.data?.error || errorMessage;
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, []);

  /**
   * 사용자 정보 수정 (프로필 이미지, 전화번호)
   */
  const updateUserInfo = useCallback(
    async (data: { image?: string; phone?: string }) => {
      try {
        const response = await authApi.updateUserInfo(data);

        // 스토어 업데이트
        setUser({
          id: user?.id || "",
          email: response.email,
          name: response.name,
          phone: response.phone,
          profileImage: response.image,
        });

        return { success: true };
      } catch (error) {
        console.error("Update user info failed:", error);
        let errorMessage = "정보 수정에 실패했습니다.";
        if (error && typeof error === "object" && "response" in error) {
          const responseError = error as {
            response?: { data?: { error?: string } };
          };
          errorMessage = responseError.response?.data?.error || errorMessage;
        }
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [setUser, user?.id]
  );

  /**
   * 회원 탈퇴
   */
  const deleteAccount = useCallback(async () => {
    try {
      const response = await authApi.deleteAccount();

      // 스토어 초기화
      clearUser();

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      console.error("Delete account failed:", error);
      let errorMessage = "회원 탈퇴에 실패했습니다.";
      if (error && typeof error === "object" && "response" in error) {
        const responseError = error as {
          response?: { data?: { error?: string } };
        };
        errorMessage = responseError.response?.data?.error || errorMessage;
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, [clearUser]);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    checkAuth,
    signup,
    findId,
    changePasswordNoLogin,
    verifyPasswordLogin,
    updateUserInfo,
    deleteAccount,
  };
}
