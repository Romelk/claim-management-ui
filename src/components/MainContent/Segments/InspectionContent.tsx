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
    IconButton,
    Chip,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ContentCopy as ContentCopyIcon } from '@mui/icons-material';

// Sample static data
const inspectionSummary = {
    inspectionId: '123456',
    sampleSize: 8,
    inspectionDate: '19 Mar 2025'
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
    {
        stepName: 'Size Measurement Check',
        faultCode: '1420 (Q)',
        impactedItems: 2,
        notes: 'Dimensions out of specification',
        images: [],
    },
    {
        stepName: 'Packaging Inspection',
        faultCode: '1820 (Q)',
        impactedItems: 4,
        notes: 'Packaging damage detected',
        images: [],
    },
    {
        stepName: 'Material Quality Check',
        faultCode: '1520 (Q)',
        impactedItems: 1,
        notes: 'Material does not match specification',
        images: [],
    },
];

// InspectionContent component
const InspectionContent = ({ onClose }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedImages, setSelectedImages] = useState<{ src: string; alt: string }[]>([]);
    const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

    const handleImageClick = (images: { src: string; alt: string }[]) => {
        setSelectedImages(images);
        setOpenDialog(true);
    };

    // Handle accordion change
    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    // Calculate total impacted items
    const totalImpactedItems = inspectionIssues.reduce((sum, issue) => sum + issue.impactedItems, 0);

    // Count steps with issues
    const stepsWithIssues = inspectionIssues.length;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            bgcolor: '#ffffff'
        }}>
            {/* Fixed header that stays in place */}
            <Box sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: '#ffffff',
                zIndex: 1,
                position: 'sticky',
                top: 0,
                pt: 2,
                px: 2,
                pb: 1
            }}>
                {/* Inspection Issues section header with ID and issue count */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Inspection Issues
                    </Typography>
                    <Chip
                        label={`${stepsWithIssues} ${stepsWithIssues === 1 ? 'Issue' : 'Issues'}`}
                        color="error"
                        size="small"
                        variant="outlined"
                    />
                </Box>

                {/* Inspection ID moved inside the Issues section */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Inspection ID:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                        <Typography variant="body1" sx={{ ml: 1 }}>
                            {inspectionSummary.inspectionId}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => copyToClipboard(inspectionSummary.inspectionId)}
                            sx={{ ml: 1 }}
                            aria-label="Copy inspection ID"
                        >
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {/* Scrollable content area */}
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                px: 2,
                pt: 2,
                pb: 2
            }}>
                <Box sx={{
                    position: 'relative',
                    transition: 'all 0.3s ease'
                }}>
                    {inspectionIssues.map((issue, index) => (
                        <Accordion
                            key={index}
                            expanded={expandedPanel === `panel-${index}`}
                            onChange={handleAccordionChange(`panel-${index}`)}
                            disableGutters
                            sx={{
                                mb: 1.5,
                                boxShadow: '0px 1px 3px rgba(0,0,0,0.08)',
                                borderRadius: 1,
                                '&:before': {
                                    display: 'none',
                                },
                                bgcolor: '#d8d8d8',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                            }}
                            TransitionProps={{
                                unmountOnExit: false,
                                timeout: {
                                    enter: 300,
                                    exit: 300
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    px: 2,
                                    py: 1
                                }}
                            >
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {issue.stepName}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ border: 'none', py: 1, pl: 0, width: '30%' }}>
                                                <Typography variant="body2" color="text.secondary">Fault Code</Typography>
                                            </TableCell>
                                            <TableCell sx={{ border: 'none', py: 1 }}>
                                                <Typography variant="body2">
                                                    {issue.faultCode}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ border: 'none', py: 1, pl: 0 }}>
                                                <Typography variant="body2" color="text.secondary">Impacted Items</Typography>
                                            </TableCell>
                                            <TableCell sx={{ border: 'none', py: 1 }}>
                                                <Typography variant="body2">
                                                    {issue.impactedItems}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ border: 'none', py: 1, pl: 0 }}>
                                                <Typography variant="body2" color="text.secondary">Notes</Typography>
                                            </TableCell>
                                            <TableCell sx={{ border: 'none', py: 1 }}>
                                                <Typography variant="body2">
                                                    {issue.notes}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        {issue.images.length > 0 && (
                                            <TableRow>
                                                <TableCell sx={{ border: 'none', py: 1, pl: 0 }} colSpan={2}>
                                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                                        Images
                                                    </Typography>
                                                    <ImageList cols={2} gap={8} sx={{ mb: 0 }}>
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
                                                                        bgcolor: '#ffffff',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                    }}
                                                                >
                                                                    <Typography variant="caption">
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
                </Box>
            </Box>

            {/* Footer section */}
            <Box sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                bottom: 0,
                zIndex: 1,
                bgcolor: '#ffffff'
            }}>
                {/* Inspection date above the stats */}
                <Box sx={{ p: 1, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary">
                        Inspection Date: {inspectionSummary.inspectionDate}
                    </Typography>
                </Box>

                {/* Stats grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                    }}
                >
                    <Box
                        sx={{
                            py: 1.5,
                            px: 2,
                            textAlign: 'center',
                            borderRight: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Sample Size
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 500 }}>
                            {inspectionSummary.sampleSize}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            py: 1.5,
                            px: 2,
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Affected Items
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 500, color: 'error.main' }}>
                            {totalImpactedItems}
                        </Typography>
                    </Box>
                </Box>
            </Box>

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