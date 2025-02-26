import React from 'react';
import { Box } from '@mui/material';
import { DetailBlock } from './DetailBlock';

const claimDetails = [
  { id: 'articleNumber', label: 'Article Number', value: '27501739', canCopy: true },
  { id: 'itemSize', label: 'Item Size', value: 'XL' },
  { id: 'ean', label: 'EAN', value: '3607345809915', canCopy: true },
  { id: 'orderNumber', label: 'Order Number', value: '1234567', canCopy: true },
  { id: 'supplier', label: 'Supplier', value: 'Phillips - 88618' },
  { id: 'warehouse', label: 'Warehouse', value: 'Sudhafen' },
];

const ClaimDetails: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2.5,
        bgcolor: 'grey.50',
        borderRadius: 1,
        mb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {claimDetails.map((detail) => (
        <DetailBlock
          key={detail.id}
          label={detail.label}
          value={detail.value}
          canCopy={detail.canCopy}
        />
      ))}
    </Box>
  );
};

export default ClaimDetails;
