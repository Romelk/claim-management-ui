// Explicitly declare all types
export type StepDefinition = {
    name: string;
    description: string;
    baseCost: number;
};

// Basic GivebackStep type
export type GivebackStep = {
    id: string;
    name: string;
    quantity: number;
    payingParty: PartyType;
    responsibleParty: PartyType;
    stepCost: number;
};

// Extended CustomGivebackStep type
export interface CustomGivebackStep extends GivebackStep {
    isCustom: true;
    englishName: string;
    englishDescription: string;
    baseCost: number;
    translations: {
        de: { name: string; description: string; };
        cz: { name: string; description: string; };
        pl: { name: string; description: string; };
    };
}

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