import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider
} from '@mui/material';
import { ViewList as SkuListIcon } from '@mui/icons-material';

const SkuList: React.FC = () => {
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
                    <SkuListIcon sx={{ mr: 2 }} />
                    SKU List
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        pr: 4  // Added right padding
                    }}
                >
                    View a list of all the SKUs that were delivered along with the SKU under this claim
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
                    This section will display all SKUs associated with this claim.
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    Feature coming soon.
                </Typography>
            </Paper>
        </Box>
    );
};

export default SkuList;