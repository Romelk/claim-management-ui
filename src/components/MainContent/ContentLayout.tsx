// src/components/MainContent/ContentLayout.tsx
import React, { useState } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Typography,
  Divider
} from '@mui/material';
import { 
  Assignment as OrderedActionsIcon,
  Link as LinkableClaimsIcon,
  ViewList as SKUListIcon,
  History as HistoryIcon,
  GetApp as DownloadsIcon
} from '@mui/icons-material';

// Import content components
import OrderedActions from './Segments/OrderedActions';

// New components to be created later
const LinkableClaims = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">Linkable Claims</Typography>
    <Typography variant="body2" color="text.secondary">
      This section will display linkable claims.
    </Typography>
  </Box>
);

const SKUList = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">SKU List</Typography>
    <Typography variant="body2" color="text.secondary">
      This section will display SKU List.
    </Typography>
  </Box>
);

const History = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">History</Typography>
    <Typography variant="body2" color="text.secondary">
      This section will display history.
    </Typography>
  </Box>
);

const Downloads = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">Downloads</Typography>
    <Typography variant="body2" color="text.secondary">
      This section will display downloads.
    </Typography>
  </Box>
);

const ContentLayout = () => {
  const [activeSection, setActiveSection] = useState('orderedActions');

  // Define navigation items
  const navigationItems = [
    { id: 'orderedActions', label: 'Ordered Actions', icon: <OrderedActionsIcon /> },
    { id: 'linkableClaims', label: 'Linkable Claims', icon: <LinkableClaimsIcon /> },
    { id: 'skuList', label: 'SKU List', icon: <SKUListIcon /> },
    { id: 'history', label: 'History', icon: <HistoryIcon /> },
    { id: 'downloads', label: 'Downloads', icon: <DownloadsIcon /> },
  ];

  // Render main content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'orderedActions':
        return <OrderedActions />;
      case 'linkableClaims':
        return <LinkableClaims />;
      case 'skuList':
        return <SKUList />;
      case 'history':
        return <History />;
      case 'downloads':
        return <Downloads />;
      default:
        return <OrderedActions />;
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        width: '100%',
        height: '70vh', // Increased height for better use of space
        gap: 2
      }}
    >
      {/* Navigation Menu */}
      <Paper 
        variant="outlined" 
        sx={{ 
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="medium">
            Navigation
          </Typography>
        </Box>
        <List component="nav" sx={{ flexGrow: 1, overflowY: 'auto', pt: 0 }}>
          {navigationItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                  sx={{ 
                    borderLeft: activeSection === item.id ? '4px solid' : '4px solid transparent',
                    borderColor: activeSection === item.id ? 'primary.main' : 'transparent',
                    bgcolor: activeSection === item.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
              <Divider variant="middle" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Content Area */}
      <Paper 
        variant="outlined" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        {renderContent()}
      </Paper>
    </Box>
  );
};

export default ContentLayout;
