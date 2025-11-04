'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { dummyReports, dummyIssues } from '@/lib/dummyData';
import { ArrowLeft, Download, Calendar, TrendingUp } from 'lucide-react';

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const report = dummyReports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="professional-container py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">리포트를 찾을 수 없습니다.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push('/reports')}
              >
                목록으로 돌아가기
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const issues = report.type === 'weekly' ? dummyIssues.weekly : dummyIssues.monthly;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="professional-container py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/reports')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={report.type === 'weekly' ? 'default' : 'secondary'}>
                    {report.type === 'weekly' ? '주간 리포트' : '월간 리포트'}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {report.date}
                  </div>
                </div>
                <CardTitle className="text-3xl mb-3">{report.title}</CardTitle>
                <CardDescription className="text-lg">
                  분석 기간: {report.period}
                </CardDescription>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                PDF 다운로드
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>리포트 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{report.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                주요 이슈 분석
              </CardTitle>
              <CardDescription>
                {report.type === 'weekly' ? '주간' : '월간'} 주요 이슈 Top {issues.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {issues.map((issue) => (
                <div key={issue.id} className="border-l-4 border-primary pl-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">#{issue.rank}</Badge>
                        <h3 className="text-lg font-semibold">{issue.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{issue.summary}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">키워드</div>
                      <div className="flex flex-wrap gap-2">
                        {issue.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">감정 분석</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span>긍정 {issue.sentiment.positive}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                          <span>중립 {issue.sentiment.neutral}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="font-semibold">부정 {issue.sentiment.negative}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">관련 법안</div>
                      <div className="space-y-1">
                        {issue.relatedLaws.map((law) => (
                          <div key={law.id} className="flex items-center gap-2 text-sm">
                            <Badge
                              variant={
                                law.type === '제정'
                                  ? 'default'
                                  : law.type === '개정'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                              className="text-xs"
                            >
                              {law.type}
                            </Badge>
                            <span>{law.name}</span>
                            <span className="text-gray-500 ml-auto">
                              관련도 {law.relevanceScore}점
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {issue.rank !== issues.length && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>결론 및 제언</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  본 {report.type === 'weekly' ? '주간' : '월간'} 리포트는 뉴스 기사 분석을 통해 도출된 
                  주요 입법 수요를 정리한 것입니다. 분석 결과, {issues[0]?.title} 등의 이슈가 
                  높은 입법 수요를 보이고 있습니다.
                </p>
                <p>
                  특히 부정 감정 지표가 높은 이슈들에 대해서는 조속한 정책적 대응이 필요할 것으로 
                  판단됩니다. 관련 법안의 신속한 제정 및 개정을 통해 국민의 우려를 해소하고 
                  사회적 안정을 도모할 필요가 있습니다.
                </p>
                <p>
                  향후에도 실시간 뉴스 분석을 통한 입법 수요 모니터링을 지속하여, 
                  선제적이고 효과적인 정책 수립을 지원하겠습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
