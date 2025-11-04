'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export default function RegisterStep1() {
  const [allAgreed, setAllAgreed] = useState(false);
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    thirdParty: false,
  });
  const router = useRouter();

  const handleAllAgree = (checked: boolean) => {
    setAllAgreed(checked);
    setTerms({
      service: checked,
      privacy: checked,
      thirdParty: checked,
    });
  };

  const handleNext = () => {
    if (terms.service && terms.privacy && terms.thirdParty) {
      router.push('/register/step2');
    }
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
            <CardTitle className="text-center">약관 동의</CardTitle>
            <CardDescription className="text-center">
              서비스 이용을 위해 약관에 동의해 주세요
            </CardDescription>
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium">
                  3
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="all"
                  checked={allAgreed}
                  onCheckedChange={handleAllAgree}
                />
                <Label
                  htmlFor="all"
                  className="text-base font-semibold cursor-pointer"
                >
                  전체 동의
                </Label>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="service"
                      checked={terms.service}
                      onCheckedChange={(checked) =>
                        setTerms({ ...terms, service: checked as boolean })
                      }
                    />
                    <Label htmlFor="service" className="cursor-pointer">
                      [필수] 서비스 이용약관 동의
                    </Label>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    보기
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={terms.privacy}
                      onCheckedChange={(checked) =>
                        setTerms({ ...terms, privacy: checked as boolean })
                      }
                    />
                    <Label htmlFor="privacy" className="cursor-pointer">
                      [필수] 개인정보 처리방침 동의
                    </Label>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    보기
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="thirdParty"
                      checked={terms.thirdParty}
                      onCheckedChange={(checked) =>
                        setTerms({ ...terms, thirdParty: checked as boolean })
                      }
                    />
                    <Label htmlFor="thirdParty" className="cursor-pointer">
                      [필수] 개인정보 제3자 제공 동의
                    </Label>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    보기
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push('/login')}
              >
                취소
              </Button>
              <Button
                className="flex-1"
                onClick={handleNext}
                disabled={!terms.service || !terms.privacy || !terms.thirdParty}
              >
                다음
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
