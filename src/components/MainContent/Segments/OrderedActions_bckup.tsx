// src/components/MainContent/Segments/OrderedActions.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Divider, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Add as AddIcon, 
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Sample action data
const actionData = [
  {
    id: 1,
    type: 'Rework',
    status: 'Completed',
    assignedTo: 'John Smith',
    dueDate: '25 Feb 2025',
    priority: 'High',
    cost: 'EUR 300',
    notes: 'Package inspection completed. Found issues with labeling.'
  },
  {
    id: 2,
    type: 'Secondary Inspection',
    status: 'In Progress',
    assignedTo: 'Mary Johnson',
    dueDate: '26 Feb 2025',
    priority: 'Medium',
    notes: 'Processing return for damaged item.'
  },
  {
    id: 3,
    type: 'On-Stock',
    status: 'Pending',
    assignedTo: 'Robert Davis',
    dueDate: '28 Feb 2025',
    priority: 'Low',
    notes: 'Awaiting approval for refund issuance.'
  }
];

const OrderedActions = () => {
  const [expandedAction, setExpandedAction] = useState<number | false>(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleActionExpand = (actionId: number) => {
    setExpandedAction(expandedAction === actionId ? false : actionId);
  };

  // Status chip color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Priority indicator component
  const PriorityIndicator = ({ priority }: { priority: string }) => {
    const color = 
      priority === 'High' ? '#d32f2f' :
      priority === 'Medium' ? '#f57c00' : 
      '#4caf50';
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ 
          width: 12, 
          height: 12, 
          borderRadius: '50%', 
          bgcolor: color,
          mr: 1 
        }} />
        <Typography variant="body2">{priority}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Ordered Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="text" 
            startIcon={<FilterIcon />}
            size="small"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Filter
          </Button>
          <Button 
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            color="primary"
          >
            Add Action
          </Button>
        </Box>
      </Box>
      
      {/* Filter section */}
      {filterOpen && (
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <TextField
            select
            label="Status"
            size="small"
            sx={{ width: 150 }}
            defaultValue=""
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
          
          <TextField
            select
            label="Priority"
            size="small"
            sx={{ width: 150 }}
            defaultValue=""
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
          
          <TextField
            select
            label="Type"
            size="small"
            sx={{ width: 150 }}
            defaultValue=""
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Inspection">Inspection</MenuItem>
            <MenuItem value="Return Processing">Return Processing</MenuItem>
            <MenuItem value="Refund">Refund</MenuItem>
          </TextField>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel 
              control={<Switch size="small" />} 
              label="Show completed" 
            />
          </Box>
          
          <Box sx={{ ml: 'auto' }}>
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ mr: 1 }}
            >
              Reset
            </Button>
            <Button 
              variant="contained" 
              size="small"
            >
              Apply
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Search bar */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <TextField
          placeholder="Search actions..."
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          }}
        />
      </Box>
      
      {/* Actions list */}
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        bgcolor: 'background.default',
        p: 2
      }}>
        {actionData.map((action) => (
          <Paper 
            key={action.id} 
            sx={{ 
              mb: 2, 
              overflow: 'hidden',
              border: expandedAction === action.id ? '1px solid' : 'none',
              borderColor: 'primary.main'
            }}
            elevation={expandedAction === action.id ? 0 : 1}
          >
            {/* Action Summary */}
            <Box 
              sx={{ 
                p: 2, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => handleActionExpand(action.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {action.status === 'Completed' ? 
                  <CheckCircleIcon sx={{ color: 'success.main', mr: 1.5 }} /> : 
                  <RadioButtonUncheckedIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                }
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {action.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due: {action.dueDate}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  label={action.status} 
                  size="small"
                  color={getStatusColor(action.status) as any}
                  sx={{ minWidth: 100, textAlign: 'center' }}
                />
                <PriorityIndicator priority={action.priority} />
                <IconButton 
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActionExpand(action.id);
                  }}
                >
                  <ExpandMoreIcon 
                    sx={{
                      transform: expandedAction === action.id ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s'
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
            
            {/* Expanded Details */}
            {expandedAction === action.id && (
              <Box sx={{ p: 2, bgcolor: 'background.default', borderTop: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Assigned To
                    </Typography>
                    <Typography variant="body2">
                      {action.assignedTo}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Due Date
                    </Typography>
                    <Typography variant="body2">
                      {action.dueDate}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Priority
                    </Typography>
                    <Typography variant="body2">
                      {action.priority}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Total Cost Due
                    </Typography>
                    <Typography variant="body2">
                      {action.cost}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body2">
                      {action.status}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Notes
                  </Typography>
                  <Typography variant="body2">
                    {action.notes}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  {action.status !== 'Completed' && (
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                    >
                      Mark Complete
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        ))}
        
        {/* Empty state if no actions */}
        {actionData.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 4
          }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              No actions found
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              color="primary"
              sx={{ mt: 1 }}
            >
              Add Action
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default OrderedActions;
