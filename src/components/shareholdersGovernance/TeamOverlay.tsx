import React, { useState, useRef, useEffect } from 'react';
import { X, Network, ChevronRight } from 'lucide-react';
import GovernanceD3Chart from './GovernanceD3Chart';
import ShareholdersD3Chart from './ShareholdersD3Chart';
import { SHAREHOLDER_DATA } from './shareholderData';
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

        {/* ── 오른쪽: 주주 현황 ── */}
        <div className="gov-right-panel">

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
                  style={{ '--card-color': color } as React.CSSProperties}
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

                  {/* 주주 리스트 (스크롤 영역, 8개 이상 시 스크롤) */}
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

        </div>
      </div>
    </div>
  );
};

export default TeamOverlay;
