import React, { useState, useRef, useEffect } from 'react';
import { X, Network, ChevronRight, Users, Building, User, PieChart } from 'lucide-react';
import GovernanceD3Chart from './GovernanceD3Chart';
import ShareholdersD3Chart from './ShareholdersD3Chart';
import { SHAREHOLDER_DATA, COMPANY_DETAILS_MAP } from './shareholderData';
import { GOV_D3_STYLE, GOV_D3_CURRENT } from './govD3Data';

interface TeamOverlayProps {
  onClose: () => void;
  [key: string]: unknown;
}

const CHART_BASE_DATE = '2026.06';

const LOGO_MAP: Record<string, string | undefined> = Object.fromEntries(
  GOV_D3_CURRENT.nodes.map(n => [n.id, n.logo])
);

function calcTotal(shareholders: { pct: string }[]): string {
  const sum = shareholders.reduce((acc, sh) => {
    const n = parseFloat(sh.pct);
    return isNaN(n) ? acc : acc + n;
  }, 0);
  if (sum <= 0) return '—';
  const r = Math.round(sum * 10) / 10;
  return `${r % 1 === 0 ? r.toFixed(0) : r.toFixed(1)}%`;
}

const TeamOverlay: React.FC<TeamOverlayProps> = ({ onClose }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement>>({});
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedNodeId) return;
    const el = cardRefs.current[selectedNodeId];
    if (el && gridRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedNodeId]);

  // 상세 보기 모드 여부
  const isDetailMode = selectedNodeId !== null;
  const currentCompany = SHAREHOLDER_DATA.find(company => company.nodeId === selectedNodeId);
  const detailInfo = selectedNodeId ? (COMPANY_DETAILS_MAP[selectedNodeId] || COMPANY_DETAILS_MAP['hanmaek']) : null;
  const detailColor = currentCompany ? (GOV_D3_STYLE[currentCompany.k]?.stroke ?? '#888888') : '#888888';
  const detailLogo = selectedNodeId ? LOGO_MAP[selectedNodeId] : undefined;

  // 법인/개인 주주 지분 합산 및 주식 수 계산
  let corpSharesTotalStr = '0주 (0.0%)';
  let indSharesTotalStr = '0주 (0.0%)';
  let corpPct = 0;
  
  if (detailInfo && currentCompany) {
    const totalSharesVal = parseFloat(detailInfo.totalSharesNum.replace(/[^0-9]/g, ''));
    
    const corpSharesSum = currentCompany.shareholders
      .filter(s => s.type === '법인')
      .reduce((sum, s) => sum + Math.round(totalSharesVal * parseFloat(s.pct) / 100), 0);
    const corpPctSum = currentCompany.shareholders
      .filter(s => s.type === '법인')
      .reduce((sum, s) => sum + parseFloat(s.pct), 0);
    corpPct = corpPctSum;

    const indSharesSum = currentCompany.shareholders
      .filter(s => s.type === '개인')
      .reduce((sum, s) => sum + Math.round(totalSharesVal * parseFloat(s.pct) / 100), 0);
    const indPctSum = currentCompany.shareholders
      .filter(s => s.type === '개인')
      .reduce((sum, s) => sum + parseFloat(s.pct), 0);

    corpSharesTotalStr = `${corpSharesSum.toLocaleString()}주 (${corpPctSum.toFixed(1)}%)`;
    indSharesTotalStr = `${indSharesSum.toLocaleString()}주 (${indPctSum.toFixed(1)}%)`;
  }

  return (
    <div className="team-overlay">

      {/* ── 헤더 ── */}
      <div className="team-panel-header">
        <div className="team-panel-title">
          <Network size={20} aria-hidden="true" />
          <span>한맥가족 지배구조 및 주주 현황</span>
          <span className="team-total-badge">기준 {CHART_BASE_DATE}</span>
        </div>
        <button className="team-close-btn" onClick={onClose} title="닫기" aria-label="닫기">
          <X size={20} />
        </button>
      </div>

      {/* ── 좌/우 2패널 레이아웃 ── */}
      <div className="gov-two-panel">

        {/* ── 왼쪽: 최대주주 + 지배구조 ── */}
        <div className="gov-left-panel">

          <div className="gov-sh-section">
            <div className="gov-sh-body">
              <div className="sh-chart-wrap">
                <div className="gov-d3-toggle">
                  <span className="sh-chart-title-label">1. 최대주주</span>
                </div>
                <ShareholdersD3Chart />
              </div>
            </div>
          </div>

          <div className="gov-structure-section">
            <GovernanceD3Chart onNodeClick={id => setSelectedNodeId(id)} />
          </div>

        </div>

        {/* ── 오른쪽: 주주 현황 (상세 또는 그리드 리스트) ── */}
        <div className="gov-right-panel">

          {!isDetailMode ? (
            <>
              {/* 제목 바 + 가족사 규모 버튼 */}
              <div className="sh-panel-topbar">
                <span className="sh-chart-title-label">3. 주주 현황</span>
                <button className="gov-scale-btn" onClick={() => {}}>
                  가족사 규모 <ChevronRight size={11} className="gov-scale-btn-icon" />
                </button>
              </div>

              {/* 회사별 주주현황 카드 그리드 */}
              <div className="sh-table-grid" ref={gridRef}>
                {SHAREHOLDER_DATA.map(company => {
                  const color = GOV_D3_STYLE[company.k]?.stroke ?? '#888888';
                  const logo = LOGO_MAP[company.nodeId];
                  const isActive = selectedNodeId === company.nodeId;
                  const isDimmed = selectedNodeId !== null && !isActive;
                  const total = calcTotal(company.shareholders);

                  return (
                    <div
                      key={company.nodeId}
                      ref={el => { if (el) cardRefs.current[company.nodeId] = el; }}
                      className={`sh-company-card${isActive ? ' active' : ''}${isDimmed ? ' dimmed' : ''}`}
                      style={{ '--card-color': color, cursor: 'pointer' } as React.CSSProperties}
                      onClick={() => setSelectedNodeId(company.nodeId)}
                    >
                      {/* 헤더: 로고 + 회사명 */}
                      <div className="sh-card-header">
                        {logo ? (
                          <img src={logo} className="sh-card-logo" alt="" />
                        ) : (
                          <span className="sh-card-logo-placeholder">
                            {company.name.charAt(0)}
                          </span>
                        )}
                        <span className="sh-card-name">{company.name}</span>
                      </div>

                      {/* 주주 리스트 */}
                      <div className="sh-card-body">
                        {company.shareholders.map((sh, i) => (
                          <div
                            key={i}
                            className={`sh-sh-row ${sh.type === '법인' ? 'sh-row-corp' : 'sh-row-ind'}`}
                          >
                            <span className="sh-td-name">{sh.name}</span>
                            <span className="sh-td-pct">{sh.pct}</span>
                          </div>
                        ))}
                      </div>

                      {/* 합계 */}
                      <div className="sh-card-total">
                        <span className="sh-total-label">합계</span>
                        <span className="sh-total-pct">{total}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            detailInfo && currentCompany && (
              <div className="sh-detail-container">
                {/* 상단 툴바: 전체보기 버튼 */}
                <div className="sh-detail-toolbar">
                  <button className="sh-back-btn" onClick={() => setSelectedNodeId(null)}>
                    <span className="back-arrow">←</span> 전체보기
                  </button>
                </div>

                {/* 상단 요약 정보 (회사 기본정보 + 기업가치) */}
                <div className="sh-detail-header-card">
                  <div className="sh-detail-company-info">
                    {detailLogo ? (
                      <img src={detailLogo} className="sh-detail-logo" alt="" />
                    ) : (
                      <span className="sh-detail-logo-placeholder" style={{ backgroundColor: detailColor }}>
                        {currentCompany.name.charAt(0)}
                      </span>
                    )}
                    <div className="sh-detail-name-wrap">
                      <div className="sh-detail-name-row">
                        <span className="sh-detail-name">{currentCompany.name}</span>
                        <span className="sh-detail-firm-type">({detailInfo.firmType})</span>
                      </div>
                      <div className="sh-detail-meta-row">
                        <span>설립일 <b>{detailInfo.estDate}</b></span>
                        <span className="divider">|</span>
                        <span>업종 <b>{detailInfo.industry}</b></span>
                        <span className="divider">|</span>
                        <span>대표이사 <b>{detailInfo.ceo}</b></span>
                        <span className="divider">|</span>
                        <span>임직원 수 <b>{detailInfo.employees}</b></span>
                      </div>
                    </div>
                  </div>

                  {/* 기업 가치 평가 박스 */}
                  <div className="sh-detail-valuation-box">
                    <span className="val-title">비상장주식 평가에 따른 기업가치(시가총액)</span>
                    <span className="val-amount">{detailInfo.marketCap}</span>
                    <span className="val-date">(기준일 {detailInfo.valuationDate})</span>
                  </div>
                </div>

                {/* 중간: 주주 현황 (차트 + 주주 테이블) */}
                <div className="sh-detail-body-row">
                  <div className="sh-detail-chart-card">
                    <div className="sh-detail-section-title">주주현황</div>
                    <div className="sh-detail-chart-content">
                      {/* 파이 차트 영역 */}
                      <div className="sh-pie-chart-wrap">
                        <div className="sh-pie-chart" style={{
                          background: `conic-gradient(#2845a0 0% ${corpPct}%, #8c4a0e ${corpPct}% 100%)`
                        } as React.CSSProperties}>
                          <div className="sh-pie-center">
                            <span className="pie-label">발행주식총수</span>
                            <span className="pie-value">{detailInfo.totalSharesNum}</span>
                          </div>
                        </div>
                        <div className="sh-pie-legend">
                          <span className="legend-item corp">
                            <span className="legend-dot"></span>
                            법인 {corpPct.toFixed(1)}%
                          </span>
                          <span className="legend-item ind">
                            <span className="legend-dot"></span>
                            개인 {(100 - corpPct).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* 법인 주주 리스트 */}
                      <div className="sh-sh-list-col">
                        <div className="sh-list-header corp-bg">
                          <span className="list-header-title">법인 주주</span>
                          <span className="list-header-total">{corpSharesTotalStr}</span>
                        </div>
                        <div className="sh-list-body">
                          {currentCompany.shareholders.filter(s => s.type === '법인').map((sh, idx) => {
                            const pctVal = parseFloat(sh.pct);
                            const totalSharesVal = parseFloat(detailInfo.totalSharesNum.replace(/[^0-9]/g, ''));
                            const sharesNum = Math.round(totalSharesVal * pctVal / 100);
                            const sharesStr = sharesNum.toLocaleString() + '주';
                            return (
                              <div key={idx} className="sh-sh-detail-row">
                                <span className="sh-detail-row-name font-corp">{sh.name}</span>
                                <span className="sh-detail-row-shares">{sharesStr}</span>
                                <span className="sh-detail-row-pct">{sh.pct}</span>
                              </div>
                            );
                          })}
                          {currentCompany.shareholders.filter(s => s.type === '법인').length === 0 && (
                            <div className="sh-detail-row-empty">법인 주주 없음</div>
                          )}
                        </div>
                      </div>

                      {/* 개인 주주 리스트 */}
                      <div className="sh-sh-list-col">
                        <div className="sh-list-header ind-bg">
                          <span className="list-header-title">개인 주주</span>
                          <span className="list-header-total">{indSharesTotalStr}</span>
                        </div>
                        <div className="sh-list-body">
                          {currentCompany.shareholders.filter(s => s.type === '개인').map((sh, idx) => {
                            const pctVal = parseFloat(sh.pct);
                            const totalSharesVal = parseFloat(detailInfo.totalSharesNum.replace(/[^0-9]/g, ''));
                            const sharesNum = Math.round(totalSharesVal * pctVal / 100);
                            const sharesStr = sharesNum.toLocaleString() + '주';
                            return (
                              <div key={idx} className="sh-sh-detail-row">
                                <span className="sh-detail-row-name font-ind">{sh.name}</span>
                                <span className="sh-detail-row-shares">{sharesStr}</span>
                                <span className="sh-detail-row-pct">{sh.pct}</span>
                              </div>
                            );
                          })}
                          {currentCompany.shareholders.filter(s => s.type === '개인').length === 0 && (
                            <div className="sh-detail-row-empty">개인 주주 없음</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 하단: 비상장주식 평가 요약 테이블 */}
                <div className="sh-detail-valuation-table-card">
                  <div className="sh-detail-section-title">비상장주식 평가 요약</div>
                  <div className="table-responsive">
                    <table className="sh-valuation-table">
                      <thead>
                        <tr>
                          <th>평가 기준일</th>
                          <th>평가 방식</th>
                          <th>적용 할인율</th>
                          <th>주당 평가액</th>
                          <th>발행주식총수</th>
                          <th>기업가치(시가총액)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{detailInfo.valuationDate}</td>
                          <td>{detailInfo.evalMethod}</td>
                          <td>{detailInfo.discountRate}</td>
                          <td>{detailInfo.pricePerShare}</td>
                          <td>{detailInfo.totalSharesNum}</td>
                          <td className="highlight-text">{detailInfo.marketCap}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 최하단: 핵심 지표 4장 카드 */}
                <div className="sh-detail-stats-row">
                  <div className="sh-stat-card">
                    <div className="sh-stat-icon-wrap"><Users size={18} /></div>
                    <div className="sh-stat-info">
                      <span className="sh-stat-label">총 주주수</span>
                      <span className="sh-stat-val">{detailInfo.totalShCount}명</span>
                    </div>
                  </div>
                  <div className="sh-stat-card">
                    <div className="sh-stat-icon-wrap"><Building size={18} /></div>
                    <div className="sh-stat-info">
                      <span className="sh-stat-label">법인 주주</span>
                      <span className="sh-stat-val">{detailInfo.corpShCount}</span>
                    </div>
                  </div>
                  <div className="sh-stat-card">
                    <div className="sh-stat-icon-wrap"><User size={18} /></div>
                    <div className="sh-stat-info">
                      <span className="sh-stat-label">개인 주주</span>
                      <span className="sh-stat-val">{detailInfo.indShCount}</span>
                    </div>
                  </div>
                  <div className="sh-stat-card">
                    <div className="sh-stat-icon-wrap"><PieChart size={18} /></div>
                    <div className="sh-stat-info">
                      <span className="sh-stat-label">1인당 평균 보유지분율</span>
                      <span className="sh-stat-val">{detailInfo.avgPct}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
};

export default TeamOverlay;
