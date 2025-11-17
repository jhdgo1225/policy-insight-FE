"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { withGuest } from "@/components/auth/RouteGuard";

function RegisterStep2() {
  const [formData, setFormData] = useState({
    email: "",
    emailCode: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
    phoneCode: "",
  });
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signup } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailVerification = () => {
    // 인증번호 발송 (실제 API는 나중에 구현)
    setEmailCodeSent(true);
    alert("이메일 인증번호가 발송되었습니다.");
  };

  const handlePhoneVerification = () => {
    // 인증번호 발송 (실제 API는 나중에 구현)
    setPhoneCodeSent(true);
    alert("전화번호 인증번호가 발송되었습니다.");
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. 비밀번호 일치 확인
    if (formData.password !== formData.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 2. 비밀번호 유효성 검사 (8자 이상, 영문, 숫자, 특수문자 포함)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."
      );
      return;
    }

    // 3. 이메일 인증번호 6자리 확인
    if (!emailCodeSent || formData.emailCode.length !== 6) {
      setError("이메일 인증번호 6자리를 입력해주세요.");
      return;
    }

    // 4. 전화번호 인증번호 6자리 확인
    if (!phoneCodeSent || formData.phoneCode.length !== 6) {
      setError("전화번호 인증번호 6자리를 입력해주세요.");
      return;
    }

    // 5. 전화번호 형식 확인 (숫자만, 10-11자리)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("올바른 전화번호 형식이 아닙니다. (숫자만 10-11자리)");
      return;
    }

    setIsLoading(true);

    try {
      // API 호출
      const result = await signup({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.success) {
        // 성공 시 회원가입 완료 페이지로 이동
        router.push("/register/complete");
      } else {
        // 실패 시 에러 메시지 표시
        setError(result.error || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-2xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Policy Insight
          </h1>
          <p className="text-sm text-gray-600">회원가입</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">정보 입력</CardTitle>
            <CardDescription className="text-center">
              회원 정보를 입력해 주세요
            </CardDescription>
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                  3
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">이메일 *</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailVerification}
                    disabled={!formData.email || isLoading}>
                    인증번호 발송
                  </Button>
                </div>
              </div>

              {emailCodeSent && (
                <div className="space-y-2">
                  <Label htmlFor="emailCode">이메일 인증번호 *</Label>
                  <Input
                    id="emailCode"
                    name="emailCode"
                    type="text"
                    placeholder="인증번호 6자리"
                    value={formData.emailCode}
                    onChange={handleInputChange}
                    maxLength={6}
                    required
                    disabled={isLoading}
                    autoComplete="one-time-code"
                  />
                  <p className="text-xs text-muted-foreground">
                    6자리 숫자를 입력하세요
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호 *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">비밀번호 확인 *</Label>
                <Input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">전화번호 *</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="01012345678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    autoComplete="tel"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePhoneVerification}
                    disabled={!formData.phone || isLoading}>
                    인증번호 발송
                  </Button>
                </div>
              </div>

              {phoneCodeSent && (
                <div className="space-y-2">
                  <Label htmlFor="phoneCode">전화번호 인증번호 *</Label>
                  <Input
                    id="phoneCode"
                    name="phoneCode"
                    type="text"
                    placeholder="인증번호 6자리"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                    maxLength={6}
                    required
                    disabled={isLoading}
                    autoComplete="one-time-code"
                  />
                  <p className="text-xs text-muted-foreground">
                    6자리 숫자를 입력하세요
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                  disabled={isLoading}>
                  이전
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "가입 중..." : "회원가입"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withGuest(RegisterStep2);
