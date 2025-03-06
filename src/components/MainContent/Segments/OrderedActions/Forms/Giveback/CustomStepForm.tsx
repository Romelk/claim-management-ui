import React, { useState } from 'react';
import {
    Typography,
    TextField,
    Grid,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Tabs,
    Tab,
    Box,
    FormHelperText,
    Divider
} from '@mui/material';
import {
    Translate as TranslateIcon,
    PriceCheck as PriceCheckIcon
} from '@mui/icons-material';

// Import types
import { PartyType } from './giveback-types';
import { formatCurrency } from './giveback-cost-utils';

// Custom step type definition
export interface CustomStepData {
    englishName: string;
    englishDescription: string;
    baseCost: number;
    quantity: number;
    payingParty: PartyType;
    responsibleParty: PartyType;
    translations: {
        de: { name: string; description: string; };
        cz: { name: string; description: string; };
        pl: { name: string; description: string; };
    };
}

interface CustomStepFormProps {
    data: CustomStepData;
    onChange: (data: CustomStepData) => void;
    onSave: () => void;
    isEditing: boolean;
}

const CustomStepForm: React.FC<CustomStepFormProps> = ({
                                                           data,
                                                           onChange,
                                                           onSave,
                                                           isEditing
                                                       }) => {
    // State for translations tab
    const [translationTab, setTranslationTab] = useState<number>(0);

    // Calculate step cost
    const calculateStepCost = (baseCost: number, quantity: number): number => {
        return baseCost * quantity;
    };

    // Handler for name change
    const handleNameChange = (name: string) => {
        onChange({
            ...data,
            englishName: name
        });
    };

    // Handler for description change
    const handleDescriptionChange = (description: string) => {
        onChange({
            ...data,
            englishDescription: description
        });
    };

    // Handler for base cost change
    const handleBaseCostChange = (baseCost: number) => {
        onChange({
            ...data,
            baseCost
        });
    };

    // Handler for quantity change
    const handleQuantityChange = (quantity: number) => {
        onChange({
            ...data,
            quantity
        });
    };

    // Handler for paying party change
    const handlePayingPartyChange = (party: PartyType | null) => {
        if (party) {
            onChange({
                ...data,
                payingParty: party
            });
        }
    };

    // Handler for responsible party change
    const handleResponsiblePartyChange = (party: PartyType | null) => {
        if (party) {
            onChange({
                ...data,
                responsibleParty: party
            });
        }
    };

    // Handler for translation tab change
    const handleTranslationTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTranslationTab(newValue);
    };

    // Handler for translation field changes
    const handleTranslationChange = (language: 'de' | 'cz' | 'pl', field: 'name' | 'description', value: string) => {
        onChange({
            ...data,
            translations: {
                ...data.translations,
                [language]: {
                    ...data.translations[language],
                    [field]: value
                }
            }
        });
    };

    // Check if translations are valid
    const areTranslationsValid = () => {
        return (
            data.translations.de.name &&
            data.translations.de.description &&
            data.translations.cz.name &&
            data.translations.cz.description &&
            data.translations.pl.name &&
            data.translations.pl.description
        );
    };

    // Check if form is valid
    const isValid = !!data.englishName &&
        !!data.englishDescription &&
        data.baseCost > 0 &&
        areTranslationsValid();

    return (
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
                    value={data.englishName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter custom step name"
                    required
                    error={data.englishName === ''}
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
                    value={data.englishDescription}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Enter step description"
                    required
                    error={data.englishDescription === ''}
                />
            </Grid>

            {/* Translations Section - Always visible and required */}
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
                            value={data.translations.de.name}
                            onChange={(e) => handleTranslationChange('de', 'name', e.target.value)}
                            sx={{ mb: 2 }}
                            required
                            error={!data.translations.de.name}
                            helperText={!data.translations.de.name ? "German name is required" : ""}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Description (German)"
                            multiline
                            rows={2}
                            value={data.translations.de.description}
                            onChange={(e) => handleTranslationChange('de', 'description', e.target.value)}
                            required
                            error={!data.translations.de.description}
                            helperText={!data.translations.de.description ? "German description is required" : ""}
                        />
                    </Box>

                    {/* Czech Translation */}
                    <Box hidden={translationTab !== 1} sx={{ p: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Name (Czech)"
                            value={data.translations.cz.name}
                            onChange={(e) => handleTranslationChange('cz', 'name', e.target.value)}
                            sx={{ mb: 2 }}
                            required
                            error={!data.translations.cz.name}
                            helperText={!data.translations.cz.name ? "Czech name is required" : ""}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Description (Czech)"
                            multiline
                            rows={2}
                            value={data.translations.cz.description}
                            onChange={(e) => handleTranslationChange('cz', 'description', e.target.value)}
                            required
                            error={!data.translations.cz.description}
                            helperText={!data.translations.cz.description ? "Czech description is required" : ""}
                        />
                    </Box>

                    {/* Polish Translation */}
                    <Box hidden={translationTab !== 2} sx={{ p: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Name (Polish)"
                            value={data.translations.pl.name}
                            onChange={(e) => handleTranslationChange('pl', 'name', e.target.value)}
                            sx={{ mb: 2 }}
                            required
                            error={!data.translations.pl.name}
                            helperText={!data.translations.pl.name ? "Polish name is required" : ""}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Description (Polish)"
                            multiline
                            rows={2}
                            value={data.translations.pl.description}
                            onChange={(e) => handleTranslationChange('pl', 'description', e.target.value)}
                            required
                            error={!data.translations.pl.description}
                            helperText={!data.translations.pl.description ? "Polish description is required" : ""}
                        />
                    </Box>
                </Box>
                <FormHelperText>All translations are required for custom steps</FormHelperText>
            </Grid>

            {/* Base Cost for Custom Steps */}
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
                    value={data.baseCost || ''}
                    onChange={(e) => handleBaseCostChange(parseFloat(e.target.value) || 0)}
                    InputProps={{
                        startAdornment: '€',
                        inputProps: { min: 0, step: 0.01 }
                    }}
                    required
                    error={data.baseCost <= 0}
                    helperText={data.baseCost <= 0 ? "Base cost is required" : ""}
                />
            </Grid>

            {/* Quantity for Custom Step */}
            <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>Quantity</Typography>
                <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    size="small"
                    value={data.quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    InputProps={{
                        inputProps: { min: 1 }
                    }}
                />
            </Grid>

            {/* Custom Step Cost Display */}
            <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>Step Cost</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formatCurrency(calculateStepCost(data.baseCost || 0, data.quantity || 1))}
                    InputProps={{
                        readOnly: true,
                        startAdornment: <PriceCheckIcon color="secondary" sx={{ mr: 1, fontSize: '1rem' }} />
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
                    value={data.payingParty}
                    onChange={(_, value) => handlePayingPartyChange(value)}
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
                    value={data.responsibleParty}
                    onChange={(_, value) => handleResponsiblePartyChange(value)}
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
    );
};

export default CustomStepForm;