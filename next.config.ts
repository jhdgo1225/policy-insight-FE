import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Next.js 16 최적화 설정
  reactStrictMode: true,

  // Turbopack 설정 (Next.js 16 기본값)
  turbopack: {
    rules: {
      "*.svg": {
        as: "*.js",
        loaders: ["@svgr/webpack"],
      },
    },
  },

  // 이미지 최적화 설정
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Next.js 16에서 이동된 설정들
  serverExternalPackages: [],
  typedRoutes: true,

  // 실험적 기능들 (Next.js 16 호환)
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // 성능 최적화
  poweredByHeader: false,
  compress: true,

  // 환경 변수 설정
  env: {
    NEXT_TELEMETRY_DISABLED: "1",
  },
};

module.exports = nextConfig;
