import React from 'react';
import { Box, Typography, Paper, Breadcrumbs } from '@mui/material';

const ClaimHeader: React.FC = () => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography color="text.secondary" variant="body2">CLAIM MANAGEMENT SYSTEM</Typography>
        <Typography color="text.secondary" variant="body2">STOCK ITEM CLAIMS</Typography>
        <Typography color="text.primary" variant="body2" fontWeight="medium">CLAIM#61011 DECISION</Typography>
      </Breadcrumbs>
    </Paper>
  );
};

export default ClaimHeader;

