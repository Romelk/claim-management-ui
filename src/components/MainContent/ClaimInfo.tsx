// src/components/MainContent/ClaimInfo.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface ClaimInfoProps {
  claimId: string;
  articleId: string;
}

const ClaimInfo: React.FC<ClaimInfoProps> = ({ claimId, articleId }) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary">
        Claim #{claimId} • Article #{articleId}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 'medium',
            px: 2
          }}
        >
          Planned Claim
        </Button>
        
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 'medium',
            px: 2,
            bgcolor: 'info.light',
            color: 'info.main',
            '&:hover': {
              bgcolor: 'info.main',
              color: 'white'
            }
          }}
        >
          In Progress
        </Button>
        
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 'medium',
            px: 2,
            color: 'text.secondary',
            borderColor: 'grey.300'
          }}
        >
          Linkable Claim
        </Button>
      </Box>
    </Box>
  );
};

export default ClaimInfo;
