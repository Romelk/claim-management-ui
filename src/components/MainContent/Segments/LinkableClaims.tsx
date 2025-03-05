import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider
} from '@mui/material';
import { Link as LinkableClaimsIcon } from '@mui/icons-material';

const LinkableClaims: React.FC = () => {
    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            px: 2,  // Add horizontal padding
            py: 1   // Add vertical padding
        }}>
            <Box sx={{
                mb: 4,  // Increased bottom margin
                mt: 2,  // Added top margin
            }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 1.5  // Adjusted margin between icon and text
                    }}
                >
                    <LinkableClaimsIcon sx={{ mr: 2 }} />
                    Linkable Claims
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        pr: 4  // Added right padding
                    }}
                >
                    View all the claims that are either linked or Linkable to the current Claim, based on specific conditions
                </Typography>
                <Divider sx={{ mt: 1 }} />
            </Box>

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 2,
                    p: 3,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="subtitle1" color="text.secondary" align="center">
                    This section will allow you to link related claims together.
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    Feature coming soon.
                </Typography>
            </Paper>
        </Box>
    );
};

export default LinkableClaims;