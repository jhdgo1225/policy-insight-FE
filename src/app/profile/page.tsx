"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { withAuth } from "@/components/auth/RouteGuard";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Edit, LogOut, Trash2 } from "lucide-react";

function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { refreshUser } = useAuth();

  // 컴포넌트 마운트 시 최신 사용자 정보 가져오기
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleEdit = () => {
    router.push("/profile/edit");
  };

  const handleDeleteAccount = () => {
    router.push("/profile/delete");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="professional-container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">프로필</h1>
            <p className="text-muted-foreground mt-2">
              회원 정보를 확인하고 관리할 수 있습니다.
            </p>
          </div>

          <div className="space-y-6">
            {/* 사용자 정보 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>회원 정보</CardTitle>
                <CardDescription>
                  등록된 회원 정보를 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 프로필 사진 및 이름 */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="text-2xl">
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      이름
                    </div>
                    <div className="text-2xl font-semibold">
                      {user.name || "-"}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 이메일 */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      이메일
                    </div>
                    <div className="text-base">{user.email || "-"}</div>
                  </div>
                </div>

                <Separator />

                {/* 전화번호 */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      전화번호
                    </div>
                    <div className="text-base">{user.phone || "-"}</div>
                  </div>
                </div>

                <Separator />

                {/* 수정 버튼 */}
                <div className="flex justify-end">
                  <Button onClick={handleEdit} className="gap-2">
                    <Edit className="h-4 w-4" />
                    정보 수정
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 계정 관리 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>계정 관리</CardTitle>
                <CardDescription>
                  로그아웃 또는 회원 탈퇴를 진행할 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </Button>

                <Button
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  className="w-full justify-start gap-2">
                  <Trash2 className="h-4 w-4" />
                  회원 탈퇴
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(ProfilePage);
