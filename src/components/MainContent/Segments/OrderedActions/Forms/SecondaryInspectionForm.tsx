import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  Chip,
  Paper,
  Divider,
  Stack,
  Autocomplete,
} from '@mui/material';

// Interface for the form data
interface SecondaryInspectionFormData {
  inspectionType: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
  inspectorId: string;
  deadline: string; // Changed from Date to string
  additionalTests: string[];
  notes: string;
  attachments: File[];
}

// Interface for the form props
interface SecondaryInspectionFormProps {
  onFormChange: (data: SecondaryInspectionFormData) => void;
  initialData?: Partial<SecondaryInspectionFormData>;
}

// Mock data for the dropdowns
const mockInspectionTypes = [
  'Quality Check',
  'Safety Verification',
  'Compliance Check',
  'Damage Assessment',
  'Functionality Test',
];

const mockAdditionalTests = [
  'Material Analysis',
  'Stress Test',
  'Chemical Analysis',
  'Dimensional Check',
  'Electrical Safety',
  'Performance Test',
  'Durability Test',
  'Visual Inspection',
  'Weight Verification',
  'Assembly Check',
];

const mockInspectors = [
  { id: 'insp-1', name: 'David Johnson - Quality Control' },
  { id: 'insp-2', name: 'Lisa Chen - Safety Expert' },
  { id: 'insp-3', name: 'Mark Williams - Technical Specialist' },
  { id: 'insp-4', name: 'Sarah Rodriguez - Compliance Officer' },
];

// Helper for getting today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const SecondaryInspectionForm: React.FC<SecondaryInspectionFormProps> = ({
  onFormChange,
  initialData = {},
}) => {
  // Initialize form with default values or provided initial data
  const [formData, setFormData] = useState<SecondaryInspectionFormData>({
    inspectionType: initialData.inspectionType || '',
    reason: initialData.reason || '',
    priority: initialData.priority || 'medium',
    inspectorId: initialData.inspectorId || '',
    deadline: initialData.deadline || getTodayString(),
    additionalTests: initialData.additionalTests || [],
    notes: initialData.notes || '',
    attachments: initialData.attachments || [],
  });

  // Validation state
  const [errors, setErrors] = useState<Partial<Record<keyof SecondaryInspectionFormData, string>>>(
    {}
  );

  // Handle form field changes
  const handleChange = (field: keyof SecondaryInspectionFormData, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }

    // Notify parent component
    onFormChange(updatedData);

    // Validate field
    validateField(field, value);
  };

  // Validate a single field
  const validateField = (field: keyof SecondaryInspectionFormData, value: any) => {
    let errorMessage = '';

    switch (field) {
      case 'inspectionType':
        if (!value) {
          errorMessage = 'Inspection type is required';
        }
        break;

      case 'reason':
        if (!value || value.trim().length < 10) {
          errorMessage = 'Reason should be at least 10 characters';
        }
        break;

      case 'inspectorId':
        if (!value) {
          errorMessage = 'Inspector is required';
        }
        break;

      case 'deadline':
        if (!value) {
          errorMessage = 'Deadline is required';
        } else {
          const today = getTodayString();

          if (value < today) {
            errorMessage = 'Deadline cannot be in the past';
          }
        }
        break;
    }

    if (errorMessage) {
      setErrors({ ...errors, [field]: errorMessage });
    }
  };

  // Handle file uploads
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      handleChange('attachments', [...formData.attachments, ...fileList]);
    }
  };

  // Remove an uploaded file
  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = formData.attachments.filter((file) => file !== fileToRemove);
    handleChange('attachments', updatedFiles);
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={3}>
        {/* Basic Information Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Inspection Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.inspectionType} required>
            <InputLabel>Inspection Type</InputLabel>
            <Select
              value={formData.inspectionType}
              label="Inspection Type"
              onChange={(e) => handleChange('inspectionType', e.target.value)}
            >
              {mockInspectionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.inspectionType && <FormHelperText>{errors.inspectionType}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" required>
            <Typography variant="subtitle2" gutterBottom>
              Priority
            </Typography>
            <RadioGroup
              row
              value={formData.priority}
              onChange={(e) =>
                handleChange('priority', e.target.value as 'low' | 'medium' | 'high')
              }
            >
              <FormControlLabel
                value="low"
                control={<Radio color="success" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label="Low"
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ mr: 0.5 }}
                    />
                    <Typography variant="body2">Standard</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="medium"
                control={<Radio color="warning" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label="Medium"
                      size="small"
                      color="warning"
                      variant="outlined"
                      sx={{ mr: 0.5 }}
                    />
                    <Typography variant="body2">Expedited</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="high"
                control={<Radio color="error" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label="High"
                      size="small"
                      color="error"
                      variant="outlined"
                      sx={{ mr: 0.5 }}
                    />
                    <Typography variant="body2">Urgent</Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reason for Secondary Inspection"
            multiline
            rows={3}
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            error={!!errors.reason}
            helperText={errors.reason || 'Describe why this item requires a secondary inspection'}
            required
          />
        </Grid>

        {/* Assignment Section */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Assignment Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.inspectorId} required>
            <InputLabel>Assign Inspector</InputLabel>
            <Select
              value={formData.inspectorId}
              label="Assign Inspector"
              onChange={(e) => handleChange('inspectorId', e.target.value)}
            >
              {mockInspectors.map((inspector) => (
                <MenuItem key={inspector.id} value={inspector.id}>
                  {inspector.name}
                </MenuItem>
              ))}
            </Select>
            {errors.inspectorId && <FormHelperText>{errors.inspectorId}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            error={!!errors.deadline}
            helperText={errors.deadline}
            required
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: getTodayString(),
            }}
          />
        </Grid>

        {/* Test Requirements Section */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Test Requirements
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={mockAdditionalTests}
            value={formData.additionalTests}
            onChange={(_, newValue) => handleChange('additionalTests', newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Additional Tests Required"
                placeholder="Select additional tests"
                fullWidth
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} sx={{ m: 0.5 }} />
              ))
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes for Inspector"
            multiline
            rows={2}
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Any special instructions or requirements for the inspector"
          />
        </Grid>

        {/* Attachments Section */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Reference Materials
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              backgroundColor: 'background.default',
              cursor: 'pointer',
            }}
            onClick={() => document.getElementById('file-upload-inspection')?.click()}
          >
            <input
              id="file-upload-inspection"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Typography variant="body1" gutterBottom>
              Upload reference materials or documentation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Attach inspection guidelines, previous reports, or relevant documentation
            </Typography>
          </Box>
        </Grid>

        {formData.attachments.length > 0 && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Uploaded Files ({formData.attachments.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.attachments.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name}
                    onDelete={() => handleRemoveFile(file)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SecondaryInspectionForm;
