import React from 'react';
import { Box, Typography, Paper, Chip, Breadcrumbs, Button, IconButton } from '@mui/material';
import {
  GetApp as DownloadIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import { DetailBlock } from './DetailBlock';

// Types
interface ClaimDetail {
  id: string;
  label: string;
  value: string | number;
  canCopy?: boolean;
}

interface ClaimHeaderProps {
  claimId: string;
  articleId: string;
  isPlanned: boolean;
  status: 'inProgress' | 'billing' | 'closed';
  isLinkable: boolean;
  details: ClaimDetail[];
}

// Status Chip Component with color mapping
const StatusChip: React.FC<{ label: string; type: string }> = ({ label, type }) => {
  // Map types to colors
  const colorMap: Record<string, any> = {
    planned: { color: 'primary', backgroundColor: 'primary.light', borderColor: 'primary.main' },
    unplanned: {
      color: 'warning.dark',
      backgroundColor: 'warning.light',
      borderColor: 'warning.main',
    },
    inProgress: { color: 'info.dark', backgroundColor: 'info.light', borderColor: 'info.main' },
    billing: {
      color: 'secondary.dark',
      backgroundColor: 'secondary.light',
      borderColor: 'secondary.main',
    },
    closed: {
      color: 'success.dark',
      backgroundColor: 'success.light',
      borderColor: 'success.main',
    },
    linkable: { color: 'grey.700', backgroundColor: 'grey.100', borderColor: 'grey.400' },
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
          px: 1.5,
        },
      }}
    />
  );
};

// Main Claim Header Component
const ClaimHeader: React.FC<ClaimHeaderProps> = ({
  claimId,
  articleId,
  isPlanned,
  status,
  isLinkable,
  details,
}) => {
  return (
    <Paper elevation={1} sx={{ mb: 3, overflow: 'hidden' }}>
      {/* Header with title and actions */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
          <Button variant="outlined" size="small" startIcon={<DownloadIcon />}>
            Download PDF
          </Button>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Claim Overview Section */}
      <Box sx={{ p: 2.5 }}>
        {/* Claim ID and Article ID */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Claim Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Claim #{claimId} • Article #{articleId}
          </Typography>
        </Box>

        {/* Status Pills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <StatusChip
            type={isPlanned ? 'planned' : 'unplanned'}
            label={isPlanned ? 'Planned Claim' : 'Unplanned Claim'}
          />
          <StatusChip
            type={status}
            label={
              status === 'inProgress' ? 'In Progress' : status === 'billing' ? 'Billing' : 'Closed'
            }
          />
          {isLinkable && <StatusChip type="linkable" label="Linkable Claim" />}
        </Box>

        {/* Claim Details - New Style */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            bgcolor: 'grey.50',
            p: 2,
            borderRadius: 1,
            mb: 3,
          }}
        >
          {details.map((detail) => (
            <Box
              key={detail.id}
              sx={{
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'auto' },
                minWidth: { md: '180px' },
                flexGrow: 1,
                maxWidth: { md: '250px' },
              }}
            >
              <DetailBlock label={detail.label} value={detail.value} canCopy={detail.canCopy} />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

// Example Usage Component
const ClaimOverviewSection: React.FC = () => {
  // Sample data
  const claimDetails: ClaimDetail[] = [
    { id: 'articleNumber', label: 'Article Number', value: '27501739', canCopy: true },
    { id: 'itemSize', label: 'Item Size', value: '0' },
    { id: 'ean', label: 'EAN', value: '3607345809915', canCopy: true },
    { id: 'orderNumber', label: 'Order Number', value: '1234567', canCopy: true },
    { id: 'supplier', label: 'Supplier', value: 'Phillips - 88618' },
    { id: 'warehouse', label: 'Warehouse', value: 'Sudhafen' },
    { id: 'checkQuantity', label: 'Check quantity', value: '1' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumb Navigation */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Typography color="text.secondary" variant="body2">
            CLAIM MANAGEMENT SYSTEM
          </Typography>
          <Typography color="text.secondary" variant="body2">
            STOCK ITEM CLAIMS
          </Typography>
          <Typography color="text.primary" variant="body2" fontWeight="medium">
            CLAIM#61011 DECISION
          </Typography>
        </Breadcrumbs>
      </Paper>

      {/* Claim Header */}
      <ClaimHeader
        claimId="61011"
        articleId="4343898349"
        isPlanned={true}
        status="inProgress"
        isLinkable={true}
        details={claimDetails}
      />
    </Box>
  );
};

export default ClaimOverviewSection;
