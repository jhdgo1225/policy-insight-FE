import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Policy Insight",
  description: "실시간 뉴스 분석을 통한 입법 수요 예측 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
