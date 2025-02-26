import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Types
interface DetailBlockProps {
  label: string;
  value: string | number;
  canCopy?: boolean;
  minWidth?: string | number;
}

// Improved Detail Block Component with uniform height and subtle left border
const DetailBlock: React.FC<DetailBlockProps> = ({
  label,
  value,
  canCopy = false,
  minWidth = 150,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value.toString());
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content vertically
        alignItems: 'flex-start', // Align content to the left
        textAlign: 'left', // Ensure text is left-aligned
        minWidth: minWidth,
        minHeight: 100, // Set a fixed height for uniformity
        borderLeft: '4px solid #bbb', // Subtle left border for visual separation
        backgroundColor: 'white',
        mb: 2,
        width: 'fit-content',
        maxWidth: '100%',
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: '0.875rem' }}>
        {label}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mt: 0.5,
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.2,
            wordBreak: 'break-word',
            textAlign: 'left',
            flexGrow: 1,
          }}
        >
          {value}
        </Typography>

        {canCopy && (
          <IconButton
            aria-label="copy"
            size="small"
            onClick={handleCopy}
            sx={{
              opacity: 0.6,
              '&:hover': { opacity: 1 },
              flexShrink: 0,
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export { DetailBlock };
