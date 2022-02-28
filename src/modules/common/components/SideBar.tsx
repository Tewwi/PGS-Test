import { Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LivingOutlinedIcon from '@mui/icons-material/LivingOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import React from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Props {
  sideBarOpen: boolean;
  closeSideBar(): void;
}

const SideBar = (props: Props) => {
  const drawerWidth = props.sideBarOpen ? 200 : 0;
  const [userOpen, setUserOpen] = React.useState(false);
  const [catalogOpen, setCatalogOpen] = React.useState(false);
  return (
    <Drawer
      open={props.sideBarOpen}
      onClose={() => props.closeSideBar()}
      anchor="left"
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        height: 'calc(100vh - 64px)',
        transition: 'all 0.3s ease-in-out',
        '& .MuiDrawer-paper': {
          backgroundColor: '#323259',
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%',
          color: 'white',
        },
      }}
    >
      <List>
        <ListItemButton onClick={() => setCatalogOpen(!catalogOpen)}>
          <ListItemIcon>
            <LivingOutlinedIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Catalog" />
          {catalogOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={catalogOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Products" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setUserOpen(!userOpen)}>
          <ListItemIcon>
            <GroupOutlinedIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText sx={{ fontSize: '13px' }} primary="User" />
          {userOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={userOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText sx={{ fontSize: '13px' }} primary="User List" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default SideBar;
