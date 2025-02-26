// src/components/Sidebar.tsx
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Collapse,
  Badge
} from '@mui/material';
import {
  Home as HomeIcon,
  Description as DescriptionIcon,
  Inventory as InventoryIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false, badge, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          py: 1,
          px: 2,
          backgroundColor: active ? 'primary.light' : 'transparent',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: active ? 'primary.light' : 'action.hover',
          },
        }}
      >
        <ListItemIcon sx={{ 
          minWidth: 35,
          color: active ? 'primary.main' : 'inherit'
        }}>
          {icon}
        </ListItemIcon>
        <ListItemText 
          primary={text}
          sx={{ 
            '& .MuiListItemText-primary': {
              fontSize: '0.875rem',
              fontWeight: active ? 500 : 400,
              color: active ? 'primary.main' : 'inherit'
            }
          }} 
        />
        {badge && (
          <Badge 
            badgeContent={badge} 
            color={badge === 'New' ? 'success' : 'primary'}
            sx={{ ml: 1 }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const [claimExpanded, setClaimExpanded] = useState(true);
  const [reworkExpanded, setReworkExpanded] = useState(true);
  const drawerWidth = 260;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 72,
          boxSizing: 'border-box',
          transition: theme => theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: open ? 'space-between' : 'center'
      }}>
        {open ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'primary.main', 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                mr: 1
              }}>
                <DescriptionIcon />
              </Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Claim System
              </Typography>
            </Box>
            <IconButton size="small" onClick={onToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </>
        ) : (
          <IconButton size="small" onClick={onToggle}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Navigation Items */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ px: 1 }}>
          {/* Dashboard */}
          <NavItem 
            icon={<HomeIcon />} 
            text="Dashboard" 
          />

          {/* CLAIM Section */}
          {open && (
            <Box sx={{ px: 2, py: 1.5 }}>
              <Box 
                onClick={() => setClaimExpanded(!claimExpanded)}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  justifyContent: 'space-between'
                }}
              >
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ fontWeight: 600 }}
                >
                  CLAIM
                </Typography>
                {claimExpanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              </Box>
            </Box>
          )}

          <Collapse in={claimExpanded} timeout="auto">
            <List disablePadding>
              <NavItem 
                icon={<DescriptionIcon />} 
                text="Stock Item Claims" 
                active 
                badge="3"
              />
              <NavItem 
                icon={<InventoryIcon />} 
                text="Non Stock Item Claims" 
              />
            </List>
          </Collapse>

          {/* REWORK Section */}
          {open && (
            <Box sx={{ px: 2, py: 1.5 }}>
              <Box 
                onClick={() => setReworkExpanded(!reworkExpanded)}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  justifyContent: 'space-between'
                }}
              >
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ fontWeight: 600 }}
                >
                  REWORK
                </Typography>
                {reworkExpanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
              </Box>
            </Box>
          )}

          <Collapse in={reworkExpanded} timeout="auto">
            <List disablePadding>
              <NavItem 
                icon={<RefreshIcon />} 
                text="Rework Orders" 
              />
              <NavItem 
                icon={<SettingsIcon />} 
                text="Rules for Planned Rework" 
                badge="New"
              />
            </List>
          </Collapse>
        </List>
      </Box>

      {/* Footer Items */}
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        <NavItem 
          icon={<HelpIcon />} 
          text="Help & Resources" 
        />
        <NavItem 
          icon={<PersonIcon />} 
          text="Profile" 
        />
        <NavItem 
          icon={<LogoutIcon />} 
          text="Logout" 
        />
      </List>
    </Drawer>
  );
};

export default Sidebar;
