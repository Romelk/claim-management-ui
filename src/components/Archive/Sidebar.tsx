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
  Tooltip,
  Badge,
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
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false, badge, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          borderRadius: 1,
          backgroundColor: active ? 'primary.light' : 'transparent',
          '&:hover': {
            backgroundColor: active ? 'primary.light' : 'action.hover',
          },
          py: 0.5,
        }}
      >
        <ListItemIcon sx={{ color: active ? 'primary.main' : 'inherit', minWidth: 40 }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            variant: 'body2',
            fontWeight: active ? 'medium' : 'regular',
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

  const handleClaimToggle = () => {
    setClaimExpanded(!claimExpanded);
  };

  const handleReworkToggle = () => {
    setReworkExpanded(!reworkExpanded);
  };

  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 64,
          boxSizing: 'border-box',
          transition: (theme) =>
            theme.transitions.create(['width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          overflowX: 'hidden',
        },
      }}
      open={open}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          justifyContent: open ? 'space-between' : 'center',
        }}
      >
        {open ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1,
                }}
              >
                <DescriptionIcon fontSize="small" />
              </Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Claim System
              </Typography>
            </Box>
            <IconButton onClick={onToggle} size="small">
              <ChevronLeftIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={onToggle} size="small">
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      <List sx={{ py: 1, px: 1 }}>
        <NavItem icon={<HomeIcon />} text="Dashboard" />

        {open ? (
          <ListItem sx={{ pt: 2, pb: 0.5 }}>
            <ListItemButton onClick={handleClaimToggle} sx={{ p: 0 }} disableRipple>
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                CLAIM
              </Typography>
              {claimExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </ListItemButton>
          </ListItem>
        ) : (
          <Box sx={{ height: 8 }} />
        )}

        <Collapse in={open ? claimExpanded : true} timeout="auto" unmountOnExit>
          <List disablePadding>
            {!open && (
              <Tooltip title="Stock Item Claims" placement="right">
                <Box>
                  <NavItem icon={<DescriptionIcon />} text="Stock Item Claims" active badge="3" />
                </Box>
              </Tooltip>
            )}
            {open && (
              <NavItem icon={<DescriptionIcon />} text="Stock Item Claims" active badge="3" />
            )}

            {!open && (
              <Tooltip title="Non Stock Item Claims" placement="right">
                <Box>
                  <NavItem icon={<InventoryIcon />} text="Non Stock Item Claims" />
                </Box>
              </Tooltip>
            )}
            {open && <NavItem icon={<InventoryIcon />} text="Non Stock Item Claims" />}
          </List>
        </Collapse>

        {open ? (
          <ListItem sx={{ pt: 2, pb: 0.5 }}>
            <ListItemButton onClick={handleReworkToggle} sx={{ p: 0 }} disableRipple>
              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                REWORK
              </Typography>
              {reworkExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </ListItemButton>
          </ListItem>
        ) : (
          <Box sx={{ height: 8 }} />
        )}

        <Collapse in={open ? reworkExpanded : true} timeout="auto" unmountOnExit>
          <List disablePadding>
            {!open && (
              <Tooltip title="Rework Orders" placement="right">
                <Box>
                  <NavItem icon={<RefreshIcon />} text="Rework Orders" />
                </Box>
              </Tooltip>
            )}
            {open && <NavItem icon={<RefreshIcon />} text="Rework Orders" />}

            {!open && (
              <Tooltip title="Rules for Planned Rework" placement="right">
                <Box>
                  <NavItem icon={<SettingsIcon />} text="Rules for Planned Rework" badge="New" />
                </Box>
              </Tooltip>
            )}
            {open && (
              <NavItem icon={<SettingsIcon />} text="Rules for Planned Rework" badge="New" />
            )}
          </List>
        </Collapse>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <List sx={{ py: 1, px: 1 }}>
        {!open && (
          <Tooltip title="Help & Resources" placement="right">
            <Box>
              <NavItem icon={<HelpIcon />} text="Help & Resources" />
            </Box>
          </Tooltip>
        )}
        {open && <NavItem icon={<HelpIcon />} text="Help & Resources" />}

        {!open && (
          <Tooltip title="Profile" placement="right">
            <Box>
              <NavItem icon={<PersonIcon />} text="Profile" />
            </Box>
          </Tooltip>
        )}
        {open && <NavItem icon={<PersonIcon />} text="Profile" />}

        {!open && (
          <Tooltip title="Logout" placement="right">
            <Box>
              <NavItem icon={<LogoutIcon color="error" />} text="Logout" />
            </Box>
          </Tooltip>
        )}
        {open && <NavItem icon={<LogoutIcon color="error" />} text="Logout" />}
      </List>
    </Drawer>
  );
};

export default Sidebar;
