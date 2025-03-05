import { StepDefinition } from './giveback-types';

// Predefined step names with descriptions and base costs
export const StepNames: StepDefinition[] = [
    {
        name: 'Initial Assessment',
        description: 'Conduct a comprehensive initial evaluation of the items to be returned and determine the return process.',
        baseCost: 50
    },
    {
        name: 'Item Preparation',
        description: 'Carefully clean, sort, and prepare items for return shipment.',
        baseCost: 75
    },
    {
        name: 'Packaging',
        description: 'Securely package items with appropriate protective materials to prevent damage during transit.',
        baseCost: 120
    },
    {
        name: 'Documentation',
        description: 'Prepare return shipping labels, packing slips, and any required return authorization documents.',
        baseCost: 90
    },
    {
        name: 'Shipping Arrangement',
        description: 'Coordinate and book return shipping, select appropriate carrier and shipping method.',
        baseCost: 65
    },
    {
        name: 'Tracking and Confirmation',
        description: 'Monitor return shipment and confirm receipt at the destination.',
        baseCost: 30
    }
];