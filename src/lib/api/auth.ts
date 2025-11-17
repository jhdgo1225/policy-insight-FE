import apiClient from "./client";
import {
  setTokens,
  clearTokens,
  getRefreshToken,
  setCsrfToken,
} from "@/lib/utils/cookies";

/**
 * 로그인 API 요청/응답 타입
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
  image: string;
  phone: string;
}

/**
 * 회원가입 API 요청 타입
 */
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
}

/**
 * 회원가입 응답 타입
 */
export interface SignupResponse {
  message: string;
}

/**
 * 토큰 새로고침 응답 타입
 */
export interface RefreshResponse {
  accessToken: string;
}

/**
 * 아이디 찾기 요청 타입
 */
export interface FindIdRequest {
  email: string;
}

/**
 * 아이디 찾기 응답 타입
 */
export interface FindIdResponse {
  id: string;
}

/**
 * 비밀번호 변경 요청 타입
 */
export interface ChangePasswordRequest {
  id: string;
  password: string;
}

/**
 * 비밀번호 로그인 요청 타입
 */
export interface PasswordLoginRequest {
  password: string;
}

/**
 * CSRF 토큰 응답 타입
 */
export interface CsrfTokenResponse {
  token: string;
}

/**
 * CSRF 토큰 요청
 * 서버에서 32바이트 URL-safe 랜덤 토큰을 받아옵니다.
 */
export const fetchCsrfToken = async (): Promise<string> => {
  const response = await apiClient.get<CsrfTokenResponse>("/auth/csrf-token");
  const { token } = response.data;

  // CSRF 토큰 쿠키에 저장
  setCsrfToken(token);

  return token;
};

/**
 * 비밀번호 로그인 응답 타입
 */
export interface PasswordLoginResponse {
  title: string;
  date: string;
}

/**
 * 사용자 정보 타입
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileImage?: string;
}

/**
 * 사용자 정보 응답 타입 (GET /api/v1/user/me)
 */
export interface UserInfoResponse {
  email: string;
  name: string;
  image: string;
  phone: string;
}

/**
 * 사용자 정보 수정 요청 타입 (PUT /api/v1/user/me)
 */
export interface UpdateUserRequest {
  image?: string;
  phone?: string;
}

/**
 * 로그인
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

    // 토큰을 쿠키에 저장
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * 로그아웃
 */
export async function logout(): Promise<void> {
  try {
    // 서버에 로그아웃 요청 (선택사항)
    await apiClient.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // 로컬 토큰 삭제
    clearTokens();
  }
}

/**
 * 토큰 갱신 (레거시 - 호환성 유지)
 * @deprecated refreshToken() 사용 권장
 */
export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  try {
    const response = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
    }>(
      "/auth/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    // 새로운 토큰을 쿠키에 저장
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setTokens(accessToken, newRefreshToken);

    return response.data;
  } catch (error) {
    console.error("Token refresh error:", error);
    clearTokens();
    throw error;
  }
}

/**
 * 현재 사용자 정보 조회 (레거시 - 호환성 유지)
 * @deprecated getUserInfo() 사용 권장
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
}

/**
 * 내 정보 조회
 * GET /api/v1/user/me
 * Authorization 헤더에 액세스 토큰 필요
 */
export async function getUserInfo(): Promise<UserInfoResponse> {
  try {
    const response = await apiClient.get<UserInfoResponse>("/user/me");
    return response.data;
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
}

/**
 * 내 정보 수정
 * PUT /api/v1/user/me
 * Authorization 헤더에 액세스 토큰 필요
 */
export async function updateUserInfo(
  data: UpdateUserRequest
): Promise<UserInfoResponse> {
  try {
    const response = await apiClient.put<UserInfoResponse>("/user/me", data);
    return response.data;
  } catch (error) {
    console.error("Update user info error:", error);
    throw error;
  }
}

/**
 * 회원 탈퇴
 * DELETE /api/v1/user/me
 * Authorization 헤더에 액세스 토큰 필요
 */
export async function deleteAccount(): Promise<{ message: string }> {
  try {
    const response = await apiClient.delete<{ message: string }>("/user/me");

    // 회원 탈퇴 성공 시 토큰 삭제
    clearTokens();

    return response.data;
  } catch (error) {
    console.error("Delete account error:", error);
    throw error;
  }
}

/**
 * 회원가입
 * POST /api/v1/auth/signup
 */
export async function signup(data: SignupRequest): Promise<SignupResponse> {
  try {
    const response = await apiClient.post<SignupResponse>("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

/**
 * 토큰 새로고침
 * POST /api/v1/auth/refresh
 * Authorization 헤더에 액세스 토큰 필요
 */
export async function refreshToken(): Promise<RefreshResponse> {
  try {
    const response = await apiClient.post<RefreshResponse>("/auth/refresh");

    // 새로운 액세스 토큰을 쿠키에 저장
    const { accessToken } = response.data;
    const currentRefreshToken = getRefreshToken();
    if (currentRefreshToken) {
      setTokens(accessToken, currentRefreshToken);
    }

    return response.data;
  } catch (error) {
    console.error("Token refresh error:", error);
    clearTokens();
    throw error;
  }
}

/**
 * 아이디 찾기
 * POST /api/v1/auth/id
 */
export async function findId(data: FindIdRequest): Promise<FindIdResponse> {
  try {
    const response = await apiClient.post<FindIdResponse>("/auth/id", data);
    return response.data;
  } catch (error) {
    console.error("Find ID error:", error);
    throw error;
  }
}

/**
 * 비밀번호 변경
 * PUT /api/v1/auth/password/nologin
 */
export async function changePasswordNoLogin(
  data: ChangePasswordRequest
): Promise<{ message: string }> {
  try {
    const response = await apiClient.put<{ message: string }>(
      "/auth/password/nologin",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
}

/**
 * 로그인 상태에서 비밀번호로 인증
 * PUT /api/v1/auth/password/login
 * Authorization 헤더에 액세스 토큰 필요
 */
export async function verifyPasswordLogin(
  data: PasswordLoginRequest
): Promise<PasswordLoginResponse> {
  try {
    const response = await apiClient.put<PasswordLoginResponse>(
      "/auth/password/login",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Password login verification error:", error);
    throw error;
  }
}
