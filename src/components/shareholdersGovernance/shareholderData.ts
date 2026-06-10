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
