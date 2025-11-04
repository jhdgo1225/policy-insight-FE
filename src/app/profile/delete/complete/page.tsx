"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function DeleteAccountCompletePage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    // TODO: 실제 회원 탈퇴 API 호출
    console.log("회원 탈퇴 처리");
  }, []);

  const handleGoToMain = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="professional-container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Card className="w-full">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">
                  회원 탈퇴가 완료되었습니다
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  그동안 Policy Insight를 이용해 주셔서 감사합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium">탈퇴 처리 완료</p>
                    <p className="text-sm text-muted-foreground">
                      회원님의 계정과 관련된 모든 개인정보가 삭제되었습니다.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">데이터 삭제</p>
                    <p className="text-sm text-muted-foreground">
                      작성하신 리포트 및 관련 데이터가 모두 삭제되었습니다.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">재가입 안내</p>
                    <p className="text-sm text-muted-foreground">
                      언제든지 다시 가입하실 수 있습니다. 다만, 이전 데이터는
                      복구되지 않습니다.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">법령에 따른 정보 보관</p>
                    <p className="text-sm text-muted-foreground">
                      전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령에
                      따라 일부 정보는 일정 기간 보관될 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={handleGoToMain} className="w-full" size="lg">
                    메인으로 이동
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    더 나은 서비스로 다시 찾아뵙겠습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
