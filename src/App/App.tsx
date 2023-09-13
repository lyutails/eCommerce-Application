import style from './_app.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from '../pages/Auth/Auth';
import RegistrationPage from '../pages/Registration/Registration';
import NotFoundPage from '../pages/NotFound/NotFound';
import MainPage from '../pages/Main/Main';
import AboutUsPage from '../pages/AboutUs/AboutUs';
import CustomizePage from '../pages/Customize/Customize';
import ProfilePage from '../pages/Profile/Profile';
import { ICartState, IRootState } from '../types/interfaces';
import { Layout } from '../components/Layout/Layout';
import CartPage from '../pages/Cart/Cart';
import CatalogPage from '../pages/Catalog/Catalog';
import CategoryPage from '../pages/Category/Category';
import ProductPage from '../pages/Product/Product';
import { ParhRoute } from '../types/enums';
import { anonymousSessionFlow, refreshTokenFlow } from '../api/adminBuilder';
import {
  changeAnonymousCart,
  changeUserCart,
  setCartItems,
  setDiscountCodes,
} from '../store/reducers/cartReducer';
import {
  createAnonCart,
  getAnonCart,
  getDiscountCodes,
} from '../api/existTokenFlow';
import { useEffect } from 'react';
import { setAccessTokenStatus } from '../store/reducers/userReducer';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const { anonymousCart, userCart } = useSelector(
    (state: ICartState) => state.cart
  );
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const { customerId, customerRefreshToken, accessToken } = useSelector(
    (state: IRootState) => state.user
  );
  if (!isAuth && !anonymousCart.anonymousID) {
    anonymousSessionFlow().then((response) => {
      const accessToken = response.access_token;
      const anonID = response.scope.split(' ')[2].slice(13);
      localStorage.setItem('anonymousID', anonID);
      localStorage.setItem('refreshAnonToken', response.refresh_token);
      dispatch(
        changeAnonymousCart({
          anonymousID: anonID,
          anonymousRefreshToken: response.refresh_token,
          anonymousAccessToken: response.access_token,
        })
      );
      createAnonCart(accessToken).then((responseTwo) => {
        if (responseTwo) {
          const idCart = responseTwo.body.id;
          dispatch(
            changeAnonymousCart({
              versionAnonCart: responseTwo.body.version,
              cartID: idCart,
            })
          );
        }
      });
    });
  }

  useEffect(() => {
    if (!isAuth) {
      refreshTokenFlow(anonymousCart.anonymousRefreshToken).then((response) => {
        if (response) {
          dispatch(
            changeAnonymousCart({
              anonymousAccessToken: response.access_token,
            })
          );
          getAnonCart(response.access_token).then((response) => {
            dispatch(setCartItems(response?.body.lineItems));
            dispatch(
              changeAnonymousCart({
                versionAnonCart: response?.body.version,
                cartID: response?.body.id,
              })
            );
          });
          getDiscountCodes(response.access_token).then((response) => {
            if (response) {
              dispatch(setDiscountCodes(response.body.results));
            }
          });
        }
      });
    } else {
      refreshTokenFlow(customerRefreshToken).then((response) => {
        if (response) {
          dispatch(setAccessTokenStatus(response.access_token));
          getAnonCart(response.access_token).then((response) => {
            dispatch(setCartItems(response?.body.lineItems));
            dispatch(
              changeUserCart({
                versionUserCart: response?.body.version,
                userCartId: response?.body.id,
              })
            );
          });
          getDiscountCodes(response.access_token).then((response) => {
            if (response) {
              dispatch(setDiscountCodes(response.body.results));
            }
          });
        }
      });
    }
  }, [
    dispatch,
    customerRefreshToken,
    anonymousCart.anonymousID,
    anonymousCart.anonymousRefreshToken,
    isAuth,
  ]);
  return (
    <section className={style.app}>
      <Routes>
        <Route path={ParhRoute.MainPage} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={ParhRoute.Main} element={<MainPage />} />
          <Route path={ParhRoute.CustomizePage} element={<CustomizePage />} />
          <Route path={ParhRoute.AboutUsPage} element={<AboutUsPage />} />
          <Route path={ParhRoute.CartPage} element={<CartPage />} />
          <Route path={ParhRoute.CatalogPage} element={<CatalogPage />} />
          <Route path={ParhRoute.CategoryPage} element={<CategoryPage />} />
          <Route
            path={ParhRoute.CategoryPageQuery}
            element={<CategoryPage />}
          />
          <Route path={ParhRoute.ProductPage} element={<ProductPage />} />
          <Route
            path={ParhRoute.CategoryPageQueryProductPage}
            element={<ProductPage />}
          />
          <Route path={ParhRoute.NotFoundPage} element={<NotFoundPage />} />
          {isAuth ? (
            <>
              <Route path={ParhRoute.ProfilePage} element={<ProfilePage />} />
              <Route
                path={ParhRoute.AuthPage}
                element={<Navigate to={ParhRoute.MainPage} replace />}
              />
              <Route
                path={ParhRoute.RegistrationPage}
                element={<Navigate to={ParhRoute.MainPage} replace />}
              />
            </>
          ) : (
            <>
              <Route
                path={ParhRoute.ProfilePage}
                element={<Navigate to={ParhRoute.AuthPage} replace />}
              />
              <Route
                path={ParhRoute.RegistrationPage}
                element={<RegistrationPage />}
              />
              <Route path={ParhRoute.AuthPage} element={<AuthPage />} />
            </>
          )}
        </Route>
      </Routes>
    </section>
  );
}
export default App;
