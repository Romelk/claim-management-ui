import React, { useState } from 'react';
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
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormHelperText
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    ExpandMore as ExpandMoreIcon,
    ArrowBack as ArrowBackIcon,
    Translate as TranslateIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';

// Mock data and types for demonstration
enum PartyType {
    Partner = 'Partner',
    Supplier = 'Supplier'
}

interface StepDefinition {
    name: string;
    description: string;
    baseCost: number;
}

const StepNames: StepDefinition[] = [
    { name: 'Initial Assessment', description: 'Conduct a comprehensive initial evaluation of the items to be returned.', baseCost: 50 },
    { name: 'Item Preparation', description: 'Carefully clean, sort, and prepare items for return shipment.', baseCost: 75 },
    { name: 'Packaging', description: 'Securely package items with appropriate protective materials to prevent damage during transit.', baseCost: 120 },
    { name: 'Documentation', description: 'Prepare return shipping labels, packing slips, and required return authorization documents.', baseCost: 90 },
    { name: 'Shipping Arrangement', description: 'Coordinate and book return shipping, select appropriate carrier and shipping method.', baseCost: 65 },
    { name: 'Tracking and Confirmation', description: 'Monitor return shipment and confirm receipt at the destination.', baseCost: 30 }
];

// Format currency helper
const formatCurrency = (amount: number): string => {
    return `€${amount.toFixed(2)}`;
};

// Calculate step cost
const calculateStepCost = (baseCost: number, quantity: number): number => {
    return baseCost * quantity;
};

// Approach 1: Expandable "Create Custom Step" section
const Approach1ExpandableForm: React.FC = () => {
    // State for custom mode
    const [customMode, setCustomMode] = useState<boolean>(false);

    // Standard step state
    const [standardStep, setStandardStep] = useState<{
        name: string;
        quantity: number;
        payingParty: PartyType;
        responsibleParty: PartyType;
        stepCost: number;
    }>({
        name: '',
        quantity: 1,
        payingParty: PartyType.Supplier,
        responsibleParty: PartyType.Supplier,
        stepCost: 0
    });

    // Custom step state
    const [customStep, setCustomStep] = useState<{
        englishName: string;
        englishDescription: string;
        translations: {
            de: { name: string; description: string };
            cz: { name: string; description: string };
            pl: { name: string; description: string };
        };
        baseCost: number;
        quantity: number;
        payingParty: PartyType;
        responsibleParty: PartyType;
    }>({
        englishName: '',
        englishDescription: '',
        translations: {
            de: { name: '', description: '' },
            cz: { name: '', description: '' },
            pl: { name: '', description: '' }
        },
        baseCost: 0,
        quantity: 1,
        payingParty: PartyType.Supplier,
        responsibleParty: PartyType.Supplier
    });

    // State for step description
    const [stepDescription, setStepDescription] = useState<string>('');

    // Added steps for demonstration
    const [addedSteps, setAddedSteps] = useState<any[]>([
        {
            id: 'step-1',
            name: 'Packaging',
            quantity: 2,
            payingParty: PartyType.Supplier,
            responsibleParty: PartyType.Supplier,
            stepCost: 240,
            isCustom: false
        },
        {
            id: 'custom-step-1',
            name: 'Custom Labeling',
            englishName: 'Custom Labeling',
            englishDescription: 'Apply special custom labels to items before return.',
            translations: {
                de: { name: 'Spezielle Etikettierung', description: 'Spezielle Etiketten an Artikeln vor der Rücksendung anbringen.' },
                cz: { name: 'Vlastní označení', description: 'Před vrácením použijte na položky speciální vlastní štítky.' },
                pl: { name: 'Niestandardowe etykiety', description: 'Zastosuj specjalne niestandardowe etykiety do przedmiotów przed zwrotem.' }
            },
            baseCost: 85,
            quantity: 1,
            payingParty: PartyType.Partner,
            responsibleParty: PartyType.Supplier,
            stepCost: 85,
            isCustom: true
        }
    ]);

    // Toggle custom mode
    const toggleCustomMode = () => {
        setCustomMode(!customMode);
    };

    // Handle standard step name change
    const handleStepNameChange = (stepName: string) => {
        const selectedStep = StepNames.find(step => step.name === stepName);
        if (selectedStep) {
            setStandardStep({
                ...standardStep,
                name: stepName,
                stepCost: calculateStepCost(selectedStep.baseCost, standardStep.quantity)
            });
            setStepDescription(selectedStep.description);
        }
    };

    // Handle quantity change
    const handleQuantityChange = (quantity: number) => {
        if (customMode) {
            // For custom step
            setCustomStep({
                ...customStep,
                quantity
            });
        } else {
            // For standard step
            const selectedStep = StepNames.find(step => step.name === standardStep.name);
            if (selectedStep) {
                setStandardStep({
                    ...standardStep,
                    quantity,
                    stepCost: calculateStepCost(selectedStep.baseCost, quantity)
                });
            }
        }
    };

    return (
        <Box sx={{ p: 0 }}>
            <Grid container spacing={3}>
                {/* Left Column - Form Input */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Configure Step
                            </Typography>

                            {!customMode ? (
                                /* Standard Step Configuration */
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>Step Name</Typography>
                                            <FormControl fullWidth variant="outlined" size="small">
                                                <Select
                                                    value={standardStep.name}
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
                                                            {step.name} - {formatCurrency(step.baseCost)}
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
                                                value={standardStep.quantity}
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
                                                value={formatCurrency(standardStep.stepCost)}
                                                InputProps={{
                                                    readOnly: true,
                                                    startAdornment: '€'
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
                                                value={standardStep.payingParty}
                                                onChange={(_, value) => value && setStandardStep(prev => ({ ...prev, payingParty: value }))}
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
                                                value={standardStep.responsibleParty}
                                                onChange={(_, value) => value && setStandardStep(prev => ({ ...prev, responsibleParty: value }))}
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
                                                color="primary"
                                                disabled={!standardStep.name}
                                                startIcon={<AddIcon />}
                                                sx={{ mt: 1 }}
                                            >
                                                Add Step
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 3 }} />

                                    {/* Create Custom Step Button */}
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        startIcon={<AddIcon />}
                                        onClick={toggleCustomMode}
                                    >
                                        Create Custom Step
                                    </Button>
                                </Box>
                            ) : (
                                /* Custom Step Creation Section */
                                <Box>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon />}
                                        onClick={toggleCustomMode}
                                        sx={{ mb: 3 }}
                                    >
                                        Back to Standard Steps
                                    </Button>

                                    <Typography variant="h6" color="secondary" sx={{ mb: 2 }}>
                                        Create Custom Step
                                    </Typography>

                                    <Grid container spacing={2}>
                                        {/* English Name & Description */}
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Custom Step Name (English) <span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                value={customStep.englishName}
                                                onChange={(e) => setCustomStep({ ...customStep, englishName: e.target.value })}
                                                placeholder="Enter custom step name"
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Description (English) <span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                rows={2}
                                                value={customStep.englishDescription}
                                                onChange={(e) => setCustomStep({ ...customStep, englishDescription: e.target.value })}
                                                placeholder="Enter step description"
                                                required
                                            />
                                        </Grid>

                                        {/* Translations in Accordions */}
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle2" color="secondary" sx={{ mt: 1, mb: 2, display: 'flex', alignItems: 'center' }}>
                                                <TranslateIcon sx={{ mr: 1 }} /> Required Translations
                                            </Typography>

                                            {/* German Translation */}
                                            <Accordion sx={{ mb: 1 }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="body2">German Translation <span style={{ color: 'red' }}>*</span></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <TextField
                                                        fullWidth
                                                        label="Name (German)"
                                                        variant="outlined"
                                                        size="small"
                                                        value={customStep.translations.de.name}
                                                        onChange={(e) => setCustomStep({
                                                            ...customStep,
                                                            translations: {
                                                                ...customStep.translations,
                                                                de: {
                                                                    ...customStep.translations.de,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                        })}
                                                        sx={{ mb: 2 }}
                                                        required
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        label="Description (German)"
                                                        variant="outlined"
                                                        size="small"
                                                        multiline
                                                        rows={2}
                                                        value={customStep.translations.de.description}
                                                        onChange={(e) => setCustomStep({
                                                            ...customStep,
                                                            translations: {
                                                                ...customStep.translations,
                                                                de: {
                                                                    ...customStep.translations.de,
                                                                    description: e.target.value
                                                                }
                                                            }
                                                        })}
                                                        required
                                                    />
                                                </AccordionDetails>
                                            </Accordion>

                                            {/* Czech Translation */}
                                            <Accordion sx={{ mb: 1 }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="body2">Czech Translation <span style={{ color: 'red' }}>*</span></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <TextField
                                                        fullWidth
                                                        label="Name (Czech)"
                                                        variant="outlined"
                                                        size="small"
                                                        value={customStep.translations.cz.name}
                                                        onChange={(e) => setCustomStep({
                                                            ...customStep,
                                                            translations: {
                                                                ...customStep.translations,
                                                                cz: {
                                                                    ...customStep.translations.cz,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                        })}
                                                        sx={{ mb: 2 }}
                                                        required
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        label="Description (Czech)"
                                                        variant="outlined"
                                                        size="small"
                                                        multiline
                                                        rows={2}
                                                        value={customStep.translations.cz.description}
                                                        onChange={(e) => setCustomStep({
                                                            ...customStep,
                                                            translations: {
                                                                ...customStep.translations,
                                                                cz: {
                                                                    ...customStep.translations.cz,
                                                                    description: e.target.value
                                                                }
                                                            }
                                                        })}
                                                        required
                                                    />
                                                </AccordionDetails>
                                            </Accordion>

                                            {/* Polish Translation */}
                                            <Accordion sx={{ mb: 2 }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="body2">Polish Translation <span style={{ color: 'red' }}>*</span></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <TextField
                                                        fullWidth
                                                        label="Name (Polish)"
                                                        variant="outlined"
                                                        size="small"
                                                        value={customStep.translations.pl.name}
                                                        onChange={(e) => setCustomStep({
                                                            ...customStep,
                                                            translations: {
                                                                ...customStep.translations,
                                                                pl: {
                                                                    ...customStep.translations.pl,
                                                                    name: e.target.value
                                                                }
                                                            }
                                                        })}
                                                        sx={{ mb: 2 }}
                                                        required
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        label="Description (Polish)"
                                                        variant="outlined"
                                                        size="small"
                                                        multiline
                                                        rows={2}
                                                        value={customStep.translations.pl.description}
                                                        onChange={(e) => setCustomStep({
                                                            ...customStep,
                                                            translations: {
                                                                ...customStep.translations,
                                                                pl: {
                                                                    ...customStep.translations.pl,
                                                                    description: e.target.value
                                                                }
                                                            }
                                                        })}
                                                        required
                                                    />
                                                </AccordionDetails>
                                            </Accordion>

                                            <FormHelperText>All translations are required for custom steps</FormHelperText>
                                        </Grid>

                                        {/* Base Cost */}
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                Base Cost (EUR) <span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                value={customStep.baseCost || ''}
                                                onChange={(e) => setCustomStep({ ...customStep, baseCost: parseFloat(e.target.value) || 0 })}
                                                InputProps={{
                                                    startAdornment: '€',
                                                    inputProps: { min: 0, step: 0.01 }
                                                }}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>Quantity</Typography>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                value={customStep.quantity}
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
                                                value={formatCurrency(calculateStepCost(customStep.baseCost || 0, customStep.quantity))}
                                                InputProps={{
                                                    readOnly: true,
                                                    startAdornment: '€'
                                                }}
                                            />
                                        </Grid>

                                        {/* Paying Party Toggle */}
                                        <Grid item xs={12}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>Paying Party</Typography>
                                            <ToggleButtonGroup
                                                color="secondary"
                                                exclusive
                                                fullWidth
                                                size="small"
                                                value={customStep.payingParty}
                                                onChange={(_, value) => value && setCustomStep(prev => ({ ...prev, payingParty: value }))}
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
                                                color="secondary"
                                                exclusive
                                                fullWidth
                                                size="small"
                                                value={customStep.responsibleParty}
                                                onChange={(_, value) => value && setCustomStep(prev => ({ ...prev, responsibleParty: value }))}
                                            >
                                                <ToggleButton value={PartyType.Partner}>
                                                    Partner
                                                </ToggleButton>
                                                <ToggleButton value={PartyType.Supplier}>
                                                    Supplier
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </Grid>

                                        {/* Add Custom Step Button */}
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                color="secondary"
                                                disabled={!customStep.englishName || !customStep.baseCost}
                                                startIcon={<AddIcon />}
                                                sx={{ mt: 1 }}
                                            >
                                                Add Custom Step
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column - Giveback Plan */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center" justifyContent="space-between">
                                <span>Giveback Plan</span>
                                <Chip
                                    size="small"
                                    label={`${addedSteps.length} steps`}
                                    color="primary"
                                    variant="outlined"
                                />
                            </Typography>

                            {/* Steps List */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                    Added Steps
                                </Typography>

                                <Box sx={{
                                    p: 2,
                                    bgcolor: 'background.default',
                                    borderRadius: 1,
                                    height: '280px',
                                    overflow: 'auto',
                                    border: '1px solid',
                                    borderColor: 'divider'
                                }}>
                                    {addedSteps.map((step, index) => {
                                        const isCustomStep = !!step.isCustom;
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
                                                    '&:last-child': { mb: 0 }
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="subtitle2" color={isCustomStep ? 'secondary.main' : 'inherit'}>
                                                        {index + 1}. {step.name} {isCustomStep && <Chip size="small" label="Custom" color="secondary" sx={{ ml: 1, height: 20 }} />}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Quantity: {step.quantity} • Paying: {step.payingParty} •
                                                        Responsible: {step.responsibleParty}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight="bold" color={isCustomStep ? 'secondary.main' : 'primary.main'}>
                                                        Cost: {formatCurrency(step.stepCost)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{ color: 'info.main' }}
                                                        title="View Details"
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color={isCustomStep ? 'secondary' : 'primary'}
                                                        title="Edit Step"
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        title="Remove Step"
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>

                            {/* Global Notes */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                                    Global Notes
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    placeholder="Enter global notes for the entire giveback order"
                                />
                            </Box>

                            {/* Save Button */}
                            <Box>
                                <Divider sx={{ mb: 2 }} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    startIcon={<SaveIcon />}
                                >
                                    Save Giveback Order ({addedSteps.length} steps)
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Approach1ExpandableForm;