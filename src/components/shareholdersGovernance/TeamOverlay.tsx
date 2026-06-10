import React, { useState, useRef, useEffect } from 'react';
import { X, Network, ChevronRight } from 'lucide-react';
import GovernanceD3Chart from './GovernanceD3Chart';
import ShareholdersD3Chart from './ShareholdersD3Chart';
import { SHAREHOLDER_DATA } from './shareholderData';
import { GOV_D3_STYLE } from './govD3Data';

interface TeamOverlayProps {
  onClose: () => void;
  [key: string]: unknown;
}

const CHART_BASE_DATE = '2026.06';

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
              const isActive = selectedNodeId === company.nodeId;
              const isDimmed = selectedNodeId !== null && !isActive;
              return (
                <div
                  key={company.nodeId}
                  ref={el => { if (el) cardRefs.current[company.nodeId] = el; }}
                  className={`sh-company-card${isActive ? ' active' : ''}${isDimmed ? ' dimmed' : ''}`}
                  style={{ '--card-color': color } as React.CSSProperties}
                >
                  <div className="sh-card-header">
                    <span className="sh-card-name">{company.name}</span>
                  </div>
                  <table className="sh-card-table">
                    <colgroup>
                      <col className="col-name" />
                      <col className="col-type" />
                      <col className="col-pct" />
                    </colgroup>
                    <tbody>
                      {company.shareholders.map((sh, i) => (
                        <tr
                          key={i}
                          className={sh.type === '법인' ? 'sh-row-corp' : 'sh-row-ind'}
                        >
                          <td className="sh-td-name">{sh.name}</td>
                          <td className="sh-td-type">
                            <span className={`sh-type-badge ${sh.type === '법인' ? 'corp' : 'ind'}`}>
                              {sh.type}
                            </span>
                          </td>
                          <td className="sh-td-pct">{sh.pct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
