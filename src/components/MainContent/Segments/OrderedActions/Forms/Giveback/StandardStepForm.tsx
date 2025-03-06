import React from 'react';
import {
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Grid,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import {
    PriceCheck as PriceCheckIcon
} from '@mui/icons-material';

// Import types
import { PartyType } from './giveback-types';
import { StepNames } from './giveback-step-definitions';
import { formatCurrency } from './giveback-cost-utils';

// Standard step data interface
export interface StandardStepData {
    name: string;
    quantity: number;
    payingParty: PartyType;
    responsibleParty: PartyType;
    stepCost: number;
}

interface StandardStepFormProps {
    data: StandardStepData;
    onChange: (data: StandardStepData) => void;
    stepDescription: string;
    onStepDescriptionChange: (description: string) => void;
}

const StandardStepForm: React.FC<StandardStepFormProps> = ({
                                                               data,
                                                               onChange,
                                                               stepDescription,
                                                               onStepDescriptionChange
                                                           }) => {
    // Handler for step name selection
    const handleStepNameChange = (stepName: string) => {
        const selectedStep = StepNames.find(step => step.name === stepName);
        onChange({
            ...data,
            name: stepName,
            stepCost: selectedStep
                ? calculateStepCost(selectedStep.baseCost, data.quantity || 1)
                : 0
        });
        onStepDescriptionChange(selectedStep ? selectedStep.description : '');
    };

    // Handler for quantity change
    const handleQuantityChange = (quantity: number) => {
        const selectedStep = StepNames.find(step => step.name === data.name);
        onChange({
            ...data,
            quantity,
            stepCost: selectedStep
                ? calculateStepCost(selectedStep.baseCost, quantity)
                : 0
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

    // Calculate step cost based on base cost and quantity
    const calculateStepCost = (baseCost: number, quantity: number): number => {
        return baseCost * quantity;
    };

    return (
        <Grid container spacing={2}>
            {/* Step Name Dropdown */}
            <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 1 }}>Step Name</Typography>
                <FormControl fullWidth variant="outlined" size="small">
                    <Select
                        value={data.name || ''}
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
                    value={data.quantity}
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
                    value={formatCurrency(data.stepCost || 0)}
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
                    color="primary"
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

export default StandardStepForm;