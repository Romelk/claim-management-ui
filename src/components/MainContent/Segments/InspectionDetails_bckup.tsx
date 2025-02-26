// src/components/MainContent/Segments/InspectionDetails.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Sample data
const initialInspectionData = {
  summary: {
    totalDelivery: 300,
    sampleSize: 8,
    inspectedItems: 10
  },
  defects: [
    "Manufacturer labelling (type designation / care label)",
    "Foreign brand"
  ],
  faultCodes: [
    { code: "1630 (Q)", description: "Manufacturer's marking missing" }
  ],
  notes: ["Fault in markings"]
};

const availableFaultCodes = [
  { code: "1630 (Q)", description: "Manufacturer's marking missing" },
  { code: "1631 (Q)", description: "Manufacturer's marking incomplete" },
  { code: "1632 (Q)", description: "Manufacturer's marking incorrect" },
  { code: "1750 (Q)", description: "Foreign brand identification" },
  { code: "2100 (Q)", description: "Missing care label" }
];

const InspectionDetails = () => {
  const [inspectionData, setInspectionData] = useState(initialInspectionData);
  const [editing, setEditing] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<any>({});
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<string>('');
  const [newFaultCode, setNewFaultCode] = useState<string>('');

  // Handler for starting edit mode
  const handleEditStart = (section: string) => {
    setEditing(section);
    if (section === 'summary') {
      setTempValues({...inspectionData.summary});
    }
  };

  // Handler for saving changes
  const handleSave = () => {
    if (editing === 'summary') {
      setInspectionData({
        ...inspectionData,
        summary: {...tempValues}
      });
    }
    setEditing(null);
    setTempValues({});
  };

  // Handler for canceling edit
  const handleCancel = () => {
    setEditing(null);
    setTempValues({});
  };

  // Handler for updating temp values
  const handleTempValueChange = (field: string, value: any) => {
    setTempValues({
      ...tempValues,
      [field]: value
    });
  };

  // Handler for opening add dialog
  const handleAddDialogOpen = (type: string) => {
    setOpenDialog(type);
    setNewValue('');
    setNewFaultCode('');
  };

  // Handler for closing add dialog
  const handleAddDialogClose = () => {
    setOpenDialog(null);
    setNewValue('');
    setNewFaultCode('');
  };

  // Handler for adding new item
  const handleAddItem = () => {
    if (openDialog === 'defect' && newValue.trim()) {
      setInspectionData({
        ...inspectionData,
        defects: [...inspectionData.defects, newValue.trim()]
      });
    } else if (openDialog === 'note' && newValue.trim()) {
      setInspectionData({
        ...inspectionData,
        notes: [...inspectionData.notes, newValue.trim()]
      });
    } else if (openDialog === 'faultCode' && newFaultCode) {
      const selectedFault = availableFaultCodes.find(fc => fc.code === newFaultCode);
      if (selectedFault) {
        setInspectionData({
          ...inspectionData,
          faultCodes: [...inspectionData.faultCodes, selectedFault]
        });
      }
    }
    handleAddDialogClose();
  };

  // Handler for deleting an item
  const handleDeleteItem = (type: string, index: number) => {
    if (type === 'defect') {
      const updatedDefects = [...inspectionData.defects];
      updatedDefects.splice(index, 1);
      setInspectionData({
        ...inspectionData,
        defects: updatedDefects
      });
    } else if (type === 'note') {
      const updatedNotes = [...inspectionData.notes];
      updatedNotes.splice(index, 1);
      setInspectionData({
        ...inspectionData,
        notes: updatedNotes
      });
    } else if (type === 'faultCode') {
      const updatedFaultCodes = [...inspectionData.faultCodes];
      updatedFaultCodes.splice(index, 1);
      setInspectionData({
        ...inspectionData,
        faultCodes: updatedFaultCodes
      });
    }
  };

  return (
    <>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Inspection Details
        </Typography>
        {editing ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" color="primary" onClick={handleSave}>
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleCancel}>
              <CancelIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Tooltip title="Edit Inspection Details">
            <IconButton size="small" onClick={() => handleEditStart('summary')}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box sx={{ p: 0 }}>
        {/* Summary Section */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Summary
          </Typography>
          
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                  <Typography variant="body2">Total delivery quantity</Typography>
                </TableCell>
                <TableCell sx={{ border: 'none', py: 0.5 }}>
                  {editing === 'summary' ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={tempValues.totalDelivery}
                      onChange={(e) => handleTempValueChange('totalDelivery', parseInt(e.target.value) || 0)}
                      sx={{ width: 80 }}
                    />
                  ) : (
                    <Typography variant="body2" fontWeight="medium">
                      {inspectionData.summary.totalDelivery}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                  <Typography variant="body2">Sample size</Typography>
                </TableCell>
                <TableCell sx={{ border: 'none', py: 0.5 }}>
                  {editing === 'summary' ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={tempValues.sampleSize}
                      onChange={(e) => handleTempValueChange('sampleSize', parseInt(e.target.value) || 0)}
                      sx={{ width: 80 }}
                    />
                  ) : (
                    <Typography variant="body2" fontWeight="medium">
                      {inspectionData.summary.sampleSize}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: 'none', py: 0.5, pl: 0 }}>
                  <Typography variant="body2">Total inspected items</Typography>
                </TableCell>
                <TableCell sx={{ border: 'none', py: 0.5 }}>
                  {editing === 'summary' ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      type="number"
                      value={tempValues.inspectedItems}
                      onChange={(e) => handleTempValueChange('inspectedItems', parseInt(e.target.value) || 0)}
                      sx={{ width: 80 }}
                    />
                  ) : (
                    <Typography variant="body2" fontWeight="medium">
                      {inspectionData.summary.inspectedItems}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        
        {/* Inspection Issues Accordion */}
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 2, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Typography variant="body2" fontWeight="medium">
              Inspection Issues
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            {/* Defects */}
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Defects
                </Typography>
                <Button 
                  startIcon={<AddIcon />} 
                  size="small" 
                  onClick={() => handleAddDialogOpen('defect')}
                >
                  Add
                </Button>
              </Box>
              
              {inspectionData.defects.length > 0 ? (
                inspectionData.defects.map((defect, index) => (
                  <Box key={index} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {defect}
                    </Typography>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteItem('defect', index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No defects listed
                </Typography>
              )}
            </Box>
            
            {/* Fault Codes */}
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Fault codes
                </Typography>
                <Button 
                  startIcon={<AddIcon />} 
                  size="small"
                  onClick={() => handleAddDialogOpen('faultCode')}
                >
                  Add
                </Button>
              </Box>
              
              {inspectionData.faultCodes.length > 0 ? (
                inspectionData.faultCodes.map((fault, index) => (
                  <Box key={index} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {fault.code}
                      </Typography>
                      <Typography variant="body2">
                        {fault.description}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteItem('faultCode', index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No fault codes listed
                </Typography>
              )}
            </Box>
            
            {/* Notes */}
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Notes
                </Typography>
                <Button 
                  startIcon={<AddIcon />} 
                  size="small"
                  onClick={() => handleAddDialogOpen('note')}
                >
                  Add
                </Button>
              </Box>
              
              {inspectionData.notes.length > 0 ? (
                inspectionData.notes.map((note, index) => (
                  <Box key={index} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {note}
                    </Typography>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteItem('note', index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No notes listed
                </Typography>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Add Defect Dialog */}
      <Dialog open={openDialog === 'defect'} onClose={handleAddDialogClose}>
        <DialogTitle>Add Defect</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Defect Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button 
            onClick={handleAddItem} 
            variant="contained" 
            disabled={!newValue.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={openDialog === 'note'} onClose={handleAddDialogClose}>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            variant="outlined"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button 
            onClick={handleAddItem} 
            variant="contained" 
            disabled={!newValue.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Fault Code Dialog */}
      <Dialog open={openDialog === 'faultCode'} onClose={handleAddDialogClose}>
        <DialogTitle>Add Fault Code</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="fault-code-select-label">Fault Code</InputLabel>
            <Select
              labelId="fault-code-select-label"
              value={newFaultCode}
              label="Fault Code"
              onChange={(e) => setNewFaultCode(e.target.value)}
            >
              {availableFaultCodes.map((fault) => (
                <MenuItem key={fault.code} value={fault.code}>
                  {fault.code} - {fault.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button 
            onClick={handleAddItem} 
            variant="contained" 
            disabled={!newFaultCode}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InspectionDetails;
