import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Grid,
    Paper,
    Chip,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@mui/icons-material';

// Import modular types and definitions
import {
    PartyType,
    ReworkStep,
    ReworkFormData,
    ReworkFormProps
} from './rework-types';
import { StepNames } from './rework-step-definitions';
import {
    calculateTotalCost,
    calculateStepCost,
    formatCurrency
} from './rework-cost-utils';

// Import the CostBadge
import CostBadge from './CostBadge';

const ReworkForm: React.FC<ReworkFormProps> = ({ onFormChange, initialData = {} }) => {
    // State for steps
    const [reworkSteps, setReworkSteps] = useState<ReworkStep[]>(
        initialData.reworkSteps || []
    );

    // State for new step form
    const [newStep, setNewStep] = useState<Partial<ReworkStep>>({
        name: '',
        quantity: 1,
        payingParty: PartyType.Supplier,
        responsibleParty: PartyType.Supplier
    });

    // State for step description
    const [stepDescription, setStepDescription] = useState<string>('');

    // State to track if we're editing an existing step
    const [editingStepId, setEditingStepId] = useState<string | null>(null);

    // State for global note
    const [globalNote, setGlobalNote] = useState(initialData.globalNote || '');

    // Calculate total cost
    const totalCost = useMemo(() => calculateTotalCost(reworkSteps), [reworkSteps]);

    // Handle global note change
    const handleGlobalNoteChange = (note: string) => {
        setGlobalNote(note);
        onFormChange({
            globalNote: note,
            reworkSteps,
            totalCost
        });
    };

    // Handle step name selection
    const handleStepNameChange = (stepName: string) => {
        const selectedStep = StepNames.find(step => step.name === stepName);
        setNewStep(prev => ({
            ...prev,
            name: stepName,
            stepCost: selectedStep
                ? calculateStepCost(selectedStep.baseCost, prev.quantity || 1)
                : 0
        }));
        setStepDescription(selectedStep ? selectedStep.description : '');
    };

    // Handle quantity change with cost calculation
    const handleQuantityChange = (quantity: number) => {
        const selectedStep = StepNames.find(step => step.name === newStep.name);
        setNewStep(prev => ({
            ...prev,
            quantity,
            stepCost: selectedStep
                ? calculateStepCost(selectedStep.baseCost, quantity)
                : 0
        }));
    };

    // Add or update a step
    const handleSaveStep = () => {
        // Validate step before adding/updating
        if (!newStep.name || !newStep.quantity) return;

        if (editingStepId) {
            // Update existing step
            const updatedSteps = reworkSteps.map(step =>
                step.id === editingStepId
                    ? {
                        id: step.id,
                        name: newStep.name!,
                        quantity: newStep.quantity!,
                        payingParty: newStep.payingParty!,
                        responsibleParty: newStep.responsibleParty!,
                        stepCost: newStep.stepCost!
                    }
                    : step
            );

            setReworkSteps(updatedSteps);
            onFormChange({
                globalNote,
                reworkSteps: updatedSteps,
                totalCost: calculateTotalCost(updatedSteps)
            });

            // Reset editing state
            setEditingStepId(null);
        } else {
            // Add new step
            const stepToAdd: ReworkStep = {
                id: `step-${Date.now()}`,
                name: newStep.name!,
                quantity: newStep.quantity!,
                payingParty: newStep.payingParty!,
                responsibleParty: newStep.responsibleParty!,
                stepCost: newStep.stepCost!
            };

            const updatedSteps = [...reworkSteps, stepToAdd];
            setReworkSteps(updatedSteps);
            onFormChange({
                globalNote,
                reworkSteps: updatedSteps,
                totalCost: calculateTotalCost(updatedSteps)
            });
        }

        // Reset new step form
        setNewStep({
            name: '',
            quantity: 1,
            payingParty: PartyType.Supplier,
            responsibleParty: PartyType.Supplier
        });

        // Clear description
        setStepDescription('');
    };

    // Prepare step for editing
    const handleEditStep = (step: ReworkStep) => {
        setEditingStepId(step.id);
        setNewStep({
            name: step.name,
            quantity: step.quantity,
            payingParty: step.payingParty,
            responsibleParty: step.responsibleParty,
            stepCost: step.stepCost
        });

        // Set description for editing step
        const selectedStep = StepNames.find(s => s.name === step.name);
        setStepDescription(selectedStep ? selectedStep.description : '');
    };

    // Remove a step
    const handleRemoveStep = (stepId: string) => {
        const updatedSteps = reworkSteps.filter(step => step.id !== stepId);
        setReworkSteps(updatedSteps);

        // Notify parent component
        onFormChange({
            globalNote,
            reworkSteps: updatedSteps,
            totalCost: calculateTotalCost(updatedSteps)
        });
    };

    return (
        <Box sx={{ position: 'relative', p: 2 }}>
            {/* Cost Badge */}
            <CostBadge totalCost={totalCost} />

            {/* Steps Section */}
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    mb: 3,
                    borderColor: 'divider',
                    backgroundColor: 'background.default'
                }}
            >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Rework Steps
                </Typography>

                {/* New Step Input Form */}
                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Step Name</Typography>
                        <FormControl fullWidth variant="outlined" size="small">
                            <Select
                                value={newStep.name || ''}
                                displayEmpty
                                renderValue={(selected) =>
                                    selected ? selected : <em>Select Step Name</em>
                                }
                                onChange={(e) => handleStepNameChange(e.target.value)}
                            >
                                <MenuItem disabled value="">
                                    <em>Select Step Name</em>
                                </MenuItem>
                                {StepNames.map((step) => (
                                    <MenuItem key={step.name} value={step.name}>
                                        {step.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Quantity</Typography>
                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            size="small"
                            value={newStep.quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                            InputProps={{
                                inputProps: { min: 1 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Step Cost</Typography>
                        <TextField
                            fullWidth
                            type="number"
                            variant="outlined"
                            size="small"
                            value={newStep.stepCost || 0}
                            InputProps={{
                                readOnly: true,
                                startAdornment: '€',
                                inputProps: { min: 0 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Paying Party</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            fullWidth
                            size="small"
                            value={newStep.payingParty}
                            onChange={(_, value) => value && setNewStep(prev => ({
                                ...prev,
                                payingParty: value
                            }))}
                            sx={{
                                '& .MuiToggleButton-root': {
                                    textTransform: 'none',
                                    borderRadius: '4px',
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.light',
                                        color: 'primary.contrastText'
                                    }
                                }
                            }}
                        >
                            <ToggleButton value={PartyType.Partner}>
                                Partner
                            </ToggleButton>
                            <ToggleButton value={PartyType.Supplier}>
                                Supplier
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="body2" sx={{ mb: 1 }}>Responsible Party</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            fullWidth
                            size="small"
                            value={newStep.responsibleParty}
                            onChange={(_, value) => value && setNewStep(prev => ({
                                ...prev,
                                responsibleParty: value
                            }))}
                            sx={{
                                '& .MuiToggleButton-root': {
                                    textTransform: 'none',
                                    borderRadius: '4px',
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.light',
                                        color: 'primary.contrastText'
                                    }
                                }
                            }}
                        >
                            <ToggleButton value={PartyType.Partner}>
                                Partner
                            </ToggleButton>
                            <ToggleButton value={PartyType.Supplier}>
                                Supplier
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'end', height: '100%' }}>
                        <IconButton
                            color="primary"
                            onClick={handleSaveStep}
                            disabled={!newStep.name}
                            sx={{
                                border: '1px solid',
                                borderColor: newStep.name ? 'primary.main' : 'grey.300',
                                width: 40,
                                height: 40,
                                marginBottom: '8px',
                                '&.Mui-disabled': {
                                    borderColor: 'grey.300',
                                    color: 'grey.300'
                                }
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                {/* Step Description */}
                {stepDescription && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            p: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            mb: 2
                        }}
                    >
                        {stepDescription}
                    </Typography>
                )}

                {/* Steps List */}
                {reworkSteps.length === 0 ? (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                    >
                        No rework steps added. Use the form above to add steps.
                    </Typography>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1
                    }}>
                        {reworkSteps.map((step, index) => (
                            <Chip
                                key={step.id}
                                label={`Step ${index + 1}: ${step.name} (${step.quantity}) - ${step.payingParty}/${step.responsibleParty} - ${formatCurrency(step.stepCost)}`}
                                color="primary"
                                variant="outlined"
                                sx={{
                                    mr: 1,
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                deleteIcon={
                                    <>
                                        <IconButton
                                            size="small"
                                            sx={{ mr: 0.5 }}
                                            onClick={() => handleEditStep(step)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleRemoveStep(step.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </>
                                }
                                onDelete={() => {}} // Placeholder to enable delete icon area
                            />
                        ))}
                    </Box>
                )}
            </Paper>

            {/* Global Note Section */}
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderColor: 'divider',
                    backgroundColor: 'background.default'
                }}
            >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Global Rework Order Notes
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Enter global notes for the entire rework order"
                    value={globalNote}
                    onChange={(e) => handleGlobalNoteChange(e.target.value)}
                />
            </Paper>
        </Box>
    );
};

export default ReworkForm;