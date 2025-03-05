// Export the OnStockForm component
export { default } from './OnStockForm';

// Export types if needed
export enum PartyType {
    Partner = 'Partner',
    Supplier = 'Supplier'
}

export interface OnStockFormData {
    quantity: number;
    invoiceDiscountPercent: number;
    responsibleParty: PartyType;
    notes: string;
}