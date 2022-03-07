import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import Loading from './modules/common/components/Loading';
import NavBar from './modules/common/components/NavBar';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductsListPage = lazy(() => import('./modules/products/pages/ProductsListPage'));
const AddProductPage = lazy(() => import('./modules/products/pages/AddProductPage'));

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
          <Route path={ROUTES.contact} component={ContactPage} />

          <ProtectedRoute path="/" component={ProductsListPage} />
        </Switch>
      </NavBar>
    </Suspense>
  );
};
