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
    Tabs,
    Tab,
    FormHelperText
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    PriceCheck as PriceCheckIcon,
    Notes as NotesIcon,
    Visibility as VisibilityIcon,
    Translate as TranslateIcon
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

// Approach 2: Toggle between Standard/Custom modes
const Approach2ToggleForm: React.FC = () => {
    // State for step mode (standard or custom)
    const [stepMode, setStepMode] = useState<'standard' | 'custom'>('standard');

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

    // State for translations tab
    const [translationTab, setTranslationTab] = useState<number>(0);

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

    // Handle step mode change
    const handleStepModeChange = (mode: 'standard' | 'custom') => {
        setStepMode(mode);
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
        if (stepMode === 'custom') {
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

    // Handle translation tab change
    const handleTranslationTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTranslationTab(newValue);
    };

    // Handle translation field changes
    const handleTranslationChange = (language: 'de' | 'cz' | 'pl', field: 'name' | 'description', value: string) => {
        setCustomStep({
            ...customStep,
            translations: {
                ...customStep.translations,
                [language]: {
                    ...customStep.translations[language],
                    [field]: value
                }
            }
        });
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

                            {/* Step Type Toggle */}
                            <Box sx={{ mb: 3, display: 'flex', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                                <Button
                                    fullWidth
                                    variant={stepMode === 'standard' ? 'contained' : 'outlined'}
                                    color="primary"
                                    onClick={() => handleStepModeChange('standard')}
                                    sx={{ borderRadius: 0, py: 1 }}
                                >
                                    Standard Step
                                </Button>
                                <Button
                                    fullWidth
                                    variant={stepMode === 'custom' ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => handleStepModeChange('custom')}
                                    sx={{ borderRadius: 0, py: 1 }}
                                >
                                    Custom Step
                                </Button>
                            </Box>

                            {stepMode === 'standard' ? (
                                /* Standard Step Form */
                                <Grid container spacing={2}>
                                    {/* Step Name Dropdown */}
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
                                                startAdornment: <PriceCheckIcon color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                /* Custom Step Form */
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

                                    {/* Translations */}
                                    <Grid item xs={12}>
                                        <Divider sx={{ mb: 2, mt: 1 }} />
                                        <Typography variant="subtitle2" color="secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <TranslateIcon sx={{ mr: 1 }} /> Required Translations
                                        </Typography>

                                        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 2 }}>
                                            <Tabs
                                                value={translationTab}
                                                onChange={handleTranslationTabChange}
                                                variant="fullWidth"
                                                sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                                            >
                                                <Tab label="German" />
                                                <Tab label="Czech" />
                                                <Tab label="Polish" />
                                            </Tabs>

                                            {/* German Translation */}
                                            <Box hidden={translationTab !== 0} sx={{ p: 2 }}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    label="Name (German)"
                                                    value={customStep.translations.de.name}
                                                    onChange={(e) => handleTranslationChange('de', 'name', e.target.value)}
                                                    sx={{ mb: 2 }}
                                                    required
                                                    error={!customStep.translations.de.name}
                                                    helperText={!customStep.translations.de.name ? "German name is required" : ""}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    label="Description (German)"
                                                    multiline
                                                    rows={2}
                                                    value={customStep.translations.de.description}
                                                    onChange={(e) => handleTranslationChange('de', 'description', e.target.value)}
                                                    required
                                                    error={!customStep.translations.de.description}
                                                    helperText={!customStep.translations.de.description ? "German description is required" : ""}
                                                />
                                            </Box>

                                            {/* Czech Translation */}
                                            <Box hidden={translationTab !== 1} sx={{ p: 2 }}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    label="Name (Czech)"
                                                    value={customStep.translations.cz.name}
                                                    onChange={(e) => handleTranslationChange('cz', 'name', e.target.value)}
                                                    sx={{ mb: 2 }}
                                                    required
                                                    error={!customStep.translations.cz.name}
                                                    helperText={!customStep.translations.cz.name ? "Czech name is required" : ""}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    label="Description (Czech)"
                                                    multiline
                                                    rows={2}
                                                    value={customStep.translations.cz.description}
                                                    onChange={(e) => handleTranslationChange('cz', 'description', e.target.value)}
                                                    required
                                                    error={!customStep.translations.cz.description}
                                                    helperText={!customStep.translations.cz.description ? "Czech description is required" : ""}
                                                />
                                            </Box>

                                            {/* Polish Translation */}
                                            <Box hidden={translationTab !== 2} sx={{ p: 2 }}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    label="Name (Polish)"
                                                    value={customStep.translations.pl.name}
                                                    onChange={(e) => handleTranslationChange('pl', 'name', e.target.value)}
                                                    sx={{ mb: 2 }}
                                                    required
                                                    error={!customStep.translations.pl.name}
                                                    helperText={!customStep.translations.pl.name ? "Polish name is required" : ""}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    label="Description (Polish)"
                                                    multiline
                                                    rows={2}
                                                    value={customStep.translations.pl.description}
                                                    onChange={(e) => handleTranslationChange('pl', 'description', e.target.value)}
                                                    required
                                                    error={!customStep.translations.pl.description}
                                                    helperText={!customStep.translations.pl.description ? "Polish description is required" : ""}
                                                />
                                            </Box>
                                        </Box>
                                        <FormHelperText>All translations are required for custom steps</FormHelperText>
                                    </Grid>

                                    {/* Base Cost */}
                                    <Grid item xs={12}>
                                        <Divider sx={{ mb: 2, mt: 1 }} />
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
                                                startAdornment: <PriceCheckIcon color="secondary" sx={{ mr: 1, fontSize: '1rem' }} />
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}

                            {/* Common fields for both modes */}
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {/* Paying Party Toggle */}
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Paying Party</Typography>
                                    <ToggleButtonGroup
                                        color={stepMode === 'standard' ? "primary" : "secondary"}
                                        exclusive
                                        fullWidth
                                        size="small"
                                        value={stepMode === 'standard' ? standardStep.payingParty : customStep.payingParty}
                                        onChange={(_, value) => {
                                            if (value) {
                                                if (stepMode === 'standard') {
                                                    setStandardStep(prev => ({
                                                        ...prev,
                                                        payingParty: value
                                                    }));
                                                } else {
                                                    setCustomStep(prev => ({
                                                        ...prev,
                                                        payingParty: value
                                                    }));
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

                                {/* Responsible Party Toggle */}
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Responsible Party</Typography>
                                    <ToggleButtonGroup
                                        color={stepMode === 'standard' ? "primary" : "secondary"}
                                        exclusive
                                        fullWidth
                                        size="small"
                                        value={stepMode === 'standard' ? standardStep.responsibleParty : customStep.responsibleParty}
                                        onChange={(_, value) => {
                                            if (value) {
                                                if (stepMode === 'standard') {
                                                    setStandardStep(prev => ({
                                                        ...prev,
                                                        responsibleParty: value
                                                    }));
                                                } else {
                                                    setCustomStep(prev => ({
                                                        ...prev,
                                                        responsibleParty: value
                                                    }));
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

                                {/* Add Button */}
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color={stepMode === 'standard' ? "primary" : "secondary"}
                                        disabled={
                                            stepMode === 'standard'
                                                ? !standardStep.name
                                                : !customStep.englishName || !customStep.baseCost
                                        }
                                        startIcon={<AddIcon />}
                                        sx={{ mt: 1 }}
                                    >
                                        {stepMode === 'standard' ? 'Add Step' : 'Add Custom Step'}
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
                                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                    <NotesIcon fontSize="small" sx={{ mr: 0.5 }} /> Global Notes
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

export default Approach2ToggleForm;