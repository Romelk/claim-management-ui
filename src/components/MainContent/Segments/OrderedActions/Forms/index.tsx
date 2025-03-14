import ReworkForm from './ReworkForm';
import SecondaryInspectionForm from './SecondaryInspectionForm';
import GivebackForm from './Giveback/GivebackForm';

// Export all form components
export {
  ReworkForm,
  SecondaryInspectionForm,
  GivebackForm,
  // Add other form components as they are created
};

// Define shared types that can be used across form components
export type ActionFormProps<T> = {
  onFormChange: (data: T) => void;
  initialData?: Partial<T>;
};

// Define shared interfaces
export interface BaseFormData {
  deadline: string;
  attachments: File[];
}

export interface ReworkFormData extends BaseFormData {
  quantity: number;
  reworkType: string;
  reworkLocationId: string;
  assignedTo: string[];
  description: string;
  trackShipping: boolean;
  notifyCustomer: boolean;
  additionalInstructions: string;
}

export interface SecondaryInspectionFormData extends BaseFormData {
  inspectionType: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
  inspectorId: string;
  additionalTests: string[];
  notes: string;
}

export interface GivebackFormData extends BaseFormData {
  quantity: number;
  destination: string;
  reason: string;
  shippingMethod: string;
  assignedTo: string[];
  trackShipping: boolean;
  additionalInstructions: string;
}

// Helper function for date handling
export const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Export a mapping of action types to their respective form components
// This can be used for dynamic form rendering
export const ActionForms = {
  rework: ReworkForm,
  'secondary-inspection': SecondaryInspectionForm,
  'give-back': GivebackForm,
  // Add other mappings as forms are created
};

export default {
  ReworkForm,
  SecondaryInspectionForm,
  GivebackForm,
};