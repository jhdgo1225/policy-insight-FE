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
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
    passwordConfirm: "",
  });

  const [verificationStatus, setVerificationStatus] = useState({
    email: false,
    phone: false,
  });

  const [verificationCodes, setVerificationCodes] = useState({
    email: "",
    phone: "",
  });

  const [showVerification, setShowVerification] = useState({
    email: false,
    phone: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerificationCodeChange = (
    type: "email" | "phone",
    value: string
  ) => {
    setVerificationCodes((prev) => ({ ...prev, [type]: value }));
  };

  const handleSendVerification = (type: "email" | "phone") => {
    // TODO: 실제 인증 코드 발송 API 호출
    console.log(`${type} 인증 코드 발송`);
    setShowVerification((prev) => ({ ...prev, [type]: true }));
    alert(
      `${
        type === "email" ? "이메일" : "전화번호"
      }로 인증 코드가 발송되었습니다.`
    );
  };

  const handleVerifyCode = (type: "email" | "phone") => {
    // TODO: 실제 인증 코드 검증 API 호출
    const code = verificationCodes[type];
    if (code === "123456") {
      setVerificationStatus((prev) => ({ ...prev, [type]: true }));
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증 코드가 올바르지 않습니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 변경 시 검증
    if (formData.password) {
      if (formData.password !== formData.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      if (formData.password.length < 8) {
        alert("비밀번호는 최소 8자 이상이어야 합니다.");
        return;
      }
    }

    // 이메일 변경 시 인증 확인
    if (formData.email !== user?.email && !verificationStatus.email) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    // 전화번호 변경 시 인증 확인
    if (formData.phone !== user?.phone && !verificationStatus.phone) {
      alert("전화번호 인증을 완료해주세요.");
      return;
    }

    // TODO: 실제 업데이트 API 호출
    updateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    alert("프로필이 성공적으로 수정되었습니다.");
    router.push("/profile");
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="professional-container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">프로필 수정</h1>
            <p className="text-muted-foreground mt-2">
              회원 정보를 수정할 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>이름을 수정할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* 비밀번호 변경 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
                <CardDescription>
                  비밀번호를 변경하려면 새 비밀번호를 입력하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">새 비밀번호</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="새 비밀번호 (최소 8자)"
                  />
                  <p className="text-sm text-muted-foreground">
                    비밀번호를 변경하지 않으려면 비워두세요.
                  </p>
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                    <Input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      placeholder="비밀번호를 다시 입력하세요"
                      required={!!formData.password}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 이메일 변경 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>이메일 변경</CardTitle>
                <CardDescription>
                  이메일을 변경하려면 인증이 필요합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일을 입력하세요"
                      required
                      disabled={verificationStatus.email}
                    />
                    {formData.email !== user.email &&
                      !verificationStatus.email && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendVerification("email")}
                          className="gap-2 whitespace-nowrap">
                          <Mail className="h-4 w-4" />
                          인증 발송
                        </Button>
                      )}
                  </div>
                  {verificationStatus.email && (
                    <p className="text-sm text-green-600">✓ 인증 완료</p>
                  )}
                </div>

                {showVerification.email && !verificationStatus.email && (
                  <div className="space-y-2 p-4 bg-muted rounded-lg">
                    <Label htmlFor="emailCode">인증 코드</Label>
                    <div className="flex gap-2">
                      <Input
                        id="emailCode"
                        value={verificationCodes.email}
                        onChange={(e) =>
                          handleVerificationCodeChange("email", e.target.value)
                        }
                        placeholder="인증 코드를 입력하세요"
                      />
                      <Button
                        type="button"
                        onClick={() => handleVerifyCode("email")}
                        className="whitespace-nowrap">
                        확인
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      테스트 코드: 123456
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 전화번호 변경 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>전화번호 변경</CardTitle>
                <CardDescription>
                  전화번호를 변경하려면 인증이 필요합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="전화번호를 입력하세요"
                      required
                      disabled={verificationStatus.phone}
                    />
                    {formData.phone !== user.phone &&
                      !verificationStatus.phone && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendVerification("phone")}
                          className="gap-2 whitespace-nowrap">
                          <Phone className="h-4 w-4" />
                          인증 발송
                        </Button>
                      )}
                  </div>
                  {verificationStatus.phone && (
                    <p className="text-sm text-green-600">✓ 인증 완료</p>
                  )}
                </div>

                {showVerification.phone && !verificationStatus.phone && (
                  <div className="space-y-2 p-4 bg-muted rounded-lg">
                    <Label htmlFor="phoneCode">인증 코드</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phoneCode"
                        value={verificationCodes.phone}
                        onChange={(e) =>
                          handleVerificationCodeChange("phone", e.target.value)
                        }
                        placeholder="인증 코드를 입력하세요"
                      />
                      <Button
                        type="button"
                        onClick={() => handleVerifyCode("phone")}
                        className="whitespace-nowrap">
                        확인
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      테스트 코드: 123456
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Separator />

            {/* 버튼 영역 */}
            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={handleCancel}>
                취소
              </Button>
              <Button type="submit">저장</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
