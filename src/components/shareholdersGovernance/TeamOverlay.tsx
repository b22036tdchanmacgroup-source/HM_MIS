import React from 'react';
import { X, Network } from 'lucide-react';
import GovernanceD3Chart from './GovernanceD3Chart';
import ShareholdersD3Chart from './ShareholdersD3Chart';

interface TeamOverlayProps {
  onClose: () => void;
  [key: string]: unknown;
}

const CHART_BASE_DATE = '2026.06';


const TeamOverlay: React.FC<TeamOverlayProps> = ({ onClose }) => {
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
            <GovernanceD3Chart />
          </div>

        </div>

        {/* ── 오른쪽: 주주 현황 ── */}
        <div className="gov-right-panel">
          <div className="gov-right-body">
            <div className="gov-right-placeholder">
              <div className="gov-d3-toggle">
                <span className="sh-chart-title-label">3. 주주 현황</span>
              </div>
              <div className="gov-right-placeholder-inner">
                <span className="gov-right-placeholder-text">주주 현황 데이터가 여기에 표시됩니다.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamOverlay;
