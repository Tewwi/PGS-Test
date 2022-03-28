import { ExpandLess, ExpandMore } from '@mui/icons-material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { ROUTES } from '../../../configs/routes';
import SidebarListItem from './SidebarListItem';

interface Props {
  sideBarOpen: boolean;
  closeSideBar(): void;
}

const SideBar = (props: Props) => {
  const drawerWidth = props.sideBarOpen ? 200 : 0;
  const [userInfo, setUserInfo] = React.useState({
    open: false,
    select: false,
  });
  const [catalogInfo, setCatalogInfo] = React.useState({
    open: false,
    select: true,
  });

  const handleSelect = React.useCallback((select: boolean, tag: string) => {
    if (tag == 'Catalog') {
      setCatalogInfo((prev) => {
        return { ...prev, select: select };
      });
      setUserInfo({ open: false, select: !select });
    } else {
      setUserInfo((prev) => {
        return { ...prev, select: select };
      });
      setCatalogInfo({ open: false, select: !select });
    }
  }, []);

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
        <ListItemButton
          onClick={() =>
            setCatalogInfo((prev) => {
              return { ...prev, open: !prev.open };
            })
          }
        >
          <ListItemIcon>
            <LocalOfferOutlinedIcon sx={{ color: catalogInfo.select ? '#b18aff' : 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Catalog" sx={{ color: catalogInfo.select ? '#b18aff' : 'white' }} />
          {catalogInfo.open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={catalogInfo.open} timeout="auto" unmountOnExit>
          <SidebarListItem tag="Catalog" handleSelect={handleSelect} label="Products" to={ROUTES.productList} />
        </Collapse>
        <ListItemButton
          onClick={() =>
            setUserInfo((prev) => {
              return { ...prev, open: !prev.open };
            })
          }
        >
          <ListItemIcon>
            <GroupOutlinedIcon sx={{ color: userInfo.select ? '#b18aff' : 'white' }} />
          </ListItemIcon>
          <ListItemText sx={{ fontSize: '13px', color: userInfo.select ? '#b18aff' : 'white' }} primary="User" />
          {userInfo.open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={userInfo.open} timeout="auto" unmountOnExit>
          <SidebarListItem tag="User" handleSelect={handleSelect} label="User List" to={ROUTES.userList} />
        </Collapse>
      </List>
    </Drawer>
  );
};

export default SideBar;
