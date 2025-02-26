import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Chip,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button
} from '@mui/material';
import {
  GetApp as DownloadIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import { DetailBlock } from './DetailBlock';
//import InfoBlockSection from './InfoBlockSection'; // Importing InfoBlockSection

// Types
interface ClaimDetail {
  id: string;
  label: string;
  value: string | number;
  canCopy?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface DefectItem {
  description: string;
}

interface FaultCode {
  code: string;
  description: string;
}

interface Note {
  content: string;
}

interface InspectionData {
  totalDeliveryQuantity: number;
  sampleSize: number;
  totalInspectedItems: number;
  defects: DefectItem[];
  faultCodes: FaultCode[];
  notes: Note[];
}

interface ReworkAction {
  id: string;
  status: string;
  notes: string;
  step: string;
  subStatus: string;
  timeType: string;
}

// Status Chip Component with color mapping
const StatusChip: React.FC<{ label: string; type: string }> = ({ label, type }) => {
  // Map types to colors
  const colorMap: Record<string, any> = {
    planned: { color: 'primary', backgroundColor: 'primary.light', borderColor: 'primary.main' },
    unplanned: { color: 'warning.dark', backgroundColor: 'warning.light', borderColor: 'warning.main' },
    inProgress: { color: 'info.dark', backgroundColor: 'info.light', borderColor: 'info.main' },
    billing: { color: 'secondary.dark', backgroundColor: 'secondary.light', borderColor: 'secondary.main' },
    closed: { color: 'success.dark', backgroundColor: 'success.light', borderColor: 'success.main' },
    linkable: { color: 'grey.700', backgroundColor: 'grey.100', borderColor: 'grey.400' }
  };

  const styles = colorMap[type] || colorMap.linkable;

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: 'medium',
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        borderColor: styles.borderColor,
        borderWidth: 1,
        borderStyle: 'solid',
        '& .MuiChip-label': {
          px: 1.5
        }
      }}
    />
  );
};

// Components
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

// Main Component
const ClaimManagementSystem: React.FC = () => {
  // States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mainTabValue, setMainTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  const [actionTabValue, setActionTabValue] = useState(0);

  // Toggle sidebar
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data
  const claimDetails: ClaimDetail[] = [
    { id: 'articleNumber', label: 'Article Number', value: '27501739', canCopy: true },
    { id: 'itemSize', label: 'Item Size', value: 'XL' },
    { id: 'ean', label: 'EAN', value: '3607345809915', canCopy: true },
    { id: 'orderNumber', label: 'Order Number', value: '1234567', canCopy: true },
    { id: 'supplier', label: 'Supplier', value: 'Phillips - 88618' },
    { id: 'warehouse', label: 'Warehouse', value: 'Sudhafen' }
  ];

  const inspectionData: InspectionData = {
    totalDeliveryQuantity: 300,
    sampleSize: 8,
    totalInspectedItems: 10,
    defects: [
      { description: 'Manufacturer labelling (type designation / care label)' },
      { description: 'Foreign brand' }
    ],
    faultCodes: [
      { code: '1630 (Q)', description: 'Manufacturer\'s marking missing' }
    ],
    notes: [
      { content: 'Fault in markings' }
    ]
  };

  const reworkActions: ReworkAction[] = [
    {
      id: 'REWK_001',
      status: 'Planned',
      notes: '-',
      step: 'Step 1',
      subStatus: 'Success',
      timeType: '150'
    }
  ];

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
          overflow: 'hidden'
        }}
      >
        {/* Header / Breadcrumbs */}
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
        
        {/* Main Content */}
        <Box sx={{ p: 3, overflow: 'auto', flexGrow: 1 }}>
          <Paper elevation={1} sx={{ mb: 3 }}>
            {/* Claim Header */}
            <Box sx={{ p: 2.5, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" gutterBottom>Claim Decision</Typography>
                <Typography variant="body2" color="text.secondary">
                  View comprehensive details and decisions of a claim.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<DownloadIcon />}
                >
                  Download PDF
                </Button>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            
            {/* Claim Overview */}
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>Claim Overview</Typography>
                <Typography variant="body2" color="text.secondary">
                  Claim #61011 • Article #4343898349
                </Typography>
              </Box>
              
              {/* Status Pills */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <StatusChip type="planned" label="Planned Claim" />
                <StatusChip type="inProgress" label="In Progress" />
                <StatusChip type="linkable" label="Linkable Claim" />
              </Box>
              
              {/* Claim Details - Optimized Size */}
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                bgcolor: 'grey.50',
                p: 2,
                borderRadius: 1,
                mb: 3
              }}>
                {claimDetails.map((detail) => {
                  // Calculate appropriate minimum width based on content
                  let estimatedWidth;
                  const valueLength = String(detail.value).length;
                  
                  if (detail.id === 'articleNumber') {
                    estimatedWidth = 150;
                  } else if (detail.id === 'ean') {
                    estimatedWidth = 190;
                  } else if (detail.id === 'itemSize') {
                    estimatedWidth = 100;
                  } else if (detail.id === 'supplier') {
                    estimatedWidth = 180;
                  } else if (detail.id === 'warehouse') {
                    estimatedWidth = 140;
                  } else if (detail.id === 'orderNumber') {
                    estimatedWidth = 140;
                  } else {
                    // Default sizing logic based on content length
                    estimatedWidth = Math.max(100, Math.min(250, valueLength * 10));
                  }
                  
                  return (
                    <Box 
                      key={detail.id} 
                      sx={{ 
                        display: 'inline-flex',
                        flexDirection: 'column'
                      }}
                    >
                      <DetailBlock 
                        label={detail.label} 
                        value={detail.value} 
                        canCopy={detail.canCopy}
                        minWidth={estimatedWidth}
                      />
                    </Box>
                  );
                })}
              </Box>
              
              {/* Main Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                  value={mainTabValue} 
                  onChange={(_, newValue) => setMainTabValue(newValue)}
                  aria-label="claim tabs"
                >
                  <Tab label="SKU List" />
                  <Tab label="History" />
                  <Tab label="Delivery Details" />
                  <Tab label="Notes" />
                  <Tab label="Downloads" />
                </Tabs>
              </Box>
              
              {/* Sub Tabs */}
              <Box sx={{ bgcolor: 'grey.100', borderTopLeftRadius: 4, borderTopRightRadius: 4, mb: 3 }}>
                <Tabs
                  value={subTabValue}
                  onChange={(_, newValue) => setSubTabValue(newValue)}
                  aria-label="inspection tabs"
                >
                  <Tab 
                    label="Inspection Details" 
                    sx={{ 
                      borderTopLeftRadius: 4,
                      bgcolor: subTabValue === 0 ? 'white' : 'transparent'
                    }} 
                  />
                  <Tab 
                    label="Product Details" 
                    sx={{ 
                      borderTopLeftRadius: 4,
                      bgcolor: subTabValue === 1 ? 'white' : 'transparent'
                    }} 
                  />
                </Tabs>
              </Box>
              
              {/* Inspection Details Content */}
              <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Total delivery quantity
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {inspectionData.totalDeliveryQuantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Sample size
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {inspectionData.sampleSize}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Total inspected items
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {inspectionData.totalInspectedItems}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Inspection Issues
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Defects
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {inspectionData.defects.map((defect, index) => (
                        <Typography key={index} variant="body2" paragraph sx={{ mb: 1 }}>
                          {defect.description}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Fault codes
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {inspectionData.faultCodes.map((fault, index) => (
                        <Typography key={index} variant="body2" paragraph sx={{ mb: 1 }}>
                          {fault.code}<br />
                          {fault.description}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Notes
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {inspectionData.notes.map((note, index) => (
                        <Typography key={index} variant="body2" paragraph sx={{ mb: 1 }}>
                          {note.content}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              
              {/* Order Actions */}
              <Paper variant="outlined">
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">Order Actions</Typography>
                </Box>
                
                {/* Action Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={actionTabValue}
                    onChange={(_, newValue) => setActionTabValue(newValue)}
                    aria-label="action tabs"
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    <Tab 
                      label="Rework" 
                      sx={{ 
                        color: actionTabValue === 0 ? 'white' : 'inherit',
                        bgcolor: actionTabValue === 0 ? 'primary.main' : 'transparent'
                      }} 
                    />
                    <Tab 
                      label="Secondary Inspection" 
                      sx={{ 
                        color: actionTabValue === 1 ? 'white' : 'inherit',
                        bgcolor: actionTabValue === 1 ? 'primary.main' : 'transparent'
                      }} 
                    />
                  </Tabs>
                </Box>
                
                {/* Rework Table */}
                <Box sx={{ p: 2 }}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                          <TableCell>Request ID</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Notes</TableCell>
                          <TableCell>Steps</TableCell>
                          <TableCell>Sub-Status</TableCell>
                          <TableCell>Time Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reworkActions.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Chip 
                                  label="To Do" 
                                  size="small" 
                                  color="success" 
                                  sx={{ mb: 0.5, maxWidth: 'fit-content' }} 
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {row.id}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.notes}</TableCell>
                            <TableCell>
                              <Chip 
                                label={row.step} 
                                size="small" 
                                color="info" 
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>{row.subStatus}</TableCell>
                            <TableCell>{row.timeType}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      <Box component="span" fontWeight="medium">To Do:</Box> Yet to be Started
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Box component="span" fontWeight="medium">In Progress:</Box> Started
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Box component="span" fontWeight="medium">Done:</Box> Currently working on hold
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Box component="span" fontWeight="medium">Completed:</Box> No issues with any steps and 100% of the Ordered Quantity
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Box component="span" fontWeight="medium">Partially Processed:</Box> Either issues with steps or &lt;100% ordered
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <Box component="span" fontWeight="medium">Failed:</Box> &lt;=80% success
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight="medium">Pending:</Box> Lease will be pending status in case of Planned Rework with Inspection
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimManagementSystem;
