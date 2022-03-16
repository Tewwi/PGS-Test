import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import Loading from './modules/layout/components/Loading';
import NavBar from './modules/layout/components/NavBar';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductsListPage = lazy(() => import('./modules/products/pages/ProductsListPage'));
const AddProductPage = lazy(() => import('./modules/products/pages/AddProductPage'));
const ProductDetailPage = lazy(() => import('./modules/products/pages/ProductDetail'));
const UserListPage = lazy(() => import('./modules/users/pages/UserListPage'));
const CreateUserPage = lazy(() => import('./modules/users/pages/CreateUserPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <NavBar>
        <Switch location={location}>
          <Route path={ROUTES.login} component={LoginPage} />
          <ProtectedRoute path={ROUTES.home} component={HomePage} />
          <ProtectedRoute path={ROUTES.productList} component={ProductsListPage} />
          <ProtectedRoute path={ROUTES.addProduct} component={AddProductPage} />
          <ProtectedRoute path={`${ROUTES.productDetail}/:id`} component={ProductDetailPage} />
          <ProtectedRoute path={ROUTES.userList} component={UserListPage} />
          <ProtectedRoute path={ROUTES.createUser} component={CreateUserPage} />
          <Route path={ROUTES.contact} component={ContactPage} />

          <ProtectedRoute path="/" component={ProductsListPage} />
        </Switch>
      </NavBar>
    </Suspense>
  );
};
