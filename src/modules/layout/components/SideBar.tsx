import { ExpandLess, ExpandMore } from '@mui/icons-material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';

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
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#323259',
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
            <LocalOfferOutlinedIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Catalog" />
          {catalogOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={catalogOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={ROUTES.productList} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Products" />
              </ListItemButton>
            </Link>
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
            <Link to={ROUTES.userList} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText sx={{ fontSize: '13px' }} primary="User List" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default SideBar;
