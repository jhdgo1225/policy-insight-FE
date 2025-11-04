'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';

export default function FindAccountPage() {
  const [activeTab, setActiveTab] = useState('findId');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  const [step, setStep] = useState<'input' | 'verify' | 'result'>('input');
  const [foundId, setFoundId] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    verificationCode: '',
    userId: '',
    newPassword: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendVerification = () => {
    setStep('verify');
    alert('인증번호가 발송되었습니다.');
  };

  const handleVerifyCode = () => {
    if (activeTab === 'findId') {
      setFoundId('user@example.com');
      setStep('result');
    } else {
      setStep('result');
    }
  };

  const handleResetPassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert('비밀번호가 재설정되었습니다.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Insight</h1>
          <p className="text-sm text-gray-600">아이디/비밀번호 찾기</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">계정 찾기</CardTitle>
            <CardDescription className="text-center">
              아이디 또는 비밀번호를 찾으실 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => {
              setActiveTab(v);
              setStep('input');
              setVerificationMethod('email');
            }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="findId">아이디 찾기</TabsTrigger>
                <TabsTrigger value="findPassword">비밀번호 찾기</TabsTrigger>
              </TabsList>

              <TabsContent value="findId" className="space-y-4">
                {step === 'input' && (
                  <>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant={verificationMethod === 'email' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setVerificationMethod('email')}
                        >
                          이메일 인증
                        </Button>
                        <Button
                          variant={verificationMethod === 'phone' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setVerificationMethod('phone')}
                        >
                          전화번호 인증
                        </Button>
                      </div>

                      {verificationMethod === 'email' ? (
                        <div className="space-y-2">
                          <Label htmlFor="email">이메일</Label>
                          <div className="flex gap-2">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="example@email.com"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            <Button
                              variant="outline"
                              onClick={handleSendVerification}
                              disabled={!formData.email}
                            >
                              인증
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="phone">전화번호</Label>
                          <div className="flex gap-2">
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="01012345678"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            <Button
                              variant="outline"
                              onClick={handleSendVerification}
                              disabled={!formData.phone}
                            >
                              인증
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {step === 'verify' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="verificationCode">인증번호</Label>
                      <Input
                        id="verificationCode"
                        name="verificationCode"
                        placeholder="인증번호 6자리"
                        value={formData.verificationCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleVerifyCode}
                      disabled={!formData.verificationCode}
                    >
                      확인
                    </Button>
                  </div>
                )}

                {step === 'result' && (
                  <div className="space-y-4 text-center">
                    <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 mb-2">고객님의 아이디는</p>
                      <p className="text-xl font-bold">{foundId}</p>
                      <p className="text-sm text-gray-600 mt-2">입니다.</p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => router.push('/login')}
                    >
                      로그인하기
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="findPassword" className="space-y-4">
                {step === 'input' && (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="userId">아이디</Label>
                        <Input
                          id="userId"
                          name="userId"
                          type="email"
                          placeholder="example@email.com"
                          value={formData.userId}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant={verificationMethod === 'email' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setVerificationMethod('email')}
                        >
                          이메일 인증
                        </Button>
                        <Button
                          variant={verificationMethod === 'phone' ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => setVerificationMethod('phone')}
                        >
                          전화번호 인증
                        </Button>
                      </div>

                      {verificationMethod === 'email' ? (
                        <div className="space-y-2">
                          <Label htmlFor="email">이메일</Label>
                          <div className="flex gap-2">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="example@email.com"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            <Button
                              variant="outline"
                              onClick={handleSendVerification}
                              disabled={!formData.email || !formData.userId}
                            >
                              인증
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="phone">전화번호</Label>
                          <div className="flex gap-2">
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="01012345678"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            <Button
                              variant="outline"
                              onClick={handleSendVerification}
                              disabled={!formData.phone || !formData.userId}
                            >
                              인증
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {step === 'verify' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="verificationCode">인증번호</Label>
                      <Input
                        id="verificationCode"
                        name="verificationCode"
                        placeholder="인증번호 6자리"
                        value={formData.verificationCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleVerifyCode}
                      disabled={!formData.verificationCode}
                    >
                      다음
                    </Button>
                  </div>
                )}

                {step === 'result' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">새 비밀번호</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleResetPassword}
                      disabled={!formData.newPassword || !formData.confirmPassword}
                    >
                      비밀번호 재설정
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                로그인으로 돌아가기
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
