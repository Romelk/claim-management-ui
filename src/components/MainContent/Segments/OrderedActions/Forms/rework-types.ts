// Enum for party types
export enum PartyType {
    Partner = 'Partner',
    Supplier = 'Supplier'
}

// Step definition with description and cost
export interface StepDefinition {
    name: string;
    description: string;
    baseCost: number;
}

// Interface for a single rework step
export interface ReworkStep {
    id: string;
    name: string;
    quantity: number;
    payingParty: PartyType;
    responsibleParty: PartyType;
    stepCost: number;
}

// Interface for the form data
export interface ReworkFormData {
    globalNote: string;
    reworkSteps: ReworkStep[];
    totalCost: number;
}

// Interface for the form props
export interface ReworkFormProps {
    onFormChange: (data: ReworkFormData) => void;
    initialData?: Partial<ReworkFormData>;
}