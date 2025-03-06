import React, { useState, useEffect } from 'react';
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
  Chip,
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
  Visibility as VisibilityIcon,
  Assignment as OrderedActionsIcon,
} from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

// Import Form Components
//import { ReworkForm, SecondaryInspectionForm } from './OrderedActions/Forms';
//import { ReworkForm } from './OrderedActions/Forms';
//import SecondaryInspectionForm from './OrderedActions/Forms/SecondaryInspectionForm';

import { ReworkForm } from './OrderedActions/Forms';
import { GivebackForm } from './OrderedActions/Forms/Giveback';
import SecondaryInspectionForm from './OrderedActions/Forms/SecondaryInspectionForm';
import OnStockForm from './OrderedActions/Forms/OnStock';
import ScrapFormDemo from './OrderedActions/Forms/Scrap/ScrapFormDemo';

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

interface SecondaryInspectionFormProps {
  onFormChange: (data: any) => void;
  initialData?: Partial<SecondaryInspectionFormData>;
  onSave?: () => void;
  editMode?: boolean; // New prop to indicate edit mode
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
  const [actions, setActions] = useState<ActionData[]>(() => {
    // Retrieve saved actions from localStorage on component mount
    const savedActions = localStorage.getItem('orderedActions');
    if (savedActions) {
      try {
        // Parse the JSON string from localStorage
        const parsedActions = JSON.parse(savedActions);

        // Convert string dates back to Date objects
        return parsedActions.map((action: any) => ({
          ...action,
          createdAt: new Date(action.createdAt),
          updatedAt: new Date(action.updatedAt)
        }));
      } catch (error) {
        console.error('Error parsing saved actions:', error);
        return [];
      }
    }
    return [];
  });

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

  // State for editing an existing action
  const [editingAction, setEditingAction] = useState<ActionData | null>(null);

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
    setEditingAction(null);
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
    setEditingAction(null);
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
    let updatedActionsList: ActionData[] = [];

    if (editingAction) {
      // Update existing action
      const updatedAction: ActionData = {
        ...editingAction,
        title: getActionTitle(editingAction.type, formData),
        updatedAt: new Date(),
        formData: formData,
      };

      // Update the action in the list
      updatedActionsList = actions.map(action =>
          action.id === updatedAction.id ? updatedAction : action
      );
      setActions(updatedActionsList);

      // Show success notification
      setNotification({
        open: true,
        message: `${actionCards.find((a) => a.type === updatedAction.type)?.title} action updated successfully!`,
        severity: 'success',
      });
    } else if (selectedAction && formData) {
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
      updatedActionsList = [...actions, newAction];
      setActions(updatedActionsList);

      // Show success notification
      setNotification({
        open: true,
        message: `${actionCards.find((a) => a.type === selectedAction)?.title} action created successfully!`,
        severity: 'success',
      });
    }

    // Save to localStorage
    if (updatedActionsList.length > 0) {
      localStorage.setItem('orderedActions', JSON.stringify(updatedActionsList));
    }

    // Close the form
    closeForm();
  };

  // Function to handle view details button click
  const handleViewDetails = (action: ActionData) => {
    // For now, only implement for rework action type
    if (action.type === 'rework' || action.type === 'secondary-inspection'|| action.type === 'give-back'|| action.type === 'on-stock' || action.type === 'scrap') {
      setEditingAction(action);
      setSelectedAction(action.type);
      setFormData(action.formData);
      setIsFormValid(true); // Assuming existing data is valid
    } else {
      // For other action types, just show a notification
      setNotification({
        open: true,
        message: `Detail view is not yet implemented for ${actionCards.find((a) => a.type === action.type)?.title || 'this'} actions`,
        //message: "Detail view is only implemented for Rework actions in this demo",
        severity: 'info',
      });
    }
  };

  // Function to generate a meaningful title based on action type and form data
  const getActionTitle = (type: ActionType, data: any): string => {
    const actionInfo = actionCards.find((a) => a.type === type);

    switch (type) {
      case 'rework':
        return `Rework ${data.totalCost ? formatCurrency(data.totalCost) : ''} - ${data.reworkSteps?.length || 0} steps`;

      case 'secondary-inspection':
        const quantity = data.quantity || 0;
        const stepsCount = data.steps?.length || 0;
        const party = data.responsibleParty === 'supplier' ? 'Supplier' : 'Partner';
        return `Secondary Inspection - ${quantity} items, ${stepsCount} steps (${party})`;


      case 'give-back':
        return `Giveback ${data.totalCost ? formatCurrency(data.totalCost) : ''} - ${data.givebackSteps?.length || 0} steps`;// Will be customized based on form data

      case 'scrap':
        return 'Scrap Items'; // Will be customized based on form data

      case '3p-selling':
        return '3P Selling'; // Will be customized based on form data

      case 'on-stock':
        return `On-Stock - ${data.quantity || 0} items (${data.invoiceDiscountPercent || 0}% discount)`;

      default:
        return actionInfo?.title || 'New Action';
    }
  };

  // Function to format currency
  const formatCurrency = (amount: number): string =>
      amount.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR'
      });

  // Function to close notification
  const handleCloseNotification = () => {
    setNotification({...notification, open: false});
  };

  // Function to clear all actions (for testing)
  const handleClearAllActions = () => {
    setActions([]);
    localStorage.removeItem('orderedActions');
    setNotification({
      open: true,
      message: 'All actions have been cleared',
      severity: 'info',
    });
  };

  // Save actions to localStorage whenever they change
  useEffect(() => {
    if (actions.length > 0) {
      localStorage.setItem('orderedActions', JSON.stringify(actions));
    } else {
      localStorage.removeItem('orderedActions');
    }
  }, [actions]);

  // Render the form based on the selected action type
  // Update the renderActionForm function for better spacing
  const renderActionForm = () => {
    if (!selectedAction) return null;

    const action = actionCards.find((card) => card.type === selectedAction);
    if (!action) return null;

    return (
        <Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,  // Reduced from mb: 3
            px: 2,   // Add horizontal padding
            pt: 1.5  // Add top padding
          }}>
            <IconButton
                onClick={handleBackToSelection}
                sx={{mr: 1}}
                color="primary"
                aria-label="Back to Ordered Actions"
            >
              <BackIcon/>
            </IconButton>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
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
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                {editingAction ? 'Edit' : 'New'} {action.title} {editingAction ? 'Details' : 'Action'}
              </Typography>
            </Box>
            <Box sx={{flexGrow: 1}}/>
            <IconButton onClick={handleCancelAction} color="default">
              <CloseIcon/>
            </IconButton>
          </Box>

          <Divider sx={{mb: 2}}/> {/* Reduced from mb: 3 */}

          {editingAction && (
              <Box sx={{mb: 2, px: 2}}> {/* Reduced from mb: 3, added px: 2 */}
                <Typography variant="subtitle1" gutterBottom>
                  Status: <Chip label={editingAction.status} color="primary" size="small" sx={{ml: 1}}/>
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Created: {editingAction.createdAt.toLocaleDateString()}
                  {' | '}
                  Last Updated: {editingAction.updatedAt.toLocaleDateString()}
                </Typography>
              </Box>
          )}

          <Box sx={{px: 2}}> {/* Added horizontal padding for consistent alignment */}
            {/* Render different forms based on action type */}
            {selectedAction === 'rework' && (
                <ReworkForm
                    onFormChange={handleFormChange}
                    initialData={formData}
                    onSave={handleSubmitAction}
                />
            )}

            {/* Other form types */}
            {selectedAction === 'secondary-inspection' && (
                <SecondaryInspectionForm
                    onFormChange={handleFormChange}
                    initialData={formData}
                    onSave={handleSubmitAction}
                    editMode={!!editingAction}
                />
            )}

            {selectedAction === 'give-back' && (
                <GivebackForm
                    onFormChange={handleFormChange}
                    initialData={formData}
                    onSave={handleSubmitAction}
                />
            )}

            {/* Use ScrapFormDemo for the Scrap action */}
            {selectedAction === 'scrap' && (
                <ScrapFormDemo
                    onFormChange={handleFormChange}
                    initialData={formData}
                    onSave={handleSubmitAction}
                />
            )}

            {selectedAction === '3p-selling' && (
                <Typography>3P Selling Form would go here</Typography>
            )}

            {selectedAction === 'on-stock' && (
                <OnStockForm
                    onFormChange={handleFormChange}
                    initialData={formData}
                    onSave={handleSubmitAction}
                />
            )}
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
          <AddIcon sx={{fontSize: 40, color: 'primary.main'}}/>
        </Box>

        <Typography variant="h6" gutterBottom>
          No Actions Ordered Yet
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{mb: 4, maxWidth: 500}}>
          Use this section to order any actions relevant to the Claim. Actions help track and manage
          the necessary steps to resolve the claim efficiently.
        </Typography>

        <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon/>}
            onClick={handleAddActionClick}
        >
          Add Action
        </Button>
      </Box>
  );

  // Action selection component
  const ActionSelection = () => (
      <Box sx={{maxWidth: '100%'}}>
        <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Select an Action Type
          </Typography>
          <IconButton onClick={handleCancelAction} color="default">
            <CloseIcon/>
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{maxWidth: '100%'}}>
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
                    <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
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
        <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Ordered Actions
          </Typography>
          <Button
              variant="outlined"
              color="error"
              onClick={handleClearAllActions}
              sx={{mr: 2}}
          >
            Clear All
          </Button>
          <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon/>}
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
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
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

                      <Box sx={{flexGrow: 1}}>
                        <Typography variant="subtitle1" component="div">
                          {action.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Created: {action.createdAt.toLocaleDateString()} - Status: {action.status}
                        </Typography>
                      </Box>

                      <Button
                          variant="outlined"
                          size="small"
                          sx={{mr: 1}}
                          startIcon={<VisibilityIcon/>}
                          onClick={() => handleViewDetails(action)}
                      >
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
      return <ActionsList/>;
    }

    if (selectedAction) {
      return renderActionForm();
    }

    if (isSelectingAction) {
      return <ActionSelection/>;
    }

    return <EmptyState/>;
  };

  // Add CSS to ensure the component fits within its container
  // This style hack helps prevent the component from affecting parent layout
  const componentStyle = `
    .ordered-actions-root {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
    .ordered-actions-paper {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
    .ordered-actions-content {
      max-width: 100%;
    }
  `;

// In OrderedActions.tsx, find the return statement section and modify it like this:

// In OrderedActions.tsx, find the return statement section and modify it like this:

  // Complete and correct return statement for OrderedActions.tsx
  return (
      <>
        {/* Inject CSS to fix layout issues */}
        <style>{componentStyle}</style>

        <Box className="ordered-actions-root" sx={{width: '100%', maxWidth: '100%'}}>
          {!selectedAction && (
              // Only show the header when no action is selected
              <Box sx={{
                mb: 4,
                mt: 2,
                px: 2
              }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      color: 'primary.main',
                      mb: 1.5
                    }}
                >
                  <OrderedActionsIcon sx={{mr: 2}}/>
                  Ordered Actions
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      pr: 4
                    }}
                >
                  Track and manage all actions related to this claim, from rework to inspection and beyond
                </Typography>
              </Box>
          )}

          <Paper
              className="ordered-actions-paper"
              variant="outlined"
              sx={{
                borderRadius: 2,
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
          >
            <Box
                className="ordered-actions-content"
                sx={{
                  p: selectedAction ? {xs: 0, sm: 1} : 2, // Remove padding when showing a form
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  overflow: 'auto'
                }}
            >
              {renderContent()}
            </Box>
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
              anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          >
            <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled">
              {notification.message}
            </Alert>
          </Snackbar>
        </Box>
      </>
  );
};
export default OrderedActions;