import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  getCsrfToken,
} from "@/lib/utils/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인증이 필요 없는 엔드포인트 목록
const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/signup",
  "/auth/id",
  "/auth/password/nologin",
  "/auth/csrf-token",
];

// 요청 인터셉터: Access Token과 CSRF Token을 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    // 인증이 필요 없는 엔드포인트는 토큰을 추가하지 않음
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    // GET 요청을 제외한 모든 요청에 CSRF 토큰 추가
    if (config.method && config.method.toUpperCase() !== "GET") {
      // CSRF 토큰 요청 엔드포인트는 제외
      if (!config.url?.includes("/auth/csrf-token")) {
        const csrfToken = getCsrfToken();
        if (csrfToken) {
          config.headers["X-XSRF-TOKEN"] = csrfToken;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 토큰 만료 시 갱신
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 인증이 필요 없는 엔드포인트는 토큰 갱신 시도하지 않음
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
      originalRequest.url?.includes(endpoint)
    );

    // 401 에러이고, 재시도하지 않은 요청이며, 인증이 필요한 엔드포인트일 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublicEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // 리프레시 토큰으로 새 액세스 토큰 요청
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // 새로운 토큰 저장
        setTokens(accessToken, newRefreshToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우 로그아웃 처리
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
