import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import toastReducer, { ToastState } from '../modules/layout/redux/layoutReducer';
import productReducer, { ProductState } from '../modules/products/redux/productReducer';
import userListReducer, { UserListState } from './../modules/users/redux/userReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  toast: ToastState;
  product: ProductState;
  userList: UserListState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    toast: toastReducer,
    product: productReducer,
    userList: userListReducer,
  });
}
