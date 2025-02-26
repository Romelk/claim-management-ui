import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Build as ReworkIcon,
  Search as InspectionIcon,
  KeyboardReturn as GiveBackIcon,
  Delete as ScrapIcon,
  Storefront as SellingIcon,
  Inventory as StockIcon,
  Add as AddIcon,
  ArrowBack as BackIcon,
  Close as CloseIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

// Import Form Components
import { ReworkForm, SecondaryInspectionForm } from './OrderedActions/Forms';

// Action type definitions
type ActionType =
  | 'rework'
  | 'secondary-inspection'
  | 'give-back'
  | 'scrap'
  | '3p-selling'
  | 'on-stock';

// Interface for the action data
interface ActionData {
  id: string;
  type: ActionType;
  title: string;
  status: 'draft' | 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  formData: any; // This will hold the specific form data
}

// Interface for the action card config
interface ActionCard {
  type: ActionType;
  title: string;
  description: string;
  iconElement: React.ReactElement;
  color: string;
}

// Define the action cards with their metadata
const actionCards: ActionCard[] = [
  {
    type: 'rework',
    title: 'Rework',
    description: 'Send the item for rework to fix defects or improve quality',
    iconElement: <ReworkIcon fontSize="large" />,
    color: '#2196f3', // Blue
  },
  {
    type: 'secondary-inspection',
    title: 'Secondary Inspection',
    description: 'Request another detailed inspection to verify issues',
    iconElement: <InspectionIcon fontSize="large" />,
    color: '#9c27b0', // Purple
  },
  {
    type: 'give-back',
    title: 'Give Back',
    description: 'Return the item to the customer or supplier',
    iconElement: <GiveBackIcon fontSize="large" />,
    color: '#ff9800', // Orange
  },
  {
    type: 'scrap',
    title: 'Scrap',
    description: 'Dispose of the item as it cannot be salvaged',
    iconElement: <ScrapIcon fontSize="large" />,
    color: '#f44336', // Red
  },
  {
    type: '3p-selling',
    title: '3P Selling',
    description: 'Sell the item through a third-party marketplace',
    iconElement: <SellingIcon fontSize="large" />,
    color: '#4caf50', // Green
  },
  {
    type: 'on-stock',
    title: 'On-Stock',
    description: 'Keep the item in inventory for future use',
    iconElement: <StockIcon fontSize="large" />,
    color: '#795548', // Brown
  },
];

// Get small icon based on action type
const getSmallIcon = (type: ActionType) => {
  switch (type) {
    case 'rework':
      return <ReworkIcon fontSize="small" />;
    case 'secondary-inspection':
      return <InspectionIcon fontSize="small" />;
    case 'give-back':
      return <GiveBackIcon fontSize="small" />;
    case 'scrap':
      return <ScrapIcon fontSize="small" />;
    case '3p-selling':
      return <SellingIcon fontSize="small" />;
    case 'on-stock':
      return <StockIcon fontSize="small" />;
    default:
      return <AddIcon fontSize="small" />;
  }
};

// Slide transition for dialogs
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OrderedActions: React.FC = () => {
  // State to track created actions
  const [actions, setActions] = useState<ActionData[]>([]);

  // State for action selection mode
  const [isSelectingAction, setIsSelectingAction] = useState<boolean>(false);

  // State for the currently selected action (for the form)
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);

  // State for the form data
  const [formData, setFormData] = useState<any>(null);

  // State for form validation
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // State for confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  // State for notification snackbar
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Function to handle the "Add Action" button click
  const handleAddActionClick = () => {
    setIsSelectingAction(true);
  };

  // Function to handle action card selection
  const handleActionSelect = (actionType: ActionType) => {
    setSelectedAction(actionType);
    // Initialize empty form data
    setFormData({});
    setIsSelectingAction(false);
  };

  // Function to go back to action selection
  const handleBackToSelection = () => {
    // Show confirmation if form has data
    if (formData && Object.keys(formData).length > 0) {
      setShowConfirmation(true);
    } else {
      resetFormState();
    }
  };

  // Function to reset form state
  const resetFormState = () => {
    setSelectedAction(null);
    setFormData(null);
    setIsFormValid(false);
    setIsSelectingAction(true);
  };

  // Function to cancel the action and return to empty state
  const handleCancelAction = () => {
    // Show confirmation if form has data
    if (formData && Object.keys(formData).length > 0) {
      setShowConfirmation(true);
    } else {
      closeForm();
    }
  };

  // Function to close the form
  const closeForm = () => {
    setSelectedAction(null);
    setFormData(null);
    setIsFormValid(false);
    setIsSelectingAction(false);
  };

  // Function to confirm discarding changes
  const handleConfirmDiscard = () => {
    setShowConfirmation(false);

    if (isSelectingAction) {
      closeForm();
    } else {
      resetFormState();
    }
  };

  // Function to cancel discarding changes
  const handleCancelDiscard = () => {
    setShowConfirmation(false);
  };

  // Function to handle form data changes
  const handleFormChange = (data: any) => {
    setFormData(data);

    // Simple validation - you may want to implement more robust validation
    setIsFormValid(Object.keys(data).length > 0);
  };

  // Function to submit the action form
  const handleSubmitAction = () => {
    if (!selectedAction || !formData) return;

    // Create new action
    const newAction: ActionData = {
      id: `action-${Date.now()}`, // Generate a unique ID
      type: selectedAction,
      title: getActionTitle(selectedAction, formData),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      formData: formData,
    };

    // Add the new action to the list
    setActions([...actions, newAction]);

    // Show success notification
    setNotification({
      open: true,
      message: `${actionCards.find((a) => a.type === selectedAction)?.title} action created successfully!`,
      severity: 'success',
    });

    // Close the form
    closeForm();
  };

  // Function to generate a meaningful title based on action type and form data
  const getActionTitle = (type: ActionType, data: any): string => {
    const actionInfo = actionCards.find((a) => a.type === type);

    switch (type) {
      case 'rework':
        return `Rework ${data.quantity || ''} item(s): ${data.reworkType || 'No type specified'}`;

      case 'secondary-inspection':
        return 'Secondary Inspection'; // Will be customized based on form data

      case 'give-back':
        return 'Give Back'; // Will be customized based on form data

      case 'scrap':
        return 'Scrap Items'; // Will be customized based on form data

      case '3p-selling':
        return '3P Selling'; // Will be customized based on form data

      case 'on-stock':
        return 'On-Stock'; // Will be customized based on form data

      default:
        return actionInfo?.title || 'New Action';
    }
  };

  // Function to close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Render the form based on the selected action type
  const renderActionForm = () => {
    if (!selectedAction) return null;

    const action = actionCards.find((card) => card.type === selectedAction);
    if (!action) return null;

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBackToSelection} sx={{ mr: 1 }} color="primary">
            <BackIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                color: 'white',
                bgcolor: action.color,
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getSmallIcon(action.type)}
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {action.title} Action
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSubmitAction}
            disabled={!isFormValid}
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          <IconButton onClick={handleCancelAction} color="default">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ p: 1 }}>
          {/* Render different forms based on action type */}
          {selectedAction === 'rework' && (
            <ReworkForm onFormChange={handleFormChange} initialData={formData} />
          )}

          {/* Other form types */}
          {selectedAction === 'secondary-inspection' && (
            <SecondaryInspectionForm onFormChange={handleFormChange} initialData={formData} />
          )}

          {selectedAction === 'give-back' && <Typography>Give Back Form would go here</Typography>}

          {selectedAction === 'scrap' && <Typography>Scrap Form would go here</Typography>}

          {selectedAction === '3p-selling' && (
            <Typography>3P Selling Form would go here</Typography>
          )}

          {selectedAction === 'on-stock' && <Typography>On-Stock Form would go here</Typography>}
        </Box>
      </Box>
    );
  };

  // Empty state component
  const EmptyState = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 4,
      }}
    >
      <Box
        sx={{
          mb: 3,
          width: 80,
          height: 80,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
        }}
      >
        <AddIcon sx={{ fontSize: 40, color: 'primary.main' }} />
      </Box>

      <Typography variant="h6" gutterBottom>
        No Actions Ordered Yet
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
        Use this section to order any actions relevant to the Claim. Actions help track and manage
        the necessary steps to resolve the claim efficiently.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddIcon />}
        onClick={handleAddActionClick}
      >
        Add Action
      </Button>
    </Box>
  );

  // Action selection component
  const ActionSelection = () => (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Select an Action Type
        </Typography>
        <IconButton onClick={handleCancelAction} color="default">
          <CloseIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {actionCards.map((action) => (
          <Grid item xs={12} sm={6} md={4} key={action.type}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardActionArea
                onClick={() => handleActionSelect(action.type)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <Box
                  sx={{
                    pt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      color: 'white',
                      bgcolor: action.color,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {action.iconElement}
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {action.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Actions list component (for when actions exist)
  const ActionsList = () => (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ordered Actions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddActionClick}
        >
          Add Action
        </Button>
      </Box>

      {/* Show list of actions */}
      <Grid container spacing={2}>
        {actions.map((action) => {
          const actionInfo = actionCards.find((a) => a.type === action.type);

          return (
            <Grid item xs={12} key={action.id}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderLeft: `4px solid ${actionInfo?.color || '#ccc'}`,
                  '&:hover': {
                    boxShadow: 1,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {actionInfo && (
                    <Box
                      sx={{
                        color: 'white',
                        bgcolor: actionInfo.color || '#ccc',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {getSmallIcon(action.type)}
                    </Box>
                  )}

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" component="div">
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created: {action.createdAt.toLocaleDateString()} - Status: {action.status}
                    </Typography>
                  </Box>

                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    View Details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );

  // Main content based on state
  const renderContent = () => {
    if (actions.length > 0 && !isSelectingAction && !selectedAction) {
      return <ActionsList />;
    }

    if (selectedAction) {
      return renderActionForm();
    }

    if (isSelectingAction) {
      return <ActionSelection />;
    }

    return <EmptyState />;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ordered Actions
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2 }}>{renderContent()}</Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onClose={handleCancelDiscard}
        TransitionComponent={Transition}
        aria-labelledby="discard-dialog-title"
        aria-describedby="discard-dialog-description"
      >
        <DialogTitle id="discard-dialog-title">Discard Changes?</DialogTitle>
        <DialogContent>
          <Typography id="discard-dialog-description">
            You have unsaved changes that will be lost. Are you sure you want to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDiscard} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDiscard} color="error" autoFocus>
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderedActions;
