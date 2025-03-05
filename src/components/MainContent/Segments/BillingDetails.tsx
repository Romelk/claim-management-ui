import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,  // Add this import
    styled
} from '@mui/material';
import { Receipt as BillingDetailsIcon } from '@mui/icons-material';

// Interfaces
interface BillingInputs {
    administrativeCost: number;
    inspectionCost: number;
    handlingCost: number;
    discountPercentage: number;
}

interface InvoiceData extends BillingInputs {
    id: string;
    date: string;
    orderNumber: string;
    supplierName: string;
    supplierId: string;
    articleNumber: string;
    warehouseName: string;
}

// Styled components
const InvoiceSection = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2)
}));

const InvoiceLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1)
}));

const InvoiceValue = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    color: theme.palette.text.primary
}));

// Invoice Display Component
const LiveInvoiceDisplay: React.FC<{ data: BillingInputs }> = ({ data }) => {
    const calculateTotalCost = () => {
        const totalBeforeDiscount = data.administrativeCost +
            data.inspectionCost +
            data.handlingCost;
        return totalBeforeDiscount - (totalBeforeDiscount * (data.discountPercentage / 100));
    };

    return (
        <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Bill Details
            </Typography>

            {/* Product Information Section */}
            <InvoiceSection>
                <InvoiceLabel variant="subtitle2">Product Information</InvoiceLabel>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InvoiceLabel variant="body2">Order Number</InvoiceLabel>
                        <InvoiceValue variant="body1">
                            {`INV-${new Date().getFullYear()}-DRAFT`}
                        </InvoiceValue>
                    </Grid>
                    <Grid item xs={6}>
                        <InvoiceLabel variant="body2">Supplier Name</InvoiceLabel>
                        <InvoiceValue variant="body1">RetailCorp GmbH</InvoiceValue>
                    </Grid>
                    <Grid item xs={6}>
                        <InvoiceLabel variant="body2">Supplier ID</InvoiceLabel>
                        <InvoiceValue variant="body1">SUP-2025-001</InvoiceValue>
                    </Grid>
                    <Grid item xs={6}>
                        <InvoiceLabel variant="body2">Article Number</InvoiceLabel>
                        <InvoiceValue variant="body1">ART-DRAFT</InvoiceValue>
                    </Grid>
                    <Grid item xs={6}>
                        <InvoiceLabel variant="body2">Warehouse Name</InvoiceLabel>
                        <InvoiceValue variant="body1">Central Logistics Hub</InvoiceValue>
                    </Grid>
                </Grid>
            </InvoiceSection>

            {/* Cost Details Section */}
            <InvoiceSection>
                <InvoiceLabel variant="subtitle2">Cost Breakdown</InvoiceLabel>
                <TableContainer>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell>Administrative Cost</TableCell>
                                <TableCell align="right">
                                    {data.administrativeCost.toFixed(2)} EUR
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Inspection Cost</TableCell>
                                <TableCell align="right">
                                    {data.inspectionCost.toFixed(2)} EUR
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Handling Cost</TableCell>
                                <TableCell align="right">
                                    {data.handlingCost.toFixed(2)} EUR
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Discount</TableCell>
                                <TableCell align="right">
                                    {data.discountPercentage.toFixed(2)}%
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </InvoiceSection>

            {/* Total Cost Section */}
            <Box>
                <InvoiceLabel variant="subtitle2">Total Cost</InvoiceLabel>
                <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                >
                    {calculateTotalCost().toFixed(2)} EUR
                </Typography>
            </Box>
        </Paper>
    );
};

// Invoices List Component
const InvoicesList: React.FC<{
    invoices: InvoiceData[],
    onViewDetails: (invoice: InvoiceData) => void
}> = ({ invoices, onViewDetails }) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 2
                }}
            >
                <BillingDetailsIcon sx={{ mr: 2 }} />
                Billing Invoices
            </Typography>

            {invoices.length === 0 ? (
                <Typography variant="body2" color="text.secondary" align="center">
                    No invoices generated yet.
                </Typography>
            ) : (
                invoices.map((invoice) => (
                    <Paper
                        key={invoice.id}
                        variant="outlined"
                        sx={{
                            p: 2,
                            mb: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1">{invoice.orderNumber}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Generated: {invoice.date}
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => onViewDetails(invoice)}
                        >
                            View Details
                        </Button>
                    </Paper>
                ))
            )}
        </Box>
    );
};

// Main Billing Details Component
const BillingDetails: React.FC = () => {
    // Possible views: 'input', 'list', 'details'
    //const [view, setView] = useState<'input' | 'list' | 'details'>('input');

    // Input state
    const [inputs, setInputs] = useState<BillingInputs>({
        administrativeCost: 0,
        inspectionCost: 0,
        handlingCost: 0,
        discountPercentage: 0
    });

    // Invoices list state
    const [invoices, setInvoices] = useState<InvoiceData[]>(() => {
        // Retrieve saved invoices from localStorage
        const savedInvoices = localStorage.getItem('billingInvoices');
        return savedInvoices ? JSON.parse(savedInvoices) : [];
    });

    const [view, setView] = useState<'input' | 'list' | 'details'>(
        invoices.length > 0 ? 'list' : 'input'
    );

    // Selected invoice for details view
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);

    // Update localStorage whenever invoices change
    useEffect(() => {
        localStorage.setItem('billingInvoices', JSON.stringify(invoices));
    }, [invoices]);

    // Handle input changes
    const handleInputChange = (field: keyof BillingInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        setInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Generate invoice
    const handleGenerateInvoice = () => {
        const newInvoice: InvoiceData = {
            ...inputs,
            id: `Invoice-${Date.now()}`,
            date: new Date().toLocaleDateString('en-GB'),
            orderNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
            supplierName: 'RetailCorp GmbH',
            supplierId: 'SUP-2025-001',
            articleNumber: `ART-${Math.floor(Math.random() * 10000)}`,
            warehouseName: 'Central Logistics Hub'
        };

        setInvoices(prev => [...prev, newInvoice]);
        setView('list');
    };

    // View details of a specific invoice
    const handleViewDetails = (invoice: InvoiceData) => {
        setSelectedInvoice(invoice);
        setView('details');
    };

    // Add this component to the file
    const InvoiceDetailsView: React.FC<{
        invoice: InvoiceData,
        onBack: () => void,
        onEdit: () => void
    }> = ({ invoice, onBack, onEdit }) => {
        const calculateTotalCost = () => {
            const totalBeforeDiscount = invoice.administrativeCost +
                invoice.inspectionCost +
                invoice.handlingCost;
            return totalBeforeDiscount - (totalBeforeDiscount * (invoice.discountPercentage / 100));
        };

        return (
            <Box sx={{ p: 3 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography
                        variant="h5"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }}
                    >
                        <BillingDetailsIcon sx={{ mr: 2 }} />
                        Invoice Details
                    </Typography>
                    <Box>
                        <Button
                            variant="outlined"
                            onClick={onBack}
                            sx={{ mr: 2 }}
                        >
                            Back to List
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Administrative Cost"
                            type="number"
                            value={invoice.administrativeCost}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Inspection Cost"
                            type="number"
                            value={invoice.inspectionCost}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Handling Cost"
                            type="number"
                            value={invoice.handlingCost}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Discount (%)"
                            type="number"
                            value={invoice.discountPercentage}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Paper variant="outlined" sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Invoice Summary</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Order Number</Typography>
                            <Typography>{invoice.orderNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Supplier Name</Typography>
                            <Typography>{invoice.supplierName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Supplier ID</Typography>
                            <Typography>{invoice.supplierId}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Article Number</Typography>
                            <Typography>{invoice.articleNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Warehouse Name</Typography>
                            <Typography>{invoice.warehouseName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Total Cost</Typography>
                            <Typography variant="h6" color="primary">
                                {calculateTotalCost().toFixed(2)} EUR
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        );
    };

    // Render appropriate view
    const renderContent = () => {
        switch (view) {
            case 'input':
                return (
                    <Box sx={{ display: 'flex', height: '100%' }}>
                        {/* Input Section */}
                        <Box sx={{
                            width: '50%',
                            p: 3,
                            borderRight: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    color: 'primary.main',
                                    mb: 2
                                }}
                            >
                                <BillingDetailsIcon sx={{ mr: 2 }} />
                                Billing Details
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                This is actionable by the Billing managers, and the inputs here are passed on to Retail Accounting
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Administrative Cost"
                                        type="number"
                                        value={inputs.administrativeCost}
                                        onChange={handleInputChange('administrativeCost')}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Inspection Cost"
                                        type="number"
                                        value={inputs.inspectionCost}
                                        onChange={handleInputChange('inspectionCost')}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Handling Cost"
                                        type="number"
                                        value={inputs.handlingCost}
                                        onChange={handleInputChange('handlingCost')}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Discount (%)"
                                        type="number"
                                        value={inputs.discountPercentage}
                                        onChange={handleInputChange('discountPercentage')}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3, textAlign: 'right' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleGenerateInvoice}
                                    disabled={
                                        inputs.administrativeCost === 0 &&
                                        inputs.inspectionCost === 0 &&
                                        inputs.handlingCost === 0
                                    }
                                >
                                    Generate Invoice
                                </Button>
                            </Box>
                        </Box>

                        {/* Live Invoice Display */}
                        <Box sx={{ width: '50%', p: 3 }}>
                            <LiveInvoiceDisplay data={inputs} />
                        </Box>
                    </Box>
                );
            case 'list':
                return (
                    <InvoicesList
                        invoices={invoices}
                        onViewDetails={handleViewDetails}
                    />
                );
            case 'details':
                return selectedInvoice ? (
                    <InvoiceDetailsView
                        invoice={selectedInvoice}
                        onBack={() => setView('list')}
                        onEdit={() => {
                            // Prepare for editing - reset inputs with selected invoice data
                            setInputs({
                                administrativeCost: selectedInvoice.administrativeCost,
                                inspectionCost: selectedInvoice.inspectionCost,
                                handlingCost: selectedInvoice.handlingCost,
                                discountPercentage: selectedInvoice.discountPercentage
                            });
                            setView('input');
                        }}
                    />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper
                variant="outlined"
                sx={{
                    flexGrow: 1,
                    borderRadius: 2,
                }}
            >
                {renderContent()}
            </Paper>
        </Box>
    );
};



export default BillingDetails;