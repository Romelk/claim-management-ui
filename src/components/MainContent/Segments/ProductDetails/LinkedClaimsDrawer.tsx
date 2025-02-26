// src/components/MainContent/Segments/ProductDetails/LinkedClaimsDrawer.tsx
import React from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LinkedClaimsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const LinkedClaimsDrawer: React.FC<LinkedClaimsDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
          width: 320,
          position: 'absolute',
          height: '100%',
          borderLeft: '1px solid',
          borderColor: 'divider'
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">Linked Claims</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        {/* Linked Claims content */}
      </Box>
    </Drawer>
  );
};

export default LinkedClaimsDrawer;  // Remove the .tsx extension
