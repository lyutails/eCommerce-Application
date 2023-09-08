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
import { IProfileState, IRootState } from '../types/interfaces';
import { Layout } from '../components/Layout/Layout';
import CartPage from '../pages/Cart/Cart';
import CatalogPage from '../pages/Catalog/Catalog';
import CategoryPage from '../pages/Category/Category';
import ProductPage from '../pages/Product/Product';
import { ParhRoute } from '../types/enums';
import {
  createCartThroughMe,
  getCartThroughMe,
  loginCustomerThroughMe,
  updateCartThroughMe,
} from '../api/passwordFlowSession';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const version = useSelector((state: IProfileState) => state.profile);
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  // console.log(
  //   loginCustomerThroughMe(
  //     {
  //       email: 'ianatestAPI@example.com',
  //       password: 'fshHJKL2365',
  //     },
  //     dispatch
  //   ),
  //   'lalala1'
  // );
  // console.log(
  //   createCartThroughMe({
  //     email: 'ianatestAPI@example.com',
  //     password: 'fshHJKL2365',
  //   }).then((response) => {
  //     let customerCart;
  //     if (response) {
  //       customerCart = getCartThroughMe(
  //         {
  //           email: 'ianatestAPI@example.com',
  //           password: 'fshHJKL2365',
  //         },
  //         response.body.id
  //       );
  //     }
  //     return customerCart;
  //   })
  // );
  console.log(
    loginCustomerThroughMe(
      {
        email: 'ianatestAPI@example.com',
        password: 'fshHJKL2365',
      },
      dispatch
    ).then((response) => {
      let customerCart;
      if (response) {
        console.log(response.body.cart?.version);
        customerCart = updateCartThroughMe(
          {
            email: 'ianatestAPI@example.com',
            password: 'fshHJKL2365',
          },
          response.body.cart?.id ? response.body.cart?.id : '',
          {
            version: response.body.cart?.version
              ? response.body.cart?.version
              : 1,
            actions: [
              {
                action: 'addLineItem',
                sku: 'RSSchool Hoodie Love Black',
                quantity: 1,
              },
            ],
          }
        );
      }
      return customerCart;
    })
  );
  // f4beb394-487a-4127-8aa5-d0b4da38a144
  // {
  //   "action": "addLineItem",
  //   "productId": "{{product-id}}",
  //   "variantId": 2,
  //   "quantity": 1,
  //   "supplyChannel": {
  //     "typeId": "channel",
  //     "id": "{{channel-id}}"
  //   },
  //   "distributionChannel": {
  //     "typeId": "channel",
  //     "id": "{{channel-id}}"
  //   },
  //   "externalTaxRate": {
  //     "name": "StandardExternalTaxRate",
  //     "amount": 0.19,
  //     "country": "DE",
  //     "state": "Bavaria"
  //   },
  //   "shippingDetails": {
  //     "targets": [
  //       {
  //         "addressKey": "AddressKeyStringFromAddress",
  //         "quantity": 2
  //       }
  //     ]
  //   }
  // }
  // console.log(
  //   getCartThroughMe({
  //     email: 'ianatestAPI@example.com',
  //     password: 'fshHJKL2365',
  //   })
  // );
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
