import React from 'react';

interface GovernanceMainProps {
  onNodeClick?: (nodeId: string | null) => void;
}

const GovernanceMain: React.FC<GovernanceMainProps> = (_props) => {
  return (
    <div style={{ flex: 1, width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <iframe 
        src={`${import.meta.env.BASE_URL}hm_misystem/index.html`}
        style={{ flex: 1, width: '100%', border: 'none' }}
        title="지배구조 카테고리"
      />
    </div>
  );
};

export default GovernanceMain;
