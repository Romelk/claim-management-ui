// src/components/MainContent/ContentLayout.tsx
import React, { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    Divider,
    Badge,
} from '@mui/material';
import {
    Assignment as OrderedActionsIcon,
    Euro as BillingIcon,
    Link as LinkableClaimsIcon,
    ViewList as SKUListIcon,
    Note as NotesIcon,
    History as HistoryIcon,
    GetApp as DownloadsIcon,
    Euro as BillingDetailsIcon
} from '@mui/icons-material';

// Import content components
import OrderedActions from './Segments/OrderedActions';
import Downloads from './Segments/Downloads';
import LinkableClaims from './Segments/LinkableClaims';
import SKUList from './Segments/SkuList';
import Notes from './Segments/Notes';
import History from './Segments/History';
import BillingDetails from './Segments/BillingDetails';

const Billing = () => (
    <Box sx={{ p: 2 }}>
        <Typography variant="h6">Billing</Typography>
        <Typography variant="body2" color="text.secondary">
            This section will display billing information.
        </Typography>
    </Box>
);

const ContentLayout = () => {
    const [activeSection, setActiveSection] = useState('orderedActions');

    // For demo purposes - can be replaced with actual data
    const isClaimResolved = false; // Set to true to show Billing as first item
    const hasLinkableClaims = true; // Indicates if linkable claims are available
    const notesCount = 5; // Number of notes
    const downloadCount = 3; // Number of downloads

    // Define navigation items - will be filtered based on conditions
    const getNavigationItems = () => {
        let items = [
            { id: 'orderedActions', label: 'Ordered Actions', icon: <OrderedActionsIcon />, badge: null },
            {
                id: 'billingDetails',
                label: 'Billing Details',
                icon: <BillingDetailsIcon />,
                badge: null
            },
            {
                id: 'linkableClaims',
                label: 'Linkable Claims',
                icon: <LinkableClaimsIcon />,
                badge: hasLinkableClaims ? { content: '', color: 'primary' } : null
            },
            { id: 'skuList', label: 'SKU List', icon: <SKUListIcon />, badge: null },
            {
                id: 'notes',
                label: 'Notes',
                icon: <NotesIcon />,
                badge: notesCount > 0 ? { content: notesCount, color: 'default' } : null
            },
            { id: 'history', label: 'History', icon: <HistoryIcon />, badge: null },
            {
                id: 'downloads',
                label: 'Downloads',
                icon: <DownloadsIcon />,
                badge: downloadCount > 0 ? { content: downloadCount, color: 'default' } : null
            },
        ];

        // Add Billing section if claim is resolved
        if (isClaimResolved) {
            items.unshift({ id: 'billing', label: 'Billing', icon: <BillingIcon />, badge: null });
        }

        return items;
    };

    const navigationItems = getNavigationItems();

    // Render main content based on active section
    const renderContent = () => {
        switch (activeSection) {
            case 'billing':
                return <Billing />;
            case 'billingDetails':
                return <BillingDetails />;
            case 'orderedActions':
                return <OrderedActions />;
            case 'linkableClaims':
                return <LinkableClaims />;
            case 'skuList':
                return <SKUList />;
            case 'notes':
                return <Notes />;
            case 'history':
                return <History />;
            case 'downloads':
                return <Downloads />;
            default:
                return <OrderedActions />;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%', // Use full available height
                gap: 2,
            }}
        >
            {/* Navigation Menu - Fixed width, non-shrinkable */}
            <Paper
                variant="outlined"
                sx={{
                    width: '250px',
                    minWidth: '250px', // Add minWidth to prevent shrinking
                    flexShrink: 0, // Prevent shrinking
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                        Navigation
                    </Typography>
                </Box>
                <List component="nav" sx={{ flexGrow: 1, overflowY: 'auto', pt: 0 }}>
                    {navigationItems.map((item) => (
                        <React.Fragment key={item.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    selected={activeSection === item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    sx={{
                                        borderLeft: activeSection === item.id ? '4px solid' : '4px solid transparent',
                                        borderColor: activeSection === item.id ? 'primary.main' : 'transparent',
                                        bgcolor: activeSection === item.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                                        },
                                        // Fix for nav items text to prevent breaking into multiple lines
                                        '& .MuiListItemText-root': {
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        {item.badge ? (
                                            <Badge
                                                color={item.badge.color}
                                                variant={item.badge.content ? "standard" : "dot"}
                                                badgeContent={item.badge.content}
                                            >
                                                {item.icon}
                                            </Badge>
                                        ) : (
                                            item.icon
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="middle" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* Content Area - scrollable content container */}
            <Paper
                variant="outlined"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden', // Hide overflow
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    minWidth: 0, // Important for flexbox children
                }}
            >
                <Box sx={{
                    flexGrow: 1,
                    overflow: 'auto', // Make content scrollable
                    minWidth: 0, // Important for flexbox children
                }}>
                    {renderContent()}
                </Box>
            </Paper>
        </Box>
    );
};

export default ContentLayout;