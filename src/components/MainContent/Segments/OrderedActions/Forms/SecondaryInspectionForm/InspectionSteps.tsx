import { InspectionStep } from './index';

// Available inspection steps data
export const availableInspectionSteps: InspectionStep[] = [
    {
        id: 'visual-inspection',
        name: 'Visual Inspection',
        description: 'Basic visual examination for obvious defects and quality issues'
    },
    {
        id: 'dimensional-check',
        name: 'Dimensional Check',
        description: 'Verification of dimensions against specifications'
    },
    {
        id: 'functionality-test',
        name: 'Functionality Test',
        description: 'Testing the item\'s operational functionality'
    },
    {
        id: 'safety-compliance',
        name: 'Safety Compliance',
        description: 'Checking compliance with safety regulations and standards'
    },
    {
        id: 'material-verification',
        name: 'Material Verification',
        description: 'Verification of material composition and quality'
    },
    {
        id: 'stress-test',
        name: 'Stress Test',
        description: 'Testing the item under stress conditions to verify durability'
    },
    {
        id: 'packaging-check',
        name: 'Packaging Check',
        description: 'Inspection of packaging quality and adequacy'
    },
    {
        id: 'component-verification',
        name: 'Component Verification',
        description: 'Detailed inspection of individual components'
    },
    {
        id: 'documentation-review',
        name: 'Documentation Review',
        description: 'Review of technical documentation and certificates'
    },
    {
        id: 'environmental-test',
        name: 'Environmental Test',
        description: 'Testing performance under different environmental conditions'
    }
];

// Helper function to find an inspection step by ID
export const getStepById = (id: string): InspectionStep | undefined => {
    return availableInspectionSteps.find(step => step.id === id);
};

// Helper function to check if a step is already selected
export const isStepSelected = (step: InspectionStep, selectedSteps: InspectionStep[]): boolean => {
    return selectedSteps.some(selected => selected.id === step.id);
};