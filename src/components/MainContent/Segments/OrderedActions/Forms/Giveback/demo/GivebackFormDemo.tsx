import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Container,
    AppBar,
    Toolbar,
    Button,
    Card,
    CardContent,
    Divider
} from '@mui/material';

// Import all the approach components
import Approach1Form from '../../Scrap/approaches/Approach1ExpandableForm';
import Approach2Form from '../../Scrap/approaches/Approach2ToggleForm';
import Approach3Form from '../../Scrap/approaches/Approach3ProgressiveForm';

const GivebackFormDemo: React.FC = () => {
    // State for active approach
    const [approach, setApproach] = useState<1 | 2 | 3>(2); // Start with approach 2 (toggle) selected

    // Handle approach change
    const handleApproachChange = (newApproach: 1 | 2 | 3) => {
        setApproach(newApproach);
    };

    // Approach descriptions
    const approachDescriptions = {
        1: "Expandable 'Create Custom Step' section - A dedicated section that expands when needed",
        2: "Toggle between Standard/Custom modes - Switch between two different interfaces",
        3: "Inline Progressive Disclosure - Step-by-step guidance through custom step creation"
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ mb: 4, overflow: 'hidden' }}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Giveback Form Custom Step Approaches Demo
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>Select an Approach</Typography>
                    <Typography variant="body1" paragraph>
                        This demo showcases three different UI/UX approaches for adding custom steps to the Giveback form.
                        Select an approach below to see how it would work in practice.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <Button
                            variant={approach === 1 ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handleApproachChange(1)}
                            size="large"
                        >
                            Approach 1: Expandable Section
                        </Button>
                        <Button
                            variant={approach === 2 ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handleApproachChange(2)}
                            size="large"
                        >
                            Approach 2: Toggle Mode
                        </Button>
                        <Button
                            variant={approach === 3 ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handleApproachChange(3)}
                            size="large"
                        >
                            Approach 3: Progressive Disclosure
                        </Button>
                    </Box>

                    <Card variant="outlined" sx={{ mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Current Approach: {approach}
                            </Typography>
                            <Typography variant="body1">
                                {approachDescriptions[approach]}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Divider sx={{ mb: 4 }} />

                    {/* Render the selected approach */}
                    <Box sx={{ p: 0 }}>
                        {approach === 1 && <Approach1Form />}
                        {approach === 2 && <Approach2Form />}
                        {approach === 3 && <Approach3Form />}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default GivebackFormDemo;