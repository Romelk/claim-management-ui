// src/components/MainContent/ContentSegments.tsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ContentLayout from './ContentLayout';
import InformationPanel from './Segments/InformationPanel';

const ContentSegments = () => {
    // Add state management for the information panel
    const [activePanel, setActivePanel] = useState('inspection');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handlePanelChange = (panelId) => {
        setActivePanel(panelId);
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row', // Changed to row for horizontal layout
                width: '100%',
                height: '100%',
                gap: 2,
            }}
        >
            {/* Main Content Layout with Left Navigation - Fixed width */}
            <Box
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    maxWidth: isCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 360px)',
                    transition: 'max-width 0.3s ease',
                }}
            >
                <ContentLayout />
            </Box>

            {/* Information Panel - Now on the right */}
            <Box
                sx={{
                    width: isCollapsed ? '60px' : '360px',
                    height: '100%',
                    transition: 'width 0.3s ease',
                    flexShrink: 0,
                }}
            >
                <InformationPanel
                    activePanel={activePanel}
                    onPanelChange={handlePanelChange}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={handleToggleCollapse}
                />
            </Box>
        </Box>
    );
};

export default ContentSegments;