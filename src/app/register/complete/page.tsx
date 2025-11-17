"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { withGuest } from "@/components/auth/RouteGuard";

function RegisterComplete() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Policy Insight
          </h1>
          <p className="text-sm text-gray-600">회원가입</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-center mt-4 mb-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  3
                </div>
              </div>
            </div>
            <CardTitle className="text-center">회원가입 완료</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-semibold">
                Policy Insight 회원가입이 완료되었습니다!
              </p>
              <p className="text-sm text-gray-600">
                이제 서비스의 모든 기능을 이용하실 수 있습니다.
              </p>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => router.push("/dashboard")}>
              시작하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withGuest(RegisterComplete);
