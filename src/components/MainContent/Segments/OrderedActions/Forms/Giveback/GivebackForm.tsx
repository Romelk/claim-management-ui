import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    Chip,
    IconButton,
    Button,
    Card,
    CardContent,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Notes as NotesIcon,
    Visibility as VisibilityIcon,
    Close as CloseIcon
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

// Import Step Components
import StandardStepForm, { StandardStepData } from './StandardStepForm';
import CustomStepForm, { CustomStepData } from './CustomStepForm';

// Extended props to include onSave function
interface ExtendedGivebackFormProps extends GivebackFormProps {
    onSave?: () => void;
}

const GivebackForm: React.FC<ExtendedGivebackFormProps> = ({
                                                               onFormChange,
                                                               initialData = {},
                                                               onSave
                                                           }) => {
    // State for steps
    const [givebackSteps, setGivebackSteps] = useState<GivebackStep[]>(
        initialData.givebackSteps || []
    );

    // State for step mode (standard or custom)
    const [stepMode, setStepMode] = useState<'standard' | 'custom'>('standard');

    // State for new standard step
    const [standardStepData, setStandardStepData] = useState<StandardStepData>({
        name: '',
        quantity: 1,
        payingParty: PartyType.Supplier,
        responsibleParty: PartyType.Supplier,
        stepCost: 0
    });

    // State for new custom step
    const [customStepData, setCustomStepData] = useState<CustomStepData>({
        englishName: '',
        englishDescription: '',
        baseCost: 0,
        quantity: 1,
        payingParty: PartyType.Supplier,
        responsibleParty: PartyType.Supplier,
        translations: {
            de: {name: '', description: ''},
            cz: {name: '', description: ''},
            pl: {name: '', description: ''}
        }
    });

    // State for step description
    const [stepDescription, setStepDescription] = useState<string>('');

    // State to track if we're editing an existing step
    const [editingStepId, setEditingStepId] = useState<string | null>(null);

    // State for global note
    const [globalNote, setGlobalNote] = useState(initialData.globalNote || '');

    // State for details dialog
    const [detailsDialogOpen, setDetailsDialogOpen] = useState<boolean>(false);
    const [selectedStepForDetails, setSelectedStepForDetails] = useState<GivebackStep | null>(null);

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

    // Switch step mode
    const handleStepModeChange = (mode: 'standard' | 'custom') => {
        setStepMode(mode);
        // Reset editing state when changing modes
        if (editingStepId) {
            setEditingStepId(null);
        }
    };

    // Handle standard step data change
    const handleStandardStepDataChange = (data: StandardStepData) => {
        setStandardStepData(data);
    };

    // Handle custom step data change
    const handleCustomStepDataChange = (data: CustomStepData) => {
        setCustomStepData(data);
    };

    // Handle step description change
    const handleStepDescriptionChange = (description: string) => {
        setStepDescription(description);
    };

    // Add or update a step
    // Update handleSaveStep in GivebackForm.tsx to check for translations validity

    const handleSaveStep = () => {
        if (stepMode === 'standard') {
            // Validate standard step before adding/updating
            if (!standardStepData.name) return;

            if (editingStepId) {
                // Update existing step
                const updatedSteps = givebackSteps.map(step =>
                    step.id === editingStepId
                        ? {
                            id: step.id,
                            name: standardStepData.name,
                            quantity: standardStepData.quantity,
                            payingParty: standardStepData.payingParty,
                            responsibleParty: standardStepData.responsibleParty,
                            stepCost: standardStepData.stepCost
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
                // Add new standard step
                const stepToAdd: GivebackStep = {
                    id: `step-${Date.now()}`,
                    name: standardStepData.name,
                    quantity: standardStepData.quantity,
                    payingParty: standardStepData.payingParty,
                    responsibleParty: standardStepData.responsibleParty,
                    stepCost: standardStepData.stepCost
                };

                const updatedSteps = [...givebackSteps, stepToAdd];
                setGivebackSteps(updatedSteps);
                onFormChange({
                    globalNote,
                    givebackSteps: updatedSteps,
                    totalCost: calculateTotalCost(updatedSteps)
                });
            }

            // Reset standard step form
            setStandardStepData({
                name: '',
                quantity: 1,
                payingParty: PartyType.Supplier,
                responsibleParty: PartyType.Supplier,
                stepCost: 0
            });

            // Clear description
            setStepDescription('');
        } else {
            // Validate custom step before adding - including required translations
            if (!customStepData.englishName ||
                !customStepData.englishDescription ||
                !customStepData.baseCost ||
                !customStepData.translations.de.name ||
                !customStepData.translations.de.description ||
                !customStepData.translations.cz.name ||
                !customStepData.translations.cz.description ||
                !customStepData.translations.pl.name ||
                !customStepData.translations.pl.description) {
                return;
            }

            // Add new custom step
            const customStepToAdd: GivebackStep = {
                id: `custom-step-${Date.now()}`,
                name: customStepData.englishName,
                quantity: customStepData.quantity,
                payingParty: customStepData.payingParty,
                responsibleParty: customStepData.responsibleParty,
                stepCost: calculateStepCost(customStepData.baseCost, customStepData.quantity),
                isCustom: true as any, // Using 'as any' to add custom property
                translations: customStepData.translations as any,
                englishName: customStepData.englishName as any,
                englishDescription: customStepData.englishDescription as any,
                baseCost: customStepData.baseCost as any
            };

            const updatedSteps = [...givebackSteps, customStepToAdd];
            setGivebackSteps(updatedSteps);
            onFormChange({
                globalNote,
                givebackSteps: updatedSteps,
                totalCost: calculateTotalCost(updatedSteps)
            });

            // Reset custom step form
            setCustomStepData({
                englishName: '',
                englishDescription: '',
                baseCost: 0,
                quantity: 1,
                payingParty: PartyType.Supplier,
                responsibleParty: PartyType.Supplier,
                translations: {
                    de: { name: '', description: '' },
                    cz: { name: '', description: '' },
                    pl: { name: '', description: '' }
                }
            });
        }
    };
    // Prepare step for editing
    const handleEditStep = (step: GivebackStep) => {
        setEditingStepId(step.id);

        if ((step as any).isCustom) {
            // Custom step editing
            setStepMode('custom');
            const customStep = step as any;
            setCustomStepData({
                englishName: customStep.englishName || customStep.name,
                englishDescription: customStep.englishDescription || '',
                baseCost: customStep.baseCost || 0,
                quantity: step.quantity,
                payingParty: step.payingParty,
                responsibleParty: step.responsibleParty,
                translations: customStep.translations || {
                    de: {name: '', description: ''},
                    cz: {name: '', description: ''},
                    pl: {name: '', description: ''}
                }
            });
        } else {
            // Standard step editing
            setStepMode('standard');
            setStandardStepData({
                name: step.name,
                quantity: step.quantity,
                payingParty: step.payingParty,
                responsibleParty: step.responsibleParty,
                stepCost: step.stepCost
            });

            // Set description for editing step
            const selectedStep = StepNames.find(s => s.name === step.name);
            setStepDescription(selectedStep ? selectedStep.description : '');
        }
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

    // Function to open details dialog
    const handleViewDetails = (step: GivebackStep) => {
        setSelectedStepForDetails(step);
        setDetailsDialogOpen(true);
    };

    // Function to close details dialog
    const handleCloseDetails = () => {
        setDetailsDialogOpen(false);
        setSelectedStepForDetails(null);
    };

    // Get step description by name
    const getStepDescription = (stepName: string): string => {
        const selectedStep = StepNames.find(s => s.name === stepName);
        return selectedStep ? selectedStep.description : 'No description available';
    };

    // Get step base cost by name
    const getStepBaseCost = (stepName: string): number => {
        const selectedStep = StepNames.find(s => s.name === stepName);
        return selectedStep ? selectedStep.baseCost : 0;
    };

    // Determine if form has enough data to save
    const canSave = givebackSteps.length > 0;

    return (
        <Box sx={{position: 'relative', p: 2}}>
            {/* Cost Badge */}
            <CostBadge totalCost={totalCost}/>

            <Grid container spacing={3}>
                {/* Left Column - Form Input */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{height: '100%'}}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Configure Step
                            </Typography>

                            {/* Step Type Toggle */}
                            <Box sx={{
                                mb: 3,
                                display: 'flex',
                                borderRadius: 1,
                                overflow: 'hidden',
                                border: '1px solid',
                                borderColor: 'divider'
                            }}>
                                <Button
                                    fullWidth
                                    variant={stepMode === 'standard' ? 'contained' : 'outlined'}
                                    color="primary"
                                    onClick={() => handleStepModeChange('standard')}
                                    sx={{borderRadius: 0, py: 1}}
                                >
                                    Standard Step
                                </Button>
                                <Button
                                    fullWidth
                                    variant={stepMode === 'custom' ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => handleStepModeChange('custom')}
                                    sx={{borderRadius: 0, py: 1}}
                                >
                                    Custom Step
                                </Button>
                            </Box>

                            {/* Render appropriate form based on mode */}
                            {stepMode === 'standard' ? (
                                <StandardStepForm
                                    data={standardStepData}
                                    onChange={handleStandardStepDataChange}
                                    stepDescription={stepDescription}
                                    onStepDescriptionChange={handleStepDescriptionChange}
                                />
                            ) : (
                                <CustomStepForm
                                    data={customStepData}
                                    onChange={handleCustomStepDataChange}
                                    onSave={handleSaveStep}
                                    isEditing={!!editingStepId}
                                />
                            )}

                            {/* Add/Update Step Button */}
                            <Box sx={{mt: 2}}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color={stepMode === 'standard' ? "primary" : "secondary"}
                                    disabled={
                                        stepMode === 'standard'
                                            ? !standardStepData.name
                                            : !customStepData.englishName || !customStepData.baseCost
                                    }
                                    startIcon={editingStepId ? <SaveIcon/> : <AddIcon/>}
                                    onClick={handleSaveStep}
                                >
                                    {editingStepId
                                        ? 'Update Step'
                                        : stepMode === 'standard'
                                            ? 'Add Step'
                                            : 'Add Custom Step'
                                    }
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column - Giveback Plan */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{height: '100%'}}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center"
                                        justifyContent="space-between">
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
                            <Box sx={{mb: 3}}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{mb: 1}}>
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
                                        {givebackSteps.map((step, index) => {
                                            const isCustomStep = !!(step as any).isCustom;
                                            return (
                                                <Box
                                                    key={step.id}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        mb: 1,
                                                        p: 1.5,
                                                        bgcolor: isCustomStep ? 'rgba(156, 39, 176, 0.05)' : 'background.paper',
                                                        borderRadius: 1,
                                                        border: '1px solid',
                                                        borderColor: isCustomStep ? 'secondary.light' : 'divider',
                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                        '&:last-child': {mb: 0}
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography variant="subtitle2"
                                                                    color={isCustomStep ? 'secondary.main' : 'inherit'}>
                                                            {index + 1}. {step.name} {isCustomStep &&
                                                            <Chip size="small" label="Custom" color="secondary"
                                                                  sx={{ml: 1, height: 20}}/>}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Quantity: {step.quantity} • Paying: {step.payingParty} •
                                                            Responsible: {step.responsibleParty}
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight="bold"
                                                                    color={isCustomStep ? 'secondary.main' : 'primary.main'}>
                                                            Cost: {formatCurrency(step.stepCost)}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleViewDetails(step)}
                                                            sx={{color: 'info.main'}}
                                                            title="View Details"
                                                        >
                                                            <VisibilityIcon fontSize="small"/>
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            color={isCustomStep ? 'secondary' : 'primary'}
                                                            onClick={() => handleEditStep(step)}
                                                            title="Edit Step"
                                                        >
                                                            <EditIcon fontSize="small"/>
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleRemoveStep(step.id)}
                                                            title="Remove Step"
                                                        >
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                )}
                            </Box>

                            {/* Global Notes */}
                            <Box sx={{mb: 3}}>
                                <Typography variant="subtitle2" color="text.secondary"
                                            sx={{mb: 1, display: 'flex', alignItems: 'center'}}>
                                    <NotesIcon fontSize="small" sx={{mr: 0.5}}/> Global Notes
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
                                <Divider sx={{mb: 2}}/>

                                {onSave && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        startIcon={<SaveIcon/>}
                                        onClick={onSave}
                                        disabled={!canSave}
                                    >
                                        Save Giveback Order
                                        ({givebackSteps.length} {givebackSteps.length === 1 ? 'step' : 'steps'})
                                    </Button>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Step Details Dialog */}
            <Dialog
                open={detailsDialogOpen}
                onClose={handleCloseDetails}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: (selectedStepForDetails && (selectedStepForDetails as any).isCustom) ? 'secondary.light' : 'primary.light',
                    color: 'white'
                }}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="h6">
                            Step Details: {selectedStepForDetails?.name}
                            {selectedStepForDetails && (selectedStepForDetails as any).isCustom && (
                                <Chip size="small" label="Custom" color="secondary"
                                      sx={{ml: 1, bgcolor: 'white', color: 'secondary.main'}}/>
                            )}
                        </Typography>
                    </Box>
                    <IconButton
                        size="small"
                        onClick={handleCloseDetails}
                        sx={{color: 'inherit'}}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedStepForDetails && (
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body2" sx={{
                                p: 2,
                                mb: 3,
                                bgcolor: 'background.default',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider'
                            }}>
                                {(selectedStepForDetails as any).isCustom
                                    ? (selectedStepForDetails as any).englishDescription || 'No description available'
                                    : getStepDescription(selectedStepForDetails.name)
                                }
                            </Typography>

                            <TableContainer component={Paper} variant="outlined" sx={{mb: 3}}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{bgcolor: 'background.default'}}>
                                            <TableCell><Typography variant="subtitle2">Property</Typography></TableCell>
                                            <TableCell><Typography variant="subtitle2">Value</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Base Cost</TableCell>
                                            <TableCell>
                                                {(selectedStepForDetails as any).isCustom
                                                    ? formatCurrency((selectedStepForDetails as any).baseCost || 0)
                                                    : formatCurrency(getStepBaseCost(selectedStepForDetails.name))
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>{selectedStepForDetails.quantity}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total Step Cost</TableCell>
                                            <TableCell>
                                                <Typography fontWeight="bold"
                                                            color={(selectedStepForDetails as any).isCustom ? 'secondary.main' : 'primary.main'}>
                                                    {formatCurrency(selectedStepForDetails.stepCost)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Paying Party</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={selectedStepForDetails.payingParty}
                                                    size="small"
                                                    color={selectedStepForDetails.payingParty === PartyType.Partner ? "primary" : "default"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Responsible Party</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={selectedStepForDetails.responsibleParty}
                                                    size="small"
                                                    color={selectedStepForDetails.responsibleParty === PartyType.Partner ? "primary" : "default"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Display translations for custom steps */}
                            {(selectedStepForDetails as any).isCustom && (selectedStepForDetails as any).translations && (
                                <Box sx={{mb: 3}}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Translations
                                    </Typography>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow sx={{bgcolor: 'background.default'}}>
                                                    <TableCell><Typography
                                                        variant="subtitle2">Language</Typography></TableCell>
                                                    <TableCell><Typography
                                                        variant="subtitle2">Name</Typography></TableCell>
                                                    <TableCell><Typography variant="subtitle2">Description</Typography></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>German</TableCell>
                                                    <TableCell>{(selectedStepForDetails as any).translations.de.name || '-'}</TableCell>
                                                    <TableCell>{(selectedStepForDetails as any).translations.de.description || '-'}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Czech</TableCell>
                                                    <TableCell>{(selectedStepForDetails as any).translations.cz.name || '-'}</TableCell>
                                                    <TableCell>{(selectedStepForDetails as any).translations.cz.description || '-'}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Polish</TableCell>
                                                    <TableCell>{(selectedStepForDetails as any).translations.pl.name || '-'}</TableCell>
                                                    <TableCell>{(selectedStepForDetails as any).translations.pl.description || '-'}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}

                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button
                                    variant="outlined"
                                    startIcon={<EditIcon/>}
                                    onClick={() => {
                                        handleEditStep(selectedStepForDetails);
                                        handleCloseDetails();
                                    }}
                                >
                                    Edit Step
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => {
                                        handleRemoveStep(selectedStepForDetails.id);
                                        handleCloseDetails();
                                    }}
                                >
                                    Remove Step
                                </Button>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};
    export default GivebackForm;
