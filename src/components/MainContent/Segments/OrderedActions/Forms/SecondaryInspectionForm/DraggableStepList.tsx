import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Stack
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDrag } from 'react-dnd';
import { InspectionStep } from './index';
import { availableInspectionSteps, isStepSelected } from './InspectionSteps';

interface DraggableStepItemProps {
    step: InspectionStep;
    isSelected: boolean;
}

interface DraggableStepListProps {
    selectedSteps: InspectionStep[];
    onAddStep: (steps: InspectionStep[]) => void;
}

// Define the type for our drag item
const ITEM_TYPE = 'inspection-step';

// Component for a draggable step card - Styled to match screenshot
const DraggableStepItem: React.FC<DraggableStepItemProps> = ({ step, isSelected }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: step,
        canDrag: !isSelected,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <Card
            ref={drag}
            variant="outlined"
            sx={{
                mb: 1, // Reduced margin
                opacity: isSelected ? 0.6 : isDragging ? 0.4 : 1,
                cursor: isSelected ? 'not-allowed' : 'grab',
                boxShadow: 'none',
                borderColor: 'divider',
                '&:hover': {
                    backgroundColor: theme => isSelected ? '' : 'rgba(0, 0, 0, 0.04)',
                },
                transition: 'background-color 0.2s',
            }}
        >
            <CardContent sx={{ py: "12px", px: 2 }}>  {/* Adjusted to match screenshot */}
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {step.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                    {step.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

// Component for the list of available steps
const DraggableStepList: React.FC<DraggableStepListProps> = ({ selectedSteps, onAddStep }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter steps based on search query
    const filteredSteps = availableInspectionSteps.filter(step =>
        step.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        step.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddStep = (newStep: InspectionStep) => {
        if (!isStepSelected(newStep, selectedSteps)) {
            onAddStep([...selectedSteps, newStep]);
        }
    };

    return (
        <Box>
            {/* Search box and step list are now directly in the component without section heading */}
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search steps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <Box component="span" sx={{ color: 'action.active', mr: 1 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
                            </svg>
                        </Box>
                    ),
                }}
                sx={{ mb: 2 }}
            />

            {/* Step list in a borderless container */}
            <Box
                sx={{
                    maxHeight: '350px',
                    overflowY: 'auto',
                    pr: 1 // Add slight padding on right for scrollbar
                }}
            >
                <Stack spacing={0.75}> {/* Reduced spacing between cards */}
                    {filteredSteps.map((step) => (
                        <div key={step.id} onClick={() => handleAddStep(step)}>
                            <DraggableStepItem
                                step={step}
                                isSelected={isStepSelected(step, selectedSteps)}
                            />
                        </div>
                    ))}

                    {filteredSteps.length === 0 && (
                        <Box sx={{ py: 2, textAlign: 'center' }}>
                            <Typography color="text.secondary" variant="body2">
                                No steps match your search
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default DraggableStepList;