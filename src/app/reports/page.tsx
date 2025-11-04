'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dummyReports } from '@/lib/dummyData';
import { FileText, Calendar, ChevronRight } from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="professional-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">리포트</h1>
          <p className="text-gray-600">주간 및 월간 입법 수요 분석 리포트를 확인하세요</p>
        </div>

        <div className="grid gap-6">
          {dummyReports.map((report) => (
            <Card
              key={report.id}
              className="card-shadow hover:shadow-lg transition-all cursor-pointer"
              onClick={() => router.push(`/reports/${report.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={report.type === 'weekly' ? 'default' : 'secondary'}
                      >
                        {report.type === 'weekly' ? '주간 리포트' : '월간 리포트'}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {report.date}
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2">{report.title}</CardTitle>
                    <CardDescription className="text-base">
                      분석 기간: {report.period}
                    </CardDescription>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{report.summary}</p>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">주요 이슈</h4>
                  <div className="flex flex-wrap gap-2">
                    {report.topIssues.map((issue, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/reports/${report.id}`);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    리포트 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {dummyReports.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">생성된 리포트가 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
