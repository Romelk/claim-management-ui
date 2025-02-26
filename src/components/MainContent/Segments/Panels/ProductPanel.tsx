// src/components/MainContent/Segments/Panels/ProductPanel.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
} from '@mui/material';
import { 
  Close as CloseIcon,
  Inventory as ProductIcon
} from '@mui/icons-material';

// Sample product data
const productDetails = {
  retailerId: "1000000 (OTTO)",
  productCategory: "Bekleidung",
  productType: "Sweatshirt",
  brandName: "Tommy Hilfiger",
  baseColor: "-",
  variationId: "1666987640",
  styleCode: "TH-7206GK-147",
  enclosures: "-"
};

interface ProductPanelProps {
  open: boolean;
  onClose: () => void;
}

const ProductPanel: React.FC<ProductPanelProps> = ({ open, onClose }) => {
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
        <ProductIcon 
          sx={{ 
            color: '#d32f2f', 
            mr: 1.5, 
            fontSize: 28 
          }} 
        />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'medium', 
            color: '#d32f2f',
            flexGrow: 1
          }}
        >
          PRODUCT
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Retailer Id (Retailer Name)
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.retailerId}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Product Category
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.productCategory}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Product Type
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.productType}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Brand Name
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.brandName}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Base Color
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.baseColor}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Variation ID
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.variationId}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Style Code
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.styleCode}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Enclosures
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {productDetails.enclosures}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPanel;
