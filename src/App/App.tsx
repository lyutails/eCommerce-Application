import style from './_app.module.scss';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
  setCartPrice,
  setCartPriceDiscount,
  setCartQuantity,
  setDiscountCodes,
  setDiscountCodesCart,
} from '../store/reducers/cartReducer';
import {
  createAnonCart,
  getAnonCart,
  getDiscountCodes,
} from '../api/existTokenFlow';
import { useCallback, useEffect } from 'react';
import { setAuthStatus } from '../store/reducers/userReducer';
import {
  changeAddress,
  changeBio,
  changeEmail,
  changePassword,
  changeVersion,
} from '../store/reducers/profileReducer';
import { getCustomerById } from '../api/getCustomer';
import { parseDateToWeb } from '../utils/parseDate';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { anonymousCart } = useSelector((state: ICartState) => state.cart);
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  const { customerId, customerRefreshToken } = useSelector(
    (state: IRootState) => state.user
  );

  const checkRefreshToken = useCallback((): void => {
    dispatch(setAuthStatus(false));
    navigate('/login');
    localStorage.removeItem('customerId');
    localStorage.removeItem('isAuth');
    dispatch(changeVersion(1));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!customerRefreshToken) {
      checkRefreshToken();
    } else {
      refreshTokenFlow(customerRefreshToken)
        .then(() => {
          getCustomerById({ ID: customerId }).then((response) => {
            dispatch(
              changePassword({
                currentPassword: {
                  value: response.body.password ? response.body.password : '',
                },
              })
            );
            dispatch(changeVersion(response.body.version));
            dispatch(
              changeBio({
                firstname: {
                  value: response.body.firstName,
                },
                lastname: {
                  value: response.body.lastName,
                },
                birthday: {
                  value: parseDateToWeb(
                    response.body.dateOfBirth ? response.body.dateOfBirth : ''
                  ),
                },
              })
            );
            dispatch(changeEmail({ value: response.body.email }));
            dispatch(
              changeAddress({
                addressStore: response.body.addresses,
                defaultShippingId: response.body.defaultShippingAddressId,
                defaultBillingId: response.body.defaultBillingAddressId,
                shippingAddressesId: response.body.shippingAddressIds,
                billingAddressesId: response.body.billingAddressIds,
              })
            );
          });
        })
        .catch(() => {
          console.log('error');
          checkRefreshToken();
          localStorage.removeItem('refreshToken');
        });
    }
  }, [checkRefreshToken, customerId, dispatch, navigate, customerRefreshToken]);

  useEffect(() => {
    if (!isAuth && !anonymousCart.anonymousID) {
      anonymousSessionFlow().then((response) => {
        const anonID = response.scope.split(' ')[2].slice(13);
        localStorage.setItem('anonymousID', anonID);
        localStorage.setItem(
          'refreshAnonToken',
          response.refresh_token ? response.refresh_token : ''
        );
        dispatch(
          changeAnonymousCart({
            anonymousID: anonID,
            anonymousRefreshToken: response.refresh_token,
            anonymousAccessToken: response.access_token,
          })
        );
        createAnonCart(response.access_token).then((responseTwo) => {
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
  }, [anonymousCart.anonymousID, dispatch, isAuth]);

  useEffect(() => {
    if (!isAuth) {
      if (anonymousCart.anonymousRefreshToken) {
        refreshTokenFlow(anonymousCart.anonymousRefreshToken).then(
          (response) => {
            if (response) {
              getAnonCart(response.access_token).then((response) => {
                dispatch(
                  changeAnonymousCart({
                    versionAnonCart: response?.body.version,
                    cartID: response?.body.id,
                  })
                );
                dispatch(setCartItems(response?.body.lineItems));
                dispatch(setCartQuantity(response?.body.totalLineItemQuantity));
                dispatch(
                  setCartPriceDiscount(response?.body.totalPrice.centAmount)
                );
                let totalPrice = 0;
                response?.body.lineItems.map((item) => {
                  if (item) {
                    totalPrice += item.price.value.centAmount * item.quantity;
                  }
                  return totalPrice;
                });
                dispatch(setCartPrice(totalPrice));
                dispatch(setDiscountCodesCart(response?.body.discountCodes));
              });
              getDiscountCodes(response.access_token).then((response) => {
                if (response) {
                  const codeDiscountArray = response.body.results.map(
                    (code) => {
                      let codeName;
                      if (code.code) {
                        codeName = code.code;
                      }
                      return codeName;
                    }
                  );
                  dispatch(setDiscountCodes(codeDiscountArray));
                }
              });
            }
          }
        );
      }
    } else {
      if (customerRefreshToken) {
        refreshTokenFlow(customerRefreshToken).then((response) => {
          if (response) {
            getAnonCart(response.access_token).then((responseTwo) => {
              dispatch(setCartItems(responseTwo?.body.lineItems));
              dispatch(
                changeUserCart({
                  versionUserCart: responseTwo?.body.version,
                  userCartId: responseTwo?.body.id,
                })
              );
              dispatch(setCartPrice(response?.body.totalPrice.centAmount));
              dispatch(setCartQuantity(response?.body.totalLineItemQuantity));
            });
            getDiscountCodes(response.access_token).then((response) => {
              if (response) {
                dispatch(setDiscountCodes(response.body.results));
              }
            });
          }
        });
      }
    }
  }, [
    anonymousCart.anonymousRefreshToken,
    customerRefreshToken,
    dispatch,
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
          <Route path={ParhRoute.ProductPage} element={<ProductPage />} />
          <Route path={ParhRoute.ProductPageCart} element={<ProductPage />} />
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
