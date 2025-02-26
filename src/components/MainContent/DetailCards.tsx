// src/components/MainContent/DetailCards.tsx
import React from 'react';
import { Box } from '@mui/material';
import DetailBlock from '../DetailBlock';

interface DetailCardsProps {
  details: Array<{
    id: string;
    label: string;
    value: string | number;
    canCopy?: boolean;
  }>;
}

const DetailCards: React.FC<DetailCardsProps> = ({ details }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        my: 3,
        flexWrap: 'nowrap',
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'grey.100',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'grey.400',
          borderRadius: 4,
        },
      }}
    >
      {details.map((detail) => (
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

export default DetailCards;
