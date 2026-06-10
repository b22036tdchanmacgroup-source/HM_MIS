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
    nodeId: 'baron', name: '바론', k: 'navy',
    shareholders: [
      { name: 'H', type: '개인', pct: '100%' },
    ],
  },
  {
    nodeId: 'ptc', name: '피티씨', k: 'purple',
    shareholders: [
      { name: '바론', type: '법인', pct: '44.6%', nodeId: 'baron' },
      { name: 'H', type: '개인', pct: '38.1%' },
      { name: '한맥기술', type: '법인', pct: '9.8%', nodeId: 'hanmaek' },
      { name: '기타', type: '개인', pct: '7.5%' },
    ],
  },
  {
    nodeId: 'hanmaek', name: '한맥기술', k: 'red',
    shareholders: [
      { name: 'H', type: '개인', pct: '40.7%' },
      { name: '피티씨', type: '법인', pct: '9.9%', nodeId: 'ptc' },
      { name: '장헌파트너스', type: '법인', pct: '9.8%', nodeId: 'jp' },
      { name: '바론', type: '법인', pct: '8.7%', nodeId: 'baron' },
      { name: '기타', type: '개인', pct: '30.9%' },
    ],
  },
  {
    nodeId: 'jp', name: '장헌파트너스', k: 'sky',
    shareholders: [
      { name: 'H', type: '개인', pct: '45.3%' },
      { name: '바론', type: '법인', pct: '9.6%', nodeId: 'baron' },
      { name: '한맥기술', type: '법인', pct: '9.6%', nodeId: 'hanmaek' },
      { name: '피티씨', type: '법인', pct: '9.7%', nodeId: 'ptc' },
      { name: '기타', type: '개인', pct: '25.8%' },
    ],
  },
  {
    nodeId: 'open', name: 'OPEN END', k: 'non',
    shareholders: [
      { name: '바론', type: '법인', pct: '80.0%', nodeId: 'baron' },
      { name: '기타', type: '개인', pct: '20.0%' },
    ],
  },
  {
    nodeId: 'saman', name: '삼안', k: 'amber',
    shareholders: [
      { name: '장헌파트너스', type: '법인', pct: '65.4%', nodeId: 'jp' },
      { name: '한맥기술', type: '법인', pct: '25.2%', nodeId: 'hanmaek' },
      { name: '바론', type: '법인', pct: '2.4%', nodeId: 'baron' },
      { name: '기타', type: '개인', pct: '7.0%' },
    ],
  },
  {
    nodeId: 'jhind', name: '장헌산업', k: 'sky',
    shareholders: [
      { name: '장헌파트너스', type: '법인', pct: '100%', nodeId: 'jp' },
    ],
  },
  {
    nodeId: 'halla', name: '한라', k: 'non',
    shareholders: [
      { name: '삼안', type: '법인', pct: '90.2%', nodeId: 'saman' },
      { name: '한맥기술', type: '법인', pct: '9.8%', nodeId: 'hanmaek' },
    ],
  },
  {
    nodeId: 'jh', name: '장헌', k: 'sky',
    shareholders: [
      { name: '피티씨', type: '법인', pct: '100%', nodeId: 'ptc' },
    ],
  },
  {
    nodeId: 'hyunta', name: '현타', k: 'black',
    shareholders: [
      { name: '미확인', type: '개인', pct: '—' },
    ],
  },
  {
    nodeId: 'sanha', name: '산하종합기술', k: 'black',
    shareholders: [
      { name: '미확인', type: '개인', pct: '—' },
    ],
  },
];
