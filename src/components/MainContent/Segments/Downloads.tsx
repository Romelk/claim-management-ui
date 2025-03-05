import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Chip,
    Divider
} from '@mui/material';
import {
    PictureAsPdf as PdfIcon,
    Description as DocIcon,
    Archive as ZipIcon,
    InsertDriveFile as FileIcon,
    Visibility as VisibilityIcon,
    Download as DownloadIcon,
    Delete as DeleteIcon,
    GetApp as DownloadsIcon
} from '@mui/icons-material';

// Mock download data - in a real app, this would come from a context or API
const mockDownloads = [
    {
        id: 'download1',
        name: 'Claim_Report_2025.pdf',
        type: 'PDF',
        size: '856 KB',
        date: '25 Feb 2025',
    },
    {
        id: 'download2',
        name: 'Supporting_Documents.zip',
        type: 'ZIP',
        size: '2.3 MB',
        date: '20 Feb 2025',
    },
    {
        id: 'download3',
        name: 'Policy_Details.docx',
        type: 'DOCX',
        size: '128 KB',
        date: '15 Feb 2025',
    }
];

const Downloads = () => {
    // Get icon based on document type (matching DocumentPanel)
    const getDocumentIcon = (type: string) => {
        switch (type) {
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

    // Handlers for download actions
    const handleDownload = (fileName: string) => {
        // Simulate download - in a real app, this would trigger actual file download
        console.log(`Downloading ${fileName}`);
        alert(`Downloading ${fileName}`);
    };

    const handlePreview = (fileName: string) => {
        // Simulate preview - in a real app, this would open a preview
        console.log(`Previewing ${fileName}`);
        alert(`Previewing ${fileName}`);
    };

    const handleDelete = (fileId: string, fileName: string) => {
        // Simulate delete - in a real app, this would remove from download list
        console.log(`Deleting ${fileName}`);
        alert(`Deleted ${fileName}`);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                >
                    <DownloadsIcon sx={{ mr: 2 }} />
                    Downloads
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Access and manage documents related to this claim for easy reference and sharing
                </Typography>
                <Divider />
            </Box>

            {mockDownloads.length === 0 ? (
                <Box
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                    }}
                >
                    <Typography color="text.secondary">
                        No downloads available.
                    </Typography>
                </Box>
            ) : (
                <List>
                    {mockDownloads.map((download) => (
                        <ListItem
                            key={download.id}
                            sx={{
                                mb: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                },
                            }}
                        >
                            <ListItemIcon>
                                {getDocumentIcon(download.type)}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="subtitle1" fontWeight="medium">
                                            {download.name}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mt: 1,
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Chip
                                                label={download.type}
                                                size="small"
                                                sx={{
                                                    borderRadius: 1,
                                                    bgcolor: 'action.hover',
                                                    color: 'text.primary',
                                                    fontWeight: 'medium',
                                                    mr: 1.5,
                                                }}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                {download.size}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                size="small"
                                                aria-label="view"
                                                onClick={() => handlePreview(download.name)}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                aria-label="download"
                                                onClick={() => handleDownload(download.name)}
                                            >
                                                <DownloadIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                aria-label="delete"
                                                onClick={() => handleDelete(download.id, download.name)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Downloads;