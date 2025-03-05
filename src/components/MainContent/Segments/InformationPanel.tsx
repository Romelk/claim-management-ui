// src/components/MainContent/Segments/InformationPanel.tsx
import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Divider, Chip, Button } from '@mui/material';
import {
    Inventory as ProductIcon,
    FormatListBulleted as CharacteristicsIcon,
    Image as ImagesIcon,
    LocalShipping as DeliveryIcon,
    List as InspectionIcon,
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
    ChevronLeft as ChevronLeftIcon,
    ExpandMore as ExpandMoreIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';

// Import the updated inspection content component
import InspectionContent from './InspectionContent';

// Sample product data
const productDetails = {
    retailerId: '1000000 (OTTO)',
    productCategory: 'Bekleidung',
    productType: 'Sweatshirt',
    brandName: 'Tommy Hilfiger',
    baseColor: '-',
    variationId: '1666987640',
    styleCode: 'TH-7206GK-147',
    enclosures: '-',
};

// Sample characteristics data
const characteristicsDetails = {
    material: 'Cotton (80%), Polyester (20%)',
    size: 'Medium',
    weight: '350g',
    dimensions: '60 × 40 × 2 cm',
    color: 'Navy Blue',
    pattern: 'Solid',
    features: ['Long sleeves', 'Crew neck', 'Ribbed cuffs', 'Machine washable'],
    careInstructions: 'Machine wash cold, tumble dry low'
};

// Sample images data
const imagesData = [
    { id: 'img1', name: 'Front View', url: '/placeholder-1.jpg', dateAdded: '23 Feb 2025', isPrimary: true },
    { id: 'img2', name: 'Back View', url: '/placeholder-2.jpg', dateAdded: '23 Feb 2025', isPrimary: false },
    { id: 'img3', name: 'Detail Shot', url: '/placeholder-3.jpg', dateAdded: '23 Feb 2025', isPrimary: false },
    { id: 'img4', name: 'Defect Close-up', url: '/placeholder-4.jpg', dateAdded: '24 Feb 2025', isPrimary: false },
];

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

const CharacteristicsContent: React.FC<ContentProps> = ({ onClose }) => (
    <>
        <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px)' }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Material
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {characteristicsDetails.material}
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Size
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {characteristicsDetails.size}
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Weight
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {characteristicsDetails.weight}
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Dimensions
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {characteristicsDetails.dimensions}
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Color
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {characteristicsDetails.color}
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Pattern
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {characteristicsDetails.pattern}
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Features
                </Typography>
                {characteristicsDetails.features.map((feature, index) => (
                    <Typography key={index} variant="body1" sx={{ mb: 0.5 }}>
                        • {feature}
                    </Typography>
                ))}
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Care Instructions
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                    {characteristicsDetails.careInstructions}
                </Typography>
            </Box>
        </Box>
    </>
);

const ImagesContent: React.FC<ContentProps> = ({ onClose }) => (
    <>
        <Box sx={{ p: 2, overflowY: 'auto', height: 'calc(100% - 56px)' }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Article Images
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                {imagesData.map((image) => (
                    <Box
                        key={image.id}
                        sx={{
                            width: 'calc(50% - 8px)',
                            mb: 2,
                            position: 'relative',
                            borderRadius: 1,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Box
                            sx={{
                                height: 150,
                                bgcolor: 'action.hover',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {image.name}
                            </Typography>
                            {image.isPrimary && (
                                <Chip
                                    label="Primary"
                                    size="small"
                                    color="primary"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                    }}
                                />
                            )}
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                                Added: {image.dateAdded}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <IconButton size="small" aria-label="view">
                                    <VisibilityIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" aria-label="download">
                                    <DownloadIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
                size="medium"
                sx={{
                    py: 1.5,
                    borderRadius: 1,
                }}
            >
                ADD IMAGE
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
        </Box>
    </>
);

// Main component
const InformationPanel: React.FC<{
    activePanel: string;
    onPanelChange: (panel: string) => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}> = ({ activePanel, onPanelChange, isCollapsed, onToggleCollapse }) => {
    // Panel options - Updated to match requirements
    const panels: PanelOption[] = [
        {
            id: 'inspection',
            icon: <InspectionIcon />,
            label: 'Inspection Details',
            color: '#f44336',
            tooltip: 'View Inspection Details',
        },
        {
            id: 'product',
            icon: <ProductIcon />,
            label: 'Product Details',
            color: '#1976d2',
            tooltip: 'View Product Details',
        },
        {
            id: 'characteristics',
            icon: <CharacteristicsIcon />,
            label: 'Characteristics',
            color: '#673ab7',
            tooltip: 'View Characteristics',
        },
        {
            id: 'images',
            icon: <ImagesIcon />,
            label: 'Images',
            color: '#2e7d32',
            tooltip: 'View Article Images',
        },
        {
            id: 'delivery',
            icon: <DeliveryIcon />,
            label: 'Delivery Details',
            color: '#ff9800',
            tooltip: 'View Delivery Details',
        },
    ];

    const handlePanelOpen = (panelId: string) => {
        onPanelChange(activePanel === panelId ? null : panelId);
        if (isCollapsed) {
            onToggleCollapse();
        }
    };

    const handlePanelClose = () => {
        onPanelChange(null);
    };

    const toggleCollapse = () => {
        onToggleCollapse();
        if (!isCollapsed) {
            onPanelChange(null);
        }
    };

    // Get current panel title
    const getPanelTitle = () => {
        if (activePanel) {
            const panel = panels.find((p) => p.id === activePanel);
            return panel ? panel.label.toUpperCase() : 'Information Panel';
        }
        return 'Information Panel';
    };

    // Get the color for the active panel
    const getActiveColor = () => {
        if (activePanel) {
            const panel = panels.find((p) => p.id === activePanel);
            return panel ? panel.color : 'inherit';
        }
        return 'inherit';
    };

    // Render content based on active panel
    const renderContent = () => {
        switch (activePanel) {
            case 'product':
                return <ProductContent onClose={handlePanelClose} />;
            case 'characteristics':
                return <CharacteristicsContent onClose={handlePanelClose} />;
            case 'images':
                return <ImagesContent onClose={handlePanelClose} />;
            case 'delivery':
                return <DeliveryContent onClose={handlePanelClose} />;
            case 'inspection':
                return <InspectionContent onClose={handlePanelClose} />;
            default:
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.secondary',
                            flexDirection: 'column',
                            p: 3,
                        }}
                    >
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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '60px',
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                    }}
                >
                    {/* Header with expand button */}
                    <Box
                        sx={{
                            p: 1,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Tooltip title="Expand panel" placement="left">
                            <IconButton onClick={toggleCollapse} size="small">
                                <ChevronLeftIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* Side Navigation - collapsed view */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            py: 2,
                            flexGrow: 1,
                            bgcolor: 'white',
                        }}
                    >
                        {panels.map((panel) => (
                            <Tooltip key={panel.id} title={panel.tooltip} placement="left" arrow>
                                <IconButton
                                    onClick={() => handlePanelOpen(panel.id)}
                                    sx={{
                                        my: 1,
                                        color: 'text.secondary',
                                        borderRadius: 0,
                                        p: 1.5,
                                        width: '100%',
                                        justifyContent: 'center',
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {activePanel && (
                            <Box sx={{ mr: 1.5, color: getActiveColor() }}>
                                {panels.find((p) => p.id === activePanel)?.icon}
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
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        position: 'relative',
                        overflow: 'hidden',
                        height: 'calc(100vh - 170px)', // Increased height to minimize scrolling
                    }}
                >
                    {/* Content display area */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            height: '100%',
                            overflow: 'hidden',
                            marginRight: '60px', // Leave space for the sidebar
                            bgcolor: "white"
                        }}
                    >
                        {renderContent()}
                    </Box>

                    {/* Side Navigation - fixed on the right */}
                    <Box
                        sx={{
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
                            bgcolor: 'white',
                            zIndex: 1,
                        }}
                    >
                        {panels.map((panel) => (
                            <Tooltip key={panel.id} title={panel.tooltip} placement="left" arrow>
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
                                        justifyContent: 'center',
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