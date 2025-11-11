"use client";

import { useState, useEffect, useRef } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Phone } from "lucide-react";

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, updateUser, updateProfileImage } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const [profileImagePreview, setProfileImagePreview] = useState<
    string | undefined
  >(user?.profileImage);

  const [verificationStatus, setVerificationStatus] = useState({
    phone: false,
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일인지 확인
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 확인 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImagePreview(result);
        updateProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendVerification = () => {
    // TODO: 실제 인증 코드 발송 API 호출
    console.log("전화번호 인증 코드 발송");
    setShowVerification(true);
    alert("전화번호로 인증 코드가 발송되었습니다.");
  };

  const handleVerifyCode = () => {
    // TODO: 실제 인증 코드 검증 API 호출
    if (verificationCode === "123456") {
      setVerificationStatus({ phone: true });
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증 코드가 올바르지 않습니다.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 변경 시 검증
    if (formData.newPassword) {
      // 현재 비밀번호 확인
      if (!formData.currentPassword) {
        alert("현재 비밀번호를 입력해주세요.");
        return;
      }

      // 새 비밀번호 검증
      if (formData.newPassword.length < 8) {
        alert("새 비밀번호는 최소 8자 이상이어야 합니다.");
        return;
      }

      // 새 비밀번호 확인
      if (formData.newPassword !== formData.newPasswordConfirm) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }

      // TODO: 실제 비밀번호 변경 API 호출
      console.log("비밀번호 변경");
    }

    // 전화번호 변경 시 인증 확인
    if (formData.phone !== user?.phone && !verificationStatus.phone) {
      alert("전화번호 인증을 완료해주세요.");
      return;
    }

    // TODO: 실제 업데이트 API 호출
    updateUser({
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
                <CardDescription>
                  프로필 사진을 변경할 수 있습니다. 이메일과 이름은 변경할 수
                  없습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 프로필 사진 */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileImagePreview} />
                      <AvatarFallback className="text-2xl">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                      onClick={handleProfileImageClick}>
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">프로필 사진</p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG 또는 GIF (최대 5MB)
                    </p>
                  </div>
                </div>

                <Separator />

                {/* 이메일 (읽기 전용) */}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일 (아이디)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* 이름 (읽기 전용) */}
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={user.name}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 비밀번호 변경 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
                <CardDescription>
                  비밀번호를 변경하려면 현재 비밀번호와 새 비밀번호를
                  입력하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">현재 비밀번호</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    placeholder="현재 비밀번호를 입력하세요"
                  />
                </div>

                {formData.currentPassword && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">새 비밀번호</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="새 비밀번호 (최소 8자)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPasswordConfirm">
                        새 비밀번호 확인
                      </Label>
                      <Input
                        id="newPasswordConfirm"
                        name="newPasswordConfirm"
                        type="password"
                        value={formData.newPasswordConfirm}
                        onChange={handleChange}
                        placeholder="새 비밀번호를 다시 입력하세요"
                      />
                    </div>
                  </>
                )}

                {!formData.currentPassword && (
                  <p className="text-sm text-muted-foreground">
                    비밀번호를 변경하지 않으려면 비워두세요.
                  </p>
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
                          onClick={handleSendVerification}
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

                {showVerification && !verificationStatus.phone && (
                  <div className="space-y-2 p-4 bg-muted rounded-lg">
                    <Label htmlFor="phoneCode">인증 코드</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phoneCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증 코드를 입력하세요"
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyCode}
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
