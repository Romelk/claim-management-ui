// Explicitly declare all types
export type StepDefinition = {
    name: string;
    description: string;
    baseCost: number;
};

export type GivebackStep = {
    id: string;
    name: string;
    quantity: number;
    payingParty: PartyType;
    responsibleParty: PartyType;
    stepCost: number;
};

export type GivebackFormData = {
    globalNote: string;
    givebackSteps: GivebackStep[];
    totalCost: number;
};

export type GivebackFormProps = {
    onFormChange: (data: GivebackFormData) => void;
    initialData?: Partial<GivebackFormData>;
};

// Enum for party types
export enum PartyType {
    Partner = 'Partner',
    Supplier = 'Supplier'
}