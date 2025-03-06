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
    Stepper,
    Step,
    StepLabel,
    StepContent
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    Visibility as VisibilityIcon,
    ArrowForward as ArrowForwardIcon,
    Notes as NotesIcon,
    Translate as TranslateIcon,
    PriceCheck as PriceCheckIcon
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

// Approach 3: Progressive Disclosure
const Approach3ProgressiveForm: React.FC = () => {
    // State for UI step mode (standard or custom)
    const [stepMode, setStepMode] = useState<'standard' | 'custom'>('standard');

    // State for custom step creation process
    const [customPhase, setCustomPhase] = useState<number>(0); // 0: Initial, 1: English, 2: Translations, 3: Cost, 4: Quantity and Parties

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
                pl: { name: 'Niestandardowe etykiety', description: 'Zastosuj specjalne niestandardowe etykiety do předmiotów před zwrotem.' }
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
        if (mode === 'custom') {
            setCustomPhase(0); // Reset custom step phase when switching modes
        }
    };

    // Advance to next custom step phase
    const handleNextPhase = () => {
        setCustomPhase(prev => prev + 1);
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

    // Check if current custom phase is valid
    const isCurrentPhaseValid = () => {
        switch (customPhase) {
            case 0: // Initial
                return true;
            case 1: // English Name & Description
                return !!customStep.englishName && !!customStep.englishDescription;
            case 2: // Translations
                return (
                    !!customStep.translations.de.name && !!customStep.translations.de.description &&
                    !!customStep.translations.cz.name && !!customStep.translations.cz.description &&
                    !!customStep.translations.pl.name && !!customStep.translations.pl.description
                );
            case 3: // Base Cost
                return customStep.baseCost > 0;
            case 4: // Quantity & Parties
                return customStep.quantity > 0;
            default:
                return false;
        }
    };

    // Get progress step label
    const getStepLabel = (step: number) => {
        switch (step) {
            case 0:
                return "Get Started";
            case 1:
                return "English Details";
            case 2:
                return "Translations";
            case 3:
                return "Base Cost";
            case 4:
                return "Quantity & Parties";
            default:
                return "";
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
                            ) : (
                                /* Custom Step Progressive Form */
                                <Box>
                                    <Stepper activeStep={customPhase} orientation="vertical" sx={{ mb: 3 }}>
                                        {/* Phase 0: Get Started */}
                                        <Step>
                                            <StepLabel>{getStepLabel(0)}</StepLabel>
                                            <StepContent>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    You're creating a custom step where you'll need to provide:
                                                </Typography>
                                                <ul style={{ color: 'rgba(0, 0, 0, 0.6)', paddingLeft: '1.5rem', marginTop: 0 }}>
                                                    <li>Step name and description in English</li>
                                                    <li>Translations in German, Czech, and Polish</li>
                                                    <li>Base cost in EUR</li>
                                                    <li>Quantity and responsible parties</li>
                                                </ul>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    endIcon={<ArrowForwardIcon />}
                                                    onClick={handleNextPhase}
                                                    sx={{ mt: 1 }}
                                                >
                                                    Begin
                                                </Button>
                                            </StepContent>
                                        </Step>

                                        {/* Phase 1: English Name & Description */}
                                        <Step>
                                            <StepLabel>{getStepLabel(1)}</StepLabel>
                                            <StepContent>
                                                <Grid container spacing={2}>
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
                                                            error={!customStep.englishName}
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
                                                            error={!customStep.englishDescription}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    endIcon={<ArrowForwardIcon />}
                                                    onClick={handleNextPhase}
                                                    disabled={!isCurrentPhaseValid()}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Next: Translations
                                                </Button>
                                            </StepContent>
                                        </Step>

                                        {/* Phase 2: Translations */}
                                        <Step>
                                            <StepLabel>{getStepLabel(2)}</StepLabel>
                                            <StepContent>
                                                <Typography variant="subtitle2" color="secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <TranslateIcon sx={{ mr: 1 }} /> Required Translations
                                                </Typography>

                                                {/* German Translation */}
                                                <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                    German <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            label="Name (German)"
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
                                                            required
                                                            error={!customStep.translations.de.name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            label="Description (German)"
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
                                                            error={!customStep.translations.de.description}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                {/* Czech Translation */}
                                                <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                    Czech <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            label="Name (Czech)"
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
                                                            required
                                                            error={!customStep.translations.cz.name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            label="Description (Czech)"
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
                                                            error={!customStep.translations.cz.description}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                {/* Polish Translation */}
                                                <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                                                    Polish <span style={{ color: 'red' }}>*</span>
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            label="Name (Polish)"
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
                                                            required
                                                            error={!customStep.translations.pl.name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            label="Description (Polish)"
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
                                                            error={!customStep.translations.pl.description}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    endIcon={<ArrowForwardIcon />}
                                                    onClick={handleNextPhase}
                                                    disabled={!isCurrentPhaseValid()}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Next: Base Cost
                                                </Button>
                                            </StepContent>
                                        </Step>

                                        {/* Phase 3: Base Cost */}
                                        <Step>
                                            <StepLabel>{getStepLabel(3)}</StepLabel>
                                            <StepContent>
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
                                                    error={customStep.baseCost <= 0}
                                                    sx={{ mb: 2 }}
                                                />
                                                <Typography variant="body2" color="text.secondary">
                                                    This is the base cost for each unit of this custom step.
                                                </Typography>

                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    endIcon={<ArrowForwardIcon />}
                                                    onClick={handleNextPhase}
                                                    disabled={!isCurrentPhaseValid()}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Next: Quantity & Parties
                                                </Button>
                                            </StepContent>
                                        </Step>

                                        {/* Phase 4: Quantity & Parties */}
                                        <Step>
                                            <StepLabel>{getStepLabel(4)}</StepLabel>
                                            <StepContent>
                                                <Grid container spacing={2}>
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
                                                            sx={{ mb: 2 }}
                                                        />
                                                    </Grid>

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
                                                            sx={{ mb: 2 }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>Paying Party</Typography>
                                                        <ToggleButtonGroup
                                                            color="secondary"
                                                            exclusive
                                                            fullWidth
                                                            size="small"
                                                            value={customStep.payingParty}
                                                            onChange={(_, value) => value && setCustomStep(prev => ({ ...prev, payingParty: value }))}
                                                            sx={{ mb: 2 }}
                                                        >
                                                            <ToggleButton value={PartyType.Partner}>
                                                                Partner
                                                            </ToggleButton>
                                                            <ToggleButton value={PartyType.Supplier}>
                                                                Supplier
                                                            </ToggleButton>
                                                        </ToggleButtonGroup>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" sx={{ mb: 1 }}>Responsible Party</Typography>
                                                        <ToggleButtonGroup
                                                            color="secondary"
                                                            exclusive
                                                            fullWidth
                                                            size="small"
                                                            value={customStep.responsibleParty}
                                                            onChange={(_, value) => value && setCustomStep(prev => ({ ...prev, responsibleParty: value }))}
                                                            sx={{ mb: 2 }}
                                                        >
                                                            <ToggleButton value={PartyType.Partner}>
                                                                Partner
                                                            </ToggleButton>
                                                            <ToggleButton value={PartyType.Supplier}>
                                                                Supplier
                                                            </ToggleButton>
                                                        </ToggleButtonGroup>
                                                    </Grid>
                                                </Grid>

                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                    Review your custom step details before adding it to the Giveback Plan.
                                                </Typography>

                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<AddIcon />}
                                                    onClick={() => {}}
                                                    sx={{ mt: 1 }}
                                                >
                                                    Add Custom Step
                                                </Button>
                                            </StepContent>
                                        </Step>
                                    </Stepper>
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

export default Approach3ProgressiveForm;