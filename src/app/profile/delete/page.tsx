"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { withAuth } from "@/components/auth/RouteGuard";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

function DeleteAccountPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleContinue = () => {
    router.push("/profile/delete/verify");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="professional-container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">회원 탈퇴</h1>
            <p className="text-muted-foreground mt-2">
              회원 탈퇴를 진행하기 전에 아래 내용을 확인해주세요.
            </p>
          </div>

          <Card className="border-destructive">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive">
                  회원 탈퇴 안내
                </CardTitle>
              </div>
              <CardDescription>
                회원 탈퇴 시 다음 사항을 주의해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-destructive"></div>
                  </div>
                  <div>
                    <p className="font-medium">계정 정보 삭제</p>
                    <p className="text-sm text-muted-foreground">
                      회원 탈퇴 시 고객님의 모든 개인정보가 삭제되며, 삭제된
                      정보는 복구할 수 없습니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-destructive"></div>
                  </div>
                  <div>
                    <p className="font-medium">리포트 데이터 삭제</p>
                    <p className="text-sm text-muted-foreground">
                      작성하신 모든 리포트와 관련 데이터가 영구적으로
                      삭제됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-destructive"></div>
                  </div>
                  <div>
                    <p className="font-medium">재가입 제한</p>
                    <p className="text-sm text-muted-foreground">
                      탈퇴 후 동일한 이메일로 재가입하실 수 있지만, 기존
                      데이터는 복구되지 않습니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-destructive"></div>
                  </div>
                  <div>
                    <p className="font-medium">법령에 따른 정보 보관</p>
                    <p className="text-sm text-muted-foreground">
                      관련 법령에 따라 일부 정보는 일정 기간 보관될 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium mb-2">탈퇴 계정 정보</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">이메일:</span>{" "}
                      <span className="font-medium">{user.email}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground">이름:</span>{" "}
                      <span className="font-medium">{user.name}</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  위 내용을 모두 확인하셨다면 다음 단계로 진행하여 본인 인증을
                  완료해주세요.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleContinue}>
              계속 진행
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(DeleteAccountPage);
