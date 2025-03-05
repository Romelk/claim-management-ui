import React, { useRef } from 'react';
import {
    Box,
    Chip,
    IconButton,
    Typography
} from '@mui/material';
import {
    Close as CloseIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { InspectionStep } from './index';

interface DraggablePillProps {
    step: InspectionStep;
    index: number;
    moveStep: (dragIndex: number, hoverIndex: number) => void;
    removeStep: (index: number) => void;
}

interface OrderedStepsPillsProps {
    steps: InspectionStep[];
    onStepsChange: (steps: InspectionStep[]) => void;
}

// Define item types
const ITEM_TYPE = 'inspection-step';
const PILL_TYPE = 'pill-step';

// Component for a draggable pill - Styled to match screenshot
const DraggablePill: React.FC<DraggablePillProps> = ({ step, index, moveStep, removeStep }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: PILL_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get horizontal middle
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the left
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

            // Only perform the move when the mouse has crossed half of the items height or width
            // Dragging left to right
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }

            // Dragging right to left
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

            // Time to actually perform the action
            moveStep(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for performance reasons
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: PILL_TYPE,
        item: () => {
            return { id: step.id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <Box
            ref={ref}
            data-handler-id={handlerId}
            sx={{
                opacity: isDragging ? 0.4 : 1,
                display: 'inline-block',
                m: 0.5,
            }}
        >
            <Chip
                label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="span"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '18px', // Slightly smaller
                                height: '18px', // Slightly smaller
                                borderRadius: '50%',
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontSize: '11px', // Slightly smaller
                                fontWeight: 'bold',
                                mr: 0.75,
                            }}
                        >
                            {index + 1}
                        </Box>
                        {step.name}
                    </Box>
                }
                deleteIcon={
                    <CloseIcon fontSize="small" />
                }
                onDelete={() => removeStep(index)}
                color="primary"
                variant="outlined"
                sx={{
                    borderRadius: '16px',
                    px: 0.75,
                    py: 0.5,
                    fontSize: '0.85rem',
                    '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    },
                    cursor: 'grab',
                }}
            />
        </Box>
    );
};

// Component for the ordered steps pills - styled to match screenshot
const OrderedStepsPills: React.FC<OrderedStepsPillsProps> = ({ steps, onStepsChange }) => {
    // Create a drop target for the entire inspection plan area
    const [{ isOver }, drop] = useDrop({
        accept: [ITEM_TYPE, PILL_TYPE],
        drop: (item: any) => {
            // If it's a new step from the left panel
            if (item.id && !item.hasOwnProperty('index')) {
                // Check if step is already in the list
                const isExisting = steps.some(step => step.id === item.id);
                if (!isExisting) {
                    onStepsChange([...steps, item]);
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    // Function to move a step (reordering)
    const moveStep = (dragIndex: number, hoverIndex: number) => {
        const draggedStep = steps[dragIndex];
        const newSteps = [...steps];
        newSteps.splice(dragIndex, 1);
        newSteps.splice(hoverIndex, 0, draggedStep);
        onStepsChange(newSteps);
    };

    // Function to remove a step
    const removeStep = (index: number) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        onStepsChange(newSteps);
    };

    return (
        <Box
            ref={drop}
            sx={{
                minHeight: '140px', // Reduced height to match screenshot
                border: '1px dashed',
                borderColor: isOver ? 'primary.main' : 'divider',
                borderRadius: 1,
                transition: 'border-color 0.2s',
                position: 'relative',
            }}
        >
            {/* When no steps exist, show a centered drop indicator matching screenshot */}
            {steps.length === 0 && (
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        minHeight: '140px',
                    }}
                >
                    <AddIcon
                        color={isOver ? 'primary' : 'disabled'}
                        sx={{ mb: 1, fontSize: '2rem' }}
                    />
                    <Typography
                        color="text.secondary"
                        variant="body2"
                        align="center"
                    >
                        Drag and drop steps here
                    </Typography>
                </Box>
            )}

            {/* When steps exist, show them as pills in a flex container */}
            {steps.length > 0 && (
                <Box
                    sx={{
                        p: 1.5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        minHeight: '100%',
                    }}
                >
                    {steps.map((step, index) => (
                        <DraggablePill
                            key={step.id}
                            step={step}
                            index={index}
                            moveStep={moveStep}
                            removeStep={removeStep}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default OrderedStepsPills;