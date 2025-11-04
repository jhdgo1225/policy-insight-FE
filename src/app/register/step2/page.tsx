'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';

export default function RegisterStep2() {
  const [formData, setFormData] = useState({
    email: '',
    emailCode: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    phoneCode: '',
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailVerification = () => {
    // 더미 이메일 인증
    setEmailVerified(true);
    alert('이메일 인증번호가 발송되었습니다.');
  };

  const handlePhoneVerification = () => {
    // 더미 전화번호 인증
    setPhoneVerified(true);
    alert('전화번호 인증번호가 발송되었습니다.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!emailVerified || !phoneVerified) {
      alert('이메일과 전화번호 인증을 완료해주세요.');
      return;
    }

    await register({
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
    });

    router.push('/register/complete');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-2xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Insight</h1>
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
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEmailVerification}
                    disabled={!formData.email}
                  >
                    인증번호 발송
                  </Button>
                </div>
              </div>

              {emailVerified && (
                <div className="space-y-2">
                  <Label htmlFor="emailCode">이메일 인증번호 *</Label>
                  <Input
                    id="emailCode"
                    name="emailCode"
                    placeholder="인증번호 6자리"
                    value={formData.emailCode}
                    onChange={handleInputChange}
                    required
                  />
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
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePhoneVerification}
                    disabled={!formData.phone}
                  >
                    인증번호 발송
                  </Button>
                </div>
              </div>

              {phoneVerified && (
                <div className="space-y-2">
                  <Label htmlFor="phoneCode">전화번호 인증번호 *</Label>
                  <Input
                    id="phoneCode"
                    name="phoneCode"
                    placeholder="인증번호 6자리"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/register')}
                >
                  이전
                </Button>
                <Button type="submit" className="flex-1">
                  회원가입
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
