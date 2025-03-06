import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Button,
    Card,
    CardContent,
    Divider
} from '@mui/material';

// Import all the approach components
import Approach1Form from './approaches/Approach1ExpandableForm';
import Approach2Form from './approaches/Approach2ToggleForm';
import Approach3Form from './approaches/Approach3ProgressiveForm';

// Define interface for props
interface ScrapFormProps {
    onFormChange: (data: any) => void;
    initialData?: any;
    onSave?: () => void;
}

const ScrapFormDemo: React.FC<ScrapFormProps> = ({ onFormChange, initialData = {}, onSave }) => {
    // State for active approach
    const [approach, setApproach] = useState<1 | 2 | 3>(2); // Start with approach 2 (toggle) selected

    // Form data state
    const [formData, setFormData] = useState<any>(initialData || {});

    // Effect to notify parent of data changes
    useEffect(() => {
        onFormChange(formData);
    }, [formData, onFormChange]);

    // Handle approach change
    const handleApproachChange = (newApproach: 1 | 2 | 3) => {
        setApproach(newApproach);
    };

    // Handle form changes from the approach components
    const handleApproachFormChange = (data: any) => {
        setFormData(data);
    };

    // Approach descriptions
    const approachDescriptions = {
        1: "Expandable 'Create Custom Step' section - A dedicated section that expands when needed",
        2: "Toggle between Standard/Custom modes - Switch between two different interfaces",
        3: "Inline Progressive Disclosure - Step-by-step guidance through custom step creation"
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper elevation={0} sx={{ mb: 4, overflow: 'hidden', border: '1px dashed', borderColor: 'divider' }}>
                <Box sx={{ px: 3, py: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                        Custom Step Implementation Demo
                    </Typography>
                    <Typography variant="body2">
                        This Scrap form is showcasing three different UI approaches for adding custom steps. You can toggle between approaches below to see how each would work.
                    </Typography>
                </Box>

                <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>Select an Approach</Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Button
                            variant={approach === 1 ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handleApproachChange(1)}
                            size="small"
                        >
                            Approach 1: Expandable
                        </Button>
                        <Button
                            variant={approach === 2 ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handleApproachChange(2)}
                            size="small"
                        >
                            Approach 2: Toggle
                        </Button>
                        <Button
                            variant={approach === 3 ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => handleApproachChange(3)}
                            size="small"
                        >
                            Approach 3: Progressive
                        </Button>
                    </Box>

                    <Card variant="outlined" sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                                Current Approach: {approach}
                            </Typography>
                            <Typography variant="body2">
                                {approachDescriptions[approach]}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Paper>

            <Divider sx={{ mb: 3 }} />

            {/* Render the selected approach */}
            <Box>
                {approach === 1 && <Approach1Form onFormChange={handleApproachFormChange} initialData={formData} />}
                {approach === 2 && <Approach2Form onFormChange={handleApproachFormChange} initialData={formData} />}
                {approach === 3 && <Approach3Form onFormChange={handleApproachFormChange} initialData={formData} />}
            </Box>

            {/* Save Button */}
            {onSave && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={onSave}
                        sx={{ px: 4 }}
                    >
                        Save Scrap Order
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ScrapFormDemo;