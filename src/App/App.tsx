import style from './_app.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from '../pages/Auth/Auth';
import RegistrationPage from '../pages/Registration/Registration';
import NotFoundPage from '../pages/NotFound/NotFound';
import MainPage from '../pages/Main/Main';
import AboutUsPage from '../pages/AboutUs/AboutUs';
import CustomizePage from '../pages/Customize/Customize';
import ProfilePage from '../pages/Profile/Profile';
import { IRootState } from '../types/interfaces';
import { Layout } from '../components/Layout/Layout';
import CartPage from '../pages/Cart/Cart';
import CatalogPage from '../pages/Catalog/Catalog';
import CategoryPage from '../pages/Category/Category';
import ProductPage from '../pages/Product/Product';
import { ParhRoute } from '../types/enums';

function App(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  return (
    <section className={style.app}>
      <Routes>
        <Route path={ParhRoute.MainPage} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={ParhRoute.CustomizePage} element={<CustomizePage />} />
          <Route path={ParhRoute.AboutUsPage} element={<AboutUsPage />} />
          <Route path={ParhRoute.CartPage} element={<CartPage />} />
          <Route path={ParhRoute.CatalogPage} element={<CatalogPage />} />
          <Route path={ParhRoute.CategoryPage} element={<CategoryPage />} />
          <Route path={ParhRoute.ProductPage} element={<ProductPage />} />
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
