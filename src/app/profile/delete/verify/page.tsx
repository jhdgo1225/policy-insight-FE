"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, CheckCircle } from "lucide-react";

export default function DeleteAccountVerifyPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [verificationType, setVerificationType] = useState<"email" | "phone">(
    "email"
  );
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleCancel = () => {
    router.push("/profile/delete");
  };

  const handleSendCode = () => {
    // TODO: 실제 인증 코드 발송 API 호출
    const target = verificationType === "email" ? user?.email : user?.phone;
    console.log(`${verificationType} 인증 코드 발송:`, target);
    setIsCodeSent(true);
    alert(
      `${
        verificationType === "email" ? "이메일" : "전화번호"
      }로 인증 코드가 발송되었습니다.`
    );
  };

  const handleVerifyCode = () => {
    // TODO: 실제 인증 코드 검증 API 호출
    if (verificationCode === "123456") {
      setIsVerified(true);
      alert("본인 인증이 완료되었습니다.");
    } else {
      alert("인증 코드가 올바르지 않습니다.");
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
              <Tabs
                defaultValue="email"
                value={verificationType}
                onValueChange={(value) => {
                  setVerificationType(value as "email" | "phone");
                  setIsCodeSent(false);
                  setIsVerified(false);
                  setVerificationCode("");
                }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="gap-2">
                    <Mail className="h-4 w-4" />
                    이메일 인증
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="gap-2">
                    <Phone className="h-4 w-4" />
                    전화번호 인증
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4 mt-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">인증 이메일</p>
                    <p className="text-base">{user.email}</p>
                  </div>

                  {!isCodeSent ? (
                    <Button onClick={handleSendCode} className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      인증 코드 발송
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="emailCode">인증 코드</Label>
                        <Input
                          id="emailCode"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="인증 코드 6자리를 입력하세요"
                          maxLength={6}
                          disabled={isVerified}
                        />
                        <p className="text-sm text-muted-foreground">
                          이메일로 발송된 6자리 인증 코드를 입력하세요.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          테스트 코드: 123456
                        </p>
                      </div>

                      {!isVerified ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={handleSendCode}
                            className="flex-1">
                            재발송
                          </Button>
                          <Button
                            onClick={handleVerifyCode}
                            className="flex-1"
                            disabled={verificationCode.length !== 6}>
                            확인
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">
                            인증이 완료되었습니다.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="phone" className="space-y-4 mt-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">인증 전화번호</p>
                    <p className="text-base">{user.phone}</p>
                  </div>

                  {!isCodeSent ? (
                    <Button onClick={handleSendCode} className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      인증 코드 발송
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phoneCode">인증 코드</Label>
                        <Input
                          id="phoneCode"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="인증 코드 6자리를 입력하세요"
                          maxLength={6}
                          disabled={isVerified}
                        />
                        <p className="text-sm text-muted-foreground">
                          SMS로 발송된 6자리 인증 코드를 입력하세요.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          테스트 코드: 123456
                        </p>
                      </div>

                      {!isVerified ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={handleSendCode}
                            className="flex-1">
                            재발송
                          </Button>
                          <Button
                            onClick={handleVerifyCode}
                            className="flex-1"
                            disabled={verificationCode.length !== 6}>
                            확인
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">
                            인증이 완료되었습니다.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={!isVerified}>
              회원 탈퇴 진행
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
