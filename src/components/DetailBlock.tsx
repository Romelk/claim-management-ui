// src/components/DetailBlock.tsx
import React from 'react';
import { Card, Typography, Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface DetailBlockProps {
  label: string;
  value: string | number;
  canCopy?: boolean;
}

const DetailBlock: React.FC<DetailBlockProps> = ({ label, value, canCopy = false }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value.toString());
  };

  return (
    <Card
      elevation={1}
      sx={{
        p: 2,
        minWidth: 180,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {label}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" component="div" sx={{ fontWeight: 'medium' }}>
          {value}
        </Typography>

        {canCopy && (
          <Tooltip title="Copy">
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                ml: 1,
                opacity: 0.7,
                '&:hover': { opacity: 1 },
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
};

export default DetailBlock;
