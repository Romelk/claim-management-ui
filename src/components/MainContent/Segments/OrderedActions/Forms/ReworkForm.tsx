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
  Paper,
  Chip,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Divider
} from '@mui/material';

// Interface for the form data
interface ReworkFormData {
  quantity: number;
  reworkType: string;
  reworkLocationId: string;
  deadline: string; // Changed from Date to string
  assignedTo: string[];
  description: string;
  trackShipping: boolean;
  notifyCustomer: boolean;
  attachments: File[];
  additionalInstructions: string;
}

// Interface for the form props
interface ReworkFormProps {
  onFormChange: (data: ReworkFormData) => void;
  initialData?: Partial<ReworkFormData>;
}

// Mock data for dropdowns
const mockReworkTypes = [
  'Repair', 'Replace Parts', 'Clean and Restore', 'Upgrade', 'Reconfigure'
];

const mockLocations = [
  { id: 'loc-1', name: 'Main Warehouse - Berlin' },
  { id: 'loc-2', name: 'Service Center - Hamburg' },
  { id: 'loc-3', name: 'Repair Facility - Munich' },
  { id: 'loc-4', name: 'Supplier Facility - Frankfurt' }
];

const mockAssignees = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Jane Smith' },
  { id: 'user-3', name: 'Michael Johnson' },
  { id: 'user-4', name: 'Sarah Williams' },
  { id: 'user-5', name: 'Robert Brown' }
];

// Helper for getting today's date in YYYY-MM-DD format
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const ReworkForm: React.FC<ReworkFormProps> = ({ onFormChange, initialData = {} }) => {
  // Initialize form with default values or provided initial data
  const [formData, setFormData] = useState<ReworkFormData>({
    quantity: initialData.quantity || 1,
    reworkType: initialData.reworkType || '',
    reworkLocationId: initialData.reworkLocationId || '',
    deadline: initialData.deadline || getTodayString(),
    assignedTo: initialData.assignedTo || [],
    description: initialData.description || '',
    trackShipping: initialData.trackShipping !== undefined ? initialData.trackShipping : true,
    notifyCustomer: initialData.notifyCustomer !== undefined ? initialData.notifyCustomer : false,
    attachments: initialData.attachments || [],
    additionalInstructions: initialData.additionalInstructions || ''
  });

  // Validation state
  const [errors, setErrors] = useState<Partial<Record<keyof ReworkFormData, string>>>({});

  // Handle form field changes
  const handleChange = (field: keyof ReworkFormData, value: any) => {
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
  const validateField = (field: keyof ReworkFormData, value: any) => {
    let errorMessage = '';
    
    switch (field) {
      case 'quantity':
        if (!value || value < 1) {
          errorMessage = 'Quantity must be at least 1';
        }
        break;
        
      case 'reworkType':
        if (!value) {
          errorMessage = 'Rework type is required';
        }
        break;
        
      case 'reworkLocationId':
        if (!value) {
          errorMessage = 'Rework location is required';
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
        
      case 'description':
        if (!value || value.trim().length < 10) {
          errorMessage = 'Description should be at least 10 characters';
        }
        break;
    }
    
    if (errorMessage) {
      setErrors({ ...errors, [field]: errorMessage });
    }
  };

  // Validate the entire form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReworkFormData, string>> = {};
    
    // Check required fields
    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }
    
    if (!formData.reworkType) {
      newErrors.reworkType = 'Rework type is required';
    }
    
    if (!formData.reworkLocationId) {
      newErrors.reworkLocationId = 'Rework location is required';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const today = getTodayString();
      
      if (formData.deadline < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }
    
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Find location name by ID
  const getLocationName = (locationId: string) => {
    const location = mockLocations.find(loc => loc.id === locationId);
    return location ? location.name : '';
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
    const updatedFiles = formData.attachments.filter(file => file !== fileToRemove);
    handleChange('attachments', updatedFiles);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={3}>
        {/* Basic Information Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Basic Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
            error={!!errors.quantity}
            helperText={errors.quantity}
            InputProps={{ inputProps: { min: 1 } }}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.reworkType} required>
            <InputLabel>Rework Type</InputLabel>
            <Select
              value={formData.reworkType}
              label="Rework Type"
              onChange={(e) => handleChange('reworkType', e.target.value)}
            >
              {mockReworkTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
            {errors.reworkType && <FormHelperText>{errors.reworkType}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={!!errors.description}
            helperText={errors.description || 'Describe the rework requirements in detail'}
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
          <FormControl fullWidth error={!!errors.reworkLocationId} required>
            <InputLabel>Rework Location</InputLabel>
            <Select
              value={formData.reworkLocationId}
              label="Rework Location"
              onChange={(e) => handleChange('reworkLocationId', e.target.value)}
            >
              {mockLocations.map((location) => (
                <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
              ))}
            </Select>
            {errors.reworkLocationId && (
              <FormHelperText>{errors.reworkLocationId}</FormHelperText>
            )}
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
              min: getTodayString()
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={mockAssignees}
            getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
            value={formData.assignedTo.map(id => 
              mockAssignees.find(a => a.id === id) || { id, name: id }
            )}
            onChange={(_, newValue) => {
              handleChange('assignedTo', newValue.map(v => typeof v === 'string' ? v : v.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign To"
                placeholder="Select team members"
                fullWidth
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={typeof option === 'string' ? option : option.name}
                  {...getTagProps({ index })}
                  sx={{ m: 0.5 }}
                />
              ))
            }
          />
        </Grid>
        
        {/* Additional Options Section */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Additional Options
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Grid>
        
        <Grid item xs={12}>
          <FormGroup>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.trackShipping}
                    onChange={(e) => handleChange('trackShipping', e.target.checked)}
                  />
                }
                label="Track Shipping"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.notifyCustomer}
                    onChange={(e) => handleChange('notifyCustomer', e.target.checked)}
                  />
                }
                label="Notify Customer"
              />
            </Stack>
          </FormGroup>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional Instructions"
            multiline
            rows={2}
            value={formData.additionalInstructions}
            onChange={(e) => handleChange('additionalInstructions', e.target.value)}
            placeholder="Any special requirements or instructions"
          />
        </Grid>
        
        {/* Attachments Section */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Attachments
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
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Typography variant="body1" gutterBottom>
              Drop files here or click to upload
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supports images, PDFs, and documents (Max 10MB each)
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

export default ReworkForm;
