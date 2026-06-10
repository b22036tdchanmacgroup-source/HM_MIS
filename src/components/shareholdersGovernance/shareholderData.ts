export type ShareholderType = '법인' | '개인';

export interface Shareholder {
  name: string;
  type: ShareholderType;
  pct: string;
  nodeId?: string;
}

export interface CompanyShareholders {
  nodeId: string;
  name: string;
  k: string;
}

export const SHAREHOLDER_DATA: (CompanyShareholders & { shareholders: Shareholder[] })[] = [
  {
    nodeId: 'baron', name: 'A사', k: 'navy',
    shareholders: [
      { name: '홍대표',         type: '개인', pct: '45.0%' },
      { name: '이이사',         type: '개인', pct: '28.0%' },
      { name: '가나홀딩스(주)', type: '법인', pct: '15.0%' },
      { name: '박상무',         type: '개인', pct:  '9.0%' },
      { name: '기타',           type: '개인', pct:  '3.0%' },
    ],
  },
  {
    nodeId: 'ptc', name: 'B사', k: 'purple',
    shareholders: [
      { name: 'A사',            type: '법인', pct: '44.6%', nodeId: 'baron' },
      { name: '홍대표',         type: '개인', pct: '22.0%' },
      { name: '이이사',         type: '개인', pct: '16.1%' },
      { name: 'C사',            type: '법인', pct:  '9.8%', nodeId: 'hanmaek' },
      { name: '다라마캐피탈(주)',type: '법인', pct:  '4.5%' },
      { name: '기타',           type: '개인', pct:  '3.0%' },
    ],
  },
  {
    nodeId: 'hanmaek', name: 'C사', k: 'red',
    shareholders: [
      { name: '홍대표',         type: '개인', pct: '30.7%' },
      { name: '전우치',         type: '개인', pct: '10.0%' },
      { name: 'B사',            type: '법인', pct:  '9.9%', nodeId: 'ptc' },
      { name: 'D사',            type: '법인', pct:  '9.8%', nodeId: 'jp' },
      { name: 'A사',            type: '법인', pct:  '8.7%', nodeId: 'baron' },
      { name: '라마바투자(주)', type: '법인', pct:  '6.0%' },
      { name: '기타',           type: '개인', pct: '24.9%' },
    ],
  },
  {
    nodeId: 'jp', name: 'D사', k: 'sky',
    shareholders: [
      { name: '홍대표',         type: '개인', pct: '35.3%' },
      { name: '임꺽정',         type: '개인', pct: '10.0%' },
      { name: 'A사',            type: '법인', pct:  '9.6%', nodeId: 'baron' },
      { name: 'C사',            type: '법인', pct:  '9.6%', nodeId: 'hanmaek' },
      { name: 'B사',            type: '법인', pct:  '9.7%', nodeId: 'ptc' },
      { name: '사아자파트너스(주)', type: '법인', pct: '5.0%' },
      { name: '기타',           type: '개인', pct: '20.8%' },
    ],
  },
  {
    nodeId: 'open', name: 'E사', k: 'non',
    shareholders: [
      { name: 'A사',            type: '법인', pct: '80.0%', nodeId: 'baron' },
      { name: '마이사',         type: '개인', pct: '10.0%' },
      { name: '바투자(주)',     type: '법인', pct:  '7.0%' },
      { name: '기타',           type: '개인', pct:  '3.0%' },
    ],
  },
  {
    nodeId: 'saman', name: 'F사', k: 'amber',
    shareholders: [
      { name: 'D사',            type: '법인', pct: '65.4%', nodeId: 'jp' },
      { name: 'C사',            type: '법인', pct: '25.2%', nodeId: 'hanmaek' },
      { name: '장보고',         type: '개인', pct:  '4.0%' },
      { name: 'A사',            type: '법인', pct:  '2.4%', nodeId: 'baron' },
      { name: '기타',           type: '개인', pct:  '3.0%' },
    ],
  },
  {
    nodeId: 'jhind', name: 'G사', k: 'sky',
    shareholders: [
      { name: 'D사',            type: '법인', pct: '51.0%', nodeId: 'jp' },
      { name: '최이사',         type: '개인', pct: '20.0%' },
      { name: '정상무',         type: '개인', pct: '15.0%' },
      { name: '아자차투자(주)', type: '법인', pct:  '9.0%' },
      { name: '기타',           type: '개인', pct:  '5.0%' },
    ],
  },
  {
    nodeId: 'halla', name: 'H사', k: 'non',
    shareholders: [
      { name: 'F사',            type: '법인', pct: '50.2%', nodeId: 'saman' },
      { name: '강이사',         type: '개인', pct: '20.0%' },
      { name: '윤상무',         type: '개인', pct: '12.0%' },
      { name: 'C사',            type: '법인', pct:  '9.8%', nodeId: 'hanmaek' },
      { name: '카타파홀딩스(주)', type: '법인', pct: '5.0%' },
      { name: '기타',           type: '개인', pct:  '3.0%' },
    ],
  },
  {
    nodeId: 'jh', name: 'I사', k: 'sky',
    shareholders: [
      { name: 'B사',            type: '법인', pct: '60.0%', nodeId: 'ptc' },
      { name: '조이사',         type: '개인', pct: '22.0%' },
      { name: '한상무',         type: '개인', pct: '12.0%' },
      { name: '파하타캐피탈(주)', type: '법인', pct: '6.0%' },
    ],
  },
  {
    nodeId: 'hyunta', name: 'J사', k: 'black',
    shareholders: [
      { name: '나이사',         type: '개인', pct: '35.0%' },
      { name: '다상무',         type: '개인', pct: '30.0%' },
      { name: '라대표',         type: '개인', pct: '20.0%' },
      { name: '하자카(주)',     type: '법인', pct: '15.0%' },
    ],
  },
];

export interface CompanyDetailInfo {
  estDate: string;
  industry: string;
  ceo: string;
  employees: string;
  firmType: string;
  marketCap: string;
  pricePerShare: string;
  totalSharesNum: string;
  valuationDate: string;
  discountRate: string;
  evalMethod: string;
  totalShCount: number;
  corpShCount: string;
  indShCount: string;
  avgPct: string;
}

export const COMPANY_DETAILS_MAP: Record<string, CompanyDetailInfo> = {
  baron: {
    estDate: '2010.05.20', industry: '경영컨설팅업', ceo: '홍대표', employees: '5명', firmType: '비외감기업',
    marketCap: '850,000 백만원', pricePerShare: '17,000원', totalSharesNum: '50,000주',
    valuationDate: '2026.06.30', discountRate: '20.0%', evalMethod: '상증세법',
    totalShCount: 5, corpShCount: '1 명 (20.0%)', indShCount: '4 명 (80.0%)', avgPct: '20.0%'
  },
  ptc: {
    estDate: '2015.08.12', industry: '전기전자 제조업', ceo: '이이사', employees: '42명', firmType: '비외감기업',
    marketCap: '980,000 백만원', pricePerShare: '9,800원', totalSharesNum: '100,000주',
    valuationDate: '2026.06.30', discountRate: '25.0%', evalMethod: 'DCF',
    totalShCount: 6, corpShCount: '3 명 (50.0%)', indShCount: '3 명 (50.0%)', avgPct: '16.7%'
  },
  hanmaek: {
    estDate: '2005.03.15', industry: '정보통신업', ceo: '김한맥', employees: '28명', firmType: '외감기업',
    marketCap: '1,250,000 백만원', pricePerShare: '6,377원', totalSharesNum: '196,000주',
    valuationDate: '2026.06.30', discountRate: '25.0%', evalMethod: 'DCF',
    totalShCount: 28, corpShCount: '10 명 (35.7%)', indShCount: '18 명 (64.3%)', avgPct: '7.0%'
  },
  jp: {
    estDate: '2018.11.02', industry: '금융지원 서비스업', ceo: '박장헌', employees: '12명', firmType: '외감기업',
    marketCap: '760,000 백만원', pricePerShare: '15,200원', totalSharesNum: '50,000주',
    valuationDate: '2026.06.30', discountRate: '25.0%', evalMethod: 'DCF',
    totalShCount: 7, corpShCount: '4 명 (57.1%)', indShCount: '3 명 (42.9%)', avgPct: '14.3%'
  },
  open: {
    estDate: '2021.01.25', industry: '소프트웨어 개발업', ceo: '최오픈', employees: '8명', firmType: '비외감기업',
    marketCap: '320,000 백만원', pricePerShare: '32,000원', totalSharesNum: '10,000주',
    valuationDate: '2026.06.30', discountRate: '30.0%', evalMethod: '상증세법',
    totalShCount: 4, corpShCount: '2 명 (50.0%)', indShCount: '2 명 (50.0%)', avgPct: '25.0%'
  },
  saman: {
    estDate: '1998.04.09', industry: '종합엔지니어링', ceo: '삼안대표', employees: '150명', firmType: '외감기업',
    marketCap: '2,400,000 백만원', pricePerShare: '12,000원', totalSharesNum: '200,000주',
    valuationDate: '2026.06.30', discountRate: '20.0%', evalMethod: 'DCF',
    totalShCount: 5, corpShCount: '3 명 (60.0%)', indShCount: '2 명 (40.0%)', avgPct: '20.0%'
  },
  jhind: {
    estDate: '2019.07.15', industry: '부동산 개발 및 임대업', ceo: '임장헌', employees: '15명', firmType: '외감기업',
    marketCap: '640,000 백만원', pricePerShare: '8,000원', totalSharesNum: '80,000주',
    valuationDate: '2026.06.30', discountRate: '25.0%', evalMethod: 'DCF',
    totalShCount: 5, corpShCount: '2 명 (40.0%)', indShCount: '3 명 (60.0%)', avgPct: '20.0%'
  },
  halla: {
    estDate: '2002.10.30', industry: '건설 및 토목공업', ceo: '한라대표', employees: '85명', firmType: '외감기업',
    marketCap: '1,500,000 백만원', pricePerShare: '10,000원', totalSharesNum: '150,000주',
    valuationDate: '2026.06.30', discountRate: '22.0%', evalMethod: 'DCF',
    totalShCount: 6, corpShCount: '3 명 (50.0%)', indShCount: '3 명 (50.0%)', avgPct: '16.7%'
  },
  jh: {
    estDate: '2020.09.01', industry: '투자자문업', ceo: '조장헌', employees: '6명', firmType: '비외감기업',
    marketCap: '450,000 백만원', pricePerShare: '15,000원', totalSharesNum: '30,000주',
    valuationDate: '2026.06.30', discountRate: '25.0%', evalMethod: '상증세법',
    totalShCount: 4, corpShCount: '2 명 (50.0%)', indShCount: '2 명 (50.0%)', avgPct: '25.0%'
  },
  hyunta: {
    estDate: '2022.03.11', industry: '경영 컨설팅', ceo: '나대표', employees: '3명', firmType: '비외감기업',
    marketCap: '210,000 백만원', pricePerShare: '10,500원', totalSharesNum: '20,000주',
    valuationDate: '2026.06.30', discountRate: '30.0%', evalMethod: '상증세법',
    totalShCount: 4, corpShCount: '1 명 (25.0%)', indShCount: '3 명 (75.0%)', avgPct: '25.0%'
  },
  sanha: {
    estDate: '2016.05.18', industry: '엔지니어링 서비스', ceo: '산하대표', employees: '34명', firmType: '비외감기업',
    marketCap: '580,000 백만원', pricePerShare: '5,800원', totalSharesNum: '100,000주',
    valuationDate: '2026.06.30', discountRate: '25.0%', evalMethod: 'DCF',
    totalShCount: 5, corpShCount: '2 명 (40.0%)', indShCount: '3 명 (60.0%)', avgPct: '20.0%'
  }
};

