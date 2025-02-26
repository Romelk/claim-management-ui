import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const infoBlocks = [
  { id: 'skuList', label: 'SKU LIST' },
  { id: 'history', label: 'HISTORY' },
  { id: 'deliveryDetails', label: 'DELIVERY DETAILS' },
  { id: 'notes', label: 'NOTES' },
  { id: 'downloads', label: 'DOWNLOADS' },
];

const InfoBlockSection: React.FC = () => {
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const togglePanel = (blockId: string | null) => {
    setOpenPanel((prev) => (prev === blockId ? null : blockId));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, p: 1 }}>
      {infoBlocks.map((block) => (
        <Button
          key={block.id}
          onClick={() => togglePanel(block.id)}
          sx={{
            color: openPanel === block.id ? 'primary.main' : 'text.secondary',
            fontWeight: openPanel === block.id ? 'bold' : 'normal',
            textTransform: 'uppercase',
          }}
        >
          {block.label}
        </Button>
      ))}

      {openPanel && (
        <Box
          sx={{
            width: 350,
            bgcolor: 'grey.100',
            p: 2,
            height: '100vh',
            borderLeft: 1,
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Typography variant="h6">
              {infoBlocks.find((block) => block.id === openPanel)?.label}
            </Typography>
            <IconButton onClick={() => togglePanel(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2">
            Content for {infoBlocks.find((block) => block.id === openPanel)?.label}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InfoBlockSection;
