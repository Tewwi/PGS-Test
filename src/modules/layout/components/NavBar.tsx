import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Alert, AppBar, IconButton, Menu, MenuItem, Snackbar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Cookies from 'js-cookie';
import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../configs/routes';
import SideBar from './SideBar';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { replace } from 'connected-react-router';
import { logOutUser } from '../../auth/redux/authReducer';
import { setFieldData, setToastInfo } from '../redux/layoutReducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';

interface Props {}

const NavBar: FC<Props> = ({ children }) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(location.pathname === ROUTES.login);
  const handleLogOut = () => {
    if (Cookies.get(ACCESS_TOKEN_KEY)) {
      dispatch(logOutUser());
      dispatch(replace(ROUTES.login));
    }
    return;
  };
  const toast = useSelector((state: AppState) => state.toast.toast);

  const fetchAllData = React.useCallback(async () => {
    const dataInfo: { [key: string]: { url: string } } = {
      vendor: {
        url: API_PATHS.getVendor,
      },
      catagory: {
        url: API_PATHS.getCategories,
      },
      brand: {
        url: API_PATHS.getBrand,
      },
      condition: {
        url: API_PATHS.getConditions,
      },
      shipping: {
        url: API_PATHS.getShipping,
      },
    };

    const promise = await Promise.all(
      Object.keys(dataInfo)?.map((item) => {
        return dispatch(fetchThunk(dataInfo[item].url, 'get'));
      }),
    );

    const data = promise.reduce((result, cur, index) => {
      result[Object.keys(dataInfo)[index]] = cur.data?.map((item: any) => ({
        ...item,
      }));
      return result;
    }, {} as any);

    dispatch(setFieldData(data));
  }, [dispatch]);

  React.useEffect(() => {
    if (location.pathname === ROUTES.login) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (!isHidden) {
      fetchAllData();
    }
  }, [fetchAllData, isHidden]);

  if (isHidden) {
    return <div>{children}</div>;
  } else {
    return (
      <Box>
        <AppBar position="static" sx={{ backgroundColor: '#323259', boxShadow: '0 0.5rem 1rem 0 #1a1f33' }}>
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
                <MenuItem
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ display: 'flex', maxWidth: '100vw', backgroundColor: '#1b1b38' }}>
          <SideBar
            sideBarOpen={sideBarOpen}
            closeSideBar={() => {
              setSideBarOpen(false);
            }}
          />
          <div style={{ flex: '1' }}>{children}</div>
        </div>
        {toast && (
          <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={toast.open}
            onClose={() => dispatch(setToastInfo({ ...toast, open: false }))}
            key={toast.message}
          >
            <Alert
              onClose={() => dispatch(setToastInfo({ ...toast, open: false }))}
              severity={toast.isSuccess ? 'success' : 'error'}
              sx={{ width: '100%' }}
            >
              {toast.message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    );
  }
};

export default NavBar;
