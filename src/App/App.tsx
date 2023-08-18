import style from './_app.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from '../pages/Auth/Auth';
import RegistrationPage from '../pages/Registration/Registration';
import NotFoundPage from '../pages/NotFound/NotFound';
import AboutUsPage from '../pages/AboutUs/AboutUs';
import CustomizePage from '../pages/Customize/Customize';
import ProfilePage from '../pages/Profile/Profile';
import { IRootState } from '../types/interfaces';
import { Layout } from '../components/Layout/Layout';
import CartPage from '../pages/Cart/Cart';
import CatalogPage from '../pages/Catalog/Catalog';
import CategoryPage from '../pages/Category/Category';
import ProductPage from '../pages/Product/Product';
import { revoke } from '@commercetools/sdk-auth';
import { apiRootAnonymous } from '../api/anonzmousFlow';
import { refreshTokenFlow } from '../api/adminBuilder';
import { checkCustomerEmail } from '../api/checkCustomerEmail';
// import { customerToken } from '../api/adminBuilder';
import { useEffect, useState } from 'react';
import MainPage from '../pages/Main/Main';

function App(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const data = {
    email: 'johnIanaTestAddress@example.com',
    password: 'snmthjs',
  };
  // console.log(checkCustomerEmail('рророро@example.com'));
  // console.log(
  //   refreshTokenFlow('tycteam:y92e3bWIBd3O4-T5vokVTiYq7L2O1Aa3qp7Ht5sX_FI'),
  //   'hdsjfgvk,'
  // );
  // {
  //   "email": "ianatestAPI@example.com",
  //   "firstName": "Лфенф",
  //   "lastName": "ывапаувас",
  //   "password": "fshHJKL2365"
  // }

  // console.log(customerTokens, 'testtest');
  // console.log(refreshTokenFlow(customerTokens[1]), 'lalalal');
  // console.log(
  //   refreshTokenFlow('9MYlnodRwdRD4fwXGzxUJ2gTZ9ZzKlKDylFZa7FsJPA'),
  //   'lрпрпрпрпрпр'
  // );
  return (
    <section className={style.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="customize" element={<CustomizePage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:category" element={<CategoryPage />} />
          <Route path="category/:category/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {isAuth ? (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<Navigate to={'/'} replace />} />
              <Route
                path="/registration"
                element={<Navigate to={'/'} replace />}
              />
            </>
          ) : (
            <>
              <Route
                path="/profile"
                element={<Navigate to={'/login'} replace />}
              />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<AuthPage />} />
            </>
          )}
        </Route>
      </Routes>
    </section>
  );
}
export default App;
