import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const History: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        History
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          p: 3,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" color="text.secondary" align="center">
          This section will display the history of actions and changes for this claim.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Feature coming soon.
        </Typography>
      </Paper>
    </Box>
  );
};

export default History;
