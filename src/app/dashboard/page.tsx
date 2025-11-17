"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { dummyIssues, type Issue } from "@/lib/dummyData";
import { TrendingUp, FileText, Calendar, Award } from "lucide-react";
import { withAuth } from "@/components/auth/RouteGuard";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="professional-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">대시보드</h1>
          <p className="text-muted-foreground">
            실시간 입법 수요 분석 현황을 확인하세요
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "daily" | "weekly" | "monthly" | "yearly")
          }
          className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="daily">
              <Calendar className="w-4 h-4 mr-2" />
              일간
            </TabsTrigger>
            <TabsTrigger value="weekly">
              <TrendingUp className="w-4 h-4 mr-2" />
              주간
            </TabsTrigger>
            <TabsTrigger value="monthly">
              <FileText className="w-4 h-4 mr-2" />
              월간
            </TabsTrigger>
            <TabsTrigger value="yearly">
              <Award className="w-4 h-4 mr-2" />
              연간
            </TabsTrigger>
          </TabsList>

          {(["daily", "weekly", "monthly", "yearly"] as const).map((period) => (
            <TabsContent key={period} value={period} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {period === "daily" && "오늘의"}
                    {period === "weekly" && "이번 주"}
                    {period === "monthly" && "이번 달"}
                    {period === "yearly" && "올해"} 주요 이슈 Top 10
                  </CardTitle>
                  <CardDescription>
                    부정 감정 점수와 관련 법안도를 기준으로 정렬된 이슈입니다
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-6">
                {dummyIssues[period].slice(0, 10).map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>

              {period !== "daily" && dummyIssues[period].length > 0 && (
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">
                      1순위 법안 상세
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      가장 시급한 입법 수요 분석 결과
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dummyIssues[period][0]?.relatedLaws[0] && (
                      <>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {dummyIssues[period][0].relatedLaws[0].name}
                          </h3>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge
                              variant="secondary"
                              className="bg-white text-gray-900">
                              {dummyIssues[period][0].relatedLaws[0].type}
                            </Badge>
                            <span className="text-gray-300">
                              관련도{" "}
                              {
                                dummyIssues[period][0].relatedLaws[0]
                                  .relevanceScore
                              }
                              점
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">개정 사유</h4>
                          <p className="text-gray-300">
                            {dummyIssues[period][0].summary}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">주요 키워드</h4>
                          <div className="flex flex-wrap gap-2">
                            {dummyIssues[period][0].keywords.map(
                              (keyword, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="bg-white/10 text-white border-white/20">
                                  {keyword}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

function IssueCard({ issue }: { issue: Issue }) {
  const totalSentiment =
    issue.sentiment.positive +
    issue.sentiment.neutral +
    issue.sentiment.negative;

  return (
    <Card className="card-shadow hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-bold">
                #{issue.rank}
              </Badge>
              {issue.rank === 1 && (
                <Award className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            <CardTitle className="text-xl mb-2">{issue.title}</CardTitle>
            <CardDescription>{issue.summary}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">키워드</h4>
          <div className="flex flex-wrap gap-2">
            {issue.keywords.map((keyword, idx) => (
              <Badge key={idx} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">감정 분석</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-16 text-sm text-gray-600">긍정</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (issue.sentiment.positive / totalSentiment) * 100
                    }%`,
                  }}
                />
              </div>
              <div className="w-12 text-sm text-right">
                {issue.sentiment.positive}%
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 text-sm text-gray-600">중립</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-400 h-2 rounded-full"
                  style={{
                    width: `${
                      (issue.sentiment.neutral / totalSentiment) * 100
                    }%`,
                  }}
                />
              </div>
              <div className="w-12 text-sm text-right">
                {issue.sentiment.neutral}%
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 text-sm text-gray-600">부정</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (issue.sentiment.negative / totalSentiment) * 100
                    }%`,
                  }}
                />
              </div>
              <div className="w-12 text-sm text-right font-semibold">
                {issue.sentiment.negative}%
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-semibold mb-2">관련 뉴스</h4>
          <div className="space-y-2">
            {issue.relatedNews.slice(0, 3).map((news) => (
              <div key={news.id} className="text-sm">
                <div className="font-medium text-gray-900">{news.title}</div>
                <div className="text-gray-500 text-xs mt-1">
                  {news.source} · {news.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-semibold mb-2">관련 법안</h4>
          <div className="space-y-2">
            {issue.relatedLaws.map((law) => (
              <div
                key={law.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      law.type === "제정"
                        ? "default"
                        : law.type === "개정"
                        ? "secondary"
                        : "destructive"
                    }>
                    {law.type}
                  </Badge>
                  <span className="text-sm font-medium">{law.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  관련도 {law.relevanceScore}점
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default withAuth(DashboardPage);
