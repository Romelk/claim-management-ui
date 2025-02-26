import { ReworkStep } from './rework-types';

// Calculate total cost of all steps
export const calculateTotalCost = (steps: ReworkStep[]): number =>
    steps.reduce((total, step) => total + step.stepCost, 0);

// Calculate step cost based on base cost and quantity
export const calculateStepCost = (baseCost: number, quantity: number): number =>
    baseCost * quantity;

// Format cost in Euros
export const formatCurrency = (amount: number): string =>
    amount.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
    });