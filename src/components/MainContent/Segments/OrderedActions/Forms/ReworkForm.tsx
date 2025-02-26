import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Chip,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';

// Enum for party types
enum PartyType {
  Partner = 'Partner',
  Supplier = 'Supplier'
}

// Step definition with description
interface StepDefinition {
  name: string;
  description: string;
}

// Predefined step names with descriptions
const StepNames: StepDefinition[] = [
  {
    name: 'Initial Assessment',
    description: 'Conduct a comprehensive initial evaluation of the item to identify primary issues and determine the scope of rework needed.'
  },
  {
    name: 'Detailed Inspection',
    description: 'Perform an in-depth, systematic examination to uncover all potential defects, damages, or areas requiring specific attention.'
  },
  {
    name: 'Component Replacement',
    description: 'Identify and replace worn-out, damaged, or malfunctioning components with new or refurbished parts to restore functionality.'
  },
  {
    name: 'Recalibration',
    description: 'Adjust and fine-tune the item to ensure it meets original manufacturer specifications and optimal performance standards.'
  },
  {
    name: 'Final Quality Check',
    description: 'Conduct a comprehensive final inspection to verify that all rework meets quality standards and the item functions as expected.'
  }
];

// Interface for a single rework step
interface ReworkStep {
  id: string;
  name: string;
  quantity: number;
  payingParty: PartyType;
  responsibleParty: PartyType;
}

// Interface for the form data
interface ReworkFormData {
  globalNote: string;
  reworkSteps: ReworkStep[];
}

// Interface for the form props
interface ReworkFormProps {
  onFormChange: (data: ReworkFormData) => void;
  initialData?: Partial<ReworkFormData>;
}

const ReworkForm: React.FC<ReworkFormProps> = ({ onFormChange, initialData = {} }) => {
  // State for steps
  const [reworkSteps, setReworkSteps] = useState<ReworkStep[]>(
      initialData.reworkSteps || []
  );

  // State for new step form
  const [newStep, setNewStep] = useState<Partial<ReworkStep>>({
    name: '',
    quantity: 1,
    payingParty: PartyType.Supplier,
    responsibleParty: PartyType.Supplier
  });

  // State for step description
  const [stepDescription, setStepDescription] = useState<string>('');

  // State to track if we're editing an existing step
  const [editingStepId, setEditingStepId] = useState<string | null>(null);

  // State for global note
  const [globalNote, setGlobalNote] = useState(initialData.globalNote || '');

  // Handle global note change
  const handleGlobalNoteChange = (note: string) => {
    setGlobalNote(note);
    onFormChange({
      globalNote: note,
      reworkSteps
    });
  };

  // Handle step name selection
  const handleStepNameChange = (stepName: string) => {
    const selectedStep = StepNames.find(step => step.name === stepName);
    setNewStep(prev => ({
      ...prev,
      name: stepName
    }));
    setStepDescription(selectedStep ? selectedStep.description : '');
  };

  // Add or update a step
  const handleSaveStep = () => {
    // Validate step before adding/updating
    if (!newStep.name || !newStep.quantity) return;

    if (editingStepId) {
      // Update existing step
      const updatedSteps = reworkSteps.map(step =>
          step.id === editingStepId
              ? {
                id: step.id,
                name: newStep.name!,
                quantity: newStep.quantity!,
                payingParty: newStep.payingParty!,
                responsibleParty: newStep.responsibleParty!
              }
              : step
      );

      setReworkSteps(updatedSteps);
      onFormChange({ globalNote, reworkSteps: updatedSteps });

      // Reset editing state
      setEditingStepId(null);
    } else {
      // Add new step
      const stepToAdd: ReworkStep = {
        id: `step-${Date.now()}`,
        name: newStep.name!,
        quantity: newStep.quantity!,
        payingParty: newStep.payingParty!,
        responsibleParty: newStep.responsibleParty!
      };

      const updatedSteps = [...reworkSteps, stepToAdd];
      setReworkSteps(updatedSteps);
      onFormChange({ globalNote, reworkSteps: updatedSteps });
    }

    // Reset new step form
    setNewStep({
      name: '',
      quantity: 1,
      payingParty: PartyType.Supplier,
      responsibleParty: PartyType.Supplier
    });

    // Clear description
    setStepDescription('');
  };

  // Prepare step for editing
  const handleEditStep = (step: ReworkStep) => {
    setEditingStepId(step.id);
    setNewStep({
      name: step.name,
      quantity: step.quantity,
      payingParty: step.payingParty,
      responsibleParty: step.responsibleParty
    });

    // Set description for editing step
    const selectedStep = StepNames.find(s => s.name === step.name);
    setStepDescription(selectedStep ? selectedStep.description : '');
  };

  // Remove a step
  const handleRemoveStep = (stepId: string) => {
    const updatedSteps = reworkSteps.filter(step => step.id !== stepId);
    setReworkSteps(updatedSteps);

    // Notify parent component
    onFormChange({
      globalNote,
      reworkSteps: updatedSteps
    });
  };

  return (
      <Box>
        {/* Steps Section */}
        <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 3,
              borderColor: 'divider',
              backgroundColor: 'background.default'
            }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Rework Steps
          </Typography>

          {/* New Step Input Form */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" sx={{ mb: 1 }}>Step Name</Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <Select
                    value={newStep.name || ''}
                    displayEmpty
                    renderValue={(selected) =>
                        selected ? selected : <em>Select Step Name</em>
                    }
                    onChange={(e) => handleStepNameChange(e.target.value)}
                >
                  <MenuItem disabled value="">
                    <em>Select Step Name</em>
                  </MenuItem>
                  {StepNames.map((step) => (
                      <MenuItem key={step.name} value={step.name}>
                        {step.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {stepDescription && (
                  <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        p: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1
                      }}
                  >
                    {stepDescription}
                  </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="body2" sx={{ mb: 1 }}>Quantity</Typography>
              <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  size="small"
                  value={newStep.quantity}
                  onChange={(e) => setNewStep(prev => ({
                    ...prev,
                    quantity: parseInt(e.target.value) || 1
                  }))}
                  InputProps={{
                    inputProps: { min: 1 }
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" sx={{ mb: 1 }}>Paying Party</Typography>
              <ToggleButtonGroup
                  color="primary"
                  exclusive
                  fullWidth
                  size="small"
                  value={newStep.payingParty}
                  onChange={(_, value) => value && setNewStep(prev => ({
                    ...prev,
                    payingParty: value
                  }))}
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      borderRadius: '4px',
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText'
                      }
                    }
                  }}
              >
                <ToggleButton value={PartyType.Partner}>
                  Partner
                </ToggleButton>
                <ToggleButton value={PartyType.Supplier}>
                  Supplier
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" sx={{ mb: 1 }}>Responsible Party</Typography>
              <ToggleButtonGroup
                  color="primary"
                  exclusive
                  fullWidth
                  size="small"
                  value={newStep.responsibleParty}
                  onChange={(_, value) => value && setNewStep(prev => ({
                    ...prev,
                    responsibleParty: value
                  }))}
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      borderRadius: '4px',
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText'
                      }
                    }
                  }}
              >
                <ToggleButton value={PartyType.Partner}>
                  Partner
                </ToggleButton>
                <ToggleButton value={PartyType.Supplier}>
                  Supplier
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                pt: 2
              }}>
                <IconButton
                    color="primary"
                    onClick={handleSaveStep}
                    disabled={!newStep.name}
                    sx={{
                      border: '1px solid',
                      borderColor: newStep.name ? 'primary.main' : 'grey.300',
                      width: 40,
                      height: 40,
                      marginTop: '22px',
                      '&.Mui-disabled': {
                        borderColor: 'grey.300',
                        color: 'grey.300'
                      }
                    }}
                >
                  <AddIcon />
                </IconButton>
                {editingStepId && (
                    <IconButton
                        onClick={() => {
                          setEditingStepId(null);
                          setNewStep({
                            name: '',
                            quantity: 1,
                            payingParty: PartyType.Supplier,
                            responsibleParty: PartyType.Supplier
                          });
                          setStepDescription('');
                        }}
                        sx={{
                          ml: 1,
                          marginTop: '22px'
                        }}
                    >
                      <DeleteIcon />
                    </IconButton>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Steps List */}
          {reworkSteps.length === 0 ? (
              <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
              >
                No rework steps added. Use the form above to add steps.
              </Typography>
          ) : (
              <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1
              }}>
                {reworkSteps.map((step, index) => (
                    <Chip
                        key={step.id}
                        label={`Step ${index + 1}: ${step.name} (${step.quantity}) - ${step.payingParty}/${step.responsibleParty}`}
                        color="primary"
                        variant="outlined"
                        sx={{
                          mr: 1,
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        deleteIcon={
                          <>
                            <IconButton
                                size="small"
                                sx={{ mr: 0.5 }}
                                onClick={() => handleEditStep(step)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleRemoveStep(step.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </>
                        }
                        onDelete={() => {}} // Placeholder to enable delete icon area
                    />
                ))}
              </Box>
          )}
        </Paper>

        {/* Global Note Section */}
        <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderColor: 'divider',
              backgroundColor: 'background.default'
            }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Global Rework Order Notes
          </Typography>
          <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Enter global notes for the entire rework order"
              value={globalNote}
              onChange={(e) => handleGlobalNoteChange(e.target.value)}
          />
        </Paper>
      </Box>
  );
};

export default ReworkForm;