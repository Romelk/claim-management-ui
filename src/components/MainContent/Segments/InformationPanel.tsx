// src/components/MainContent/Segments/InformationPanel.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton,
  Tooltip,
  Divider,
  Chip,
  Button
} from '@mui/material';
import { 
  Inventory as ProductIcon,
  Description as DocumentIcon,
  Receipt as InvoiceIcon,
  LocalShipping as DeliveryIcon,
  List as ListIcon,
  Close as CloseIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Payments as PaymentsIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  Archive as ZipIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
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

// Sample document data
const documentData = [
  { id: 'doc1', name: 'Claim Documentation.pdf', type: 'PDF', date: '23 Feb 2025', size: '1.2 MB' },
  { id: 'doc2', name: 'Inspection Report.docx', type: 'DOCX', date: '24 Feb 2025', size: '546 KB' },
  { id: 'doc3', name: 'Supporting Images.zip', type: 'ZIP', date: '24 Feb 2025', size: '3.8 MB' }
];

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

// Sample delivery data
const deliveryDetails = {
  trackingNumber: "TRK7823456912",
  carrier: "FedEx",
  status: "Delivered",
  deliveryDate: "20 Feb 2025",
  address: "123 Main Street, Apt 4B, New York, NY 10001",
  contactName: "John Doe",
  contactPhone: "+1 (555) 123-4567",
  shipmentWeight: "0.8 kg",
  events: [
    { date: "20 Feb 2025 14:32", description: "Delivered" },
    { date: "20 Feb 2025 08:15", description: "Out for delivery" },
    { date: "19 Feb 2025 19:42", description: "Arrived at local facility" },
    { date: "18 Feb 2025 09:30", description: "Shipped from distribution center" }
  ]
};

// Panel type definitions
interface PanelOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  tooltip: string;
}

// Common interface for content components
interface ContentProps {
  onClose: () => void;
}

// Content components for each panel
const ProductContent: React.FC<ContentProps> = ({ onClose }) => (
  <>
    <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px)' }}>
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
    </Box>
  </>
);

const DocumentContent: React.FC<ContentProps> = ({ onClose }) => {
  // Get icon based on document type
  const getDocumentIcon = (type: string) => {
    switch(type) {
      case 'PDF':
        return <PdfIcon sx={{ mr: 1.5, color: '#f44336' }} />;
      case 'DOCX':
        return <DocIcon sx={{ mr: 1.5, color: '#1976d2' }} />;
      case 'ZIP':
        return <ZipIcon sx={{ mr: 1.5, color: '#ff9800' }} />;
      default:
        return <FileIcon sx={{ mr: 1.5, color: 'text.secondary' }} />;
    }
  };

  return (
    <>
      <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px)' }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Claim Documents
        </Typography>

        {/* Document List */}
        <Box sx={{ mb: 3 }}>
          {documentData.map((document) => (
            <Box
              key={document.id}
              sx={{
                p: 2,
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {getDocumentIcon(document.type)}
                <Typography variant="subtitle1" fontWeight="medium">
                  {document.name}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                mt: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    label={document.type} 
                    size="small" 
                    sx={{ 
                      borderRadius: 1,
                      bgcolor: 'action.hover',
                      color: 'text.primary',
                      fontWeight: 'medium',
                      mr: 1.5
                    }} 
                  />
                  <Typography variant="body2" color="text.secondary">
                    {document.size}
                  </Typography>
                </Box>
                
                <Box>
                  <IconButton size="small" aria-label="view">
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" aria-label="download">
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                Uploaded: {document.date}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Upload Button */}
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          fullWidth
          size="medium"
          sx={{ 
            py: 1.5,
            borderRadius: 1
          }}
        >
          UPLOAD DOCUMENT
        </Button>
      </Box>
    </>
  );
};

const InvoiceContent: React.FC<ContentProps> = ({ onClose }) => (
  <>
    <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px)' }}>
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
    </Box>
  </>
);

const DeliveryContent: React.FC<ContentProps> = ({ onClose }) => (
  <>
    <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px)' }}>
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
          color={deliveryDetails.status === "Delivered" ? "success" : "primary"} 
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
              '&:before': index < deliveryDetails.events.length - 1 ? {
                content: '""',
                position: 'absolute',
                left: 5,
                top: 20,
                bottom: -10,
                width: 1,
                bgcolor: 'divider'
              } : {}
            }}
          >
            <Box 
              sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: index === 0 ? '#2e7d32' : 'divider',
                mr: 2,
                mt: 1
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
          '&:hover': { borderColor: '#1b5e20', bgcolor: 'rgba(46, 125, 50, 0.04)' }
        }}
      >
        Track Package
      </Button>
    </Box>
  </>
);

const InspectionContent: React.FC<ContentProps> = ({ onClose }) => (
  <>
    <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px)' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        E2E-GI-InspectionStepDescription1
      </Typography>
      
      <Box 
        sx={{ 
          mt: 2, 
          p: 2, 
          bgcolor: '#f8f8f8', 
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center' 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="span" 
            sx={{ 
              display: 'inline-flex',
              mr: 2,
              color: '#d32f2f'
            }}
          >
            <AddIcon fontSize="small" />
          </Box>
          <Typography fontWeight="medium">Inspection Issue</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            bgcolor: '#d32f2f', 
            '&:hover': { bgcolor: '#b71c1c' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '0.75rem'
          }}
        >
          Add
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 4 }}>
        <Button 
          variant="outlined"
          sx={{ textTransform: 'uppercase' }}
        >
          Previous
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined"
            sx={{ textTransform: 'uppercase' }}
          >
            Skip
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: '#d32f2f', 
              '&:hover': { bgcolor: '#b71c1c' },
              textTransform: 'uppercase'
            }}
          >
            Finish this step
          </Button>
        </Box>
      </Box>
    </Box>
  </>
);

// Main component
const InformationPanel: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Panel options
  const panels: PanelOption[] = [
    { id: 'product', icon: <ProductIcon />, label: 'Product', color: '#d32f2f', tooltip: 'View Product Details' },
    { id: 'document', icon: <DocumentIcon />, label: 'Document', color: '#1976d2', tooltip: 'View Documents' },
    { id: 'invoice', icon: <InvoiceIcon />, label: 'Invoice', color: '#673ab7', tooltip: 'View Invoice' },
    { id: 'delivery', icon: <DeliveryIcon />, label: 'Delivery', color: '#2e7d32', tooltip: 'View Delivery Details' },
    { id: 'inspection', icon: <ListIcon />, label: 'Inspection', color: '#f44336', tooltip: 'View Inspection Details' },
  ];
  
  const handlePanelOpen = (panelId: string) => {
    setActivePanel(activePanel === panelId ? null : panelId);
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };
  
  const handlePanelClose = () => {
    setActivePanel(null);
  };
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setActivePanel(null);
    }
  };
  
  // Get current panel title
  const getPanelTitle = () => {
    if (activePanel) {
      const panel = panels.find(p => p.id === activePanel);
      return panel ? panel.label.toUpperCase() : 'Information Panel';
    }
    return 'Information Panel';
  };
  
  // Get the color for the active panel
  const getActiveColor = () => {
    if (activePanel) {
      const panel = panels.find(p => p.id === activePanel);
      return panel ? panel.color : 'inherit';
    }
    return 'inherit';
  };
  
  // Render content based on active panel
  const renderContent = () => {
    switch (activePanel) {
      case 'product':
        return <ProductContent onClose={handlePanelClose} />;
      case 'document':
        return <DocumentContent onClose={handlePanelClose} />;
      case 'invoice':
        return <InvoiceContent onClose={handlePanelClose} />;
      case 'delivery':
        return <DeliveryContent onClose={handlePanelClose} />;
      case 'inspection':
        return <InspectionContent onClose={handlePanelClose} />;
      default:
        return (
          <Box sx={{ 
            display: 'flex', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'text.secondary',
            flexDirection: 'column',
            p: 3
          }}>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              Select an option from the right sidebar to view details.
            </Typography>
          </Box>
        );
    }
  };
  
  if (isCollapsed) {
    return (
      <Box sx={{ display: 'flex', height: '100%', position: 'relative' }}>
        {/* Collapsed view with just the expand button and vertical sidebar */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%', 
          width: '60px',
          borderLeft: '1px solid',
          borderColor: 'divider',
          position: 'relative'
        }}>
          {/* Header with expand button */}
          <Box sx={{ 
            p: 1, 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Tooltip title="Expand panel" placement="left">
              <IconButton onClick={toggleCollapse} size="small">
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Side Navigation - collapsed view */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            flexGrow: 1,
            bgcolor: 'background.paper'
          }}>
            {panels.map((panel) => (
              <Tooltip 
                key={panel.id} 
                title={panel.tooltip} 
                placement="left"
                arrow
              >
                <IconButton 
                  onClick={() => handlePanelOpen(panel.id)}
                  sx={{ 
                    my: 1,
                    color: 'text.secondary',
                    borderRadius: 0,
                    p: 1.5,
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  {panel.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', height: '100%', position: 'relative' }}>
      {/* Main container with fixed sidebar layout */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%', 
        width: '100%' 
      }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {activePanel && (
              <Box sx={{ mr: 1.5, color: getActiveColor() }}>
                {panels.find(p => p.id === activePanel)?.icon}
              </Box>
            )}
            <Typography variant="subtitle1" fontWeight="medium" sx={{ color: getActiveColor() }}>
              {getPanelTitle()}
            </Typography>
          </Box>
          <Tooltip title="Collapse panel" placement="left">
            <IconButton onClick={toggleCollapse} size="small">
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Content Area - takes remaining height */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          position: 'relative',
          overflow: 'hidden',
          height: 'calc(100vh - 170px)' // Increased height to minimize scrolling
        }}>
          {/* Content display area */}
          <Box sx={{ 
            flexGrow: 1, 
            height: '100%', 
            overflow: 'hidden',
            marginRight: '60px' // Leave space for the sidebar
          }}>
            {renderContent()}
          </Box>
          
          {/* Side Navigation - fixed on the right */}
          <Box sx={{ 
            width: '60px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            borderLeft: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            zIndex: 1
          }}>
            {panels.map((panel) => (
              <Tooltip 
                key={panel.id} 
                title={panel.tooltip} 
                placement="left"
                arrow
              >
                <IconButton 
                  onClick={() => handlePanelOpen(panel.id)}
                  sx={{ 
                    my: 1,
                    color: activePanel === panel.id ? panel.color : 'text.secondary',
                    bgcolor: activePanel === panel.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                    borderRight: activePanel === panel.id ? '3px solid' : '3px solid transparent',
                    borderColor: activePanel === panel.id ? panel.color : 'transparent',
                    borderRadius: 0,
                    p: 1.5,
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  {panel.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InformationPanel;
