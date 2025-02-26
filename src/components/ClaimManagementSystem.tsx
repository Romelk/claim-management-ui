// src/components/ClaimManagementSystem.tsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton, Breadcrumbs, Tooltip } from '@mui/material';
import {
  GetApp as DownloadIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import ContentSegments from './MainContent/ContentSegments';

// Sample data for the detail cards
const claimDetails = [
  { id: 'articleNumber', label: 'Article Number', value: '27501739', canCopy: true },
  { id: 'itemSize', label: 'Item Size', value: 'XL' },
  { id: 'ean', label: 'EAN', value: '3607345809915', canCopy: true },
  { id: 'orderNumber', label: 'Order Number', value: '1234567', canCopy: true },
  { id: 'supplier', label: 'Supplier', value: 'Phillips - 88618' },
  { id: 'warehouse', label: 'Warehouse', value: 'Sudhafen' },
];

const ClaimManagementSystem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const claimId = '61011';
  const claimStatus = 'In Progress';

  // Helper function to determine the color based on status
  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'success';
    if (status === 'In Progress') return 'info';
    if (status === 'Pending') return 'warning';
    return 'info'; // Default color
  };

  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setOpenTooltip(id);
    setTimeout(() => {
      setOpenTooltip(null);
    }, 1500);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Typography color="text.secondary" variant="body2">
              CLAIM MANAGEMENT SYSTEM
            </Typography>
            <Typography color="text.secondary" variant="body2">
              STOCK ITEM CLAIMS
            </Typography>
            <Typography color="text.primary" variant="body2" fontWeight="medium">
              CLAIM#{claimId} DECISION
            </Typography>
          </Breadcrumbs>
        </Paper>

        {/* Content Area */}
        <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Header Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Claim Decision
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View comprehensive details and decisions of a claim.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{ textTransform: 'none' }}
              >
                Download PDF
              </Button>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Claim Overview Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Claim Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Claim #{claimId} • Article #4343898349
            </Typography>

            {/* Status Pills */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2, mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ borderRadius: 4, textTransform: 'none' }}
              >
                Planned Claim
              </Button>
              <Button
                variant="contained"
                color={getStatusColor(claimStatus)}
                size="small"
                sx={{ borderRadius: 4, textTransform: 'none' }}
              >
                {claimStatus}
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: 4, textTransform: 'none', color: 'text.secondary' }}
              >
                Linkable Claim
              </Button>
            </Box>

            {/* Detail Cards Row */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                mb: 3,
              }}
            >
              {claimDetails.map((detail) => (
                <Paper
                  key={detail.id}
                  elevation={1}
                  sx={{
                    p: 2,
                    minWidth: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    position: 'relative',
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {detail.label}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body1" fontWeight="medium">
                      {detail.value}
                    </Typography>
                    {detail.canCopy && (
                      <Tooltip
                        title="Copied!"
                        open={openTooltip === detail.id}
                        placement="top"
                        arrow
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleCopyToClipboard(detail.value, detail.id)}
                          sx={{ ml: 1, p: 0.5 }}
                        >
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>

          {/* Content Segments (Two sections) */}
          <Box sx={{ flexGrow: 1, minHeight: 0, mt: 2 }}>
            <ContentSegments />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimManagementSystem;
