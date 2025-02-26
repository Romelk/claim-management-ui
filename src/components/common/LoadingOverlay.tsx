// src/components/common/LoadingOverlay.tsx
import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { useClaimContext } from '../../context/ClaimContext';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading...' }) => {
  const { isLoading } = useClaimContext();

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" size={60} />
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" component="div">
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingOverlay;
