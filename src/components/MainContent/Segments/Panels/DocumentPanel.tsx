// src/components/MainContent/Segments/Panels/DocumentPanel.tsx
import React, { useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Description as DocumentIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  Archive as ZipIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Import our claim context
import { useClaimContext, Document } from '../../../../context/ClaimContext';

interface DocumentPanelProps {
  open: boolean;
  onClose: () => void;
}

const DocumentPanel: React.FC<DocumentPanelProps> = ({ open, onClose }) => {
  const [uploadHover, setUploadHover] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Use our claim context
  const { documents, addDocument, removeDocument, showNotification, setIsLoading } =
    useClaimContext();

  // Simulate a document upload
  const handleUpload = () => {
    setUploading(true);
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const newDocument: Document = {
        id: `doc${Date.now()}`,
        name: `New Document-${Math.floor(Math.random() * 1000)}.pdf`,
        type: 'PDF',
        date: '25 Feb 2025',
        size: '856 KB',
      };

      addDocument(newDocument);
      setUploading(false);
      setIsLoading(false);
      showNotification('success', 'Document uploaded successfully!');
    }, 1500);
  };

  // Simulate a document download
  const handleDownload = (documentName: string) => {
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      showNotification('success', `Downloaded ${documentName}`);
    }, 800);
  };

  // Simulate a document preview
  const handlePreview = (documentName: string) => {
    showNotification('info', `Previewing ${documentName}...`);
  };

  // Handle document deletion
  const handleDelete = (documentId: string, documentName: string) => {
    removeDocument(documentId);
    showNotification('info', `Removed ${documentName}`);
  };

  // Get icon based on document type
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
        <DocumentIcon
          sx={{
            color: '#1976d2',
            mr: 1.5,
            fontSize: 28,
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'medium',
            color: '#1976d2',
            flexGrow: 1,
          }}
        >
          DOCUMENTS
        </Typography>
        <IconButton edge="end" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Claim Documents
        </Typography>

        {/* Document List */}
        <Box sx={{ mb: 3 }}>
          {documents.length === 0 ? (
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: 'action.hover',
                borderRadius: 1,
              }}
            >
              <Typography color="text.secondary">
                No documents available. Upload a document to get started.
              </Typography>
            </Box>
          ) : (
            documents.map((document) => (
              <Box
                key={document.id}
                sx={{
                  p: 3,
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
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {getDocumentIcon(document.type)}
                  <Typography variant="subtitle1" fontWeight="medium">
                    {document.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 1.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label={document.type}
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
                      {document.size}
                    </Typography>
                  </Box>

                  <Box>
                    <IconButton
                      size="small"
                      aria-label="view"
                      onClick={() => handlePreview(document.name)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="download"
                      onClick={() => handleDownload(document.name)}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label="delete"
                      onClick={() => handleDelete(document.id, document.name)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                  Uploaded: {document.date}
                </Typography>
              </Box>
            ))
          )}
        </Box>

        {/* Upload Button */}
        <Button
          variant="contained"
          startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
          fullWidth
          size="large"
          disabled={uploading}
          onClick={handleUpload}
          sx={{
            py: 1.5,
            bgcolor: uploadHover ? 'primary.dark' : 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            transition: 'background-color 0.3s',
            borderRadius: 1,
          }}
          onMouseEnter={() => setUploadHover(true)}
          onMouseLeave={() => setUploadHover(false)}
        >
          {uploading ? 'UPLOADING...' : 'UPLOAD DOCUMENT'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPanel;
