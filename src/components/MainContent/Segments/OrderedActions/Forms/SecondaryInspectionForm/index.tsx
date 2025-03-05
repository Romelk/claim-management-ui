import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Radio,
    RadioGroup,
    Button
} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableStepList from './DraggableStepList';
import OrderedStepsPills from './OrderedStepsPills';

// Interface for step item
export interface InspectionStep {
    id: string;
    name: string;
    description: string;
}

// Interface for the form data
export interface SecondaryInspectionFormData {
    steps: InspectionStep[];
    quantity: number;
    responsibleParty: 'supplier' | 'partner';
    notes: string;
}

// Interface for the form props
interface SecondaryInspectionFormProps {
    onFormChange: (data: any) => void;
    initialData?: Partial<SecondaryInspectionFormData>;
    onSave?: () => void;
    editMode?: boolean; // New prop to indicate edit mode
}

// Custom heading component for consistent styling - matching screenshot style
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <Typography
        variant="subtitle2"
        sx={{
            mb: 1.5,
            fontWeight: 600,
            fontSize: '0.85rem',
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        }}
    >
        {children}
    </Typography>
);

const SecondaryInspectionForm: React.FC<SecondaryInspectionFormProps> = ({
                                                                             onFormChange,
                                                                             initialData = {},
                                                                             onSave,
                                                                             editMode
                                                                         }) => {
    // Initialize form with default values or provided initial data
    const [formData, setFormData] = useState<SecondaryInspectionFormData>({
        steps: initialData.steps || [],
        quantity: initialData.quantity || 0,
        responsibleParty: initialData.responsibleParty || 'supplier',
        notes: initialData.notes || '',
    });

    // Validation state
    const [errors, setErrors] = useState<Partial<Record<keyof SecondaryInspectionFormData, string>>>({});

    // Handle form field changes
    const handleChange = (field: keyof SecondaryInspectionFormData, value: any) => {
        const updatedData = { ...formData, [field]: value };
        setFormData(updatedData);

        // Clear error for this field if it exists
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }

        // Notify parent component
        onFormChange(updatedData);

        // Validate field
        validateField(field, value);
    };

    // Handle step changes
    const handleStepsChange = (steps: InspectionStep[]) => {
        handleChange('steps', steps);
    };

    // Validate a single field
    const validateField = (field: keyof SecondaryInspectionFormData, value: any) => {
        let errorMessage = '';

        switch (field) {
            case 'steps':
                if (!value || value.length === 0) {
                    errorMessage = 'At least one inspection step is required';
                }
                break;

            case 'quantity':
                if (!value || value <= 0) {
                    errorMessage = 'Quantity must be greater than 0';
                }
                break;
        }

        if (errorMessage) {
            setErrors({ ...errors, [field]: errorMessage });
        }
    };

    // Validate the entire form
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof SecondaryInspectionFormData, string>> = {};

        if (!formData.steps || formData.steps.length === 0) {
            newErrors.steps = 'At least one inspection step is required';
        }

        if (!formData.quantity || formData.quantity <= 0) {
            newErrors.quantity = 'Quantity must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = () => {
        if (validateForm() && onSave) {
            onSave();
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {/* Main container */}
            <Box sx={{ p: 0, mt: -1 }}> {/* Remove top margin to match screenshot */}
                {/* Optional Edit Mode Indicator */}
                {editMode && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            py: 1,
                            px: 2,
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'primary.light'
                        }}
                    >
                        <Typography variant="body2" color="primary">
                            Editing existing inspection plan
                        </Typography>
                    </Box>
                )}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3, // Match spacing in screenshot
                    mb: 2, // Add bottom margin
                }}>
                    {/* Left Column - Available Steps (slightly narrower) */}
                    <Box sx={{
                        flex: { xs: 1, md: 0.36 }, // 36% width on desktop
                        minWidth: { xs: '100%', md: '36%' },
                        maxWidth: { md: '36%' }
                    }}>
                        <SectionHeading>Available Steps</SectionHeading>
                        <DraggableStepList onAddStep={handleStepsChange} selectedSteps={formData.steps} />
                    </Box>

                    {/* Right Column - Ordered Steps and Configuration (increased width) */}
                    <Box sx={{
                        flex: { xs: 1, md: 0.64 }, // 64% width on desktop
                        minWidth: { xs: '100%', md: '62%' }
                    }}>
                        {/* Inspection Plan Section */}
                        <Box sx={{ mb: 2.5 }}>
                            <SectionHeading>Inspection Plan</SectionHeading>
                            <OrderedStepsPills
                                steps={formData.steps}
                                onStepsChange={handleStepsChange}
                            />

                            {errors.steps && (
                                <Typography color="error" variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                                    {errors.steps}
                                </Typography>
                            )}
                        </Box>

                        {/* Inspection Quantity */}
                        <Box sx={{ mb: 2.5 }}>
                            <SectionHeading>Inspection Quantity</SectionHeading>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Enter quantity"
                                type="number"
                                value={formData.quantity || ''}
                                onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                                inputProps={{ min: 1 }}
                            />
                        </Box>

                        {/* Responsible Party */}
                        <Box sx={{ mb: 2.5 }}>
                            <SectionHeading>Responsible Party</SectionHeading>
                            <RadioGroup
                                row
                                value={formData.responsibleParty}
                                onChange={(e) => handleChange('responsibleParty', e.target.value as 'supplier' | 'partner')}
                            >
                                <FormControlLabel
                                    value="supplier"
                                    control={<Radio />}
                                    label="Supplier"
                                    sx={{ mr: 4 }} // Add more spacing between options
                                />
                                <FormControlLabel
                                    value="partner"
                                    control={<Radio />}
                                    label="Partner"
                                />
                            </RadioGroup>
                        </Box>

                        {/* Notes */}
                        <Box sx={{ mb: 1 }}>
                            <SectionHeading>Notes</SectionHeading>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Any special instructions or requirements for the inspection"
                                value={formData.notes}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Save Button - Floating right */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={formData.steps.length === 0 || !formData.quantity || formData.quantity <= 0}
                        sx={{
                            fontWeight: 500,
                            minWidth: '180px', // Ensure button is wide enough
                            py: 0.75
                        }}
                    >
                        {editMode ? 'Update Inspection Plan' : 'Save Inspection Plan'}
                    </Button>
                </Box>
            </Box>
        </DndProvider>
    );
};

export default SecondaryInspectionForm;