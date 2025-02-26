import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import ClaimHeader from './ClaimHeader';
import ClaimDetails from './ClaimDetails';
import InfoBlockSection from './InfoBlockSection';

const ClaimManagementSystem: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <ClaimHeader />
        <Box sx={{ p: 3, overflow: 'auto', flexGrow: 1, display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <ClaimDetails />
          </Box>
          <InfoBlockSection />
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimManagementSystem;
