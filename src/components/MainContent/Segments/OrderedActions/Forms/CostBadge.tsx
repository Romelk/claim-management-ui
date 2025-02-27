import React from 'react';

interface CostBadgeProps {
    totalCost: number;
}

const CostBadge: React.FC<CostBadgeProps> = ({ totalCost = 0 }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '25px',
                right: '30px',
                backgroundColor: '#1976d2',
                color: 'white',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center'
            }}
        >
      <span style={{ marginRight: '8px', fontWeight: 'normal', fontSize: '0.875rem' }}>
        Total cost:
      </span>
            {totalCost.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR'
            })}
        </div>
    );
};

export default CostBadge;