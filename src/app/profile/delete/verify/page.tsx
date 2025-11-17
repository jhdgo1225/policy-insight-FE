"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, CheckCircle } from "lucide-react";

function DeleteAccountVerifyPage() {
  const router = useRouter();
  const { user, verifyPasswordLogin } = useAuth();

  const [verificationType, setVerificationType] =
    useState<"password">("password");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleCancel = () => {
    router.push("/profile/delete");
  };

  const handleVerifyPassword = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await verifyPasswordLogin(password);
      if (result.success) {
        setIsVerified(true);
        alert("본인 인증이 완료되었습니다.");
      } else {
        setError(result.error || "비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("인증 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!isVerified) {
      alert("본인 인증을 완료해주세요.");
      return;
    }
    router.push("/profile/delete/complete");
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
            <h1 className="text-3xl font-bold">본인 인증</h1>
            <p className="text-muted-foreground mt-2">
              회원 탈퇴를 위해 본인 인증이 필요합니다.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>인증 방법 선택</CardTitle>
              <CardDescription>
                이메일 또는 전화번호로 본인 인증을 진행해주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-4 mt-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-1">비밀번호 확인</p>
                  <p className="text-sm text-muted-foreground">
                    회원 탈퇴를 진행하려면 비밀번호를 입력해주세요.
                  </p>
                </div>

                {!isVerified ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">비밀번호</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        disabled={isLoading}
                      />
                    </div>

                    <Button
                      onClick={handleVerifyPassword}
                      className="w-full"
                      disabled={!password || isLoading}>
                      {isLoading ? "확인 중..." : "확인"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">인증이 완료되었습니다.</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}>
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={!isVerified || isLoading}>
              회원 탈퇴 진행
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(DeleteAccountVerifyPage);
