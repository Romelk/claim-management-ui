// src/components/MainContent/Segments/Panels/DeliveryPanel.tsx
import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Chip,
} from '@mui/material';
import { Close as CloseIcon, LocalShipping as DeliveryIcon } from '@mui/icons-material';

// Sample delivery data
const deliveryDetails = {
  trackingNumber: 'TRK7823456912',
  carrier: 'FedEx',
  status: 'Delivered',
  deliveryDate: '20 Feb 2025',
  address: '123 Main Street, Apt 4B, New York, NY 10001',
  contactName: 'John Doe',
  contactPhone: '+1 (555) 123-4567',
  shipmentWeight: '0.8 kg',
  events: [
    { date: '20 Feb 2025 14:32', description: 'Delivered' },
    { date: '20 Feb 2025 08:15', description: 'Out for delivery' },
    { date: '19 Feb 2025 19:42', description: 'Arrived at local facility' },
    { date: '18 Feb 2025 09:30', description: 'Shipped from distribution center' },
  ],
};

interface DeliveryPanelProps {
  open: boolean;
  onClose: () => void;
}

const DeliveryPanel: React.FC<DeliveryPanelProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          bgcolor: 'background.paper',
          boxShadow: 3,
          height: 'auto',
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 3,
          pb: 2,
        }}
      >
        <DeliveryIcon
          sx={{
            color: '#2e7d32',
            mr: 1.5,
            fontSize: 28,
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'medium',
            color: '#2e7d32',
            flexGrow: 1,
          }}
        >
          DELIVERY
        </Typography>
        <IconButton edge="end" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Tracking Number
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {deliveryDetails.trackingNumber}
            </Typography>
          </Box>
          <Chip
            label={deliveryDetails.status}
            color={deliveryDetails.status === 'Delivered' ? 'success' : 'primary'}
            size="small"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Carrier
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {deliveryDetails.carrier}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Delivery Date
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {deliveryDetails.deliveryDate}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Weight
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {deliveryDetails.shipmentWeight}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Delivery Address
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {deliveryDetails.address}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {deliveryDetails.contactName}
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {deliveryDetails.contactPhone}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Tracking History
        </Typography>

        <Box sx={{ mb: 2 }}>
          {deliveryDetails.events.map((event, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                mb: 2,
                position: 'relative',
                '&:before':
                  index < deliveryDetails.events.length - 1
                    ? {
                        content: '""',
                        position: 'absolute',
                        left: 5,
                        top: 20,
                        bottom: -10,
                        width: 1,
                        bgcolor: 'divider',
                      }
                    : {},
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: index === 0 ? '#2e7d32' : 'divider',
                  mr: 2,
                  mt: 1,
                }}
              />
              <Box>
                <Typography variant="body2" fontWeight={index === 0 ? 'medium' : 'regular'}>
                  {event.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            textTransform: 'uppercase',
            mt: 2,
            borderColor: '#2e7d32',
            color: '#2e7d32',
            '&:hover': { borderColor: '#1b5e20', bgcolor: 'rgba(46, 125, 50, 0.04)' },
          }}
        >
          Track Package
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryPanel;
