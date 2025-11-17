/**
 * 쿠키 유틸리티 함수
 * 브라우저에서 쿠키를 저장, 읽기, 삭제하는 함수들
 */

const COOKIE_OPTIONS = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

/**
 * 쿠키 설정
 */
export function setCookie(name: string, value: string, days: number = 7) {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  const cookieString = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `expires=${expires.toUTCString()}`,
    `path=${COOKIE_OPTIONS.path}`,
    COOKIE_OPTIONS.secure ? "secure" : "",
    `samesite=${COOKIE_OPTIONS.sameSite}`,
  ]
    .filter(Boolean)
    .join("; ");

  document.cookie = cookieString;
}

/**
 * 쿠키 읽기
 */
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const nameEQ = encodeURIComponent(name) + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i] || "";
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * 쿠키 삭제
 */
export function deleteCookie(name: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_OPTIONS.path};`;
}

/**
 * Access Token 저장
 */
export function setAccessToken(token: string) {
  // Access Token은 짧은 만료 시간 (1일)
  setCookie("accessToken", token, 1);
}

/**
 * Refresh Token 저장
 */
export function setRefreshToken(token: string) {
  // Refresh Token은 긴 만료 시간 (7일)
  setCookie("refreshToken", token, 7);
}

/**
 * 두 토큰 동시 저장
 */
export function setTokens(accessToken: string, refreshToken: string) {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

/**
 * Access Token 읽기
 */
export function getAccessToken(): string | null {
  return getCookie("accessToken");
}

/**
 * Refresh Token 읽기
 */
export function getRefreshToken(): string | null {
  return getCookie("refreshToken");
}

/**
 * 모든 토큰 삭제 (로그아웃 시)
 */
export function clearTokens() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("csrfToken");
}

/**
 * 토큰 존재 여부 확인
 */
export function hasTokens(): boolean {
  return !!(getAccessToken() && getRefreshToken());
}

/**
 * CSRF Token 저장
 */
export function setCsrfToken(token: string) {
  setCookie("csrfToken", token, 1); // 1일
}

/**
 * CSRF Token 읽기
 */
export function getCsrfToken(): string | null {
  return getCookie("csrfToken");
}
