import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    Card,
    CardContent,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Divider,
    InputAdornment
} from '@mui/material';
import {
    Save as SaveIcon,
    Inventory as InventoryIcon,
    Notes as NotesIcon,
    Percent as PercentIcon
} from '@mui/icons-material';

// Types
enum PartyType {
    Partner = 'Partner',
    Supplier = 'Supplier'
}

interface OnStockFormData {
    quantity: number;
    invoiceDiscountPercent: number;
    responsibleParty: PartyType;
    notes: string;
}

interface OnStockFormProps {
    onFormChange: (data: OnStockFormData) => void;
    initialData?: Partial<OnStockFormData>;
    onSave?: () => void;
}

const OnStockForm: React.FC<OnStockFormProps> = ({
                                                     onFormChange,
                                                     initialData = {},
                                                     onSave
                                                 }) => {
    // State
    const [quantity, setQuantity] = useState<number>(initialData.quantity || 1);
    const [invoiceDiscountPercent, setInvoiceDiscountPercent] = useState<number>(
        initialData.invoiceDiscountPercent || 0
    );
    const [responsibleParty, setResponsibleParty] = useState<PartyType>(
        initialData.responsibleParty || PartyType.Supplier
    );
    const [notes, setNotes] = useState<string>(initialData.notes || '');

    // Effect to notify parent of data changes
    useEffect(() => {
        const formData: OnStockFormData = {
            quantity,
            invoiceDiscountPercent,
            responsibleParty,
            notes
        };
        onFormChange(formData);
    }, [quantity, invoiceDiscountPercent, responsibleParty, notes, onFormChange]);

    // Effect to set initial data if provided
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            if (initialData.quantity !== undefined) setQuantity(initialData.quantity);
            if (initialData.invoiceDiscountPercent !== undefined) setInvoiceDiscountPercent(initialData.invoiceDiscountPercent);
            if (initialData.responsibleParty !== undefined) setResponsibleParty(initialData.responsibleParty);
            if (initialData.notes !== undefined) setNotes(initialData.notes);
        }
    }, [initialData]);

    // Handler for quantity change
    const handleQuantityChange = (value: number) => {
        setQuantity(value < 1 ? 1 : value);
    };

    // Handler for discount percent change
    const handleDiscountPercentChange = (value: number) => {
        setInvoiceDiscountPercent(Math.min(Math.max(value, 0), 100));
    };

    // Handler for responsible party change
    const handleResponsiblePartyChange = (
        _: React.MouseEvent<HTMLElement>,
        newValue: PartyType | null
    ) => {
        if (newValue !== null) {
            setResponsibleParty(newValue);
        }
    };

    // Handler for notes change
    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(event.target.value);
    };

    // Determine if form is valid for saving
    const canSave = quantity > 0;

    return (
        <Box sx={{ position: 'relative', p: 2 }}>
            <Grid container spacing={3}>
                {/* Left Column - Form Input */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                                <InventoryIcon sx={{ mr: 1 }} /> Configure On-Stock
                            </Typography>

                            <Grid container spacing={2}>
                                {/* Quantity Input */}
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Quantity
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                        InputProps={{
                                            inputProps: { min: 1 }
                                        }}
                                    />
                                </Grid>

                                {/* Invoice Discount Percent */}
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Supplier Invoice Discount
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={invoiceDiscountPercent}
                                        onChange={(e) => handleDiscountPercentChange(parseFloat(e.target.value) || 0)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <PercentIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            inputProps: { min: 0, max: 100, step: 0.1 }
                                        }}
                                    />
                                </Grid>

                                {/* Responsible Party Toggle */}
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        Responsible Party
                                    </Typography>
                                    <ToggleButtonGroup
                                        color="primary"
                                        exclusive
                                        fullWidth
                                        size="small"
                                        value={responsibleParty}
                                        onChange={handleResponsiblePartyChange}
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
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column - Notes */}
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" color="primary" gutterBottom display="flex" alignItems="center">
                                <NotesIcon sx={{ mr: 1 }} /> Notes
                            </Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                variant="outlined"
                                placeholder="Add any additional information or instructions regarding this on-stock action."
                                value={notes}
                                onChange={handleNotesChange}
                                sx={{ mb: 3, flexGrow: 1 }}
                            />

                            <Box>
                                <Divider sx={{ mb: 2 }} />

                                {onSave && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        startIcon={<SaveIcon />}
                                        onClick={onSave}
                                        disabled={!canSave}
                                    >
                                        Save On-Stock Action
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

export default OnStockForm;