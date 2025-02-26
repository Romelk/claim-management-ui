// src/components/MainContent/ContentSegments.tsx
import React from 'react';
import { Box, Paper } from '@mui/material';
import ContentLayout from './ContentLayout';
import InformationPanel from './Segments/InformationPanel';

const ContentSegments = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        width: '100%',
        gap: 3,
        mt: 2,
        flexDirection: 'column'
      }}
    >
      {/* Main Content Layout with Left Navigation */}
      <ContentLayout />
      
      {/* Information Panel (collapsible) */}
      <Paper 
        variant="outlined" 
        sx={{ 
          width: '100%',
          height: '30vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          borderRadius: 1,
          mt: 2
        }}
      >
        <InformationPanel />
      </Paper>
    </Box>
  );
};

export default ContentSegments;
