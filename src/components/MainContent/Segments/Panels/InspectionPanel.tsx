// src/components/MainContent/Segments/Panels/InspectionPanel.tsx
import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
} from '@mui/material';
import { 
  Close as CloseIcon,
  List as ListIcon,
  Add as AddIcon
} from '@mui/icons-material';

interface InspectionPanelProps {
  open: boolean;
  onClose: () => void;
}

const InspectionPanel: React.FC<InspectionPanelProps> = ({ open, onClose }) => {
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
        <ListIcon 
          sx={{ 
            color: '#f44336', 
            mr: 1.5, 
            fontSize: 28 
          }} 
        />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'medium', 
            flexGrow: 1
          }}
        >
          E2E-GI-InspectionStep1
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
        <Typography variant="body2" color="text.secondary" gutterBottom>
          E2E-GI-InspectionStepDescription1
        </Typography>
        
        <Box 
          sx={{ 
            mt: 3, 
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
      </DialogContent>
    </Dialog>
  );
};

export default InspectionPanel;
