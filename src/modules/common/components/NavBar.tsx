import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { AppBar, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../configs/routes';
import SideBar from './SideBar';

interface Props {}

const NavBar: FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(location.pathname === ROUTES.login);

  React.useEffect(() => {
    if (location.pathname === ROUTES.login) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [location.pathname]);

  if (isHidden) {
    return <div></div>;
  } else {
    return (
      <Box>
        <AppBar position="static" sx={{ backgroundColor: '#323259' }}>
          <Toolbar>
            <IconButton
              onClick={() => setSideBarOpen(!sideBarOpen)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gear Focus Admin
              <NotificationsNoneOutlinedIcon fontSize="small" />
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                sx={{ mt: '45px' }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ display: 'flex' }}>
          <SideBar
            sideBarOpen={sideBarOpen}
            closeSideBar={() => {
              setSideBarOpen(false);
            }}
          />
          {children}
        </div>
      </Box>
    );
  }
};

export default NavBar;
