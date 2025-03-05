import React, { useState, useMemo, useEffect } from 'react';
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
    Button,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    PriceCheck as PriceCheckIcon,
    Notes as NotesIcon
} from '@mui/icons-material';

// Import modular types and definitions
import {
    PartyType,
    GivebackStep,
    GivebackFormData,
    GivebackFormProps
} from './giveback-types';
import { StepNames } from './giveback-step-definitions';
import {
    calculateTotalCost,
    calculateStepCost,
    formatCurrency
} from './giveback-cost-utils';

// Import the CostBadge
import CostBadge from './CostBadge';

// Extended props to include onSave function
interface ExtendedGivebackFormProps extends GivebackFormProps {
    onSave?: () => void;
}

const ImprovedGivebackForm: React.FC<ExtendedGivebackFormProps> = ({
                                                                       onFormChange,
                                                                       initialData = {},
                                                                       onSave
                                                                   }) => {
    // State for steps
    const [givebackSteps, setGivebackSteps] = useState<GivebackStep[]>(
        initialData.givebackSteps || []
    );

    // State for new step form
    const [newStep, setNewStep] = useState<Partial<GivebackStep>>({
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
    const totalCost = useMemo(() => calculateTotalCost(givebackSteps), [givebackSteps]);

    // Effect to notify parent of initial data if provided
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            onFormChange({
                globalNote,
                givebackSteps,
                totalCost
            });
        }
    }, []);

    // Handle global note change
    const handleGlobalNoteChange = (note: string) => {
        setGlobalNote(note);
        onFormChange({
            globalNote: note,
            givebackSteps,
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
            const updatedSteps = givebackSteps.map(step =>
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

            setGivebackSteps(updatedSteps);
            onFormChange({
                globalNote,
                givebackSteps: updatedSteps,
                totalCost: calculateTotalCost(updatedSteps)
            });

            // Reset editing state
            setEditingStepId(null);
        } else {
            // Add new step
            const stepToAdd: GivebackStep = {
                id: `step-${Date.now()}`,
                name: newStep.name!,
                quantity: newStep.quantity!,
                payingParty: newStep.payingParty!,
                responsibleParty: newStep.responsibleParty!,
                stepCost: newStep.stepCost!
            };

            const updatedSteps = [...givebackSteps, stepToAdd];
            setGivebackSteps(updatedSteps);
            onFormChange({
                globalNote,
                givebackSteps: updatedSteps,
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
    const handleEditStep = (step: GivebackStep) => {
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
        const updatedSteps = givebackSteps.filter(step => step.id !== stepId);
        setGivebackSteps(updatedSteps);

        // Notify parent component
        onFormChange({
            globalNote,
            givebackSteps: updatedSteps,
            totalCost: calculateTotalCost(updatedSteps)
        });
    };

    // Determine if form has enough data to save
    const canSave = givebackSteps.length > 0;

    return (
        <Box sx={{ position: 'relative', p: 2 }}>
            {/* Cost Badge */}
            <CostBadge totalCost={totalCost} />

            <Grid container spacing={3}>
                {/* Left Column - Form Input */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Configure Step
                            </Typography>

                            <Grid container spacing={2}>
                                {/* Step Name Dropdown */}
                                <Grid item xs={12}>
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

                                {/* Step Description */}
                                {stepDescription && (
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                p: 1.5,
                                                bgcolor: 'background.default',
                                                borderRadius: 1,
                                                mb: 1,
                                                border: '1px dashed',
                                                borderColor: 'divider'
                                            }}
                                        >
                                            {stepDescription}
                                        </Typography>
                                    </Grid>
                                )}

                                {/* Quantity Input */}
                                <Grid item xs={12} sm={6}>
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

                                {/* Step Cost Display */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Step Cost</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={formatCurrency(newStep.stepCost || 0)}
                                        InputProps={{
                                            readOnly: true,
                                            startAdornment: <PriceCheckIcon color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
                                        }}
                                    />
                                </Grid>

                                {/* Paying Party Toggle */}
                                <Grid item xs={12}>
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
                                    >
                                        <ToggleButton value={PartyType.Partner}>
                                            Partner
                                        </ToggleButton>
                                        <ToggleButton value={PartyType.Supplier}>
                                            Supplier
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>

                                {/* Responsible Party Toggle */}
                                <Grid item xs={12}>
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
                                    >
                                        <ToggleButton value={PartyType.Partner}>
                                            Partner
                                        </ToggleButton>
                                        <ToggleButton value={PartyType.Supplier}>
                                            Supplier
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>

                                {/* Add Button */}
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        disabled={!newStep.name}
                                        startIcon={editingStepId ? <SaveIcon /> : <AddIcon />}
                                        onClick={handleSaveStep}
                                        sx={{ mt: 1 }}
                                    >
                                        {editingStepId ? 'Update Step' : 'Add Step'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column - Giveback Plan */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center" justifyContent="space-between">
                                <span>Giveback Plan</span>
                                {givebackSteps.length > 0 && (
                                    <Chip
                                        size="small"
                                        label={`${givebackSteps.length} ${givebackSteps.length === 1 ? 'step' : 'steps'}`}
                                        color="primary"
                                        variant="outlined"
                                    />
                                )}
                            </Typography>

                            {/* Steps List */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                    Added Steps
                                </Typography>

                                {givebackSteps.length === 0 ? (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        align="center"
                                        sx={{
                                            p: 3,
                                            bgcolor: 'background.default',
                                            borderRadius: 1,
                                            border: '1px dashed',
                                            borderColor: 'divider'
                                        }}
                                    >
                                        No giveback steps added yet. Configure and add steps from the left panel.
                                    </Typography>
                                ) : (
                                    <Box sx={{
                                        p: 2,
                                        bgcolor: 'background.default',
                                        borderRadius: 1,
                                        height: '280px',
                                        overflow: 'auto',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    }}>
                                        {givebackSteps.map((step, index) => (
                                            <Box
                                                key={step.id}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    mb: 1,
                                                    p: 1.5,
                                                    bgcolor: 'background.paper',
                                                    borderRadius: 1,
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                    '&:last-child': { mb: 0 }
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="subtitle2">
                                                        {index + 1}. {step.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Quantity: {step.quantity} • Paying: {step.payingParty} •
                                                        Responsible: {step.responsibleParty}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                                        Cost: {formatCurrency(step.stepCost)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
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
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            {/* Global Notes */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                    <NotesIcon fontSize="small" sx={{ mr: 0.5 }} /> Global Notes
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    placeholder="Enter global notes for the entire giveback order"
                                    value={globalNote}
                                    onChange={(e) => handleGlobalNoteChange(e.target.value)}
                                />
                            </Box>

                            {/* Save Button */}
                            <Box>
                                <Divider sx={{ mb: 2 }} />

                                {onSave && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        startIcon={<SaveIcon />}
                                        onClick={onSave}
                                        disabled={!canSave}
                                    >
                                        Save Giveback Order ({givebackSteps.length} {givebackSteps.length === 1 ? 'step' : 'steps'})
                                    </Button>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ImprovedGivebackForm;