import React, { useState } from 'react';
import '../../styles/ordersSales.css';
import {
  TrendingUp,
  Info,
  BarChart3,
  Lightbulb
} from 'lucide-react';


// 7개 계열사 데이터 정의
interface CompanyData {
  id: string;
  name: string;
  alias: string; // A사, B사 등 참조 이미지 라벨
  domain: string;
  logo?: string;
  employees: number;
  orders: {
    target: number; // 억원
    actual: number; // 억원
  };
  sales: {
    target: number; // 억원
    actual: number; // 억원
  };
  color: string;
}

const COMPANIES_DATA: CompanyData[] = [
  {
    id: 'hanmaek',
    name: '한맥기술',
    alias: 'A사',
    domain: 'ENG. Business',
    logo: '/images/logo/Hanmac.svg',
    employees: 130,
    orders: { target: 2500, actual: 2800 },
    sales: { target: 2100, actual: 2200 },
    color: '#3b82f6'
  },
  {
    id: 'saman',
    name: '삼안',
    alias: 'B사',
    domain: 'ENG. Business',
    logo: '/images/logo/Saman.svg',
    employees: 150,
    orders: { target: 2200, actual: 1800 },
    sales: { target: 1900, actual: 1500 },
    color: '#06b6d4'
  },
  {
    id: 'jhind',
    name: '장헌산업',
    alias: 'C사',
    domain: 'Manufacture & Construction',
    logo: '/images/logo/Jangheon.svg',
    employees: 35,
    orders: { target: 2000, actual: 1200 },
    sales: { target: 1700, actual: 1000 },
    color: '#f97316'
  },
  {
    id: 'jh',
    name: '장헌',
    alias: 'D사',
    domain: 'Manufacture & Construction',
    logo: '/images/logo/jangheon_1.svg',
    employees: 20,
    orders: { target: 1800, actual: 1600 },
    sales: { target: 1500, actual: 1400 },
    color: '#facc15'
  },
  {
    id: 'ptc',
    name: '피티씨',
    alias: 'E사',
    domain: 'Environment EPC & Plant',
    logo: '/images/logo/PTC.svg',
    employees: 25,
    orders: { target: 1700, actual: 900 },
    sales: { target: 1200, actual: 500 },
    color: '#a855f7'
  },
  {
    id: 'halla',
    name: '한라',
    alias: 'F사',
    domain: 'Environment EPC & Plant',
    logo: '/images/logo/Halla.svg',
    employees: 30,
    orders: { target: 1500, actual: 600 },
    sales: { target: 1200, actual: 500 },
    color: '#10b981'
  },
  {
    id: 'baron',
    name: '바론',
    alias: 'G사',
    domain: 'IT Business',
    logo: '/images/logo/Baron.svg',
    employees: 15,
    orders: { target: 1300, actual: 1700 },
    sales: { target: 1900, actual: 1800 },
    color: '#6366f1'
  }
];

// 그룹 총괄 계산
const GROUP_TOTALS = {
  orders: {
    target: COMPANIES_DATA.reduce((sum, c) => sum + c.orders.target, 0),
    actual: COMPANIES_DATA.reduce((sum, c) => sum + c.orders.actual, 0)
  },
  sales: {
    target: COMPANIES_DATA.reduce((sum, c) => sum + c.sales.target, 0),
    actual: COMPANIES_DATA.reduce((sum, c) => sum + c.sales.actual, 0)
  },
  employees: COMPANIES_DATA.reduce((sum, c) => sum + c.employees, 0)
};

// 도넛 차트 컴포넌트
interface DonutSlice {
  label: string;
  alias: string;
  value: number;
  color: string;
  actualValue: number;
}

const DonutChart: React.FC<{
  title: string;
  subtitle: string;
  slices: DonutSlice[];
  totalLabel: string;
  totalValue: string;
}> = ({ title, subtitle, slices, totalLabel, totalValue }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  let accumulatedPercent = 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 15,
      y: e.clientY - rect.top - 15
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPos(null);
  };

  return (
    <div className="os-donut-card">
      <h4 className="os-donut-title">{title} <span className="os-donut-subtitle">{subtitle}</span></h4>
      <div className="os-donut-body">
        <div className="os-donut-chart-wrap" style={{ position: 'relative' }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#f0ede6" strokeWidth="9" />
            {slices.map((slice, i) => {
              const percent = slice.value / 100;
              const strokeLength = percent * circumference;
              const currentOffset = accumulatedPercent;
              accumulatedPercent += percent;
              const isHovered = hoveredIndex === i;

              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered ? 13 : 9}
                  strokeDasharray={`${strokeLength} ${circumference}`}
                  strokeDashoffset={-currentOffset * circumference}
                  transform="rotate(-90 50 50)"
                  style={{ 
                    transition: 'stroke-width 0.2s ease', 
                    cursor: 'pointer' 
                  }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
            <circle cx="50" cy="50" r={radius - 6} fill="#ffffff" />
            <text x="50" y="45" textAnchor="middle" fontSize="5.5" fill="#8e8780" fontWeight="600">{totalLabel}</text>
            <text x="50" y="56" textAnchor="middle" fontSize="8.5" fill="#1e1b18" fontWeight="800">{totalValue}</text>
            <text x="50" y="63" textAnchor="middle" fontSize="4.5" fill="#8e8780" fontWeight="500">억원</text>
          </svg>

          {hoveredIndex !== null && tooltipPos && (
            <div 
              className="os-donut-tooltip"
              style={{
                position: 'absolute',
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y}px`,
              }}
            >
              <strong>{slices[hoveredIndex].label}</strong>: {slices[hoveredIndex].actualValue.toLocaleString()} 억 ({slices[hoveredIndex].value.toFixed(1)}%)
            </div>
          )}
        </div>

        <div className="os-donut-legend">
          {slices.map((slice, i) => (
            <div 
              key={i} 
              className={`os-legend-row ${hoveredIndex === i ? 'highlighted' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="os-legend-dot" style={{ backgroundColor: slice.color }} />
              <span className="os-legend-name">{slice.alias}</span>
              <span className="os-legend-val">{slice.actualValue.toLocaleString()}</span>
              <span className="os-legend-pct">({slice.value.toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 수주/매출 프로그레스 바 차트 컴포넌트
const SummaryBarCard: React.FC<{
  type: 'orders' | 'sales';
  label: string;
  icon: React.ReactNode;
  target: number;
  actual: number;
  maxScale: number;
}> = ({ type, label, icon, target, actual, maxScale }) => {
  const achieveRate = ((actual / target) * 100).toFixed(0);
  const barActualPct = Math.min((actual / maxScale) * 100, 100);
  const barTargetPct = Math.min((target / maxScale) * 100, 100);

  return (
    <div className={`os-summary-bar-card os-border-${type}`}>
      <div className="os-bar-card-header">
        <span className="os-bar-card-icon">{icon}</span>
        <span className={`os-bar-card-label os-text-${type}`}>{label}</span>
        <span className="os-bar-card-achieve">{achieveRate}%<small>달성률</small></span>
      </div>
      <div className="os-bar-card-metrics">
        <div className="os-bar-metric">
          <span className="os-metric-label">목표</span>
          <span className="os-metric-num">{target.toLocaleString()}</span>
        </div>
        <div className="os-bar-metric">
          <span className="os-metric-label">실적</span>
          <span className={`os-metric-num-bold os-text-${type}`}>{actual.toLocaleString()}</span>
        </div>
        <div className="os-bar-metric">
          <span className="os-metric-label">달성률</span>
          <span className="os-metric-achieve">{achieveRate}%</span>
        </div>
      </div>
      <div className="os-bar-visual">
        <div className="os-bar-track">
          <div className={`os-bar-fill os-bg-${type}`} style={{ width: `${barActualPct}%` }}>
            <span className="os-bar-fill-label">{actual.toLocaleString()}</span>
          </div>
        </div>
        <div className="os-bar-scale">
          <span>0</span>
          {[0.25, 0.5, 0.75, 1].map((f, i) => (
            <span key={i}>{(maxScale * f).toLocaleString()}</span>
          ))}
        </div>
        <div className="os-bar-legend-row">
          <span className="os-bar-legend-item"><span className={`os-bar-legend-color os-bg-${type}`} />실적 ({actual.toLocaleString()})</span>
          <span className="os-bar-legend-item"><span className="os-bar-legend-color os-bg-target" />목표 ({target.toLocaleString()})</span>
        </div>
      </div>
      <div className="os-target-line" style={{ left: `${barTargetPct}%` }} />
    </div>
  );
};


export const OrdersSalesDashboard: React.FC = () => {
  // 수주 기여도 도넛 차트 계산
  const orderSlices: DonutSlice[] = COMPANIES_DATA.map(c => ({
    label: c.name,
    alias: c.alias,
    actualValue: c.orders.actual,
    value: (c.orders.actual / GROUP_TOTALS.orders.actual) * 100,
    color: c.color
  })).sort((a, b) => b.value - a.value);

  // 매출 기여도 도넛 차트 계산
  const salesSlices: DonutSlice[] = COMPANIES_DATA.map(c => ({
    label: c.name,
    alias: c.alias,
    actualValue: c.sales.actual,
    value: (c.sales.actual / GROUP_TOTALS.sales.actual) * 100,
    color: c.color
  })).sort((a, b) => b.value - a.value);

  // 인당 수주/매출
  const perCapitaData = COMPANIES_DATA.map(c => {
    const perOrder = c.orders.actual / c.employees;
    const perSales = c.sales.actual / c.employees;
    return {
      name: c.name,
      alias: c.alias,
      perOrder,
      perSales,
      employees: c.employees
    };
  });

  const groupPerOrder = GROUP_TOTALS.orders.actual / GROUP_TOTALS.employees;
  const groupPerSales = GROUP_TOTALS.sales.actual / GROUP_TOTALS.employees;

  // 4대 도메인별 묶기
  const domains = [
    { name: 'ENG. Business', companies: COMPANIES_DATA.filter(c => c.domain === 'ENG. Business') },
    { name: 'Manufacture & Construction', companies: COMPANIES_DATA.filter(c => c.domain === 'Manufacture & Construction') },
    { name: 'Environment EPC & Plant', companies: COMPANIES_DATA.filter(c => c.domain === 'Environment EPC & Plant') },
    { name: 'IT Business', companies: COMPANIES_DATA.filter(c => c.domain === 'IT Business') }
  ];

  const maxScale = 20000;

  // 저조 기업 리스트
  const lowPerformers = COMPANIES_DATA.filter(c => {
    const rate = (c.orders.actual / c.orders.target) * 100;
    return rate < 60;
  });

  // 집중관리 기업 수
  const focusCount = lowPerformers.length;

  return (
    <div className="os-dashboard-overlay">
      <div className="os-dashboard-viewport">
        {/* ── 1단: 도넛 + 수주/매출 총괄 바 차트 ── */}
        <div className="os-tier-1">
          <DonutChart
            title="그룹사 수주 기여도"
            subtitle="(단위: 기준)"
            slices={orderSlices}
            totalLabel="수주 목표 합계"
            totalValue={GROUP_TOTALS.orders.target.toLocaleString()}
          />

          <SummaryBarCard
            type="orders"
            label="수주"
            icon={<BarChart3 size={14} />}
            target={GROUP_TOTALS.orders.target}
            actual={GROUP_TOTALS.orders.actual}
            maxScale={maxScale}
          />

          <SummaryBarCard
            type="sales"
            label="매출"
            icon={<TrendingUp size={14} />}
            target={GROUP_TOTALS.sales.target}
            actual={GROUP_TOTALS.sales.actual}
            maxScale={maxScale}
          />

          <DonutChart
            title="그룹사 매출 기여도"
            subtitle="(단위: 기준)"
            slices={salesSlices}
            totalLabel="매출 목표 합계"
            totalValue={GROUP_TOTALS.sales.target.toLocaleString()}
          />
        </div>

        {/* ── 2단: 도메인별 계열사 카드 그리드 ── */}
        <div className="os-tier-2">
          {/* 도메인 헤더 */}
          <div className="os-domain-headers">
            {domains.map((dom, i) => (
              <div 
                key={i}
                className="os-domain-header"
                style={{ gridColumn: `span ${dom.companies.length}` }}
              >
                <span className="os-domain-name">{dom.name}</span>
              </div>
            ))}
          </div>

          {/* 회사 카드 */}
          <div className="os-company-cards">
            {domains.flatMap(dom => dom.companies).map((comp) => {
              const orderAchieve = (comp.orders.actual / comp.orders.target) * 100;
              const salesAchieve = (comp.sales.actual / comp.sales.target) * 100;

              return (
                <div key={comp.id} className="os-company-card">
                  <div className="os-cc-header">
                    <span className="os-cc-alias" style={{ borderLeft: `3px solid ${comp.color}`, paddingLeft: '6px' }}>{comp.alias}</span>
                    {comp.logo && <img src={comp.logo} alt={comp.name} className="os-cc-logo" />}
                  </div>

                  {/* 수주 */}
                  <div className="os-cc-section">
                    <div className="os-cc-section-title">
                      <span className="os-cc-dot os-bg-orders" />
                      <span>수주</span>
                    </div>
                    <div className="os-cc-row">
                      <div className="os-cc-col">
                        <span className="os-cc-lbl">목표</span>
                        <span className="os-cc-val">{comp.orders.target.toLocaleString()}</span>
                      </div>
                      <div className="os-cc-col">
                        <span className="os-cc-lbl">실적</span>
                        <span className="os-cc-val-bold">{comp.orders.actual.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="os-cc-achieve-row">
                      <span className="os-cc-achieve-label">달성률</span>
                      <span className={`os-cc-achieve-val ${orderAchieve >= 100 ? 'high' : orderAchieve >= 70 ? 'mid' : 'low'}`}>{orderAchieve.toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* 매출 */}
                  <div className="os-cc-section">
                    <div className="os-cc-section-title">
                      <span className="os-cc-dot os-bg-sales" />
                      <span>매출</span>
                    </div>
                    <div className="os-cc-row">
                      <div className="os-cc-col">
                        <span className="os-cc-lbl">목표</span>
                        <span className="os-cc-val">{comp.sales.target.toLocaleString()}</span>
                      </div>
                      <div className="os-cc-col">
                        <span className="os-cc-lbl">실적</span>
                        <span className="os-cc-val-bold">{comp.sales.actual.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="os-cc-achieve-row">
                      <span className="os-cc-achieve-label">달성률</span>
                      <span className={`os-cc-achieve-val ${salesAchieve >= 100 ? 'high' : salesAchieve >= 70 ? 'mid' : 'low'}`}>{salesAchieve.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 인당 수주/매출 행 */}
          <div className="os-per-capita-row">
            <div className="os-pc-card os-pc-total">
              <div className="os-pc-top">
                <span className="os-pc-name">전체</span>
                <span className="os-pc-unit">(억원)</span>
              </div>
              <div className="os-pc-bottom">
                <span className="os-pc-label">인당 수주 / 매출</span>
                <span className="os-pc-values">
                  <strong>{groupPerOrder.toFixed(2)}</strong> / <strong>{groupPerSales.toFixed(2)}</strong>
                </span>
              </div>
            </div>
            {perCapitaData.map((item, i) => (
              <div key={i} className="os-pc-card">
                <div className="os-pc-top">
                  <span className="os-pc-name">{item.alias}</span>
                  <span className="os-pc-unit">(억원)</span>
                </div>
                <div className="os-pc-bottom">
                  <span className="os-pc-label">인당 수주 / 매출</span>
                  <span className="os-pc-values">
                    <strong>{item.perOrder.toFixed(2)}</strong> / <strong>{item.perSales.toFixed(2)}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3단: 인사이트 & 전략 코멘트 ── */}
        <div className="os-tier-3">
          {/* 주요 인사이트 */}
          <div className="os-insight-col">
            <div className="os-insight-header">
              <span className="os-insight-icon"><Info size={13} /></span>
              <span>주요 인사이트</span>
            </div>
            <div className="os-insight-body">
              <div className="os-insight-item">
                <span className="os-alert-badge warn">▲</span>
                <span>그룹 수주 목표 달성률 {((GROUP_TOTALS.orders.actual / GROUP_TOTALS.orders.target) * 100).toFixed(0)}% (주의)</span>
              </div>
              <div className="os-insight-item">
                <span className="os-alert-badge warn">▲</span>
                <span>그룹 매출 목표 달성률 {((GROUP_TOTALS.sales.actual / GROUP_TOTALS.sales.target) * 100).toFixed(0)}% (주의)</span>
              </div>
              {lowPerformers.map(c => (
                <div key={c.id} className="os-insight-item">
                  <span className="os-alert-badge danger">▲</span>
                  <span>{c.alias} 전년대비 수주 감소 -{(100 - (c.orders.actual / c.orders.target) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 그룹 주요 인사이트 */}
          <div className="os-insight-col os-insight-group">
            <div className="os-insight-header">
              <span>그룹 주요 인사이트</span>
            </div>
            <div className="os-insight-body os-insight-kpis">
              <div className="os-kpi-block">
                <span className="os-kpi-label">수주 달성률</span>
                <span className="os-kpi-big">{((GROUP_TOTALS.orders.actual / GROUP_TOTALS.orders.target) * 100).toFixed(0)}%</span>
                <span className="os-kpi-sub">전년 동기 대비 ▼ 6%</span>
              </div>
              <div className="os-kpi-block">
                <span className="os-kpi-label">매출 달성률</span>
                <span className="os-kpi-big">{((GROUP_TOTALS.sales.actual / GROUP_TOTALS.sales.target) * 100).toFixed(0)}%</span>
                <span className="os-kpi-sub">전년 동기 대비 ▼ 9%</span>
              </div>
              <div className="os-kpi-block">
                <span className="os-kpi-label">수주 잔고</span>
                <span className="os-kpi-big">{(GROUP_TOTALS.orders.actual * 1.7).toLocaleString(undefined, {maximumFractionDigits: 0})}억</span>
                <span className="os-kpi-sub">전년 동기 대비 ▲ 4%</span>
              </div>
              <div className="os-kpi-block">
                <span className="os-kpi-label">집중관리 필요</span>
                <span className="os-kpi-big">{focusCount} 개사</span>
                <span className="os-kpi-sub">{lowPerformers.map(c => c.alias).join(', ')}</span>
              </div>
            </div>
          </div>

          {/* 전략 코멘트 */}
          <div className="os-insight-col">
            <div className="os-insight-header">
              <span className="os-insight-icon"><Lightbulb size={13} /></span>
              <span>전략 코멘트</span>
            </div>
            <div className="os-insight-body os-comment-body">
              <p>상반기 그룹 수주 달성률은 양호하나, 매출은 계획 대비 지연되고 있습니다. 저조 기업의 원인 분석 및 실행력 강화를 통해 하반기 목표 달성에 집중해야 합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersSalesDashboard;
