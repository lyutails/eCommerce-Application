import style from './_app.module.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from '../pages/Auth/Auth';
import RegistrationPage from '../pages/Registration/Registration';
import NotFoundPage from '../pages/NotFound/NotFound';
import Main from '../pages/Main/Main';
import AboutUsPage from '../pages/AboutUs/AboutUs';
import BasketPage from '../pages/Basket/Basket';
import CustomizePage from '../pages/Customize/Customize';
import ProfilePage from '../pages/Profile/Profile';
import { IRootState } from '../types/interfaces';
import CategoryPage from '../pages/Category/Category';
import Card from '../components/Card/Card';
import { Layout } from '../components/Layout/Layout';

function App(): JSX.Element {
  const isAuth = useSelector((state: IRootState) => state.user.isAuth);
  return (
    <section className={style.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/customize" element={<CustomizePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/category/:category/:id" element={<Card />} />
          <Route
            path="/profile"
            element={
              isAuth ? <ProfilePage /> : <Navigate to={'/login'} replace />
            }
          />
          <Route
            path="/registration"
            element={
              isAuth ? <Navigate to={'/login'} replace /> : <RegistrationPage />
            }
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </section>
  );
}
export default App;
