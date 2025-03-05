// InspectionContent component for the Information Panel
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableRow,
    ImageList,
    ImageListItem,
    Dialog,
    DialogContent,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

// Sample static data
const inspectionSummary = {
    totalDelivery: 300,
    sampleSize: 8,
    inspectedItems: 10,
};

const inspectionIssues = [
    {
        stepName: 'Manufacturer Label Inspection',
        faultCode: '1630 (Q)',
        impactedItems: 5,
        notes: "Manufacturer's marking missing",
        images: [
            { src: '/images/inspection1.jpg', alt: 'Inspection Image 1' },
            { src: '/images/inspection2.jpg', alt: 'Inspection Image 2' },
        ],
    },
    {
        stepName: 'Brand Compliance Check',
        faultCode: '1750 (Q)',
        impactedItems: 3,
        notes: 'Foreign brand identification found',
        images: [
            { src: '/images/inspection3.jpg', alt: 'Inspection Image 3' },
            { src: '/images/inspection4.jpg', alt: 'Inspection Image 4' },
        ],
    },
];

// InspectionContent component
const InspectionContent = ({ onClose }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImages, setSelectedImages] = useState<{ src: string; alt: string }[]>([]);

    const handleImageClick = (images: { src: string; alt: string }[]) => {
        setSelectedImages(images);
        setOpenDialog(true);
    };

    return (
        <Box sx={{ height: '100%', overflowY: 'auto', p: 2 }}>
            {/* Inspection identifier */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    E2E-GI-InspectionStepDescription1
                </Typography>
            </Box>

            {/* Static Summary Section */}
            <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 2, pb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Summary
                </Typography>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                                <Typography variant="body2">Total Delivery Quantity</Typography>
                            </TableCell>
                            <TableCell sx={{ border: 'none', py: 0.5 }}>
                                <Typography variant="body2" fontWeight="medium">
                                    {inspectionSummary.totalDelivery}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                                <Typography variant="body2">Sample Size</Typography>
                            </TableCell>
                            <TableCell sx={{ border: 'none', py: 0.5 }}>
                                <Typography variant="body2" fontWeight="medium">
                                    {inspectionSummary.sampleSize}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                                <Typography variant="body2">Total Inspected Items</Typography>
                            </TableCell>
                            <TableCell sx={{ border: 'none', py: 0.5 }}>
                                <Typography variant="body2" fontWeight="medium">
                                    {inspectionSummary.inspectedItems}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>

            {/* Issues Section */}
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                Inspection Issues
            </Typography>

            {inspectionIssues.map((issue, index) => (
                <Accordion key={index} defaultExpanded={index === 0} disableGutters elevation={0}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ px: 1, py: 0.5, minHeight: 'unset' }}
                    >
                        <Typography variant="body2" fontWeight="medium">
                            {issue.stepName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1, py: 0.5 }}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                                        <Typography variant="body2">Fault Code</Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', py: 0.5 }}>
                                        <Typography variant="body2" fontWeight="medium">
                                            {issue.faultCode}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                                        <Typography variant="body2">Impacted Items</Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', py: 0.5 }}>
                                        <Typography variant="body2" fontWeight="medium">
                                            {issue.impactedItems}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                                        <Typography variant="body2">Notes</Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', py: 0.5 }}>
                                        <Typography variant="body2" fontWeight="medium">
                                            {issue.notes}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                {issue.images.length > 0 && (
                                    <TableRow>
                                        <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }} colSpan={2}>
                                            <Typography variant="body2" gutterBottom>
                                                Images
                                            </Typography>
                                            <ImageList cols={2} gap={4}>
                                                {issue.images.map((image, imgIndex) => (
                                                    <ImageListItem
                                                        key={imgIndex}
                                                        onClick={() => handleImageClick(issue.images)}
                                                    >
                                                        <Box
                                                            sx={{
                                                                cursor: 'pointer',
                                                                width: '100%',
                                                                height: '80px',
                                                                borderRadius: '4px',
                                                                bgcolor: 'action.hover',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <Typography variant="caption" color="text.secondary">
                                                                {image.alt}
                                                            </Typography>
                                                        </Box>
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Image Viewer Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogContent sx={{ maxHeight: '80vh', overflowY: 'auto', p: 0 }}>
                    <ImageList cols={1} gap={0}>
                        {selectedImages.map((image, index) => (
                            <ImageListItem key={index}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '300px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <Typography variant="body1">
                                        {image.alt}
                                    </Typography>
                                </Box>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default InspectionContent;