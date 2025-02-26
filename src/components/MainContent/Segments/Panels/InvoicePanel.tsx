// src/components/MainContent/Segments/Panels/InvoicePanel.tsx
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
  Chip
} from '@mui/material';
import { 
  Close as CloseIcon,
  Receipt as InvoiceIcon,
  CalendarToday as CalendarIcon,
  Payments as PaymentsIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

// Sample invoice data
const invoiceDetails = {
  invoiceNumber: "INV-2025-0234",
  date: "21 Feb 2025",
  dueDate: "07 Mar 2025",
  totalAmount: "$329.99",
  status: "Pending",
  paymentMethod: "Credit Card",
  items: [
    { id: 1, description: "Tommy Hilfiger Sweatshirt", quantity: 1, unitPrice: "$299.99", total: "$299.99" },
    { id: 2, description: "Shipping Fee", quantity: 1, unitPrice: "$30.00", total: "$30.00" }
  ]
};

interface InvoicePanelProps {
  open: boolean;
  onClose: () => void;
}

const InvoicePanel: React.FC<InvoicePanelProps> = ({ open, onClose }) => {
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
          maxHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 3,
        pb: 2
      }}>
        <InvoiceIcon 
          sx={{ 
            color: '#673ab7', 
            mr: 1.5, 
            fontSize: 28 
          }} 
        />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'medium', 
            color: '#673ab7',
            flexGrow: 1
          }}
        >
          INVOICE
        </Typography>
        <IconButton 
          edge="end" 
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {invoiceDetails.invoiceNumber}
          </Typography>
          <Chip 
            label={invoiceDetails.status} 
            color={invoiceDetails.status === "Paid" ? "success" : "warning"} 
            size="small" 
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Invoice Date:
            </Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {invoiceDetails.date}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Due Date:
            </Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {invoiceDetails.dueDate}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PaymentsIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Payment Method:
            </Typography>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {invoiceDetails.paymentMethod}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Line Items
        </Typography>
        
        {invoiceDetails.items.map((item) => (
          <Box 
            key={item.id} 
            sx={{ 
              mb: 2,
              pb: 2,
              borderBottom: item.id < invoiceDetails.items.length ? '1px dashed rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            <Typography variant="body2" fontWeight="medium">
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {item.quantity} × {item.unitPrice}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {item.total}
              </Typography>
            </Box>
          </Box>
        ))}
        
        <Box 
          sx={{ 
            bgcolor: '#f5f5f5', 
            p: 2, 
            borderRadius: 1, 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 3
          }}
        >
          <Typography variant="subtitle2">Total</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {invoiceDetails.totalAmount}
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />}
          fullWidth
          sx={{ 
            bgcolor: '#673ab7', 
            '&:hover': { bgcolor: '#5e35b1' },
            textTransform: 'uppercase',
            mt: 3
          }}
        >
          Download Invoice
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePanel;
