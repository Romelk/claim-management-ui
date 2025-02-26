// src/components/MainContent/ContentTabs.tsx
import React from 'react';
import { Box, Tabs, Tab, Card } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`claim-tabpanel-${index}`}
      aria-labelledby={`claim-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ContentTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="claim content tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 120,
              fontWeight: 'medium',
            },
            '& .Mui-selected': {
              fontWeight: 'bold',
            }
          }}
        >
          <Tab label="Inspection Details" />
          <Tab label="Ordered Actions" />
          <Tab label="Product Details" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        Inspection Details Content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Ordered Actions Content
      </TabPanel>
      <TabPanel value={value} index={2}>
        Product Details Content
      </TabPanel>
    </Card>
  );
};

export default ContentTabs;
