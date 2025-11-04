export interface Issue {
  id: string;
  rank: number;
  title: string;
  summary: string;
  keywords: string[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  relatedNews: NewsArticle[];
  relatedLaws: Law[];
  date: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
}

export interface Law {
  id: string;
  name: string;
  type: '제정' | '개정' | '폐지';
  relevanceScore: number;
  reason?: string;
}

export interface Report {
  id: string;
  type: 'weekly' | 'monthly';
  title: string;
  period: string;
  date: string;
  summary: string;
  topIssues: string[];
}

// 더미 이슈 데이터
export const dummyIssues: Record<'daily' | 'weekly' | 'monthly' | 'yearly', Issue[]> = {
  daily: [
    {
      id: 'issue-d-1',
      rank: 1,
      title: '청년 주거 안정 대책 필요성 증가',
      summary: '청년층의 주거비 부담이 가중되면서 주거 안정 대책 마련이 시급한 상황입니다. 전월세 상한제 및 공공임대주택 확대 등의 정책이 요구되고 있습니다.',
      keywords: ['청년 주거', '전월세 상한제', '공공임대주택', '주거 안정'],
      sentiment: { positive: 15, neutral: 25, negative: 60 },
      relatedNews: [
        { id: 'news-1', title: '청년 주거비 부담 심화... 정부 대책 촉구', source: '연합뉴스', date: '2025-11-04', url: '#' },
        { id: 'news-2', title: '서울 전월세 가격 급등, 청년층 주거 불안 가중', source: 'KBS', date: '2025-11-03', url: '#' },
        { id: 'news-3', title: '공공임대주택 공급 확대 필요성 대두', source: 'MBC', date: '2025-11-04', url: '#' }
      ],
      relatedLaws: [
        { id: 'law-1', name: '주택임대차보호법', type: '개정', relevanceScore: 92 },
        { id: 'law-2', name: '공공주택 특별법', type: '개정', relevanceScore: 88 }
      ],
      date: '2025-11-04'
    },
    {
      id: 'issue-d-2',
      rank: 2,
      title: '플랫폼 노동자 권익 보호 강화',
      summary: '배달 및 플랫폼 노동자의 고용 불안정성과 산재 보험 사각지대 문제가 부각되면서 관련 법령 정비가 필요한 상황입니다.',
      keywords: ['플랫폼 노동자', '산재 보험', '고용 안정', '배달 노동'],
      sentiment: { positive: 20, neutral: 30, negative: 50 },
      relatedNews: [
        { id: 'news-4', title: '플랫폼 노동자 산재 사각지대 해소 방안 논의', source: 'SBS', date: '2025-11-04', url: '#' },
        { id: 'news-5', title: '배달 노동자 권익 보호 법안 발의', source: '한겨레', date: '2025-11-03', url: '#' }
      ],
      relatedLaws: [
        { id: 'law-3', name: '산업재해보상보험법', type: '개정', relevanceScore: 90 },
        { id: 'law-4', name: '플랫폼노동자보호법', type: '제정', relevanceScore: 95 }
      ],
      date: '2025-11-04'
    },
    {
      id: 'issue-d-3',
      rank: 3,
      title: '기후변화 대응 에너지 전환 가속화',
      summary: '탄소중립 목표 달성을 위한 재생에너지 확대 및 화석연료 감축 정책이 강화되고 있으며, 관련 법령 정비가 진행 중입니다.',
      keywords: ['탄소중립', '재생에너지', '에너지 전환', '기후변화'],
      sentiment: { positive: 45, neutral: 35, negative: 20 },
      relatedNews: [
        { id: 'news-6', title: '2030 탄소중립 로드맵 발표', source: '조선일보', date: '2025-11-04', url: '#' },
        { id: 'news-7', title: '재생에너지 확대 위한 규제 완화', source: '중앙일보', date: '2025-11-03', url: '#' }
      ],
      relatedLaws: [
        { id: 'law-5', name: '기후위기 대응을 위한 탄소중립·녹색성장 기본법', type: '개정', relevanceScore: 87 },
        { id: 'law-6', name: '신에너지 및 재생에너지 개발·이용·보급 촉진법', type: '개정', relevanceScore: 85 }
      ],
      date: '2025-11-04'
    }
  ],
  weekly: [
    {
      id: 'issue-w-1',
      rank: 1,
      title: '디지털 성범죄 처벌 강화 필요성',
      summary: '딥페이크 등 디지털 성범죄가 증가하면서 처벌 강화 및 피해자 보호 방안 마련이 시급합니다.',
      keywords: ['디지털 성범죄', '딥페이크', '처벌 강화', '피해자 보호'],
      sentiment: { positive: 10, neutral: 20, negative: 70 },
      relatedNews: [
        { id: 'news-8', title: '딥페이크 성범죄 급증... 법 개정 시급', source: 'JTBC', date: '2025-11-01', url: '#' },
        { id: 'news-9', title: '디지털 성범죄 피해자 보호 법안 발의', source: 'YTN', date: '2025-10-31', url: '#' }
      ],
      relatedLaws: [
        { id: 'law-7', name: '성폭력범죄의 처벌 등에 관한 특례법', type: '개정', relevanceScore: 95 },
        { id: 'law-8', name: '정보통신망 이용촉진 및 정보보호 등에 관한 법률', type: '개정', relevanceScore: 88 }
      ],
      date: '2025-11-04'
    },
    {
      id: 'issue-w-2',
      rank: 2,
      title: '저출산 대책 예산 확대',
      summary: '저출산 문제 해결을 위한 출산·양육 지원 예산 확대 및 제도 개선이 논의되고 있습니다.',
      keywords: ['저출산', '출산 지원', '양육 수당', '육아 휴직'],
      sentiment: { positive: 40, neutral: 35, negative: 25 },
      relatedNews: [
        { id: 'news-10', title: '정부, 저출산 대책 예산 대폭 증액', source: '동아일보', date: '2025-11-02', url: '#' },
        { id: 'news-11', title: '육아 휴직 급여 인상 추진', source: '서울신문', date: '2025-11-01', url: '#' }
      ],
      relatedLaws: [
        { id: 'law-9', name: '저출산·고령사회기본법', type: '개정', relevanceScore: 91 },
        { id: 'law-10', name: '남녀고용평등과 일·가정 양립 지원에 관한 법률', type: '개정', relevanceScore: 86 }
      ],
      date: '2025-11-04'
    }
  ],
  monthly: [
    {
      id: 'issue-m-1',
      rank: 1,
      title: '인공지능 규제 법안 마련',
      summary: 'AI 기술 발전에 따른 윤리적 문제와 안전성 확보를 위한 규제 법안이 논의되고 있습니다.',
      keywords: ['인공지능', 'AI 규제', '윤리', '안전성'],
      sentiment: { positive: 35, neutral: 45, negative: 20 },
      relatedNews: [
        { id: 'news-12', title: 'AI 규제 법안 국회 통과 임박', source: '매일경제', date: '2025-10-25', url: '#' },
        { id: 'news-13', title: 'AI 윤리 가이드라인 발표', source: '한국경제', date: '2025-10-20', url: '#' }
      ],
      relatedLaws: [
        { id: 'law-11', name: '인공지능 기본법', type: '제정', relevanceScore: 93 },
        { id: 'law-12', name: '개인정보 보호법', type: '개정', relevanceScore: 85 }
      ],
      date: '2025-11-04'
    }
  ],
  yearly: [
    {
      id: 'issue-y-1',
      rank: 1,
      title: '국민연금 개혁 방안',
      summary: '국민연금 재정 안정화를 위한 보험료율 인상 및 수급 연령 조정 등이 논의되고 있습니다.',
      keywords: ['국민연금', '연금 개혁', '보험료율', '수급 연령'],
      sentiment: { positive: 25, neutral: 40, negative: 35 },
      relatedNews: [
        { id: 'news-14', title: '국민연금 개혁안 공청회 개최', source: '연합뉴스', date: '2025-09-15', url: '#' },
        { id: 'news-15', title: '연금 수급 연령 65세로 상향 검토', source: 'KBS', date: '2025-08-20', url: '#' }
      ],
      relatedLaws: [
        { id: 'law-13', name: '국민연금법', type: '개정', relevanceScore: 96 }
      ],
      date: '2025-11-04'
    }
  ]
};

// 더미 리포트 데이터
export const dummyReports: Report[] = [
  {
    id: 'report-1',
    type: 'weekly',
    title: '2025년 44주차 주간 입법 수요 분석 리포트',
    period: '2025.10.28 - 2025.11.03',
    date: '2025-11-04',
    summary: '이번 주 주요 이슈로는 디지털 성범죄 처벌 강화, 저출산 대책 예산 확대 등이 있었습니다.',
    topIssues: ['디지털 성범죄 처벌 강화', '저출산 대책 예산 확대', '플랫폼 노동자 권익 보호']
  },
  {
    id: 'report-2',
    type: 'weekly',
    title: '2025년 43주차 주간 입법 수요 분석 리포트',
    period: '2025.10.21 - 2025.10.27',
    date: '2025-10-28',
    summary: '가상자산 과세 유예 논의와 반도체 지원법 개정안이 주요 이슈였습니다.',
    topIssues: ['가상자산 과세 유예', '반도체 지원법 개정', '학교 급식비 지원 확대']
  },
  {
    id: 'report-3',
    type: 'monthly',
    title: '2025년 10월 월간 입법 수요 분석 리포트',
    period: '2025.10.01 - 2025.10.31',
    date: '2025-11-01',
    summary: '10월에는 인공지능 규제 법안과 기후변화 대응 정책이 주요 이슈로 부상했습니다.',
    topIssues: ['인공지능 규제 법안', '기후변화 대응 정책', '의료 공공성 강화']
  },
  {
    id: 'report-4',
    type: 'monthly',
    title: '2025년 9월 월간 입법 수요 분석 리포트',
    period: '2025.09.01 - 2025.09.30',
    date: '2025-10-01',
    summary: '9월에는 국민연금 개혁과 교육 격차 해소가 중점적으로 논의되었습니다.',
    topIssues: ['국민연금 개혁', '교육 격차 해소', '중소기업 지원 강화']
  }
];
