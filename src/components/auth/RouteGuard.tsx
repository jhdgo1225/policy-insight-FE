"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { hasTokens } from "@/lib/utils/cookies";

/**
 * 인증이 필요한 페이지를 보호하는 HOC
 * 비로그인 사용자는 로그인 페이지로 리다이렉트
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthProtectedComponent(props: P) {
    const router = useRouter();
    const { user } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      // hydration 완료 표시
      if (!isHydrated) {
        setIsHydrated(true);
        return;
      }

      // hydration 완료 후 인증 체크
      if (!user && !hasTokens()) {
        router.replace("/login");
      }
    }, [user, router, isHydrated]);

    // Hydration이 완료되지 않았거나 사용자가 없으면 아무것도 렌더링하지 않음
    if (!isHydrated || (!user && !hasTokens())) {
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * 비로그인 상태에서만 접근 가능한 페이지를 보호하는 HOC
 * 로그인 사용자는 대시보드로 리다이렉트
 */
export function withGuest<P extends object>(Component: React.ComponentType<P>) {
  return function GuestProtectedComponent(props: P) {
    const router = useRouter();
    const { user } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      // hydration 완료 표시
      if (!isHydrated) {
        setIsHydrated(true);
        return;
      }

      // hydration 완료 후 인증 체크
      if (user || hasTokens()) {
        router.replace("/dashboard");
      }
    }, [user, router, isHydrated]);

    // Hydration이 완료되지 않았으면 아무것도 렌더링하지 않음
    if (!isHydrated) {
      return null;
    }

    // 로그인 상태면 아무것도 렌더링하지 않음 (리다이렉트 중)
    if (user || hasTokens()) {
      return null;
    }

    return <Component {...props} />;
  };
}
