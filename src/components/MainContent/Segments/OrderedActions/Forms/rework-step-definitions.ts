import { StepDefinition } from './rework-types';

// Predefined step names with descriptions and base costs
export const StepNames: StepDefinition[] = [
    {
        name: 'Initial Assessment',
        description: 'Conduct a comprehensive initial evaluation of the item to identify primary issues and determine the scope of rework needed.',
        baseCost: 50
    },
    {
        name: 'Disassembly',
        description: 'Carefully disassemble the item into its component parts for detailed inspection and repair.',
        baseCost: 75
    },
    {
        name: 'Component Replacement',
        description: 'Replace damaged or defective components with new or refurbished parts.',
        baseCost: 120
    },
    {
        name: 'Surface Treatment',
        description: 'Apply surface treatments such as cleaning, painting, coating, or polishing to restore appearance.',
        baseCost: 90
    },
    {
        name: 'Quality Testing',
        description: 'Perform comprehensive quality and functionality tests to ensure the item meets required specifications.',
        baseCost: 65
    },
    {
        name: 'Packaging',
        description: 'Properly package the reworked item for safe transport and storage.',
        baseCost: 30
    }
];