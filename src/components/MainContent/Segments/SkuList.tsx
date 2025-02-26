import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SkuList: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        SKU List
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
          alignItems: 'center'
        }}
      >
        <Typography variant="subtitle1" color="text.secondary" align="center">
          This section will display all SKUs associated with this claim.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Feature coming soon.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SkuList;
