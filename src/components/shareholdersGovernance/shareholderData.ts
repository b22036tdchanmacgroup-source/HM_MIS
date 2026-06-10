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
      { name: '개인주주', type: '개인', pct: '100%' },
    ],
  },
  {
    nodeId: 'ptc', name: 'B사', k: 'purple',
    shareholders: [
      { name: 'A사', type: '법인', pct: '44.6%', nodeId: 'baron' },
      { name: '개인주주', type: '개인', pct: '38.1%' },
      { name: 'C사', type: '법인', pct: '9.8%', nodeId: 'hanmaek' },
      { name: '기타', type: '개인', pct: '7.5%' },
    ],
  },
  {
    nodeId: 'hanmaek', name: 'C사', k: 'red',
    shareholders: [
      { name: '개인주주', type: '개인', pct: '40.7%' },
      { name: 'B사', type: '법인', pct: '9.9%', nodeId: 'ptc' },
      { name: 'D사', type: '법인', pct: '9.8%', nodeId: 'jp' },
      { name: 'A사', type: '법인', pct: '8.7%', nodeId: 'baron' },
      { name: '기타', type: '개인', pct: '30.9%' },
    ],
  },
  {
    nodeId: 'jp', name: 'D사', k: 'sky',
    shareholders: [
      { name: '개인주주', type: '개인', pct: '45.3%' },
      { name: 'A사', type: '법인', pct: '9.6%', nodeId: 'baron' },
      { name: 'C사', type: '법인', pct: '9.6%', nodeId: 'hanmaek' },
      { name: 'B사', type: '법인', pct: '9.7%', nodeId: 'ptc' },
      { name: '기타', type: '개인', pct: '25.8%' },
    ],
  },
  {
    nodeId: 'open', name: 'E사', k: 'non',
    shareholders: [
      { name: 'A사', type: '법인', pct: '80.0%', nodeId: 'baron' },
      { name: '기타', type: '개인', pct: '20.0%' },
    ],
  },
  {
    nodeId: 'saman', name: 'F사', k: 'amber',
    shareholders: [
      { name: 'D사', type: '법인', pct: '65.4%', nodeId: 'jp' },
      { name: 'C사', type: '법인', pct: '25.2%', nodeId: 'hanmaek' },
      { name: 'A사', type: '법인', pct: '2.4%', nodeId: 'baron' },
      { name: '기타', type: '개인', pct: '7.0%' },
    ],
  },
  {
    nodeId: 'jhind', name: 'G사', k: 'sky',
    shareholders: [
      { name: 'D사', type: '법인', pct: '100%', nodeId: 'jp' },
    ],
  },
  {
    nodeId: 'halla', name: 'H사', k: 'non',
    shareholders: [
      { name: 'F사', type: '법인', pct: '90.2%', nodeId: 'saman' },
      { name: 'C사', type: '법인', pct: '9.8%', nodeId: 'hanmaek' },
    ],
  },
  {
    nodeId: 'jh', name: 'I사', k: 'sky',
    shareholders: [
      { name: 'B사', type: '법인', pct: '100%', nodeId: 'ptc' },
    ],
  },
  {
    nodeId: 'hyunta', name: 'J사', k: 'black',
    shareholders: [
      { name: '미확인', type: '개인', pct: '—' },
    ],
  },
];
